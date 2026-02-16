
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createRequire } from 'module';
import AngelOneCredential from './models/AngelOneCredential.js';
import { SmartAPI, WebSocketV2 } from 'smartapi-javascript';

const require = createRequire(import.meta.url);
const crypto = require('node:crypto');

dotenv.config();

const base32Decode = (encoded) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = 0;
    let value = 0;
    let output = [];

    for (let i = 0; i < encoded.length; i++) {
        const char = encoded[i].toUpperCase();
        const index = alphabet.indexOf(char);
        if (index === -1) continue;

        value = (value << 5) | index;
        bits += 5;

        if (bits >= 8) {
            output.push((value >>> (bits - 8)) & 255);
            bits -= 8;
        }
    }
    return Buffer.from(output);
};

const generateTOTP = (secret) => {
    const key = base32Decode(secret);
    const epoch = Math.floor(Date.now() / 1000);
    const timeStep = 30;
    const counter = Math.floor(epoch / timeStep);
    
    const buffer = Buffer.alloc(8);
    buffer.writeBigInt64BE(BigInt(counter), 0);

    const hmac = crypto.createHmac('sha1', key);
    hmac.update(buffer);
    const digest = hmac.digest();

    const offset = digest[digest.length - 1] & 0xf;
    const binary =
        ((digest[offset] & 0x7f) << 24) |
        ((digest[offset + 1] & 0xff) << 16) |
        ((digest[offset + 2] & 0xff) << 8) |
        (digest[offset + 3] & 0xff);

    const otp = binary % 1000000;
    return otp.toString().padStart(6, '0');
};

const connectSocket = async () => {
    let smartApi = new SmartAPI({
        api_key: process.env.ANGEL_API_KEY
    });

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const credentialDoc = await AngelOneCredential.findOne();
        console.log("Credential lookup finished. Doc:", credentialDoc ? credentialDoc._id : "NULL");
        
        if (!credentialDoc) {
             console.error("No credentials in DB");
             return;
        }

        const { angel_client_id: clientCode, angel_password: pass, angel_totp_key: totpKey } = credentialDoc;
        console.log("Using credentials for:", clientCode);

        console.log("Generating TOTP...");
        const totpToken = generateTOTP(totpKey);
        console.log("Generated TOTP:", totpToken);

        console.log("Calling SmartAPI generateSession...");
        const data = await smartApi.generateSession(clientCode, pass, totpToken);
        console.log("Session generated status:", data.status);
        console.log("Full Login Response:", JSON.stringify(data));

            if (data.status) {
            let feedToken = data.data.feedToken;
            let jwtToken = data.data.jwtToken;
            
            // Trim tokens just in case
            if (feedToken) feedToken = feedToken.trim();
            if (jwtToken) jwtToken = jwtToken.trim();

            console.log("Attributes for WebSocket:");
            console.log("FeedToken:", feedToken ? feedToken.substring(0, 20) + "..." : "MISSING");
            console.log("JwtToken:", jwtToken ? jwtToken.substring(0, 20) + "..." : "MISSING");
            console.log("ClientCode:", clientCode);
            console.log("API Key:", process.env.ANGEL_API_KEY);

            if (feedToken) {
                console.log("FeedToken length:", feedToken.length);
                console.log("FeedToken chars:", feedToken.split('').map(c => c.charCodeAt(0)).join(','));
            }
            if (jwtToken) {
                console.log("JwtToken length:", jwtToken.length);
                // JWT is long, log first 50 chars
                console.log("JwtToken start chars:", jwtToken.substring(0, 50).split('').map(c => c.charCodeAt(0)).join(','));
            }

            // Check for invalid characters in headers
            const checkHeader = (name, val) => {
                if (!val) return;
                for (let i = 0; i < val.length; i++) {
                    const code = val.charCodeAt(i);
                    // Allowed header chars (roughly): 32-126. 
                    if (code < 32 || code > 126) {
                        console.error(`Header ${name} contains invalid char code ${code} at index ${i}`);
                    }
                }
            };
            checkHeader('Authorization', jwtToken);
            checkHeader('x-feed-token', feedToken);

            const webSocket = new WebSocketV2({
                jwttoken: jwtToken,
                apikey: process.env.ANGEL_API_KEY,
                clientcode: clientCode,
                feedtype: feedToken  // Changed from 'feedtoken' to 'feedtype'
            });

            webSocket.connect().then(() => {
                console.log("WebSocket Connected!");
                
                // Subscribe to a known token
                // 10181 (BALKRISHNA-EQ)
                const jsonReq = {
                    correlationID: "test_script_123",
                    action: 1, // Subscribe
                    mode: 2, // Quote
                    exchangeType: 1, // NSE
                    tokens: ["10181"] 
                };
                
                webSocket.fetchData(jsonReq);
                console.log("Sent subscription request for token 10181");
                
                // Keep script alive for 15 seconds to receive data
                setTimeout(() => {
                    console.log("Closing WebSocket...");
                    webSocket.close();
                    mongoose.disconnect();
                    process.exit(0);
                }, 15000);

            }).catch(err => {
                console.error("WebSocket connection failed:", err);
            });

            webSocket.on('tick', (receiveTick) => {
                console.log("Received Tick Data:", JSON.stringify(receiveTick));
            });
            
            webSocket.on('error', (err) => {
                 console.error("WebSocket Error:", err);
            });
            
            webSocket.on('close', () => {
                console.log("WebSocket Closed");
            });

        } else {
            console.error("Login Failed:", data.message);
        }

    } catch (error) {
        console.error("Script Error:", error);
    }
};

connectSocket();
