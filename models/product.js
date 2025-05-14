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
      Product.belongsTo(models.Brand, {
        foreignKey: "brand_id",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
      });

      Product.hasMany(models.ProductVariantValue, {
        foreignKey: "product_id",
        as: "variants",
      });
      Product.hasMany(models.ProductAttributeValue, {
        foreignKey: "product_id",
        as: "attributes",
      });
      Product.hasMany(models.BannerDetail, {
        foreignKey: "product_id",
      });
      Product.hasMany(models.FeedBack, {
        foreignKey: "product_id",
      });
      Product.hasMany(models.NewsDetail, {
        foreignKey: "product_id",
      });
      Product.hasMany(models.ProductImage, {
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
      quantity: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      total_ratings: DataTypes.INTEGER,
      total_sold: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Product;
};
