
import React from 'react';
import { ChevronRight } from 'lucide-react';

const HoldingsTable = () => {
    // Dummy Data for Holdings
    const holdings = [
        {
            name: "LXCHEM",
            quantity: 110,
            avgPrice: "210.36",
            ltp: "149.96",
            invAmt: "23,139",
            currentVal: "16,496",
            overallGL: "-6,643.86",
            overallGLPercent: "-28.71%",
            dayGL: "-282.70",
            dayGLPercent: "-1.68%"
        },
        // Add more dummy rows if needed
    ];

    return (
        <div className="bg-[#1e2330] rounded-lg border border-[#2a2e39] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-[#2a2e39]">
                <div className="flex items-center gap-2">
                    <h2 className="text-white text-sm font-bold">Holdings</h2>
                    <span className="bg-[#2a2e39] text-[#5c6bc0] text-[10px] font-bold px-1.5 py-0.5 rounded">{holdings.length}</span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[#868993] text-[10px] uppercase border-b border-[#2a2e39] bg-[#1a1d26]">
                            <th className="py-2 pl-3 font-bold">Name</th>
                            <th className="py-2 text-right font-bold">Quantity</th>
                            <th className="py-2 text-right font-bold">Avg. Price</th>
                            <th className="py-2 text-right font-bold">LTP</th>
                            <th className="py-2 text-right font-bold">Inv. Amt.</th>
                            <th className="py-2 text-right font-bold">Current Val.</th>
                            <th className="py-2 text-right font-bold">Overall G/L</th>
                            <th className="py-2 text-right font-bold pr-3">Day's G/L</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holdings.map((stock, index) => (
                            <tr key={index} className="hover:bg-[#2a2e39] transition-colors cursor-pointer border-b border-[#2a2e39] last:border-0 group">
                                <td className="py-3 pl-3">
                                    <div className="text-[#d1d4dc] font-bold text-xs">{stock.name}</div>
                                </td>
                                <td className="py-3 text-right text-[#d1d4dc] text-xs">{stock.quantity}</td>
                                <td className="py-3 text-right text-[#d1d4dc] text-xs">{stock.avgPrice}</td>
                                <td className="py-3 text-right text-[#d1d4dc] text-xs">{stock.ltp}</td>
                                <td className="py-3 text-right text-[#d1d4dc] text-xs">{stock.invAmt}</td>
                                <td className="py-3 text-right text-[#d1d4dc] text-xs">{stock.currentVal}</td>
                                <td className="py-3 text-right">
                                    <div className="text-red-500 font-bold text-xs">{stock.overallGL}</div>
                                    <div className="text-[10px] text-[#868993]">{stock.overallGLPercent}</div>
                                </td>
                                <td className="py-3 text-right pr-3">
                                    <div className="text-red-500 font-bold text-xs">{stock.dayGL}</div>
                                    <div className="text-[10px] text-[#868993]">{stock.dayGLPercent}</div>
                                </td>
                            </tr>
                        ))}
                        {/* Empty State / Filler Rows (Optional visual filler) */}
                        {[...Array(5)].map((_, i) => (
                            <tr key={`empty-${i}`} className="border-b border-[#2a2e39] last:border-0 h-10">
                                <td colSpan="8"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HoldingsTable;
