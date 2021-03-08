import express from "express";
import { getPrice } from "../controllers/price.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/:symbol", getPrice);

export default router;