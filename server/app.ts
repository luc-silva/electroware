import {connectDB} from "./middleware/db"
import  express from "express"
import cors from "cors"

const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const productsRouter = require("./routes/productsRouter");
const categoryRouter = require("./routes/categoryRouter");
const reviewRouter = require("./routes/reviewRouter");
const wishlistRouter = require("./routes/wishlistRouter");
const shoppingCartRouter = require("./routes/shoppingCartRouter");
const transactionRouter = require("./routes/transactionRouter");
const { errorMiddleware } = require("./middleware/error");

function main(){
    let app = express();
    
    try{
        connectDB();
    } catch(err){
        throw new Error(err)
    }
    
    
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.listen(6060);
    // userRouter contains login and register router.
    app.use("/api", userRouter);
    
    //
    app.use("/api/product", productRouter);
    app.use("/api/products", productsRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/review", reviewRouter);
    app.use("/api/shoppingcart", shoppingCartRouter);
    app.use("/api/wishlist", wishlistRouter)
    app.use("/api/transaction", transactionRouter);
    app.use(errorMiddleware);

}

