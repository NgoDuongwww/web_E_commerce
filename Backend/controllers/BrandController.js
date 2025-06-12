const Sequelize = require('sequelize')
const { Op } = Sequelize
const db = require('../models')
const { getAvatarUrl } = require('../helpers')

exports.getBrands = async (req, res) => {
  const { search = '', page = 1 } = req.query // ➡ Lấy search (chuỗi tìm kiếm) và page (trang hiện tại) từ query URL. Mặc định search = "", page = 1.
  const pageSize = 5 // ➡ Hiển thị 5 thương hiệu mỗi trang.
  const offset = (page - 1) * pageSize // ➡ offset là số thương hiệu cần bỏ qua.

  let whereClause = {} // ➡ Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  if (search.trim() !== '') {
    // ↳ Nếu search không rỗng, thì lọc thương hiệu theo name chứa chuỗi search.
    whereClause = {
      [Op.or]: [
        // ↳ Tạo điều kiện lọc theo OR cho nhiều cột.
        { name: { [Op.like]: `%${search}%` } }, // ➡ Tìm thương hiệu có name chứa từ khóa search.
      ],
    }
  }

  const [brands, totalBrands] = await Promise.all([
    db.Brand.findAll({
      // ↳ Lấy danh sách thương hiệu (theo phân trang và lọc nếu có).
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.Brand.count({
      // ↳ Đếm tổng số thương hiệu (để tính tổng số trang).
      where: whereClause,
    }),
  ])

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Lấy danh sách thương hiệu thành công',
    data: brands.map((brand) => ({
      // ↳ Trả về mảng bài viết (mảng object) bao góc bảng thương hiệu.
      ...brand.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chua dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(brand.image), // ➡ Lấy URL hình anh bảng thương hiệu.
    })),
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalBrands / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalBrands, // ➡ tổng số thương hiệu.
  })
}

exports.getBrandById = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).

  const brandById = await db.Brand.findByPk(id) // ➡ Tìm thương hiệu theo id chính (Primary Key).
  if (!brandById) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Thương hiệu không tìm thấy',
    })
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Lây thông tin thương thiệu thành công',
    data: {
      ...brandById.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chua dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(brandById.image), // ➡ Lấy URL hình anh bảng thương hiệu.
    },
  })
}

exports.insertBrand = async (req, res) => {
  const { name } = req.body // ➡ Lấy dữ liệu từ body.
  const existingBrand = await db.Brand.findOne({
    // ↳ Tìm thương hiệu theo name trong database.
    where: { name: name.trim() }, // ➡ Sử dụng trim() để loại bỏ khoảng trắng đầu và cuối.
  })
  if (existingBrand) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: 'Tên thương hiệu đã tồn tại',
      data: existingBrand,
    })
  }

  const newBrand = await db.Brand.create(req.body) // ➡ Tạo thương thiệu mới trong database với dữ liệu từ req.body.
  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: 'Thêm thương hiệu thành công',
    data: {
      ...newBrand.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chua dữ liệu thực (không kèm các method và metadata của Sequelize).
      image: getAvatarUrl(newBrand.image), // ➡ Lấy URL hình anh bảng thương hiệu.
    },
  })
}

exports.deleteBrand = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).

  const deleteBrand = await db.Brand.destroy({
    where: { id }, // ➡ Xóa thương hiệu theo id trong database.
  })
  if (deleteBrand) {
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: 'Xóa thương hiệu thành công',
    })
  } else {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Thương hiệu không tìm thấy',
    })
  }
}

exports.updateBrand = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).
  const brand = await db.Brand.findByPk(id) // ➡ Tìm thương hiệu theo id chính (Primary Key).
  if (!brand) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Thương hiệu không tìm thấy',
    })
  }

  const { name } = req.body // ➡ Lấy dữ liệu từ body.
  const existingBrand = await db.Brand.findOne({
    // ↳ Tìm thương hiệu theo name trong database.
    where: {
      name: name, // ➡ Tìm thương hiệu có name trùng với name trong body.
      id: { [Sequelize.Op.ne]: id }, // ➡ Tìm thương hiệu có id khác với id trong body.
    },
  })
  if (existingBrand) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: 'Tên thương hiệu đã tồn tại',
      data: existingBrand,
    })
  }

  await db.Brand.update(req.body, {
    where: { id }, // ➡ Cập nhật thương hiệu theo id trong database.
  })
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Cập nhật thương hiệu thành công',
  })
}
