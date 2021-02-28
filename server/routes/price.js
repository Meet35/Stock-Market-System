import express from "express";
import { getPrice } from "../controllers/price.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/:symbol", auth, getPrice);

export default router;