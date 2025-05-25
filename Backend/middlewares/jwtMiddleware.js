const { getUserFromToken } = require("../helpers");

const requireRoles = (roleRequired) => async (req, res, next) => {
  // ↳ Kiểm tra quyền truy cập theo role, chặn người dùng không đúng quyền.
  try {
    const user = await getUserFromToken(req, res); // ➡ Lấy người dùng từ token.
    if (!user) return; // ➡ Người dùng không tồn tại.

    if (user.is_locked === 1) {
      // ↳ Kiểm tra xem tài khoản user có bị khoá hay không
      return res.status(403).json({
        // ↳ Trả về status 403 Forbidden.
        message: "Tài khoản này đã bị khoá",
      });
    }

    if (!roleRequired.includes(user.role)) {
      // ↳ Nếu vai trò (role) của người dùng (user.role) không nằm trong danh sách các vai trò được phép (roleRequired), thì tiếp tục xử lý lỗi.
      return res.status(401).json({
        // ↳ Trả về status 401 Unauthorized.
        message: "Không có quyền truy cập",
      });
    }

    req.user = user; // ➡ Gán người dùng vào req.user.
    next(); // ➡ Chuyển tiếp request sang middleware tiếp theo.
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      // ↳ Trả về status 403 Forbidden.
      message: error.message,
    });
  }
};

module.exports = requireRoles;
