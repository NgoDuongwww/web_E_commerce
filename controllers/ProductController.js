const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { getAvatarUrl } = require("../helpers");
const { UserRole } = require("../constants");

exports.getProductsByAdmin = async (req, res) => {
  const { search = "", page = 1 } = req.query; // ➡ Lấy search (chuỗi tìm kiếm) và page (trang hiện tại) từ query URL. Mặc định search = "", page = 1.
  const pageSize = 5; // ➡ Hiển thị 5 sản phẩm mỗi trang.
  const offset = (page - 1) * pageSize; // ➡ offset là số sản phẩm cần bỏ qua.

  let whereClause = {}; // ➡ Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  let attributeWhereClause = {}; // ➡ Tạo điều kiện lọc (WHERE) cho thuộc tính.
  if (search.trim() !== "") {
    // ↳ Nếu search không rỗng, thì lọc danh mục theo name chứa chuỗi search.
    whereClause = {
      [Op.or]: [
        // ↳ Tạo điều kiện lọc theo OR cho nhiều cột.
        { name: { [Op.like]: `%${search}%` } }, // ➡ Tìm sản phẩm có name chứa từ khóa search.
        { description: { [Op.like]: `%${search}%` } }, // ➡ Hoặc description chứa search.
      ],
    };
    attributeWhereClause = {
      // ↳ Tạo điều kiện lọc cho thuộc tính.
      value: { [Op.like]: `%${search}%` }, // ➡ Tìm thuộc tính có name chứa từ khóa search.
    };
  }

  const [products, totalProducts] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.Product.findAll({
      // ↳ Lấy danh sách sản phẩm (theo phân trang và lọc nếu có).
      where: whereClause, // ➡ Tìm sản phẩm theo name, description chúa từ khóa search.
      include: [
        {
          model: db.ProductAttributeValue, // ➡ Kết hợp với bảng ProductAttributeValue.
          as: "attributes", // ➡ Đặt tên alias cho mối quan hệ này.
          include: [{ model: db.Attribute, as: "attribute" }], // ➡ Kết hợp với bảng Attribute.
          where: attributeWhereClause, // ➡ Tìm thuộc tính theo name chứa từ khóa search.
          required: false, // ➡ Không bắt buộc phải có thuộc tính.
        },
      ],
      limit: pageSize,
      offset: offset,
    }),
    db.Product.count({
      // ↳ Đếm tổng số sản phẩm (để tính tổng số trang).
      where: whereClause, // ➡ Tìm sản phẩm theo name, description chúa từ khóa search.
    }),
  ]);

  return res.status(200).json({
    // ↳ Trả về phản hồi JSON với mã trạng thái HTTP 200 OK.
    message: "Lấy danh sách sản phẩm thành công",
    data: products.map((product) => ({
      // ↳ Trả về mảng bài viết (mảng object) bao góc bảng product.
      ...product.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(product.image), // ➡ Lấy URL hình ảnh bảng product.
      attributes: (product.attributes || []).map((attr) => ({
        // ↳ Lấy tất cả thống tính của sản phẩm (attributes).
        // ↳ Với mỗi phần tử attr, tạo object mới.
        name: attr.attribute?.name || "", // ➡ Lấy tên Attribute (nếu không có thì gán rỗng).
        value: attr.value, // ➡ Lấy giá trị Attribute.
      })),
    })),
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalProducts / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalProducts, // ➡ tổn số sản phẩm.
  });
};

exports.getProductsByUser = async (req, res) => {
  const { search = "", page = 1 } = req.query; // ➡ Lấy search (chuỗi tìm kiếm) và page (trang hiện tại) từ query URL. Mặc định search = "", page = 1.
  const pageSize = 5; // ➡ Hiển thị 5 sản phẩm mỗi trang.
  const offset = (page - 1) * pageSize; // ➡ offset là số sản phẩm cần bỏ qua.

  let whereClause = {
    // ↳ Tạo điều kiện lọc (WHERE) cho câu truy vấn.
    is_visible: true, // ➡ Chỉ lấy sản phẩm có is_visible = true.
  };
  let attributeWhereClause = {}; // ➡ Tạo điều kiện lọc (WHERE) cho thuộc tính.
  if (search.trim() !== "") {
    // ↳ Nếu search không rỗng, thì lọc danh mục theo name chứa chuỗi search.
    whereClause = {
      [Op.and]: [
        // ↳ Tạo điều kiện lọc theo AND cho nhiều cột.
        { is_visible: true }, // ➡ Chỉ lấy sản phẩm có is_visible = true.
        {
          [Op.or]: [
            // ↳ Tạo điều kiện lọc theo OR cho nhiều cột.
            { name: { [Op.like]: `%${search}%` } }, // ➡ Tìm sản phẩm có name chứa từ khóa search.
            { description: { [Op.like]: `%${search}%` } }, // ➡ Hoặc description chứa search.
          ],
        },
      ],
    };
    attributeWhereClause = {
      // ↳ Tạo điều kiện lọc cho thuộc tính.
      value: { [Op.like]: `%${search}%` }, // ➡ Tìm thuộc tính có name chứa từ khóa search.
    };
  }

  const [products, totalProducts] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.Product.findAll({
      // ↳ Lấy danh sách sản phẩm (theo phân trang và lọc nếu có).
      where: whereClause, // ➡ Tìm sản phẩm theo name, description chúa từ khóa search.
      include: [
        {
          model: db.ProductAttributeValue, // ➡ Kết hợp với bảng ProductAttributeValue.
          as: "attributes", // ➡ Đặt tên alias cho mối quan hệ này.
          include: [{ model: db.Attribute, as: "attribute" }], // ➡ Kết hợp với bảng Attribute.
          where: attributeWhereClause, // ➡ Tìm thuộc tính theo name chứa từ khóa search.
          required: false, // ➡ Không bắt buộc phải có thuộc tính.
        },
      ],
      limit: pageSize,
      offset: offset,
      // order: [["createdAt", "DESC"]], // ➡ Sắp xếp theo ngày tạo (createdAt) giảm dần (mới nhất trước).
    }),
    db.Product.count({
      // ↳ Đếm tổng số sản phẩm (để tính tổng số trang).
      where: whereClause, // ➡ Tìm sản phẩm theo name, description chúa từ khóa search.
    }),
  ]);

  return res.status(200).json({
    // ↳ Trả về phản hồi JSON với mã trạng thái HTTP 200 OK.
    message: "Lấy danh sách sản phẩm thành công",
    data: products.map((product) => ({
      // ↳ Trả về mảng bài viết (mảng object) bao góc bảng product.
      ...product.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(product.image), // ➡ Lấy URL hình ảnh bảng product.
      attributes: (product.attributes || []).map((attr) => ({
        // ↳ Lấy tất cả thống tính của sản phẩm (attributes).
        // ↳ Với mỗi phần tử attr, tạo object mới.
        name: attr.attribute?.name || "", // ➡ Lấy tên Attribute (nếu không có thì gán rỗng).
        value: attr.value, // ➡ Lấy giá trị Attribute.
      })),
    })),
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalProducts / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalProducts, // ➡ tổn số sản phẩm.
  });
};

exports.getProductById = async (req, res) => {
  // const { id } = req.params; // Lấy id từ đường dẫn (/products/:id). Cần phân trang.
  // const product = await db.Product.findByPk(id); // Tìm sản phẩm theo id (khóa chính) trong database.
  // req.query.search: .../products?search=iphone$page=1
  // name, description, or description, constain "search"

  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const productById = await db.Product.findByPk(id, {
    // ↳ Tìm sản phẩm theo id (khóa chính) trong database.
    include: [
      // ↳ Kết hợp với bảng ProductImage, ProductAttributeValue, ProductVariantValue.
      {
        model: db.ProductImage, // ➡ Chỉ định model cần join.
        as: "product_images", // ➡ Đặt tên alias cho mối quan hệ này.
      },
      {
        model: db.ProductAttributeValue,
        as: "attributes",
        include: [
          // ↳ Kết hợp với bảng Attribute.
          {
            model: db.Attribute,
            as: "attribute",
            attributes: ["id", "name"], // ➡ Lấy thống tin của model.
          },
        ],
      },
      {
        model: db.ProductVariantValue,
        as: "variants",
        attributes: ["id", "price", "old_price", "stock", "sku"], // ➡ Lấy thống tin của model.
      },
    ],
  });
  if (!productById) {
    // ↳ Nếu không tìm thấy sản phẩm.
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Sản phẩm không tìm thấy",
    });
  }

  const variantValuesData = []; // ➡ Tạo mảng rỗng để lưu trữ các giá trị biến thể mới.
  for (const variant of productById.variants) {
    const variantValueIds = variant.sku.split("-").map(Number);
    const variantValues = await db.VariantValue.findAll({
      where: { id: variantValueIds },
      include: [
        // ↳ Kết hợp với bảng Variant.
        {
          model: db.Variant, // ➡ Chỉ định model cần join.
          as: "variant", // ➡ Đặt tên alias cho mối quan hệ này.
          attributes: ["id", "name"], // ➡ Lấy thống tin của model.
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
    // ↳ Trả về status 200 OK.
    message: "Lấy thông tin sản phẩm thành công",
    data: {
      ...productById.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      product_images: productById.product_images.map((img) =>
        // ↳ Lấy tất cả các ảnh của sản phẩm.
        getAvatarUrl(img.get({ plain: true }).image_url)
      ),
      attributes: productById.attributes.map((attr) => ({
        // ↳ Lấy tất cả thống tính của sản phẩm (attributes).
        // ↳ Với mỗi phần tử attr, tạo object mới.
        name: attr.attribute?.name || "", // ➡ Lấy tên Attribute (nếu không có thì gán rỗng).
        value: attr.value, // ➡ Lấy giá trị Attribute.
      })),
      variants: variantValuesData,
    },
  });
};

exports.insertProduct = async (req, res) => {
  // ↳ console.log(JSON.stringify(req.body));
  const {
    name,
    attributes = [],
    variants = [],
    variant_values = [],
    ...productData
  } = req.body; // ➡ Lấy dữ liệu từ body.
  // ↳ Lấy name, attributes, variants, variant_values và productData từ body.

  const { category_id, brand_id } = productData; // ➡ Lấy category_id và brand_id từ productData.

  const categoryExists = await db.Category.findByPk(category_id); // ↳ Tìm danh mục theo category_id trong database.
  if (!categoryExists) {
    return res.status(400).json({
      // ↳ Trả về status 400 Bad Request.
      message: `Danh mục ${category_id} không tồn tại`,
    });
  }

  const brandExists = await db.Brand.findByPk(brand_id); // ↳ Tìm thương hiệu theo brand_id trong database.
  if (!brandExists) {
    return res.status(400).json({
      // ↳ Trả về status 400 Bad Request.
      message: `Thương hiệu ${brand_id} không tồn tại`,
    });
  }

  const transaction = await db.sequelize.transaction(); // ➡ Tạo giao dịch (transaction) để đảm bảo toàn bộ quá trình thêm sản phẩm diễn ra atomically.

  let product; // ➡ Khai báo biến product để lưu thông tin sản phẩm.
  try {
    const existingProduct = await db.Product.findOne({
      // ↳ Tìm sản phẩm theo tên để kiểm tra trùng lặp.
      where: { name: name.trim() }, // ➡ Dùng trim() để loại bỏ khoảng trắng thừa.
    });

    if (existingProduct) {
      await transaction.rollback(); // ➡ Nếu bị trùng tên, rollback giao dịch.
      return res.status(409).json({
        // ↳ Trả về status 409 Conflict.
        message: "Tên sản phẩm đã tồn tại",
        data: {
          product: existingProduct, // ➡ Trả về thông tin sản phẩm đã tồn tại.
        },
      });
    }

    const product = await db.Product.create(
      // ↳ Tạo sản phẩm mới trong database.
      { ...productData, name: name.trim() },
      { transaction }
    );

    const createdAttributes = []; // ➡ Tạo mảng lưu các thuộc tính đã tạo thành công.

    for (const attributeData of attributes) {
      // ↳ Duyệt qua từng attribute trong mảng attributes.

      const [attribute] = await db.Attribute.findOrCreate({
        // ↳ Tìm hoặc tạo mới attribute theo tên.
        where: { name: attributeData.name.trim() },
        transaction,
      });

      await db.ProductAttributeValue.create(
        {
          // ↳ Tạo bản ghi ProductAttributeValue nối giữa product và attribute.
          product_id: product.id,
          attribute_id: attribute.id,
          value: attributeData.value,
        },
        { transaction }
      );

      createdAttributes.push({
        // ➡ Thêm vào mảng attributes đã tạo.
        name: attribute.name,
        value: attributeData.value,
      });
    }

    for (const variant of variants) {
      // ↳ Duyệt qua từng biến thể trong mảng variants.

      const [variantEntry] = await db.Variant.findOrCreate({
        // ↳ Tìm hoặc tạo Variant theo tên.
        where: { name: variant.name.trim() },
        transaction,
      });

      for (const value of variant.values) {
        // ↳ Duyệt qua từng giá trị của biến thể (variant.values).
        await db.VariantValue.findOrCreate({
          // ↳ Tìm hoặc tạo VariantValue.
          where: { value: value.trim(), variant_id: variantEntry.id },
          transaction,
        });
      }
    }

    const createdVariantValues = []; // ➡ Tạo mảng lưu các variant_value đã thêm.

    for (const variantData of variant_values) {
      // ↳ Duyệt qua từng variant_value.

      const variantValueIds = []; // ➡ Tạo mảng lưu id của variant value.

      for (const value of variantData.variant_combination) {
        // ↳ Duyệt qua từng giá trị trong variant_combination.
        const variantValue = await db.VariantValue.findOne({
          where: { value: value.trim() }, // ➡ Tìm variant value theo tên giá trị.
          transaction,
        });

        if (variantValue) {
          variantValueIds.push(variantValue.id); // ➡ Thêm id variant vào danh sách.
        }
      }

      const sku = variantValueIds.sort((a, b) => a - b).join("");
      // ↳ Tạo sku bằng cách sắp xếp các id và nối bằng dấu "-".

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

    await transaction.commit(); // ➡ Commit toàn bộ giao dịch nếu không lỗi.

    return res.status(201).json({
      // ↳ Trả về status 201 Created.
      message: "Tạo sản phẩm mới thành công",
      data: {
        ...product.get({ plain: true }),
        image: getAvatarUrl(product.image), // ➡ Lấy URL ảnh chính.
        attributes: createdAttributes, // ➡ Trả về danh sách attributes.
        variants: variants.map((variant) => ({
          // ➡ Trả về danh sách variants.
          name: variant.name,
          values: variant.values,
        })),
        variant_values: createdVariantValues, // ➡ Trả về danh sách variant_values đã tạo.
      },
    });
  } catch (error) {
    if (transaction.finished !== "commit") {
      await transaction.rollback(); // ➡ Nếu có lỗi, rollback giao dịch.
    }
    console.error("❌ Lỗi chi tiết:", error);
    return res.status(500).json({
      // ↳ Trả về status 500 Internal Server Error.
      message: "Đã xảy ra lỗi khi tạo sản phẩm",
      error: error.message, // ➡ Trả về thông báo lỗi.
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).

  const deleteProduct = await db.Product.destroy({
    // ↳ Xóa sản phẩm theo id trong database.
    where: { id },
  });
  if (deleteProduct) {
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: "Xóa sản phẩm thành công",
    });
  } else {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Sản phẩm không tìm thấy",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const product = await db.Product.findByPk(id); // ↳ Tìm sản phẩm theo id chính (Primary Key).
  if (!product) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Sản phẩm không tồn tại",
    });
  }

  const { attributes = [], ...productData } = req.body; // ➡ Lấy dữ liệu từ body.
  const [updateRowCount] = await db.Product.update(productData, {
    // ↳ Cập nhật sản phẩm theo id trong database với dữ liệu từ req.body.
    where: { id },
  });

  if (updateRowCount > 0) {
    for (const attr of attributes) {
      // ↳ Duyệt qua từng thuộc tính trong mảng attributes.
      const [attribute] = await db.Attribute.findOrCreate({
        // ↳ Tìm hoặc tạo mới thuộc tính (attribute) trong database.
        where: { name: attr.name }, // ➡ Tìm thuộc tính theo name.
      });

      const productAttributeValue = await db.ProductAttributeValue.findOne({
        // ↳ Tìm thuộc tính giá trị sản phẩm (product attribute value) trong database.
        where: {
          product_id: id,
          attribute_id: attribute.id,
        },
      });

      if (productAttributeValue) {
        await db.ProductAttributeValue.update({ value: attr.value });
        // ↳ Cập nhật giá trị thuộc tính trong bảng ProductAttributeValue.
      } else {
        await db.ProductAttributeValue.create({
          // ↳ Tạo mới thuộc tính giá trị sản phẩm (product attribute value) trong database.
          product_id: id,
          attribute_id: attribute.id,
          value: attr.value,
        });
      }
    }

    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: "Cập nhật sản phẩm thành công",
    });
  } else {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Sản phẩm không tồn tại",
    });
  }
};
