const Sequelize = require('sequelize')
const { Op } = Sequelize
const db = require('../models')
const { getAvatarUrl } = require('../helpers')

exports.getOrderDetails = async (req, res) => {
  const orderDetails = await db.OrderDetail.findAll() // ➡ Truy vấn tất cả chi tiết đơn hàng từ bảng OrderDetail trong cơ sở dữ liệu.
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Lấy danh sách chi tiết đơn hàng thành công',
    data: orderDetails, // ➡ Danh sách chi tiết đơn hàng.
  })
}

exports.getOrderDetailById = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).

  const orderDetailById = await db.OrderDetail.findByPk(id) // ➡ Tìm chi tiết đơn hàng theo id trong cơ sở dữ liệu.
  if (orderDetailById) {
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: 'Lấy chi tiết đơn hàng thành công',
      data: orderDetailById,
    })
  } else {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Chi tiết đơn hàng không tồn tại',
    })
  }
}

exports.deleteOrderDetail = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).

  const deleteOrderDetail = await db.OrderDetail.destroy({
    where: { id }, // ➡ Xóa thương hiệu theo id trong database.
  })
  if (deleteOrderDetail) {
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: 'Xóa chi tiết đơn hàng thành công',
    })
  } else {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Chi tiết đơn hàng không tồn tại',
    })
  }
}

exports.updateOrderDetail = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).
  const orderDetail = await db.OrderDetail.findByPk(id) // ➡ Tìm chi tiết đơn hàng theo id chính (Primary Key).
  if (!orderDetail) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Chi tiết đơn hàng không tồn tại',
    })
  }

  await db.OrderDetail.update(req.body, {
    where: { id }, // ➡ Cập nhật thương hiệu theo id trong database.
  })
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Cập nhật chi tiết đơn hàng thành công',
  })
}
