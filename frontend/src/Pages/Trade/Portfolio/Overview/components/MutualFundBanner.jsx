
import React from 'react';
import { Info } from 'lucide-react';

const MutualFundBanner = () => {
    return (
        <div className="bg-[#1e2330] rounded-lg border border-[#2a2e39] p-3 flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <Info size={18} className="text-[#5c6bc0]" strokeWidth={2} />
                <span className="text-[#d1d4dc] text-xs font-medium">You have not invested in Mutual Funds with Angel One yet.</span>
            </div>

            <div className="flex items-center gap-4 bg-[#14161f] px-3 py-1.5 rounded">
                <span className="text-[#d1d4dc] text-xs font-bold">Mutual Funds</span>
                <button className="bg-[#1e2330] hover:bg-[#2a2e39] text-[#5c6bc0] text-[10px] font-bold py-1.5 px-3 rounded border border-[#2a2e39] transition-colors uppercase tracking-wide">
                    Invest Now
                </button>
            </div>
        </div>
    );
};

export default MutualFundBanner;
