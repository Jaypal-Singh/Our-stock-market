import mongoose from 'mongoose';

const InstrumentSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    expiry: {
        type: String, // Can be empty string "" based on provided example
        required: false,
    },
    strike: {
        type: String, // "-1.000000"
        required: false
    },
    lotsize: {
        type: String, // "1"
        required: false
    },
    instrumenttype: {
        type: String,
        required: false
    },
    exch_seg: {
        type: String, // "nse_cm"
        required: true
    },
    tick_size: {
        type: String, // "5.000000"
        required: false
    }
}, {
    timestamps: true,
});

const Instrument = mongoose.model('Instrument', InstrumentSchema);

export default Instrument;