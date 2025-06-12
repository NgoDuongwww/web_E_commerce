'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      OrderDetail.belongsTo(models.Order, {
        // ↳ Một OrderDetail thuộc về một Order, liên kết qua khóa ngoại order_id.
        foreignKey: 'order_id',
      })
      OrderDetail.belongsTo(models.ProductVariantValue, {
        // ↳ Một OrderDetail thuộc về một ProductVariantValue, liên kết qua khóa ngoại product_id.
        foreignKey: 'product_variant_id',
      })
    }
  }
  OrderDetail.init(
    {
      order_id: DataTypes.INTEGER,
      product_variant_id: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: 'OrderDetail', // ➡ Đặt tên model là OrderDetail.
      tableName: 'orderDetails', // ➡ Tên bảng trong database là orderDetails.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: 'created_at', // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: 'updated_at', // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    },
  )
  return OrderDetail
}
