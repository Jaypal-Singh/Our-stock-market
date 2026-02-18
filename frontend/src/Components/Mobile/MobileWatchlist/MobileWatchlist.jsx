import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyWatchlist from '../../Common/EmptyWatchlist';

const MobileWatchlist = ({ stocks = [], isConnected = false, error = null, onAddClick }) => {
    const navigate = useNavigate();

    console.log('MobileWatchlist render:', { stocks, isConnected, error });

    return (
        <div className="md:hidden bg-[#0b0e14] pb-20 font-sans">
            {/* Connection Status */}
            {isConnected && !error && (
                <div className="px-4 py-2 bg-[#089981]/10 border-b border-[#089981]/20 flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#089981] rounded-full animate-pulse"></div>
                    <span className="text-xs text-[#089981]">● LIVE - Market data streaming</span>
                </div>
            )}
            {error && (
                <div className="px-4 py-2 bg-[#f23645]/10 border-b border-[#f23645]/20">
                    <span className="text-xs text-[#f23645]">⚠️ {error}</span>
                </div>
            )}
            {!isConnected && !error && (
                <div className="px-4 py-2 bg-[#868993]/10 border-b border-[#868993]/20">
                    <span className="text-xs text-[#868993]">🔄 Connecting to market data...</span>
                </div>
            )}

            {Array.isArray(stocks) && stocks.length > 0 ? (
                stocks.map((stock, index) => {
                    if (!stock || typeof stock !== 'object') return null;

                    const hasLiveData = stock.lastUpdated || (stock.price && stock.price !== 0 && stock.price !== "0");
                    const isUp = (stock.changePercent || 0) >= 0;

                    // Safe Parse Helpers
                    const safeFloat = (val) => {
                        const num = parseFloat(val);
                        return isNaN(num) ? 0 : num;
                    };

                    const price = safeFloat(stock.price || stock.ltp || 0);
                    const change = safeFloat(stock.change || 0);
                    const changePercent = safeFloat(stock.changePercent || 0);
                    const exchangeType = stock.exch_seg || 'NSE';

                    return (
                        <div
                            key={stock.token || stock.symbol || index}
                            onClick={() => navigate('/trade/stock-details', { state: { stock } })}
                            className={`flex justify-between items-center px-4 py-3 border-b border-[#2a2e39] last:border-0 hover:bg-[#1e222d] transition-colors cursor-pointer ${!hasLiveData ? 'opacity-50' : ''}`}
                        >
                            <div className="flex flex-col">
                                <span className="font-semibold text-[#d1d4dc] text-sm flex items-center gap-2">
                                    {stock.name || 'Unknown'}
                                    {stock.instrumenttype === 'FUTSTK' && (
                                        <span className="text-[8px] px-1.5 py-0.5 bg-[#f7931a]/20 text-[#f7931a] rounded">FUT</span>
                                    )}
                                </span>
                                <span className="text-[10px] text-[#868993] mt-0.5">
                                    {stock.symbol || stock.name} • {exchangeType}
                                </span>
                            </div>
                            <div className="text-right">
                                {hasLiveData ? (
                                    <>
                                        <div className={`font-semibold text-sm ${isUp ? 'text-[#089981]' : 'text-[#f23645]'} flex items-center gap-1 justify-end`}>
                                            <span>{price.toFixed(2)} {isUp ? "▲" : "▼"}</span>
                                            {stock.lastUpdated && (
                                                <span className="w-1.5 h-1.5 bg-[#089981] rounded-full animate-pulse"></span>
                                            )}
                                        </div>
                                        <div className="text-[10px] text-[#868993] mt-0.5">
                                            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="font-semibold text-sm text-[#868993]">
                                            --
                                        </div>
                                        <div className="text-[10px] text-[#868993] mt-0.5">
                                            No data
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <EmptyWatchlist onAddClick={onAddClick} />
            )}
        </div>
    );
};

export default MobileWatchlist;
