const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { BannerStatus, UserRole } = require("../constants");
const { getBannerDetails } = require("../helpers");

exports.getBannerDetailsForAdmin = async (req, res) => {
  const { page } = req.query; // ➡ Lấy page (trang hiện tại) từ query URL. Mặc định page = 1.
  const result = await getBannerDetails({ page, checkRole: UserRole.ADMIN });
  // ↳ Sử dụng hàm getBannerDetails để lấy danh sách chi tiết banner với phân trang và lọc nếu có.

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy danh sách chi tiết banner thành công",
    bannerDetails: result.bannerDetails, // ➡ danh sách banner.
    current_page: result.current_page, // ➡ trang hiện tại.
    total_page: result.total_page, // ➡ tổng số trang (ceil để làm tròn lên).
    total: result.total, // ➡ tổng số chi tiết banner.
  });
};

exports.getBannerDetailByIdForAdmin = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).

  const bannerDetail = await db.BannerDetail.findByPk(id, {
    // ↳ Tìm kiếm banner theo id.
    include: [
      {
        model: db.Banner, // ➡ Kết hợp với bảng Banner (banner).
      },
      {
        model: db.Product, // ➡ Kết hợp với bảng Product (sản phẩm).
      },
    ], // ➡ Kết hợp với bảng Banner và Product.
  });
  if (!bannerDetail) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Không tìm thấy chi tiết banner",
    });
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy chi tiết banner thành công",
    bannerDetail: bannerDetail, // ➡ banner tìm thấy.
  });
};

exports.getBannerDetailsForPublic = async (req, res) => {
  const { page } = req.query; // ➡ Lấy page (trang hiện tại) từ query URL. Mặc định page = 1.
  const result = await getBannerDetails({ page, checkRole: UserRole.USER });
  // ↳ Sử dụng hàm getBannerDetails để lấy danh sách chi tiết banner với phân trang và lọc nếu có.

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy danh sách chi tiết banner thành công",
    bannerDetails: result.bannerDetails, // ➡ danh sách banner.
    current_page: result.current_page, // ➡ trang hiện tại.
    total_page: result.total_page, // ➡ tổng số trang (ceil để làm tròn lên).
    total: result.total, // ➡ tổng số chi tiết banner.
  });
};

exports.getBannerDetailByIdForPublic = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).

  const bannerDetail = await db.BannerDetail.findByPk(id, {
    // ↳ Tìm kiếm banner theo id.
    include: [
      {
        model: db.Banner, // ➡ Kết hợp với bảng Banner (banner).
        where: { status: BannerStatus.ACTIVE }, // ➡ Chỉ lấy banner có trạng thái ACTIVE.
        required: true, // ➡ Bắt buộc phải có banner (nếu không có sẽ không lấy được chi tiết).
      },
      {
        model: db.Product, // ➡ Kết hợp với bảng Product (sản phẩm).
      },
    ], // ➡ Kết hợp với bảng Banner và Product.
  });
  if (!bannerDetail) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Không tìm thấy chi tiết banner",
    });
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy chi tiết banner thành công",
    bannerDetail: bannerDetail, // ➡ banner tìm thấy.
  });
};

exports.insertBannerDetail = async (req, res) => {
  const { product_id, banner_id } = req.body; // ➡ Lấy dữ liệu từ body.

  const productExists = await db.Product.findByPk(product_id); // ↳ Tìm kiếm sản phẩm theo product_id.
  if (!productExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Không tìm thấy sản phẩm",
    });
  }

  const bannerExists = await db.Banner.findByPk(banner_id); // ↳ Tìm kiếm banner theo banner_id.
  if (!bannerExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Không tìm thấy banner",
    });
  }

  const duplicateExists = await db.BannerDetail.findOne({
    // ↳ Kiểm tra xem chi tiết banner tồn tại chưa.
    where: { product_id, banner_id }, // ➡ Tìm kiếm theo product_id và banner_id.
  });
  if (duplicateExists) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: "Chi tiết banner đã tồn tại",
      data: duplicateExists,
    });
  }

  const newBannerDetail = await db.BannerDetail.create({
    product_id,
    banner_id,
  }); // ↳ Tạo mới chi tiết banner.
  // ↳ Tạo mới chi tiết banner với product_id và banner_id.
  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: "Tạo mới chi tiết banner thành công",
    bannerDetail: newBannerDetail, // ➡ chi tiết banner vừa tạo.
  });
};

exports.deleteBannerDetail = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).

  const deleteBannerDetail = await db.BannerDetail.destroy({
    where: { id: id }, // ➡ Xóa chi tiết banner theo id.
  });
  if (deleteBannerDetail) {
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: "Xóa chi tiết banner thành công",
    });
  } else {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Không tìm thấy chi tiết banner",
    });
  }
};

exports.updateBannerDetail = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const bannerDetail = await db.BannerDetail.findByPk(id); // ↳ Tìm banner detail theo id chính (Primary Key).
  if (!bannerDetail) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Không tìm thấy chi tiết banner",
    });
  }

  const { product_id, banner_id } = req.body; // ➡ Lấy dữ liệu từ body.
  const existingDuplicate = await db.BannerDetail.findOne({
    // ↳ Kiểm tra xem chi tiết banner tồn tại chưa.
    where: {
      product_id, // ➡ Tìm kiếm theo product_id.
      banner_id, // ➡ Tìm kiếm theo banner_id.
      id: { [Sequelize.Op.ne]: id }, // ➡ Không tìm kiếm theo id hiện tại (để tránh xung đột khi cập nhật).
    },
  });
  if (existingDuplicate) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: "Chi tiết banner đã tồn tại",
      data: existingDuplicate,
    });
  }

  await db.BannerDetail.update(
    { product_id, banner_id }, // ➡ Cập nhật dữ liệu mới.
    { where: { id: id } } // ➡ Cập nhật theo id.
  );
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Cập nhật chi tiết banner thành công",
  });
};
