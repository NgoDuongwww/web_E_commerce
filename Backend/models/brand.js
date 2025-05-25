"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      Brand.hasMany(models.Product, {
        // ↳ Một Brand có nhiều Product, liên kết qua khóa ngoại brand_id.
        foreignKey: "brand_id",
      });
      Brand.hasMany(models.Discount, {
        // ↳ Một Brand có nhiều Discount, liên kết qua khóa ngoại brand_id.
        foreignKey: "brand_id",
      });
    }
  }
  Brand.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "Brand", // ➡ Đặt tên model là Brand.
      tableName: "brands", // ➡ Tên bảng trong database là brands.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return Brand;
};
