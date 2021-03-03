import express from "express";
import { getStockinfo } from "../controllers/stockinfo.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/:symbol", getStockinfo);

export default router;