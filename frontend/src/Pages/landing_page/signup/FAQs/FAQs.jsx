import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function AccordionItem({ title, children, expanded, onClick }) {
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
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-md mb-4 overflow-hidden transition-colors duration-300">
            <div
                className={`flex items-center justify-between cursor-pointer transition-all duration-200 select-none ${expanded
                    ? "bg-[var(--bg-secondary)] py-[22px] px-[20px] sm:px-[28px]"
                    : "bg-[var(--bg-card)] py-[18px] px-[16px] sm:px-[24px]"
                    } hover:bg-[var(--bg-secondary)] hover:py-[22px] hover:px-[20px] sm:hover:px-[28px] group`}
                onClick={onClick}
            >
                <span
                    className={`font-medium text-[var(--text-primary)] transition-all duration-200 ${expanded ? "text-[1.15rem] sm:text-[1.35rem]" : "text-[1rem] sm:text-[1.2rem] group-hover:text-[1.15rem] sm:group-hover:text-[1.35rem]"
                        }`}
                >
                    {title}
                </span>
                <span className="ml-[16px] text-[#387ed1] flex-shrink-0">
                    {expanded ? <ChevronUp size={20} strokeWidth={2.5} /> : <ChevronDown size={20} strokeWidth={2.5} />}
                </span>
            </div>
            <div
                ref={contentRef}
                style={{
                    height: expanded ? `${height}px` : "0px",
                    opacity: expanded ? 1 : 0,
                }}
                className={`transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden bg-[var(--bg-card)]`}
            >
                <div
                    className={`transition-colors duration-300 ${expanded ? "border-t border-[var(--border-primary)] py-[18px] px-[16px] sm:px-[32px]" : "px-[16px] sm:px-[32px]"
                        }`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function FAQs() {
    const [openIndex, setOpenIndex] = useState(-1);

    return (
        <div className="mb-12 transition-colors duration-300 px-4">
            <div className="container mx-auto px-4 max-w-5xl mt-8">
                <div className="w-full">
                    <h2 className="mb-8 text-[var(--text-primary)] text-[1.6rem] font-medium">
                        FAQs
                    </h2>
                    <AccordionItem
                        title="What is a MoneyDock account?"
                        expanded={openIndex === 0}
                        onClick={() => setOpenIndex(openIndex === 0 ? -1 : 0)}
                    >
                        <p className="text-[1.1rem] text-[var(--text-secondary)] m-0 leading-relaxed">
                            A MoneyDock account is a combined demat and trading account that
                            allows investors to buy, sell, and hold securities digitally.
                        </p>
                    </AccordionItem>

                    <AccordionItem
                        title="What documents are required to open a demat account?"
                        expanded={openIndex === 1}
                        onClick={() => setOpenIndex(openIndex === 1 ? -1 : 1)}
                    >
                        <p className="text-[1.1rem] text-[var(--text-secondary)] mb-3 leading-relaxed">
                            The following documents are required to open a MoneyDock account
                            online:
                        </p>
                        <ul className="pl-6 m-0 text-[var(--text-secondary)] list-disc space-y-2">
                            <li>
                                <a href="#" className="text-[var(--text-secondary)] hover:text-[#387ED1] text-[1.1rem] no-underline transition-colors">
                                    PAN number
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[var(--text-secondary)] hover:text-[#387ED1] text-[1.1rem] no-underline transition-colors">
                                    Aadhaar Card (Linked with a phone number for OTP verification)
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[var(--text-secondary)] hover:text-[#387ED1] text-[1.1rem] no-underline transition-colors">
                                    Cancelled cheque or bank account statement (To link your bank account)
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[var(--text-secondary)] hover:text-[#387ED1] text-[1.1rem] no-underline transition-colors">
                                    Income proof (Required only if you wish to trade in Futures & options)
                                </a>
                            </li>
                        </ul>
                    </AccordionItem>

                    <AccordionItem
                        title="Is MoneyDock account opening free?"
                        expanded={openIndex === 2}
                        onClick={() => setOpenIndex(openIndex === 2 ? -1 : 2)}
                    >
                        <p className="text-[1.1rem] text-[var(--text-secondary)] m-0">
                            Yes, It is completely free.
                        </p>
                    </AccordionItem>

                    <AccordionItem
                        title="Are there any maintenance charges for a demat account?"
                        expanded={openIndex === 3}
                        onClick={() => setOpenIndex(openIndex === 3 ? -1 : 3)}
                    >
                        <p className="text-[1.1rem] text-[var(--text-secondary)] mb-2 leading-relaxed">
                            The account maintenance charges is applicable based on the account type.
                        </p>
                        <p className="text-[1.1rem] text-[var(--text-secondary)] mb-2 leading-relaxed">
                            For Basic Services Demat Account: Zero charges if the holding
                            value is less than ₹4,00,000.
                        </p>
                        <p className="text-[1.1rem] text-[var(--text-secondary)] mb-2 leading-relaxed">
                            For non-Basic Services Demat Account demat accounts: ₹300 per year
                            + GST.
                        </p>
                        <p className="text-[1.1rem] text-[var(--text-secondary)] m-0 leading-relaxed">
                            To learn more about BSDA, <span className="text-[#387ed1] cursor-pointer hover:underline transition-all">Click here</span>.
                        </p>
                    </AccordionItem>

                    <AccordionItem
                        title="Can I open a demat account without a bank account?"
                        expanded={openIndex === 4}
                        onClick={() => setOpenIndex(openIndex === 4 ? -1 : 4)}
                    >
                        <p className="text-[1.1rem] text-[var(--text-secondary)] mb-2 leading-relaxed">
                            To open a demat account, you must have a bank account in your name.
                        </p>
                        <p className="text-[1.1rem] text-[var(--text-secondary)] m-0 leading-relaxed">
                            If UPI verification is completed successfully, no proof of bank is
                            needed. However, if bank verification fails, you'll need to
                            provide either a cancelled cheque or a bank statement to link your
                            bank account to MoneyDock.
                        </p>
                    </AccordionItem>
                </div>
            </div>
        </div>
    );
}

export default FAQs;
