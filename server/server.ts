import { connectDB } from "./middleware/db";
import express from "express";
import cors from "cors";

import { userRouter } from "./routes/user.routes";
import { productRouter } from "./routes/product.routes";
import { categoryRouter } from "./routes/categories.routes";
import { reviewRouter } from "./routes/review.routes";
import { wishlistRouter } from "./routes/wishlist.routes";
import { shoppingCartRouter } from "./routes/shoppingCart.routes";
import { transactionRouter } from "./routes/transaction.routes";
import { errorMiddleware } from "./middleware/error";
import { imageRouter } from "./routes/image.routes"; 

function main() {
    let app = express();

    try {
        connectDB();
    } catch (err) {
        throw new Error("Nothing yet");
    }

    app.use(cors());
    app.use(express.json());
    // app.use(express.);
    app.use(express.urlencoded({ extended: false }));

    app.listen(6060);
    // userRouter contains login and register router.
    app.use("/api", userRouter);

    //
    app.use("/api/product", productRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/review", reviewRouter);
    app.use("/api/shoppingcart", shoppingCartRouter);
    app.use("/api/wishlist", wishlistRouter);
    app.use("/api/transaction", transactionRouter);
    app.use("/api/image", imageRouter);
    app.use(errorMiddleware);
}
 
main()