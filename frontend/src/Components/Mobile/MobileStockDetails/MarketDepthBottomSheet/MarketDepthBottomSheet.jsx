import React, { useState, useEffect } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

const MarketDepthBottomSheet = ({ isOpen, onClose, stock }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Reset expansion state when opened/closed
    useEffect(() => {
        if (!isOpen) setIsExpanded(false);
    }, [isOpen]);

    if (!isOpen) return null;

    // Mock Data based on screenshot
    const bids = [
        { qty: 4335, price: 408.95, orders: 2 },
        { qty: 0, price: 0.00, orders: 0 },
        { qty: 0, price: 0.00, orders: 0 },
        { qty: 0, price: 0.00, orders: 0 },
        { qty: 0, price: 0.00, orders: 0 },
    ];

    const asks = [
        { qty: 0, price: 0.00, orders: 0 },
        { qty: 0, price: 0.00, orders: 0 },
        { qty: 0, price: 0.00, orders: 0 },
        { qty: 0, price: 0.00, orders: 0 },
        { qty: 0, price: 0.00, orders: 0 },
    ];

    const totalBidQty = 4335;
    const totalAskQty = 0;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 z-[60] transition-opacity"
                onClick={onClose}
            />

            {/* Bottom Sheet */}
            <div
                className={`fixed left-0 right-0 bottom-0 bg-[#1e2330] rounded-t-2xl z-[70] transition-all duration-300 ease-in-out flex flex-col ${isExpanded ? 'h-full rounded-none' : 'h-[50vh] rounded-t-2xl'
                    }`}
            >
                {/* Drag Handle / Header */}
                <div
                    className="flex justify-between items-center p-4 border-b border-[#2a2e39] cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex-1 flex justify-center relative">
                        {/* Visual Handle */}
                        <div className="w-12 h-1 bg-[#868993] rounded-full absolute -top-2" />
                        <span className="text-[#868993] text-xs font-medium">
                            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center px-4 pb-2 border-b border-[#2a2e39]">
                    <div className="flex items-center gap-4 w-full">
                        <div className="flex-1 text-center">
                            <div className="text-[10px] text-[#868993]">Open</div>
                            <div className="text-sm font-bold text-[#d1d4dc]">{stock?.open || "412.30"}</div>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="text-[10px] text-[#868993]">High</div>
                            <div className="text-sm font-bold text-[#d1d4dc]">{stock?.high || "417.60"}</div>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="text-[10px] text-[#868993]">Low</div>
                            <div className="text-sm font-bold text-[#d1d4dc]">{stock?.low || "408.10"}</div>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="text-[10px] text-[#868993]">Close</div>
                            <div className="text-sm font-bold text-[#d1d4dc]">{stock?.close || "419.15"}</div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 -mr-2 text-[#868993]">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto customscrollbar p-4">
                    {/* Bid/Ask Table */}
                    <div className="bg-[#14161f] rounded-lg overflow-hidden mb-4 text-[#d1d4dc] text-xs border border-[#2a2e39]">
                        {/* Header */}
                        <div className="flex border-b border-[#2a2e39] font-bold text-[10px] text-[#868993] bg-[#1c202b]">
                            <div className="flex-1 py-2 pl-4">Qty</div>
                            <div className="flex-1 py-2 text-right">Buy Price</div>
                            <div className="flex-1 py-2 pl-4">Sell price</div>
                            <div className="flex-1 py-2 pr-4 text-right">Qty</div>
                        </div>

                        {/* Rows */}
                        {bids.map((bid, i) => (
                            <div key={i} className="flex border-b border-[#2a2e39] last:border-0 hover:bg-[#1e2330]">
                                <div className="flex-1 py-2 pl-4 text-[#d1d4dc] font-medium">{bid.qty > 0 ? bid.qty : "0"}</div>
                                <div className="flex-1 py-2 text-right text-[#089981] font-medium">{bid.price.toFixed(2)}</div>
                                <div className="flex-1 py-2 pl-4 text-[#f23645] font-medium">{asks[i]?.price.toFixed(2) || "0.00"}</div>
                                <div className="flex-1 py-2 pr-4 text-right text-[#d1d4dc] font-medium">{asks[i]?.qty > 0 ? asks[i].qty : "0"}</div>
                            </div>
                        ))}

                        {/* Total Row */}
                        <div className="flex border-t border-[#2a2e39] font-bold bg-[#1c202b]">
                            <div className="flex-1 py-2 pl-4 text-[#089981]">{totalBidQty}</div>
                            <div className="flex-[2] py-2 text-center text-[#868993]">Total Quanity</div>
                            <div className="flex-1 py-2 pr-4 text-right text-[#f23645]">{totalAskQty}</div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="bg-[#14161f] rounded-lg p-4 mb-4 border border-[#2a2e39]">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-[#d1d4dc]">Average Traded Price</span>
                            <span className="text-xs font-bold text-[#d1d4dc]">{stock?.atp || "410.83"}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-[#2a2e39] pt-3">
                            <span className="text-xs font-bold text-[#d1d4dc]">Volume</span>
                            <span className="text-xs font-bold text-[#d1d4dc]">{stock?.volume || "8190851"}</span>
                        </div>
                    </div>

                    {/* 52 Week Range */}
                    <div className="bg-[#14161f] rounded-lg p-4 mb-4 border border-[#2a2e39]">
                        <div className="text-center text-xs font-bold text-[#d1d4dc] mb-4">52 week range</div>
                        <div className="relative h-2 bg-[#2a2e39] rounded-full mb-2">
                            {/* Dots simulation */}
                            <div className="flex justify-between absolute inset-0 items-center px-1">
                                {[...Array(15)].map((_, i) => (
                                    <div key={i} className={`w-1 h-1 rounded-full ${i < 8 ? 'bg-[#f23645]' : 'bg-[#089981]'}`}></div>
                                ))}
                            </div>
                            {/* Active dot */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#fbbf24] rounded-full border-2 border-[#14161f] shadow-sm z-10"></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-[#d1d4dc]">
                            <span>349.25</span>
                            <span>461.55</span>
                        </div>
                    </div>

                    {/* Circuit Limit */}
                    <div className="bg-[#14161f] rounded-lg p-4 border border-[#2a2e39]">
                        <div className="text-center text-xs font-bold text-[#d1d4dc] mb-4">Circuit limit</div>
                        <div className="relative h-2 bg-[#2a2e39] rounded-full mb-2">
                            {/* Dots simulation */}
                            <div className="flex justify-between absolute inset-0 items-center px-1">
                                {[...Array(15)].map((_, i) => (
                                    <div key={i} className={`w-1 h-1 rounded-full ${i < 8 ? 'bg-[#f23645]' : 'bg-[#089981]'}`}></div>
                                ))}
                            </div>
                            {/* Active dot */}
                            <div className="absolute left-[40%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#fbbf24] rounded-full border-2 border-[#14161f] shadow-sm z-10"></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-[#d1d4dc]">
                            <span>368.10</span>
                            <span>449.80</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarketDepthBottomSheet;
