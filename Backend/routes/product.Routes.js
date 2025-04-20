import  express  from "express";
import { createProducts, deleteProduct, getAllProducts, updateProduct } from "../controller/product.controller.js";

const router=express.Router();
router.get("/allProducts",getAllProducts)
router.post("/createproduct",createProducts)
router.patch("/updateProduct/:id",updateProduct)
router.delete("/deleteProduct/:id",deleteProduct)



 export default router;