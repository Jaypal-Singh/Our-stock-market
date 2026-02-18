import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OpenOrders from './components/OpenOrders';
import OrderHistory from './components/OrderHistory';

function Orders() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('Open Orders');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // State to force refresh
    const [refreshKey, setRefreshKey] = useState(0);

    // Handle Tab Switching from Navigation
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true); // Reset loading state on refetch
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

                const response = await fetch(`${API_URL}/api/order/history?userId=${userId}&v=${refreshKey}`); // Add refreshKey to URL to bypass cache/ensure fetch
                const data = await response.json();

                if (data.success) {
                    setOrders(data.data);
                } else {
                    setError(data.message || "Failed to fetch orders");
                }
            } catch (err) {
                console.error("Orders Fetch Error:", err);
                setError("Network error");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [location.key, location.state, refreshKey]); // Add refreshKey to dependency

    // Callback to refresh orders
    const handleUpdate = () => {
        setRefreshKey(prev => prev + 1);
    };

    // Filter orders
    // Open Orders: 'pending', 'open'
    const openOrders = orders.filter(
        order => order.orderstatus === 'pending' || order.orderstatus === 'open'
    ).map(order => ({
        time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: order.transactiontype,
        instrument: order.tradingsymbol,
        exchange: order.exchange || "NSE",
        product: order.producttype === "INTRADAY" ? "Intraday" : "Delivery",
        qty: `${order.filledShares || 0}/${order.quantity}`,
        price: (order.price || 0).toFixed(2),
        ltp: (order.price || 0).toFixed(2), // Mock LTP
        status: order.orderstatus,
        statusColor: "text-blue-400",
        originalOrder: order // Make sure original order is passed for ID access
    }));

    // History Orders: 'complete', 'rejected', 'cancelled'
    const historyOrders = orders.filter(
        order => ['complete', 'rejected', 'cancelled'].includes(order.orderstatus)
    );

    return (
        <div className="h-full flex flex-col bg-[#0b0e14] text-[#d1d4dc] font-sans">
            {/* Header / Tabs */}
            <div className="flex-none border-b border-[#2a2e39] px-6">
                <div className="flex gap-6">
                    {['Open Orders', 'Order History'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab
                                ? 'border-[#5c6bc0] text-[#5c6bc0]'
                                : 'border-transparent text-[#868993] hover:text-[#d1d4dc]'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 customscrollbar">
                {loading ? (
                    <div className="text-center text-[#868993] py-8">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500 py-8">{error}</div>
                ) : (
                    <>
                        {activeTab === 'Open Orders' && <OpenOrders orders={openOrders} onUpdate={handleUpdate} />}
                        {activeTab === 'Order History' && <OrderHistory orders={historyOrders} />}
                    </>
                )}
            </div>
        </div>
    );
}

export default Orders;
