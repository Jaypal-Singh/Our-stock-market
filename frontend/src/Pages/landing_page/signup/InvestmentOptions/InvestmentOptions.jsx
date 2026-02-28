import React from "react";
import { useNavigate } from "react-router-dom";
// import "./InvestmentOptions.css"; // Converted to Tailwind

function InvestmentOptions() {
    const navigate = useNavigate();
    const options = [
        {
            title: "Stocks",
            desc: "Invest in all exchange-listed securities",
            img: "media/images/investoptions1.svg",
        },
        {
            title: "Mutual funds",
            desc: "Invest in commission-free direct mutual funds",
            img: "media/images/investoptions2.svg",
        },
        {
            title: "IPO",
            desc: "Apply to the latest IPOs instantly via UPI",
            img: "media/images/investoptions3.svg",
        },
        {
            title: "Futures & options",
            desc: "Hedge and mitigate market risk through simplified F&O trading",
            img: "media/images/investoptions4.svg",
        },
    ];
    return (
        <div className="container mx-auto px-5 md:px-0 text-center py-12">
            {/* Section Heading */}
            <h2 className="mb-12 text-[1.6rem] font-medium text-[var(--text-primary)]">
                Investment options with MoneyDock demat account
            </h2>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 max-w-4xl mx-auto text-left">
                {options.map((opt, index) => (
                    <div
                        key={index}
                        className="flex items-start"
                    >
                        <img
                            // Adding an onError fallback to use a Placehold.co image if local assets are missing
                            src={opt.img}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/112x95/387ed1/ffffff?text=Icon";
                            }}
                            alt={opt.title}
                            className="mr-6 object-contain shrink-0"
                            style={{ width: "112px", height: "94.6px" }}
                        />
                        <div className="pt-2">
                            <h3 className="font-semibold mb-2 text-xl text-[var(--text-primary)]">
                                {opt.title}
                            </h3>
                            <p className="mb-0 text-[15px] leading-snug text-[var(--text-secondary)]">
                                {opt.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Button */}
            <div className="mt-16">
                <button
                    className="text-white text-[1.1rem] px-8 py-2.5 rounded hover:bg-blue-600 transition-colors bg-[#387ed1] font-medium"
                    onClick={() => {
                        window.scrollTo(0, 0);
                        navigate("/signup");
                    }}
                >
                    Explore Investments
                </button>
            </div>
        </div>
    );
}

export default InvestmentOptions;
