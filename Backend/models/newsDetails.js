"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NewsDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      NewsDetail.belongsTo(models.Product, {
        // ↳ Một NewsDetail thuộc về một Product, liên kết qua khóa ngoại product_id.
        foreignKey: "product_id",
      });
      NewsDetail.belongsTo(models.News, {
        // ↳ Một NewsDetail thuộc về một News, liên kết qua khóa ngoại news_id.
        foreignKey: "news_id",
      });
    }
  }
  NewsDetail.init(
    {
      product_id: DataTypes.INTEGER,
      news_id: DataTypes.INTEGER,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "NewsDetail", // ➡ Đặt tên model là NewsDetail.
      tableName: "newsDetails", // ➡ Tên bảng trong database là newsDetails.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return NewsDetail;
};
