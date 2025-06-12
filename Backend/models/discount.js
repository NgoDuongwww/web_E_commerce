'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discount.belongsTo(models.Brand, {
        foreignKey: 'brand_id', // ➡ Khóa ngoại trong bảng discounts.
      })
      Discount.belongsTo(models.Category, {
        foreignKey: 'category_id', // ➡ Khóa ngoại trong bảng discounts.
      })

      Discount.hasMany(models.Order, {
        foreignKey: 'discount_id', // ➡ Khóa ngoại trong bảng orders.
      })
    }
  }
  Discount.init(
    {
      code: DataTypes.STRING,
      percent_value: DataTypes.FLOAT,
      max_discount: DataTypes.INTEGER,
      min_total: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      expires_at: DataTypes.DATE,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: 'Discount', // ➡ Tên model trong sequelize.
      tableName: 'discounts', // ➡ Tên bảng trong database.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: 'created_at', // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: 'updated_at', // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    },
  )
  return Discount
}
