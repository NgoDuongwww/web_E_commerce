'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class FeedBack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      FeedBack.belongsTo(models.Product, {
        // ↳ Một FeedBack thuộc về một Product, liên kết qua khóa ngoại product_id.
        foreignKey: 'product_id',
      })
      FeedBack.belongsTo(models.User, {
        // ↳ Một FeedBack thuộc về một User, liên kết qua khóa ngoại user_id.
        foreignKey: 'user_id',
      })
      FeedBack.belongsTo(models.Order, {
        // ↳ Một FeedBack thuộc về một Order, liên kết qua khóa ngoại order_id.
        foreignKey: 'order_id',
      })
    }
  }
  FeedBack.init(
    {
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
      star: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      is_visible: DataTypes.BOOLEAN,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: 'FeedBack', // ➡ Đặt tên model là FeedBack.
      tableName: 'feedBacks', // ➡ Tên bảng trong database là feedBacks.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: 'created_at', // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: 'updated_at', // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    },
  )
  return FeedBack
}
