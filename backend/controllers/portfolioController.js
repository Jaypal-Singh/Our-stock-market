import Order from '../models/Order.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('PortfolioController');

/**
 * Get Portfolio Holdings for User
 * Derives holdings from completed BUY orders grouped by tradingsymbol.
 * Nets out any SELL orders so we only show what the user still holds.
 *
 * GET /api/portfolio/holdings?userId=<id>
 */
export const getHoldings = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : req.query.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        // Fetch ALL completed orders for user
        const completedOrders = await Order.find({
            userId,
            orderstatus: 'complete'
        }).sort({ createdAt: 1 }); // oldest first for FIFO avg price

        if (completedOrders.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                holdings: [],
                summary: {
                    totalInvested: 0,
                    totalRealizedPnl: 0,
                    holdingsCount: 0
                }
            });
        }

        // ── Group by tradingsymbol ──────────────────────────────────────────
        const symbolMap = {};

        for (const order of completedOrders) {
            const key = order.tradingsymbol;
            if (!symbolMap[key]) {
                symbolMap[key] = {
                    tradingsymbol: order.tradingsymbol,
                    symboltoken: order.symboltoken,
                    exchange: order.exchange,
                    producttype: order.producttype,
                    buyQty: 0,
                    sellQty: 0,
                    buyValue: 0,   // sum of (qty × avgPrice) for BUY orders
                    sellValue: 0,   // sum of (qty × avgPrice) for SELL orders
                };
            }

            const pos = symbolMap[key];
            const qty = order.filledShares || order.quantity;
            const price = order.averagePrice || order.price || 0;

            if (order.transactiontype === 'BUY') {
                pos.buyQty += qty;
                pos.buyValue += qty * price;
            } else {
                pos.sellQty += qty;
                pos.sellValue += qty * price;
            }
        }

        // ── Build holdings array (only where netQty > 0) ──────────────────
        const holdings = [];
        let totalInvested = 0;
        let totalRealizedPnl = 0;

        for (const pos of Object.values(symbolMap)) {
            const netQty = pos.buyQty - pos.sellQty;
            const avgBuyPrice = pos.buyQty > 0 ? pos.buyValue / pos.buyQty : 0;
            const avgSellPrice = pos.sellQty > 0 ? pos.sellValue / pos.sellQty : 0;

            // Realized P&L from matched lots
            const matchedQty = Math.min(pos.buyQty, pos.sellQty);
            const realizedPnl = matchedQty > 0
                ? (avgSellPrice - avgBuyPrice) * matchedQty
                : 0;

            totalRealizedPnl += realizedPnl;

            // Only add to holdings if user still holds shares
            if (netQty > 0) {
                const investedValue = netQty * avgBuyPrice;
                totalInvested += investedValue;

                holdings.push({
                    tradingsymbol: pos.tradingsymbol,
                    symboltoken: pos.symboltoken,
                    exchange: pos.exchange,
                    producttype: pos.producttype,
                    netQty,
                    avgBuyPrice: parseFloat(avgBuyPrice.toFixed(2)),
                    investedValue: parseFloat(investedValue.toFixed(2)),
                    realizedPnl: parseFloat(realizedPnl.toFixed(2)),
                    // ltp & unrealizedPnl will be enriched by frontend via live price feed
                    ltp: null,
                    unrealizedPnl: null,
                });
            } else if (netQty < 0) {
                // SHORT position — included for completeness
                holdings.push({
                    tradingsymbol: pos.tradingsymbol,
                    symboltoken: pos.symboltoken,
                    exchange: pos.exchange,
                    producttype: pos.producttype,
                    netQty,   // negative = short
                    avgBuyPrice: parseFloat(avgBuyPrice.toFixed(2)),
                    investedValue: 0,
                    realizedPnl: parseFloat(realizedPnl.toFixed(2)),
                    ltp: null,
                    unrealizedPnl: null,
                });
            }
        }

        // Sort: largest invested value first
        holdings.sort((a, b) => b.investedValue - a.investedValue);

        logger.success(`Portfolio: ${holdings.length} holdings for user ${userId}`);

        return res.status(200).json({
            success: true,
            count: holdings.length,
            holdings,
            summary: {
                totalInvested: parseFloat(totalInvested.toFixed(2)),
                totalRealizedPnl: parseFloat(totalRealizedPnl.toFixed(2)),
                holdingsCount: holdings.length,
            }
        });

    } catch (error) {
        logger.error('Get Holdings Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch portfolio holdings',
            error: error.message
        });
    }
};

/**
 * Get Portfolio Summary (lightweight endpoint)
 * GET /api/portfolio/summary?userId=<id>
 */
export const getPortfolioSummary = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : req.query.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        const completedOrders = await Order.find({ userId, orderstatus: 'complete' });

        let totalBuyValue = 0;
        let totalSellValue = 0;
        let totalBuyQty = 0;
        let totalSellQty = 0;
        const symbols = new Set();

        for (const order of completedOrders) {
            const qty = order.filledShares || order.quantity;
            const price = order.averagePrice || order.price || 0;
            symbols.add(order.tradingsymbol);

            if (order.transactiontype === 'BUY') {
                totalBuyValue += qty * price;
                totalBuyQty += qty;
            } else {
                totalSellValue += qty * price;
                totalSellQty += qty;
            }
        }

        const realizedPnl = totalSellValue - (totalSellQty > 0 && totalBuyQty > 0
            ? (totalBuyValue / totalBuyQty) * totalSellQty
            : 0);
        const netInvested = totalBuyValue - totalSellValue;

        return res.status(200).json({
            success: true,
            summary: {
                totalBuyValue: parseFloat(totalBuyValue.toFixed(2)),
                totalSellValue: parseFloat(totalSellValue.toFixed(2)),
                netInvested: parseFloat(Math.max(netInvested, 0).toFixed(2)),
                realizedPnl: parseFloat(realizedPnl.toFixed(2)),
                totalOrders: completedOrders.length,
                uniqueSymbols: symbols.size,
            }
        });

    } catch (error) {
        logger.error('Get Portfolio Summary Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch summary',
            error: error.message
        });
    }
};
