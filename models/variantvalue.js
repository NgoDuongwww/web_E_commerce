"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VariantValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VariantValue.belongsTo(models.Variant, {
        // ↳ Một VariantValue thuộc về một Variant, liên kết qua khóa ngoại variant_id.
        foreignKey: "variant_id",
        as: "variant",
      });
    }
  }
  VariantValue.init(
    {
      variant_id: DataTypes.INTEGER,
      value: DataTypes.STRING,
      image: DataTypes.TEXT,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "VariantValue", // ➡ Tên model trong sequelize.
      tableName: "variant_values", // ➡ Tên bảng trong database.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return VariantValue;
};
