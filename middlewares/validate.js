// Dùng để kiểm tra tính hợp lệ (validation) của dữ liệu người dùng gửi lên (req.body),
// thường được dùng trong các API như POST, PUT.
const validate = (requestType) => {
  // ↳ Định nghĩa hàm validate, nhận vào một requestType (thường là Joi schema).
  return (req, res, next) => {
    // ↳ Trả về một middleware function dùng cho Express (nhận req, res, next).
    const { error } = requestType.validate(req.body);
    // ↳ Gọi hàm validate() từ requestType để kiểm tra req.body. Nếu sai, trả về lỗi.
    if (error) {
      // ↳ Kiểm tra xem có lỗi xảy ra trong quá trình validate hay không.
      return res.status(400).json({
        // ↳ Trả về HTTP status 400 (Bad Request) cùng với thông báo lỗi.
        message: "validation error",
        error: error.details[0]?.message,
        // ↳ Hiển thị thông tin lỗi chi tiết từ Joi
      });
    }
    next(); // ➡ Chuyển tiếp request sang middleware tiếp theo.
  };
};

module.exports = validate;
