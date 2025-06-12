const Sequelize = require('sequelize')
const { Op } = Sequelize
const db = require('../models')

exports.getNewsDetails = async (req, res) => {
  const { page = 1 } = req.query // ➡ Lấy page (trang hiện tại) từ query URL. Mặc định page = 1.
  const pageSize = 5 // ➡ Hiển thị 5 tin tức mỗi trang.
  const offset = (page - 1) * pageSize // ➡ offset là số tin tức cần bỏ qua.

  const [newsDetails, totalNewsDetails] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.NewsDetail.findAll({
      // ↳ Lấy danh sách tin tức (theo phân trang và lọc niflower).
      limit: pageSize, // ➡ Giới hạn số lượng tin tức lấy về.
      offset: offset, // ➡ Bỏ qua số lượng tin tức đã chỉ định.
      include: [
        // ➡ Kết hợp với các bảng khác:
        {
          model: db.News, // ➡ Kết hợp với bảng News (tin tức).
        },
        {
          model: db.Product, // ➡ Kết hợp với bảng Product (sản phẩm).
        },
      ],
    }),
    db.NewsDetail.count(), // ➡ Đếm tổng số tin tức (để tính tổng số trang).
  ])

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Lấy danh sách chi tiết tin tức thành công',
    newsDetails: newsDetails, // ➡ danh sách tin tức.
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalNewsDetails / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalNewsDetails, // ➡ tổng số tin tức.
  })
}

exports.getNewsDetailById = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).

  const newsDetail = await db.NewsDetail.findByPk(id, {
    // ↳ Tìm kiếm tin tức theo id.
    include: [{ model: db.News }, { model: db.Product }], // ➡ Kết hợp với bảng News và Product.
  })
  if (!newsDetail) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy chi tiết tin tức',
    })
  }
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Lấy chi tiết tin tức thành công',
    newsDetail: newsDetail, // ➡ tin tức tìm thấy.
  })
}

exports.insertNewsDetail = async (req, res) => {
  const { product_id, news_id } = req.body // ➡ Lấy dữ liệu từ body.

  const productExists = await db.Product.findByPk(product_id) // ↳ Tìm kiếm sản phẩm theo product_id.
  if (!productExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy sản phẩm',
    })
  }

  const newsExists = await db.News.findByPk(news_id) // ↳ Tìm kiếm tin tức theo news_id.
  if (!newsExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy tin tức',
    })
  }

  const duplicateExists = await db.NewsDetail.findOne({
    // ↳ Kiểm tra xem tin tức đã tồn tại chưa.
    where: { product_id, news_id }, // ➡ Tìm kiếm theo product_id và news_id.
  })
  if (duplicateExists) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: 'Chi tiết tin tức đã tồn tại',
    })
  }

  const newNewsDetail = await db.NewsDetail.create({ product_id, news_id })
  // ↳ Tạo mới tin tức với product_id và news_id.
  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: 'Thêm chi tiết tin tức thành công',
    newsDetail: newNewsDetail, // ➡ tin tức vừa thêm.
  })
}

exports.deleteNewsDetail = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).

  const deleteNewsDetail = await db.NewsDetail.destroy({
    where: { id }, // ➡ Xóa tin tức theo id.
  })
  if (deleteNewsDetail) {
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: 'Xóa chi tiết tin tức thành công',
    })
  } else {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy chi tiết tin tức',
    })
  }
}

exports.updateNewsDetail = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).
  const newsDetail = await db.NewsDetail.findByPk(id) // ↳ Tìm chi tiết tin tức theo id chính (Primary Key).
  if (!newsDetail) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy chi tiết tin tức',
    })
  }

  const { product_id, news_id } = req.body // ➡ Lấy dữ liệu từ body.
  const existingDuplicate = await db.NewsDetail.findOne({
    // ↳ Kiểm tra xem tin tức đã tồn tại chưa.
    where: {
      product_id, // ➡ Tìm kiếm theo product_id.
      news_id, // ➡ Tìm kiếm theo news_id.
      id: { [Sequelize.Op.ne]: id }, // ➡ Không tìm kiếm theo id hiện tại (để tránh xung đột khi cập nhật).
    },
  })
  if (existingDuplicate) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: 'Chi tiết tin tức đã tồn tại',
    })
  }

  await db.NewsDetail.update(
    { product_id, news_id }, // ➡ Cập nhật tin tức với product_id và news_id.
    { where: { id: id } }, // ➡ Cập nhật tin tức theo id.
  )
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Cập nhật chi tiết tin tức thành công',
  })
}
