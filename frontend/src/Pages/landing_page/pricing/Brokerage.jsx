import React, { useState } from 'react';

const Brokerage = () => {
    const [activeTab, setActiveTab] = useState('equity');

    const tabs = [
        { id: 'equity', label: 'Equity' },
        { id: 'currency', label: 'Currency' },
        { id: 'commodity', label: 'Commodity' }
    ];

    const equityData = [
        { charge: 'Brokerage', delivery: 'Zero Brokerage', intraday: '0.03% or Rs. 20/executed order whichever is lower', futures: '0.03% or Rs. 20/executed order whichever is lower', options: 'Flat Rs. 20 per executed order' },
        { charge: 'STT/CTT', delivery: '0.1% on buy & sell', intraday: '0.025% on the sell side', futures: '0.02% on the sell side', options: '0.125% of the intrinsic value on options that are bought and exercised\n0.1% on sell side (on premium)' },
        { charge: 'Transaction charges', delivery: 'NSE: 0.00297%\nBSE: 0.00375%', intraday: 'NSE: 0.00297%\nBSE: 0.00375%', futures: 'NSE: 0.00173%\nBSE: 0', options: 'NSE: 0.03503% (on premium)\nBSE: 0.0325% (on premium)' },
        { charge: 'GST', delivery: '18% on (brokerage + SEBI charges + transaction charges)', intraday: '18% on (brokerage + SEBI charges + transaction charges)', futures: '18% on (brokerage + SEBI charges + transaction charges)', options: '18% on (brokerage + SEBI charges + transaction charges)' },
        { charge: 'SEBI charges', delivery: '₹10 / crore', intraday: '₹10 / crore', futures: '₹10 / crore', options: '₹10 / crore' },
        { charge: 'Stamp charges', delivery: '0.015% or ₹1500 / crore on buy side', intraday: '0.003% or ₹300 / crore on buy side', futures: '0.002% or ₹200 / crore on buy side', options: '0.003% or ₹300 / crore on buy side' }
    ];

    const currencyData = [
        { charge: 'Brokerage', futures: '0.03% or ₹ 20/executed order whichever is lower', options: '₹ 20/executed order' },
        { charge: 'STT/CTT', futures: 'No STT', options: 'No STT' },
        { charge: 'Transaction charges', futures: 'NSE: 0.00035%\nBSE: 0.00045%', options: 'NSE: 0.0311%\nBSE: 0.001%' },
        { charge: 'GST', futures: '18% on (brokerage + SEBI charges + transaction charges)', options: '18% on (brokerage + SEBI charges + transaction charges)' },
        { charge: 'SEBI charges', futures: '₹10 / crore', options: '₹10 / crore' },
        { charge: 'Stamp charges', futures: '0.0001% or ₹10 / crore on buy side', options: '0.0001% or ₹10 / crore on buy side' }
    ];

    const renderEquityTable = () => (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[800px] border-collapse">
                <thead>
                    <tr className="border-b border-[color:var(--border-primary)]">
                        <th className="p-4 text-[13px] font-medium text-[var(--text-secondary)] w-1/5"></th>
                        <th className="p-4 text-[13px] font-medium text-[var(--text-secondary)] w-1/5 hidden md:table-cell">Equity delivery</th>
                        <th className="p-4 text-[13px] font-medium text-[var(--text-secondary)] w-1/5 hidden md:table-cell">Equity intraday</th>
                        <th className="p-4 text-[13px] font-medium text-[var(--text-secondary)] w-1/5 hidden md:table-cell">F&O - Futures</th>
                        <th className="p-4 text-[13px] font-medium text-[var(--text-secondary)] w-1/5 hidden md:table-cell">F&O - Options</th>
                    </tr>
                </thead>
                <tbody className="text-[13px] text-[var(--text-primary)] md:text-[var(--text-secondary)]">
                    {equityData.map((row, idx) => (
                        <tr key={idx} className="border-b border-[color:var(--border-primary)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors flex flex-col md:table-row">
                            <td className="p-4 font-medium md:font-normal text-[var(--text-primary)] md:text-[var(--text-secondary)] bg-[var(--bg-secondary)] md:bg-transparent">{row.charge}</td>
                            <td className="p-4 whitespace-pre-line border-b border-[color:var(--border-primary)] md:border-0">
                                <span className="md:hidden font-medium mb-1 block text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Equity delivery</span>
                                {row.delivery}
                            </td>
                            <td className="p-4 whitespace-pre-line border-b border-[color:var(--border-primary)] md:border-0">
                                <span className="md:hidden font-medium mb-1 block text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Equity intraday</span>
                                {row.intraday}
                            </td>
                            <td className="p-4 whitespace-pre-line border-b border-[color:var(--border-primary)] md:border-0">
                                <span className="md:hidden font-medium mb-1 block text-[11px] uppercase tracking-wider text-[var(--text-muted)]">F&O - Futures</span>
                                {row.futures}
                            </td>
                            <td className="p-4 whitespace-pre-line">
                                <span className="md:hidden font-medium mb-1 block text-[11px] uppercase tracking-wider text-[var(--text-muted)]">F&O - Options</span>
                                {row.options}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderCurrencyTable = () => (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[600px] border-collapse">
                <thead>
                    <tr className="border-b border-[color:var(--border-primary)]">
                        <th className="p-4 text-[13px] font-medium text-[var(--text-secondary)] w-[20%]"></th>
                        <th className="p-4 text-[13px] font-medium text-[var(--text-secondary)] w-[40%] hidden md:table-cell">Currency futures</th>
                        <th className="p-4 text-[13px] font-medium text-[var(--text-secondary)] w-[40%] hidden md:table-cell">Currency options</th>
                    </tr>
                </thead>
                <tbody className="text-[13px] text-[var(--text-primary)] md:text-[var(--text-secondary)]">
                    {currencyData.map((row, idx) => (
                        <tr key={idx} className="border-b border-[color:var(--border-primary)] last:border-0 hover:bg-[var(--bg-secondary)] transition-colors flex flex-col md:table-row">
                            <td className="p-4 font-medium md:font-normal text-[var(--text-primary)] md:text-[var(--text-secondary)] bg-[var(--bg-secondary)] md:bg-transparent">{row.charge}</td>
                            <td className="p-4 whitespace-pre-line border-b border-[color:var(--border-primary)] md:border-0">
                                <span className="md:hidden font-medium mb-1 block text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Currency futures</span>
                                {row.futures}
                            </td>
                            <td className="p-4 whitespace-pre-line">
                                <span className="md:hidden font-medium mb-1 block text-[11px] uppercase tracking-wider text-[var(--text-muted)]">Currency options</span>
                                {row.options}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl transition-colors duration-300">

            {/* Tabs */}
            <div className="flex border-b border-[color:var(--border-primary)] mb-6 overflow-x-auto no-scrollbar scroll-smooth">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-3 px-8 md:px-12 text-[18px] md:text-[22px] font-medium transition-colors duration-300 whitespace-nowrap ${activeTab === tab.id
                                ? 'text-[color:var(--accent-primary)] border-b-2 border-[color:var(--accent-primary)]'
                                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] border-b-2 border-transparent'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Table Container */}
            <div className="border border-[color:var(--border-primary)] rounded-md bg-[var(--bg-main)] shadow-sm transition-colors duration-300">
                {activeTab === 'equity' && renderEquityTable()}
                {activeTab === 'currency' && renderCurrencyTable()}
                {activeTab === 'commodity' && (
                    <div className="p-16 text-center text-[var(--text-muted)] italic">
                        Commodity data table to be added
                    </div>
                )}
            </div>

            <div className="text-center mt-10">
                <p className="text-[17px] text-[var(--text-secondary)] transition-colors duration-300">
                    <a href="#" className="text-[color:var(--accent-primary)] hover:opacity-80 transition-colors">Calculate your costs upfront</a> using our brokerage calculator
                </p>
            </div>

        </div>
    );
};

export default Brokerage;
