"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Cart, {
        foreignKey: "user_id",
      });
      User.hasMany(models.FeedBack, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      role: DataTypes.INTEGER,
      avatar: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      is_locked: DataTypes.TINYINT(1),
      password_changed_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
