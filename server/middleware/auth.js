const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

const protected = asyncHandler(async(request, response, next) => {
    if(!request.header.authorization && !request.header.authorization.startsWith("Bearer")){
        response.status(401)
        throw new Error("Nao autorizado")
    }

    //split the  "bearer" from the token
    let token = request.header.authorization.split(" ")[1]

    //decode the token to get the user id
    let decoded = await bcrypt.verify(token, "123")

    //set the user in the response and send to the next middleware
    response.user = await User.findById(decoded.id)
    next()
})

module.exports = protected