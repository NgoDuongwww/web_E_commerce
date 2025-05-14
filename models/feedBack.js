"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FeedBack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FeedBack.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
      FeedBack.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  FeedBack.init(
    {
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      star: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "FeedBack",
      tableName: "feedBacks",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return FeedBack;
};
