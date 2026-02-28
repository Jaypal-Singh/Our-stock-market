import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./TradingAccount.css"; // Not needed, converted to Tailwind

function TradingAccount() {
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Form State
    const [info, setInfo] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Input Handler
    const handleinfo = (e) => {
        const { name, value } = e.target;
        setInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Main Submit Handler (merged signup + login)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password } = info;

        // Validation
        if (!email || !password || (!isLogin && !name)) {
            alert("Please fill in all fields");
            return;
        }

        try {
            if (isLogin) {
                // LOGIN LOGIC
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`,
                    { email, password }
                );

                const { success, message, jwtToken, name: resName } = res.data;

                if (success) {
                    localStorage.setItem("token", jwtToken);
                    localStorage.setItem("loggedInUser", resName);

                    window.location.href = `${process.env.REACT_APP_DASHBOARD_URL || '/trade/watchlist'}?token=${jwtToken}&name=${resName}`;
                } else {
                    alert(message);
                }
            } else {
                // SIGNUP LOGIC
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/signup`,
                    { name, email, password }
                );

                if (res.data.success) {
                    setIsLogin(true);
                } else {
                    alert(res.data.message || "Signup failed. Try again.");
                }
            }
        } catch (err) {
            if (isLogin) {
                alert("Some error occurred during login.");
                console.error(err);
            } else {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("An error occurred. Please try again later.");
                }
                console.error(err);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 mt-8 mb-12 md:mt-32 md:mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
                {/* Left Image Section */}
                <div className="w-full md:w-1/2 text-center mb-8 md:mb-0">
                    <img
                        src="https://placehold.co/550x400/387ed1/ffffff?text=Trading+Account+Preview"
                        alt="Preview"
                        className="max-w-[550px] w-full h-auto mx-auto"
                    />
                </div>

                {/* Right Form Section */}
                <div className="w-full md:w-5/12 mx-auto">
                    <h2 className="text-center mb-2 text-[var(--text-primary)] text-2xl font-semibold">
                        Open a free demat and trading account online
                    </h2>

                    <p className="text-center mb-8 text-[var(--text-secondary)]">
                        Start investing brokerage free and join a community of 1.6+ crore
                        users
                    </p>

                    <h4 className="font-semibold mb-6 text-center text-[var(--text-primary)] text-xl">
                        {isLogin ? "Login" : "Sign Up"}
                    </h4>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block mb-2 text-sm text-[var(--text-secondary)]">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#387ED1]"
                                    placeholder="Enter name"
                                    name="name"
                                    value={info.name}
                                    onChange={handleinfo}
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block mb-2 text-sm text-[var(--text-secondary)]">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#387ED1]"
                                placeholder="Enter email"
                                name="email"
                                value={info.email}
                                onChange={handleinfo}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-sm text-[var(--text-secondary)]">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 pr-16 bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#387ED1]"
                                    placeholder="Enter password"
                                    name="password"
                                    value={info.password}
                                    onChange={handleinfo}
                                />

                                {/* Show / Hide Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 border-none bg-transparent text-sm text-[#387ED1] cursor-pointer p-0"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button
                            className="w-full text-white bg-[#387ED1] p-3 rounded-[25px] hover:bg-blue-600 transition-colors"
                            type="submit"
                        >
                            {isLogin ? "LOGIN" : "SIGN UP"}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-[var(--text-secondary)]">
                        {isLogin ? "Don’t have an account? " : "Already have an account? "}
                        <span
                            className="cursor-pointer text-[#387ED1] font-medium hover:underline"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Sign Up" : "Login"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TradingAccount;
