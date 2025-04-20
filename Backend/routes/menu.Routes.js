import express from "express";
import { createMenu, deleteMenu, getAllFoodItems, getAllMenus, updateMenu } from "../controller/menu.controller.js";

const router = express.Router();

router.get("/allMenus", getAllMenus);
router.post("/createMenu", createMenu);
router.patch("/updateMenu/:id", updateMenu);
router.delete("/deleteMenu/:id", deleteMenu);
router.get("/food-items/", getAllFoodItems);

export default router;
