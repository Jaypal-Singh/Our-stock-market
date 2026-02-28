import React from 'react';

const PricingSection = () => {
    return (
        <div className="container mx-auto px-4 py-16 mt-10">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-8">

                {/* Text Content */}
                <div className="w-full md:w-1/3">
                    <h2 className="text-3xl font-medium text-[var(--text-primary)] mb-4 transition-colors duration-300">
                        Unbeatable pricing
                    </h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6 transition-colors duration-300">
                        We pioneered the concept of discount broking and price
                        transparency in India. Flat fees and no hidden charges.
                    </p>
                    <a href="#" className="font-medium text-[color:var(--accent-primary)] hover:opacity-80">
                        See pricing &rarr;
                    </a>
                </div>

                {/* Pricing Blocks */}
                <div className="w-full md:w-2/3 flex flex-wrap md:flex-nowrap justify-between gap-6">

                    {/* Free Account Block */}
                    <div className="w-full md:w-1/3 text-center bg-[var(--bg-card)] border border-[color:var(--border-primary)] p-6 rounded-xl shadow-[var(--shadow-md)] flex items-center justify-center flex-col transition-all duration-300 hover:shadow-[var(--shadow-premium)]">
                        <h1 className="text-5xl font-semibold text-yellow-500 mb-2">₹0</h1>
                        <p className="text-xs text-[var(--text-muted)] max-w-[120px]">Free account opening</p>
                    </div>

                    {/* Free Equity Block */}
                    <div className="w-full md:w-1/3 text-center bg-[var(--bg-card)] border border-[color:var(--border-primary)] p-6 rounded-xl shadow-[var(--shadow-md)] flex items-center justify-center flex-col transition-all duration-300 hover:shadow-[var(--shadow-premium)]">
                        <h1 className="text-5xl font-semibold text-yellow-500 mb-2">₹0</h1>
                        <p className="text-xs text-[var(--text-muted)] max-w-[140px]">Free equity delivery and direct mutual funds</p>
                    </div>

                    {/* F&O Pricing Block */}
                    <div className="w-full md:w-1/3 text-center bg-[var(--bg-card)] border border-[color:var(--border-primary)] p-6 rounded-xl shadow-[var(--shadow-md)] flex items-center justify-center flex-col transition-all duration-300 hover:shadow-[var(--shadow-premium)]">
                        <h1 className="text-5xl font-semibold text-yellow-500 mb-2">₹20</h1>
                        <p className="text-xs text-[var(--text-muted)] max-w-[100px]">Intraday and F&O trades</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PricingSection;
