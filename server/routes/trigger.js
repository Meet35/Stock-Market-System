import express from "express";
import { getTrigger, getAllTrigger, deleteTrigger, createTrigger } from "../controllers/trigger.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, getTrigger);
router.get("/all", getAllTrigger);
router.post('/', auth, createTrigger);
router.delete('/:id', auth, deleteTrigger);

export default router;