'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ProductAttributeValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      ProductAttributeValue.belongsTo(models.Product, {
        // ↳ Một ProductAttributeValue thuộc về một Product, liên kết qua khóa ngoại product_id.
        foreignKey: 'product_id',
      })
      ProductAttributeValue.belongsTo(models.Attribute, {
        // ↳ Một ProductAttributeValue thuộc về một Attribute, liên kết qua khóa ngoại attribute_id.
        foreignKey: 'attribute_id',
        as: 'attribute',
      })
    }
  }
  ProductAttributeValue.init(
    {
      product_id: DataTypes.INTEGER,
      attribute_id: DataTypes.INTEGER,
      value: DataTypes.TEXT, // Ví dụ: đỏ, xanh, 16GB, Intel i7,...
    },
    {
      sequelize,
      modelName: 'ProductAttributeValue',
      tableName: 'product_attribute_values', // ➡ Tên bảng trong database là product_attribute_values.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: 'created_at', // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: 'updated_at', // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    },
  )
  return ProductAttributeValue
}
