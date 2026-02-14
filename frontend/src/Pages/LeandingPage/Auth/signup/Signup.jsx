import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center font-sans text-gray-200">
      <div className="w-full max-w-md bg-[#131722] p-8 rounded-lg border border-gray-800 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-4">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleSignup}>
          {/* Name Field */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              required
            />
          </div>

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
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Password
            </label>
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

          <button type="submit" className="w-full bg-[#008d62] hover:bg-[#00a372] text-white font-bold py-3 rounded-md transition-all mt-4 uppercase text-xs tracking-widest">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-400 hover:underline cursor-pointer">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
