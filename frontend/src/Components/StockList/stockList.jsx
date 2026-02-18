import Tooltips from "./tooltips";
import React, { useState, useRef, useEffect } from "react";
import {
    Settings,
    X,
    Plus,
    Search,
    Filter,
    Sparkles,
    ChevronRight,
} from "lucide-react";
import useAngelOneSocket from "../../Hooks/useAngelOneSocket";
import BuyWindow from "../Buy&SellWindow/BuyWindow/BuyWindow";
import SellWindow from "../Buy&SellWindow/SellWindow/SellWindow";
import SearchContainer from "./Search/SearchContainer";
import StockDetailsOverlay from "./StockDetailsOverlay";
import EmptyWatchlist from "../Common/EmptyWatchlist";
import CreateWatchlistModal from "../Common/CreateWatchlistModal";
import axios from "axios";

function StockList() {
    // Use the hook to get real-time stock data
    const { stocks, isConnected, error, addStock } = useAngelOneSocket();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    const [showBuyWindow, setShowBuyWindow] = useState(false);
    const [showSellWindow, setShowSellWindow] = useState(false);

    // New Detail Window State
    const [showDetailsWindow, setShowDetailsWindow] = useState(false);
    const [selectedDetailStock, setSelectedDetailStock] = useState(null);

    const [watchlists, setWatchlists] = useState([]);
    const [activeWatchlist, setActiveWatchlist] = useState();
    const [activeStocks, setActiveStocks] = useState([]);
    const searchRef = useRef(null);

    // Helper: get auth config from stored userInfo
    const getAuthConfig = () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo?.token) return null;
            return { headers: { Authorization: `Bearer ${userInfo.token}` } };
        } catch { return null; }
    };

    const handleBuyClick = (stock) => {
        setSelectedStock(stock);
        setShowBuyWindow(true);
        setShowSellWindow(false);
    };

    const handleSellClick = (stock) => {
        setSelectedStock(stock);
        setShowSellWindow(true);
        setShowBuyWindow(false);
    };

    const handleStockSelect = (stock) => {
        setSelectedDetailStock(stock);
        setShowDetailsWindow(true);
    };

    // Fetch all watchlists (names) on mount
    useEffect(() => {
        fetchWatchlists();
    }, []);

    const fetchWatchlists = async () => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const res = await axios.get('http://localhost:5000/api/watchlist/getAllWatchlists', config);
            setWatchlists(res.data);
            if (res.data.length > 0 && !activeWatchlist) {
                setActiveWatchlist(res.data[0]); // Default to first
            }
            // If activeWatchlist was already set (e.g. from state persistence), ensure it's valid?
        } catch (error) {
            console.error("Error fetching watchlists", error);
        }
    };

    // Fetch stocks when activeWatchlist changes
    useEffect(() => {
        if (activeWatchlist) {
            const name = activeWatchlist.name || activeWatchlist;
            if (typeof name === 'string') {
                fetchWatchlistStocks(name);
            }
        }
    }, [activeWatchlist]);

    const fetchWatchlistStocks = async (name) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const res = await axios.get(`http://localhost:5000/api/watchlist/${name}`, config);
            const instruments = res.data;

            if (instruments.length === 0) {
                setActiveStocks([]);
                return;
            }

            // Fetch live quotes for these instruments
            try {
                const { fetchStockQuotes } = await import('../../services/angelOneService');
                const liveData = await fetchStockQuotes(instruments);

                // Merge live data into instruments
                const merged = instruments.map(inst => {
                    const live = liveData.find(l => l.token === inst.token);
                    if (live) {
                        return {
                            ...inst,
                            price: live.ltp || live.price || 0,
                            ltp: live.ltp || 0,
                            change: live.netChange || live.change || 0,
                            changePercent: live.percentChange || live.changePercent || 0,
                            open: live.open,
                            high: live.high,
                            low: live.low,
                            close: live.close,
                            lastUpdated: new Date().toISOString(),
                        };
                    }
                    return inst;
                });
                setActiveStocks(merged);
            } catch (quoteErr) {
                console.error("Error fetching live quotes, showing static data", quoteErr);
                setActiveStocks(instruments);
            }
        } catch (error) {
            console.error("Error fetching stocks", error);
        }
    };

    // Add stock to active watchlist via backend API
    const handleAddStockToWatchlist = async (stock) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const watchlistName = activeWatchlist?.name || activeWatchlist;
            await axios.post('http://localhost:5000/api/watchlist/addToWatchlist', {
                stockId: stock._id,
                watchlistName: watchlistName,
            }, config);
            // Refresh the stock list after adding
            if (typeof watchlistName === 'string') {
                fetchWatchlistStocks(watchlistName);
            }
        } catch (error) {
            console.error("Error adding stock to watchlist", error);
        }
    };

    const handleStockBuyFromDetails = (stock) => {
        setSelectedStock(stock);
        setShowBuyWindow(true);
        setShowSellWindow(false);
        setShowDetailsWindow(false);
    };

    const handleStockSellFromDetails = (stock) => {
        setSelectedStock(stock);
        setShowSellWindow(true);
        setShowBuyWindow(false);
        setShowDetailsWindow(false);
    };

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        return parseFloat(priceStr.toString().replace(/,/g, ''));
    };

    const parsePercent = (percentStr) => {
        if (!percentStr) return 0;
        return parseFloat(percentStr.toString().replace('%', ''));
    };

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreateWatchlist = async (name) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const res = await axios.post('http://localhost:5000/api/watchlist/createWatchlist', { name }, config);
            await fetchWatchlists();
            // Set the newly created watchlist as active
            setActiveWatchlist(res.data);
        } catch (error) {
            console.error("Error creating watchlist", error);
        }
    };


    return (
        <div className="bg-[#0b0e14] w-full h-full flex flex-col text-[#d1d4dc] font-sans relative">
            <CreateWatchlistModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateWatchlist}
            />
            {/* Windows Layer */}
            {showBuyWindow && selectedStock && (
                <BuyWindow
                    uid={selectedStock.token}
                    stockName={selectedStock.name}
                    stockSymbol={selectedStock.symbol}
                    stockPrice={parsePrice(selectedStock.price)}
                    stockChange={parseFloat(selectedStock.change)}
                    stockChangePercent={parsePercent(selectedStock.percent)}
                    onClose={() => setShowBuyWindow(false)}
                    onSwitchToSell={() => handleSellClick(selectedStock)}
                />
            )}
            {showSellWindow && selectedStock && (
                <SellWindow
                    uid={selectedStock.token}
                    stockName={selectedStock.name}
                    stockSymbol={selectedStock.symbol}
                    stockPrice={parsePrice(selectedStock.price)}
                    stockChange={parseFloat(selectedStock.change)}
                    stockChangePercent={parsePercent(selectedStock.percent)}
                    onClose={() => setShowSellWindow(false)}
                    onSwitchToBuy={() => handleSellClick(selectedStock)}

                />
            )}

            {/* Stock Details Overlay */}
            {showDetailsWindow && selectedDetailStock && (
                <StockDetailsOverlay
                    stock={selectedDetailStock}
                    onClose={() => setShowDetailsWindow(false)}
                    onBuy={handleStockBuyFromDetails}
                    onSell={handleStockSellFromDetails}
                />
            )}

            {/* 1. Header (Fixed) */}
            <div className="flex-none">
                <div className="flex items-center justify-between p-3 border-b border-[#2a2e39]">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">Watchlist</span>
                        {/* Connection Status Indicator */}
                        <span className={`text-[10px] px-2 py-0.5 rounded ${isConnected
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                            {isConnected ? '● LIVE' : '○ Connecting...'}
                        </span>
                    </div>
                    <div className="flex gap-3 text-[#868993]">
                        {error && (
                            <span className="text-[10px] text-red-400">{error}</span>
                        )}
                        <Filter size={18} className="cursor-pointer hover:text-white" />
                        <Settings size={18} className="cursor-pointer hover:text-white" />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-between px-3 py-2 text-[13px] border-b border-[#2a2e39]">
                    <div className="flex overflow-x-auto no-scrollbar gap-4 flex-1">
                        {watchlists.map((list) => (
                            <span
                                key={list._id || list}
                                onClick={() => setActiveWatchlist(list)}
                                className={`pb-2 cursor-pointer whitespace-nowrap border-b-2 transition-colors ${(activeWatchlist?._id === list._id || activeWatchlist === list)
                                    ? "text-[#2962ff] border-[#2962ff]"
                                    : "text-[#868993] border-transparent hover:text-white"
                                    }`}
                            >
                                {list.name || list}
                            </span>
                        ))}
                    </div>
                    <div className="pl-3 border-l border-[#2a2e39] shrink-0">
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="text-[#868993] hover:text-[#2962ff] p-1"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>

                <SearchContainer
                    ref={searchRef}
                    onAddStock={handleAddStockToWatchlist}
                    onSelectStock={handleStockSelect}
                    onBuy={handleBuyClick}
                    onSell={handleSellClick}
                />
            </div>

            {/* 2. Scrollable List Area (Ye portion scroll hoga) */}
            <div className="flex-1 overflow-y-auto customscrollbar">
                {/* Use activeStocks if available (from DB), else fallback to socket stocks if intended. 
                    Actually, if we want to show the WATCHLIST stocks, we must use activeStocks.
                    But activeStocks might lack live data properties if not merged.
                    For now, let's render activeStocks and rely on whatever properties used.
                */}
                {activeStocks && activeStocks.length > 0 ? (
                    activeStocks.map((stock, index) => {
                        if (!stock || typeof stock !== 'object') return null;

                        const hasLiveData = stock.lastUpdated || (stock.price && stock.price !== 0);
                        const isUp = (stock.changePercent || 0) >= 0;
                        const price = stock.price || stock.ltp || 0;
                        const change = stock.change || 0;
                        const changePercent = stock.changePercent || 0;
                        const exchangeType = stock.exch_seg || 'NSE';

                        return (
                            <div
                                key={stock.token || index}
                                className="relative flex justify-between items-center px-4 py-2.5 hover:bg-[#2a2e39] cursor-pointer border-b border-[#1e222d]"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {hoveredIndex === index && (
                                    <div
                                        className={`absolute left-1/2 transform -translate-x-1/2 z-50 ${index === 0 ? "top-8" : "-top-7"
                                            }`}
                                    >
                                        <Tooltips
                                            position={index === 0 ? "bottom" : "top"}
                                            onBuy={() => handleBuyClick(stock)}
                                            onSell={() => handleSellClick(stock)}
                                        />
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-[13px] flex items-center gap-2">
                                        {stock.name}
                                        {stock.instrumenttype === 'FUTSTK' && (
                                            <span className="text-[8px] px-1.5 py-0.5 bg-[#f7931a]/20 text-[#f7931a] rounded">FUT</span>
                                        )}
                                    </span>
                                    <span className="text-[10px] text-[#868993]">{exchangeType}</span>
                                    {stock.lastUpdated && (
                                        <Sparkles size={12} className="text-[#089981] animate-pulse" />
                                    )}
                                </div>
                                <div className="text-right">
                                    {hasLiveData ? (
                                        <>
                                            <div
                                                className={`text-[13px] font-bold ${isUp ? "text-[#089981]" : "text-[#f23645]"}`}
                                            >
                                                {typeof price === 'number' ? price.toFixed(2) : '0.00'} {isUp ? "▲" : "▼"}
                                            </div>
                                            <div className="text-[11px] text-[#868993]">
                                                {typeof change === 'number' ? change.toFixed(2) : '0.00'} ({typeof changePercent === 'number' ? changePercent.toFixed(2) : '0.00'}%)
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-[13px] font-bold text-[#868993]">
                                                --
                                            </div>
                                            <div className="text-[11px] text-[#868993]">
                                                No data
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <EmptyWatchlist onAddClick={() => {
                        if (searchRef.current) {
                            searchRef.current.openSearch();
                        }
                    }} />
                )}
            </div>

            {/* 3. Footer (Always Fixed at Bottom) */}
            {/* <div className="flex-none p-3 border-t border-[#2a2e39] bg-[#131722] flex justify-between items-center text-[#2962ff] text-[11px] font-bold hover:bg-[#1e222d] cursor-pointer">
        <span>OPTIONS QUICK LIST</span>
        <ChevronRight size={16} className="bg-[#2a2e39] rounded-full" />
      </div> */}
        </div>
    );
}

export default StockList;
