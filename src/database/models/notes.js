const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const UserNotes = sequelize.define('userNotes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserNotes;
