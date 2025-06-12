'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      ProductImage.belongsTo(models.Product, {
        // ↳ Một ProductImage thuộc về một Product, liên kết qua khóa ngoại product_id.
        foreignKey: 'product_id',
      })
    }
  }
  ProductImage.init(
    {
      product_id: DataTypes.INTEGER,
      image_url: DataTypes.TEXT,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: 'ProductImage', // ➡ Đặt tên model là ProductImage.
      tableName: 'productImages', // ➡ Tên bảng trong database là productImages.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: 'created_at', // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: 'updated_at', // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    },
  )
  return ProductImage
}
