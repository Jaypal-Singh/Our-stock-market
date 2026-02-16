import { smartApi } from '../config/angelConfig.js';
import { createRequire } from 'module';
import AngelOneCredential from '../models/AngelOneCredential.js';

const require = createRequire(import.meta.url);
const { TOTP } = require('otplib');

export const loginAngelOne = async (req, res) => {
    try {
        let credentialDoc = await AngelOneCredential.findOne();
        
        // Fallback to env variables if not found in DB or if missing crucial fields like TOTP key
        if (!credentialDoc || !credentialDoc.angel_totp_key) {
            console.log("No valid Angel Credential in DB (missing TOTP key). Checking .env...");
            
            // If an invalid doc exists, remove it so we don't accumulate junk
            if (credentialDoc) {
                await AngelOneCredential.deleteOne({ _id: credentialDoc._id });
            }

            const { ANGEL_CLIENT_ID, ANGEL_PASSWORD, ANGEL_TOTP_KEY, ANGEL_API_KEY } = process.env;
            
            console.log("Env Vars Check:", { 
                hasClientId: !!ANGEL_CLIENT_ID, 
                hasPassword: !!ANGEL_PASSWORD, 
                hasTotp: !!ANGEL_TOTP_KEY, 
                totpLen: ANGEL_TOTP_KEY ? ANGEL_TOTP_KEY.length : 0,
                hasApiKey: !!ANGEL_API_KEY 
            });

            if (ANGEL_CLIENT_ID && ANGEL_PASSWORD && ANGEL_TOTP_KEY && ANGEL_API_KEY) {
                console.log("Found credentials in .env. Creating new DB entry.");
                credentialDoc = new AngelOneCredential({
                    angel_client_id: ANGEL_CLIENT_ID,
                    angel_password: ANGEL_PASSWORD,
                    angel_totp_key: ANGEL_TOTP_KEY,
                    angel_api_key: ANGEL_API_KEY
                });
                console.log("Created credentialDoc from env:", credentialDoc);
            } else {
                 console.log("Missing one or more env vars.");
                 return res.status(404).json({ message: "No Angel One credentials found in DB or .env." });
            }
        }

        console.log("CredentialDoc before destructuring:", credentialDoc);
        
        // Use direct property access instead of destructuring to avoid Mongoose doc issues
        const clientCode = credentialDoc.angel_client_id;
        const pass = credentialDoc.angel_password;
        const totpKey = credentialDoc.angel_totp_key;
        
        console.log("Extracted totpKey:", totpKey);

        // Generate TOTP
        // Implementing manual TOTP generation to bypass otplib configuration issues
        let totpToken;

        try {
            // Helper function for Base32 decoding
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
                
                // Convert counter to 8-byte buffer
                const buffer = Buffer.alloc(8);
                buffer.writeBigInt64BE(BigInt(counter), 0);

                // HMAC-SHA1
                const hmac = require('node:crypto').createHmac('sha1', key);
                hmac.update(buffer);
                const digest = hmac.digest();

                // Dynamic Truncation
                const offset = digest[digest.length - 1] & 0xf;
                const binary =
                    ((digest[offset] & 0x7f) << 24) |
                    ((digest[offset + 1] & 0xff) << 16) |
                    ((digest[offset + 2] & 0xff) << 8) |
                    (digest[offset + 3] & 0xff);

                const otp = binary % 1000000;
                return otp.toString().padStart(6, '0');
            };

            if (!totpKey || totpKey.length < 10) {
                 throw new Error("Invalid TOTP Key length");
            }

            totpToken = generateTOTP(totpKey);
            console.log("TOTP Generated successfully with manual implementation");
            console.log("Token:", totpToken);

        } catch (err) {
             console.error("Manual TOTP Generation failed:", err.message);
             return res.status(500).json({ message: "TOTP Generation failed", error: err.message });
        }

        // Perform Login
        const data = await smartApi.generateSession(clientCode, pass, totpToken);

        if (data.status) {
            // 2. Save Tokens to DB
            // If doc exists, update it.
            
            if (credentialDoc) {
                credentialDoc.feedToken = data.data.feedToken;
                credentialDoc.jwtToken = data.data.jwtToken;
                credentialDoc.refreshToken = data.data.refreshToken;
                credentialDoc.token_expiry = new Date(Date.now() + 24 * 60 * 60 * 1000); 
                await credentialDoc.save();
                console.log("Tokens saved to AngelOneCredential DB");
            }

            return res.status(200).json({
                status: true,
                message: "Login Successful",
                feedToken: data.data.feedToken,
                jwtToken: data.data.jwtToken, 
                // We send these back, but frontend primarily needs feedToken for WS
            });
        } else {
            return res.status(401).json({ status: false, message: data.message || "Login Failed" });
        }

    } catch (error) {
        console.error("Angel Login Error:", error);
        res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
    }
};
