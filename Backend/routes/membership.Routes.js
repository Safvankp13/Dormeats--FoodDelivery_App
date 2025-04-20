import express from "express";
import { addMembership, fetchMembership, skipToday } from "../controller/membership.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", addMembership);
router.get("/currentMembership", protectRoute, fetchMembership);
router.post("/skip-today", protectRoute, skipToday);

export default router;
