const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const User = require("../models/User");

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

    let token = generateToken(user._id)

    localStorage.setItem("token", token )
    response.json({...user, token: token});
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

function generateToken(id){
    return jwt.sign({id}, "123", {
        expiresIn:"7d"
    })
}
module.exports = {
    registerUser,
    loginUser,
};
