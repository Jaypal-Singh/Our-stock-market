import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Minus, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { placeOrder } from '../../../../services/angelOneService';

const MobileBuyOrder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const stock = location.state?.stock || {
        name: "COALINDIA",
        exchange: "NSE",
        fullName: "COAL INDIA LTD",
        price: "408.95",
        change: "-10.20",
        percent: "-2.43",
        isUp: false,
        token: "12345", // Dummy token if not passed
        symbol: "COALINDIA"
    };

    const [productType, setProductType] = useState('Delivery');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(stock.price);
    const [orderType, setOrderType] = useState('Market');
    const [isLoading, setIsLoading] = useState(false);

    // Update price when stock changes
    useEffect(() => {
        setPrice(stock.price);
    }, [stock.name]);

    // Update price when live price changes (only in active Market mode)
    useEffect(() => {
        if (orderType === 'Market') {
            setPrice(stock.price);
        }
    }, [stock.price, orderType]);

    const handleQuantityChange = (increment) => {
        setQuantity(prev => Math.max(1, prev + increment));
    };

    const handlePriceChange = (increment) => {
        setPrice(prev => {
            const newPrice = parseFloat(prev) + increment;
            return newPrice.toFixed(2);
        });
    };

    const handleBuy = async () => {
        try {
            if (quantity <= 0) {
                alert("Please enter a valid quantity");
                return;
            }

            setIsLoading(true);

            // Get User ID from localStorage
            const userInfo = localStorage.getItem("userInfo");
            const user = userInfo ? JSON.parse(userInfo) : null;
            const userId = user ? user._id : "unknown_user";

            const orderData = {
                variety: "NORMAL",
                tradingsymbol: stock.symbol || stock.name,
                symboltoken: stock.token,
                transactiontype: "BUY",
                exchange: stock.exchange || "NSE",
                ordertype: orderType === 'Market' ? "MARKET" : "LIMIT",
                producttype: productType === "Intraday" ? "INTRADAY" : "DELIVERY",
                duration: "DAY",
                price: orderType === 'Market' ? 0 : price,
                quantity: quantity,
                userId: userId
            };

            const response = await placeOrder(orderData);

            if (response.success) {
                // alert(`Buy Order Placed! ID: ${response.data.angelOrderId}`);
                // Navigate to Orders page with smart tab selection
                const targetTab = orderType === 'Market' ? 'Order History' : 'Open Orders';
                navigate('/trade/orders', { state: { activeTab: targetTab, refresh: Date.now() } });
            } else {
                alert(`Order Failed: ${response.message || 'Unknown error'}`);
            }

        } catch (error) {
            console.error("Order Execution Error:", error);
            alert("Failed to place order");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#0b0e14] text-[#d1d4dc] font-sans overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#2a2e39] bg-[#14161f]">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="text-[#d1d4dc]">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-white text-lg font-bold uppercase">{stock.name}</h1>
                        <div className="text-[10px] font-bold flex items-center gap-1">
                            <span className="text-[#868993]">{stock.exchange}</span>
                            <span className="text-[#d1d4dc]">•</span>
                            <span className="text-white">₹{stock.price}</span>
                            <span className={stock.isUp ? 'text-[#089981]' : 'text-[#f23645]'}>{stock.percent}%</span>
                        </div>
                    </div>
                </div>
                <button className="text-[#d1d4dc]">
                    <Settings size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto customscrollbar p-4">
                {/* Product Type Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setProductType('Delivery')}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide border rounded transition-colors ${productType === 'Delivery'
                            ? 'border-[#5c6bc0] bg-[#5c6bc0]/10 text-[#5c6bc0]'
                            : 'border-[#2a2e39] text-[#868993] bg-[#1e2330]'
                            }`}
                    >
                        Delivery
                    </button>
                    <button
                        onClick={() => setProductType('Intraday')}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide border rounded transition-colors ${productType === 'Intraday'
                            ? 'border-[#5c6bc0] bg-[#5c6bc0]/10 text-[#5c6bc0]'
                            : 'border-[#2a2e39] text-[#868993] bg-[#1e2330]'
                            }`}
                    >
                        Intraday
                    </button>
                </div>

                {/* Quantity Input */}
                <div className="mb-6 bg-[#1e2330] p-4 rounded-lg border border-[#2a2e39]">
                    <label className="text-[10px] font-bold text-[#868993] uppercase mb-4 block">No. of Shares</label>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="w-10 h-10 rounded-full border border-[#2a2e39] flex items-center justify-center text-[#d1d4dc] hover:bg-[#2a2e39] transition-colors"
                        >
                            <Minus size={18} />
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="bg-transparent text-center text-2xl font-bold text-white w-full outline-none"
                        />
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="w-10 h-10 rounded-full border border-[#2a2e39] flex items-center justify-center text-[#d1d4dc] hover:bg-[#2a2e39] transition-colors"
                        >
                            <Plus size={18} />
                        </button>
                    </div>
                </div>

                {/* Price Input */}
                <div className="mb-6 bg-[#1e2330] p-4 rounded-lg border border-[#2a2e39]">
                    <label className="text-[10px] font-bold text-[#868993] uppercase mb-4 block">Enter Price</label>
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => handlePriceChange(-0.05)}
                            className="w-10 h-10 rounded-full border border-[#2a2e39] flex items-center justify-center text-[#d1d4dc] hover:bg-[#2a2e39] transition-colors"
                        >
                            <Minus size={18} />
                        </button>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            disabled={orderType === 'Market'} // Disable if Market order
                            className={`bg-transparent text-center text-2xl font-bold text-white w-full outline-none ${orderType === 'Market' ? 'opacity-50' : ''}`}
                        />
                        <button
                            onClick={() => handlePriceChange(0.05)}
                            className="w-10 h-10 rounded-full border border-[#2a2e39] flex items-center justify-center text-[#d1d4dc] hover:bg-[#2a2e39] transition-colors"
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#2a2e39] pt-4">
                        <span className="text-xs font-bold text-[#d1d4dc]">Place order at</span>
                        <div className="flex bg-[#0b0e14] rounded-full p-1 border border-[#2a2e39]">
                            <button
                                onClick={() => { setOrderType('Market'); setPrice(stock.price); }} // Reset to Market/Current Price
                                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-colors ${orderType === 'Market'
                                    ? 'bg-[#2a2e39] text-white shadow-sm'
                                    : 'text-[#868993] hover:text-[#d1d4dc]'
                                    }`}
                            >
                                Market
                            </button>
                            <button
                                onClick={() => setOrderType('Limit')}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-colors ${orderType === 'Limit'
                                    ? 'bg-[#5c6bc0] text-white shadow-sm'
                                    : 'text-[#868993] hover:text-[#d1d4dc]'
                                    }`}
                            >
                                Limit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#14161f] border-t border-[#2a2e39]">
                <div className="flex justify-between items-center mb-4 text-xs font-medium">
                    <span className="text-[#868993]">Margin Required (Approx)</span>
                    <span className="text-[#868993]">Available Margin</span>
                </div>
                <div className="flex justify-between items-center mb-4 font-bold">
                    <span className="text-white text-sm">₹{(price * quantity).toFixed(2)} <span className="text-[#5c6bc0] text-xs">+ Charges</span></span>
                    <span className="text-white text-sm">₹0.00</span>
                </div>
                <button
                    onClick={handleBuy}
                    disabled={isLoading}
                    className={`w-full bg-[#089981] hover:bg-[#067a67] text-white py-3.5 rounded text-sm font-bold uppercase tracking-wide transition-colors shadow-lg shadow-[#089981]/20 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isLoading ? 'Placing Order...' : 'Buy'}
                </button>
            </div>
        </div>
    );
};

export default MobileBuyOrder;
