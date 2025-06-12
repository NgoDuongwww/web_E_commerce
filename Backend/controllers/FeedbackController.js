const Sequelize = require('sequelize')
const { Op } = Sequelize
const db = require('../models')
const { UserRole } = require('../constants')

exports.getFeedbacks = async (req, res) => {
  const { page = 1 } = req.query // ➡ Lấy page (trang hiện tại) từ query URL. Mặc định page = 1.
  const pageSize = 5 // ➡ Hiển thị 5 danh mục mỗi trang.
  const offset = (page - 1) * pageSize // ➡ offset là số danh mục cần bỏ qua.

  const [feedbacks, totalFeedbacks] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.FeedBack.findAll({
      // ↳ Lấy danh sách danh mục (theo phân trang và lọc niflower).
      limit: pageSize, // ➡ Giới hạn số lượng danh mục lấy về.
      offset: offset, // ➡ Bỏ qua số lượng danh mục đã chỉ định.
      include: [
        {
          model: db.User, // ➡ Chị định model cần join.
          attributes: ['name', 'avatar'], // ➡ Lấy thống tin của model.
        },
        {
          model: db.Product, // ➡ Chị định model cần join.
          attributes: ['name', 'image'], // ➡ Lấy thống tin của model.
        },
        {
          model: db.Order, // ➡ Chị định model cần join.
        },
      ],
    }),
    db.FeedBack.count(), // ➡ Đếm tổng số danh mục (để tính tổng số trang).
  ])

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Lấy danh sách phản hồi thành công',
    feedbacks: feedbacks, // ➡ danh sách phản hồi.
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalFeedbacks / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalFeedbacks, // ➡ tổng số phản hồi.
  })
}

exports.getFeedbackById = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).
  const feedbackExists = await db.FeedBack.findByPk(id, {
    include: [
      {
        model: db.User, // ➡ Chị định model cần join.
        attributes: ['name', 'avatar'], // ➡ Lấy thống tin của model.
      },
      {
        model: db.Product, // ➡ Chị định model cần join.
        attributes: ['name', 'image'], // ➡ Lấy thống tin của model.
      },
      {
        model: db.Order, // ➡ Chị định model cần join.
      },
    ],
  }) // Tìm phản hồi theo id chính (Primary Key).
  if (!feedbackExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy phản hồi',
    })
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Lấy phản hồi thành công',
    data: feedbackExists, // ➡ Thông tin phản hồi.
  })
}

exports.insertFeedback = async (req, res) => {
  const { product_variant_id, user_id, order_id, star } = req.body // ➡ Lấy dữ liệu từ body.

  const productExists = await db.ProductVariantValue.findByPk(
    product_variant_id,
    { include: db.Product }, // ➡ Tìm kiếm sản phẩm theo product_variant_id.
  )
  if (!productExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy sản phẩm',
    })
  }

  const product_id = productExists.Product.id // ➡ Lấy product_id từ bảng ProductVariantValue.

  const userExists = await db.User.findByPk(user_id) // ↳ Tìm kiếm người dùng theo user_id.
  if (!userExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy người dùng',
    })
  }

  const orderExists = await db.Order.findOne({
    where: {
      id: order_id, // ➡ Tìm kiếm đơn hàng theo order_id.
      user_id: user_id, // ➡ Kiểm tra xem đơn hàng có thuộc về người dùng không.
    },
    include: [
      // ↳ Kết hợp với bảng OrderDetail.
      {
        model: db.OrderDetail, // ➡ Chỉ định model cần join.
        as: 'order_Details', // ➡ Đặt tên alias cho mối quan hệ này.
        where: {
          product_variant_id: product_variant_id, // ➡ Tìm kiếm theo product_variant_id.
        },
      },
    ],
  })
  if (!orderExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy đơn hàng với sản phẩm này',
    })
  }
  if (!orderExists.order_Details || orderExists.order_Details.length === 0) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Người dùng chưa đặt hàng sản phẩm này',
    })
  }

  req.body.product_id = productExists.Product.id
  const insertFeedback = await db.FeedBack.create(req.body) // ➡ Tạo phản hồi mới trong database với dữ liệu từ body.

  const newTotalRatings = productExists.total_ratings + 1 // ➡ Tăng tổng số đánh giá lên 1.
  const newAverageRating =
    (productExists.rating * productExists.total_ratings + star) /
    newTotalRatings // ➡ Tính toán lại điểm đánh giá trung bình.

  await db.Product.update(
    {
      rating: newAverageRating, // ➡ Cập nhật điểm đánh giá trung bình.
      total_ratings: newTotalRatings, // ➡ Cập nhật tổng số đánh giá.
    },
    {
      where: {
        id: product_id, // ➡ Cập nhật sản phẩm theo product_id.
      },
    },
  )

  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: 'Thêm phản hồi thành công',
    feedback: {
      ...insertFeedback.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chua dữ liệu thực (không kèm các method và metadata của Sequelize).
      product: productExists.name, // ➡ Lấy tên sản phẩm từ bảng Product.
      user: userExists.name, // ➡ Lấy tên người dùng từ bảng User.
      order: orderExists.id, // ➡ Lấy id đơn hàng từ bảng Order.
    },
  })
}

exports.deleteFeedback = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).
  const UserValid = req.user // ➡ Lấy người dùng muốn hành động.

  const feedbackExists = await db.FeedBack.findByPk(id) // Tìm phản hồi theo id chính (Primary Key).
  if (!feedbackExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy phản hồi',
    })
  }

  if (UserValid.role === UserRole.USER) {
    // ↳ kiểm tra xem người dùng muốn hành động có phải người dùng hay không.
    if (feedbackExists.user_id !== UserValid.id) {
      // ↳ kiểm tra xem người dùng muốn hành động có phải người dùng tạo phản hồi nây hay không.
      return res.status(403).json({
        // ↳ Trả về status 403 Forbidden.
        message: 'Bạn không có quyền xóa phản hồi này',
      })
    }

    await db.FeedBack.update(
      // ↳ Cập nhật phản hồi theo id trong database.
      { is_visible: false },
      { where: { id } },
    )
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: 'Xóa phản hồi thành công',
    })
  }

  await db.FeedBack.destroy(
    // ↳ Xóa phản hồi theo id trong database.
    { where: { id } },
  )
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Xóa phản hồi người dùng thành công',
  })
}

exports.updateFeedback = async (req, res) => {
  const { id } = req.params // ➡ Lý id từ params (đường dẫn).
  const UserValid = req.user // ➡ Lý người dùng muốn hành động.

  const feedbackExists = await db.FeedBack.findOne({
    where: {
      id,
      is_visible: true,
    },
  }) // Tìm phản hồi theo id chính (Primary Key).
  if (!feedbackExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Không tìm thấy phản hồi',
    })
  }

  if (UserValid.role === UserRole.USER) {
    // ↳ kiểm tra xem người dùng muốn hành động có phải người dùng hay không.
    if (feedbackExists.user_id !== UserValid.id) {
      // ↳ kiểm tra xem người dùng muốn hành động có phải người dùng tạo phản hồi nây hay không.
      return res.status(403).json({
        // ↳ Trả về status 403 Forbidden.
        message: 'Bạn không có quyền cập nhật phản hồi nây',
      })
    }
  }

  const { star, content } = req.body // ➡ Lấy star và content từ body.
  await db.FeedBack.update(
    // ↳ Cập nhật phản hồi theo id trong database.
    { star, content },
    { where: { id } },
  )

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Cập nhật phản hồi người dùng thành công',
  })
}
