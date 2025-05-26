const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const getAvatarUrl = require("./imageHelper");
const { UserRole, BannerStatus } = require("../constants");

module.exports = async ({
  search = "",
  page = 1,
  checkRole = UserRole.USER,
}) => {
  const pageSize = 5; // Hiển thị 5 banner mỗi trang.
  const offset = (page - 1) * pageSize; // offset là số banner cần bỏ qua.

  let whereClause = {}; // Tạo điều kiện lọc (WHERE) cho câu truy vấn.

  const searchCondition =
    search.trim() !== "" ? { name: { [Op.like]: `%${search}` } } : {};
  // ↳ Nếu search không rỗng, thì lọc banner theo name chứa chuỗi search.

  if (checkRole === UserRole.ADMIN) {
    // ↳ Nếu là ADMIN, thì lấy tất cả banner (không phân biệt trạng thái).
    whereClause = {
      [Op.and]: [
        // ↳ Tạo điều kiện lọc theo AND cho nhiều cột.
        ...(searchCondition ? [searchCondition] : []), // ➡ Nếu có searchCondition thì thêm vào mảng điều kiện.
      ],
    };
  } else {
    // ↳ Nếu không phải là ADMIN, thì chỉ lấy banner có trạng thái ACTIVE.
    whereClause = {
      [Op.and]: [
        // ↳ Tạo điều kiện lọc theo AND cho nhiều cột.
        ...(searchCondition ? [searchCondition] : []), // ➡ Nếu có searchCondition thì thêm vào mảng điều kiện.
        { status: BannerStatus.ACTIVE }, // ➡ Chỉ lấy banner có trạng thái ACTIVE.
      ],
    };
  }

  const [banners, totalBanners] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.Banner.findAll({
      // ↳ Lấy danh sách banner (theo phân trang và lọc nếu có).
      where: whereClause, // Tìm banner theo name chứa từ khóa search.
      limit: pageSize,
      offset: offset,
    }),
    db.Banner.count({
      // ↳ Đếm tổng số banner (để tính tổng số trang).
      where: whereClause, // Tìm banner theo name chứa từ khóa search.
    }),
  ]);

  return {
    banners: banners.map((banner) => ({
      // ↳ Trả về mảng bài viết (mảng object) bao góc bảng banner.
      ...banner.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(banner.image), // ➡ Lấy URL hình anh bảng banner.
    })),
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalBanners / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalBanners, // ➡ tổng số banner.
  };
};
