import NavBar from "../Components/NavBar/navBar";
import StockList from "../Components/StockList/stockList";
import TradeRoute from "../Utils/tradeRoutes/tradeRoute";
function Trade() {
    return (
        <div className="h-screen flex flex-col bg-black">
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
    );
}
export default Trade;
