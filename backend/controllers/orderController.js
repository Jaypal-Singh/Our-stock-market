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
            duration,
            price,
            quantity,
            squareoff,
            stoploss,
            trailingstoploss,
            triggerprice,
            tag
        } = req.body;

        // 1. Validate required fields (Basic validation)
        if (!tradingsymbol || !symboltoken || !transactiontype || !exchange || !ordertype || !producttype || !quantity || !price) {
            return res.status(400).json({
                success: false,
                message: "Missing required order fields"
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
            duration,
            price,
            quantity,
            squareoff,
            stoploss,
            trailingstoploss,
            triggerprice,
            tag,
            status: 'PENDING'
        });

        await newOrder.save();
        logger.info(`Order created in DB: ${newOrder._id}`);

        // 3. Place Order via Angel One API
        const orderParams = {
            variety: variety || "NORMAL",
            tradingsymbol,
            symboltoken,
            transactiontype,
            exchange,
            ordertype,
            producttype,
            duration: duration || "DAY",
            price: price.toString(),
            quantity: quantity.toString(),
            squareoff: squareoff ? squareoff.toString() : "0",
            stoploss: stoploss ? stoploss.toString() : "0",
            trailingstoploss: trailingstoploss ? trailingstoploss.toString() : "0",
            triggerprice: triggerprice ? triggerprice.toString() : "0"
        };

        // Ensure smartApi has the latest session (Token Check)
        // If smartApi is stateless or needs refresh, we might need to handle it.
        // Assuming smartApi singleton is maintained by the cron/controller.

        try {
            const response = await smartApi.placeOrder(orderParams);

            logger.info('Angel One Place Order Response:', response);

            if (response.status && response.data && response.data.orderid) {
                // Success
                newOrder.angelOrderId = response.data.orderid;
                newOrder.status = 'OPEN'; // Or whatever initial status angel returns implies
                newOrder.message = response.message;
                await newOrder.save();

                return res.status(200).json({
                    success: true,
                    message: "Order placed successfully",
                    data: {
                        orderId: newOrder._id,
                        angelOrderId: response.data.orderid,
                        script: response.data.script
                    }
                });
            } else {
                // Failed at Angel One
                newOrder.status = 'FAILED';
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
            newOrder.status = 'FAILED';
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
