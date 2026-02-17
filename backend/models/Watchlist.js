import mongoose from 'mongoose';

const watchlistSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stocks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instrument',
    }],
}, {
    timestamps: true,
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export default Watchlist;
