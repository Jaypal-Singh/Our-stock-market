import React, { useState } from 'react';
import { ArrowLeft, Star, BarChart2, Info, ArrowUpRight, ArrowDownRight, Link, CandlestickChart, AlignLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import MarketDepthBottomSheet from './MarketDepthBottomSheet/MarketDepthBottomSheet';

const MobileStockDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const stock = location.state?.stock || {
        name: "COALINDIA",
        exchange: "NSE",
        fullName: "COAL INDIA LTD",
        price: "408.95",
        change: "10.20",
        percent: "2.43",
        isUp: false // Based on screenshot red color
    };

    const [timeRange, setTimeRange] = useState('1d');
    const [activeRatioPage, setActiveRatioPage] = useState(0);
    const [isMarketDepthOpen, setIsMarketDepthOpen] = useState(false);

    const marketStats = [
        { label: "Market Cap", value: "Rs 2,56,123 Cr" },
        { label: "1 year Return", value: "+ 47.3 (13.08%)", isGreen: true },
        { label: "Sector Return", value: "+ 12.74 (18.78%)", isGreen: true },
        { label: "Market Return", value: "+ 2439.70 (10.59%)", isGreen: true },
    ];

    const fundamentalRatiosPage1 = [
        { label: "PE Ratio", value: "8.44" },
        { label: "Price to Book Value", value: "2.39" },
        { label: "EV to EBIT", value: "7.55" },
        { label: "EV to EBITDA", value: "5.68" },
        { label: "EV to Capital Employed", value: "2.77" },
    ];

    const fundamentalRatiosPage2 = [
        { label: "EV to Sales", value: "1.65" },
        { label: "PEG Ratio", value: "0" },
        { label: "Dividend Yield", value: "5.12%" },
        { label: "ROCE (Latest)", value: "40.03%" },
        { label: "ROE (Latest)", value: "29.62%" },
    ];

    const currentRatios = activeRatioPage === 0 ? fundamentalRatiosPage1 : fundamentalRatiosPage2;


    return (
        <div className="h-full flex flex-col bg-[#0b0e14] text-[#d1d4dc] font-sans overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#2a2e39] bg-[#14161f]">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="text-[#d1d4dc]">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-white text-lg font-bold">{stock.name}</h1>
                        <p className="text-[#868993] text-[10px] font-bold uppercase">{stock.exchange}</p>
                    </div>
                </div>
                <button className="text-[#868993]">
                    <Star size={20} />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto customscrollbar pb-24">
                {/* Price Section */}
                <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <div className="text-3xl font-bold text-white mb-1">₹{stock.price}</div>
                            <div className={`text-xs font-bold flex items-center gap-1 ${stock.isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                                {stock.change} ({stock.percent}%)
                                {stock.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                <span className="text-[#868993] ml-1 font-medium">Today</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/trade/option-chain', { state: { stock } })}
                            className="flex items-center gap-1.5 bg-[#1e2330] border border-[#2a2e39] px-3 py-1.5 rounded text-xs font-bold text-[#5c6bc0]"
                        >
                            <Link size={12} /> Option Chain
                        </button>
                    </div>

                    {/* Chart Placeholder */}
                    <div className="h-64 bg-[#14161f] rounded-lg border border-[#2a2e39] flex items-center justify-center mb-4 relative overflow-hidden">
                        {/* Simple SVG Line as placeholder for chart */}
                        <svg className="w-full h-full text-[#f23645]" viewBox="0 0 100 50" preserveAspectRatio="none">
                            <path d="M0 40 Q 10 30 20 45 T 40 30 T 60 40 T 80 20 T 100 35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f23645" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#f23645" stopOpacity="0" />
                            </linearGradient>
                            <path d="M0 40 Q 10 30 20 45 T 40 30 T 60 40 T 80 20 T 100 35 V 50 H 0 Z" fill="url(#chartGradient)" />
                        </svg>
                        <div className="absolute top-2 left-2 text-[10px] text-[#868993]">Chart Visualization</div>
                    </div>

                    {/* Time Range Tabs & Chart Controls */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="flex-1 flex justify-between bg-[#1e2330] p-1 rounded-lg">
                            {['1d', '5d', '1m', '6m', 'YTD', '1yr', '5yr', 'Max'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`text-[10px] font-bold py-1.5 px-2 rounded whitespace-nowrap ${timeRange === range
                                        ? 'bg-[#5c6bc0] text-white'
                                        : 'text-[#868993] hover:text-[#d1d4dc]'
                                        }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>

                        {/* Chart Type Buttons */}
                        <div className="flex gap-2 shrink-0">
                            <button
                                onClick={() => navigate('/trade/chart', { state: { stock } })}
                                className="bg-[#1e2330] p-1.5 rounded-lg border border-[#2a2e39] text-[#d1d4dc] hover:text-white hover:border-[#5c6bc0] transition-colors"
                            >
                                <CandlestickChart size={18} />
                            </button>
                            <button
                                onClick={() => setIsMarketDepthOpen(true)}
                                className="bg-[#1e2330] p-1.5 rounded-lg border border-[#2a2e39] text-[#d1d4dc] hover:text-white hover:border-[#5c6bc0] transition-colors"
                            >
                                <AlignLeft size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Market Stats */}
                    <div className="mb-6">
                        <h3 className="text-white text-sm font-bold mb-3">Market Stats</h3>
                        <div className="bg-[#1e2330] rounded-lg border border-[#2a2e39] overflow-hidden">
                            {marketStats.map((stat, index) => (
                                <div key={index} className="flex justify-between items-center p-3 border-b border-[#2a2e39] last:border-0">
                                    <span className="text-xs font-medium text-[#d1d4dc]">{stat.label}</span>
                                    <span className={`text-xs font-bold ${stat.isGreen ? 'text-[#089981]' : 'text-white'}`}>
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fundamental Ratios */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-white text-sm font-bold">Fundamental Ratios</h3>
                            <Info size={14} className="text-[#5c6bc0]" />
                        </div>
                        <div className="bg-[#1e2330] rounded-lg border border-[#2a2e39] overflow-hidden min-h-[220px] flex flex-col justify-between">
                            <div>
                                {currentRatios.map((ratio, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 border-b border-[#2a2e39] last:border-0 border-opacity-50">
                                        <span className="text-xs font-medium text-[#d1d4dc]">{ratio.label}</span>
                                        <span className="text-xs font-bold text-white">{ratio.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Dots */}
                            <div className="flex justify-center items-center gap-2 p-3">
                                <button
                                    onClick={() => setActiveRatioPage(0)}
                                    className={`w-2 h-2 rounded-full transition-colors ${activeRatioPage === 0 ? 'bg-[#5c6bc0]' : 'bg-[#2a2e39]'}`}
                                />
                                <button
                                    onClick={() => setActiveRatioPage(1)}
                                    className={`w-2 h-2 rounded-full transition-colors ${activeRatioPage === 1 ? 'bg-[#5c6bc0]' : 'bg-[#2a2e39]'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Footer Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#14161f] border-t border-[#2a2e39] flex gap-4 z-50">
                <button
                    onClick={() => navigate('/trade/buy-order', { state: { stock } })}
                    className="flex-1 bg-[#089981] hover:bg-[#067a67] text-white py-3 rounded text-sm font-bold uppercase tracking-wide transition-colors"
                >
                    BUY
                </button>
                <button
                    onClick={() => navigate('/trade/sell-order', { state: { stock } })}
                    className="flex-1 bg-[#f23645] hover:bg-[#c92a37] text-white py-3 rounded text-sm font-bold uppercase tracking-wide transition-colors"
                >
                    SELL
                </button>
            </div>

            <MarketDepthBottomSheet
                isOpen={isMarketDepthOpen}
                onClose={() => setIsMarketDepthOpen(false)}
                stock={stock}
            />
        </div>
    );
};

export default MobileStockDetails;
