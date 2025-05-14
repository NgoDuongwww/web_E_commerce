const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { getAvatarUrl } = require("../helpers");

exports.getOrderDetails = async (req, res) => {
  const orderDetails = await db.OrderDetail.findAll();
  return res.status(200).json({
    message: "Lấy danh sách chi tiết đơn hàng thành công",
    data: orderDetails,
  });
};

exports.getOrderDetailById = async (req, res) => {
  const { id } = req.params;

  const orderDetailById = await db.OrderDetail.findPk(id);
  if (orderDetailById) {
    return res.status(200).json({
      message: "Lấy chi tiết đơn hàng thành công",
      data: orderDetailById,
    });
  } else {
    return res.status(404).json({
      message: "Chi tiết đơn hàng không tồn tại",
    });
  }
};

exports.insertOrderDetail = async (req, res) => {
  const newOrderDetail = await db.OrderDetail.create(req.body);
  return res.status(201).json({
    message: "Thêm chi tiết đơn hàng thành công",
    data: newOrderDetail,
  });
};

exports.deleteOrderDetail = async (req, res) => {
  const { id } = req.params;

  const deleteOrderDetail = await db.OrderDetail.destroy({
    where: { id },
  });
  if (deleteOrderDetail) {
    return res.status(200).json({
      message: "Xóa chi tiết đơn hàng thành công",
    });
  } else {
    return res.status(404).json({
      message: "Chi tiết đơn hàng không tồn tại",
    });
  }
};

exports.updateOrderDetail = async (req, res) => {
  const { id } = req.params;

  const updateOrderDetail = await db.OrderDetail.update(req.body, {
    where: { id },
  });
  return res.status(200).json({
    message: "Cập nhật chi tiết đơn hàng thành công",
  });
};
