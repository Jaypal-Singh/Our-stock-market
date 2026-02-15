import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, FileText, LayoutGrid, Star } from 'lucide-react';

const MobileNav = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.startsWith(path) ? 'text-[#2962ff]' : 'text-[#868993] hover:text-[#d1d4dc]';
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0b0e14] border-t border-[#2a2e39] h-16 flex items-center justify-around px-2 z-50 text-[#868993]">
            <Link to="/trade/watchlist" className={`flex flex-col items-center gap-1 ${isActive('/trade/watchlist')}`}>
                <div className={`p-1 rounded ${location.pathname === '/trade/watchlist' ? 'bg-[#1e222d]' : ''}`}>
                    <Star size={20} className={location.pathname === '/trade/watchlist' ? 'fill-[#2962ff] text-[#2962ff]' : ''} />
                </div>
                <span className={`text-[10px] font-medium ${location.pathname === '/trade/watchlist' ? 'text-[#d1d4dc]' : ''}`}>Watchlist</span>
            </Link>

            <Link to="/trade/portfolio" className={`flex flex-col items-center gap-1 ${isActive('/trade/portfolio')}`}>
                <Briefcase size={22} />
                <span className={`text-[10px] font-medium ${location.pathname.startsWith('/trade/portfolio') ? 'text-[#d1d4dc]' : ''}`}>Portfolio</span>
            </Link>

            <Link to="/trade/orders" className={`flex flex-col items-center gap-1 ${isActive('/trade/orders')}`}>
                <FileText size={22} />
                <span className={`text-[10px] font-medium ${location.pathname.startsWith('/trade/orders') ? 'text-[#d1d4dc]' : ''}`}>Orders</span>
            </Link>

            <Link to="/trade/positions" className={`flex flex-col items-center gap-1 ${isActive('/trade/positions')}`}>
                <LayoutGrid size={22} />
                <span className={`text-[10px] font-medium ${location.pathname.startsWith('/trade/positions') ? 'text-[#d1d4dc]' : ''}`}>Positions</span>
            </Link>

            <Link to="/trade/accounts" className={`flex flex-col items-center gap-1 ${isActive('/trade/accounts')}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-medium text-[10px] border ${location.pathname.startsWith('/trade/accounts') ? 'bg-blue-600/20 text-blue-400 border-blue-500/50' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                    JS
                </div>
                <span className={`text-[10px] font-medium ${location.pathname.startsWith('/trade/accounts') ? 'text-[#d1d4dc]' : ''}`}>Profile</span>
            </Link>
        </div>
    );
};

export default MobileNav;
