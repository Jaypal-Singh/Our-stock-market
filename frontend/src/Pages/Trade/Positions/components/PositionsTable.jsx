
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const PositionsTable = ({ positions = [] }) => {
    // Format positions for display
    const formattedPositions = positions.map(pos => {
        const pnl = pos.realizedPnl || 0;
        const investment = pos.buyValue || 0;
        const pnlPercent = investment > 0 ? (pnl / investment) * 100 : 0;
        const isProfit = pnl >= 0;

        return {
            instrument: pos.tradingsymbol,
            exchange: pos.exchange || 'NSE',
            type: pos.transactiontype || 'BUY',
            product: pos.producttype === 'INTRADAY' ? 'Intraday' : 'Delivery',
            qty: pos.netQty || 0,
            buyQty: pos.buyQty || 0,
            sellQty: pos.sellQty || 0,
            avgPrice: (pos.avgPrice || 0).toFixed(2),
            ltp: (pos.avgPrice || 0).toFixed(2), // Using avg price as LTP placeholder until live data
            pnl: `${isProfit ? '+' : ''}₹${pnl.toFixed(2)}`,
            pnlPercent: `${isProfit ? '+' : ''}${pnlPercent.toFixed(2)}%`,
            isProfit,
            rawPnl: pnl
        };
    });

    return (
        <div className="bg-[#1e2330] rounded-lg border border-[#2a2e39] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-[#2a2e39]">
                <div className="flex items-center gap-2">
                    <h2 className="text-white text-sm font-bold">Open Positions</h2>
                    <span className="bg-[#2a2e39] text-[#5c6bc0] text-[10px] font-bold px-1.5 py-0.5 rounded">{formattedPositions.length}</span>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[#868993] text-[10px] uppercase border-b border-[#2a2e39] bg-[#1a1d26]">
                            <th className="py-3 pl-4 font-bold">Instrument</th>
                            <th className="py-3 font-bold">Product</th>
                            <th className="py-3 text-right font-bold w-24">Qty.</th>
                            <th className="py-3 text-right font-bold">Avg. Price</th>
                            <th className="py-3 text-right font-bold">LTP</th>
                            <th className="py-3 text-right font-bold pr-4">P&L</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formattedPositions.length > 0 ? (
                            formattedPositions.map((pos, index) => (
                                <tr key={index} className="hover:bg-[#2a2e39] transition-colors cursor-pointer border-b border-[#2a2e39] last:border-0 group">
                                    <td className="py-4 pl-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[10px] font-bold px-1 rounded ${pos.type === 'BUY' ? 'text-blue-400 bg-blue-400/10' : 'text-red-400 bg-red-400/10'}`}>
                                                    {pos.type}
                                                </span>
                                                <span className="text-[#d1d4dc] font-bold text-xs">{pos.instrument}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-[#868993] font-medium">{pos.exchange}</span>
                                                {pos.buyQty > 0 && pos.sellQty > 0 && (
                                                    <span className="text-[10px] text-[#868993]">B:{pos.buyQty} S:{pos.sellQty}</span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="text-[#d1d4dc] text-xs bg-[#2a2e39] px-2 py-1 rounded border border-[#3e4455]">{pos.product}</span>
                                    </td>
                                    <td className="py-4 text-right text-[#d1d4dc] text-xs font-bold">{pos.qty}</td>
                                    <td className="py-4 text-right text-[#d1d4dc] text-xs font-bold">₹{pos.avgPrice}</td>
                                    <td className="py-4 text-right">
                                        <div className="text-[#d1d4dc] font-bold text-xs">₹{pos.ltp}</div>
                                    </td>
                                    <td className="py-4 text-right pr-4">
                                        <div className={`font-bold text-sm ${pos.isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                            {pos.pnl}
                                        </div>
                                        <div className="text-[10px] text-[#868993] flex justify-end items-center gap-1">
                                            {pos.pnlPercent}
                                            {pos.isProfit ? <ArrowUpRight size={12} className="text-green-500" /> : <ArrowDownRight size={12} className="text-red-500" />}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-[#868993] py-8">No positions found. Place orders to see positions here.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
                {formattedPositions.length > 0 ? (
                    formattedPositions.map((pos, index) => (
                        <div key={index} className="p-4 border-b border-[#2a2e39] last:border-0 bg-[#0b0e14]">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex gap-2 items-center">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${pos.type === 'BUY' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' : 'text-red-400 bg-red-400/10 border-red-400/20'}`}>
                                        {pos.type}
                                    </span>
                                    <span className="text-[#d1d4dc] font-bold text-sm">{pos.instrument}</span>
                                    <span className="text-[10px] text-[#868993] bg-[#2a2e39] px-1 rounded">{pos.exchange}</span>
                                </div>
                                <div className={`font-bold text-sm ${pos.isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                    {pos.pnl}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-3">
                                <div className="flex gap-4">
                                    <div>
                                        <div className="text-[10px] text-[#868993]">Qty</div>
                                        <div className="text-[#d1d4dc] text-xs font-bold">{pos.qty}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#868993]">Avg</div>
                                        <div className="text-[#d1d4dc] text-xs font-bold">₹{pos.avgPrice}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-[#868993]">LTP</div>
                                        <div className="text-[#d1d4dc] text-xs font-bold">₹{pos.ltp}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-[#d1d4dc] bg-[#2a2e39] px-2 py-1 rounded border border-[#3e4455]">{pos.product}</span>
                                </div>
                            </div>

                            {/* Action Buttons for Mobile */}
                            <div className="flex gap-2">
                                <button className="flex-1 bg-[#2a2e39] text-red-500 py-2 rounded text-xs font-bold border border-[#3e4455] hover:bg-red-500/10 transition-colors">
                                    EXIT
                                </button>
                                <button className="flex-1 bg-[#2962ff] text-white py-2 rounded text-xs font-bold hover:bg-[#1e4bd1] transition-colors">
                                    ADD MORE
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-[#868993] py-8">No positions found</div>
                )}
            </div>

            {/* Footer Summary */}
            {formattedPositions.length > 0 && (
                <div className="px-4 py-3 bg-[#1a1d26] border-t border-[#2a2e39] flex justify-between items-center">
                    <span className="text-[#868993] text-xs font-medium">Total Positions</span>
                    <span className="text-[#d1d4dc] text-sm font-bold">{formattedPositions.length}</span>
                </div>
            )}
        </div>
    );
};

export default PositionsTable;
