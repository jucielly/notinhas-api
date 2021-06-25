const express = require('express');
const NoteService = require('../services/note');
const env = require('../config/env');
const ServerError = require('../errors/serverError');
const authorizationMiddleware = require('../middlewares/authorization');

const notesRouter = express.Router();

notesRouter.post('/', [authorizationMiddleware, (request, response, next) => {
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

notesRouter.patch('/:id', [authorizationMiddleware, (request, response, next) => {
  const { title, content } = request.body || {};
  const { id: noteId } = request.params || {};

  NoteService.editNote({
    title,
    content,
    noteId,
  }).then((editedNote) => response.json(editedNote))
    .catch(next);
}]);

notesRouter.delete('/:id', [authorizationMiddleware, (request, response, next) => {
  const { id: noteId } = request.params || {};
  NoteService.deleteNote(noteId).then(() => {
    response.sendStatus(204);
  }).catch(next);
}]);

notesRouter.get('/all', [authorizationMiddleware, (request, response, next) => {
  const userId = request.user.id;
  NoteService.getUserNotes(userId).then((data) => {
    response.json(data);
  }).catch((error) => {
    next(new ServerError('ocorreu um erro inesperado'));
    console.error(error);
  });
}]);

notesRouter.get('/', [authorizationMiddleware, (request, response, next) => {
  const userId = request.user.id;
  const { search } = request.query || {};

  NoteService.searchNote(userId, search).then((data) => {
    response.json(data);
  }).catch((error) => {
    next(new ServerError('ocorreu um erro inesperado'));
    console.error(error);
  });
}]);

module.exports = notesRouter;
