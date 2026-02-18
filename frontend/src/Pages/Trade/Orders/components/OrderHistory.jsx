
import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                // Get User ID from localStorage
                const userInfo = localStorage.getItem("userInfo");
                const user = userInfo ? JSON.parse(userInfo) : null;
                const userId = user ? user._id : null;

                if (!userId) {
                    setError("User not logged in");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${API_URL}/api/order/history?userId=${userId}`);
                const data = await response.json();

                if (data.success) {
                    // Start formatting orders
                    const formattedOrders = data.data.map(order => ({
                        time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        type: order.transactiontype,
                        instrument: order.tradingsymbol,
                        product: order.producttype === "INTRADAY" ? "Intraday" : "Delivery",
                        qty: `${order.filledShares || 0}/${order.quantity}`,
                        avgPrice: (order.averagePrice || order.price || 0).toFixed(2),
                        status: order.orderstatus || "Pending", // Fallback status
                        statusColor: (order.orderstatus === "complete" || order.orderstatus === "success")
                            ? "text-green-500"
                            : (order.orderstatus === "rejected" || order.orderstatus === "failure")
                                ? "text-red-500"
                                : "text-yellow-500",
                        originalOrder: order // Keep original data if needed
                    }));
                    setHistory(formattedOrders);
                } else {
                    setError(data.message || "Failed to fetch orders");
                }
            } catch (err) {
                console.error("Order History Error:", err);
                setError("Network error");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    if (loading) return <div className="text-center text-[#868993] py-8">Loading order history...</div>;
    if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

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
                            <th className="py-3 text-right font-bold">Avg. Price</th>
                            <th className="py-3 text-right font-bold pr-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.length > 0 ? (
                            history.map((order, index) => (
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-[#868993] py-8">No order history found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
                {history.length > 0 ? (
                    history.map((order, index) => (
                        <div key={index} className="p-4 border-b border-[#2a2e39] last:border-0 bg-[#0b0e14]">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex gap-2 items-center">
                                    <span className={`text-[10px] font-bold ${order.type === 'BUY' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'} px-2 py-0.5 rounded border ${order.type === 'BUY' ? 'border-green-500/20' : 'border-red-500/20'}`}>
                                        {order.type}
                                    </span>
                                    <span className="text-[#d1d4dc] font-bold text-sm">{order.instrument}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className={`${order.statusColor} font-bold text-xs uppercase`}>{order.status}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xs">
                                <div className="text-[#868993]">{order.time}</div>
                                <div className="flex gap-4">
                                    <div>
                                        <span className="text-[#868993] mr-1">Qty:</span>
                                        <span className="text-[#d1d4dc] font-bold">{order.qty}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#868993] mr-1">Avg:</span>
                                        <span className="text-[#d1d4dc] font-bold">₹{order.avgPrice}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-[#2a2e39] flex justify-between items-center">
                                <span className="text-[10px] text-[#868993] bg-[#2a2e39] px-2 py-0.5 rounded border border-[#3e4455]">{order.product}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-[#868993] py-8">No order history found</div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
