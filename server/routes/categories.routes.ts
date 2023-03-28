import {Router} from "express"
const {
    createCategory,
    getCategories,
    getSingleCategory,
} = require("../controllers/categoryController");
const { getProductFromCategory } = require("../controllers/productController");

export const categoryRouter = Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id/products", getProductFromCategory);
categoryRouter.get("/:id", getSingleCategory);


