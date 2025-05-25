"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      Order.belongsTo(models.Discount, {
        // ↳ Một Order thuộc về một Discount, liên kết qua khóa ngoại discount_id.
        foreignKey: "discount_id",
      });
      Order.belongsTo(models.User, {
        // ↳ Một Order thuộc về một User, liên kết qua khóa ngoại user_id.
        foreignKey: "user_id",
      });
      
      Order.hasMany(models.OrderDetail, {
        // ↳ Một Order có nhiều OrderDetail, liên kết qua khóa ngoại order_id.
        foreignKey: "order_id",
        as: "order_Details",
      });
      Order.hasMany(models.FeedBack, {
        // ↳ Một Order có nhiều FeedBack, liên kết qua khóa ngoại order_id.
        foreignKey: "order_id",
        as: "feed_Backs",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      discount_id: DataTypes.INTEGER,
      discount_amount: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "Order", // ➡ Đặt tên model là Order.
      tableName: "orders", // ➡ Tên bảng trong database là orders.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return Order;
};
