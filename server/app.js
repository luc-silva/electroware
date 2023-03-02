const connectDB = require("./middleware/db");
const express = require("express");

const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")

let app = express();

app.listen(6060)
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// userRouter contains login and register router.
app.use("/api", userRouter)

//
app.use("/api/product", productRouter)
