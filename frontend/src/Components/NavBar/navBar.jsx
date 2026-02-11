import { Link, useLocation } from "react-router-dom";
import { Bell, ChevronDown, Home, Triangle } from "lucide-react";

function NavBar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "text-blue-400 font-semibold" : "text-gray-400 hover:text-white";
    };

    return (
        <div className="bg-[#0b0e14] border-b border-gray-800 h-13 flex items-center justify-between px-6 select-none font-sans">
            {/* Left Section: Logo & Indices */}
            <div className="flex items-center gap-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10">
                        <Triangle className="text-green-500 fill-current rotate-180" size={32} strokeWidth={0} />
                    </div>
                </div>

                {/* Indices */}
                <div className="hidden md:flex items-center gap-8 text-sm">
                    {/* NIFTY */}
                    <div className="flex flex-col leading-tight">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-200">NIFTY</span>
                            <span className="bg-red-900/30 text-[10px] text-red-500 px-1 py-0.5 rounded font-bold tracking-wider">EXPIRY</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-green-500 font-semibold">25,935.15</span>
                            <span className="text-xs text-gray-500">▲ 67.85 (0.26%)</span>
                        </div>
                    </div>

                    {/* BANKNIFTY */}
                    <div className="flex flex-col leading-tight">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-200">BANKNIFTY</span>
                            <ChevronDown size={14} className="text-gray-500" />
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-red-500 font-semibold">60,626.40</span>
                            <span className="text-xs text-gray-500">▼ -42.95 (-0.07%)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section: Navigation & Tools */}
            <div className="flex items-center gap-6 text-sm">

                {/* <Link to="/markets" className={isActive("/markets") + " transition-colors"}>Markets</Link> */}
                <Link to="/watchlist" className={isActive("/watchlist") + " transition-colors"}>Watchlist</Link>
                <Link to="/portfolio" className={isActive("/portfolio") + " transition-colors"}>Portfolio</Link>
                <Link to="/orders" className={isActive("/orders") + " transition-colors"}>Orders</Link>
                <Link to="/positions" className={isActive("/positions") + " transition-colors"}>Positions</Link>


                {/* Divider */}
                <div className="h-4 w-px bg-gray-700 mx-2"></div>

                {/* Notifications */}
                <button className="text-gray-400 hover:text-white transition-colors">
                    <Bell size={18} />
                </button>

                {/* Profile */}
                <div className="w-8 h-8 rounded-full bg-blue-900/40 text-blue-400 flex items-center justify-center font-medium text-xs border border-blue-800/50 cursor-pointer">
                    JS
                </div>
            </div>
        </div>
    );
}

export default NavBar;
