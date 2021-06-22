const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error.httpCode) {
    response.status(error.httpCode).json({
      message: error.message,
    });
  } else {
    response.status(500).json({
      message: 'Ocorreu um erro inesperado',
    });
  }
};

module.exports = errorHandler;
