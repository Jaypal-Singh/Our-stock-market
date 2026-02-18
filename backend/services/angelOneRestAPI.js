/**
 * Angel One REST API Service
 * Fetches stock quotes when market is closed or as fallback
 */

import { SmartAPI } from 'smartapi-javascript';
import { createLogger } from '../utils/logger.js';
import { getExchangeConfig } from '../config/exchanges.config.js';

const logger = createLogger('AngelOneREST');

class AngelOneRestAPI {
    constructor() {
        this.smartApi = null;
        this.isInitialized = false;
    }

    /**
     * Initialize REST API client
     * @param {object} credentials - Angel One credentials
     */
    async initialize(credentials) {
        try {
            const { jwtToken, apiKey, clientCode } = credentials;

            if (!jwtToken || !apiKey || !clientCode) {
                throw new Error('Missing required credentials');
            }

            // Always update credentials (even if already initialized)
            this.credentials = {
                jwtToken,
                apiKey,
                clientCode
            };

            this.smartApi = new SmartAPI({
                api_key: apiKey,
                access_token: jwtToken,
                client_code: clientCode
            });

            this.isInitialized = true;
            logger.success('REST API initialized/updated with fresh credentials');

            return { success: true };
        } catch (error) {
            logger.error('Failed to initialize REST API:', error);
            throw error;
        }
    }

    /**
     * Get LTP (Last Traded Price) for multiple stocks
     * @param {array} stocks - Array of stock objects with token and exch_seg
     * @returns {array} - Array of quotes
     */
    async getQuotes(stocks) {
        if (!this.isInitialized) {
            throw new Error('REST API not initialized');
        }

        try {
            logger.info(`Fetching quotes for ${stocks.length} stocks`);

            // Group stocks by exchange
            const exchangeGroups = this.groupByExchange(stocks);
            const allQuotes = [];

            // Fetch quotes for each exchange group
            for (const [exchSeg, stockList] of Object.entries(exchangeGroups)) {
                const quotes = await this.fetchExchangeQuotes(exchSeg, stockList);
                allQuotes.push(...quotes);
            }

            logger.success(`Fetched ${allQuotes.length} quotes successfully`);
            return allQuotes;

        } catch (error) {
            logger.error('Failed to fetch quotes:', error);
            throw error;
        }
    }

    /**
     * Fetch quotes for a specific exchange
     * @param {string} exchSeg - Exchange segment (NSE, NFO, etc.)
     * @param {array} stocks - Stocks for this exchange
     */
    async fetchExchangeQuotes(exchSeg, stocks) {
        const exchangeConfig = getExchangeConfig(exchSeg);
        
        if (!exchangeConfig) {
            logger.warn(`Unsupported exchange: ${exchSeg}`);
            return [];
        }

        try {
            const quotes = [];

            // Use Angel One LTP Data API
            // API: POST https://apiconnect.angelbroking.com/rest/secure/angelbroking/market/v1/quote/
            
            const tokens = stocks.map(s => `${exchangeConfig.code}:${s.token}`);
            const apiUrl = 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/market/v1/quote/';
            
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.credentials.jwtToken}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-UserType': 'USER',
                        'X-SourceID': 'WEB',
                        'X-ClientLocalIP': '127.0.0.1',
                        'X-ClientPublicIP': '127.0.0.1',
                        'X-MACAddress': 'MAC_ADDRESS',
                        'X-PrivateKey': this.credentials.apiKey
                    },
                    body: JSON.stringify({
                        mode: 'FULL',
                        exchangeTokens: {
                            [exchSeg]: stocks.map(s => s.token) // Use "NSE", "NFO" etc. as key
                        }
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    logger.error(`API HTTP Error ${response.status} for ${exchSeg}:`, errorText);
                    return [];
                }

                const responseText = await response.text();
                if (!responseText) {
                    logger.error(`API Error for ${exchSeg}: Empty response body`);
                    return [];
                }

                let result;
                try {
                    result = JSON.parse(responseText);
                } catch (e) {
                    logger.error(`API JSON Parse Error for ${exchSeg}:`, responseText.substring(0, 200));
                    return [];
                }
                
                // Detailed debug logging - FORCE CONSOLE LOG
                console.log(`🔍 [AngelOneRestAPI] Raw Response for ${exchSeg}:`, JSON.stringify(result).substring(0, 1000)); 

                if (result.status && result.data && result.data.fetched) {
                    logger.info(`API Success for ${exchSeg}: Fetched ${result.data.fetched.length} records`);
                    
                    result.data.fetched.forEach((stockData, index) => {
                        const stock = stocks.find(s => s.token === stockData.token) || stocks[index];
                        
                        if (stock) {
                            quotes.push({
                                token: stock.token,
                                exch_seg: exchSeg,
                                symbol: stock.symbol || stock.name,
                                ltp: stockData.ltp, // API usually returns actual value, verify if division needed
                                change: stockData.netChange, // Add net change
                                percentChange: stockData.percentChange, // Add percent change
                                open: stockData.open,
                                high: stockData.high,
                                low: stockData.low,
                                close: stockData.close,
                                volume: stockData.volume || 0,
                                timestamp: Date.now()
                            });
                        }
                    });
                } else {
                    logger.error(`API Error for ${exchSeg}:`, JSON.stringify(result));
                }
                
            } catch (error) {
                logger.error(`API Network/Parsing Error for ${exchSeg}:`, error.message);
                console.error(error);
            }

            logger.info(`Processed ${quotes.length} quotes for ${exchSeg}`);
            return quotes;

        } catch (error) {
            logger.error(`Exchange ${exchSeg} quotes fetch failed:`, error);
            return [];
        }
    }

    /**
     * Group stocks by exchange
     */
    groupByExchange(stocks) {
        const groups = {};
        
        stocks.forEach(stock => {
            const exchSeg = stock.exch_seg || 'NSE';
            if (!groups[exchSeg]) {
                groups[exchSeg] = [];
            }
            groups[exchSeg].push(stock);
        });

        return groups;
    }

    /**
     * Get single stock quote
     * @param {string} token - Stock token
     * @param {string} exchSeg - Exchange segment
     */
    async getSingleQuote(token, exchSeg = 'NSE') {
        const quotes = await this.getQuotes([{ token, exch_seg: exchSeg }]);
        return quotes[0] || null;
    }
}

// Export singleton instance
const restAPI = new AngelOneRestAPI();
export default restAPI;
