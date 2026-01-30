const { DataTypes } = require("sequelize");
// Destructure sequelize from the exported object
const { sequelize } = require("../database/db"); 

const Booking = sequelize.define("Booking", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  userName: { type: DataTypes.STRING, allowNull: false },
  venueId: { type: DataTypes.INTEGER, allowNull: false },
  venueName: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING }, 
  date: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  players: { type: DataTypes.INTEGER },
  price: { type: DataTypes.STRING },
  status: { 
    type: DataTypes.ENUM("Pending", "Confirmed", "Declined"), 
    defaultValue: "Pending" 
  }
});

module.exports = Booking;