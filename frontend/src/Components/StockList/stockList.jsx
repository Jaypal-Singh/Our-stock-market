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
import { stocks } from "../../Utils/stockData";

function StockList() {
    const [hoveredIndex, setHoveredIndex] = useState(null);


    return (
        <div className="bg-[#0b0e14] w-full h-full flex flex-col text-[#d1d4dc] font-sans">
            {/* 1. Header (Fixed) */}
            <div className="flex-none">
                <div className="flex items-center justify-between p-3 border-b border-[#2a2e39]">
                    <span className="text-sm font-bold">Watchlist</span>
                    <div className="flex gap-3 text-[#868993]">
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
                {stocks.map((stock, index) => (
                    <div
                        key={index}
                        className="relative flex justify-between items-center px-4 py-2.5 hover:bg-[#2a2e39] cursor-pointer border-b border-[#1e222d]"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {hoveredIndex === index && (
                            <div
                                className={`absolute left-1/2 transform -translate-x-1/2 z-50 ${index === 0 ? "top-8" : "-top-10"
                                    }`}
                            >
                                <Tooltips position={index === 0 ? "bottom" : "top"} />
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-[13px]">{stock.name}</span>
                            <span className="text-[10px] text-[#868993]">NSE</span>
                            <Sparkles size={12} className="text-[#7e57c2]" />
                        </div>
                        <div className="text-right">
                            <div
                                className={`text-[13px] font-bold ${stock.isUp ? "text-[#089981]" : "text-[#f23645]"}`}
                            >
                                {stock.price} {stock.isUp ? "▲" : "▼"}
                            </div>
                            <div className="text-[11px] text-[#868993]">
                                {stock.change} ({stock.percent})
                            </div>
                        </div>
                    </div>
                ))}
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
