import Order from '../models/Order.js';
import { smartApi } from '../config/angelConfig.js';
import AngelOneCredential from '../models/AngelOneCredential.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('OrderController');

/**
 * Place a new order
 * POST /api/order/placeOrder
 */
export const placeOrder = async (req, res) => {
    try {
        const {
            variety,
            tradingsymbol,
            symboltoken,
            transactiontype,
            exchange,
            ordertype,
            producttype,

            price,
            quantity,
            squareoff,
            stoploss,
            trailingstoploss,
            triggerprice,
            tag
        } = req.body;

        // 1. Validate required fields (Basic validation)
        if (!tradingsymbol || !symboltoken || !transactiontype || !exchange || !ordertype || !producttype || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Missing required order fields"
            });
        }

        // Price can be 0 for MARKET orders
        if (price === undefined || price === null) {
            return res.status(400).json({
                success: false,
                message: "Missing price field"
            });
        }

        // 2. Create Order in DB (Pending)
        // User is assumed to be attached to req.user by auth middleware
        // For now, if no auth middleware, we might need a dummy user or userId from body
        // Proceeding with assumption of req.user or getting it from body for dev
        const userId = req.user ? req.user._id : req.body.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const newOrder = new Order({
            userId,
            variety,
            tradingsymbol,
            symboltoken,
            transactiontype,
            exchange,
            ordertype,
            producttype,

            price,
            quantity,
            squareoff,
            stoploss,
            trailingstoploss,
            triggerprice,
            tag,

        });

        await newOrder.save();
        logger.info(`Order created in DB: ${newOrder._id}`);

        // 3. Place Order via Angel One API
        /*
        const orderParams = {
            variety: variety || "NORMAL",
            tradingsymbol,
            symboltoken,
            transactiontype,
            exchange,
            ordertype,
            producttype,
            duration: "DAY",

            price: price.toString(),
            quantity: quantity.toString(),
            squareoff: squareoff ? squareoff.toString() : "0",
            stoploss: stoploss ? stoploss.toString() : "0",
            trailingstoploss: trailingstoploss ? trailingstoploss.toString() : "0",
            triggerprice: triggerprice ? triggerprice.toString() : "0"
        };
        */

        // PAPER TRADING MODE: Simulate Success
        logger.info('PAPER TRADING: Simulating Angel One Order Placement');
        const mockResponse = {
            status: true,
            message: "SUCCESS",
            data: {
                orderid: "PAPER-" + Date.now(),
                uniqueorderid: "UID-" + Date.now(),
                script: tradingsymbol
            }
        };

        try {
            // const response = await smartApi.placeOrder(orderParams);
            const response = mockResponse;

            logger.info('Angel One Place Order Response (MOCKED):', response);

            if (response.status && response.data && response.data.orderid) {
                // Success
                newOrder.angelOrderId = response.data.orderid;
                newOrder.uniqueorderid = response.data.uniqueorderid; // Capture unique ID
                newOrder.message = response.message;
                newOrder.orderstatus = "complete"; // Simulate immediate completion
                await newOrder.save();

                return res.status(200).json({
                    success: true,
                    message: "Order placed successfully (Paper)",
                    data: {
                        orderId: newOrder._id,
                        angelOrderId: response.data.orderid,
                        script: response.data.script
                    }
                });
            } else {
                // Failed at Angel One
                newOrder.message = response.message || "Unknown error from Angel One";
                await newOrder.save();

                return res.status(400).json({
                    success: false,
                    message: response.message || "Failed to place order at Angel One",
                    errorCode: response.errorcode
                });
            }

        } catch (apiError) {
            logger.error('Angel One API Error:', apiError);
            newOrder.message = apiError.message;
            await newOrder.save();

            return res.status(500).json({
                success: false,
                message: "Internal Error calling Angel One API",
                error: apiError.message
            });
        }

    } catch (error) {
        logger.error('Place Order Controller Error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

/**
 * Get Order History for User
 * GET /api/order/history
 */
export const getOrderHistory = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : req.query.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (error) {
        logger.error('Get Order History Error:', error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch order history",
            error: error.message
        });
    }
};
