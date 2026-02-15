import React from 'react';
import MobileHeader from './MobileHeader';
import MobileWatchlist from './MobileWatchlist';

const MobileWatchlistPage = () => {
    return (
        <div className="flex flex-col h-full bg-[#0b0e14]">
            {/* Header - Fixed/Non-scrolling */}
            <div className="flex-none z-10">
                <MobileHeader />
            </div>

            {/* List - Scrollable */}
            <div className="flex-1 overflow-y-auto customscrollbar pb-20">
                <MobileWatchlist />
            </div>
        </div>
    );
};

export default MobileWatchlistPage;
