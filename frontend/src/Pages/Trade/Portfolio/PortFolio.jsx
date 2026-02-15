import React, { useState } from 'react';
import Overview from './Overview/Overview';
import Equity from './Equity/Equity';
import MobilePortfolio from './MobilePortFolio/MobilePortfolio';

function Portfolio() {
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="flex flex-col h-full bg-[#0b0e14] text-[#d1d4dc] font-sans">
            {/* Desktop Navigation Bar */}
            <div className="hidden md:flex items-center justify-between border-b border-[#2a2e39] px-6 h-12">
                <div className="flex items-center gap-6 h-full">
                    <button
                        className={`h-full text-sm font-bold border-b-2 transition-colors ${activeTab === 'Overview' ? 'border-[#5c6bc0] text-[#5c6bc0]' : 'border-transparent text-[#868993] hover:text-white'}`}
                        onClick={() => setActiveTab('Overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`h-full text-sm font-bold border-b-2 transition-colors ${activeTab === 'Equity' ? 'border-[#5c6bc0] text-[#5c6bc0]' : 'border-transparent text-[#868993] hover:text-white'}`}
                        onClick={() => setActiveTab('Equity')}
                    >
                        Equity
                    </button>
                </div>
                <div>
                    <button className="text-xs font-bold px-3 py-1.5 rounded border border-[#2a2e39] hover:bg-[#2a2e39] text-[#5c6bc0] flex items-center gap-2">
                        {/* Assuming an eye icon or similar based on "HIDE WATCHLIST" text which implies showing/hiding something */}
                        HIDE WATCHLIST
                    </button>
                </div>
            </div>

            {/* Content Area (Desktop) */}
            <div className="hidden md:block flex-1 overflow-y-auto customscrollbar">
                {activeTab === 'Overview' && <Overview />}
                {activeTab === 'Equity' && <Equity />}
            </div>

            {/* Mobile View */}
            <div className="md:hidden h-full">
                <MobilePortfolio />
            </div>
        </div>
    );
}

export default Portfolio;
