const path = require("path"); // ➡ Thư viện có sẵn trong NodeJS, dùng để xử lý đường dẫn file.
const multer = require("multer");
const firebaseConfig = require("../config/firebaseConfig");

const fileFilter = function (req, file, callback) {
  // ↳ Hàm này xác định loại tệp nào được phép tải lên.
  if (file.mimetype.startsWith("image")) {
    // ↳ Kiểm tra xem loại tệp có phải là hình ảnh không.
    callback(null, true); // ➡ Nếu đúng, cho phép tải lên.
  } else {
    callback(new Error("Chỉ được phép tải file ảnh!"), false); // ➡ Nếu không, từ chối tải lên và trả về lỗi.
  }
};

const upload = multer({
  // ↳ Tạo middleware multer với cấu hình đã định nghĩa ở trên.
  storage: multer.memoryStorage(), // ➡ Sử dụng cấu hình lưu trữ memory.
  fileFilter, // ➡ Sử dụng hàm lọc tệp đã định nghĩa.
  limits: {
    // ↳ Giới hạn kích thước tệp tải lên.
    fileSize: 1024 * 1024 * 5, // ➡ Giới hạn kích thước tệp là 5MB.
  },
});

module.exports = upload;
