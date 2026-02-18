
import React from 'react';
import { Edit2, XCircle } from 'lucide-react';

const OpenOrders = ({ orders = [], onUpdate }) => {

    if (orders.length === 0) {
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

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleCancel = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;

        try {
            const userInfo = localStorage.getItem("userInfo");
            const user = userInfo ? JSON.parse(userInfo) : null;
            const userId = user ? user._id : null;

            const response = await fetch(`${API_URL}/api/order/cancel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, userId })
            });
            const data = await response.json();
            if (data.success) {
                alert("Order Cancelled");
                if (onUpdate) onUpdate();
            } else {
                alert(data.message || "Failed to cancel order");
            }
        } catch (error) {
            console.error("Cancel Error:", error);
            alert("Network error");
        }
    };

    const handleModify = async (order) => {
        const newPrice = window.prompt("Enter new price:", order.price);
        if (newPrice === null) return; // Cancelled

        const newQty = window.prompt("Enter new quantity:", order.qty.split('/')[1]); // Extract total qty
        if (newQty === null) return;

        try {
            const userInfo = localStorage.getItem("userInfo");
            const user = userInfo ? JSON.parse(userInfo) : null;
            const userId = user ? user._id : null;

            const response = await fetch(`${API_URL}/api/order/modify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: order.originalOrder._id,
                    userId,
                    price: parseFloat(newPrice),
                    quantity: parseInt(newQty)
                })
            });
            const data = await response.json();
            if (data.success) {
                alert("Order Modified");
                if (onUpdate) onUpdate();
            } else {
                alert(data.message || "Failed to modify order");
            }
        } catch (error) {
            console.error("Modify Error:", error);
            alert("Network error");
        }
    };

    return (
        <div className="bg-[#1e2330] rounded-lg border border-[#2a2e39] overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
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
                        {orders.map((order, index) => (
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
                                    <div className="flex items-center justify-end gap-2"> {/* REMOVED OPACITY CLASSES */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleModify(order); }}
                                            className="p-1.5 hover:bg-[#3e4455] rounded text-blue-400 custom-tooltip"
                                            title="Modify Order"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleCancel(order.originalOrder._id); }}
                                            className="p-1.5 hover:bg-[#3e4455] rounded text-red-400 custom-tooltip"
                                            title="Cancel Order"
                                        >
                                            <XCircle size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
                {orders.map((order, index) => (
                    <div key={index} className="p-4 border-b border-[#2a2e39] last:border-0 bg-[#0b0e14]">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-2 items-center">
                                <span className={`text-[10px] font-bold ${order.type === 'BUY' ? 'text-[#5c6bc0] bg-[#5c6bc0]/10' : 'text-[#ef5350] bg-[#ef5350]/10'} px-2 py-0.5 rounded border ${order.type === 'BUY' ? 'border-[#5c6bc0]/20' : 'border-[#ef5350]/20'}`}>
                                    {order.type}
                                </span>
                                <span className="text-[#d1d4dc] font-bold text-sm">{order.instrument}</span>
                                <span className="text-[10px] text-[#868993] bg-[#2a2e39] px-1 rounded">{order.exchange}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Open' ? 'bg-blue-500' : 'bg-yellow-500'}`}></span>
                                <span className={`${order.statusColor} font-bold text-xs uppercase`}>{order.status}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                            <div className="flex gap-4">
                                <div>
                                    <div className="text-[10px] text-[#868993]">Qty</div>
                                    <div className="text-[#d1d4dc] text-xs font-bold">{order.qty}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-[#868993]">Price</div>
                                    <div className="text-[#d1d4dc] text-xs font-bold">₹{order.price}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-[#868993]">LTP</div>
                                    <div className="text-[#d1d4dc] text-xs font-bold">₹{order.ltp}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-[#868993]">Product</div>
                                <div className="text-[#d1d4dc] text-xs font-bold">{order.product}</div>
                            </div>
                        </div>

                        {/* Action Buttons for Mobile */}
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleModify(order); }}
                                className="flex-1 bg-[#2a2e39] text-blue-400 py-2 rounded text-xs font-bold border border-[#3e4455] flex items-center justify-center gap-2"
                            >
                                <Edit2 size={12} /> Modify
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleCancel(order.originalOrder._id); }}
                                className="flex-1 bg-[#2a2e39] text-red-400 py-2 rounded text-xs font-bold border border-[#3e4455] flex items-center justify-center gap-2"
                            >
                                <XCircle size={12} /> Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OpenOrders;
