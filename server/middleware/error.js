const errorMiddleware = (err, request, response) => {
    response.json({ message: err });
};

module.exports = errorMiddleware;
