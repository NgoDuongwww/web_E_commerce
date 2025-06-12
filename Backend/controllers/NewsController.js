const Sequelize = require('sequelize')
const { Op } = Sequelize
const db = require('../models')
const { getAvatarUrl } = require('../helpers')

exports.getNewsArticles = async (req, res) => {
  const { search = '', page = 1 } = req.query // ➡ Lấy search (chuỗi tìm kiếm) và page (trang hiện tại) từ query URL. Mặc định search = "", page = 1.
  const pageSize = 5 // ➡ Hiển thị 5 tin tức mỗi trang.
  const offset = (page - 1) * pageSize // ➡ offset là số tin tức cần bỏ qua.

  let whereClause = {} // ➡ Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  if (search.trim() !== '') {
    // ↳ Nếu search không rộng, thì lọc tin tức theo title chứa chuỗi search.
    whereClause = {
      [Op.or]: [
        // ↳ Tạo điều kiện lọc theo OR cho nhiều cột.
        { title: { [Op.like]: `%${search}%` } }, // ➡ Tìm tin tức có title chứa từ khóa search.
        { content: { [Op.like]: `%${search}%` } }, // ➡ Hoặc content chứa search.
      ],
    }
  }

  const [newsArticles, totalNews] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.News.findAll({
      // ↳ Lấy danh sách tin tức (theo phân trang và lọc nếu có).
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.News.count({
      // ↳ Đếm tổng số tin tức (để tính tổng số trang).
      where: whereClause,
    }),
  ])

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Lấy danh sách tin tức thành công',
    data: newsArticles.map((newsArticle) => ({
      // ↳ Trả về mảng bài viết (mảng object) bao góc bảng newsArticle.
      ...newsArticle.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(newsArticle.image), // ➡ Lấy URL hình anh bảng newsArticle.
    })),
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalNews / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalNews, // ➡ tổng số tin tức.
  })
}

exports.getNewsArticleById = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).

  const newsArticleById = await db.News.findByPk(id) // ➡ Tìm tin tức theo id chính (Primary Key).
  if (!newsArticleById) {
    return res.status(404).json({
      // ➡ Trả về status 404 Not Found.
      message: 'Không tìm thấy tin tức',
    })
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Lấy tin tức thành công',
    data: {
      ...newsArticleById.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chúa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(newsArticleById.image), // ➡ Lấy URL hình anh bảng tin tức.
    },
  })
}

exports.insertNewsArticle = async (req, res) => {
  // Tất cả các thao tác trong transaction sẽ được commit hoặc rollback nếu có lỗi.
  const transaction = await db.sequelize.transaction() // ➡ Tạo giao dịch.
  // Không thể bỏ try-catch ở đây vì nếu có lỗi trong quá trình tạo bản ghi, sẽ không thể rollback giao dịch.
  try {
    const newsArticle = await db.News.create(req.body, { transaction })
    // ↳ Tạo tin tức mới với dữ liệu từ req.body có dùng transaction.
    const productIds = req.body.product_ids // ➡ Lấy danh sách product_ids từ req.body.
    if (productIds && productIds.length) {
      // ↳ Nếu có danh sách product_ids.
      const validProducts = await db.Product.findAll({
        // ↳ Tìm tất cả sản phẩm hợp lệ theo danh sách product_ids.
        where: { id: productIds }, // ➡ Lọc theo id sản phẩm.
        transaction, // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
      })
      const validProductIds = validProducts.map((product) => product.id)
      // ↳ Lấy danh sách id sản phẩm hợp lệ.
      const filteredProductIds = productIds.filter(
        (id) =>
          // ↳ Lọc ra những id sản phẩm hợp lệ.
          validProductIds.includes(id), // ➡ Kiểm tra xem id sản phẩm có nằm trong danh sách hợp lệ không.
      )
      const newsDetailPromises = filteredProductIds.map((product_id) =>
        // ↳ Tạo một mảng các promise để tạo bản ghi trong bảng NewsDetail cho từng sản phẩm hợp lệ.
        db.NewsDetail.create(
          {
            // ➡ Tạo bản ghi mới trong bảng NewDetail.
            product_id: product_id, // ➡ id sản phẩm.
            news_id: newsArticle.id, // ➡ id tin tức mới tạo.
          },
          { transaction }, // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
        ),
      )
      await Promise.all(newsDetailPromises) // ➡ Chờ tất cả các promise hoàn thành.
    }
    await transaction.commit() // ➡ Cam kết giao dịch.
    return res.status(201).json({
      // ↳ Trả về status 201 Created.
      message: 'Thêm tin tức thành công',
      data: {
        ...newsArticle.get({ plain: true }),
        // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
        // ↳ chỉ chúa dữ liệu thực (không kèm các method và metadata của Sequelize).
        image: getAvatarUrl(newsArticle.image), // ➡ Lấy URL hình anh bảng tin tức.
      },
    })
  } catch (error) {
    await transaction.rollback() // ➡ Nếu có lỗi, hoàn tác giao dịch.
    return res.status(500).json({
      // ↳ Trả về status 500 Internal Server Error.
      message: 'Lỗi khi thêm tin tức',
      error: error.message, // ➡ Thông báo lỗi.
    })
  }
}

exports.deleteNewsArticle = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).
  const transaction = await db.sequelize.transaction() // ➡ Tạo giao dịch.
  try {
    await db.NewsDetail.destroy({
      // ↳ Xóa tất cả bản ghi trong bảng NewsDetail liên quan đến tin tức này.
      where: { news_id: id },
      transaction, // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
    })
    const deletedNewsArticle = await db.News.destroy({
      // ↳ Xóa tin tức theo id trong database.
      where: { id },
      transaction, // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
    })

    if (deletedNewsArticle) {
      await transaction.commit() // ➡ Cam kết giao dịch.
      return res.status(200).json({
        // ↳ Trả về status 200 OK.
        message: 'Xóa tin tức thành công',
      })
    } else {
      await transaction.rollback() // ➡ Hoàn tác giao dịch.
      return res.status(404).json({
        // ➡ Trả về status 404 Not Found.
        message: 'Không tìm thấy tin tức',
      })
    }
  } catch (error) {
    await transaction.rollback() // ➡ Nếu có lỗi, hoàn tác giao dịch.
    return res.status(500).json({
      // ↳ Trả về status 500 Internal Server Error.
      message: 'Lỗi khi xóa tin tức',
      error: error.message, // ➡ Thông báo lỗi.
    })
  }
}

exports.updateNewsArticle = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).
  const newsArticle = await db.News.findByPk(id) // ➡ Tìm tin tức theo id chính (Primary Key).
  if (!newsArticle) {
    return res.status(404).json({
      // ➡ Trả về status 404 Not Found.
      message: 'Không tìm thấy tin tức',
    })
  }

  const { title } = req.body // ➡ Lấy dữ liệu từ body.
  const existingNewsArticle = await db.News.findOne({
    // ↳ Tìm tin tức theo title trong database.
    where: {
      title: title, // ➡ Tìm tin tức có title trùng với title trong body.
      id: { [Sequelize.Op.ne]: id }, // ➡ Tìm tin tức có id khác với id trong body.
    },
  })
  if (existingNewsArticle) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: 'Tên tin tức tồn tại',
    })
  }

  await db.News.update(req.body, {
    // ↳ Cập nhật tin tức theo id trong database với dữ liệu từ req.body.
    where: { id },
  })
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Cập nhật tin tức thành công',
  })
}
