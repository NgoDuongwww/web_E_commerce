const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { getAvatarUrl } = require("../helpers");

exports.getProductImages = async (req, res) => {
  const { product_id } = req.query;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (product_id) {
    whereClause = {
      product_id: product_id,
    };
  }

  const [productImages, totalProductImages] = await Promise.all([
    db.ProductImage.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.ProductImage.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách ảnh sản phẩm thành công",
    data: productImages.map((productImage) => ({
      ...productImage.get({ plain: true }),

      image_url: getAvatarUrl(productImage.image_url),
    })),
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalProductImages / pageSize),
    total: totalProductImages,
  });
};

exports.getProductImageById = async (req, res) => {
  const { id } = req.params;
  const product = await db.Product.findByPk(id);
  if (!product) {
    return res.status(404).json({
      message: "Sản phẩm không tìm thấy",
    });
  }

  const productImageById = await db.ProductImage.findByPk(id);
  if (!productImageById) {
    return res.status(404).json({
      message: "Ảnh sản phẩm không tìm thấy",
    });
  }

  return res.status(200).json({
    message: "Lấy thông tin ảnh sản phẩm thành công",
    data: {
      ...productImageById.get({ plain: true }),

      image_url: getAvatarUrl(productImageById.image_url),
    },
  });
};

exports.insertProductImage = async (req, res) => {
  const { product_id, image_url } = req.body;
  const productExists = await db.Product.findByPk(product_id);
  if (!productExists) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  const existingImage = await db.ProductImage.findOne({
    where: {
      product_id,
      image_url,
    },
  });
  if (existingImage) {
    return res.status(409).json({
      message: "Chi tiết ảnh sản phẩm đã tồn tại",
    });
  }

  const newProductImage = await db.ProductImage.create(req.body);
  res.status(201).json({
    message: "Thêm ảnh sản phẩm thành công",
    data: {
      ...newProductImage.get({ plain: true }),

      image_url: getAvatarUrl(newProductImage.image_url),
    },
  });
};

exports.deleteProductImage = async (req, res) => {
  const { id } = req.params;
  const deleteProductImage = await db.ProductImage.destroy({
    where: { id },
  });

  if (deleteProductImage) {
    return res.status(200).json({
      message: "Xóa ảnh sản phẩm thành công",
    });
  } else {
    return res.status(404).json({
      message: "Ảnh sản phẩm không tồn tại",
    });
  }
};

exports.updateProductImage = async (req, res) => {
  const { id } = req.params;

  const { url } = req.body;
  const existingProductImage = await db.ProductImage.findOne({
    where: {
      url: url,
      id: { [Sequelize.Op.ne]: id },
    },
  });
  if (existingProductImage) {
    return res.status(409).json({
      message: "URL ảnh sản phẩm đã tồn tại",
    });
  }

  const updateProductImage = await db.ProductImage.update(req.body, {
    where: { id },
  });
  return res.status(200).json({
    message: "Cập nhật ảnh sản phẩm thành công",
  });
};
