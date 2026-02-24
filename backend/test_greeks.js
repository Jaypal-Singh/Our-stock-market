import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { getSessionCredentials } from './controllers/angelController.js';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

async function testGreeks() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);

        const creds = await getSessionCredentials();
        const { jwtToken, apiKey } = creds;

        const name = 'NIFTY';
        const expirydate = '26FEB2026';

        console.log(`Fetching Greeks for ${name} ${expirydate}...`);

        const apiUrl = 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/marketData/v1/optionGreek';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-UserType': 'USER',
                'X-SourceID': 'WEB',
                'X-ClientLocalIP': '127.0.0.1',
                'X-ClientPublicIP': '127.0.0.1',
                'X-MACAddress': 'MAC_ADDRESS',
                'X-PrivateKey': apiKey
            },
            body: JSON.stringify({ name, expirydate })
        });

        const result = await response.json();
        console.log('--- GREEKS DATA ---');
        console.log(JSON.stringify(result, null, 2));
    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        process.exit();
    }
}

testGreeks();
