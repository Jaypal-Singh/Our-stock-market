import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        // Also simpler token storage if needed, but usually userInfo contains the token
        // Let's verify what the backend returns. It returns: _id, name, email, token.
        navigate("/trade/watchlist");
      } else {
        alert(data.message || "Invalid Email or Password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center font-sans text-gray-200">
      <div className="w-full max-w-md bg-[#131722] p-8 rounded-lg border border-gray-800 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-4">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-blue-400 hover:underline">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#df3f3f] hover:bg-[#f04a4a] text-white font-bold py-3 rounded-md transition-all mt-4 uppercase text-xs tracking-widest">
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          New user?{" "}
          <button onClick={() => navigate("/signup")} className="text-blue-400 hover:underline cursor-pointer">
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
