const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { BannerStatus } = require("../constants");
const { getAvatarUrl } = require("../helpers");

exports.getBanners = async (req, res) => {
  const { search = "", page = 1 } = req.query; // Lấy search (chuỗi tìm kiếm) và page (trang hiện tại) từ query URL. Mặc định search = "", page = 1.
  const pageSize = 5; // Hiển thị 5 banner mỗi trang.
  const offset = (page - 1) * pageSize; // offset là số banner cần bỏ qua.

  let whereClause = {}; // Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  if (search.trim() !== "") {
    // ↳ Nếu search không rộng, thì lọc banner theo name chứa chuỗi search.
    whereClause = {
      name: { [Op.like]: `%${search}%` }, // Tìm banner có name chứa từ khóa search.
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

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy danh sách banner thành công",
    data: banners.map((banner) => ({
      // ↳ Trả về mảng bài viết (mảng object) bao góc bảng banner.
      ...banner.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(banner.image), // ➡ Lấy URL hình anh bảng banner.
    })),
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalBanners / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalBanners, // ➡ tổng số banner.
  });
};

exports.getBannerById = async (req, res) => {
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
