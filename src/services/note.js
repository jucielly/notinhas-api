const NoteError = require('../errors/noteError');
const UserNotes = require('../database/models/notes');
const ServerError = require('../errors/serverError');

class NoteService {
  static createNote({ title, content, userId }) {
    if (!content) throw new NoteError('Preencha a nota');

    return UserNotes.create({
      title,
      content,
      userId,
    }).catch(() => {
      throw new ServerError('Erro ao criar notas');
    });
  }
}

module.exports = NoteService;
