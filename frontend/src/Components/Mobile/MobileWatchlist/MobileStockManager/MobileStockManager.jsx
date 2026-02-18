import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, GripVertical } from 'lucide-react';
import axios from 'axios';

const MobileStockManager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { stocks = [], watchlistName = '' } = location.state || {};

    const [selectedIds, setSelectedIds] = useState(new Set());
    const [stockList, setStockList] = useState(stocks);
    const [isDeleting, setIsDeleting] = useState(false);

    const getAuthConfig = () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo?.token) return null;
            return { headers: { Authorization: `Bearer ${userInfo.token}` } };
        } catch { return null; }
    };

    const allSelected = stockList.length > 0 && selectedIds.size === stockList.length;

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(stockList.map(s => s._id)));
        }
    };

    const toggleStock = (id) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleDelete = async () => {
        if (selectedIds.size === 0) return;
        setIsDeleting(true);

        try {
            const config = getAuthConfig();
            if (!config) return;

            const deletePromises = Array.from(selectedIds).map(stockId =>
                axios.delete(
                    `http://localhost:5000/api/watchlist/removeFromWatchlist/${stockId}?watchlistName=${watchlistName}`,
                    config
                )
            );

            await Promise.all(deletePromises);

            setStockList(prev => prev.filter(s => !selectedIds.has(s._id)));
            setSelectedIds(new Set());
        } catch (error) {
            console.error("Error removing stocks", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#0b0e14]">
            {/* Header */}
            <div className="flex items-center px-4 py-3 border-b border-[#2a2e39]">
                <button
                    onClick={() => navigate(-1)}
                    className="p-1 mr-2"
                >
                    <ArrowLeft size={22} className="text-[#d1d4dc]" />
                </button>
                <span className="text-[#d1d4dc] text-sm font-semibold">Manage Stocks</span>
            </div>

            {/* Select All */}
            <div
                onClick={toggleSelectAll}
                className="flex items-center px-4 py-4 border-b border-[#2a2e39] cursor-pointer active:bg-[#1e222d]"
            >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-4 transition-colors ${allSelected
                    ? 'bg-[#2962ff] border-[#2962ff]'
                    : 'border-[#868993] bg-transparent'
                    }`}>
                    {allSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>
                <span className="text-[#d1d4dc] text-sm font-medium">Select All Stocks</span>
            </div>

            {/* Stock List */}
            <div className="flex-1 overflow-y-auto customscrollbar">
                {stockList.map((stock) => {
                    const isSelected = selectedIds.has(stock._id);
                    return (
                        <div
                            key={stock._id || stock.token}
                            onClick={() => toggleStock(stock._id)}
                            className="flex items-center px-4 py-4 border-b border-[#1e222d] cursor-pointer active:bg-[#1e222d] transition-colors"
                        >
                            {/* Checkbox */}
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-4 shrink-0 transition-colors ${isSelected
                                ? 'bg-[#2962ff] border-[#2962ff]'
                                : 'border-[#868993] bg-transparent'
                                }`}>
                                {isSelected && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>

                            {/* Stock Info */}
                            <div className="flex-1 min-w-0">
                                <div className="text-[#d1d4dc] font-semibold text-sm">
                                    {stock.symbol || stock.name}
                                </div>
                                <div className="text-[#868993] text-xs mt-0.5 truncate">
                                    {stock.name || stock.symbol}
                                </div>
                            </div>

                            {/* Drag Handle */}
                            <div className="shrink-0 ml-3 text-[#868993]">
                                <GripVertical size={20} />
                            </div>
                        </div>
                    );
                })}

                {stockList.length === 0 && (
                    <div className="flex items-center justify-center h-40 text-[#868993] text-sm">
                        No stocks in this watchlist
                    </div>
                )}
            </div>

            {/* Bottom Action Bar */}
            {selectedIds.size > 0 && (
                <div className="flex-none flex items-center justify-between px-4 py-3 bg-[#131722] border-t border-[#2a2e39]">
                    <div className="flex items-center gap-2">
                        <span className="text-[#d1d4dc] font-semibold text-sm">SELECTED STOCK</span>
                        <span className="bg-[#2962ff] text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            {selectedIds.size}
                        </span>
                    </div>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-[#f23645] hover:bg-[#d32f3f] text-white text-sm font-bold px-6 py-2 rounded transition-colors disabled:opacity-50"
                    >
                        {isDeleting ? 'DELETING...' : 'DELETE'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MobileStockManager;
