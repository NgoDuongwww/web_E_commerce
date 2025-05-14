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
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log("Detail error: ", error);
      console.log("Error Detail: ", {
        message: error.message,
        stack: error.stack,
      });

      return res.status(500).json({
        message: error.message || "Internal server error",

        error: process.env.NODE_ENV === "development" ? error : "",
      });
    }
  };
};

module.exports = asyncHandler;
