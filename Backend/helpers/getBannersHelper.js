const Sequelize = require('sequelize')
const { Op } = Sequelize
const db = require('../models')
const getAvatarUrl = require('./imageHelper')
const { UserRole, BannerStatus } = require('../constants')

/**
 * Lấy danh sách banner theo phân trang, có thể tìm kiếm theo tên và lọc theo quyền người dùng.
 *
 * @param {Object} params - Tham số truyền vào.
 * @param {string} [params.search=""] - Từ khóa tìm kiếm banner theo tên.
 * @param {number} [params.page=1] - Trang hiện tại cần lấy, mặc định là 1.
 * @param {UserRole} [params.checkRole=UserRole.USER] - Quyền của người dùng, mặc định là USER.
 *
 * @returns {Promise<{
 *  banners: {
 *    id: number;
 *    name: string;
 *    image: string;
 *    status: string;
 *    createdAt: string;
 *    updatedAt: string;
 *    // Các trường khác trong bảng Banner.
 *  }[];
 *  current_page: number;
 *  total_page: number;
 *  total: number;
 * }>}
 */

module.exports = async ({
  search = '',
  page = 1,
  checkRole = UserRole.USER,
}) => {
  const pageSize = 5 // Hiển thị 5 banner mỗi trang.
  const offset = (page - 1) * pageSize // offset là số banner cần bỏ qua.

  let whereClause = {} // Tạo điều kiện lọc (WHERE) cho câu truy vấn.

  const searchCondition =
    search.trim() !== '' ? { name: { [Op.like]: `%${search}` } } : {}
  // ↳ Nếu search không rỗng, thì lọc banner theo name chứa chuỗi search.

  if (checkRole === UserRole.ADMIN) {
    whereClause = {
      [Op.and]: [
        // ↳ Tạo điều kiện lọc theo AND cho nhiều cột.
        ...(searchCondition ? [searchCondition] : []), // ➡ Nếu có searchCondition thì thêm vào mảng điều kiện.
      ],
    }
  } else {
    whereClause = {
      [Op.and]: [
        // ↳ Tạo điều kiện lọc theo AND cho nhiều cột.
        ...(searchCondition ? [searchCondition] : []), // ➡ Nếu có searchCondition thì thêm vào mảng điều kiện.
        { status: BannerStatus.ACTIVE }, // ➡ Chỉ lấy banner có trạng thái ACTIVE.
      ],
    }
  }

  const [banners, totalBanners] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.Banner.findAll({
      // ↳ Lấy danh sách banner (theo phân trang và lọc nếu có).
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Banner.count({
      // ↳ Đếm tổng số banner (để tính tổng số trang).
      where: whereClause,
    }),
  ])

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
  }
}
