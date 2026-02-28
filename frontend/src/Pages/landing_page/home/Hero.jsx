import React from 'react';

const Hero = () => {
    return (
        <div className="container mx-auto px-4 py-16 text-center mt-10">
            <div className="max-w-4xl mx-auto mb-10">
                <img
                    src="/media/images/homeHero.png"
                    alt="Dashboard Screenshot"
                    className="w-full h-auto drop-shadow-xl"
                />
            </div>
            <h1 className="text-4xl md:text-5xl font-medium text-gray-800 mb-4 mt-12">
                Invest in everything
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
            </p>
            <button className="bg-[#387ed1] hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-md text-lg transition duration-200">
                Sign up for free
            </button>
        </div>
    );
};

export default Hero;
