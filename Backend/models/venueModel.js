const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db"); // ✅ correct

const Venue = sequelize.define("Venue", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0,
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: "🏟️",
  },
  availability: {
    type: DataTypes.STRING,
    defaultValue: "Available",
  },
});

module.exports = Venue;
