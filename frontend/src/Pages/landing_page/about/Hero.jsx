import React from 'react';

const Hero = () => {
    return (
        <div className="container mx-auto px-4 py-16 text-center mt-10 md:mt-16">
            <h1 className="text-[32px] md:text-[36px] font-medium text-[var(--text-primary)] mb-6 leading-[1.5] transition-colors duration-300">
                We pioneered the discount broking model in India.<br />
                Now, we are breaking ground with our technology.
            </h1>

            <div className="w-full h-[1px] bg-[var(--border-primary)] my-16 max-w-[1000px] mx-auto transition-colors duration-300"></div>

            <div className="flex flex-col md:flex-row max-w-[1000px] mx-auto text-left gap-10 md:gap-20 text-[var(--text-secondary)] leading-[1.8] text-[16.5px] transition-colors duration-300">
                <div className="w-full md:w-1/2 space-y-6">
                    <p>
                        We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.
                    </p>
                    <p>
                        Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.
                    </p>
                    <p>
                        Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.
                    </p>
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                    <p>
                        In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.
                    </p>
                    <p>
                        <span className="text-[color:var(--accent-primary)] hover:opacity-80 transition-colors cursor-pointer">Rainmatter</span>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.
                    </p>
                    <p>
                        And yet, we are always up to something new every day. Catch up on the latest updates on our <span className="text-[color:var(--accent-primary)] hover:opacity-80 transition-colors cursor-pointer">blog</span> or see what the media is <span className="text-[color:var(--accent-primary)] hover:opacity-80 transition-colors cursor-pointer">saying about us</span> or learn more about our business and product <span className="text-[color:var(--accent-primary)] hover:opacity-80 transition-colors cursor-pointer">philosophies</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
