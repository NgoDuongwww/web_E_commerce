const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { getAvatarUrl } = require("../helpers");
const { required } = require("joi");

exports.getProducts = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  let attributeWhereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { specification: { [Op.like]: `%${search}%` } },
      ],
    };
    attributeWhereClause = {
      value: { [Op.like]: `%${search}%` },
    };
  }

  const [products, totalProducts] = await Promise.all([
    db.Product.findAll({
      where: whereClause,
      include: [
        {
          model: db.ProductAttributeValue,
          as: "attributes",
          include: [{ model: db.Attribute, as: "attribute" }],
          where: attributeWhereClause,
          required: false,
        },
      ],
      limit: pageSize,
      offset: offset,
    }),
    db.Product.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách sản phẩm thành công",
    data: products.map((product) => ({
      ...product.get({ plain: true }),

      image: getAvatarUrl(product.image),
      attributes: (product.attributes || []).map((attr) => ({
        name: attr.attribute?.name || "",
        value: attr.value,
      })),
    })),
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalProducts / pageSize),
    total: totalProducts,
  });
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const productById = await db.Product.findByPk(id, {
    include: [
      {
        model: db.ProductImage,
        as: "product_images",
      },
      {
        model: db.ProductAttributeValue,
        as: "attributes",
        include: [
          {
            model: db.Attribute,
            as: "attribute",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: db.ProductVariantValue,
        as: "variants",
        attributes: ["id", "price", "old_price", "stock", "sku"],
      },
    ],
  });
  if (!productById) {
    return res.status(404).json({
      message: "Sản phẩm không tìm thấy",
    });
  }

  const variantValuesData = [];
  for (const variant of productById.variants) {
    const variantValueIds = variant.sku.split("-").map(Number);
    const variantValues = await db.VariantValue.findAll({
      where: { id: variantValueIds },
      include: [
        {
          model: db.Variant,
          as: "variant",
          attributes: ["id", "name"],
        },
      ],
    });
    variantValuesData.push({
      id: variant.id,
      price: variant.price,
      old_price: variant.old_price,
      stock: variant.stock,
      sku: variant.sku,
      values: variantValues.map((value) => ({
        id: value.id,
        name: value.variant?.name,
        value: value.value,
        image: value.image || null,
      })),
    });
  }

  return res.status(200).json({
    message: "Lấy thông tin sản phẩm thành công",
    data: {
      ...productById.get({ plain: true }),

      product_images: productById.product_images.map((img) =>
        getAvatarUrl(img.get({ plain: true }).image_url)
      ),
      attributes: productById.attributes.map((attr) => ({
        name: attr.attribute?.name || "",
        value: attr.value,
      })),
      variants: variantValuesData,
    },
  });
};

exports.insertProduct = async (req, res) => {
  const {
    name,
    attributes = [],
    variants = [],
    variant_values = [],
    ...productData
  } = req.body;

  const { category_id, brand_id } = productData;

  const categoryExists = await db.Category.findByPk(category_id);
  if (!categoryExists) {
    return res.status(400).json({
      message: `Danh mục ${category_id} không tồn tại`,
    });
  }

  const brandExists = await db.Brand.findByPk(brand_id);
  if (!brandExists) {
    return res.status(400).json({
      message: `Thương hiệu ${brand_id} không tồn tại`,
    });
  }

  const transaction = await db.sequelize.transaction();

  try {
    const existingProduct = await db.Product.findOne({
      where: { name: name.trim() },
    });

    if (existingProduct) {
      await transaction.rollback();
      return res.status(409).json({
        message: "Tên sản phẩm đã tồn tại",
        data: {
          product: existingProduct,
        },
      });
    }

    const product = await db.Product.create(
      { ...productData, name: name.trim() },
      { transaction }
    );

    const createdAttributes = [];

    for (const attributeData of attributes) {
      const [attribute] = await db.Attribute.findOrCreate({
        where: { name: attributeData.name.trim() },
        transaction,
      });

      await db.ProductAttributeValue.create(
        {
          product_id: product.id,
          attribute_id: attribute.id,
          value: attributeData.value,
        },
        { transaction }
      );

      createdAttributes.push({
        name: attribute.name,
        value: attributeData.value,
      });
    }

    for (const variant of variants) {
      const [variantEntry] = await db.Variant.findOrCreate({
        where: { name: variant.name.trim() },
        transaction,
      });

      for (const value of variant.values) {
        await db.VariantValue.findOrCreate({
          where: { value: value.trim(), variant_id: variantEntry.id },
          transaction,
        });
      }
    }

    const createdVariantValues = [];

    for (const variantData of variant_values) {
      const variantValueIds = [];

      for (const value of variantData.variant_combination) {
        const variantValue = await db.VariantValue.findOne({
          where: { value: value.trim() },
          transaction,
        });

        if (variantValue) {
          variantValueIds.push(variantValue.id);
        }
      }

      const sku = variantValueIds.sort((a, b) => a - b).join("");

      const createdVariant = await db.ProductVariantValue.create(
        {
          product_id: product.id,
          price: variantData.price,
          old_price: variantData.old_price,
          stock: variantData.stock || 0,
          sku,
        },
        { transaction }
      );

      createdVariantValues.push({
        id: createdVariant.id,
        sku: createdVariant.sku,
        price: createdVariant.price,
        old_price: createdVariant.old_price,
        stock: createdVariant.stock,
      });
    }

    const createdProduct = await db.Product.findByPk(product.id, {
      include: [{ model: db.ProductImage, as: "product_images" }],
    });

    await transaction.commit();

    return res.status(201).json({
      message: "Tạo sản phẩm mới thành công",
      data: {
        ...createdProduct.get({ plain: true }),
        image: getAvatarUrl(createdProduct.image),
        product_images:
          createdProduct.product_images?.map((img) => img.image_url) || [],
        attributes: createdAttributes,
        variants: variants.map((variant) => ({
          name: variant.name,
          values: variant.values,
        })),
        variant_values: createdVariantValues,
      },
    });
  } catch (error) {
    if (transaction.finished !== "commit") {
      await transaction.rollback();
    }

    return res.status(500).json({
      message: "Đã xảy ra lỗi khi tạo sản phẩm",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const orderDetailExists = await db.OrderDetail.findOne({
    where: { product_id: id },
    include: {
      model: db.Order,
      attributes: ["id", "status", "note", "total", "created_at"],
    },
  });
  if (orderDetailExists) {
    return res.status(400).json({
      message:
        "Không thể xoá sản phẩm vì đã có đơn hàng tham chiếu đến sản phẩm này",
      data: {
        order: orderDetailExists.Order,
      },
    });
  }

  await db.ProductAttributeValue.destroy({
    where: { product_id: id },
  });

  const deleteProduct = await db.Product.destroy({
    where: { id },
  });
  if (deleteProduct) {
    return res.status(200).json({
      message: "Xóa sản phẩm thành công",
    });
  } else {
    return res.status(404).json({
      message: "Sản phẩm không tìm thấy",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { attributes = [], ...productData } = req.body;

  const [updateRowCount] = await db.Product.update(productData, {
    where: { id },
  });

  if (updateRowCount > 0) {
    for (const attr of attributes) {
      const [attribute] = await db.Attribute.findOrCreate({
        where: { name: attr.name },
      });

      const productAttributeValue = await db.ProductAttributeValue.findOne({
        where: {
          product_id: id,
          attribute_id: attribute.id,
        },
      });

      if (productAttributeValue) {
        await db.ProductAttributeValue.update({ value: attr.value });
      } else {
        await db.ProductAttributeValue.create({
          product_id: id,
          attribute_id: attribute.id,
          value: attr.value,
        });
      }
    }

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
    });
  } else {
    return res.status(404).json({
      message: "Sản phẩm không tồn tại",
    });
  }
};
