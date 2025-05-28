const jwt = require("jsonwebtoken");
const db = require("../models");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware xác thực JWT từ header Authorization.
 *
 * - Kiểm tra xem header Authorization có tồn tại và đúng định dạng "Bearer <token>".
 * - Giải mã token và kiểm tra tính hợp lệ.
 * - Kiểm tra user tồn tại trong DB.
 * - Kiểm tra token có bị invalid do user đổi mật khẩu sau khi token được cấp.
 * - Trả về lỗi 401 kèm thông báo nếu không hợp lệ hoặc trả về user nếu hợp lệ.
 *
 * @param {import('express').Request} req - Đối tượng Request của Express.
 * @param {import('express').Response} res - Đối tượng Response của Express.
 * @returns {Promise<import('../models').User|void>} Trả về user nếu hợp lệ, hoặc trả response lỗi 401 nếu không hợp lệ.
 */

module.exports = async (req, res) => {
  // ↳ Lấy người dùng từ token.
  const authHeader = req.headers.authorization; // ➡ Lấy header Authorization từ request HTTP (req.headers).
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // ↳ Khi header Authorization không tìm thấy hoặc không bắt đầu bằng chuỗi "Bearer ".
    return res.status(401).json({
      // ↳ Trả về status 401 Unauthorized.
      message: "Không có token được cung cấp",
    });
  }

  const token = authHeader.split(" ")[1]; // ➡ Cắt chuỗi Authorization theo dấu cách " " để lấy token.

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ↳ Xác thực token xem có hợp lệ không (có bị sửa hoặc hết hạn không).
    // ↳ Giải mã token thành object, lưu vào biến decoded.
    // ↳ Dùng process.env.JWT_SECRET làm chìa khoá bí mật để xác thực chữ ký token.

    const user = await db.User.findByPk(decoded.id); // ➡ Tìm kiếm người dùng theo id trong database.
    if (!user) {
      return res.status(401).json({
        // ↳ Trả về status 401 Unauthorized.
        message: "Người dùng không tồn tại",
      });
    }

    if (
      user.password_changed_at && // ➡ Nếu tồn tại (user đã đổi mật khẩu),
      decoded.iat < new Date(user.password_changed_at).getTime() / 1000
      // ↳ decoded.iat ➔ Là thời gian token được cấp (timestamp tính bằng giây).
      // new Date(user.password_changed_at).getTime() / 1000 ➔ Chuyển thời điểm đổi mật khẩu từ kiểu Date sang timestamp tính bằng giây để so sánh với iat.
      // ↳ Issued At = iat (đơn vị giây).
    ) {
      return res.status(401).json({
        // ↳ Trả về status 401 Unauthorized.
        message: "Token không hợp lệ do mật khẩu đã đổi",
      });
    }

    return user; // ➡ Trả về user nếu tất cả các kiểm tra đều hợp lệ.
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // ↳ Khi token hết hạn.
      return res.status(401).json({
        // ↳ Trả về status 401 Unauthorized.
        message: "Token đã hết hạn",
      });
    }
    return res.status(401).json({
      // ↳ Trả về status 401 Unauthorized.
      message: "Token không hợp lệ",
    });
  }
};
