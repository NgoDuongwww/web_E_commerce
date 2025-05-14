/**
 * Xác thực người dùng từ token trong header Authorization.
 * - Lấy token từ header Authorization.
 * - Nếu không có hoặc token không bắt đầu bằng "Bearer ", trả về lỗi "Không có token được cung cấp".
 * - Xác thực token với JWT_SECRET:
 *   + Nếu token hết hạn, trả về lỗi 401 với thông báo "Token đã hết hạn".
 *   + Nếu token không hợp lệ, trả về lỗi 401 với thông báo "Token không hợp lệ".
 * - Tìm người dùng theo id từ token trong database.
 *   + Nếu không tìm thấy người dùng, trả về lỗi 401 với thông báo "Người dùng không tồn tại".
 * - Kiểm tra nếu người dùng đã đổi mật khẩu sau thời điểm token được cấp:
 *   + Nếu có, trả về lỗi 401 với thông báo "Token không hợp lệ do mật khẩu đã đổi".
 * - Nếu hợp lệ, trả về đối tượng người dùng.
 * @param {object} req - Đối tượng request từ client.
 * @param {object} res - Đối tượng response để trả kết quả.
 * @returns {Promise<object>} Đối tượng người dùng sau xác thực.
 */

const jwt = require("jsonwebtoken");
const db = require("../models");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Không có token được cung cấp",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "Người dùng không tồn tại",
      });
    }

    if (
      user.password_changed_at &&
      decoded.iat < new Date(user.password_changed_at).getTime() / 1000
    ) {
      return res.status(401).json({
        message: "Token không hợp lệ do mật khẩu đã đổi",
      });
    }

    return user;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token đã hết hạn",
      });
    }
    return res.status(401).json({
      message: "Token không hợp lệ",
    });
  }
};
