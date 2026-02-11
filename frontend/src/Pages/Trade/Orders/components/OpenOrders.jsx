
import React from 'react';
import { Edit2, XCircle } from 'lucide-react';

const OpenOrders = ({ orders = [] }) => {
    // Dummy Data for visualization if no props passed (or just to override empty state for dev)
    const dummyOrders = [
        {
            time: "10:23:45",
            type: "BUY",
            instrument: "RELIANCE",
            exchange: "NSE",
            product: "Delivery",
            qty: "10",
            price: "2450.00",
            ltp: "2448.50",
            status: "Open",
            statusColor: "text-blue-400"
        },
        {
            time: "11:15:00",
            type: "SELL",
            instrument: "TCS",
            exchange: "BSE",
            product: "Intraday",
            qty: "5",
            price: "3200.50",
            ltp: "3198.00",
            status: "Pending",
            statusColor: "text-yellow-400"
        },
    ];

    const displayOrders = orders.length > 0 ? orders : dummyOrders;

    if (displayOrders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="bg-[#1e2330] p-6 rounded-full mb-6">
                    {/* Placeholder for the illustration in the screenshot */}
                    <div className="w-24 h-20 bg-[#2a2e39] rounded-lg flex items-center justify-center relative">
                        <div className="w-16 h-12 bg-white rounded flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-2 -right-2 text-blue-500">
                            <span className="text-xl">✈️</span>
                        </div>
                    </div>
                </div>

                <h3 className="text-white text-lg font-bold mb-2">You don't have any open orders</h3>
                <p className="text-[#868993] text-sm mb-6">Check Angel One's Recommendations</p>

                <button className="bg-[#5c6bc0] hover:bg-[#4a5699] text-white text-xs font-bold py-3 px-6 rounded uppercase tracking-wide transition-colors">
                    View Trading Ideas
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#1e2330] rounded-lg border border-[#2a2e39] overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[#868993] text-[10px] uppercase border-b border-[#2a2e39] bg-[#1a1d26]">
                            <th className="py-3 pl-4 font-bold">Time</th>
                            <th className="py-3 font-bold">Type</th>
                            <th className="py-3 font-bold">Instrument</th>
                            <th className="py-3 font-bold">Product</th>
                            <th className="py-3 text-right font-bold w-24">Qty.</th>
                            <th className="py-3 text-right font-bold">LTP</th>
                            <th className="py-3 text-right font-bold">Price</th>
                            <th className="py-3 text-right font-bold">Status</th>
                            <th className="py-3 text-right font-bold pr-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayOrders.map((order, index) => (
                            <tr key={index} className="hover:bg-[#2a2e39] transition-colors cursor-pointer border-b border-[#2a2e39] last:border-0 group">
                                <td className="py-4 pl-4 text-[#d1d4dc] text-xs font-medium">{order.time}</td>
                                <td className="py-4">
                                    <span className={`text-[10px] font-bold ${order.type === 'BUY' ? 'text-[#5c6bc0] bg-[#5c6bc0]/10' : 'text-[#ef5350] bg-[#ef5350]/10'} px-2 py-1 rounded-[4px] border ${order.type === 'BUY' ? 'border-[#5c6bc0]/20' : 'border-[#ef5350]/20'}`}>
                                        {order.type}
                                    </span>
                                </td>
                                <td className="py-4">
                                    <div className="flex flex-col">
                                        <span className="text-[#d1d4dc] font-bold text-xs">{order.instrument}</span>
                                        <span className="text-[10px] text-[#868993] font-medium">{order.exchange}</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <span className="text-[#d1d4dc] text-xs bg-[#2a2e39] px-2 py-1 rounded border border-[#3e4455]">{order.product}</span>
                                </td>
                                <td className="py-4 text-right text-[#d1d4dc] text-xs font-bold">{order.qty}</td>
                                <td className="py-4 text-right">
                                    <div className="text-[#d1d4dc] font-bold text-xs">₹{order.ltp}</div>
                                </td>
                                <td className="py-4 text-right text-[#d1d4dc] text-xs font-bold">₹{order.price}</td>
                                <td className="py-4 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Open' ? 'bg-blue-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                                        <span className={`${order.statusColor} font-bold text-xs uppercase`}>{order.status}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-right pr-4">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 hover:bg-[#3e4455] rounded text-blue-400 custom-tooltip" title="Modify Order">
                                            <Edit2 size={14} />
                                        </button>
                                        <button className="p-1.5 hover:bg-[#3e4455] rounded text-red-400 custom-tooltip" title="Cancel Order">
                                            <XCircle size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OpenOrders;
