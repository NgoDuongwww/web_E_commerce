/**
 * Hàm bọc middleware/route async để tự động bắt lỗi.
 *
 * @param {Function} fn - Hàm async cần bọc (middleware hoặc route handler).
 * @returns {Function} Hàm middleware Express đã bọc, tự bắt lỗi và trả lỗi về client.
 *
 * @example
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 *
 * @description
 * - Bắt lỗi trong các hàm async mà không cần try-catch thủ công.
 * - Nếu lỗi, trả về HTTP 500.
 * - Môi trường development sẽ trả kèm chi tiết lỗi, production thì không.
 */

const asyncHandler = (fn) => {
  // ↳ Định nghĩa một hàm bọc (wrapper) nhận vào fn – là một hàm async
  return async (req, res, next) => {
    // ↳ Trả về một hàm middleware async dùng trong Express, nhận req, res, next.
    try {
      await fn(req, res, next); // ➡ Dùng await để chờ hàm fn thực hiện xong.
    } catch (error) {
      console.log("Detail error: ", error); // ➡ In thông tin lỗi ra console để dễ dàng theo dõi.
      console.log("Error Detail: ", {
        message: error.message,
        stack: error.stack,
      });
      // ↳ In thông tin lỗi chi tiết ra console để dễ dàng theo dõi.
      return res.status(500).json({
        // ↳ Trả về mã trạng thái HTTP 500 (Internal Server Error) nếu có lỗi.
        message: error.message || "Internal server error",
        // ↳ Gửi thông điệp lỗi từ đối tượng error nếu có, nếu không có thì gửi "Internal server error".
        // Including the error message can help with debugging.
        // You might include more details based on the enviroment.
        error: process.env.NODE_ENV === "development" ? error : "",
        // ↳ Nếu đang ở môi trường phát triển (development), gửi thêm thông tin lỗi.
        // Nếu không thì không gửi gì để bảo mật.
      });
    }
  };
};

module.exports = asyncHandler;
