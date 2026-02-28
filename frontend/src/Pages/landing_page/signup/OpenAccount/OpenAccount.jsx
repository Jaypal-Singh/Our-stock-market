import React from "react";
import { useNavigate } from "react-router-dom";

function OpenAccount() {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-4 py-16 mb-12">
            <div className="flex flex-col items-center justify-center text-center">
                <div className="w-full mt-6">
                    <h2 className="text-[30px] font-medium text-[var(--text-primary)]">
                        Open a MoneyDock account
                    </h2>
                    <p className="mt-4 text-[1.1em] text-[var(--text-secondary)]">
                        Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
                        F&O trades.
                    </p>
                </div>
                <div className="w-full mt-8">
                    <button
                        className="bg-[#387ed1] hover:bg-blue-600 transition-colors text-white font-medium text-lg px-8 py-2.5 rounded"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            navigate("/signup");
                        }}
                    >
                        Sign up for free
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OpenAccount;
