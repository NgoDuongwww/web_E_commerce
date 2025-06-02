const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const getAvatarUrl = require("./imageHelper");
const { UserRole } = require("../constants");

/**
 * Lấy danh sách sản phẩm theo phân trang, có thể tìm kiếm và lọc theo vai trò người dùng.
 *
 * @param {Object} params - Tham số truyền vào.
 * @param {string} [params.search=""] - Từ khóa tìm kiếm sản phẩm theo tên, mô tả hoặc giá trị thuộc tính.
 * @param {number} [params.page=1] - Trang hiện tại cần lấy, mặc định là 1.
 * @param {UserRole} [params.checkRole=UserRole.USER] - Quyền của người dùng để lọc hiển thị sản phẩm (ví dụ: chỉ hiển thị sản phẩm có `is_visible=true` nếu là USER).
 *
 * @returns {Promise<{
 *  products: {
 *    id: number;
 *    name: string;
 *    description: string;
 *    image: string;
 *    is_visible: boolean;
 *    createdAt: string;
 *    updatedAt: string;
 *    attributes: { name: string; value: string }[];
 *  }[];
 *  current_page: number;
 *  total_page: number;
 *  total: number;
 * }>}
 */

module.exports = async ({
  search = "",
  page = 1,
  checkRole = UserRole.USER,
}) => {
  const pageSize = 10; // Hiển thị 10 sản phẩm mỗi trang.
  const offset = (page - 1) * pageSize; // offset là số sản phẩm cần bỏ qua.

  const searchs = search.trim(); // ➡ Lấy search (chuỗi tìm kiếm) và  trim (xóa khoảng trắng)
  const isSearching = searchs !== ""; // ➡ Kiểm tra xem search rỗng hay không.

  let whereClause = {}; // Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  if (checkRole === UserRole.USER) {
    whereClause = {
      is_visible: true,
      ...(isSearching && {
        [Op.or]: [
          // ↳ Tạo điều kiện lọc theo OR cho nhiều cột.
          { name: { [Op.like]: `%${searchs}%` } }, // ➡ Tìm sản phẩm có name chứa từ khóa search.
          { description: { [Op.like]: `%${searchs}%` } }, // ➡ Hoặc description chứa search.
        ],
      }),
    };
  } else {
    if (isSearching) {
      whereClause = {
        [Op.or]: [
          // ↳ Tạo điều kiện lọc theo OR cho nhiều cột.
          { name: { [Op.like]: `%${searchs}%` } }, // ➡ Tìm sản phẩm có name chứa từ khóa search.
          { description: { [Op.like]: `%${searchs}%` } }, // ➡ Hoặc description chứa search.
        ],
      };
    }
  }

  const attributeInclude = {
    model: db.ProductAttributeValue, // ➡ Chị định model cần join.
    as: "attributes",
    include: [
      // ↳ Kết hợp với bảng Attribute.
      {
        model: db.Attribute, // ➡ Chị định model cần join.
        as: "attribute",
      },
    ],
    required: false,
    ...(isSearching && {
      where: {
        value: { [Op.like]: `%${searchs}%` }, // ➡ Tìm thuộc tính có name chứa từ khóa search.
      },
    }),
  };

  const [products, totalProducts] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.Product.findAll({
      // ↳ Lấy danh sách sản phẩm (theo phân trang và lọc nếu có).
      where: whereClause,
      include: [attributeInclude],
      limit: pageSize,
      offset,
    }),
    db.Product.count({
      // ↳ Đếm tổng số sản phẩm (để tính tổng số trang).
      where: whereClause,
    }),
  ]);

  return {
    products: products.map((product) => ({
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
  };
};
