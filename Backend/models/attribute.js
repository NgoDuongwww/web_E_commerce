"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      Attribute.hasMany(models.ProductAttributeValue, {
        // ↳ Một Attribute có nhiều ProductAttributeValue, liên kết qua khóa ngoại attribute_id.
        foreignKey: "attribute_id",
      });
    }
  }
  Attribute.init(
    {
      name: DataTypes.STRING, // Ví dụ: size, color, cpu, ram, screen, battery, weight, ...
    },
    {
      sequelize,
      modelName: "Attribute",
      tableName: "attributes", // ➡ Tên bảng trong database là attributes.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return Attribute;
};
