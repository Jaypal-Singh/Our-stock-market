import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trade from "./Pages/trade.jsx";
import LandingRoute from "./Utils/LandingRoute/LandingRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/trade/*" element={<Trade />} />
        <Route path="/*" element={<LandingRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
