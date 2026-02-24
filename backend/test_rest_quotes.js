import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import restAPI from './services/angelOneRestAPI.js';
import { getSessionCredentials } from './controllers/angelController.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function testQuotes() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        const creds = await getSessionCredentials();
        await restAPI.initialize(creds);

        // Exact tokens from MarketIndicesStrip.jsx
        const stocks = [
            { token: '99926000', exch_seg: 'NSE', symbol: 'NIFTY' },
            { token: '99926009', exch_seg: 'NSE', symbol: 'BANKNIFTY' },
            { token: '99919000', exch_seg: 'BSE', symbol: 'SENSEX' }
        ];
        const quotes = await restAPI.getQuotes(stocks);

        console.log('--- QUOTE DATA ---');
        console.log(JSON.stringify(quotes, null, 2));
    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        process.exit();
    }
}

testQuotes();
