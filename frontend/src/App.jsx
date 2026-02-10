import navBar from "./Components/NavBar/navBar"
import stockList from "./Components/StockList/stockList"
// import trade from "./Pages/trade"
import Signup from "./Pages/signup/Signup"
import Trade from "./Pages/trade.jsx"
import { BrowserRouter } from "react-router"
function App() {

  return (
    <>
      <BrowserRouter>
      <Trade/>
      </BrowserRouter>
    </>
  )
}

export default App
