const path = require("path"); // Thư viện có sẵn trong NodeJS, dùng để làm việc với đường dẫn file.
const fs = require("fs"); // ➡ (File System) Thư viện có sẵn trong NodeJS, dùng để làm việc với tệp và thư mục.
const {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebaseConfig");
const storage = getStorage(); // ➡ Tạo tham chiếu đến vị trí Firebase Storage.
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");

exports.uploadImages = async (req, res) => {
  // ↳ Hàm uploadImages để xử lý việc tải lên ảnh.
  if (req.files.length === 0) {
    throw new Error("Không có file nào được tải lên");
  }

  const uploadedImagesPaths = req.files.map((file) =>
    path.basename(file.path).trim()
  );
  // ↳ Sử dụng map để lấy tên file từ đường dẫn đầy đủ của file đã tải lên.
  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: "Tải ảnh lên thành công",
    images: uploadedImagesPaths, // ↳ Trả về danh sách các ảnh đã tải lên.
  });
};

exports.uploadImageToGoogleStorage = async (req, res) => {
  // ↳ Hàm uploadImages để xử lý việc tải lên ảnh.
  if (!req.file) {
    throw new Error("Không có file nào được tải lên");
  }

  const newFileName = `${Date.now()}-${req.file.originalname}`;
  // ↳ Tạo tên tệp mới bằng cách kết hợp thời gian hiện tại (timestamp) với tên tệp gốc (originalname) để đảm bảo tên tệp duy nhất.
  const storageRef = ref(storage, `images/${newFileName}`);
  // ↳ Tạo tham chiếu đến vị trí file trong Firebase Storage với thư mục images/ và tên tệp đã được tạo.
  const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, {
    // ↳ Tải file lên Firebase Storage bằng phương thức uploadBytesResumable,
    // ↳ sử dụng tham chiếu storageRef và dữ liệu tệp từ req.file.buffer. contentType được xác định từ mimetype của tệp.
    contentType: req.file.mimetype,
  });
  const downloadURL = await getDownloadURL(snapshot.ref); // ➡ Lấy URL tải xuống của tệp đã tải lên từ Firebase Storage.
  console.log("File succesfully uploaded");
  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: "Tải ảnh lên thành công",
    file: downloadURL.trim(), // ↳ Trả về URL tải xuống của tệp.
  });
};

const checkImageInUse = async (imageURL) => {
  // ↳ Hàm checkImageInUse để kiểm tra xem ảnh đang đuoc sử dụng trong cơ sở dữ liệu.
  const modelFields = {
    // ↳ Mảng cơ sở dữ liệu.
    User: "avatar",
    Category: "image",
    Brand: "image",
    Product: "image",
    News: "image",
    Banner: "image",
  };
  const models = [
    // ↳ Danh sách các model.
    db.User,
    db.Category,
    db.Brand,
    db.Product,
    db.News,
    db.Banner,
  ];
  for (let model of models) {
    // ↳ Vòng lặp Duyệt các model.
    const fieldName = modelFields[model.name]; // ➡ Lấy tên trường trong model.
    let query = {};
    query[fieldName] = imageURL;
    // ↳ Tạo điều kiện lọc (WHERE) cho cơ sở dữ liệu.
    const result = await model.findOne({
      // ↳ Tìm kiếm ảnh trong cơ sở dữ liệu.
      where: query,
    });
    if (result) {
      console.log(
        `Found in model: , ${model.name}, Field: ${fieldName}, Image URL: ${imageURL}` // ↳ In ra tên model, tên trường và URL ảnh.
      );
      return true; // ➡ Trả về true.
    }
  }
  return false; // ➡ Nếu không tìm thấy ảnh, trả về false.
};

exports.deleteImage = async (req, res) => {
  const { url: rawUrl } = req.body; // ➡ Lấy dữ liệu từ body.
  const url = rawUrl.trim(); // ➡ Sử dụng trim() để loại bỏ khoảng trắng đầu và cuối.

  try {
    if (await checkImageInUse(url)) {
      // ↳ Kiểm tra xem ảnh đang đuoc sử dụng trong cơ sở dữ liệu.
      return res.status(500).json({
        // ↳ Trả về status 500 Internal Server Error.
        message: "Ảnh vẫn đang được sử dụng trong CSDL.",
      });
    }
    // ↳ Xóa file Firebase
    if (url.includes("https://firebasestorage.googleapis.com/")) {
      // ↳ Kiểm tra xem URL, nghĩa là ảnh đang lưu trên Firebase Storage.
      const fileRef = ref(storage, url); // ➡ Tạo tham chiếu đến vị trí file trong Firebase Storage.

      await deleteObject(fileRef); // ➡ Xóa file trong Firebase Storage.
      return res.status(200).json({
        // ↳ Trả về status 200 OK.
        message: "Xóa ảnh thành công",
      });
    } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
      // ↳ Kiểm tra xem URL, nghĩa là ảnh đang lưu trên thư mục uploads (local).
      const filePath = path.join(__dirname, "../uploads", path.basename(url)); // ➡ Tạo đường dẫn tuyệt đối đến file ảnh trong thư mục uploads.
      if (fs.existsSync(filePath)) {
        // ↳ Kiểm tra xem file có tồn tại hay không.
        fs.unlinkSync(filePath); // ➡ Xóa file trong thư mục uploads.
      }
      return res.status(200).json({
        // ↳ Trả về status 200 OK.
        message: "Xóa ảnh thành công",
      });
    } else {
      return res.status(400).json({
        // ↳ Trả về status 400 Bad Request.
        message: "URL không hợp lệ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      // ↳ Trả về status 500 Internal Server Error.
      message: "Lỗi khi xoá ảnh",
      error: error.message,
    });
  }
};

exports.viewImage = async (req, res) => {
  const { filename } = req.params; // ➡ Lấy tên file từ tham số URL.
  const imagePath = path.join(__dirname, "../uploads", filename); // ➡ Tạo đường dẫn tuyệt đối đến file ảnh trong thư mục uploads.
  fs.access(imagePath, fs.constants.F_OK, (error) => {
    // ↳ Kiểm tra xem file có tồn tại hay không.
    if (error) {
      // ↳ Trả về status 404 Not Found.
      return res.status(404).json({ message: "File không tồn tại" });
    }
    res.sendFile(imagePath); // ➡ Nếu file tồn tại, gửi file ảnh về cho client.
  });
};
