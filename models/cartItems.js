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
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        as: "cart_Items",
      });
      CartItem.belongsTo(models.ProductVariantValue, {
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
      sequelize,
      modelName: "CartItem",
      tableName: "cartItems",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return CartItem;
};
