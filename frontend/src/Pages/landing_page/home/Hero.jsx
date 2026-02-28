import React, { useState, useEffect } from 'react';

const Hero = () => {
    // Array of the images to cycle through
    const images = [
        "/media/images/media__1772274047772.png", // Watchlist
        "/media/images/media__1772274071738.png", // Portfolio
        "/media/images/media__1772274053992.png", // Main Chart
        "/media/images/media__1772274077124.png"  // Profile/Settings
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Automatically switch images every 3 seconds
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [images.length]);

    return (
        <div className="container mx-auto px-4 pt-4 pb-8 text-center mt-10">

            {/* Smooth Animated Image Slider */}
            <div className="relative w-full max-w-6xl mx-auto h-[280px] sm:h-[370px] md:h-[470px] lg:h-[600px] flex items-center justify-center">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#387ed1] to-purple-600 rounded-full blur-[100px] opacity-10 dark:opacity-20 z-0 pointer-events-none"></div>

                {/* Image Stack for Crossfade */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Platform Preview ${index + 1}`}
                            className={`absolute z-20 w-[96%] md:w-[87%] lg:w-[80%] !max-w-none rounded-xl shadow-[var(--shadow-premium)] border border-[color:var(--border-primary)] transition-all duration-1000 ease-in-out ${index === currentImageIndex
                                ? 'opacity-100 scale-100 translate-y-0'
                                : 'opacity-0 scale-95 translate-y-4'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Typography and CTA at the top (to match the styling typically above the image in Zerodha-like designs) */}
            <div className="relative z-50 mb-12 mt-10">
                <h1 className="text-4xl md:text-[56px] font-medium text-[var(--text-primary)] mb-6 tracking-tight transition-colors duration-300">
                    Invest in everything
                </h1>
                <p className="text-[20px] text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto text-center transition-colors duration-300 leading-relaxed font-light">
                    Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
                </p>
                <button className="bg-[var(--accent-primary)] hover:opacity-90 hover:-translate-y-1 text-[#ffffff] font-semibold py-3 px-10 rounded text-lg transition-all duration-200 shadow-[var(--shadow-accent)] border border-[#5c6bc0]">
                    Sign up for free
                </button>
            </div>

        </div>
    );
};

export default Hero;
