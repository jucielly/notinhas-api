const express = require('express');
const NoteService = require('../services/note');
const env = require('../config/env');
const ServerError = require('../errors/serverError');
const authorizationMiddleware = require('../middlewares/authorization');

const NotesRouter = express.Router();

NotesRouter.post('/', [authorizationMiddleware, (request, response, next) => {
  const { title, content } = request.body || {};
  const userId = request.user.id;
  const note = { title, content };
  NoteService.createNote({ ...note, userId }).then(() => {
    response.sendStatus(201);
  }).catch((error) => {
    next(new ServerError('Ocorreu um erro inesperado'));
    console.error(error);
  });
}]);

NotesRouter.patch('/:id', [authorizationMiddleware, (request, response, next) => {
  const { title, content } = request.body || {};
  const { id: noteId } = request.params || {};

  NoteService.editNote({
    title,
    content,
    noteId,
  }).then((editedNote) => response.json(editedNote))
    .catch(next);
}]);

NotesRouter.delete('/:id', [authorizationMiddleware, (request, response, next) => {
  const { id: noteId } = request.params || {};
  NoteService.deleteNote(noteId).then(() => {
    response.sendStatus(204);
  }).catch(next);
}]);

module.exports = NotesRouter;
