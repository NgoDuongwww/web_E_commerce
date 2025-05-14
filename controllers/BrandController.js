const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { getAvatarUrl } = require("../helpers");

exports.getBrands = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
    };
  }

  const [brands, totalBrands] = await Promise.all([
    db.Brand.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Brand.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách thương hiệu thành công",
    data: brands.map((brand) => ({
      ...brand.get({ plain: true }),

      image: getAvatarUrl(brand.image),
    })),
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalBrands / pageSize),
    total: totalBrands,
  });
};

exports.getBrandById = async (req, res) => {
  const { id } = req.params;

  const brandById = await db.Brand.findByPk(id);
  if (!brandById) {
    return res.status(404).json({
      message: "Thương hiệu không tìm thấy",
    });
  }

  return res.status(200).json({
    message: "Lây thông tin thương thiệu thành công",
    data: {
      ...brandById.get({ plain: true }),

      image: getAvatarUrl(brandById.image),
    },
  });
};

exports.insertBrand = async (req, res) => {
  const { name } = req.body;
  const existingBrand = await db.Brand.findOne({
    where: { name: name.trim() },
  });
  if (existingBrand) {
    return res.status(409).json({
      message: "Tên thương hiệu đã tồn tại",
      data: existingBrand,
    });
  }

  const newBrand = await db.Brand.create(req.body);
  return res.status(201).json({
    message: "Thêm thương hiệu thành công",
    data: {
      ...newBrand.get({ plain: true }),

      image: getAvatarUrl(newBrand.image),
    },
  });
};

exports.deleteBrand = async (req, res) => {
  const { id } = req.params;

  const deleteBrand = await db.Brand.destroy({
    where: { id },
  });
  if (deleteBrand) {
    return res.status(200).json({
      message: "Xóa thương hiệu thành công",
    });
  } else {
    return res.status(404).json({
      message: "Thương hiệu không tìm thấy",
    });
  }
};

exports.updateBrand = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;
  const existingBrand = await db.Brand.findOne({
    where: {
      name: name,
      id: { [Sequelize.Op.ne]: id },
    },
  });
  if (existingBrand) {
    return res.status(409).json({
      message: "Tên thương hiệu đã tồn tại",
      data: existingBrand,
    });
  }

  const updateBrand = await db.Brand.update(req.body, {
    where: { id },
  });
  return res.status(200).json({
    message: "Cập nhật thương hiệu thành công",
  });
};
