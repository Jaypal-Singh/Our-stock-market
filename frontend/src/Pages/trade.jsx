import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "../Components/NavBar/navBar";
import StockList from "../Components/StockList/stockList";
import TradeRoute from "../Utils/tradeRoutes/TradeRoute";
import MobileNav from "../Components/NavBar/MobileNav/MobileNav";
import MobileWatchlistPage from "../Components/Mobile/MobileWatchlist/MobileWatchlistPage";
import Account from "./Trade/Accounts/Accounts";
import Order from "./Trade/Orders/Orders";
import Portfolio from "./Trade/Portfolio/PortFolio";
import Position from "./Trade/Positions/Positions";

function Trade() {
    return (
        <div className="h-screen flex flex-col bg-black">
            {/* Desktop View */}
            <div className="hidden md:flex flex-col h-full">
                <NavBar />
                <div className="flex flex-1 overflow-hidden p-2 gap-2">
                    <div className="w-1/4 h-full rounded-lg border border-[#2a2e39] overflow-hidden">
                        <StockList />
                    </div>
                    <div className="flex-1 bg-[#0b0e14] rounded-lg border border-[#2a2e39] overflow-hidden">
                        <TradeRoute />
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden flex flex-col h-full bg-[#0b0e14] overflow-hidden">
                <div className="flex-1 overflow-hidden">
                    <Routes>
                        <Route path="/" element={<Navigate to="watchlist" replace />} />
                        <Route path="watchlist" element={<MobileWatchlistPage />} />
                        <Route path="portfolio" element={<Portfolio />} />
                        <Route path="orders" element={<Order />} />
                        <Route path="positions" element={<Position />} />
                        <Route path="accounts" element={<Account />} />
                        <Route path="*" element={<Navigate to="watchlist" replace />} />
                    </Routes>
                </div>
                <MobileNav />
            </div>
        </div>
    );
}

export default Trade;
