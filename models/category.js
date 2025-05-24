"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      Category.hasMany(models.Product, {
        // ↳ Một Category có nhiều Product, liên kết qua khóa ngoại category_id.
        foreignKey: "category_id",
      });
      Category.hasMany(models.Discount, {
        // ↳ Một Category có nhiều Discount, liên kết qua khóa ngoại category_id.
        foreignKey: "category_id",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "Category", // ➡ Đặt tên model là Category.
      tableName: "categories", // ➡ Tên bảng trong database là categories.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return Category;
};
