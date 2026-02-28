import React from 'react';

const EducationSection = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-16">

                {/* Image / Varsity Illustration */}
                <div className="w-full md:w-1/2 p-2 relative">
                    <img
                        src="/media/images/trading_features_dark_1772275110421.png"
                        alt="Education"
                        className="relative z-10 w-full max-w-md mx-auto h-auto drop-shadow-2xl rounded-xl border border-[color:var(--border-primary)]"
                    />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-medium text-[var(--text-primary)] mb-6 transition-colors duration-300">
                        Free and open market education
                    </h2>

                    <div className="mb-6">
                        <p className="text-[var(--text-secondary)] mb-4 transition-colors duration-300">
                            Varsity, the largest online stock market education book in the world
                            covering everything from the basics to advanced trading.
                        </p>
                        <a href="#" className="font-medium text-[color:var(--accent-primary)] hover:opacity-80">
                            Varsity &rarr;
                        </a>
                    </div>

                    <div className="mt-8">
                        <p className="text-[var(--text-secondary)] mb-4 transition-colors duration-300">
                            TradingQ&A, the most active trading and investment community in
                            India for all your market related queries.
                        </p>
                        <a href="#" className="font-medium text-[color:var(--accent-primary)] hover:opacity-80">
                            TradingQ&A &rarr;
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EducationSection;
