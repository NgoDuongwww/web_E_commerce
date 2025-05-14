const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { BannerStatus } = require("../constants");
const { getAvatarUrl } = require("../helpers");

exports.getBanners = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      name: { [Op.like]: `%${search}%` },
    };
  }

  const [banners, totalBanners] = await Promise.all([
    db.Banner.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Banner.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách banner thành công",
    data: banners.map((banner) => ({
      ...banner.get({ plain: true }),

      image: getAvatarUrl(banner.image),
    })),
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalBanners / pageSize),
    total: totalBanners,
  });
};

exports.getBannerById = async (req, res) => {
  const { id } = req.params;

  const bannerById = await db.Banner.findByPk(id);
  if (!bannerById) {
    return res.status(404).json({
      message: "Không tìm thấy banner",
    });
  }

  return res.status(200).json({
    message: "Lấy thông tin banner thành công",
    data: {
      ...bannerById.get({ plain: true }),

      image: getAvatarUrl(bannerById.image),
    },
  });
};

exports.insertBanner = async (req, res) => {
  const { name } = req.body;

  const existingBanner = await db.Banner.findOne({
    where: { name: name.trim() },
  });
  if (existingBanner) {
    return res.status(409).json({
      message: "Tên banner đã tồn tại",
    });
  }

  const banner = {
    ...req.body,
    status: BannerStatus.ACTIVE,
  };

  const newBanner = await db.Banner.create(banner);
  return res.status(201).json({
    message: "Tạo banner mới thành công",
    data: {
      ...newBanner.get({ plain: true }),

      image: getAvatarUrl(newBanner.image),
    },
  });
};

exports.deleteBanner = async (req, res) => {
  const { id } = req.params;
  const transaction = await db.sequelize.transaction();

  try {
    await db.BannerDetail.destroy({
      where: { banner_id: id },
      transaction,
    });
    const deletedBanner = await db.Banner.destroy({
      where: { id },
      transaction,
    });
    if (deletedBanner) {
      await transaction.commit();
      return res.status(200).json({
        message: "Xóa banner thành công",
      });
    } else {
      await transaction.rollback();
      return res.status(404).json({
        message: "Không tìm thấy banner",
      });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: "Lỗi khi xóa banner",
      error: error.message,
    });
  }
};

exports.updateBanner = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;
  const existingBanner = await db.Banner.findOne({
    where: {
      name: name,
      id: { [Sequelize.Op.ne]: id },
    },
  });
  if (existingBanner) {
    return res.status(409).json({
      message: "Tên banner đã tồn tại",
      data: existingBanner,
    });
  }

  const updatedBanner = await db.Banner.update(req.body, {
    where: { id },
  });
  return res.status(200).json({
    message: "Cập nhật banner thành công",
  });
};
