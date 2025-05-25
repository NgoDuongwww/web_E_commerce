"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("discounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      percent_value: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      max_discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      min_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "brands",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      expires_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("discounts");
  },
};
