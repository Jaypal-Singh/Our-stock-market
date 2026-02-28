import React from 'react';

const OpenAccount = () => {
    return (
        <div className="container mx-auto px-4 py-24 text-center mt-10 mb-10">
            <h2 className="text-4xl font-medium text-[var(--text-primary)] mb-6 transition-colors duration-300">
                Open a stock market account
            </h2>
            <p className="text-[var(--text-muted)] mb-10 text-lg transition-colors duration-300">
                Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
            </p>
            <button className="bg-[var(--accent-primary)] hover:opacity-90 text-[#ffffff] font-semibold py-3 px-10 rounded text-lg transition duration-200 shadow-[var(--shadow-accent)] border border-[#5c6bc0]">
                Sign up for free
            </button>
        </div>
    );
};

export default OpenAccount;
