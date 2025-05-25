"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ↳ Hàm thiết lập quan hệ giữa các model.
      // define association here
      Banner.hasMany(models.BannerDetail, {
        // ↳ Một Banner có nhiều BannerDetail, liên kết qua khóa ngoại banner_id.
        foreignKey: "banner_id",
      });
    }
  }
  Banner.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      status: DataTypes.INTEGER,
    },
    {
      sequelize, // ➡ Truyền đối tượng kết nối Sequelize.
      modelName: "Banner", // ➡ Đặt tên model là Banner.
      tableName: "banners", // ➡ Tên bảng trong database là banners.
      underscored: true, //➡ Tự động dùng created_at thay vì createdAt trong database.
      createdAt: "created_at", // ➡ Tự động dùng created_at thay vì createdAt sau khi Response data trong API.
      updatedAt: "updated_at", // ➡ Tự động dùng updated_at thay vì updatedAt sau khi Response data trong API.
    }
  );
  return Banner;
};
