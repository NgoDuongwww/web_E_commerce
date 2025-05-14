const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");

exports.getCartItems = async (req, res) => {
  const { cart_id, page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  const whereClause = {};
  if (cart_id) whereClause.cart_id = cart_id;

  const [cartItems, totalCartItems] = await Promise.all([
    db.CartItem.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.CartItem.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách sản phẩm trong giỏ hàng thành công",
    data: cartItems,
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalCartItems / pageSize),
    total: totalCartItems,
  });
};

exports.getCartItemById = async (req, res) => {
  const { id } = req.params;
  const cartItem = await db.CartItem.findByPk(id);

  if (!cartItem) {
    return res.status(404).json({
      message: "Sản phẩm trong giỏ hàng không tìm thấy",
    });
  }

  return res.status(200).json({
    message: "Lấy thông tin sản phẩm trong giỏ hàng thành công",
    data: cartItem,
  });
};

exports.getCartItemByCartId = async (req, res) => {
  const { cart_id } = req.params;
  const cartItems = await db.CartItem.findAll({
    where: { cart_id: cart_id },
  });

  if (!cartItems || cartItems.length === 0) {
    return res.status(404).json({
      message: "Không tìm thấy giỏ hàng",
    });
  }

  return res.status(200).json({
    message: "Lấy danh sách sản phẩm trong giỏ hàng thành công",
    data: cartItems,
  });
};

exports.insertCartItem = async (req, res) => {
  const { cart_id, product_variant_id, quantity } = req.body;

  const productExists = await db.ProductVariantValue.findByPk(
    product_variant_id
  );
  if (!productExists) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  if (productExists.quantity < quantity) {
    return res.status(400).json({
      message: "Sản phẩm không đủ số lượng yêu cầu",
    });
  }

  const cartExists = await db.Cart.findByPk(cart_id);
  if (!cartExists) {
    return res.status(404).json({
      message: "Không tìm thấy giỏ hàng",
    });
  }

  const existingCartItem = await db.CartItem.findOne({
    where: {
      cart_id: cart_id,
      product_variant_id: product_variant_id,
    },
  });
  if (existingCartItem) {
    existingCartItem.quantity += quantity;
    await existingCartItem.save();
    return res.status(200).json({
      message: "Cập nhật số lượng sản phẩm vào giỏ hàng thành công",
      data: existingCartItem,
    });
  } else {
    if (quantity > 0) {
      const newCartItem = await db.CartItem.create(req.body);
      return res.status(201).json({
        message: "Thêm sản phẩm vào giỏ hàng thành công",
        data: newCartItem,
      });
    }
  }
};

exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.CartItem.destroy({
    where: { id },
  });

  if (deleted) {
    return res.status(200).json({
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
    });
  } else {
    return res.status(404).json({
      message: "Sản phẩm trong giỏ hàng không tồn tại",
    });
  }
};
