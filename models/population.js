const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_config");

const Population = sequelize.define(
  "Population",
  {
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    populations: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "population",
    timestamps: true,
    charset: "utf8",
    createdAt: "created_date", // Specify the custom column name for createdAt
    updatedAt: "updated_date", // Specify the custom column name for updatedAt
    collate: "utf8_general_ci",
  }
);

module.exports = Population;
