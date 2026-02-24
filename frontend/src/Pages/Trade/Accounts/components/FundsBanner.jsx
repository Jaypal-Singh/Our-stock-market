import React from 'react';
import { Wallet } from 'lucide-react';

const FundsBanner = () => {
    return (
        <div
            className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-main)] rounded-2xl border border-[var(--border-primary)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden group mb-8 text-center md:text-left shadow-[var(--shadow-premium)]"
        >
            {/* Decorative subtle texture/glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)]/5 blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-7 z-10 w-full relative">
                {/* Illustration Wrapper */}
                <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-gradient-to-tr from-[var(--bg-card)] to-[var(--bg-secondary)] rounded-2xl flex items-center justify-center shadow-sm border border-[var(--border-primary)] transform group-hover:scale-110 transition-transform duration-500">
                        <Wallet size={30} className="text-[var(--accent-primary)]" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-[var(--bg-secondary)] shadow-lg animate-pulse">
                        <span className="mb-0.5">+</span>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="text-[var(--accent-primary)] text-[10px] font-extrabold uppercase mb-2 tracking-[0.2em] opacity-80">Get ready to Invest</div>
                    <h2 className="text-[var(--text-primary)] text-lg md:text-xl font-extrabold leading-tight tracking-tight max-w-md">
                        Add funds to start your trading journey with Angel One
                    </h2>
                </div>
            </div>

            <button
                className="w-full md:w-auto bg-gradient-to-r from-[var(--accent-primary)] to-indigo-600 hover:from-indigo-600 hover:to-[var(--accent-primary)] text-white text-xs font-extrabold py-4 px-8 rounded-xl uppercase tracking-widest transition-all duration-300 z-10 shadow-[var(--shadow-accent)] whitespace-nowrap min-w-fit active:scale-95"
            >
                Add Funds
            </button>
        </div>
    );
};

export default FundsBanner;
