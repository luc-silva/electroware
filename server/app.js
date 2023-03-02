const connectDB = require("./middleware/db");
const express = require("express");
const cors = require("cors")

const userRouter = require("./routes/userRouter")
const productRouter = require("./routes/productRouter")
const categoryRouter = require("./routes/categoryRouter")

let app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

connectDB();
app.listen(6060)
// userRouter contains login and register router.
app.use("/api", userRouter)

//
app.use("/api/product", productRouter)
app.use("/api/category", categoryRouter)
