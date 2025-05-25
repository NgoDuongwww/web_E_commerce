"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariantValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductVariantValue.belongsTo(models.Product, {
        // ↳ Một ProductVariantValue thuộc về một Product, liên kết qua khóa ngoại product_id.
        foreignKey: "product_id",
      });

      ProductVariantValue.hasMany(models.OrderDetail, {
        // ↳ Một ProductVariantValue có nhiều OrderDetail, liên kết qua khóa ngoại product_variant_id.
        foreignKey: "product_variant_id",
      });
      ProductVariantValue.hasMany(models.CartItem, {
        // ↳ Một ProductVariantValue có nhiều CartItem, liên kết qua khóa ngoại product_variant_id.
        foreignKey: "product_variant_id",
      });
    }
  }
  ProductVariantValue.init(
    {
      product_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      old_price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      sku: DataTypes.STRING,
      is_visible: DataTypes.BOOLEAN,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "ProductVariantValue", // ➡ Tên model trong sequelize.
      tableName: "product_variant_values", // ➡ Tên bảng trong database.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return ProductVariantValue;
};
