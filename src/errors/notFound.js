class NotFound extends Error {
  constructor(message) {
    super(message);
    this.httpCode = 404;
    this.name = 'Notfound';
  }
}

module.exports = NotFound;
