"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      CartItem.belongsTo(models.Cart, {
        // ↳ Một CartItem thuộc về một Cart, liên kết qua khóa ngoại cart_id.
        foreignKey: "cart_id",
        as: "cart_Items",
      });
      CartItem.belongsTo(models.ProductVariantValue, {
        // ↳ Một CartItem thuộc về một ProductVariantValues, liên kết qua khóa ngoại product_id.
        foreignKey: "product_variant_id",
      });
    }
  }
  CartItem.init(
    {
      cart_id: DataTypes.INTEGER,
      product_variant_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "CartItem", // ➡ Đặt tên model là CartItem.
      tableName: "cartItems", // ➡ Tên bảng trong database là cartItems.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return CartItem;
};
