
import React from 'react';

const OrderHistory = () => {
    // Dummy Data
    const history = [
        {
            time: "10:23:45",
            type: "BUY",
            instrument: "RELIANCE",
            product: "Delivery",
            qty: "10/10",
            avgPrice: "2450.00",
            status: "Executed",
            statusColor: "text-green-500"
        },
        {
            time: "09:15:00",
            type: "SELL",
            instrument: "TCS",
            product: "Intraday",
            qty: "5/5",
            avgPrice: "3200.50",
            status: "Executed",
            statusColor: "text-green-500"
        },
        {
            time: "14:30:20",
            type: "BUY",
            instrument: "INFY",
            product: "Delivery",
            qty: "0/50",
            avgPrice: "1400.00",
            status: "Rejected",
            statusColor: "text-red-500"
        }
    ];

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
                            <th className="py-3 text-right font-bold">Avg. Price</th>
                            <th className="py-3 text-right font-bold pr-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((order, index) => (
                            <tr key={index} className="hover:bg-[#2a2e39] transition-colors cursor-pointer border-b border-[#2a2e39] last:border-0 text-xs">
                                <td className="py-3 pl-4 text-[#d1d4dc]">{order.time}</td>
                                <td className="py-3">
                                    <span className={`font-bold ${order.type === 'BUY' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'} px-2 py-1 rounded-[4px]`}>
                                        {order.type}
                                    </span>
                                </td>
                                <td className="py-3 text-[#d1d4dc] font-bold">{order.instrument}</td>
                                <td className="py-3 text-[#d1d4dc]">{order.product}</td>
                                <td className="py-3 text-right text-[#d1d4dc]">{order.qty}</td>
                                <td className="py-3 text-right text-[#d1d4dc]">₹{order.avgPrice}</td>
                                <td className="py-3 text-right pr-4">
                                    <span className={`${order.statusColor} font-bold`}>{order.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderHistory;
