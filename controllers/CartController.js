const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { required } = require("joi");
const { OrderStatus } = require("../constants");
const { getAvatarUrl } = require("../helpers");

exports.getCarts = async (req, res) => {
  const { session_id, user_id, page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (session_id) whereClause.session_id = session_id;
  if (user_id) whereClause.user_id = user_id;

  const [carts, totalCarts] = await Promise.all([
    db.Cart.findAll({
      where: whereClause,
      include: [
        {
          model: db.CartItem,
          as: "cart_Items",
        },
      ],
      limit: pageSize,
      offset: offset,
    }),
    db.Cart.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách giỏ hàng thành công",
    data: carts,
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalCarts / pageSize),
    total: totalCarts,
  });
};

exports.getCartById = async (req, res) => {
  const { id } = req.params;
  const cart = await db.Cart.findByPk(id, {
    include: [
      {
        model: db.CartItem,
        as: "cart_Items",
      },
    ],
  });

  if (!cart) {
    return res.status(404).json({
      message: "Giỏ hàng không tìm thấy",
    });
  }

  return res.status(200).json({
    message: "Lấy thông tin giỏ hàng thành công",
    data: cart,
  });
};

exports.insertCart = async (req, res) => {
  const { session_id, user_id } = req.body;

  if ((session_id && user_id) || (!session_id && !user_id)) {
    return res.status(400).json({
      message: "Chỉ được cung cấp một trong 2 giá trị session_id hoặc user_id",
    });
  }

  const existingCart = await db.Cart.findOne({
    where: {
      [Op.or]: {
        session_id: session_id ? session_id : null,
        user_id: user_id ? user_id : null,
      },
    },
  });
  if (existingCart) {
    return res.status(409).json({
      message: "Một giỏ hàng cùng user_id với session_id này đã tổn tại",
    });
  }

  const newCart = await db.Cart.create(req.body);
  return res.status(201).json({
    message: "Tạo giỏ hàng thành công",
    data: newCart,
  });
};

exports.checkoutCart = async (req, res) => {
  const { cart_id, total, note } = req.body;
  const transaction = await db.sequelize.transaction();

  try {
    const cart = await db.Cart.findByPk(cart_id, {
      include: [
        {
          model: db.CartItem,
          as: "cart_Items",
          required: true,
          include: [
            {
              model: db.ProductVariantValue,
              required: true,
            },
          ],
        },
      ],
    });
    if (!cart || !cart.cart_Items.length) {
      return res.status(404).json({
        message: "Không tìm thấy giỏ hàng",
      });
    }

    const newOrder = await db.Order.create(
      {
        user_id: cart.user_id,
        session_id: cart.session_id,
        status: OrderStatus.PENDING,
        total:
          total ||
          cart.cart_Items.reduce(
            (acc, item) => acc + item.quantity * item.ProductVariantValue.price,
            0
          ),
        note: note,
      },
      { transaction: transaction }
    );

    for (let item of cart.cart_Items) {
      await db.OrderDetail.create(
        {
          order_id: newOrder.id,
          product_variant_id: item.ProductVariantValue.id,
          quantity: item.quantity,
          price: item.ProductVariantValue.price,
        },
        { transaction: transaction }
      );
    }

    await db.CartItem.destroy(
      {
        where: { cart_id: cart_id },
      },
      { transaction: transaction }
    );

    await cart.destroy({ transaction: transaction });

    await transaction.commit();
    return res.status(201).json({
      message: "Thanh toán giỏ hàng thành công",
      data: newOrder.id,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: "Thanh toán giỏ hàng không thành công",
      error: error.message,
    });
  }
};

exports.deleteCart = async (req, res) => {
  const { id } = req.params;
  const deleted = await db.Cart.destroy({
    where: { id },
  });

  if (deleted) {
    return res.status(200).json({
      message: "Xóa giỏ hàng thành công",
    });
  } else {
    return res.status(404).json({
      message: "Giỏ hàng không tồn tại",
    });
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  const updateCart = await db.Cart.update(req.body, {
    where: { id },
  });

  return res.status(200).json({
    message: "Cập nhật giỏ hàng thành công",
  });
};
