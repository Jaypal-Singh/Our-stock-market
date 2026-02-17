import Tooltips from "./tooltips";
import React, { useState } from "react";
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

function StockList() {
    // Use the hook to get real-time stock data
    const { stocks, isConnected, error } = useAngelOneSocket();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    const [showBuyWindow, setShowBuyWindow] = useState(false);
    const [showSellWindow, setShowSellWindow] = useState(false);

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

    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        return parseFloat(priceStr.toString().replace(/,/g, ''));
    };

    const parsePercent = (percentStr) => {
        if (!percentStr) return 0;
        return parseFloat(percentStr.toString().replace('%', ''));
    };


    return (
        <div className="bg-[#0b0e14] w-full h-full flex flex-col text-[#d1d4dc] font-sans relative">
            {/* Windows Layer */}
            {showBuyWindow && selectedStock && (
                <BuyWindow
                    uid="buy-window-main"
                    stockName={selectedStock.name}
                    stockPrice={parsePrice(selectedStock.price)}
                    stockChange={parseFloat(selectedStock.change)}
                    stockChangePercent={parsePercent(selectedStock.percent)}
                    onClose={() => setShowBuyWindow(false)}
                />
            )}
            {showSellWindow && selectedStock && (
                <SellWindow
                    uid="sell-window-main"
                    stockName={selectedStock.name}
                    stockPrice={parsePrice(selectedStock.price)}
                    stockChange={parseFloat(selectedStock.change)}
                    stockChangePercent={parsePercent(selectedStock.percent)}
                    onClose={() => setShowSellWindow(false)}
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
                        {/* <Settings size={18} className="cursor-pointer hover:text-white" /> */}
                        {/* <X size={20} className="cursor-pointer hover:text-white" /> */}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center px-3 py-2 gap-4 text-[13px] border-b border-[#2a2e39]">
                    <span className="text-[#2962ff] border-b-2 border-[#2962ff] pb-2 cursor-pointer">
                        mywatchlist
                    </span>
                    <span className="text-[#868993] pb-2 cursor-pointer hover:text-white">
                        JAINISH
                    </span>
                    <span className="text-[#868993] pb-2 cursor-pointer hover:text-white">
                        Today
                    </span>
                </div>

                {/* Search */}
                <div className="p-3">
                    <div className="flex items-center bg-[#2a2e39] rounded px-3 py-1.5">
                        <Search size={16} className="text-[#868993] mr-2" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-sm w-full"
                        />
                        <Filter size={16} className="text-[#868993]" />
                    </div>
                </div>
            </div>

            {/* 2. Scrollable List Area (Ye portion scroll hoga) */}
            <div className="flex-1 overflow-y-auto customscrollbar">
                {stocks && stocks.length > 0 ? (
                    stocks.map((stock, index) => {
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
                    <div className="text-center text-[#868993] py-8">
                        {isConnected ? 'No stocks in watchlist' : 'Connecting...'}
                    </div>
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
