const Sequelize = require('sequelize')
const { Op } = Sequelize
const db = require('../models')
const ResponseUser = require('../dto/response/user/ResponseUser.js')
const argon2 = require('argon2')
const UserRole = require('../constants/UserRole.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { getAvatarUrl } = require('../helpers')

exports.registerUser = async (req, res) => {
  const { email, phone, password } = req.body // ➡ Lấy dữ liệu từ body.

  if (!email && !phone) {
    return res.status(400).json({
      // ↳ Trả về status 400 Bad Request.
      message: 'Vui lòng nhập email hoặc sđt',
    })
  }

  const condition = {} // ➡ Tạo một object condition.
  if (email) condition.email = email // ➡ Nếu email khác rỗng, gán email vào condition.
  if (phone) condition.phone = phone // ➡ Nếu phone khác rỗng, gán phone vào condition.

  const existingUser = await db.User.findOne({ where: condition }) // ➡ Tìm kiếm người dùng theo condition.
  if (existingUser) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: 'Email hoặc sđt đã tồn tại',
    })
  }

  const hashedPassword = password ? await argon2.hash(req.body.password) : null
  // ↳ req.body.password là mật khẩu gốc người dùng nhập.
  // ↳ hashedPassword là chuỗi mật khẩu đã được mã hóa (không thể đọc ngược).
  const newUser = await db.User.create({
    ...req.body, // ➡ Läy lấy tất cả các trường khác từ request (email, name, role, phone, v.v).
    email,
    phone,
    role: UserRole.USER,
    password: hashedPassword,
  }) // ➡ Tạo mới người dùng từ dữ liệu req.body đã được xử lý thông qua class RegisterUserRequest, rồi lưu vào database.

  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: 'Đăng ký người dùng mới thành công',
    data: new ResponseUser(newUser), // ➡ Người dùng mới được tạo.
  })
}

exports.registerAdmin = async (req, res) => {
  const { email, phone, password } = req.body // ➡ Lấy dữ liệu từ body.

  if (!email && !phone) {
    return res.status(400).json({
      // ↳ Trả về status 400 Bad Request.
      message: 'Vui lòng nhập email hoặc sđt',
    })
  }

  const condition = {} // ➡ Tạo một object condition.
  if (email) condition.email = email // ➡ Nếu email khác rỗng, gán email vào condition.
  if (phone) condition.phone = phone // ➡ Nếu phone khác rỗng, gán phone vào condition.

  const existingUser = await db.User.findOne({ where: condition }) // ➡ Tìm kiếm người dùng theo condition.
  if (existingUser) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: 'Email hoặc sđt đã tồn tại',
    })
  }

  const hashedPassword = password ? await argon2.hash(req.body.password) : null
  // ↳ req.body.password là mật khẩu gốc người dùng nhập.
  // ↳ hashedPassword là chuỗi mật khẩu đã được mã hóa (không thể đọc ngược).
  const newUser = await db.User.create({
    ...req.body, // ➡ Läy lấy tất cả các trường khác từ request (email, name, role, phone, v.v).
    email,
    phone,
    role: UserRole.ADMIN,
    password: hashedPassword,
  }) // ➡ Tạo mới người dùng từ dữ liệu req.body đã được xử lý thông qua class RegisterUserRequest, rồi lưu vào database.

  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: 'Đăng ký người dùng mới thành công',
    data: new ResponseUser(newUser), // ➡ Người dùng mới được tạo.
  })
}

exports.loginUser = async (req, res) => {
  const { email, phone, password } = req.body // ➡ Lấy dữ liệu từ body.

  if (!email && !phone) {
    return res.status(400).json({
      // ↳ Trả về status 400 Bad Request.
      message: 'Vui lòng nhập email hoặc sđt',
    })
  }

  const condition = {} // ➡ Tạo một object condition.
  if (email) condition.email = email // ➡ Nếu email khác rỗng, gán email vào condition.
  if (phone) condition.phone = phone // ➡ Nếu phone khác rỗng, gán phone vào condition.

  const existingUser = await db.User.findOne({ where: condition }) // ➡ Tìm kiếm người dùng theo condition.
  if (!existingUser) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Email hoặc sđt không tìm thấy',
    })
  }

  const passwordValid = await argon2.verify(existingUser.password, password) // ➡ Kiểm tra mật khẩu người dùng nhập với mật khẩu trong database.
  if (!passwordValid) {
    return res.status(401).json({
      // ↳ Trả về status 401 Unauthorized.
      message: 'Mật khẩu không chính xác',
    })
  }

  const token = jwt.sign(
    {
      id: existingUser.id, // ➡ Quan trọng nhất
      iat: Math.floor(Date.now() / 1000), // ➡ Thời điểm người dùng được cấp token (tính bằng giây).
      // role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION, // ➡ Cấu hình thời gian hết hạn cho token.
    },
  )
  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Đăng nhập người dùng thành công',
    data: new ResponseUser(existingUser), // ➡ Người dùng được tạo.
    token,
  })
}

exports.updateUser = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).
  const { name, avatar, old_password, new_password } = req.body // ➡ Lấy dữ liệu từ body.

  const user = await db.User.findByPk(id) // ➡ Tìm kiếm người dùng theo id.
  if (!user) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Người dùng không tìm thấy',
    })
  }

  if (new_password && old_password) {
    // ↳ Khi người dùng nhập mật khẩu cũ và mật khẩu mới.
    const passwordValid = await argon2.verify(user.password, old_password) // ➡ Kiểm tra mật khẩu người dùng nhập với mật khẩu trong database.
    if (!passwordValid) {
      return res.status(401).json({
        // ↳ Trả về status 401 Unauthorized.
        message: 'Mật khẩu cũ không chính xác',
      })
    }

    user.password = await argon2.hash(new_password) // ➡ Gán mật khẩu mới.
    user.password_changed_at = new Date() // ➡ Cập nhật thời gian đổi mật khẩu.
  } else if (new_password || old_password) {
    // ↳ Khi người dùng không nhập mật khẩu cũ hoặc mật khẩu mới.
    return res.status(400).json({
      // ↳ Trả về status 400 Bad Request.
      message: 'Vui lòng nhập mật khẩu cũ và mật khẩu mới',
    })
  }

  user.name = name || user.name // ➡ Nếu name khác rỗng, gán name vào user.name.
  user.avatar = avatar || user.avatar // ➡ Nếu avatar khác rỗng, gán avatar vào user.avatar.
  await user.save() // ➡ Lưu người dùng.

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: 'Cập nhật người dùng thành công',
    data: {
      ...user.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chứa dữ liệu thực (không kèm các method và metadata của Sequelize).
      avatar: getAvatarUrl(user.avatar), // ➡ Lấy URL avatar bảng User.
    },
  })
}

exports.getUserById = async (req, res) => {
  const { id } = req.params // ➡ Lấy id từ params (đường dẫn).

  if (req.user.id != id && req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({
      // ↳ Trả về status 403 Forbidden.
      message: 'Chỉ người dùng hoặc quản trị viên mới có quyền truy cập',
    })
  }

  const user = await db.User.findByPk(id, {
    attributes: { exclude: ['password'] },
  })
  if (!user) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: 'Người dùng không tìm thấy',
    })
  }

  return res.status(200).json({
    message: 'Lấy thông tin người dùng thành công',
    data: {
      ...user.get({ plain: true }),
      // ↳ .get({ plain: true }) sẽ chuyển instance đó thành một JavaScript object bình thường,
      // ↳ chỉ chúa dữ liệu thực (không kèm các method và metadata của Sequelize).
      avatar: getAvatarUrl(user.avatar), // ➡ Lấy URL avatar bảng User.
    },
  })
}
