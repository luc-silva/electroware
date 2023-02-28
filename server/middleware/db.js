const mongoose = require("mongoose")
const URI = "mongodb+srv://lucasAdmin:lucas1353@cluster0.oximzo5.mongodb.net/project_electroware?retryWrites=true&w=majority"


function connectDB(){
    try {
        mongoose.connect(URI)
        console.log(`Database connected`)
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = connectDB