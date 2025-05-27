const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { OrderStatus } = require("../constants");

exports.getCarts = async (req, res) => {
  const { user_id, page = 1 } = req.query; // ➡ Lấy user_id và page (trang hiện tại) từ query URL. Mặc định page = 1.
  const pageSize = 5; // ➡ Hiển thị 5 giỏ hàng mỗi trang.
  const offset = (page - 1) * pageSize; // ➡ offset là số giỏ hàng cần bỏ qua.

  let whereClause = {}; // ➡ Tạo điều kiện lọc (WHERE) cho câu truy vấn.
  if (user_id) whereClause.user_id = user_id; // ➡ Tìm giỏ hàng theo user_id.

  const [carts, totalCarts] = await Promise.all([
    // ↳ Chạy song song 2 truy vấn:
    db.Cart.findAll({
      // ↳ Lấy danh sách giỏ hàng (theo phân trang và lọc nếu có).
      where: whereClause, 
      include: [
        // Kết nối với bảng CartItem.
        {
          model: db.CartItem, // ➡ Chỉ định model cần join.
          as: "cart_Items", // ➡ Đặt tên alias cho mối quan hệ này.
        },
      ],
      limit: pageSize,
      offset: offset,
    }),
    db.Cart.count({
      // ↳ Đếm tổng số giỏ hàng (để tính tổng số trang).
      where: whereClause, 
    }),
  ]);

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy danh sách giỏ hàng thành công",
    data: carts, // ↳ danh sách giỏ hàng.
    current_page: parseInt(page, 10), // ➡ trang hiện tại.
    total_page: Math.ceil(totalCarts / pageSize), // ➡ tổng số trang (ceil để làm tròn lên).
    total: totalCarts, // ➡ tổng số giỏ hàng.
  });
};

exports.getCartById = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const cart = await db.Cart.findByPk(id, {
    // ↳ Tìm giỏ hàng theo id (khóa chính) trong database.
    include: [
      // ↳ Kết hợp với bảng CartItem.
      {
        model: db.CartItem, // ➡ Chỉ định model cần join.
        as: "cart_Items", // ➡ Đặt tên alias cho mối quan hệ này.
      },
    ],
  });

  if (!cart) {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Giỏ hàng không tìm thấy",
    });
  }

  return res.status(200).json({
    // ↳ Trả về status 200 OK.
    message: "Lấy thông tin giỏ hàng thành công",
    data: cart, // ➡ Thong tin giỏ hàng.
  });
};

exports.insertCart = async (req, res) => {
  const { user_id } = req.body; // ➡ Lấy dữ liệu từ body.

  if (user_id === undefined) {
    return res.status(400).json({
      // ↳ Trả về status 400 Bad Request.
      message: "Cần cung cấp một giá trị user_id",
    });
  }

  const existingCart = await db.Cart.findOne({
    // ↳ Tìm giỏ hàng theo user_id trong database.
    where: {
      [Op.or]: {
        user_id: user_id ? user_id : null, // ➡ Tìm giỏ hàng theo user_id hoặc user_id null.
      },
    },
  });
  if (existingCart) {
    return res.status(409).json({
      // ↳ Trả về status 409 Conflict.
      message: "Một giỏ hàng cùng user_id này đã tổn tại",
    });
  }

  const newCart = await db.Cart.create(req.body); // ➡ Tạo giỏ hàng.
  return res.status(201).json({
    // ↳ Trả về status 201 Created.
    message: "Tạo giỏ hàng thành công",
    data: newCart, // ➡ Thông tin giỏ hàng.
  });
};

exports.checkoutCart = async (req, res) => {
  const { cart_id, total, note, discount_id } = req.body; // ➡ Lấy dữ liệu từ body.
  const transaction = await db.sequelize.transaction(); // ➡ Tạo giao dịch.

  try {
    const cart = await db.Cart.findByPk(cart_id, {
      // ↳ Tìm giỏ hàng theo cart_id trong database.
      include: [
        // ↳ Kết hợp với bảng CartItem.
        {
          model: db.CartItem, // ➡ Chỉ định model cần join.
          as: "cart_Items", // ➡ Đặt tên alias cho mối quan hệ này.
          required: true, // ➡ Là bắt buộc phải có trong dữ liệu gửi lên.
          include: [
            // ↳ Kết hợp với bảng ProductVariantValue.
            {
              model: db.ProductVariantValue, // ➡ Chỉ định model cần join.
              required: true, // ➡ Là bắt buộc phải có trong dữ liệu gửi lên.
              include: [
                {
                  model: db.Product, // ➡ Chỉ định model cần join.
                  required: true, // ➡ Là bắt buộc phải có trong dữ liệu gửi lên.
                },
              ],
            },
          ],
        },
      ],
    });
    if (!cart || !cart.cart_Items.length) {
      return res.status(404).json({
        // ↳ Trả về status 404 Not Found.
        message: "Không tìm thấy giỏ hàng",
      });
    }

    let discountAmount = 0; // ➡ Khởi tạo discountAmount bằng 0.
    let discountRecord = null; // ➡ Khởi tạo discountRecord bằng null.
    if (discount_id) {
      discountRecord = await db.Discount.findOne({
        // ↳ Tìm discount theo discount_id trong database.
        where: { id: discount_id, expires_at: { [Op.gt]: new Date() } },
        // ↳ id: discount_id: Lọc bản ghi theo ID khuyến mãi.
        // ↳ [Op.gt]: new Date(): 'ấy những bản ghi có expires_at lớn hơn (tức là sau) thời điểm hiện tại.
        // ↳ [Op.gt] là toán tử "greater than" (>).
      });
      if (!discountRecord) {
        return res.status(400).json({
          // ↳ Trả về status 400 Bad Request.
          message: "Không tìm thấy mã giảm giá",
        });
      }

      const validItems = cart.cart_Items.filter((item) => {
        // ↳ Lọc ra các sản phẩm hợp lệ trong giỏ hàng và lưu vào biến validItems.
        // ↳ cart.cart_Items: là một mảng chứa các sản phẩm trong giỏ hàng.
        // Mỗi phần tử (gọi là item) đại diện cho một sản phẩm.
        const product = item.ProductVariantValue.Product; // ➡ Truy cập sâu vào từng sản phẩm để lấy thông tin gốc của sản phẩm.
        if (!product) return false; // ➡ Nếu không có sản phẩm thì trả về false (không hợp lệ).
        return (
          product.brand_id === discountRecord.brand_id && // ➡ Kiểm tra xem brand_id của sản phẩm có trùng với brand_id của mã giảm giá hay không.
          product.category_id === discountRecord.category_id // ➡ Kiểm tra xem category_id của sản phẩm có trùng với category_id của mã giảm giá hay không.
        );
      });

      const validTotal = validItems.reduce(
        // ↳ Tính tổng giá trị của các sản phẩm hợp lệ.
        (sum, item) => sum + item.quantity * item.ProductVariantValue.price, // ➡ Cộng số tiền của item vào tổng.
        // ↳ item.quantity: Số lượng sản phẩm trong giỏ hàng.
        // ↳ item.ProductVariantValue.price: Giá của sản phẩm.
        // ↳ item.ProductVariantValue: Là một đối tượng chứa thông tin về biến thể của sản phẩm (như kích thước, màu sắc, v.v.).
        0 // ➡ Giá trị khởi tạo của biến sum là 0.
      );

      if (validTotal < discountRecord.min_total) {
        return res.status(400).json({
          // ↳ Trả về status 400 Bad Request.
          message: `Mã giảm giá chỉ áp dụng khi mua sản phẩm hợp lệ từ ${discountRecord.min_total.toLocaleString()}₫`,
          // ↳ discountRecord.min_total: Giá trị tối thiểu (số) để được giảm giá.
          // ↳ .toLocaleString(): Chuyển số thành chuỗi có định dạng theo ngôn ngữ địa phương (thêm dấu phân cách hàng nghìn).
        });
      }

      discountAmount = Math.min(
        // ↳ Tính toán số tiền giảm giá.
        validTotal * (discountRecord.percent_value / 100), // ➡ Tính số tiền giảm dựa trên phần trăm (%).
        discountRecord.max_discount // ➡ Mức giảm giá tối đa được phép.
      );
    }

    // Tổng tiền ban đầu (tự tính nếu client không gửi)
    const firstTotal = cart.cart_Items.reduce(
      // ↳ Tính tổng giá trị của giỏ hàng.
      (sum, item) => sum + item.quantity * item.ProductVariantValue.price, // ➡ Cộng số tiền của item vào tổng.
      // ↳ item.quantity: Số lượng sản phẩm trong giỏ hàng.
      // ↳ item.ProductVariantValue.price: Giá của sản phẩm.
      // ↳ item.ProductVariantValue: Là một đối tượng chứa thông tin về biến thể của sản phẩm (như kích thước, màu sắc, v.v.).
      0 // ➡ Giá trị khởi tạo của biến sum là 0.
    );

    const finalTotal = (total || firstTotal) - discountAmount; // ➡ Tính tổng tiền cuối cùng sau khi giảm giá.

    const newOrder = await db.Order.create(
      // ↳ Tạo đơn hàng mới trong database.
      {
        user_id: cart.user_id, // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
        status: OrderStatus.PENDING,
        total: finalTotal,
        note: note,
        discount_id: discountRecord ? discountRecord.id : null,
        discount_amount: discountAmount,
      },
      { transaction: transaction } // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
    );

    for (let item of cart.cart_Items) {
      // ↳ Duyệt qua từng sản phẩm trong giỏ hàng.
      if (item.ProductVariantValue.stock < item.quantity) {
        // ↳ Kiểm tra xem số lượng sản phẩm trong kho có đủ không.
        // ↳ item.ProductVariantValue.stock: Số lượng sản phẩm trong kho.
        // ↳ item.quantity: Số lượng sản phẩm trong giỏ hàng.
        throw new Error(
          `Sản phẩm "${item.ProductVariantValue.id}" không đủ hàng.`
        );
      }

      await db.OrderDetail.create(
        // ↳ Tạo dữ liệu trong bảng OrderDetail.
        {
          order_id: newOrder.id, // ➡ Gán từng trường dữ liệu vào thuộc tính của đối tượng.
          product_variant_id: item.ProductVariantValue.id,
          quantity: item.quantity,
          price: item.ProductVariantValue.price,
        },
        { transaction: transaction } // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
      );

      await db.Product.increment(
        // ↳ Tăng số lượng sản phẩm đã bán trong bảng Product.
        {
          buyturn: 1, // ➡ Tăng số lượng sản phẩm đã bán lên 1.
          total_sold: item.quantity, // ➡ Tăng tổng số sản phẩm đã bán lên số lượng trong giỏ hàng.
        },
        {
          transaction: transaction, // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
          where: { id: item.ProductVariantValue.product_id }, // ➡ Tìm sản phẩm theo product_id trong bảng ProductVariantValue.
        }
      );

      await db.ProductVariantValue.decrement(
        // ↳ Giảm số lượng sản phẩm trong kho trong bảng ProductVariantValue.
        {
          stock: item.quantity, // ➡ Giảm số lượng sản phẩm trong kho theo số lượng trong giỏ hàng.
        },
        {
          transaction: transaction, // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
          where: { id: item.ProductVariantValue.id }, // ➡ Tìm sản phẩm theo id trong bảng ProductVariantValue.
        }
      );
    }

    await db.CartItem.destroy(
      // ↳ Xóa tất cả bản ghi trong bảng CartItem liên quan đến giỏ hàng này.
      {
        where: { cart_id: cart_id },
      },
      { transaction: transaction } // ➡ Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu.
    );

    await cart.destroy({ transaction: transaction }); // ➡ Xóa giỏ hàng.

    await transaction.commit(); // ➡ Cam kết giao dịch.
    return res.status(201).json({
      // ↳ Trả về status 201 Created.
      message: "Thanh toán giỏ hàng thành công",
      data: {
        // ➡ Trả về thông tin đơn hàng đã tạo.
        order_id: newOrder.id,
        user_id: newOrder.user_id,
        status: newOrder.status,
        total: newOrder.total,
        note: newOrder.note,
        discount_id: newOrder.discount_id,
        discount_amount: newOrder.discount_amount,
        created_at: newOrder.created_at,
        updated_at: newOrder.updated_at,
      },
    });
  } catch (error) {
    await transaction.rollback(); // ➡ Hoàn tác giao dịch.
    console.error("❌ Lỗi chi tiết:", error);
    return res.status(500).json({
      // ↳ Trả về status 500 Internal Server Error.
      message: "Đã xảy ra lỗi khi tạo sản phẩm",
      error: error.message, // ➡ Trả về thông báo lỗi.
    });
  }
};

exports.deleteCart = async (req, res) => {
  const { id } = req.params; // ➡ Lấy id từ params (đường dẫn).
  const deleted = await db.Cart.destroy({
    where: { id }, // ➡ Xóa giỏ hàng theo id trong database.
  });

  if (deleted) {
    return res.status(200).json({
      // ↳ Trả về status 200 OK.
      message: "Xóa giỏ hàng thành công",
    });
  } else {
    return res.status(404).json({
      // ↳ Trả về status 404 Not Found.
      message: "Giỏ hàng không tồn tại",
    });
  }
};
