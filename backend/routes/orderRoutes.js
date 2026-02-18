import express from 'express';
import { placeOrder, getOrderHistory } from '../controllers/orderController.js';

const router = express.Router();

/**
 * @route   POST /api/order/placeOrder
 * @desc    Place a new order on Angel One
 * @access  Private (Needs Auth Middleware in future)
 */
router.post('/placeOrder', placeOrder);

/**
 * @route   GET /api/order/history
 * @desc    Get order history for current user
 * @access  Private
 */
router.get('/history', getOrderHistory);

export default router;
