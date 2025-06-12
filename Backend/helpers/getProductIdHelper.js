const Sequelize = require('sequelize')
const { Op } = Sequelize
const db = require('../models')
const getAvatarUrl = require('./imageHelper')
const { UserRole } = require('../constants')

/**
 * Lấy thông tin chi tiết của sản phẩm theo id, kèm theo ảnh, thuộc tính và biến thể.
 *
 * @param {Object} params - Tham số truyền vào.
 * @param {number} params.id - Id của sản phẩm cần lấy.
 * @param {UserRole} [params.checkRole=UserRole.USER] - Quyền của người dùng, mặc định là USER.
 *
 * @returns {Promise<{
 *  product: object;
 *  product_images: string[];
 *  attributes: { name: string; value: string }[];
 *  variants: {
 *    id: number;
 *    price: number;
 *    old_price: number;
 *    stock: number;
 *    sku: string;
 *    values: { id: number; name: string; value: string; image: string | null }[];
 *  }[];
 * } | null>}
 */

module.exports = async ({ id, checkRole = UserRole.USER }) => {
  let whereClause = { id } // ➡ Tạo điều kiện lọc (WHERE) cho câu truy vấn.

  if (checkRole === UserRole.USER) {
    whereClause = { id, is_visible: true } // ➡ Chèn điều kiện lọc is_visible: true.
  }

  const productById = await db.Product.findOne({
    // ↳ Tìm sản phẩm theo id (khóa chính) trong database.
    where: whereClause,
    include: [
      // ↳ Kết hợp với bảng ProductImage, ProductAttributeValue, ProductVariantValue.
      {
        model: db.ProductImage, // ➡ Chỉ định model cần join.
        as: 'product_images', // ➡ Đặt tên alias cho mối quan hệ này.
      },
      {
        model: db.ProductAttributeValue,
        as: 'attributes',
        include: [
          // ↳ Kết hợp với bảng Attribute.
          {
            model: db.Attribute,
            as: 'attribute',
            attributes: ['id', 'name'], // ➡ Lấy thống tin của model.
          },
        ],
      },
      {
        model: db.ProductVariantValue,
        as: 'variants',
        attributes: ['id', 'price', 'old_price', 'stock', 'sku'], // ➡ Lấy thống tin của model.
      },
    ],
  })
  if (!productById) {
    return null
  }

  const variantValuesData = [] // ➡ Tạo mảng rỗng để lưu trữ các giá trị biến thể mới.
  for (const variant of productById.variants) {
    const variantValueIds = variant.sku.split('-').map(Number)
    const variantValues = await db.VariantValue.findAll({
      where: { id: variantValueIds },
      include: [
        // ↳ Kết hợp với bảng Variant.
        {
          model: db.Variant, // ➡ Chỉ định model cần join.
          as: 'variant', // ➡ Đặt tên alias cho mối quan hệ này.
          attributes: ['id', 'name'], // ➡ Lấy thống tin của model.
        },
      ],
    })
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
    })
  }

  return {
    product: productById.get({ plain: true }),
    // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
    // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
    product_images: productById.product_images.map((img) =>
      // ↳ Lấy tất cả các ảnh của sản phẩm.
      getAvatarUrl(img.get({ plain: true }).image_url),
    ),
    attributes: productById.attributes.map((attr) => ({
      // ↳ Lấy tất cả thống tính của sản phẩm (attributes).
      // ↳ Với mỗi phần tử attr, tạo object mới.
      name: attr.attribute?.name || '', // ➡ Lấy tên Attribute (nếu không có thì gán rỗng).
      value: attr.value, // ➡ Lấy giá trị Attribute.
    })),
    variants: variantValuesData,
  }
}
