import React, { useState } from 'react';
import OpenOrders from './components/OpenOrders';
import OrderHistory from './components/OrderHistory';

function Orders() {
    const [activeTab, setActiveTab] = useState('Open Orders');

    return (
        <div className="h-full flex flex-col bg-[#0b1020] text-[#d1d4dc] font-sans">
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
                {activeTab === 'Open Orders' && <OpenOrders orders={[]} />}
                {activeTab === 'Order History' && <OrderHistory />}
            </div>
        </div>
    );
}

export default Orders;
