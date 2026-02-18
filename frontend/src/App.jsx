import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trade from "./Pages/trade.jsx";
import LandingRoute from "./utils/LandingRoute/LandingRoute.jsx";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/trade/*" element={<Trade />} />
          <Route path="/*" element={<LandingRoute />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App
