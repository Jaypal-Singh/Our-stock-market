import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center font-sans text-gray-200">
      <div className="w-full max-w-md bg-[#131722] p-8 rounded-lg border border-gray-800 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-4">
          Create Account
        </h2>

        <form className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors text-sm"
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
                placeholder="••••••••"
                className="w-full bg-[#1e222d] border border-gray-700 rounded-md px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors text-sm"
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

          <button className="w-full bg-[#008d62] hover:bg-[#00a372] text-white font-bold py-3 rounded-md transition-all mt-4 uppercase text-xs tracking-widest">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
