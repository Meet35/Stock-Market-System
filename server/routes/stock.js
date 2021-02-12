import express from "express";
import { getstocks } from "../controllers/stock.js";
const router = express.Router();

router.get("/", getstocks);

export default router;