const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const ResponseUser = require("../dto/response/user/ResponseUser.js");
const argon2 = require("argon2");
const UserRole = require("../constants/UserRole.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { getAvatarUrl } = require("../helpers");

exports.registerUser = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email && !phone) {
    return res.status(400).json({
      message: "Vui lòng nhập email hoặc sđt",
    });
  }

  const condition = {};
  if (email) condition.email = email;
  if (phone) condition.phone = phone;

  const existingUser = await db.User.findOne({ where: condition });
  if (existingUser) {
    return res.status(409).json({
      message: "Email hoặc sđt đã tồn tại",
    });
  }

  const hashedPassword = password ? await argon2.hash(req.body.password) : null;

  const newUser = await db.User.create({
    ...req.body,
    email,
    phone,
    role: UserRole.USER,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "Đăng ký người dùng mới thành công",
    data: new ResponseUser(newUser),
  });
};

exports.registerAdmin = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email && !phone) {
    return res.status(400).json({
      message: "Vui lòng nhập email hoặc sđt",
    });
  }

  const condition = {};
  if (email) condition.email = email;
  if (phone) condition.phone = phone;

  const existingUser = await db.User.findOne({ where: condition });
  if (existingUser) {
    return res.status(409).json({
      message: "Email hoặc sđt đã tồn tại",
    });
  }

  const hashedPassword = password ? await argon2.hash(req.body.password) : null;

  const newUser = await db.User.create({
    ...req.body,
    email,
    phone,
    role: UserRole.ADMIN,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "Đăng ký người dùng mới thành công",
    data: new ResponseUser(newUser),
  });
};

exports.loginUser = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email && !phone) {
    return res.status(400).json({
      message: "Vui lòng nhập email hoặc sđt",
    });
  }

  const condition = {};
  if (email) condition.email = email;
  if (phone) condition.phone = phone;

  const existingUser = await db.User.findOne({ where: condition });
  if (!existingUser) {
    return res.status(404).json({
      message: "Email hoặc sđt không tìm thấy",
    });
  }

  const passwordValid = await argon2.verify(existingUser.password, password);
  if (!passwordValid) {
    return res.status(401).json({
      message: "Mật khẩu không chính xác",
    });
  }

  const token = jwt.sign(
    {
      id: existingUser.id,
      iat: Math.floor(Date.now() / 1000),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );
  return res.status(200).json({
    message: "Đăng nhập người dùng thành công",
    data: new ResponseUser(existingUser),
    token,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, avatar, old_password, new_password } = req.body;

  const user = await db.User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      message: "Người dùng không tìm thấy",
    });
  }

  if (new_password && old_password) {
    const passwordValid = await argon2.verify(user.password, old_password);
    if (!passwordValid) {
      return res.status(401).json({
        message: "Mật khẩu cũ không chính xác",
      });
    }

    user.password = await argon2.hash(new_password);
    user.password_changed_at = new Date();
  } else if (new_password || old_password) {
    return res.status(400).json({
      message: "Vui lòng nhập mật khẩu cũ và mật khẩu mới",
    });
  }

  user.name = name || user.name;
  user.avatar = avatar || user.avatar;
  await user.save();

  return res.status(200).json({
    message: "Cập nhật người dùng thành công",
    data: {
      ...user.get({ plain: true }),

      avatar: getAvatarUrl(user.avatar),
    },
  });
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  if (req.user.id != id && req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({
      message: "Chỉ người dùng hoặc quản trị viên mới có quyền truy cập",
    });
  }

  const user = await db.User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    return res.status(404).json({
      message: "Người dùng không tìm thấy",
    });
  }

  return res.status(200).json({
    message: "Lấy thông tin người dùng thành công",
    data: {
      ...user.get({ plain: true }),

      avatar: getAvatarUrl(user.avatar),
    },
  });
};
