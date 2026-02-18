import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    variety: {
        type: String,
        enum: ['NORMAL', 'STOPLOSS', 'AMO', 'ROBO'],
        default: 'NORMAL',
        required: true
    },
    tradingsymbol: {
        type: String,
        required: true
    },
    symboltoken: {
        type: String,
        required: true
    },
    transactiontype: {
        type: String,
        enum: ['BUY', 'SELL'],
        required: true
    },
    exchange: {
        type: String,
        enum: ['NSE', 'BSE', 'NFO', 'MCX'],
        required: true
    },
    ordertype: {
        type: String,
        enum: ['MARKET', 'LIMIT', 'STOPLOSS_LIMIT', 'STOPLOSS_MARKET'],
        required: true
    },
    producttype: {
        type: String,
        enum: ['DELIVERY', 'INTRADAY', 'CARRYFORWARD', 'MARGIN'],
        required: true
    },
    duration: {
        type: String,
        enum: ['DAY', 'IOC'],
        default: 'DAY'
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    squareoff: {
        type: Number,
        default: 0
    },
    stoploss: {
        type: Number,
        default: 0
    },
    trailingstoploss: {
        type: Number,
        default: 0
    },
    triggerprice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['PENDING', 'OPEN', 'EXECUTED', 'CANCELLED', 'REJECTED', 'FAILED'],
        default: 'PENDING'
    },
    angelOrderId: {
        type: String
    },
    message: {
        type: String
    },
    tag: {
        type: String // Optional tag for tracking
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
