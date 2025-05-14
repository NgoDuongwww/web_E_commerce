const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const destinationPath = path.resolve(__dirname, "../uploads");

    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    callback(null, destinationPath);
  },
  filename: function (req, file, callback) {
    const newFileName = `${Date.now()}-${file.originalname}`;
    callback(null, newFileName);
  },
});

const fileFilter = function (req, file, callback) {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Chỉ được phép tải file ảnh!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = upload;
