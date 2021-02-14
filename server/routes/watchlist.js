import express from 'express';

import { getWatchlist, updateWatchlist } from '../controllers/watchlist.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', auth, getWatchlist);
router.post('/update', auth, updateWatchlist);

export default router;