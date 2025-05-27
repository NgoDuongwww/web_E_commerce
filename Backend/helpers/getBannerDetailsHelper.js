const db = require("../models");
const { BannerStatus, UserRole } = require("../constants");

module.exports = async ({ page = 1, checkRole = UserRole.USER }) => {
  const pageSize = 5; // ➡ Hiển thị 5 banner mỗi trang.
  const offset = (page - 1) * pageSize; // ➡ offset là số banner cần bỏ qua.

  let bannerInclude = [
    {
      model: db.Banner, // ➡ Kết hợp với bảng Banner (banner).
    },
    {
      model: db.Product, // ➡ Kết hợp với bảng Product (sản phẩm).
    },
  ];

  if (checkRole !== UserRole.ADMIN) {
    bannerInclude = [
      {
        model: db.Banner, // ➡ Kết hợp với bảng Banner (banner).
        where: { status: BannerStatus.ACTIVE }, // ➡ Chỉ lấy banner có trạng thái ACTIVE.
        required: true, // ➡ Bắt buộc phải có banner.
      },
      {
        model: db.Product, // ➡ Kết hợp với bảng Product (sản phẩm).
      },
    ];
  }

  const [bannerDetails, totalBannerDetails] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.BannerDetail.findAll({
      // ↳ Lấy danh sách chi tiết banner (theo phân trang và lọc nếu có).
      limit: pageSize, // ➡ Giới hạn số lượng banner lấy về.
      offset: offset, // ➡ Bỏ qua số lượng banner đã chỉ định.
      include: bannerInclude, // ➡ Kết hợp với bảng Banner.
    }),
    db.BannerDetail.count(), // ➡ Đếm tổng số banner (để tính tổng số trang).
  ]);

  return {
    bannerDetails: bannerDetails, // ➡ danh sách banner.
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalBannerDetails / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalBannerDetails, // ➡ tổng số chi tiết banner.
  };
};
