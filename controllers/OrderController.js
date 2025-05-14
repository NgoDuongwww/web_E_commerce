const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { OrderStatus } = require("../constants");
const { getAvatarUrl } = require("../helpers");

exports.getOrders = async (req, res) => {
  const { search = "", page = 1, status } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [{ note: { [Op.like]: `%${search}%` } }],
    };
  }
  if (status) {
    whereClause.status = status;
  }

  const [orders, totalOrders] = await Promise.all([
    db.Order.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
      order: [["created_at", "DESC"]],
    }),
    db.Order.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách đơn hàng thành công",
    data: orders,
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalOrders / pageSize),
    totalOrders: totalOrders,
  });
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await db.Order.findByPk(id, {
    include: [
      {
        model: db.OrderDetail,
        as: "order_Details",
      },
    ],
  });
  if (!order) {
    return res.status(404).json({
      message: "Đơn hàng không tồn tại",
    });
  }
  return res.status(200).json({
    message: "Lấy thông tin đơn hàng thành công",
    data: order,
  });
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  const deleteOrder = await db.Order.update(
    { status: OrderStatus.FAILED },
    { where: { id } }
  );
  if (deleteOrder) {
    return res.status(200).json({
      message: "Đơn hàng đã được đánh dấu là FAILED",
    });
  } else {
    return res.status(404).json({
      message: "Đơn hàng không tìm thấy",
    });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  const updateOrder = await db.Order.update(req.body, {
    where: { id },
  });
  return res.status(200).json({
    message: "Cập nhật đơn hàng thành công",
  });
};
