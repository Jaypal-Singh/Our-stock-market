import React, { useState, useEffect } from 'react';
import PositionsTable from './components/PositionsTable';

function Positions() {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchPositions = async () => {
            setLoading(true);
            try {
                const userInfo = localStorage.getItem("userInfo");
                const user = userInfo ? JSON.parse(userInfo) : null;
                const userId = user ? user._id : null;

                if (!userId) {
                    setError("User not logged in");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${API_URL}/api/position/?userId=${userId}`);
                const data = await response.json();

                if (data.success) {
                    setPositions(data.data);
                } else {
                    setError(data.message || "Failed to fetch positions");
                }
            } catch (err) {
                console.error("Positions Fetch Error:", err);
                setError("Network error");
            } finally {
                setLoading(false);
            }
        };

        fetchPositions();
    }, []);

    // Calculate total P&L from positions
    const totalPnl = positions.reduce((sum, pos) => sum + (pos.realizedPnl || 0), 0);
    const totalInvestment = positions.reduce((sum, pos) => sum + (pos.buyValue || 0), 0);
    const totalPnlPercent = totalInvestment > 0 ? (totalPnl / totalInvestment) * 100 : 0;
    const isPnlPositive = totalPnl >= 0;

    return (
        <div className="h-full flex flex-col bg-[#0b0e14] text-[#d1d4dc] font-sans">
            {/* Top Summary Banner */}
            <div className="flex-none p-4 border-b border-[#2a2e39] bg-[#14161f]">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <div className="flex justify-between md:block">
                        <div className="text-[#868993] text-[10px] font-bold uppercase mb-1">Total P&L</div>
                        <div className={`${isPnlPositive ? 'text-green-500' : 'text-red-500'} text-xl font-bold flex items-center gap-2`}>
                            {isPnlPositive ? '+' : ''}₹{totalPnl.toFixed(2)}
                            <span className={`text-xs font-medium ${isPnlPositive ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} px-1.5 py-0.5 rounded border`}>
                                {isPnlPositive ? '+' : ''}{totalPnlPercent.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                    <div className="hidden md:block h-8 w-px bg-[#2a2e39]"></div>
                    <div className="flex justify-between md:block pt-3 md:pt-0 border-t border-[#2a2e39] md:border-t-0">
                        <div className="text-[#868993] text-[10px] font-bold uppercase mb-1">Open Positions</div>
                        <div className="text-[#5c6bc0] text-xl font-bold">
                            {positions.filter(p => p.netQty > 0).length}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 customscrollbar">
                {loading ? (
                    <div className="text-center text-[#868993] py-8">Loading positions...</div>
                ) : error ? (
                    <div className="text-center text-red-500 py-8">{error}</div>
                ) : (
                    <PositionsTable positions={positions} />
                )}
            </div>
        </div>
    )
}

export default Positions;
