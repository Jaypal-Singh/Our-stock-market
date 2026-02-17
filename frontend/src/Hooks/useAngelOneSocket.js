import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { stocks as initialStocks } from '../utils/stockData.js';
import { parseTickData, updateStockPrice } from '../utils/stockDataParser.js';
import { getMarketStatus, fetchStockQuotes } from '../services/angelOneService.js';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useAngelOneSocket = () => {
    const [stocks, setStocks] = useState(initialStocks);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const [marketStatus, setMarketStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const socketRef = useRef(null);
    const hasLoadedRestData = useRef(false);

    // Fetch initial market status and REST data if needed
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                
                // Check market status
                const status = await getMarketStatus();
                setMarketStatus(status);
                
                console.log('📊 Market Status:', status);
                
                // If market is closed, fetch REST data as fallback
                if (status && !status.isOpen && !hasLoadedRestData.current) {
                    console.log('🔄 Market closed - fetching data via REST API');
                    
                    const stocksToFetch = initialStocks.filter(s => s.token);
                    const quotes = await fetchStockQuotes(stocksToFetch);
                    
                    if (quotes && quotes.length > 0) {
                        // Update stocks with REST data
                        setStocks(prevStocks => {
                            return prevStocks.map(stock => {
                                const quote = quotes.find(q => q.token === stock.token);
                                if (quote) {
                                    const change = quote.ltp - quote.close;
                                    const changePercent = quote.close > 0 
                                        ? (change / quote.close) * 100 
                                        : 0;
                                    
                                    return {
                                        ...stock,
                                        ltp: quote.ltp,
                                        price: quote.ltp,
                                        open: quote.open,
                                        high: quote.high,
                                        low: quote.low,
                                        close: quote.close,
                                        volume: quote.volume,
                                        change,
                                        changePercent: parseFloat(changePercent.toFixed(2)),
                                        percent: `${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
                                        isUp: change >= 0,
                                        dataSource: 'REST'  // Mark as REST data
                                    };
                                }
                                return stock;
                            });
                        });
                        
                        hasLoadedRestData.current = true;
                        console.log(`✅ Loaded ${quotes.length} stock prices via REST API`);
                    }
                }
                
            } catch (error) {
                console.error('Error loading initial data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadInitialData();
    }, []);

    useEffect(() => {
        // Initialize Socket.IO connection to backend
        const socket = io(BACKEND_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        socketRef.current = socket;

        // Connection successful
        socket.on('connect', () => {
            console.log('✅ Connected to backend Socket.IO server');
            setIsConnected(true);
            setError(null);

            // Subscribe to stocks after connection
            // Send stock objects with exchange info and mode
            const stocksToSubscribe = initialStocks
                .filter(s => s.token); // Only stocks with valid tokens

            // Use Mode 1 (LTP) for watchlist - fastest updates!
            socket.emit('subscribe_stocks', { 
                tokens: stocksToSubscribe,
                mode: 1  // 1 = LTP only (fastest for watchlist)
                         // 2 = Quote (OHLC + LTP)
                         // 3 = Snap Quote (full depth)
            });
            console.log(`📊 Requesting subscription to ${stocksToSubscribe.length} stocks with Mode 1 (LTP - Fast)`);
        });

        // Handle subscription result
        socket.on('subscription_result', (result) => {
            if (result.success) {
                console.log(`✅ Subscribed successfully. Total: ${result.totalSubscriptions}`);
            } else {
                console.error('Subscription failed:', result.message);
                setError('Failed to subscribe to stocks');
            }
        });

        // Handle subscription error
        socket.on('subscription_error', (data) => {
            console.error('Subscription error:', data.message);
            setError(data.message || 'Subscription error occurred');
        });

        // Handle tick data from backend
        socket.on('tick_data', (tickData) => {
            try {
                // Parse the tick data
                const parsedTick = parseTickData(tickData);
                
                if (parsedTick) {
                    // Update stock list with new data
                    setStocks(prevStocks => 
                        updateStockPrice(prevStocks, parsedTick)
                    );
                }
            } catch (error) {
                console.error('Error processing tick data:', error);
                // Don't set error state for individual tick failures
                // to avoid disrupting the entire UI
            }
        });

        // Handle WebSocket errors from backend
        socket.on('websocket_error', (data) => {
            console.error('Backend WebSocket Error:', data.message);
            setError('Market data connection error');
        });

        // Handle WebSocket disconnection
        socket.on('websocket_disconnected', () => {
            console.log('⚠️ Backend WebSocket disconnected');
            setError('Market data disconnected');
        });

        // Handle Socket.IO connection errors
        socket.on('connect_error', (err) => {
            console.error('Socket.IO connection error:', err);
            setIsConnected(false);
            setError('Failed to connect to backend');
        });

        // Handle disconnection
        socket.on('disconnect', (reason) => {
            console.log('🔌 Disconnected from backend:', reason);
            setIsConnected(false);
        });

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                console.log('Cleaning up Socket.IO connection');
                socketRef.current.disconnect();
            }
        };
    }, []);

    return {
        stocks,
        isConnected,
        error,
        marketStatus,
        isLoading
    };
};

export default useAngelOneSocket;
