const TokenService = require('../services/token');
const AuthorizationError = require('../errors/authorizationError');

const authorizationMiddleware = (request, response, next) => {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) throw new AuthorizationError('Token ausente');
  const [bearer, token] = authorizationHeader.split('');
  if (bearer !== 'Bearer') throw new AuthorizationError('Formato do token incorreto');

  try {
    const decodeUser = TokenService.verify(token);
    request.user = decodeUser;
    next();
  } catch {
    throw new AuthorizationError('Token inválido');
  }
};

module.exports = authorizationMiddleware;
