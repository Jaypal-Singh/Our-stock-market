import React from 'react';

const Hero = () => {
    return (
        <div className="container mx-auto px-4 py-20 mt-10 transition-colors duration-300">
            {/* Header Content */}
            <div className="text-center max-w-2xl mx-auto mb-24">
                <h1 className="text-4xl md:text-[44px] font-medium text-[var(--text-primary)] mb-4 transition-colors duration-300">
                    Charges
                </h1>
                <p className="text-[20px] text-[var(--text-secondary)] transition-colors duration-300">
                    List of all charges and taxes
                </p>
            </div>

            {/* Three Big Pricing Coins */}
            <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-8 max-w-6xl mx-auto">
                <PricingCoin
                    amount="0"
                    title="Free equity delivery"
                    desc="All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage."
                />

                <PricingCoin
                    amount="20"
                    title="Intraday and F&O trades"
                    desc="Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades."
                />

                <PricingCoin
                    amount="0"
                    title="Free direct MF"
                    desc="All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges."
                />
            </div>
        </div>
    );
};

// Reusable Sub-Component for the "Coins"
const PricingCoin = ({ amount, title, desc }) => (
    <div className="flex flex-col items-center text-center w-full md:w-1/3 px-4 group">
        <div className="relative mb-8">
            {/* Abstract Decorative Dots (CSS Only) */}
            <div className="absolute -right-6 -top-2 w-16 h-16 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] absolute top-2 left-2"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] absolute top-6 left-8"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] absolute top-10 left-0"></div>
                <div className="w-1 h-1 rounded-full bg-[var(--text-muted)] absolute top-12 left-10"></div>
                <div className="w-1 h-1 rounded-full bg-[var(--text-muted)] absolute top-1 left-12"></div>
            </div>

            <h2 className="text-[100px] md:text-[120px] font-medium leading-none text-[#ff9800] dark:text-[#ffb74d] drop-shadow-sm flex items-start justify-center transition-colors duration-300">
                <span className="text-[40px] md:text-[50px] mt-4 mr-1">₹</span>
                {amount}
            </h2>
        </div>

        <h3 className="text-2xl font-medium text-[var(--text-primary)] mb-5 transition-colors duration-300">
            {title}
        </h3>

        <p className="text-[15px] text-[var(--text-secondary)] leading-[1.8] max-w-[320px] transition-colors duration-300">
            {desc}
        </p>
    </div>
);

export default Hero;
