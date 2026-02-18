import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from './MobileHeader';
import MobileWatchlist from './MobileWatchlist';
import useAngelOneSocket from '../../../Hooks/useAngelOneSocket';
import CreateWatchlistModal from '../../Common/CreateWatchlistModal';
import axios from 'axios';

const MobileWatchlistPage = () => {
    const navigate = useNavigate();
    const { isConnected, error, addStock: socketAddStock } = useAngelOneSocket() || {}; // Use hook for socket/connection status

    const [watchlists, setWatchlists] = useState([]);
    const [activeWatchlist, setActiveWatchlist] = useState(null);
    const [activeStocks, setActiveStocks] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Helper: get auth config from stored userInfo
    const getAuthConfig = () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo?.token) return null;
            return { headers: { Authorization: `Bearer ${userInfo.token}` } };
        } catch { return null; }
    };

    // Fetch watchlists
    useEffect(() => {
        fetchWatchlists();
    }, []);

    const fetchWatchlists = async () => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const res = await axios.get('http://localhost:5000/api/watchlist/getAllWatchlists', config);
            setWatchlists(res.data);
            if (res.data.length > 0 && !activeWatchlist) {
                setActiveWatchlist(res.data[0]);
            }
        } catch (error) {
            console.error("Error fetching watchlists", error);
        }
    };

    // Fetch stocks for active watchlist
    useEffect(() => {
        if (activeWatchlist) {
            const name = activeWatchlist.name || activeWatchlist;
            if (typeof name === 'string') {
                fetchWatchlistStocks(name);
            }
        }
    }, [activeWatchlist]);

    const fetchWatchlistStocks = async (name) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const res = await axios.get(`http://localhost:5000/api/watchlist/${name}`, config);
            const instruments = res.data;

            if (instruments.length === 0) {
                setActiveStocks([]);
                return;
            }

            // Fetch live quotes for these instruments
            try {
                const { fetchStockQuotes } = await import('../../../services/angelOneService');
                const liveData = await fetchStockQuotes(instruments);

                // Merge live data into instruments
                const merged = instruments.map(inst => {
                    const live = liveData.find(l => l.token === inst.token);
                    if (live) {
                        return {
                            ...inst,
                            price: live.ltp || live.price || 0,
                            ltp: live.ltp || 0,
                            change: live.netChange || live.change || 0,
                            changePercent: live.percentChange || live.changePercent || 0,
                            open: live.open,
                            high: live.high,
                            low: live.low,
                            close: live.close,
                            lastUpdated: new Date().toISOString(),
                        };
                    }
                    return inst;
                });
                setActiveStocks(merged);
            } catch (quoteErr) {
                console.error("Error fetching live quotes, showing static data", quoteErr);
                setActiveStocks(instruments);
            }
        } catch (error) {
            console.error("Error fetching stocks", error);
        }
    };

    const handleCreateWatchlist = async (name) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const res = await axios.post('http://localhost:5000/api/watchlist/createWatchlist', { name }, config);
            await fetchWatchlists();
            // Set the newly created watchlist as active
            setActiveWatchlist(res.data);
        } catch (error) {
            console.error("Error creating watchlist", error);
        }
    };

    // Add stock to active watchlist via backend API
    const handleAddStock = async (stock) => {
        try {
            const config = getAuthConfig();
            if (!config) return;
            const watchlistName = activeWatchlist?.name || activeWatchlist;
            await axios.post('http://localhost:5000/api/watchlist/addToWatchlist', {
                stockId: stock._id,
                watchlistName: watchlistName,
            }, config);
            // Refresh the stock list after adding
            if (typeof watchlistName === 'string') {
                fetchWatchlistStocks(watchlistName);
            }
        } catch (error) {
            console.error("Error adding stock to watchlist", error);
        }
    };

    const handleBuy = (stock) => {
        navigate('/trade/buy-order', { state: { stock } });
    };

    const handleSell = (stock) => {
        navigate('/trade/sell-order', { state: { stock } });
    };

    const handleSelect = (stock) => {
        navigate('/trade/stock-details', { state: { stock } });
    };

    const handleWatchlistChange = (list) => {
        setActiveWatchlist(list);
    }

    const [forceSearchOpen, setForceSearchOpen] = useState(false);

    return (
        <div className="flex flex-col h-full bg-[#0b0e14]">
            <CreateWatchlistModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateWatchlist}
            />
            {/* Header - Fixed/Non-scrolling */}
            <div className="flex-none z-10">
                <MobileHeader
                    onAddStock={handleAddStock}
                    onBuy={handleBuy}
                    onSell={handleSell}
                    onSelectStock={handleSelect}
                    watchlists={watchlists}
                    activeWatchlist={activeWatchlist}
                    onWatchlistChange={handleWatchlistChange}
                    onAddWatchlist={() => setIsCreateModalOpen(true)}
                    forceSearchOpen={forceSearchOpen}
                    onForceSearchOpenHandled={() => setForceSearchOpen(false)}
                />
            </div>

            {/* List - Scrollable */}
            <div className="flex-1 overflow-y-auto customscrollbar pb-20">
                <MobileWatchlist
                    stocks={activeStocks}
                    isConnected={isConnected}
                    error={error}
                    onAddClick={() => setForceSearchOpen(true)}
                />
            </div>
        </div>
    );
};

export default MobileWatchlistPage;
