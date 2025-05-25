const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");

exports.getCartItems = async (req, res) => {
  const { cart_id, page = 1 } = req.query; // ➡ Lấy cart_id và page (trang hiện tại) từ query URL. Mặc định page = 1.
  const pageSize = 5; // ➡ Hiển thị 5 chi tiết giỏ hàng mỗi trang.
  const offset = (page - 1) * pageSize; // ➡ offset la số chi tiết giỏ hàng cần bỏ qua.

  const whereClause = {}; // ➡ Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  if (cart_id) whereClause.cart_id = cart_id; // ➡ Tìm chi tiết giỏ hàng theo cart_id.

  const [cartItems, totalCartItems] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.CartItem.findAll({
      // ↳ Lấy danh sách chi tiết giỏ hàng (theo phân trang và lọc nếu có).
      where: whereClause, // ➡ Tìm chi tiết giỏ hàng theo cart_id.
      limit: pageSize,
      offset: offset,
    }),
    db.CartItem.count({
      // ↳ Đếm tổng số chi tiết giỏ hàng (để tính tổng số trang).
      where: whereClause, // ➡ Tìm chi tiết giỏ hàng theo cart_id.
    }),
  ]);

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy danh sách sản phẩm trong giỏ hàng thành công",
    data: cartItems, // ➡ danh sách chi tiết giỏ hàng
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalCartItems / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalCartItems, // ➡ tổng số chi tiết giỏ hàng.
  });
};

exports.getCartItemById = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const cartItem = await db.CartItem.findByPk(id); // ➡ Tìm chi tiết giỏ hàng theo id (khóa chính) trong database.

  if (!cartItem) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Sản phẩm trong giỏ hàng không tìm thấy",
    });
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy thông tin sản phẩm trong giỏ hàng thành công",
    data: cartItem, // ➡ Thong tin chi tiết giỏ hàng.
  });
};

exports.getCartItemByCartId = async (req, res) => {
  const { cart_id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const cartItems = await db.CartItem.findAll({
    where: { cart_id: cart_id }, // ➡ Tìm chi tiết giỏ hàng theo cart_id.
  });

  if (!cartItems || cartItems.length === 0) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Không tìm thấy giỏ hàng",
    });
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy danh sách sản phẩm trong giỏ hàng thành công",
    data: cartItems, // ➡ danh sách chi tiết giỏ hàng
  });
};

exports.insertCartItem = async (req, res) => {
  const { cart_id, product_variant_id, quantity } = req.body; // ➡ Lấy dữ liệu từ body.

  const productExists = await db.ProductVariantValue.findByPk(
    product_variant_id
  ); // ➡ Tìm kiếm sản phẩm theo product_variant_id.
  if (!productExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Không tìm thấy sản phẩm",
    });
  }

  if (productExists.quantity < quantity) {
    // ↳ Kiểm tra số lượng sản phẩm có đủ không.
    return res.status(400).json({
      // ↳ Trả về status 400 Bad Request.
      message: "Sản phẩm không đủ số lượng yêu cầu",
    });
  }

  const cartExists = await db.Cart.findByPk(cart_id); // ➡ Tìm giỏ hàng theo cart_id.
  if (!cartExists) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Không tìm thấy giỏ hàng",
    });
  }

  const existingCartItem = await db.CartItem.findOne({
    // ↳ Tìm chi tiết giỏ hàng theo cart_id và product_variant_id.
    where: {
      cart_id: cart_id,
      product_variant_id: product_variant_id,
    },
  });
  if (existingCartItem) {
    existingCartItem.quantity += quantity; // ➡ Cập nhật số lượng sản phẩm trong giỏ hàng.
    await existingCartItem.save(); // ➡ Lưu lại thay đổi vào database.
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: "Cập nhật số lượng sản phẩm vào giỏ hàng thành công",
      data: existingCartItem, // ➡ Thong tin chi tiết giỏ hàng.
    });
  } else {
    if (quantity > 0) {
      const newCartItem = await db.CartItem.create(req.body);
      return res.status(201).json({
        // ↳ Trả về status 201 Created.
        message: "Thêm sản phẩm vào giỏ hàng thành công",
        data: newCartItem, // ➡ Thong tin chi tiết giỏ hàng.
      });
    }
  }
};

exports.deleteCartItem = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const deleted = await db.CartItem.destroy({
    where: { id }, // ➡ Xóa chi tiết giỏ hàng theo id trong database.
  });

  if (deleted) {
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
    });
  } else {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Sản phẩm trong giỏ hàng không tồn tại",
    });
  }
};
