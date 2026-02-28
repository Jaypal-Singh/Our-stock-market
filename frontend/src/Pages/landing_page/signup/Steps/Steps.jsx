import React from "react";

function Steps() {
    const steps = [
        { number: "01", text: "Enter the requested details" },
        { number: "02", text: "Complete e-sign & verification" },
        { number: "03", text: "Start investing!" },
    ];

    return (
        <div className="container mx-auto px-4 py-16 mt-10 transition-colors duration-300">
            <h2 className="text-center mb-12 text-[var(--text-primary)] text-[1.6rem] font-medium">
                Steps to open a demat account with MoneyDock
            </h2>

            <div className="flex flex-wrap items-center justify-center max-w-5xl mx-auto">
                {/* Left side image */}
                <div className="w-full md:w-1/2 text-center mb-8 md:mb-0 hidden md:block">
                    <img
                        src="media/images/steps.svg"
                        alt="Steps Illustration"
                        className="max-w-[373px] h-auto mx-auto object-contain dark:brightness-[150%] dark:contrast-150"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/400x250/387ed1/ffffff?text=Steps+Illustration";
                        }}
                    />
                </div>

                {/* Mobile placeholder - slightly smaller */}
                <div className="w-full md:hidden text-center mb-8">
                    <img
                        src="media/images/steps.svg"
                        alt="Steps Illustration"
                        className="max-w-[280px] h-auto mx-auto object-contain dark:brightness-[150%] dark:contrast-150"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/300x180/387ed1/ffffff?text=Steps+Illustration";
                        }}
                    />
                </div>

                {/* Right side steps */}
                <div className="w-full md:w-5/12 px-4 md:px-0">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col mb-6">
                            <div className="flex items-center mb-4">
                                <div className="rounded-full border border-[var(--border-primary)] flex justify-center items-center mr-6 w-[35px] h-[35px] font-semibold text-[var(--text-secondary)] flex-shrink-0">
                                    {step.number}
                                </div>
                                <div>
                                    <p className="mb-0 text-[18px] md:text-[20px] font-medium text-[var(--text-primary)]">
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                            {/* Optional divider matching the original HR tag */}
                            {index < steps.length - 1 && (
                                <hr className="border-[var(--border-primary)] ml-[55px] w-[80%] mb-2 opacity-50" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Steps;
