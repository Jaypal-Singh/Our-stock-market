import express from 'express';
import { 
    loginAngelOne, 
    getStoredTokens,
    getMarketStatus,
    getStockQuotes
} from '../controllers/angelController.js';

const router = express.Router();

// Manual login endpoint
router.post('/login', loginAngelOne);

// Get cached tokens from DB
router.get('/tokens', getStoredTokens);

// Market status endpoint
router.get('/market-status', getMarketStatus);

// Get stock quotes (REST API fallback)
router.post('/quotes', getStockQuotes);

export default router;

