import express from 'express';
import { getOptionGreeks, getExpiries } from '../controllers/optionChainController.js';

const router = express.Router();

// Get valid expiry dates
router.get('/expiries', getExpiries);

/**
 * @route   POST /api/option-chain/greeks
 * @desc    Get option Greeks data from Angel One API
 * @access  Private
 * @body    { name: "NIFTY", expirydate: "25JAN2024" }
 */
router.post('/greeks', getOptionGreeks);

export default router;
