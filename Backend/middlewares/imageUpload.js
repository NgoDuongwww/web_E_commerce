const path = require('path') // ➡ Thư viện có sẵn trong NodeJS, dùng để xử lý đường dẫn file.
const fs = require('fs') // ➡ (File System) Thư viện có sẵn trong NodeJS, dùng để làm việc với tệp và thư mục.
const multer = require('multer')

const storage = multer.diskStorage({
  // ↳ Cấu hình nơi lưu trữ tệp tải lên.
  destination: function (req, file, callback) {
    // ↳ Hàm này xác định thư mục đích nơi tệp sẽ được lưu trữ.
    const destinationPath = path.resolve(__dirname, '../uploads') // ➡ Đường dẫn thư mục uploads trong thư mục gốc của dự án.

    if (!fs.existsSync(destinationPath)) {
      // ↳ Kiểm tra xem thư mục uploads đã tồn tại chưa.
      fs.mkdirSync(destinationPath, { recursive: true }) // ➡ Nếu chưa tồn tại, tạo thư mục uploads.
    }

    callback(null, destinationPath) // ➡ Gọi callback với đường dẫn thư mục đích.
  },
  filename: function (req, file, callback) {
    // ↳ Hàm này xác định tên tệp sẽ được lưu trữ.
    const newFileName = `${Date.now()}-${file.originalname}` // ➡ Tạo tên tệp mới bằng cách kết hợp timestamp và tên tệp gốc.
    callback(null, newFileName) // ➡ Gọi callback với tên tệp mới.
  },
})

const fileFilter = function (req, file, callback) {
  // ↳ Hàm này xác định loại tệp nào được phép tải lên.
  if (file.mimetype.startsWith('image')) {
    // ↳ Kiểm tra xem loại tệp có phải là hình ảnh không.
    callback(null, true) // ➡ Nếu đúng, cho phép tải lên.
  } else {
    callback(new Error('Chỉ được phép tải file ảnh!'), false) // ➡ Nếu không, từ chối tải lên và trả về lỗi.
  }
}

const upload = multer({
  // ↳ Tạo middleware multer với cấu hình đã định nghĩa ở trên.
  storage, // ➡ Sử dụng cấu hình lưu trữ đã định nghĩa.
  fileFilter, // ➡ Sử dụng hàm lọc tệp đã định nghĩa.
  limits: {
    // ↳ Giới hạn kích thước tệp tải lên.
    fileSize: 1024 * 1024 * 5, // ➡ Giới hạn kích thước tệp là 5MB.
  },
})

module.exports = upload
