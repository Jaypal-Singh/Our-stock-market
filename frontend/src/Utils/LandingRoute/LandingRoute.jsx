import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../../Pages/LeandingPage/Auth/signup/Signup";
import Login from "../../Pages/LeandingPage/Auth/Login/Login";
function TradeRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default TradeRoute;
