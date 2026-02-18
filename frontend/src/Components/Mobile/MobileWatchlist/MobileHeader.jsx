import React from 'react';
import { Search, Zap, Plus } from 'lucide-react';

import MobileSearchContainer from './Search/MobileSearchContainer';

const MobileHeader = ({
    onAddStock,
    onSelectStock,
    onBuy,
    onSell,
    watchlists = [],
    activeWatchlist,
    onWatchlistChange,
    onAddWatchlist,
    forceSearchOpen,
    onForceSearchOpenHandled
}) => {
    return (
        <div className="md:hidden bg-[#0b0e14] text-[#d1d4dc] pb-2 font-sans sticky top-0 z-50">
            {/* Search Component */}
            <MobileSearchContainer
                onAddStock={onAddStock}
                onSelectStock={onSelectStock}
                onBuy={onBuy}
                onSell={onSell}
                forceOpen={forceSearchOpen}
                onForceOpenHandled={onForceSearchOpenHandled}
            />
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
            {/* Tabs */}
            <div className="flex items-center justify-between text-sm font-medium mt-2 border-b border-[#2a2e39] pb-0 px-4">
                <div className="flex overflow-x-auto no-scrollbar gap-6 flex-1 mask-linear-fade">
                    {watchlists.map((list) => {
                        const isActive = activeWatchlist?._id === list._id;
                        return (
                            <div
                                key={list._id}
                                onClick={() => onWatchlistChange && onWatchlistChange(list)}
                                className={`pb-2 px-1 cursor-pointer whitespace-nowrap transition-colors ${isActive
                                    ? "text-[#2962ff] border-b-2 border-[#2962ff]"
                                    : "text-[#868993] hover:text-white border-b-2 border-transparent"
                                    }`}
                            >
                                {isActive && <span className="text-[#2962ff] mr-1">•</span>}
                                {list.name}
                            </div>
                        );
                    })}
                </div>
                <div
                    onClick={onAddWatchlist}
                    className="text-[#2962ff] pb-2 pl-4 ml-2 border-l border-[#2a2e39] cursor-pointer flex items-center shrink-0"
                >
                    <Plus size={18} />
                </div>
            </div>

        </div>
    );
};

export default MobileHeader;
