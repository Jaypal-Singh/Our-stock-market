import React from 'react';

const TrustSection = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-12">

                {/* Text Content */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-medium text-[var(--text-primary)] mb-10 mt-6 transition-colors duration-300">
                        Trust with confidence
                    </h2>

                    <div className="mb-8">
                        <h3 className="text-xl font-medium text-[var(--text-primary)] mb-2 transition-colors duration-300">Customer-first always</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed text-sm transition-colors duration-300">
                            That's why 1.6+ crore customers trust us with thousands of
                            crores of equity investments, making us one of India's
                            rapidly growing brokers.
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-medium text-[var(--text-primary)] mb-2 transition-colors duration-300">No spam or gimmicks</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed text-sm transition-colors duration-300">
                            No gimmicks, spam, "gamification", or annoying push
                            notifications. High quality apps that you use at your
                            pace, the way you like. <a href="#" className="font-semibold text-[color:var(--accent-primary)] hover:opacity-80">Our philosophies.</a>
                        </p>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-medium text-[var(--text-primary)] mb-2 transition-colors duration-300">The Stock Market universe</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed text-sm transition-colors duration-300">
                            Not just an app, but a whole ecosystem. Our investments
                            in multiple fintech startups offer you tailored services
                            specific to your needs.
                        </p>
                    </div>
                </div>

                {/* Image / Ecosystem Illustration */}
                <div className="w-full md:w-1/2 p-4 relative">
                    <img
                        src="/media/images/portfolio_analytics_dark_1772275063591.png"
                        alt="Ecosystem Analytics"
                        className="relative z-10 w-full h-auto drop-shadow-xl rounded-xl border border-[var(--border-primary)]"
                    />
                </div>
            </div>
        </div>
    );
};

export default TrustSection;
