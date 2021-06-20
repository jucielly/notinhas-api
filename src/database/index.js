const User = require('./models/user');
const UserNotes = require('./models/notes');
const ArchiverdNotes = require('./models/ archivedNotes');
const { sequelize } = require('./connection');

const startDb = () => {
  sequelize.sync();
};

module.exports = {
  User,
  UserNotes,
  ArchiverdNotes,
  startDb,
};
