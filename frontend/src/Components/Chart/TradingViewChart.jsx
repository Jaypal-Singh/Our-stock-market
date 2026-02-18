import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createChart, ColorType, CandlestickSeries, HistogramSeries } from 'lightweight-charts';
import { useSocket } from '../../context/SocketContext';
import axios from 'axios';
import { parseTickData } from '../../utils/stockDataParser';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TradingViewChart = ({ stock, interval = 'FIVE_MINUTE', onCrosshairMove }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const volumeSeriesRef = useRef(null);
    const socketRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Data refs to hold state without causing re-renders during updates
    const candleDataRef = useRef([]);
    const isChartReadyRef = useRef(false);

    // -------------------------------------------------------------------------
    // Helper: Calculate Bar Time
    // -------------------------------------------------------------------------
    const getBarTime = useCallback((timestamp, intervalStr) => {
        const date = new Date(timestamp);
        const minutes = date.getMinutes();
        let intervalMinutes = 5;

        switch (intervalStr) {
            case 'ONE_MINUTE': intervalMinutes = 1; break;
            case 'FIVE_MINUTE': intervalMinutes = 5; break;
            case 'FIFTEEN_MINUTE': intervalMinutes = 15; break;
            case 'THIRTY_MINUTE': intervalMinutes = 30; break;
            case 'ONE_HOUR': intervalMinutes = 60; break;
            case 'ONE_DAY': return new Date(date.setHours(0, 0, 0, 0)).getTime() / 1000;
            default: intervalMinutes = 5;
        }

        const roundedMinutes = Math.floor(minutes / intervalMinutes) * intervalMinutes;
        date.setMinutes(roundedMinutes, 0, 0);
        return date.getTime() / 1000;
    }, []);

    // -------------------------------------------------------------------------
    // 1. Chart Initialization & cleanup
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Cleanup previous chart if exists (important for strict mode / re-mounts)
        if (chartRef.current) {
            chartRef.current.remove();
            chartRef.current = null;
        }

        const container = chartContainerRef.current;

        // --- Create Chart ---
        let width = container.clientWidth;
        let height = container.clientHeight;

        // Fallback for 0 dimensions to prevent crash
        if (width === 0) width = container.parentElement?.clientWidth || 600;
        if (height === 0) height = container.parentElement?.clientHeight || 400;

        if (width === 0 || height === 0) {
            // Still 0? Defer initialization
            return;
        }

        try {
            const chart = createChart(container, {
                layout: {
                    background: { type: ColorType.Solid, color: '#131722' },
                    textColor: '#d1d4dc',
                },
                grid: {
                    vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
                    horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
                },
                width: width,
                height: height,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: false,
                },
            });

            // --- Add Series ---
            const candlestickSeries = chart.addSeries(CandlestickSeries, {
                upColor: '#089981',
                downColor: '#f23645',
                borderVisible: false,
                wickUpColor: '#089981',
                wickDownColor: '#f23645',
            });

            const volumeSeries = chart.addSeries(HistogramSeries, {
                color: '#26a69a',
                priceFormat: { type: 'volume' },
                priceScaleId: 'volume',
            });

            // Safe price scale application - MUST be done AFTER adding series for that scale
            try {
                chart.priceScale('volume').applyOptions({
                    scaleMargins: { top: 0.8, bottom: 0 },
                });
            } catch (e) {
                console.warn("Volume scale config error", e);
            }

            // --- Crosshair Move Handler ---
            chart.subscribeCrosshairMove(param => {
                try {
                    if (onCrosshairMove) {
                        if (
                            !param ||
                            param.point === undefined ||
                            !param.time ||
                            param.point.x < 0 ||
                            param.point.x > container.clientWidth ||
                            param.point.y < 0 ||
                            param.point.y > container.clientHeight
                        ) {
                            onCrosshairMove(null);
                        } else {
                            // Safety check for seriesData
                            if (param.seriesData && typeof param.seriesData.get === 'function') {
                                const data = param.seriesData.get(candlestickSeries);
                                onCrosshairMove(data || null);
                            } else {
                                onCrosshairMove(null);
                            }
                        }
                    }
                } catch (err) {
                    console.error("Error in crosshair handler:", err);
                }
            });

            // --- Store References ---
            chartRef.current = chart;
            seriesRef.current = candlestickSeries;
            volumeSeriesRef.current = volumeSeries;
            isChartReadyRef.current = true;

        } catch (initErr) {
            console.error("Chart initialization crash:", initErr);
            setError(`Chart Crash: ${initErr.message}`);
        }

        // ... (Resize logic) ...

        // Cleanup on unmount
        return () => {
            // ...
            if (chartRef.current) {
                try {
                    chartRef.current.unsubscribeCrosshairMove();
                    chartRef.current.remove();
                } catch (e) {
                    console.warn("Error disposing chart:", e);
                }
                chartRef.current = null;
                isChartReadyRef.current = false;
            }
        };
    }, []); // Run once on mount.

    // -------------------------------------------------------------------------
    // 2. Fetch Data (History)
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (!stock || !stock.token) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Formatting Dates
                const toDate = new Date();
                const fromDate = new Date();
                fromDate.setDate(fromDate.getDate() - 5); // 5 days history

                const formatDate = (date) => {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                };

                const payload = {
                    exchange: stock.exch_seg || stock.exchange || 'NSE',
                    symboltoken: stock.token,
                    interval: interval,
                    fromdate: `${formatDate(fromDate)} 09:15`,
                    todate: `${formatDate(toDate)} 15:30`
                };

                // Auth Headers
                let config = {};
                try {
                    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                    if (userInfo?.token) {
                        config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                    }
                } catch (e) { console.warn("No user info found"); }

                // API Call
                const response = await axios.post(`${BACKEND_URL}/api/stock/candle`, payload, config);

                if (response.data && Array.isArray(response.data)) {
                    // Parse & Sort
                    const parsedData = response.data
                        .map(d => {
                            const t = new Date(d[0]).getTime() / 1000;
                            return {
                                time: t,
                                open: Number(d[1]),
                                high: Number(d[2]),
                                low: Number(d[3]),
                                close: Number(d[4]),
                                volume: Number(d[5]) || 0
                            };
                        })
                        .filter(d => !isNaN(d.time)) // Filter invalid dates
                        .sort((a, b) => a.time - b.time);

                    // Remove Duplicates
                    const uniqueData = [];
                    const seen = new Set();
                    for (const item of parsedData) {
                        if (!seen.has(item.time)) {
                            seen.add(item.time);
                            uniqueData.push(item);
                        }
                    }

                    // Update Refs & Chart
                    candleDataRef.current = uniqueData;

                    if (chartRef.current && seriesRef.current && volumeSeriesRef.current) {
                        console.log(`[TvChart] Setting Data: ${uniqueData.length} candles. Sample:`, uniqueData[0]);
                        seriesRef.current.setData(uniqueData);

                        const volData = uniqueData.map(d => ({
                            time: d.time,
                            value: d.volume,
                            color: d.close >= d.open ? 'rgba(8, 153, 129, 0.5)' : 'rgba(242, 54, 69, 0.5)',
                        }));
                        volumeSeriesRef.current.setData(volData);

                        chartRef.current.timeScale().fitContent();
                    } else {
                        console.warn("[TvChart] Chart or Series Refs are null during data update");
                    }
                    setIsLoading(false);

                } else {
                    console.warn("Invalid data received");
                    setIsLoading(false);
                }

            } catch (err) {
                console.error("Fetch candles error:", err);
                setError("Failed to load chart data");
                setIsLoading(false);
            }
        };

        fetchData();

    }, [stock, interval]); // Re-fetch on stock/interval change

    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // 3. Socket / Real-time Updates
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (!stock || !stock.token || !socket || !isConnected) return;

        console.log(`🔌 Subscribing to ${stock.symbol} (${stock.token}) for Chart updates`);

        socket.emit('subscribe_stocks', {
            tokens: [stock],
            mode: 1 // Using Mode 1 (LTP)
        });

        const handleTick = (tickData) => {
            if (!isChartReadyRef.current) return;
            try {
                const parsedTick = parseTickData(tickData);
                if (parsedTick && parsedTick.token === stock.token) {
                    const price = parsedTick.ltp;
                    const timestamp = parsedTick.timestamp || Date.now();
                    const barTime = getBarTime(timestamp, interval);

                    const currentData = candleDataRef.current;
                    const lastBar = currentData[currentData.length - 1];

                    let updatedBar;

                    if (lastBar && lastBar.time === barTime) {
                        // Update existing bar
                        updatedBar = {
                            ...lastBar,
                            high: Math.max(lastBar.high, price),
                            low: Math.min(lastBar.low, price),
                            close: price
                        };
                        currentData[currentData.length - 1] = updatedBar;
                    } else {
                        // Create new bar
                        updatedBar = {
                            time: barTime,
                            open: price,
                            high: price,
                            low: price,
                            close: price
                        };
                        currentData.push(updatedBar);
                    }

                    // Update Chart Series
                    if (seriesRef.current) {
                        seriesRef.current.update(updatedBar);
                    }
                }
            } catch (err) {
                console.error("Chart Tick Error:", err);
            }
        };

        socket.on('tick_data', handleTick);

        return () => {
            socket.off('tick_data', handleTick);
        };
    }, [stock, isConnected, socket, interval, getBarTime]);

    return (
        <div className="w-full h-full relative" style={{ minHeight: '100%' }}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#131722] z-10">
                    <span className="text-gray-400 text-sm animate-pulse">Loading Chart...</span>
                </div>
            )}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#131722] z-10">
                    <span className="text-red-400 text-sm">{error}</span>
                </div>
            )}
            <div ref={chartContainerRef} className="w-full h-full" />
        </div>
    );
};

export default TradingViewChart;
