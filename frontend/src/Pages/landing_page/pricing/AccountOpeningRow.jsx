import React from 'react';

const AccountOpeningRow = () => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl transition-colors duration-300">

            {/* Charges for account opening Table */}
            <div className="mb-16">
                <h3 className="text-[22px] font-medium text-[var(--text-primary)] mb-6 transition-colors duration-300">
                    Charges for account opening
                </h3>
                <div className="border border-[color:var(--border-primary)] rounded-md overflow-hidden bg-[var(--bg-card)] transition-colors duration-300">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[color:var(--border-primary)]">
                                <th className="p-4 text-[15px] font-medium text-[var(--text-secondary)] w-2/3">Type of account</th>
                                <th className="p-4 text-[15px] font-medium text-[var(--text-secondary)] w-1/3">Charges</th>
                            </tr>
                        </thead>
                        <tbody className="text-[14px] text-[var(--text-secondary)]">
                            <tr className="border-b border-[color:var(--border-primary)] hidden md:table-row">
                                <td className="p-4">Online account</td>
                                <td className="p-4"><span className="bg-green-600 dark:bg-green-700 text-white text-xs px-2 py-1 rounded">FREE</span></td>
                            </tr>
                            <tr className="border-b border-[color:var(--border-primary)] md:hidden flex flex-col">
                                <td className="p-4 border-b border-[color:var(--border-primary)]">Online account</td>
                                <td className="p-4"><span className="bg-green-600 dark:bg-green-700 text-white text-xs px-2 py-1 rounded">FREE</span></td>
                            </tr>
                            <tr className="border-b border-[color:var(--border-primary)] hidden md:table-row">
                                <td className="p-4">Offline account</td>
                                <td className="p-4"><span className="bg-green-600 dark:bg-green-700 text-white text-xs px-2 py-1 rounded">FREE</span></td>
                            </tr>
                            <tr className="border-b border-[color:var(--border-primary)] md:hidden flex flex-col">
                                <td className="p-4 border-b border-[color:var(--border-primary)]">Offline account</td>
                                <td className="p-4"><span className="bg-green-600 dark:bg-green-700 text-white text-xs px-2 py-1 rounded">FREE</span></td>
                            </tr>
                            <tr className="border-b border-[color:var(--border-primary)] hidden md:table-row bg-[var(--bg-secondary)] opacity-80">
                                <td className="p-4">NRI account (offline only)</td>
                                <td className="p-4">₹ 500</td>
                            </tr>
                            <tr className="border-b border-[color:var(--border-primary)] md:hidden flex flex-col bg-[var(--bg-secondary)] opacity-80">
                                <td className="p-4 border-b border-[color:var(--border-primary)]">NRI account (offline only)</td>
                                <td className="p-4">₹ 500</td>
                            </tr>
                            <tr className="hidden md:table-row">
                                <td className="p-4">Partnership, LLP, HUF, or Corporate accounts (offline only)</td>
                                <td className="p-4">₹ 500</td>
                            </tr>
                            <tr className="md:hidden flex flex-col">
                                <td className="p-4 border-b border-[color:var(--border-primary)]">Partnership, LLP, HUF, or Corporate accounts (offline only)</td>
                                <td className="p-4">₹ 500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Demat AMC Table */}
            <div>
                <h3 className="text-[22px] font-medium text-[var(--text-primary)] mb-6 transition-colors duration-300">
                    Demat AMC (Annual Maintenance Charge)
                </h3>
                <div className="border border-[color:var(--border-primary)] rounded-md overflow-hidden bg-[var(--bg-card)] transition-colors duration-300">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[color:var(--border-primary)]">
                                <th className="p-4 text-[15px] font-medium text-[var(--text-secondary)] w-2/3">Value of holdings</th>
                                <th className="p-4 text-[15px] font-medium text-[var(--text-secondary)] w-1/3">AMC</th>
                            </tr>
                        </thead>
                        <tbody className="text-[14px] text-[var(--text-secondary)]">
                            <tr className="border-b border-[color:var(--border-primary)] hidden md:table-row">
                                <td className="p-4">Up to ₹4 lakh</td>
                                <td className="p-4"><span className="bg-green-600 dark:bg-green-700 text-white text-xs px-2 py-1 rounded">FREE *</span></td>
                            </tr>
                            <tr className="border-b border-[color:var(--border-primary)] md:hidden flex flex-col">
                                <td className="p-4 border-b border-[color:var(--border-primary)]">Up to ₹4 lakh</td>
                                <td className="p-4"><span className="bg-green-600 dark:bg-green-700 text-white text-xs px-2 py-1 rounded">FREE *</span></td>
                            </tr>
                            <tr className="border-b border-[color:var(--border-primary)] hidden md:table-row bg-[var(--bg-secondary)] opacity-80">
                                <td className="p-4">₹4 lakh - ₹10 lakh</td>
                                <td className="p-4">₹ 100 per year, charged quarterly*</td>
                            </tr>
                            <tr className="border-b border-[color:var(--border-primary)] md:hidden flex flex-col bg-[var(--bg-secondary)] opacity-80">
                                <td className="p-4 border-b border-[color:var(--border-primary)]">₹4 lakh - ₹10 lakh</td>
                                <td className="p-4">₹ 100 per year, charged quarterly*</td>
                            </tr>
                            <tr className="hidden md:table-row">
                                <td className="p-4">Above ₹10 lakh</td>
                                <td className="p-4">₹ 300 per year, charged quarterly</td>
                            </tr>
                            <tr className="md:hidden flex flex-col">
                                <td className="p-4 border-b border-[color:var(--border-primary)]">Above ₹10 lakh</td>
                                <td className="p-4">₹ 300 per year, charged quarterly</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] mt-4 leading-relaxed transition-colors duration-300">
                * Lower AMC is applicable only if the account qualifies as a Basic Services Demat Account (BSDA). BSDA account holders cannot hold more than one demat account. To learn more about BSDA, <a href="#" className="text-[color:var(--accent-primary)] hover:underline">click here</a>.
            </p>

        </div>
    );
};

export default AccountOpeningRow;
