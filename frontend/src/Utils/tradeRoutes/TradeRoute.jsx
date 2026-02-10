import Account from "../../Pages/Trade/Accounts/Accounts"
import Order from "../../Pages/Trade/Orders/Orders"
import Portfolio from "../../Pages/Trade/Portfolio/PortFolio"
import Position from "../../Pages/Trade/Positions/Positions"
import Watchlist from "../../Pages/Trade/Watchlist/Wathclist"
import {Routes,Route,Navigate} from "react-router-dom"
function TradeRoute() {
    return (
       <Routes>
        <Route path="/" element={<Navigate to="/watchlist" />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/accounts" element={<Account />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/positions" element={<Position />} />
       </Routes>
    )
}
export default TradeRoute