import restAPI from '../services/angelOneRestAPI.js';
import { createLogger } from '../utils/logger.js';

const logger = createLogger('StockController');

export const getCandleData = async (req, res) => {
    try {
        const { exchange, symboltoken, interval, fromdate, todate } = req.body;

        if (!symboltoken || !interval || !fromdate || !todate) {
            return res.status(400).json({ message: 'Missing required parameters' });
        }

        const candleData = await restAPI.getCandleData({
            exchange,
            symboltoken,
            interval,
            fromdate,
            todate
        });

        res.json(candleData);
    } catch (error) {
        logger.error('Error fetching candle data:', error);
        res.status(500).json({ message: 'Failed to fetch candle data' });
    }
};
