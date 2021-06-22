class NoteError extends Error {
  constructor(message) {
    super(message);
    this.httpCode = 400;
    this.name = 'NoteError';
  }
}

module.exports = NoteError;
