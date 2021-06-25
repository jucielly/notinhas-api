const NoteError = require('../errors/clientError');
const NotFoundError = require('../errors/notFound');
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

  static editNote({
    noteId,
    title,
    content,
  }) {
    const upadtedNote = {};
    if (title) upadtedNote.title = title;
    if (content) upadtedNote.content = content;

    return UserNotes.findByPk(noteId).then((note) => {
      if (!note) throw new NotFoundError('Nota não encontrada');

      return note.update(upadtedNote).then((result) => result.toJSON());
    }).catch((error) => {
      if (!error.httpCode) throw new ServerError('Ocorreu um erro ao Atualizar a nota');
      throw error;
    });
  }

  static deleteNote(noteId) {
    if (!noteId) throw new NotFoundError('Nota não encontrada');
    return UserNotes.findOne({
      where: {
        id: +noteId,
      },
    }).then((note) => {
      if (!note) throw new NotFoundError('Nota não encontrada');
      return note.destroy();
    });
  }
}

module.exports = NoteService;
