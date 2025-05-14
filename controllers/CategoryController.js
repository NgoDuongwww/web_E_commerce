const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const category = require("../models/category");
const { getAvatarUrl } = require("../helpers");

exports.getCategories = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
    };
  }

  const [categories, totalCategories] = await Promise.all([
    db.Category.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Category.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách danh mục thành công",
    data: categories.map((category) => ({
      ...category.get({ plain: true }),

      image: getAvatarUrl(category.image),
    })),
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalCategories / pageSize),
    total: totalCategories,
  });
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  const categoryById = await db.Category.findByPk(id);

  if (!categoryById) {
    return res.status(404).json({
      message: "Danh mục không tìm thấy",
    });
  }

  return res.status(200).json({
    message: "Lấy thông tin danh mục thành công",
    data: {
      ...categoryById.get({ plain: true }),

      image: getAvatarUrl(categoryById.image),
    },
  });
};

exports.insertCategory = async (req, res) => {
  const { name } = req.body;
  const existingCategory = await db.Category.findOne({
    where: { name: name.trim() },
  });
  if (existingCategory) {
    return res.status(409).json({
      message: "Tên danh mục đã tồn tại",
    });
  }

  const newCategory = await db.Category.create(req.body);
  res.status(201).json({
    message: "Thêm danh mục thành công",
    data: {
      ...newCategory.get({ plain: true }),

      image: getAvatarUrl(newCategory.image),
    },
  });
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  const deleteCategory = await db.Category.destroy({
    where: { id },
  });

  if (deleteCategory) {
    return res.status(200).json({
      message: "Xóa danh mục thành công",
    });
  } else {
    return res.status(404).josn({
      message: "Danh mục không tồn tại",
    });
  }
};
exports.updateCategory = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;
  const existingCategory = await db.Category.findOne({
    where: {
      name: name,
      id: { [Sequelize.Op.ne]: id },
    },
  });
  if (existingCategory) {
    return res.status(409).json({
      message: "Tên danh mục đã tồn tại",
    });
  }

  const updateCategory = await db.Category.update(req.body, {
    where: { id },
  });
  return res.status(200).json({
    message: "Cập nhật danh mục thành công",
  });
};
