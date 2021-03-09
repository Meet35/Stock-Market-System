import express from "express";
import { getStock, getstocks } from "../controllers/stock.js";
const router = express.Router();

router.get("/", getstocks);
router.get("/:symbol", getStock);

export default router;