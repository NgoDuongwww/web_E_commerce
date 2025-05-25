"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      Cart.hasMany(models.CartItem, {
        // ↳ Một Cart có nhiều CartItem, liên kết qua khóa ngoại cart_id.
        foreignKey: "cart_id",
        as: "cart_Items",
      });
      Cart.belongsTo(models.User, {
        // ↳ Một Cart thuộc về một User, liên kết qua khóa ngoại user_id.
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Cart.init(
    {
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "Cart", // ➡ Đặt tên model là Cart.
      tableName: "carts", // ➡ Tên bảng trong database là carts.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return Cart;
};
