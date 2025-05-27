const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { getAvatarUrl } = require("../helpers");

exports.getProductImages = async (req, res) => {
  const { product_id } = req.query; // ➡ Lấy product_id từ query URL.
  const page = parseInt(req.query.page) || 1; // ➡ Lấy page (trang hiện tại) từ query URL. Mặc định page = 1.
  const pageSize = 5; // ➡ Hiển thị 5 ảnh sản phẩm mỗi trang.
  const offset = (page - 1) * pageSize; // ➡ offset là số ảnh sản phẩm cần bỏ qua.

  let whereClause = {}; // ➡ Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  if (product_id) {
    // ↳ Nếu product_id có, thì lọc ảnh sản phẩm theo product_id.
    whereClause = {
      product_id: product_id,
    };
  }

  const [productImages, totalProductImages] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.ProductImage.findAll({
      // ↳ Lấy danh sách ảnh sản phẩm (theo phân trang và lọc nếu có).
      where: whereClause,
      limit: pageSize,
      offset: offset,
      // include: [{ model: db.Product, as: "Product" }], // ➡ Kết hợp với bảng Product (sản phẩm).
    }),
    db.ProductImage.count({
      // ↳ Đếm tổng số ảnh sản phẩm (để tính tổng số trang).
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy danh sách ảnh sản phẩm thành công",
    data: productImages.map((productImage) => ({
      // ↳ Trả về mảng bài viết (mảng object) bao góc bảng productImage.
      ...productImage.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image_url: getAvatarUrl(productImage.image_url), // ➡ Lấy URL hình anh bảng productImage.
    })),
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalProductImages / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalProductImages, // ➡ tổng số ảnh sản phẩm.
  });
};

exports.getProductImageById = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const product = await db.Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Sản phẩm không tìm thấy",
    });
  }

  const productImageById = await db.ProductImage.findByPk(id); // ➡ Tìm ảnh sản phẩm theo id chính (Primary Key).
  if (!productImageById) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Ảnh sản phẩm không tìm thấy",
    });
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy thông tin ảnh sản phẩm thành công",
    data: {
      ...productImageById.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chúa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image_url: getAvatarUrl(productImageById.image_url), // ➡ Lấy URL hình anh bảng productImage.
    },
  });
};

exports.insertProductImage = async (req, res) => {
  const { product_id, image_url } = req.body;
  const productExists = await db.Product.findByPk(product_id); // ↳ Tìm kiếm sản phẩm theo product_id.
  if (!productExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Không tìm thấy sản phẩm",
    });
  }

  const existingImage = await db.ProductImage.findOne({
    // ↳ Kiểm tra xem ảnh sản phẩm tồn tại chưa.
    where: {
      product_id, // ➡ Truy vấn ảnh sản phẩm theo product_id.
      image_url, // ➡ Truy vấn ảnh sản phẩm theo image_url.
    },
  });
  if (existingImage) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: "Chi tiết ảnh sản phẩm đã tồn tại",
    });
  }

  const newProductImage = await db.ProductImage.create(req.body); // ➡ Tạo ảnh sản phẩm mới trong database với dữ liệu từ req.body.
  res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: "Thêm ảnh sản phẩm thành công",
    data: {
      ...newProductImage.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chúa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image_url: getAvatarUrl(newProductImage.image_url), // ➡ Lấy URL hình anh bảng productImage.
    },
  });
};

exports.deleteProductImage = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const deleteProductImage = await db.ProductImage.destroy({
    where: { id }, // ➡ Xóa ảnh sản phẩm theo id trong database.
  });

  if (deleteProductImage) {
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: "Xóa ảnh sản phẩm thành công",
    });
  } else {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Ảnh sản phẩm không tồn tại",
    });
  }
};

exports.updateProductImage = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const productImage = await db.ProductImage.findByPk(id); // ➡ Tìm ảnh sản phẩm theo id chính (Primary Key).
  if (!productImage) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Ảnh sản phẩm không tồn tại",
    });
  }

  const { url } = req.body; // ➡ Lấy dữ liệu từ body.
  const existingProductImage = await db.ProductImage.findOne({
    // ↳ Tìm ảnh sản phẩm theo url trong database.
    where: {
      url: url, // ➡ Tìm ảnh sản phẩm có url trùng với url trong body.
      id: { [Sequelize.Op.ne]: id }, // ➡ Tìm ảnh sản phẩm có id khác với id trong body.
    },
  });
  if (existingProductImage) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: "URL ảnh sản phẩm đã tồn tại",
    });
  }

  const updateProductImage = await db.ProductImage.update(req.body, {
    where: { id }, // ➡ Cập nhật ảnh sản phẩm theo id trong database.
  });
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Cập nhật ảnh sản phẩm thành công",
  });
};
