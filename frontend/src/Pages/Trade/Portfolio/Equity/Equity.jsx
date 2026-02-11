
import React from 'react';
import PortfolioStats from '../Overview/components/PortfolioStats';
import HoldingsTable from './components/HoldingsTable';

const Equity = () => {
    return (
        <div className="bg-[#0b0e14] min-h-full text-[#d1d4dc] font-sans p-4">
            {/* 1. Stats Section (Reused) */}
            <PortfolioStats />

            {/* 2. Holdings Table */}
            <HoldingsTable />
        </div>
    );
};

export default Equity;
