import React from 'react';
import PositionsTable from './components/PositionsTable';
import { Briefcase } from 'lucide-react';

function Positions() {
    return (
        <div className="h-full flex flex-col bg-[#0b1020] text-[#d1d4dc] font-sans">
            {/* Top Summary Banner */}
            <div className="flex-none p-4 border-b border-[#2a2e39] bg-[#14161f]">
                <div className="flex items-center gap-8">
                    <div>
                        <div className="text-[#868993] text-[10px] font-bold uppercase mb-1">Total P&L</div>
                        <div className="text-red-500 text-xl font-bold flex items-center gap-2">
                            -₹272.50
                            <span className="text-xs font-medium bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">-1.2%</span>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-[#2a2e39]"></div>
                    <div>
                        <div className="text-[#868993] text-[10px] font-bold uppercase mb-1">Day's P&L</div>
                        <div className="text-green-500 text-xl font-bold flex items-center gap-2">
                            +₹360.00
                            <span className="text-xs font-medium bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">+0.5%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 customscrollbar">
                <PositionsTable />
            </div>
        </div>
    )
}

export default Positions;
