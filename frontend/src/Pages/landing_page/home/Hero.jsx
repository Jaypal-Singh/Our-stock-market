import React from 'react';

const Hero = () => {
    return (
        <div className="container mx-auto px-4 pt-16 pb-8 text-center mt-6">

            {/* Premium CSS Composite Hero Image Stack */}
            <div className="relative w-full max-w-5xl mx-auto h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-16 flex items-center justify-center perspective-1000">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#387ed1] to-purple-600 rounded-full blur-[100px] opacity-20 dark:opacity-30 z-0"></div>

                {/* Left Screen (Watchlist) */}
                <img
                    src="/media/images/media__1772274047772.png"
                    alt="Watchlist View"
                    className="hidden md:block absolute left-0 md:left-4 lg:-left-4 top-8 w-48 md:w-64 lg:w-72 rounded-xl shadow-[var(--shadow-premium)] border border-[color:var(--border-primary)] -rotate-[8deg] z-10 transition-all duration-500 hover:scale-110 hover:-translate-y-4 hover:rotate-0"
                />

                {/* Right Screen (Portfolio) */}
                <img
                    src="/media/images/media__1772274071738.png"
                    alt="Portfolio View"
                    className="hidden md:block absolute right-0 md:right-4 lg:-right-4 bottom-16 w-56 md:w-72 lg:w-80 rounded-xl shadow-[var(--shadow-premium)] border border-[color:var(--border-primary)] rotate-[6deg] z-30 transition-all duration-500 hover:scale-110 hover:-translate-y-4 hover:rotate-0 hover:z-50"
                />

                {/* Center Main Screen (Chart Dashboard) */}
                <img
                    src="/media/images/media__1772274053992.png"
                    alt="Main Trading Dashboard"
                    className="relative z-20 w-[95%] md:w-[75%] lg:w-[65%] rounded-xl shadow-[var(--shadow-premium)] border border-[color:var(--border-primary)] transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                />

                {/* Bottom Left Floating (Profile/Settings) */}
                <img
                    src="/media/images/media__1772274077124.png"
                    alt="Profile Settings"
                    className="hidden lg:block absolute left-[20%] bottom-0 w-48 rounded-xl shadow-[var(--shadow-premium)] border border-[color:var(--border-primary)] rotate-[12deg] z-40 transition-all duration-500 hover:scale-110 hover:-translate-y-4 hover:rotate-0"
                />
            </div>

            {/* Typography and CTA */}
            <div className="relative z-50">
                <h1 className="text-4xl md:text-[56px] font-bold text-[var(--text-primary)] mb-6 tracking-tight transition-colors duration-300">
                    Invest in everything
                </h1>
                <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto text-center transition-colors duration-300 leading-relaxed font-light">
                    Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
                </p>
                <button className="bg-[var(--accent-primary)] hover:opacity-90 hover:-translate-y-1 text-[#ffffff] font-semibold py-3 px-10 rounded-lg text-lg transition-all duration-200 shadow-[var(--shadow-accent)] border border-[#5c6bc0]">
                    Sign up for free
                </button>
            </div>
        </div>
    );
};

export default Hero;
