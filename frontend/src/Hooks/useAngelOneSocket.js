import { useState, useEffect, useRef } from 'react';
import { stocks as initialStocks } from '../Utils/stockData.js';
import { SmartAPI, WebSocketV2 } from 'smartapi-javascript';

const useAngelOneSocket = () => {
    const [stocks, setStocks] = useState(initialStocks);
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef(null);

    useEffect(() => {
        const connectToAngelOne = async () => {
            try {
                // 1. Get Feed Token from Backend
                const response = await fetch('http://localhost:5000/api/angel/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // In a real app, you might not hardcode credentials in body here if backend uses .env
                    // But our backend is set up to use .env if body is empty.
                    body: JSON.stringify({}) 
                });

                const data = await response.json();

                if (!data.status || !data.feedToken) {
                    console.error("Failed to get feed token:", data.message);
                    return;
                }

                const { feedToken, jwtToken, refreshToken } = data;

                // 2. Initialize WebSocketV2
                const webSocket = new WebSocketV2({
                    jwttoken: jwtToken,
                    apikey: process.env.REACT_APP_ANGEL_API_KEY, // This needs to be in frontend .env
                    clientcode: process.env.REACT_APP_ANGEL_CLIENT_ID,
                    feedtype: feedToken  // Changed from 'feedtoken' to 'feedtype'
                });

                wsRef.current = webSocket;

                webSocket.connect().then(() => {
                    setIsConnected(true);
                    
                    // 3. Subscribe to Stocks
                    // Extract tokens from our stockData
                    const stockTokens = initialStocks.map(s => s.token).filter(t => t); // Get all tokens
                    
                    const jsonReq = {
                        correlationID: "abcde12345",
                        action: 1, // Subscribe
                        mode: 2, // 1=LTP, 2=Quote (OHLC+LTP)
                        exchangeType: 1, // 1=NSE
                        tokens: stockTokens // Subscribe to dynamic list
                    };

                    webSocket.fetchData(jsonReq);
                });

                webSocket.on('tick', (receiveTick) => {
                    // 4. Update Prices
                    // Map received tick to our stock list format
                    // This logic depends on exact tick structure
                    console.log("Tick Data:", receiveTick);
                });

            } catch (error) {
                console.error("Angel One Connection Error:", error);
            }
        };

        connectToAngelOne();

        return () => {
            if (wsRef.current) {
                try {
                    wsRef.current.close();
                } catch(e) { console.error("Error closing WS", e); }
            }
        };
    }, []);

    return stocks;
};

export default useAngelOneSocket;
