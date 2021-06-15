const User = require('./models/user');
const UserNotes = require('./models/notes');
const { sequelize } = require('./connection');

const startDb = () => {
  sequelize.sync();
};

module.exports = {
  User,
  UserNotes,
  startDb,
};
