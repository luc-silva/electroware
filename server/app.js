const connectDB = require("./middleware/db");
const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const productsRouter = require("./routes/productsRouter");
const categoryRouter = require("./routes/categoryRouter");
const reviewRouter = require("./routes/reviewRouter");
const shoppingCartRouter = require("./routes/shoppingCartRouter");
const transactionRouter = require("./routes/transactionRouter")

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();
app.listen(6060);
// userRouter contains login and register router.
app.use("/api", userRouter);

//
app.use("/api/product", productRouter);
app.use("/api/products", productsRouter);
app.use("/api/category", categoryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/shoppingcart", shoppingCartRouter);

app.use('/api/transaction', transactionRouter)
// app.use(errorMiddleware)
