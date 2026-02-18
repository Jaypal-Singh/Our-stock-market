import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { stocks as initialStocks } from '../utils/stockData.js';
import { parseTickData, updateStockPrice } from '../utils/stockDataParser.js';
import { getMarketStatus, fetchStockQuotes } from '../services/angelOneService.js';

const useAngelOneSocket = () => {
    const { socket, isConnected, error: socketError } = useSocket();
    const [stocks, setStocks] = useState(initialStocks);
    const [error, setError] = useState(null);
    const [marketStatus, setMarketStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const hasLoadedRestData = useRef(false);

    // Sync local error with socket error
    useEffect(() => {
        if (socketError) setError(socketError);
    }, [socketError]);

    // Fetch initial market status and REST data if needed
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setIsLoading(true);
                
                // Check market status
                const status = await getMarketStatus();
                setMarketStatus(status);
                
                console.log('📊 Market Status:', status);
                
                // Always fetch initial data via REST to get 'Previous Close' and populate UI immediately
                // This ensures we have a baseline for percentage calculations even before the first socket tick
                if (status && !hasLoadedRestData.current) {
                    console.log('Fetching initial stock data via REST API...');
                    
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
                        console.log(`✅ Loaded ${quotes.length} initial stock prices via REST API`);
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
        if (!socket || !isConnected) return;

        // Subscribe to stocks after connection
        // Send stock objects with exchange info and mode
        const stocksToSubscribe = initialStocks
            .filter(s => s.token); // Only stocks with valid tokens

        // Use Mode 1 (LTP) for watchlist - fastest updates!
        socket.emit('subscribe_stocks', { 
            tokens: stocksToSubscribe,
            mode: 1  // 1 = LTP only (fastest for watchlist)
        });
        console.log(`📊 Requesting subscription to ${stocksToSubscribe.length} stocks with Mode 1 (LTP - Fast)`);

        // Handle subscription result
        const handleSubscriptionResult = (result) => {
            if (result.success) {
                console.log(`✅ Subscribed successfully. Total: ${result.totalSubscriptions}`);
            } else {
                console.error('Subscription failed:', result.message);
                setError('Failed to subscribe to stocks');
            }
        };

        // Handle subscription error
        const handleSubscriptionError = (data) => {
            console.error('Subscription error:', data.message);
            setError(data.message || 'Subscription error occurred');
        };

        // Handle tick data from backend
        const handleTickData = (tickData) => {
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
            }
        };

        // Attach listeners
        socket.on('subscription_result', handleSubscriptionResult);
        socket.on('subscription_error', handleSubscriptionError);
        socket.on('tick_data', handleTickData);

        // Cleanup listeners on unmount or socket change
        return () => {
            socket.off('subscription_result', handleSubscriptionResult);
            socket.off('subscription_error', handleSubscriptionError);
            socket.off('tick_data', handleTickData);
        };
    }, [socket, isConnected]);

    // Function to add a new stock to the watchlist
    const addStock = async (newStock) => {
        // Check if stock already exists
        if (stocks.find(s => s.token === newStock.token)) {
            console.log('Stock already in watchlist:', newStock.name);
            return;
        }

        console.log('➕ Adding stock to watchlist:', newStock.name);
        
        // Add to local state immediately
        setStocks(prev => [...prev, newStock]);

        // If market is closed, try to fetch REST data for this stock
        if (marketStatus && !marketStatus.isOpen) {
            console.log('Market closed, fetching REST data for new stock...');
            const quotes = await fetchStockQuotes([newStock]);
            
            if (quotes && quotes.length > 0) {
                const quote = quotes[0];
                const change = quote.ltp - quote.close;
                const changePercent = quote.close > 0 ? (change / quote.close) * 100 : 0;
                
                const updatedStock = {
                    ...newStock,
                    ltp: quote.ltp,
                    price: quote.ltp,
                    change,
                    changePercent: parseFloat(changePercent.toFixed(2)),
                    percent: `${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
                    isUp: change >= 0,
                    dataSource: 'REST'
                };
                
                // Update state with fetched data
                setStocks(prev => prev.map(s => s.token === newStock.token ? updatedStock : s));
            }
        } 
        // If market is open and socket connected, subscribe
        else if (isConnected && socket) {
            console.log('🔌 Subscribing to new stock via WebSocket...');
            socket.emit('subscribe_stocks', { 
                tokens: [newStock],
                mode: 1 
            });
        }
    };

    return {
        stocks,
        isConnected,
        error,
        marketStatus,
        isLoading,
        addStock
    };
};

export default useAngelOneSocket;
