import React from 'react';
import { Wallet } from 'lucide-react';

const FundsBanner = () => {
    return (
        <div className="bg-[#0b0e14] rounded-xl border border-[#2a2e39] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden group mb-8 text-center md:text-left">
            {/* Decorative subtle texture/glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e2330]/30 to-transparent pointer-events-none"></div>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 z-10 w-full">
                {/* Illustration Placeholder */}
                <div className="w-16 h-16 bg-[#1e2330] rounded-full flex-shrink-0 flex items-center justify-center relative shadow-lg border border-[#2a2e39]">
                    <Wallet size={32} className="text-[#d1d4dc]" strokeWidth={1.5} />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#5c6bc0] rounded-full flex items-center justify-center text-white text-lg font-bold border-4 border-[#0b0e14] shadow-sm">+</div>
                </div>

                <div className="flex-1">
                    <div className="text-[#868993] text-[10px] font-bold uppercase mb-2 md:mb-1 tracking-wider">Get ready to Invest</div>
                    <h2 className="text-white text-lg md:text-xl font-bold leading-tight">Add funds to start your trading journey with Angel One</h2>
                </div>
            </div>

            <button className="w-full md:w-auto bg-[#5c6bc0] hover:bg-[#4a5699] text-white text-sm md:text-xs font-bold py-3.5 px-6 rounded uppercase tracking-wide transition-colors z-10 shadow-lg shadow-[#5c6bc0]/20 whitespace-nowrap min-w-fit">
                Add Funds to Start Trading
            </button>
        </div>
    );
};

export default FundsBanner;
