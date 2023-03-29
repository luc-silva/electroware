import mongoose from "mongoose";
const URI =
    "mongodb+srv://lucasAdmin:lucas1353@cluster0.oximzo5.mongodb.net/project_electroware?retryWrites=true&w=majority";

export function connectDB() {
    try {
        mongoose.connect(URI);
        console.log(`Database connected`);
    } catch (error:any) {
        throw new Error(error);
    }
}
