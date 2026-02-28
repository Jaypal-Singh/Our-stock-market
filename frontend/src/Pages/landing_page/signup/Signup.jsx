import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';

const Signup = ({ defaultIsLogin = false }) => {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const [isLogin, setIsLogin] = useState(defaultIsLogin);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setIsLogin(defaultIsLogin);
    }, [defaultIsLogin, location.pathname]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endpoint = isLogin ? 'login' : 'signup';
            const payload = isLogin ? { email, password } : { name, email, password };

            const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    showToast('Logged in successfully', 'success');
                    navigate('/trade/watchlist'); // Navigate to the main app dashboard
                } else {
                    showToast('Registration Successful! Please login.', 'success');
                    setIsLogin(true); // Switch to login view after successful signup
                    setFormData({ name: '', email: '', password: '' });
                }
            } else {
                showToast(data.message || (isLogin ? 'Invalid Email or Password' : 'Registration Failed'), 'error');
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            showToast('Something went wrong. Please try again.', 'error');
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 py-16 mb-10 mt-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
                    {/* Left Side - Image */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <img
                            src="/media/images/signup.png"
                            alt="Trading Platform Dashboard"
                            className="max-w-md w-full"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/media/images/homeHero.png"; // Fallback image
                            }}
                        />
                    </div>

                    {/* Right Side - Form Container */}
                    <div className="w-full md:w-1/2 max-w-md flex flex-col items-center border border-transparent">
                        <div className="text-center w-full">
                            <h1 className="text-3xl font-medium text-gray-800 mb-2">
                                Open a free demat and trading account online
                            </h1>
                            <p className="text-gray-500 mb-8 text-sm">
                                Start investing brokerage free and join a community of 1.6+ crore users
                            </p>

                            <h2 className="text-xl font-medium text-gray-800 mb-6">
                                {isLogin ? 'Login' : 'Sign Up'}
                            </h2>
                        </div>

                        <form className="w-full space-y-5 text-left" onSubmit={handleSubmit}>
                            {/* Name Field - Only for Signup */}
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                        placeholder="Enter name"
                                        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors text-gray-700"
                                        required
                                    />
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors text-gray-700"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="w-full border border-gray-200 rounded px-3 py-2 pr-12 text-sm focus:outline-none focus:border-blue-500 transition-colors text-gray-700"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#387ed1] hover:text-blue-700"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#387ed1] hover:bg-blue-600 text-white font-medium py-2.5 rounded transition-all mt-4"
                            >
                                {isLogin ? 'LOGIN' : 'SIGN UP'}
                            </button>
                        </form>

                        <p className="mt-6 text-sm text-gray-600 w-full text-center">
                            {isLogin ? (
                                <>
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(false)}
                                        className="text-[#387ed1] hover:underline cursor-pointer font-medium"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsLogin(true)}
                                        className="text-[#387ed1] hover:underline cursor-pointer font-medium"
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
