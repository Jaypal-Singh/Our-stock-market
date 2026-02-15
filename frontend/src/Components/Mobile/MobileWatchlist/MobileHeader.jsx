import React from 'react';
import { Search, Zap } from 'lucide-react';

const MobileHeader = () => {
    return (
        <div className="md:hidden bg-[#0b0e14] text-[#d1d4dc] pb-2 font-sans sticky top-0 z-50">
            {/* Search Bar (Now Below Cards) */}
            <div className="px-4 mt-3">
                <div className="bg-[#1e222d] rounded px-3 py-2 flex items-center border border-[#2a2e39]">
                    <Search size={16} className="text-[#868993] mr-2" />
                    <input
                        type="text"
                        placeholder="Search & add"
                        className="bg-transparent border-none outline-none w-full text-sm placeholder-[#565961] text-[#d1d4dc]"
                    />
                    <span className="text-[#868993] text-xs border border-[#565961] rounded px-1.5 py-0.5">/</span>
                </div>
            </div>
            {/* Markets Today Section (Now on Top) */}
            <div className="p-4 pb-2">


                {/* Cards ScrollView - Smaller & Professional */}
                <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                    {/* SENSEX Card */}
                    <div className="min-w-[200px] p-3 rounded-lg border border-[#2a2e39] bg-[#1e222d] flex flex-col justify-between shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-[#d1d4dc] text-sm">SENSEX</span>
                            <span className="font-bold text-[#d1d4dc] text-sm">82,626.76</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-[#868993] font-medium">BSE</span>
                            <span className="text-[10px] text-[#f23645] font-medium">-1,048.16 (-1.25%)</span>
                        </div>
                    </div>

                    {/* NIFTY Card */}
                    <div className="min-w-[200px] p-3 rounded-lg border border-[#2a2e39] bg-[#1e222d] flex flex-col justify-between shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-[#d1d4dc] text-sm">NIFTY</span>
                            <span className="font-bold text-[#d1d4dc] text-sm">24,115.20</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-[#868993] font-medium">NSE</span>
                            <span className="text-[10px] text-[#f23645] font-medium">-250.60 (-1.01%)</span>
                        </div>
                    </div>
                </div>
            </div>



            {/* Tabs */}
            <div className="flex items-center gap-6 text-sm font-medium mt-2 border-b border-[#2a2e39] pb-0 px-4">
                <div className="text-[#2962ff] border-b-2 border-[#2962ff] pb-2 px-1 cursor-pointer">
                    <span className="text-[#2962ff] mr-1">•</span>
                    mywatchlist
                </div>
                <div className="text-[#868993] pb-2 px-1 hover:text-white cursor-pointer">JAINISH</div>
                <div className="text-[#868993] pb-2 px-1 hover:text-white cursor-pointer">Today</div>
                <div className="text-[#2962ff] pb-2 px-1 ml-auto whitespace-nowrap cursor-pointer text-xs">+ Add new</div>
            </div>

        </div>
    );
};

export default MobileHeader;
