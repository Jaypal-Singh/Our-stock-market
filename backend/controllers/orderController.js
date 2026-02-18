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
            marketPrice,
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

                // SIMULATION LOGIC:
                // MARKET Orders -> execute immediately at current market price
                // LIMIT Orders -> stay pending (until price match logic is implemented or manual update)
                if (ordertype === "LIMIT") {
                    newOrder.orderstatus = "pending";
                    newOrder.averagePrice = price; // Limit price as avg price
                    newOrder.message = "Order Placed (Pending)";
                } else {
                    // MARKET order: execute at current market price
                    const executionPrice = marketPrice || price || 0;
                    newOrder.orderstatus = "complete";
                    newOrder.averagePrice = executionPrice;
                    newOrder.filledShares = quantity;
                    newOrder.unfilledShares = 0;
                    newOrder.message = "Order Executed";
                }

                await newOrder.save();

                return res.status(200).json({
                    success: true,
                    message: newOrder.message,
                    data: {
                        orderId: newOrder._id,
                        angelOrderId: response.data.orderid,
                        script: response.data.script,
                        status: newOrder.orderstatus
                    }
                });
            } else {
                // Failed at Angel One
                newOrder.message = response.message || "Unknown error from Angel One";
                newOrder.orderstatus = "rejected";
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
/**
 * Cancel an Order
 * POST /api/order/cancel
 */
export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.user ? req.user._id : req.body.userId;

        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }

        const order = await Order.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (['complete', 'rejected', 'cancelled'].includes(order.orderstatus)) {
            return res.status(400).json({ success: false, message: "Cannot cancel a completed or rejected order" });
        }

        order.orderstatus = 'cancelled';
        order.message = 'Order Cancelled by User';
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order Cancelled Successfully",
            data: { orderId: order._id, status: order.orderstatus }
        });

    } catch (error) {
        logger.error('Cancel Order Error:', error);
        return res.status(500).json({ success: false, message: "Failed to cancel order", error: error.message });
    }
};

/**
 * Modify an Order
 * POST /api/order/modify
 */
export const modifyOrder = async (req, res) => {
    try {
        const { orderId, price, quantity, ordertype } = req.body;
        const userId = req.user ? req.user._id : req.body.userId;

        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }

        const order = await Order.findOne({ _id: orderId, userId });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (['complete', 'rejected', 'cancelled'].includes(order.orderstatus)) {
            return res.status(400).json({ success: false, message: "Cannot modify a completed or rejected order" });
        }

        // Update fields if provided
        if (price !== undefined) order.price = price;
        if (quantity !== undefined) {
            order.quantity = quantity;
            order.unfilledShares = quantity - order.filledShares; // Update unfilled shares logic roughly
        }
        if (ordertype !== undefined) order.ordertype = ordertype;

        order.message = 'Order Modified';
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order Modified Successfully",
            data: order
        });

    } catch (error) {
        logger.error('Modify Order Error:', error);
        return res.status(500).json({ success: false, message: "Failed to modify order", error: error.message });
    }
};
