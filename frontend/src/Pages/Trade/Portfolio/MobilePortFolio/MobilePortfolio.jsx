
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const MobilePortfolio = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data based on screenshot structure + dark theme adaptation
    const portfolioSummary = {
        totalPL: -6998.20,
        totalPLPercent: -30.24,
        invested: 23139.00,
        current: 16141.40,
        dayGain: 0.00
    };

    const holdings = [
        {
            symbol: "LXCHEM",
            qty: 110,
            avgPrice: 210.36,
            ltp: 146.74,
            pl: -6998.20,
            plPercent: -30.24,
            dayChangePercent: -3.38
        },
        // Add more dummy items to test scrolling
        {
            symbol: "TATASTEEL",
            qty: 50,
            avgPrice: 150.00,
            ltp: 155.00,
            pl: 250.00,
            plPercent: 3.33,
            dayChangePercent: 1.20
        },
        {
            symbol: "RELIANCE",
            qty: 10,
            avgPrice: 2400.00,
            ltp: 2380.00,
            pl: -200.00,
            plPercent: -0.83,
            dayChangePercent: -0.50
        },
        {
            symbol: "HDFCBANK",
            qty: 25,
            avgPrice: 1600.00,
            ltp: 1620.00,
            pl: 500.00,
            plPercent: 1.25,
            dayChangePercent: 0.80
        }
    ];

    const isProfit = (value) => value >= 0;

    return (
        <div className="flex flex-col h-full bg-[#0b0e14] text-[#d1d4dc] font-sans relative">

            {/* 1. Header with Search & Filter */}
            <div className="p-4 flex items-center gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-[#1e222d] border border-[#2a2e39] rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="bg-[#1e222d] p-2 rounded-full border border-[#2a2e39] text-[#d1d4dc]">
                    <Filter size={18} />
                </button>
            </div>

            {/* 2. Portfolio Summary Card */}
            {/* Using a gradient or solid background to distinguish it, similar to the pink/red background in screenshot but dark theme appropriate */}
            <div className={`mx-4 p-4 rounded-xl ${portfolioSummary.totalPL >= 0 ? 'bg-green-900/20 border-green-800/30' : 'bg-red-900/20 border-red-800/30'} border`}>
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-400">Total P&L</span>
                </div>

                <div className={`text-2xl font-bold mb-4 ${portfolioSummary.totalPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {portfolioSummary.totalPL >= 0 ? '+' : ''}{portfolioSummary.totalPL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    <span className="text-lg font-normal ml-1">
                        ({portfolioSummary.totalPLPercent}%)
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm border-t border-dashed border-gray-700/50 pt-3">
                    <div>
                        <div className="text-xs text-gray-400 mb-0.5">Invested</div>
                        <div className="font-semibold text-white">₹{portfolioSummary.invested.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-400 mb-0.5">Current</div>
                        <div className="font-semibold text-white">₹{portfolioSummary.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                    </div>
                </div>
            </div>

            {/* 3. Holdings List Header */}
            <div className="px-4 py-2 flex justify-between items-center text-[10px] text-gray-500 uppercase mt-2 border-b border-[#2a2e39]">
                <span>Symbol / Qty / Avg. Price</span>
                <span>Total P&L / LTP</span>
            </div>

            {/* 4. Holdings List */}
            <div className="flex-1 overflow-y-auto pb-16 customscrollbar">
                {holdings.map((stock, index) => (
                    <div key={index} className="px-4 py-3 border-b border-[#2a2e39] flex justify-between items-start">

                        {/* Left Side */}
                        <div>
                            <div className="font-bold text-white text-sm mb-1">{stock.symbol}</div>
                            <div className="text-xs text-gray-400">
                                {stock.qty} <span className="text-[10px] mx-0.5">@</span> ₹{stock.avgPrice.toFixed(2)}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="text-right">
                            <div className={`font-semibold text-sm mb-1 ${stock.pl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {stock.pl >= 0 ? '+' : ''}{stock.pl.toFixed(2)}
                                <span className="text-[10px] ml-1">({stock.plPercent}%)</span>
                            </div>
                            <div className="text-xs text-gray-400 flex justify-end items-center gap-1">
                                {stock.ltp.toFixed(2)}
                                <span className={`${stock.dayChangePercent >= 0 ? 'text-green-500' : 'text-red-500'} text-[10px]`}>
                                    {stock.dayChangePercent}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 5. Fixed Footer (Today's Gain) */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#1e222d] border-t border-[#2a2e39] py-3 px-4 flex justify-between items-center z-10">
                <span className="text-sm font-medium text-gray-300">Today's Gain</span>
                <span className={`text-sm font-bold ${portfolioSummary.dayGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ₹{portfolioSummary.dayGain.toFixed(2)}
                </span>
            </div>

        </div>
    );
};

export default MobilePortfolio;
