import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { X, Minus, RotateCcw, Briefcase, Settings } from "lucide-react";

/**
 * SellWindow Component
 * A movable window for placing sell orders.
 * 
 * Props:
 * - uid: string (Unique ID for this window instance)
 * - stockName: string (Name of the stock, e.g., "NHPC")
 * - stockPrice: number (Current price)
 * - stockChange: number (Price change)
 * - stockChangePercent: number (Percentage change)
 * - onClose: function (Callback to close the window)
 * - onSwitchToBuy: function (Callback to switch to Buy window)
 */
const SellWindow = ({ uid, stockName = "NHPC", stockSymbol, stockPrice = 75.47, stockChange = -1.03, stockChangePercent = -1.35, onClose, onSwitchToBuy }) => {
    const nodeRef = useRef(null);
    const [activeTab, setActiveTab] = useState("Regular");
    const [productType, setProductType] = useState("INT"); // INT or DEL
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(stockPrice); // Default to market price
    const [isMarket, setIsMarket] = useState(true); // Toggle between Limit and Market

    // Update price when stock changes
    useEffect(() => {
        setPrice(stockPrice);
    }, [stockName]);

    // Update price when live price changes (only in active Market mode)
    useEffect(() => {
        if (isMarket) {
            setPrice(stockPrice);
        }
    }, [stockPrice, isMarket]);

    // Calculations (mock)
    const marginRequired = (qty * price).toFixed(2);
    const charges = 0; // consistent with screenshot

    // Handle Sell Order
    // const { user } = useUser(); // Removed as per instruction

    const handleSell = async () => {
        try {
            if (qty <= 0) {
                alert("Please enter a valid quantity");
                return;
            }

            // Get User ID from localStorage
            const userInfo = localStorage.getItem("userInfo");
            const user = userInfo ? JSON.parse(userInfo) : null;
            const userId = user ? user._id : "unknown_user";

            const orderData = {
                variety: "NORMAL",
                tradingsymbol: stockSymbol || stockName + "-EQ", // Use passed symbol or fallback
                symboltoken: uid,
                transactiontype: "SELL",
                exchange: "NSE", // Defaulting to NSE
                ordertype: isMarket ? "MARKET" : "LIMIT",
                producttype: productType === "INT" ? "INTRADAY" : "DELIVERY",
                duration: "DAY",
                price: isMarket ? 0 : price,
                quantity: qty,
                userId: userId
            };

            console.log("Placing Sell Order:", orderData);

            // Import dynamically
            const { placeOrder } = await import("../../../services/angelOneService");

            const response = await placeOrder(orderData);

            if (response.success) {
                alert(`Sell Order Placed! ID: ${response.data.angelOrderId}`);
                onClose();
            } else {
                alert(`Order Failed: ${response.message}`);
            }

        } catch (error) {
            console.error("Order Execution Error:", error);
            alert("Failed to place order");
        }
    };

    return (
        <Draggable nodeRef={nodeRef} handle=".draggable-header">
            <div
                ref={nodeRef}
                className="fixed z-50 w-[500px] bg-slate-900 text-slate-200 rounded-lg shadow-2xl border border-slate-700 font-sans overflow-hidden"
                style={{ top: "20%", left: "30%" }}// Initial Position (slightly offset from BuyWindow)
            >
                {/* Header Section */}
                <div className="draggable-header cursor-move bg-red-900/40 p-3 border-b border-red-800/50 flex justify-between items-start">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-white tracking-wide">{stockName}</h2>
                            <span className="text-xs bg-slate-800 text-slate-400 px-1 rounded">NSE</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm mt-1">
                            <span className="font-semibold text-red-500">{stockPrice.toFixed(2)}</span>
                            <span className="text-red-400 text-xs">{stockChange.toFixed(2)} ({stockChangePercent.toFixed(2)}%)</span>
                            <input type="radio" name={`exchange-${uid}`} id={`nse-${uid}`} defaultChecked className="accent-red-500" />
                            <label htmlFor={`nse-${uid}`} className="text-xs text-slate-400">NSE</label>
                            <input type="radio" name={`exchange-${uid}`} id={`bse-${uid}`} className="accent-red-500" />
                            <label htmlFor={`bse-${uid}`} className="text-xs text-slate-400">BSE 75.50</label>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex bg-slate-800 rounded p-0.5">
                            <button onClick={onSwitchToBuy} className="px-3 py-0.5 text-slate-400 text-xs font-bold hover:text-white transition-colors">B</button>
                            <button className="px-3 py-0.5 bg-red-500 text-white text-xs font-bold rounded shadow-sm">S</button>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"><X size={16} /></button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-slate-700 bg-slate-900">
                    {["Regular"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 text-sm font-medium transition-colors relative ${activeTab === tab ? "text-red-400" : "text-slate-400 hover:text-slate-200"}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-t-full"></div>}
                        </button>
                    ))}
                </div>

                <div className="flex">
                    {/* Main Form Area */}
                    <div className="flex-1 p-5 bg-slate-900">

                        {/* Inputs Row */}
                        <div className="flex gap-6 mb-6">
                            {/* Product Type */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase">Product Type</label>
                                <div className="flex bg-slate-800 rounded p-1 w-fit">
                                    <button
                                        onClick={() => setProductType("INT")}
                                        className={`px-4 py-1.5 text-xs font-bold rounded transition-colors ${productType === "INT" ? "bg-red-900/60 text-red-400 border border-red-700/50" : "text-slate-400 hover:text-slate-200"}`}
                                    >
                                        INT
                                    </button>
                                    <button
                                        onClick={() => setProductType("DEL")}
                                        className={`px-4 py-1.5 text-xs font-bold rounded transition-colors ${productType === "DEL" ? "bg-red-900/60 text-red-400 border border-red-700/50" : "text-slate-400 hover:text-slate-200"}`}
                                    >
                                        DEL
                                    </button>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase">Quantity</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="w-24 bg-slate-800 text-white p-2 rounded border border-slate-700 focus:border-red-500 focus:outline-none text-right"
                                    />
                                </div>
                                <span className="text-[10px] text-slate-500">(Max Qty 0 Shares)</span>
                            </div>

                            {/* Price */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase">Price</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={price}
                                        disabled={isMarket}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        className={`w-28 bg-slate-800 text-white p-2 rounded border border-slate-700 focus:border-red-500 focus:outline-none text-right ${isMarket ? "opacity-50 cursor-not-allowed" : ""}`}
                                    />
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-slate-400">Limit</span>
                                    <div
                                        onClick={() => setIsMarket(!isMarket)}
                                        className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${isMarket ? "bg-red-500" : "bg-slate-600"}`}
                                    >
                                        <div className={`h-3 w-3 bg-white rounded-full shadow-md transform transition-transform ${isMarket ? "translate-x-4" : "translate-x-0"}`}></div>
                                    </div>
                                    <span className={`text-[10px] ${isMarket ? "text-red-400 font-bold" : "text-slate-400"}`}>Market</span>
                                </div>
                            </div>
                        </div>

                        {/* Additional Options */}
                        <div className="flex items-center gap-2 mt-4">
                            <button className="flex items-center justify-center h-4 w-4 rounded border border-slate-600 text-red-500 hover:border-red-500">
                                {/* Checkbox Icon */}
                            </button>
                            <span className="text-sm text-red-400 cursor-pointer hover:underline">Set Stop Loss / Target</span>
                            <Settings size={14} className="text-slate-500" />
                        </div>

                    </div>

                    {/* Sidebar Tools */}
                    <div className="w-12 bg-slate-950/50 border-l border-slate-800 flex flex-col items-center py-4 gap-4">
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Chart">
                            <Briefcase size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Depth">
                            <RotateCcw size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors" title="Settings">
                            <Settings size={18} />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-between items-center">
                    <div className="flex gap-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-blue-400 uppercase font-semibold">Available Margin</span>
                            <span className="text-sm font-bold text-white">₹ 0.00</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-blue-400 uppercase font-semibold">Charges</span>
                            <span className="text-sm font-bold text-white">₹ {charges}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSell}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded shadow-lg transition-all transform active:scale-95 uppercase tracking-wide text-sm"
                    >
                        Place Sell Order
                    </button>
                </div>

            </div>
        </Draggable>
    );
};

export default SellWindow;
