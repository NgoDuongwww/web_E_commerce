const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { OrderStatus } = require("../constants");

exports.getOrders = async (req, res) => {
  const { search = "", page = 1, status } = req.query; // ➡ Lấy search (chuỗi tìm kiếm) và page (trang hiện tại) từ query URL. Mặc định search = "", page = 1.
  const pageSize = 5; // ➡ Hiển thị 5 đơn hàng mỗi trang.
  const offset = (page - 1) * pageSize; // ➡ offset là số đơn hàng cần bỏ qua.

  let whereClause = {}; // ➡ Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  if (search.trim() !== "") {
    // ↳ Nếu search không rộng, thì lọc đơn hàng theo name chứa chuỗi search.
    whereClause = {
      [Op.or]: [
        // ↳ Tạo điều kiện lọc theo OR cho nhiều cót.
        { note: { [Op.like]: `%${search}%` } }, // ➡ Tìm đơn hàng có note chứa từ khóa search.
      ],
    };
  }
  if (status) {
    whereClause.status = status; // ➡ Lọc đơn hàng theo status.
  }

  const [orders, totalOrders] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn.
    db.Order.findAll({
      // ↳ Lấy danh sách đơn hàng (theo phân trang và lọc nếu có).
      where: whereClause, // ➡ Tìm đơn hàng theo name chứa từ khóa search.
      limit: pageSize,
      offset: offset,
      order: [["created_at", "DESC"]], // ➡ Sắp xếp đơn hàng theo ngày tạo.
    }),
    db.Order.count({
      // ↳ Đếm tổng số đơn hàng (để tính tổng số trang).
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy danh sách đơn hàng thành công",
    data: orders, // ➡ Danh sách đơn hàng.
    current_page: parseInt(page, 10), // ➡ Trang hiện tại.
    total_page: Math.ceil(totalOrders / pageSize), // ➡ Tống số trang.
    totalOrders: totalOrders, // ➡ Tổng số đơn hàng.
  });
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).

  const order = await db.Order.findByPk(id, {
    include: [
      {
        model: db.OrderDetail,
        as: "order_Details",
      },
    ],
  }); // ➡ Tìm đơn hàng theo id trong database.
  if (!order) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Đơn hàng không tồn tại",
    });
  }
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy thông tin đơn hàng thành công",
    data: order, // ➡ Thong tin đơn hàng.
  });
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const order = await db.Order.findByPk(id); // ➡ Tìm đơn hàng theo id chính (Primary Key).
  if (!order) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Đơn hàng không tồn tại",
    });
  }

  await db.Order.update(
    // ↳ Cập nhật trạng thái đơn hàng sang FAILED thay vì xoá.
    { status: OrderStatus.FAILED },
    { where: { id } }
  );
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Đơn hàng đã được đánh dấu là FAILED",
  });
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const order = await db.Order.findByPk(id); // ➡ Tìm đơn hàng theo id chính (Primary Key).
  if (!order) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Đơn hàng không tồn tại",
    });
  }

  await db.Order.update(req.body, {
    where: { id }, // ➡ Cập nhật đơn hàng theo id trong database.
  });
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Cập nhật đơn hàng thành công",
  });
};
