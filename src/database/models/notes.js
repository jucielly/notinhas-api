const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const UserNotes = sequelize.define('userFavorites', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },

  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserNotes;
