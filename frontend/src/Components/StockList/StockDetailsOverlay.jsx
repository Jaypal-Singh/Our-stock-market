import React from "react";
import { X, TrendingUp, Clock, Info, CheckCircle, AlertCircle } from "lucide-react";

/**
 * StockDetailsOverlay
 * A detailed view for a selected stock, mimicking Angel One's stock details page.
 */
const StockDetailsOverlay = ({ stock, onClose, onBuy, onSell }) => {
    if (!stock) return null;

    // Mock data for details not available in the basic search result
    const details = {
        open: stock.open || "0.00",
        high: stock.high || "0.00",
        low: stock.low || "0.00",
        close: stock.close || "0.00",
        volume: stock.volume || "0",
        avgPrice: (parseFloat(stock.price) * 0.98).toFixed(2), // Mock
        lowerCircuit: (parseFloat(stock.price) * 0.9).toFixed(2), // Mock
        upperCircuit: (parseFloat(stock.price) * 1.1).toFixed(2), // Mock
    };

    const isUp = parseFloat(stock.change) >= 0;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1e222d] w-[90%] max-w-[500px] rounded-lg shadow-2xl border border-[#2a2e39] overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-4 border-b border-[#2a2e39] flex justify-between items-start bg-[#1e222d]">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-[#e1e4e8]">{stock.name}</h2>
                            <span className="text-[10px] bg-[#2a2e39] text-[#868993] px-1.5 py-0.5 rounded border border-[#363a45]">
                                {stock.exch_seg}
                            </span>
                        </div>
                        <div className="text-xs text-[#868993] mt-1 font-medium tracking-wide">
                            {stock.symbol}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-[#868993] hover:text-white hover:bg-[#2a2e39] rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Price Section */}
                <div className="p-6 text-center border-b border-[#2a2e39] bg-[#1e222d]">
                    <div className={`text-4xl font-bold ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {stock.price || stock.ltp || "0.00"}
                    </div>
                    <div className={`flex items-center justify-center gap-2 mt-2 text-sm font-medium ${isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        <span>{stock.change > 0 ? '+' : ''}{stock.change || "0.00"}</span>
                        <span>({stock.percent || "0.00"}%)</span>
                    </div>
                    <div className="text-[10px] text-[#868993] mt-1">
                        As on {new Date().toLocaleTimeString()}
                    </div>
                </div>

                {/* Key Statistics Grid */}
                <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-8 bg-[#131722]">
                    <div className="flex justify-between items-center border-b border-[#2a2e39]/30 pb-2">
                        <span className="text-xs text-[#868993]">Open</span>
                        <span className="text-sm font-semibold text-[#e1e4e8]">{details.open}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#2a2e39]/30 pb-2">
                        <span className="text-xs text-[#868993]">Close</span>
                        <span className="text-sm font-semibold text-[#e1e4e8]">{details.close}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#2a2e39]/30 pb-2">
                        <span className="text-xs text-[#868993]">High</span>
                        <span className="text-sm font-semibold text-[#e1e4e8]">{details.high}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#2a2e39]/30 pb-2">
                        <span className="text-xs text-[#868993]">Low</span>
                        <span className="text-sm font-semibold text-[#e1e4e8]">{details.low}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-[#868993]">Volume</span>
                        <span className="text-sm font-semibold text-[#e1e4e8]">{parseInt(details.volume).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-[#868993]">Avg. Price</span>
                        <span className="text-sm font-semibold text-[#e1e4e8]">{details.avgPrice}</span>
                    </div>
                </div>

                {/* Market Depth / Technicals Placeholder */}
                <div className="flex-1 bg-[#1e222d] p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#868993] uppercase tracking-wider">Technicals</span>
                        <span className="text-[10px] text-[#2962ff] cursor-pointer hover:underline">View Charts</span>
                    </div>

                    {/* Mock Sentiment Bar */}
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-1.5 flex-1 bg-[#f23645] rounded-l-full relative group">
                            <span className="absolute -top-5 left-0 text-[10px] text-[#f23645] opacity-0 group-hover:opacity-100 transition-opacity">Bearish</span>
                        </div>
                        <div className="h-1.5 w-[20%] bg-[#d1d4dc] relative group">
                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-[#d1d4dc] opacity-0 group-hover:opacity-100 transition-opacity">Neutral</span>
                        </div>
                        <div className="h-1.5 flex-1 bg-[#089981] rounded-r-full relative group">
                            <span className="absolute -top-5 right-0 text-[10px] text-[#089981] opacity-0 group-hover:opacity-100 transition-opacity">Bullish</span>
                        </div>
                    </div>
                    <div className="text-[10px] text-center text-[#868993] mt-1">Market Sentiment</div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-[#1e222d] border-t border-[#2a2e39] grid grid-cols-2 gap-4">
                    <button
                        onClick={() => {
                            onBuy(stock);
                            onClose();
                        }}
                        className="bg-[#2962ff] hover:bg-[#1e54d6] text-white font-bold py-3 rounded text-sm uppercase tracking-wide transition-colors shadow-lg active:scale-95"
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => {
                            onSell(stock);
                            onClose();
                        }}
                        className="bg-[#f23645] hover:bg-[#d82c3a] text-white font-bold py-3 rounded text-sm uppercase tracking-wide transition-colors shadow-lg active:scale-95"
                    >
                        Sell
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StockDetailsOverlay;
