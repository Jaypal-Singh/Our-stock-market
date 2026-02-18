import restAPI from './services/angelOneRestAPI.js';
import dotenv from 'dotenv';
import { getSessionCredentials } from './controllers/angelController.js';

dotenv.config();

const testCandleFetch = async () => {
    try {
        console.log('Initializing...');
        
        // You might need to mock or setup the session first if it relies on DB
        // But let's try to get credentials if environment variables are set or use a mock
        // Since we are running this standalone, we might need to manually Initialize
        // For now, let's assume we can get credentials from env or similar
        
        // Note: getSessionCredentials usually fetches from DB. 
        // If DB is needed, we need to connectDB()
        
        const credentials = {
            jwtToken: process.env.ANGEL_JWT_TOKEN, // You might not have this in env if it's dynamic
            apiKey: process.env.ANGEL_API_KEY,
            clientCode: process.env.ANGEL_CLIENT_CODE,
             feedToken: process.env.ANGEL_FEED_TOKEN
        };

        if (!credentials.apiKey) {
             console.error('Missing env vars. This script assumes direct env vars for testing or needs DB connection.');
             console.log('Skipping standalone test due to missing dynamic credentials.');
             return;
        }

        await restAPI.initialize(credentials);

        const params = {
            exchange: 'NSE',
            symboltoken: '3045', // SBIN
            interval: 'FIVE_MINUTE',
            fromdate: '2023-10-25 09:15',
            todate: '2023-10-25 15:30'
        };

        console.log('Fetching candle data...', params);
        const data = await restAPI.getCandleData(params);
        console.log('Result:', data);

    } catch (error) {
        console.error('Test failed:', error);
    }
};

testCandleFetch();
