import express from 'express';

import { getWatchlist, updateWatchlist } from '../controllers/watchlist.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getWatchlist);
router.post('/update', updateWatchlist);

export default router;