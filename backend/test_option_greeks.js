import dotenv from 'dotenv';
import { createRequire } from 'module';

dotenv.config();

const require = createRequire(import.meta.url);

// ---- TOTP Generation (same as angelController.js) ----
const base32Decode = (encoded) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = 0, value = 0, output = [];
    for (let i = 0; i < encoded.length; i++) {
        const idx = alphabet.indexOf(encoded[i].toUpperCase());
        if (idx === -1) continue;
        value = (value << 5) | idx;
        bits += 5;
        if (bits >= 8) { output.push((value >>> (bits - 8)) & 255); bits -= 8; }
    }
    return Buffer.from(output);
};

const generateTOTP = (secret) => {
    const key = base32Decode(secret);
    const counter = Math.floor(Date.now() / 1000 / 30);
    const buffer = Buffer.alloc(8);
    buffer.writeBigInt64BE(BigInt(counter), 0);
    const hmac = require('node:crypto').createHmac('sha1', key);
    hmac.update(buffer);
    const digest = hmac.digest();
    const offset = digest[digest.length - 1] & 0xf;
    const binary = ((digest[offset] & 0x7f) << 24) | ((digest[offset + 1] & 0xff) << 16) | ((digest[offset + 2] & 0xff) << 8) | (digest[offset + 3] & 0xff);
    return (binary % 1000000).toString().padStart(6, '0');
};

// ---- Main Test ----
async function testOptionGreeks() {
    const { ANGEL_API_KEY, ANGEL_CLIENT_ID, ANGEL_PASSWORD, ANGEL_TOTP_KEY } = process.env;
    console.log('=== Angel One Option Greeks Test ===');
    console.log('Client ID:', ANGEL_CLIENT_ID);
    console.log('API Key:', ANGEL_API_KEY);

    // Step 1: Login to get JWT token
    console.log('\n--- Step 1: Login ---');
    const { SmartAPI } = await import('smartapi-javascript');
    const smart = new SmartAPI({ api_key: ANGEL_API_KEY });
    const totp = generateTOTP(ANGEL_TOTP_KEY);
    console.log('TOTP:', totp);

    const loginData = await smart.generateSession(ANGEL_CLIENT_ID, ANGEL_PASSWORD, totp);
    console.log('Login status:', loginData.status);
    console.log('Login message:', loginData.message);

    if (!loginData.status) {
        console.error('LOGIN FAILED! Cannot proceed.');
        return;
    }

    const jwtToken = loginData.data.jwtToken;
    console.log('JWT Token (first 50 chars):', jwtToken.substring(0, 50) + '...');

    // Step 2: Call Option Greeks API
    console.log('\n--- Step 2: Option Greeks API ---');

    const urls = [
        'https://apiconnect.angelone.in/rest/secure/angelbroking/marketData/v1/optionGreek',
        'https://apiconnect.angelbroking.com/rest/secure/angelbroking/marketData/v1/optionGreek'
    ];

    const testCases = [
        { name: 'NIFTY', expirydate: '27FEB2026' },
        { name: 'BANKNIFTY', expirydate: '26FEB2026' },
        { name: 'NIFTY', expirydate: '26MAR2026' },
        { name: 'SBIN', expirydate: '26FEB2026' },
    ];

    for (const url of urls) {
        console.log(`\n🔗 Testing URL: ${url}`);

        for (const testCase of testCases) {
            console.log(`\n  📤 Request: ${JSON.stringify(testCase)}`);

            try {
                const response = await fetch(url, {
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
                        'X-PrivateKey': ANGEL_API_KEY
                    },
                    body: JSON.stringify(testCase)
                });

                console.log(`  📥 HTTP Status: ${response.status}`);
                const text = await response.text();
                console.log(`  📥 Response: ${text.substring(0, 500)}`);

                if (text.includes('"status":true')) {
                    const parsed = JSON.parse(text);
                    console.log(`  ✅ SUCCESS! Got ${parsed.data?.length || 0} records`);
                    if (parsed.data && parsed.data[0]) {
                        console.log(`  📊 Sample: ${JSON.stringify(parsed.data[0])}`);
                    }
                    return; // Found working combination!
                }
            } catch (err) {
                console.log(`  ❌ Error: ${err.message}`);
            }
        }
    }

    console.log('\n❌ None of the URL + symbol combinations worked.');
}

testOptionGreeks().catch(e => console.error('Fatal:', e));
