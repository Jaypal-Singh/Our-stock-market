
import React from 'react';
import { ChevronRight } from 'lucide-react';

const PortfolioBreakup = () => {
    const portfolioData = [
        {
            type: "Equity",
            percentage: 100,
            invested: "23,139",
            current: "16,496",
            overallGL: "-6,643.86",
            overallGLPercent: "-28.71%",
            dayGL: "-282.70",
            dayGLPercent: "-1.71%",
            color: "#5c6bc0"
        },
        // Dummy Data for demonstration
        // { type: "Mutual Funds", percentage: 0, invested: "0", current: "0", overallGL: "0", overallGLPercent: "0%", dayGL: "0", dayGLPercent: "0%", color: "#26a69a" },
        // { type: "Gold Bonds", percentage: 0, invested: "0", current: "0", overallGL: "0", overallGLPercent: "0%", dayGL: "0", dayGLPercent: "0%", color: "#ef5350" },
    ];

    return (
        <div className="mb-4">
            <h2 className="text-white text-sm font-bold mb-3">Portfolio Breakup</h2>

            <div className="bg-[#1e2330] rounded-lg border border-[#2a2e39] p-4 text-sm overflow-x-auto">
                {/* Progress Bar */}
                <div className="w-full bg-[#3e4455] rounded h-6 mb-4 relative overflow-hidden flex items-center">
                    {portfolioData.map((item, index) => (
                        <div key={index} className="h-full first:rounded-l last:rounded-r" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
                    ))}
                    <div className="absolute left-3 text-white text-[10px] font-bold z-10 flex items-center">
                        {/* Displaying first item as main example for now */}
                        <span className="bg-[#d1d4dc] text-black px-1 rounded-sm mr-2 shadow-sm">{portfolioData[0].percentage}%</span> {portfolioData[0].type}
                    </div>
                </div>

                {/* Data Table */}
                <div className="max-h-60 overflow-y-auto customscrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-[#1e2330] z-20">
                            <tr className="text-[#868993] text-[10px] uppercase border-b border-[#2a2e39]">
                                <th className="pb-2 pl-2 font-bold w-1/4">Asset Type</th>
                                <th className="pb-2 text-right font-bold w-1/6">Invested Amt</th>
                                <th className="pb-2 text-right font-bold w-1/6">Current Value</th>
                                <th className="pb-2 text-right font-bold w-1/6">Overall G/L</th>
                                <th className="pb-2 text-right font-bold w-1/6 pr-2">Day's G/L</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolioData.map((item, index) => (
                                <tr key={index} className="hover:bg-[#2a2e39] transition-colors cursor-pointer group border-b border-transparent hover:border-[#2a2e39]">
                                    <td className="py-3 pl-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-[#d1d4dc] font-bold text-xs">{item.type} ({item.percentage}%)</span>
                                        </div>
                                    </td>
                                    <td className="py-3 text-right text-[#d1d4dc] font-bold text-xs">₹{item.invested}</td>
                                    <td className="py-3 text-right text-[#d1d4dc] font-bold text-xs">₹{item.current}</td>
                                    <td className="py-3 text-right">
                                        <div className={`${item.overallGL.startsWith('-') ? 'text-red-500' : 'text-green-500'} font-bold text-xs`}>
                                            {item.overallGL.startsWith('-') ? '' : item.overallGL !== '0' ? '+' : ''}₹{item.overallGL}
                                        </div>
                                        <div className="text-[10px] text-[#868993]">{item.overallGLPercent}</div>
                                    </td>
                                    <td className="py-3 text-right pr-2">
                                        <div className="flex items-center justify-end gap-1">
                                            <div className="text-right">
                                                <div className={`${item.dayGL.startsWith('-') ? 'text-red-500' : 'text-green-500'} font-bold text-xs`}>
                                                    {item.dayGL.startsWith('-') ? '' : item.dayGL !== '0' ? '+' : ''}₹{item.dayGL}
                                                </div>
                                                <div className="text-[10px] text-[#868993]">{item.dayGLPercent}</div>
                                            </div>
                                            <ChevronRight size={14} className="text-[#868993] group-hover:text-white" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PortfolioBreakup;
