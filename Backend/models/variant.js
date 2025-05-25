"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Variant.hasMany(models.VariantValue, {
        // ↳ Một Variant có nhiều VariantValue, liên kết qua khóa ngoại variant_id.
        foreignKey: "variant_id",
        as: "variant",
      });
    }
  }
  Variant.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "Variant", // ➡ Tên model trong sequelize.
      tableName: "variants", // ➡ Tên bảng trong database.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return Variant;
};
