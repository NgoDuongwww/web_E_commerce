"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      Product.belongsTo(models.Brand, {
        // ↳ Một Product thuộc về một Brand, liên kết qua khóa ngoại brand_id.
        foreignKey: "brand_id",
      });
      Product.belongsTo(models.Category, {
        // ↳ Một Product thuộc về một Category, liên kết qua khóa ngoại category_id.
        foreignKey: "category_id",
      });

      Product.hasMany(models.ProductVariantValue, {
        // ↳ Một Product thuộc về một ProductVariantValue, liên kết qua khóa ngoại product_id.
        foreignKey: "product_id",
        as: "variants",
      });
      Product.hasMany(models.ProductAttributeValue, {
        // ↳ Một Product có nhiều ProductAttributeValue, liên kết qua khóa ngoại product_id.
        foreignKey: "product_id",
        as: "attributes",
      });
      Product.hasMany(models.BannerDetail, {
        // ↳ Một Product có nhiều BannerDetail, liên kết qua khóa ngoại product_id.
        foreignKey: "product_id",
      });
      Product.hasMany(models.FeedBack, {
        // ↳ Một Product có nhiều FeedBack, liên kết qua khóa ngoại product_id.
        foreignKey: "product_id",
      });
      Product.hasMany(models.NewsDetail, {
        // ↳ Một Product có nhiều NewsDetail, liên kết qua khóa ngoại product_id.
        foreignKey: "product_id",
      });
      Product.hasMany(models.ProductImage, {
        // ↳ Một Product có nhiều ProductImage, liên kết qua khóa ngoại product_id.
        foreignKey: "product_id",
        as: "product_images",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      buyturn: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      total_ratings: DataTypes.INTEGER,
      total_sold: DataTypes.INTEGER,
      is_visible: DataTypes.BOOLEAN,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "Product", // ➡ Đặt tên model là Product.
      tableName: "products", // ➡ Tên bảng trong database là products.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return Product;
};
