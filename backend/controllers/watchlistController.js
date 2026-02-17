import Watchlist from '../models/Watchlist.js';

export const addToWatchlist = async (req, res) => {
    try {
        const { stockId } = req.body;
        const userId = req.user._id;

        let watchlist = await Watchlist.findOne({ user: userId });

        if (!watchlist) {
            watchlist = new Watchlist({ user: userId, stocks: [] });
        }

        if (watchlist.stocks.includes(stockId)) {
            return res.status(400).json({ message: 'Stock already in watchlist' });
        }

        watchlist.stocks.push(stockId);
        await watchlist.save();

        res.status(201).json(watchlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getWatchlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const watchlist = await Watchlist.findOne({ user: userId }).populate('stocks');

        if (!watchlist) {
            return res.status(200).json([]);
        }

        res.status(200).json(watchlist.stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFromWatchlist = async (req, res) => {
    try {
        const { stockId } = req.params;
        const userId = req.user._id;

        const watchlist = await Watchlist.findOne({ user: userId });

        if (watchlist) {
            watchlist.stocks = watchlist.stocks.filter((id) => id.toString() !== stockId);
            await watchlist.save();
            // populate after remove to return updated list with details, or just return ids?
            // User likely needs updated list.
            const updatedWatchlist = await Watchlist.findOne({ user: userId }).populate('stocks');
            return res.status(200).json(updatedWatchlist.stocks);
        }

        res.status(404).json({ message: 'Watchlist not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
