const path = require("path");
const fs = require("fs");
const {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebaseConfig");
const storage = getStorage();
const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");

exports.uploadImages = async (req, res) => {
  if (req.files.length === 0) {
    throw new Error("Không có file nào được tải lên");
  }

  const uploadedImagesPaths = req.files.map((file) =>
    path.basename(file.path).trim()
  );

  return res.status(201).json({
    message: "Tải ảnh lên thành công",
    images: uploadedImagesPaths,
  });
};

exports.uploadImageToGoogleStorage = async (req, res) => {
  if (!req.file) {
    throw new Error("Không có file nào được tải lên");
  }

  const newFileName = `${Date.now()}-${req.file.originalname}`;

  const storageRef = ref(storage, `images/${newFileName}`);

  const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, {
    contentType: req.file.mimetype,
  });
  const downloadURL = await getDownloadURL(snapshot.ref);
  console.log("File succesfully uploaded");
  return res.status(201).json({
    message: "Tải ảnh lên thành công",
    file: downloadURL.trim(),
  });
};

const checkImageInUse = async (imageURL) => {
  const modelFields = {
    User: "avatar",
    Category: "image",
    Brand: "image",
    Product: "image",
    News: "image",
    Banner: "image",
  };
  const models = [
    db.User,
    db.Category,
    db.Brand,
    db.Product,
    db.News,
    db.Banner,
  ];
  for (let model of models) {
    const fieldName = modelFields[model.name];
    let query = {};
    query[fieldName] = imageURL;

    const result = await model.findOne({
      where: query,
    });
    if (result) {
      console.log(
        `Found in model: , ${model.name}, Field: ${fieldName}, Image URL: ${imageURL}`
      );
      return true;
    }
  }
  return false;
};

exports.deleteImage = async (req, res) => {
  const { url: rawUrl } = req.body;
  const url = rawUrl.trim();

  try {
    if (await checkImageInUse(url)) {
      return res.status(500).json({
        message: "Ảnh vẫn đang được sử dụng trong CSDL.",
      });
    }

    if (url.includes("https://firebasestorage.googleapis.com/")) {
      const fileRef = ref(storage, url);

      await deleteObject(fileRef);
      return res.status(200).json({
        message: "Xóa ảnh thành công",
      });
    } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
      const filePath = path.join(__dirname, "../uploads", path.basename(url));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return res.status(200).json({
        message: "Xóa ảnh thành công",
      });
    } else {
      return res.status(400).json({
        message: "URL không hợp lệ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi xoá ảnh",
      error: error.message,
    });
  }
};

exports.viewImage = async (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "../uploads", filename);
  fs.access(imagePath, fs.constants.F_OK, (error) => {
    if (error) {
      return res.status(404).json({ message: "File không tồn tại" });
    }
    res.sendFile(imagePath);
  });
};
