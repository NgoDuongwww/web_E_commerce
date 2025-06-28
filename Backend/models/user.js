'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      User.hasMany(models.Order, {
        // ↳ Một User có nhiều Order, liên kết qua khóa ngoại user_id.
        foreignKey: 'user_id',
      })
      User.hasMany(models.Cart, {
        // ↳ Một User có nhiều Cart, liên kết qua khóa ngoại user_id.
        foreignKey: 'user_id',
      })
      User.hasMany(models.FeedBack, {
        // ↳ Một User có nhiều FeedBack, liên kết qua khóa ngoại user_id.
        foreignKey: 'user_id',
      })
    }
  }
  User.init(
    {
      user_code: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      role: DataTypes.INTEGER,
      avatar: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      is_locked: DataTypes.BOOLEAN,
      password_changed_at: DataTypes.DATE,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: 'User', // ➡ Đặt tên model là User.
      tableName: 'users', // ➡ Tên bảng trong database là users.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: 'created_at', // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: 'updated_at', // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    },
  )
  return User
}
