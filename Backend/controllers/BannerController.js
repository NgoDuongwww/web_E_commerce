const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { BannerStatus, UserRole } = require("../constants");
const { getAvatarUrl, getBanners } = require("../helpers");

exports.getBannersForAdmin = async (req, res) => {
  const { search, page } = req.query;
  const result = await getBanners({ search, page, checkRole: UserRole.ADMIN  });

  return res.status(200).json({
    message: "Lấy danh sách banner thành công",
    data: result.banners,
    current_page: result.current_page,
    total_page: result.total_page,
    total: result.total,
  });
};

exports.getBannerByIdForAdmin = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).

  const bannerById = await db.Banner.findByPk(id); // Tìm banner theo id chính (Primary Key).
  if (!bannerById) {
    return res.status(404).json({
      // ➡ Trả về status 404 Not Found.
      message: "Không tìm thấy banner",
    });
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy thông tin banner thành công",
    data: {
      ...bannerById.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chúa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(bannerById.image), // ➡ Lấy URL hình anh bảng banner.
    },
  });
};

exports.getBannersForPublic = async (req, res) => {
  const { search, page } = req.query;
  const result = await getBanners({ search, page, checkRole: UserRole.USER });

  return res.status(200).json({
    message: "Lấy danh sách banner thành công",
    data: result.banners,
    current_page: result.current_page,
    total_page: result.total_page,
    total: result.total,
  });
};

exports.getBannerByIdForPublic = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).

  const bannerById = await db.Banner.findOne({
    // ↳ Tìm banner theo id chính (Primary Key).
    where: { id, status: BannerStatus.ACTIVE }, // ➡ Chỉ lấy banner có status là ACTIVE.
  });
  if (!bannerById) {
    return res.status(404).json({
      // ➡ Trả về status 404 Not Found.
      message: "Không tìm thấy banner",
    });
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy thông tin banner thành công",
    data: {
      ...bannerById.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chúa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(bannerById.image), // ➡ Lấy URL hình anh bảng banner.
    },
  });
};

exports.insertBanner = async (req, res) => {
  const { name } = req.body; // ➡ Lấy dữ liệu từ body.

  const existingBanner = await db.Banner.findOne({
    where: { name: name.trim() }, // ➡ Sử dụng trim() để loại bỏ khoảng trắng đầu và cuối.
  });
  if (existingBanner) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: "Tên banner đã tồn tại",
    });
  }

  const banner = {
    ...req.body, // ➡ Có dữ liệu từ body.
    status: BannerStatus.ACTIVE, // ➡ Trên bảng Banner, status cơ bản là ACTIVE.
  };

  const newBanner = await db.Banner.create(banner); // Tạo banner mới trong database.
  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: "Tạo banner mới thành công",
    data: {
      ...newBanner.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chúa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(newBanner.image), // ➡ Lấy URL hình anh bảng banner.
    },
  });
};

exports.deleteBanner = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const transaction = await db.sequelize.transaction(); // ➡ Tạo giao dịch.

  try {
    await db.BannerDetail.destroy({
      // ↳ Xóa tất cả bản ghi trong bảng BannerDetail liên quan đến banner này.
      where: { banner_id: id },
      transaction, // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
    });
    const deletedBanner = await db.Banner.destroy({
      // ↳ Xoá banner theo id trong database.
      where: { id },
      transaction, // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
    });
    if (deletedBanner) {
      await transaction.commit(); // ➡ Cam kết giao dịch.
      return res.status(200).json({
        // ↳ Trả về status 200 OK.
        message: "Xóa banner thành công",
      });
    } else {
      await transaction.rollback(); // ➡ Hoàn tác giao dịch.
      return res.status(404).json({
        // ➡ Trả về status 404 Not Found.
        message: "Không tìm thấy banner",
      });
    }
  } catch (error) {
    await transaction.rollback(); // ➡ Nếu có lỗi, hoàn tác giao dịch.
    return res.status(500).json({
      //  Trả về status 500 Internal Server Error.
      message: "Lỗi khi xóa banner",
      error: error.message, // ➡ Thông báo lỗi.
    });
  }
};

exports.updateBanner = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const banner = await db.Banner.findByPk(id); // Tìm banner theo id chính (Primary Key).
  if (!banner) {
    return res.status(404).json({
      // ➡ Trả về status 404 Not Found.
      message: "Không tìm thấy banner",
    });
  }

  const { name } = req.body; // ➡ Lấy dữ liệu từ body.
  const existingBanner = await db.Banner.findOne({
    // ↳ Tìm banner theo name trong database.
    where: {
      // ↳ Tìm banner có name trùng với name trong body.
      name: name, // ➡ name là trường trong bảng Banner.
      id: { [Sequelize.Op.ne]: id }, // ➡ id là trường trong bảng Banner.
    },
  });
  if (existingBanner) {
    return res.status(409).json({
      // ➡ Trả về status 409 Conflict.
      message: "Tên banner đã tồn tại",
      data: existingBanner,
    });
  }

  await db.Banner.update(req.body, {
    where: { id }, // ➡ Cập nhật banner theo id trong database.
  });
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Cập nhật banner thành công",
  });
};
