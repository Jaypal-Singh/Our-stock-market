import express from 'express';
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '../controllers/watchlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/getWatchlist').get(protect, getWatchlist)
router.route('/addToWatchlist').post(protect, addToWatchlist);
router.route('/removeFromWatchlist/:stockId').delete(protect, removeFromWatchlist);

export default router;
