const errorMiddleware = (err, request, response, next) => {
    response.status(response.statusCode);
    response.json({
        errorStatus: response.statusCode,
        message: err.message,
    });
};

module.exports = {errorMiddleware};
