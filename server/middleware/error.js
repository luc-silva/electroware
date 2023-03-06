const errorMiddleware = (err, request, response) => {
    response.status(404).json({message: err})
}