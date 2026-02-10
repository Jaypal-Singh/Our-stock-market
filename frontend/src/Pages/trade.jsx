import NavBar from "../Components/NavBar/navBar"
import StockList from "../Components/StockList/stockList"
import TradeRoute from "../Utils/tradeRoutes/tradeRoute"
function Trade() {
    return (
        <div className="h-screen flex flex-col">
            <NavBar />
            <div className="flex flex-1">
                <StockList />
                <div className="flex-1 bg-white overflow-y-auto">
                    <TradeRoute />
                </div>
            </div>
        </div>

    )
}
export default Trade