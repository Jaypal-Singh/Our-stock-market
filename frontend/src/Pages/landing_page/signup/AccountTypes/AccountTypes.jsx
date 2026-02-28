import React from "react";
import { FaUser, FaUsers, FaGlobe, FaChild, FaBuilding } from "react-icons/fa";

const accountTypes = [
    {
        icon: <FaUser size={22} color="#387ED1" />,
        title: "Individual Account",
        text: "Invest in equity, mutual funds and derivatives",
    },
    {
        icon: <FaUsers size={22} color="#387ED1" />,
        title: "HUF Account",
        text: "Make tax-efficient investments for your family",
    },
    {
        icon: <FaGlobe size={22} color="#387ED1" />,
        title: "NRI Account",
        text: "Invest in equity, mutual funds, debentures, and more",
    },
    {
        icon: <FaChild size={22} color="#387ED1" />,
        title: "Minor Account",
        text: "Teach your little ones about money & invest for their future with them",
    },
    {
        icon: <FaBuilding size={22} color="#387ED1" />,
        title: "Corporate / LLP / Partnership",
        text: "Manage your business surplus and investments easily",
    },
];

function AccountTypes() {
    return (
        <div className="container mx-auto px-4 py-20">
            <h2 className="text-center font-semibold mb-12 text-[1.6rem] text-[var(--text-primary)]">
                Explore different account types
            </h2>

            <div className="flex flex-wrap justify-center max-w-6xl mx-auto gap-y-6">
                {accountTypes.map((acc, index) => (
                    <div
                        key={index}
                        className="w-full md:w-1/2 lg:w-1/3 px-3 flex justify-center"
                    >
                        <div
                            className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg w-full max-w-[380px]
                         transition-all duration-300 hover:border-[#387ED1] hover:shadow-[0_4px_12px_rgba(56,126,209,0.2)]"
                        >
                            <div className="flex items-center mb-4">
                                <div
                                    className="flex justify-center items-center mr-4 shrink-0"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(56, 126, 209, 0.1)",
                                    }}
                                >
                                    {acc.icon}
                                </div>
                                <h3 className="mb-0 text-[1.25rem] font-medium text-[var(--text-primary)]">
                                    {acc.title}
                                </h3>
                            </div>
                            <p className="mb-0 text-[var(--text-secondary)] text-[0.95rem] leading-snug">
                                {acc.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AccountTypes;
