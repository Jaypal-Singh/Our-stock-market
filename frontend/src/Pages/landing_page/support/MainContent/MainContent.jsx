import React, { useState, useRef, useEffect } from "react";
import { PlusCircle, UserCircle, Globe, IndianRupee, AtSign, Coins, ChevronDown, ChevronUp } from 'lucide-react';

// Accordion Item Component with animation
function AccordionItem({ icon: Icon, title, children, expanded, onClick }) {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (expanded && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [expanded, children]);

    return (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-md mb-4 overflow-hidden">
            <div
                className={`flex items-center cursor-pointer transition-all duration-200 ${expanded
                    ? "bg-[var(--bg-tertiary)] px-8 py-6"
                    : "bg-[var(--bg-secondary)] px-6 py-4 hover:bg-[var(--bg-tertiary)] hover:px-8 hover:py-6"
                    }`}
                onClick={onClick}
            >
                <span className="text-[#387ed1] mr-4 shrink-0 transition-all duration-200">
                    <Icon size={24} />
                </span>
                <span className={`font-medium text-[var(--text-primary)] transition-all duration-200 ${expanded ? 'text-xl' : 'text-lg hover:text-xl'}`}>
                    {title}
                </span>
                <span className="ml-auto text-[#387ed1]">
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
            </div>
            <div
                ref={contentRef}
                style={{
                    height: expanded ? `${height}px` : "0px",
                    opacity: expanded ? 1 : 0,
                }}
                className={`transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] overflow-hidden bg-[var(--bg-secondary)] ${expanded ? "border-t border-[var(--border-primary)]" : ""
                    }`}
            >
                <div className="px-8 py-5">
                    {children}
                </div>
            </div>
        </div>
    );
}

// Main Content Component
function MainContent() {
    const [openIndex, setOpenIndex] = useState(-1);

    const listItemClasses = "mb-2 text-[var(--text-secondary)]";
    const linkClasses = "text-[#387ed1] hover:underline font-medium text-[15px]";

    return (
        <div className="pb-20">
            <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8 max-w-6xl">
                {/* Left: Accordion */}
                <div className="w-full md:w-2/3">
                    <AccordionItem
                        icon={PlusCircle}
                        title="Account Opening"
                        expanded={openIndex === 0}
                        onClick={() => setOpenIndex(openIndex === 0 ? -1 : 0)}
                    >
                        <ul className="pl-5 m-0 list-disc text-[#387ed1]">
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Resident individual</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Minor</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Non Resident Indian (NRI)</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Company, Partnership, HUF and LLP</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Glossary</a></li>
                        </ul>
                    </AccordionItem>

                    <AccordionItem
                        icon={UserCircle}
                        title="Your MoneyDock Account"
                        expanded={openIndex === 1}
                        onClick={() => setOpenIndex(openIndex === 1 ? -1 : 1)}
                    >
                        <ul className="pl-5 m-0 list-disc text-[#387ed1]">
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Your Profile</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Account modification</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Client Master Report (CMR) and Depository Participant (DP)</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Nomination</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Transfer and conversion of securities</a></li>
                        </ul>
                    </AccordionItem>

                    <AccordionItem
                        icon={Globe}
                        title="Trading Platform"
                        expanded={openIndex === 2}
                        onClick={() => setOpenIndex(openIndex === 2 ? -1 : 2)}
                    >
                        <ul className="pl-5 m-0 list-disc text-[#387ed1]">
                            <li className={listItemClasses}><a href="#" className={linkClasses}>IPO</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Trading FAQs</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Margin Trading Facility (MTF) and Margins</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Charts and orders</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Alerts and Nudges</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>General</a></li>
                        </ul>
                    </AccordionItem>

                    <AccordionItem
                        icon={IndianRupee}
                        title="Funds"
                        expanded={openIndex === 3}
                        onClick={() => setOpenIndex(openIndex === 3 ? -1 : 3)}
                    >
                        <ul className="pl-5 m-0 list-disc text-[#387ed1]">
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Add money</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Withdraw money</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Add bank accounts</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>eMandates</a></li>
                        </ul>
                    </AccordionItem>

                    <AccordionItem
                        icon={AtSign}
                        title="Console"
                        expanded={openIndex === 4}
                        onClick={() => setOpenIndex(openIndex === 4 ? -1 : 4)}
                    >
                        <ul className="pl-5 m-0 list-disc text-[#387ed1]">
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Portfolio</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Corporate actions</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Funds statement</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Reports</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Profile</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Segments</a></li>
                        </ul>
                    </AccordionItem>

                    <AccordionItem
                        icon={Coins}
                        title="Coin"
                        expanded={openIndex === 5}
                        onClick={() => setOpenIndex(openIndex === 5 ? -1 : 5)}
                    >
                        <ul className="pl-5 m-0 list-disc text-[#387ed1]">
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Mutual funds</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>National Pension Scheme (NPS)</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Fixed Deposit (FD)</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Features on Coin</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>Payments and Orders</a></li>
                            <li className={listItemClasses}><a href="#" className={linkClasses}>General</a></li>
                        </ul>
                    </AccordionItem>
                </div>

                {/* Right: News and Quick Links */}
                <div className="w-full md:w-1/3 flex flex-col gap-6">
                    {/* Announcements Box */}
                    <div className="bg-[#ffa726]/15 rounded-md p-6 border-l-4 border-l-[#ffa726]">
                        <ul className="pl-5 m-0 list-disc text-[#ffa726]">
                            <li className="mb-3 text-[15px]">
                                <a href="#" className="text-[var(--text-primary)] hover:text-[#387ed1] transition-colors">
                                    Exclusion of F&O contracts on 8 securities from August 29, 2025
                                </a>
                            </li>
                            <li className="text-[15px]">
                                <a href="#" className="text-[var(--text-primary)] hover:text-[#387ed1] transition-colors">
                                    Revision in expiry day of Index and Stock derivatives contracts
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Table Box */}
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-md overflow-hidden">
                        <div className="font-semibold text-lg py-3 px-5 bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] text-[var(--text-primary)]">
                            Quick links
                        </div>
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr className="border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-tertiary)] transition-colors">
                                    <td className="p-4 relative">
                                        <a href="#" className="font-medium text-[#387ed1] hover:underline flex items-center">
                                            <span className="w-4 mr-2">1.</span> Track account opening
                                        </a>
                                    </td>
                                </tr>
                                <tr className="border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-tertiary)] transition-colors">
                                    <td className="p-4 relative">
                                        <a href="#" className="font-medium text-[#387ed1] hover:underline flex items-center">
                                            <span className="w-4 mr-2">2.</span> Track segment activation
                                        </a>
                                    </td>
                                </tr>
                                <tr className="border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-tertiary)] transition-colors">
                                    <td className="p-4 relative">
                                        <a href="#" className="font-medium text-[#387ed1] hover:underline flex items-center">
                                            <span className="w-4 mr-2">3.</span> Intraday margins
                                        </a>
                                    </td>
                                </tr>
                                <tr className="border-b border-[var(--border-primary)] last:border-0 hover:bg-[var(--bg-tertiary)] transition-colors">
                                    <td className="p-4 relative">
                                        <a href="#" className="font-medium text-[#387ed1] hover:underline flex items-center">
                                            <span className="w-4 mr-2">4.</span> Platform user manual
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;
