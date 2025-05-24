const path = require("path"); // Thư viện có sẵn trong NodeJS, dùng để làm việc với đường dẫn file.
const fs = require("fs"); // ➡ (File System) Thư viện có sẵn trong NodeJS, dùng để làm việc với tệp và thư mục.

const validateImageExists = (req, res, next) => {
  // ↳ Kiểm tra xem file ảnh có tồn tại hay không trước khi xử lý tiếp.
  const imageName = req.body.image; // ➡ Lấy tên hình ảnh từ body.
  if (
    imageName &&
    !imageName.startsWith("http://") &&
    !imageName.startsWith("https://")
  ) {
    // ↳ Nếu tên hình ảnh không bắt đầu bằng http:// hoặc https://.
    const imagePath = path.join(__dirname, "../uploads", imageName); // ➡ Tạo đường dẫn đến hình ảnh trong thư mục uploads.

    if (!fs.existsSync(imagePath)) {
      // ➡ Kiểm tra xem hình ảnh có tồn tại không.
      return res.status(404).json({
        // ➡ Trả về status 404 Not Found.
        message: "Hình ảnh không tồn tại",
      });
    }
  }
  next(); // ➡ Chuyển tiếp request sang middleware tiếp theo.
};

module.exports = validateImageExists;
