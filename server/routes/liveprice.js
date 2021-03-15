import express from "express";
import { getPrice } from "../controllers/liveprice.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/:symbol", getPrice);

export default router;