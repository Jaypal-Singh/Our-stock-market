import React from 'react';

const Universe = () => {
    return (
        <div className="container mx-auto px-4 py-20 text-center transition-colors duration-300 mt-10">

            <p className="text-[var(--text-secondary)] mb-20 text-[15px] max-w-xl mx-auto transition-colors duration-300">
                Want to know more about our technology stack? Check out the <a href="#" className="text-[color:var(--accent-primary)] hover:opacity-80">Zerodha.tech</a> blog.
            </p>

            <h2 className="text-3xl font-medium text-[var(--text-primary)] mb-6 transition-colors duration-300">
                The Zerodha Universe
            </h2>
            <p className="text-[var(--text-secondary)] mb-16 transition-colors duration-300">
                Extend your trading and investment experience even further with our partner platforms
            </p>

            {/* Grid of Partner Platforms (Placeholders) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16">

                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="flex flex-col items-center p-6 transition-transform hover:scale-105 cursor-pointer">
                        {/* Fake Logo */}
                        <div className="w-32 h-12 bg-[var(--bg-card)] border border-[color:var(--border-primary)] rounded-md flex items-center justify-center mb-4 shadow-[var(--shadow-sm)]">
                            <span className="text-xs font-bold text-[var(--text-muted)]">Partner Logo</span>
                        </div>
                        {/* Fake Description */}
                        <p className="text-xs text-[var(--text-muted)] max-wxs text-center leading-relaxed">
                            Asset management, trading platforms, and research partners integrated seamlessly.
                        </p>
                    </div>
                ))}

            </div>

            <button className="bg-[var(--accent-primary)] hover:opacity-90 text-[#ffffff] font-semibold py-3 px-10 rounded text-lg transition duration-200 shadow-[var(--shadow-accent)] border border-[#5c6bc0]">
                Sign up for free
            </button>

        </div>
    );
};

export default Universe;
