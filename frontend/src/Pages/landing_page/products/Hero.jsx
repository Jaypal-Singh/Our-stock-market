import React from 'react';

const Hero = () => {
    return (
        <div className="container mx-auto px-4 py-20 text-center mt-12 border-b border-[color:var(--border-primary)] mb-16 transition-colors duration-300">
            <h1 className="text-4xl md:text-5xl font-medium text-[var(--text-primary)] mb-6 transition-colors duration-300">
                Zerodha Products
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8 transition-colors duration-300">
                Sleek, modern, and intuitive trading platforms
            </p>
            <p className="text-[var(--text-muted)] text-lg mb-12 transition-colors duration-300">
                Check out our <a href="#" className="text-[color:var(--accent-primary)] hover:opacity-80 font-medium">investment offerings &rarr;</a>
            </p>
        </div>
    );
};

export default Hero;
