/**
 * Middleware xác thực tùy chọn.
 *
 * Kiểm tra xem tiêu đề Authorization có được đặt và chứa một
 * JSON Web Token hợp lệ hay không. Nếu có, gán `req.user` là
 * đối tượng người dùng được trả về từ middleware `getUserFromToken`.
 *
 * Nếu token không hợp lệ hoặc không có, không làm gì và chuyển
 * tiếp yêu cầu đến middleware tiếp theo.
 *
 * @param {import('express').Request} req - Đối tượng yêu cầu từ Express
 * @param {import('express').Response} res - Đối tượng phản hồi từ Express
 * @param {import('express').NextFunction} next - Hàm tiếp theo để gọi middleware tiếp theo
 */

const { getUserFromToken } = require("../middlewares");

const optionalAuth = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req, res);
    if (user) req.user = user;
  } catch (error) {
    console.log("optionalAuth middleware error: ");
    console.log(error);
  }

  next();
};

module.exports = optionalAuth;