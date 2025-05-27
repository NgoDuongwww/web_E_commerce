const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");

exports.getDiscounts = async (req, res) => {
  const { search = "", page = 1 } = req.query; // ➡ Lấy search (chuỗi tìm kiếm) và page (trang hiện tại) từ query URL. Mặc định search = "", page = 1.
  const pageSize = 5; // ➡ Hiển thị 5 danh mục mỗi trang.
  const offset = (page - 1) * pageSize; // ➡ offset là số danh mục cần bỏ qua.

  let whereClause = {}; // ➡ Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  if (search.trim() !== "") {
    // ↳ Nếu search không rỗng, thì lọc danh mục theo code, percent_value, max_discount chứa chuỗi search.
    whereClause = {
      [Op.or]: [
        // ↳ Tạo điều kiện lọc theo OR cho nhiều cột.
        { code: { [Op.like]: `%${search}%` } }, // ➡ Tìm danh mục có code chứa từ khóa search.
        { percent_value: { [Op.like]: `%${search}%` } }, // ➡ Tìm danh mục có percent_value chứa từ khóa search.
        { max_discount: { [Op.like]: `%${search}%` } }, // ➡ Tìm danh mục có max_discount chứa từ khóa search.
      ],
    };
  }

  const [discounts, totalDiscounts] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.Discount.findAll({
      // ↳ Lấy danh sách danh mục (theo phân trang và lọc nếu có).
      where: whereClause, 
      include: [
        // ↳ Kết hợp với bảng Brand và Category.
        {
          model: db.Brand, // ➡ Chỉ định model cần join.
          required: true, // ➡ Là bắt buộc phải có dữ liệu trong bảng Brand.
        },
        {
          model: db.Category, // ➡ Chỉ định model cần join.
          required: true, // ➡ Là bắt buộc phải có dữ liệu trong bảng Category.
        },
      ],
      limit: pageSize,
      offset: offset,
    }),
    db.Discount.count({
      // ↳ Đếm tổng số danh mục (để tính tổng số trang).
      where: whereClause, 
    }),
  ]);

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy danh sách giảm giá thành công",
    data: discounts.map((discount) => ({
      // ↳ Trả về mảng bài viết (mảng object) bao góc bảng danh mục.
      ...discount.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      brand: discount.Brand.name, // ➡ Lấy tên thương hiệu từ bảng Brand.
      category: discount.Category.name, // ➡ Lấy tên danh mục từ bảng Category.
    })),
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalDiscounts / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalDiscounts, // ➡ tổng số danh mục.
  });
};

exports.getDiscountById = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const discountById = await db.Discount.findByPk(id, {
    // ↳ Tìm sản phẩm theo id (khóa chính) trong database.
    include: [
      // ↳ Kết hợp với bảng Brand và Category.
      {
        model: db.Brand, // ➡ Chỉ định model cần join.
        required: true, // ➡ Là bắt buộc phải có dữ liệu trong bảng.
        attributes: ["name"], // ➡ Lấy thống tin của model.
      },
      {
        model: db.Category, // ➡ Chỉ định model cần join.
        required: true, // ➡ Là bắt buộc phải có dữ liệu trong bảng.
        attributes: ["name"], // ➡ Lấy thống tin của model.
      },
    ],
  });

  if (!discountById) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Mã giảm giá không tìm thấy",
    });
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy thông tin giảm giá thành công",
    data: discountById,
  });
};

exports.insertDiscount = async (req, res) => {
  const { code, brand_id, category_id } = req.body; // ➡ Lấy dữ liệu từ body.

  const brandExisting = await db.Brand.findByPk(brand_id); // ➡ Tìm thương hiệu theo id chính (Primary Key).
  if (!brandExisting) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Thương hiệu không tìm thấy",
    });
  }

  const categoryExisting = await db.Category.findByPk(category_id); // ➡ Tìm danh mục theo id chính (Primary Key).
  if (!categoryExisting) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Danh mục không tìm thấy",
    });
  }

  const discountExisting = await db.Discount.findOne({
    // ↳ Tìm mã giảm giá theo code trong database.
    where: { code: code },
    include: [
      // ↳ Kết hợp với bảng Brand và Category.
      {
        model: db.Brand, // ➡ Chỉ định model cần join.
        required: true, // ➡ Là bắt buộc phải có dữ liệu trong bảng Brand.
      },
      {
        model: db.Category, // ➡ Chỉ định model cần join.
        required: true, // ➡ Là bắt buộc phải có dữ liệu trong bảng Category.
      },
    ],
  });
  if (discountExisting) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: "Mã giảm giá tồn tại",
    });
  }

  const newDiscount = await db.Discount.create(req.body); // ➡ Tạo giảm giá trong database với dữ liệu từ body.
  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: "Tạo giảm giá thành công",
    data: {
      ...newDiscount.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      brand: brandExisting.name, // ➡ Lấy tên thương hiệu từ bảng Brand.
      category: categoryExisting.name, // ➡ Lấy tên danh mục từ bảng Category.
    },
  });
};

exports.deleteDiscount = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const discountById = await db.Discount.findByPk(id); // ➡ Tìm giảm giá theo id chính (Primary Key).

  if (!discountById) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Mã giảm giá không tìm thấy",
    });
  }

  await db.Discount.destroy({ where: { id } }); // ➡ Xóa giảm giá theo id.

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Xóa mã giảm giá thành công",
  });
};

exports.updateDiscount = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const discount = await db.Discount.findByPk(id); // ➡ Tìm giảm giá theo id chính (Primary Key).
  if (!discount) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Mã giảm giá không tìm thấy",
    });
  }

  const { code } = req.body; // ➡ Lấy dữ liệu từ body.
  const discountExisting = await db.Discount.findOne({
    // ↳ Tìm mã giảm giá theo code trong database.
    where: {
      code, // ➡ Tìm mã giảm giá theo code trong database.
      id: { [Sequelize.Op.ne]: id }, // ➡ Tìm mã giảm giá có id khác với id trong body.
    },
  });
  if (discountExisting) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: "Mã giảm giá tồn tại",
    });
  }

  await db.Discount.update(req.body, { where: { id } }); // ➡ Cập nhật giảm giá theo id trong database với dữ liệu từ req.body.
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Cập nhật giảm giá thành công",
  });
};
