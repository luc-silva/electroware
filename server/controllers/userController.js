const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const User = require("../models/User");


function generateToken(id){
    return jwt.sign({id}, "123", {
        expiresIn:"7d"
    })
}
const loginUser = asyncHandler(async (request, response) => {
    let { userEmail, userPassword } = request.body;
    let user = await User.findOne({ userEmail });

    if(!user){
        response.status(400)
        throw new Error("Usuario nao encontrado")
    }
    if(user && !(await bcrypt.compare(userPassword, user.userPassword))){
        response.status(400)
        throw new Error("senha invalida")
    }

    //gen token to use in a protected route
    let token = generateToken(user._id)

    response.json({id: user._id, token: token, auth: request.headers.authorization});
});

const registerUser = asyncHandler(async (request, response) => {
    //validates inputs
    let { userEmail, userPassword, userName } = request.body;
    if (!userEmail || !userPassword || !userName.first) {
        response.status(400);
        throw new Error("Por favor, insira credenciais validos");
    }

    //check if an email has already been used
    let userExist = await User.findOne({ userEmail });
    if (userExist) {
        response.status(400);
        throw new Error(`Uma conta ja foi criada com esse email: ${userExist}` );
    }

    //hash password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(userPassword, salt);

    let newUser = {
        ...request.body,
        userPassword: hashedPassword,
    };

    let user = await User.create(newUser);
    response.json(user);
});

const getProfile = asyncHandler(async(request, response, next) => {
    let user = await User.findById(request.id)
    if(!user){
        response.status(404).json({message:"User not found"})
        next()
    }
    response.json(user)
})

//private
const getMyOrders = (request,response) => {
    
}

module.exports = {
    registerUser,
    loginUser,
    getProfile
};
