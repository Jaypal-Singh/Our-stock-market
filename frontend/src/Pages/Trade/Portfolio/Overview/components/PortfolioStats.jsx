
import React from 'react';
import { Wallet, Briefcase, TrendingDown, TrendingUp, Clock } from 'lucide-react';

const PortfolioStats = () => {
    return (
        <div className="bg-[#1e2330] rounded-lg border border-[#2a2e39] mb-4 p-4 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#2a2e39]">

            {/* Invested Amount */}
            <div className="flex items-center gap-3 px-4 first:pl-0">
                <div className="text-gray-500">
                    <Wallet size={20} strokeWidth={1.5} />
                </div>
                <div>
                    <div className="text-[#868993] text-[11px] font-bold">Invested Amount</div>
                    <div className="text-base font-bold text-white">₹ 23,139</div>
                </div>
            </div>

            {/* Current Value */}
            <div className="flex items-center gap-3 px-4">
                <div className="text-gray-500">
                    <Briefcase size={20} strokeWidth={1.5} />
                </div>
                <div>
                    <div className="text-[#868993] text-[11px] font-bold">Current Value</div>
                    <div className="text-base font-bold text-white">₹ 16,495</div>
                </div>
            </div>

            {/* Overall Loss */}
            <div className="flex items-center gap-3 px-4">
                <div className="text-red-500">
                    <TrendingDown size={20} strokeWidth={1.5} />
                </div>
                <div>
                    <div className="text-[#868993] text-[11px] font-bold">Overall Loss</div>
                    <div className="flex items-center gap-2 text-red-500 font-bold">
                        <span className="text-base">₹ 6,643.86</span>
                        <span className="text-[11px]">-28.71%</span>
                    </div>
                </div>
            </div>

            {/* Today's Loss */}
            <div className="flex items-center gap-3 px-4">
                <div className="text-red-500">
                    <Clock size={20} strokeWidth={1.5} />
                </div>
                <div>
                    <div className="text-[#868993] text-[11px] font-bold">Today's Loss</div>
                    <div className="flex items-center gap-2 text-red-500 font-bold">
                        <span className="text-base">₹ 282.70</span>
                        <span className="text-[11px]">-1.71%</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PortfolioStats;
