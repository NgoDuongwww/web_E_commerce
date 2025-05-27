const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { getAvatarUrl } = require("../helpers");

exports.getCategories = async (req, res) => {
  const { search = "", page = 1 } = req.query; // ➡ Lấy search (chuỗi tìm kiếm) và page (trang hiện tại) từ query URL. Mặc định search = "", page = 1.
  const pageSize = 5; // ➡ Hiển thị 5 danh mục mỗi trang.
  const offset = (page - 1) * pageSize; // ➡ offset là số danh mục cần bỏ qua.

  let whereClause = {}; // ➡ Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  if (search.trim() !== "") {
    // ↳ Nếu search không rỗng, thì lọc danh mục theo name chứa chuỗi search.
    whereClause = {
      [Op.or]: [
        // ↳ Tạo điều kiện lọc theo OR cho nhiều cột.
        { name: { [Op.like]: `%${search}%` } }, // ➡ Tìm danh mục có name chứa từ khóa search.
      ],
    };
  }

  const [categories, totalCategories] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.Category.findAll({
      // ↳ Lấy danh sách danh mục (theo phân trang và lọc nếu có).
      where: whereClause, 
      limit: pageSize,
      offset: offset,
    }),
    db.Category.count({
      // ↳ Đếm tổng số danh mục (để tính tổng số trang).
      where: whereClause, 
    }),
  ]);

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy danh sách danh mục thành công",
    data: categories.map((category) => ({
      // ↳ Trả về mảng bài viết (mảng object) bao góc bảng danh mục.
      ...category.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(category.image), // ➡ Lấy URL hình anh bảng danh mục.
    })),
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalCategories / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalCategories, // ➡ tổng số danh mục.
  });
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const categoryById = await db.Category.findByPk(id); // ➡ Tìm danh mục theo id chính (Primary Key).

  if (!categoryById) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Danh mục không tìm thấy",
    });
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy thông tin danh mục thành công",
    data: {
      ...categoryById.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chúa dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(categoryById.image), // ➡ Lấy URL hình anh bảng danh mục.
    },
  });
};

exports.insertCategory = async (req, res) => {
  const { name } = req.body; // ➡ Lấy dữ liệu từ body.
  const existingCategory = await db.Category.findOne({
    // ↳ Tìm danh mục theo name trong database.
    where: { name: name.trim() }, // ➡ Sử dụng trim() để loại bỏ khoảng trắng đầu và cuối.
  });
  if (existingCategory) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: "Tên danh mục đã tồn tại",
    });
  }

  const newCategory = await db.Category.create(req.body); // ➡ Tạo danh mục mới trong database với dữ liệu từ req.body.
  res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: "Thêm danh mục thành công",
    data: {
      ...newCategory.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chua dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(newCategory.image), // ➡ Lấy URL hình anh bảng danh mục.
    },
  });
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const deleteCategory = await db.Category.destroy({
    where: { id }, // ➡ Xóa danh mục theo id trong database.
  });

  if (deleteCategory) {
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: "Xóa danh mục thành công",
    });
  } else {
    return res.status(404).josn({
      // ↳ Trả về status 404 Not Found.
      message: "Danh mục không tồn tại",
    });
  }
};
exports.updateCategory = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const category = await db.Category.findByPk(id); // ➡ Tìm danh mục theo id chính (Primary Key).
  if (!category) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Danh mục không tìm thấy",
    });
  }

  const { name } = req.body; // ➡ Lấy dữ liệu từ body.
  const existingCategory = await db.Category.findOne({
    // ↳ Tìm danh mục theo name trong database.
    where: {
      name: name, // ➡ Tìm danh mục có name trùng với name trong body.
      id: { [Sequelize.Op.ne]: id }, // ➡ Tìm danh mục có id khác với id trong body.
    },
  });
  if (existingCategory) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: "Tên danh mục đã tồn tại",
    });
  }

  await db.Category.update(req.body, {
    where: { id }, // ➡ Cập nhật danh mục theo id trong database.
  });
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Cập nhật danh mục thành công",
  });
};
