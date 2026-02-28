import React from 'react';

const ChargesExplanatory = () => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl transition-colors duration-300">
            <h2 className="text-[24px] font-medium text-[var(--text-primary)] mb-12 border-b border-[color:var(--border-primary)] pb-4 transition-colors duration-300">
                Charges explained
            </h2>

            <div className="flex flex-col md:flex-row gap-12 md:gap-20 text-[14.5px] text-[var(--text-secondary)] leading-[1.8] transition-colors duration-300">

                {/* Left Column */}
                <div className="w-full md:w-1/2 space-y-8">
                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">Securities/Commodities transaction tax</h3>
                        <p>Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.</p>
                        <p className="mt-4">When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.</p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">Transaction/Turnover Charges</h3>
                        <p>Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.</p>
                        <p className="mt-4">BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)</p>
                        <p className="mt-4">BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.</p>
                        <p className="mt-4">BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.</p>
                        <p className="mt-4">BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.</p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">Call & trade</h3>
                        <p>Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.</p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">Stamp charges</h3>
                        <p>Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.</p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">NRI brokerage charges</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>₹100 per order for futures and options.</li>
                            <li>For a non-PIS account, 0.5% or ₹100 per executed order for equity (whichever is lower).</li>
                            <li>For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
                            <li>₹500 + GST as yearly account maintenance charges (AMC) charges.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2 space-y-8">
                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">GST</h3>
                        <p>Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)</p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">SEBI Charges</h3>
                        <p>Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.</p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">DP (Depository participant) charges</h3>
                        <p>₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.</p>
                        <p className="mt-4">Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.</p>
                        <p className="mt-4">Debit transactions of mutual funds & bonds get an additional discount of ₹0.25 on the CDSL fee.</p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">Pledging charges</h3>
                        <p>₹30 + GST per pledge request per ISIN.</p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">AMC (Account maintenance charges)</h3>
                        <p>For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000. To learn more about BSDA, <a href="#" className="text-[color:var(--accent-primary)] hover:underline">Click here</a></p>
                        <p className="mt-4">For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days). To learn more about AMC, <a href="#" className="text-[color:var(--accent-primary)] hover:underline">Click here</a></p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">Corporate action order charges</h3>
                        <p>₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.</p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">Off-market transfer charges</h3>
                        <p>₹0.03% or ₹25/px, whichever is higher, subject to a maximum of ₹25,000 per transaction.</p>
                    </div>

                    <div>
                        <h3 className="text-[16px] font-medium text-[var(--text-primary)] mb-3 transition-colors duration-300">Physical CMR request</h3>
                        <p>First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChargesExplanatory;
