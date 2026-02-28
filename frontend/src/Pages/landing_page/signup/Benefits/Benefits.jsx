import React from "react";

function Benefits() {
    return (
        <div className="container mx-auto px-4 mt-16 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center p-4">
                {/* Left Image Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center mb-10 md:mb-0">
                    <img
                        src="media/images/benefits.svg"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/350x234/387ed1/ffffff?text=Benefits+Image";
                        }}
                        className="max-w-full h-auto mb-6"
                        style={{ width: "350px", height: "auto" }}
                        alt="MoneyDock Benefits"
                    />
                    <div className="text-center md:w-[80%] mx-auto">
                        <h2 className="text-2xl font-medium text-[var(--text-primary)]">
                            Benefits of opening a MoneyDock demat account
                        </h2>
                    </div>
                </div>

                {/* Right Text Section */}
                <div className="w-full md:w-1/2 md:py-12 md:pl-10 text-[1.1em]">
                    <h3 className="text-xl font-medium mb-5 text-[var(--text-primary)] tracking-wide">
                        Unbeatable pricing
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-12 leading-relaxed">
                        Zero charges for equity & mutual fund investments. Flat ₹20 fees for
                        intraday and F&O trades.
                    </p>

                    <h3 className="text-xl font-medium mb-5 text-[var(--text-primary)] tracking-wide">
                        Best investing experience
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-12 leading-relaxed">
                        Simple and intuitive trading platform with an easy-to-understand
                        user interface.
                    </p>

                    <h3 className="text-xl font-medium mb-5 text-[var(--text-primary)] tracking-wide">
                        No spam or gimmicks
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-12 leading-relaxed">
                        Committed to transparency — no gimmicks, spam, "gamification", or
                        intrusive push notifications.
                    </p>

                    <h3 className="text-xl font-medium mb-5 text-[var(--text-primary)] tracking-wide">
                        The MoneyDock universe
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                        More than just an app — gain free access to the entire ecosystem of
                        our partner products.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Benefits;
