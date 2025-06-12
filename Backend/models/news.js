'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      News.hasMany(models.NewsDetail, {
        // ↳ Một News có nhiều NewDetail, liên kết qua khóa ngoại news_id.
        foreignKey: 'news_id',
      })
    }
  }
  News.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.TEXT,
      content: DataTypes.TEXT,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: 'News', // ➡ Đặt tên model là News.
      tableName: 'news', // ➡ Tên bảng trong database là news.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database. //➡ Tự động dùng created_at thay vì createdAt trong database.
      // ➡ Tự động dùng created_at thay vì createdAt.
      createdAt: 'created_at', // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: 'updated_at', // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    },
  )
  return News
}
