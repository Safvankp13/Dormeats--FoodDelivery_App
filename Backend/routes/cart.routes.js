import  express  from "express";
import { addToCart, deleteFromCart, getCartProducts, updateQuantity } from "../controller/cart.controller.js"
import { protectRoute } from "../middleware/protectRoute.js";
const router=express.Router();

router.get("/",protectRoute, getCartProducts)
router.post("/",protectRoute, addToCart)
router.put("/:id",protectRoute, updateQuantity)
router.delete("/:id",protectRoute, deleteFromCart)



 export default router;