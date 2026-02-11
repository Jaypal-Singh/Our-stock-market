import NavBar from "../Components/NavBar/navBar";
import StockList from "../Components/StockList/stockList";
import TradeRoute from "../Utils/tradeRoutes/tradeRoute";
function Trade() {
    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <div className="flex flex-1 overflow-hidden">
                <StockList />
                <div className="flex-1 bg-white overflow-y-auto customscrollbar">
                    <TradeRoute />
                </div>
            </div>
        </div>
    );
}
export default Trade;
