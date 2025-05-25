"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BannerDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      BannerDetail.belongsTo(models.Product, {
        // ↳ Mỗi BannerDetail thuộc về một Product, qua khóa ngoại product_id.
        foreignKey: "product_id",
      });
      BannerDetail.belongsTo(models.Banner, {
        // ↳ Một BannerDetail thuộc về một Banner, liên kết qua khóa ngoại banner_id.
        foreignKey: "banner_id",
      });
    }
  }
  BannerDetail.init(
    {
      product_id: DataTypes.INTEGER,
      banner_id: DataTypes.INTEGER,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "BannerDetail", // ➡ Đặt tên model là BannerDetail.
      tableName: "bannerDetails", // ➡ Tên bảng trong database là bannerDetails.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.freezeTableName: true
    }
  );
  return BannerDetail;
};
