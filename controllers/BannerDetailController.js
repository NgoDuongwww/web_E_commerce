const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { getAvatarUrl } = require("../helpers");

exports.getBannerDetails = async (req, res) => {
  const { page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  const [bannerDetails, totalBannerDetails] = await Promise.all([
    db.BannerDetail.findAll({
      limit: pageSize,
      offset: offset,
      include: [
        {
          model: db.Banner,
        },
        {
          model: db.Product,
        },
      ],
    }),
    db.BannerDetail.count(),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách chi tiết banner thành công",
    bannerDetails: bannerDetails,
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalBannerDetails / pageSize),
    total: totalBannerDetails,
  });
};

exports.getBannerDetailById = async (req, res) => {
  const { id } = req.params;

  const bannerDetail = await db.BannerDetail.findByPk(id, {
    include: [{ model: db.Banner }, { model: db.Product }],
  });
  if (!bannerDetail) {
    return res.status(404).json({
      message: "Không tìm thấy chi tiết banner",
    });
  }

  return res.status(200).json({
    message: "Lấy chi tiết banner thành công",
    bannerDetail: bannerDetail,
  });
};

exports.insertBannerDetail = async (req, res) => {
  const { product_id, banner_id } = req.body;

  const productExists = await db.Product.findByPk(product_id);
  if (!productExists) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  const bannerExists = await db.Banner.findByPk(banner_id);
  if (!bannerExists) {
    return res.status(404).json({
      message: "Không tìm thấy banner",
    });
  }

  const duplicateExists = await db.BannerDetail.findOne({
    where: { product_id, banner_id },
  });
  if (duplicateExists) {
    return res.status(409).json({
      message: "Chi tiết banner đã tồn tại",
      data: duplicateExists,
    });
  }

  const newBannerDetail = await db.BannerDetail.create({
    product_id,
    banner_id,
  });

  return res.status(201).json({
    message: "Tạo mới chi tiết banner thành công",
    bannerDetail: newBannerDetail,
  });
};

exports.deleteBannerDetail = async (req, res) => {
  const { id } = req.params;

  const deleteBannerDetail = await db.BannerDetail.destroy({
    where: { id: id },
  });
  if (deleteBannerDetail) {
    return res.status(200).json({
      message: "Xóa chi tiết banner thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy chi tiết banner",
    });
  }
};

exports.updateBannerDetail = async (req, res) => {
  const { id } = req.params;

  const { product_id, banner_id } = req.body;
  const existingDuplicate = await db.BannerDetail.findOne({
    where: {
      product_id,
      banner_id,
      id: { [Sequelize.Op.ne]: id },
    },
  });
  if (existingDuplicate) {
    return res.status(409).json({
      message: "Chi tiết banner đã tồn tại",
      data: existingDuplicate,
    });
  }

  const updatedBannerDetail = await db.BannerDetail.update(
    { product_id, banner_id },
    { where: { id: id } }
  );
  return res.status(200).json({
    message: "Cập nhật chi tiết banner thành công",
  });
};
