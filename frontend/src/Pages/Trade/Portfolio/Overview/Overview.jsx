
import React from 'react';
import PortfolioStats from './components/PortfolioStats';
import PortfolioBreakup from './components/PortfolioBreakup';
import MutualFundBanner from './components/MutualFundBanner';
import ActionCards from './components/ActionCards';
import CommunityFooter from './components/CommunityFooter';

const Overview = () => {
    return (
        <div className="bg-[#0b1020] min-h-full text-[#d1d4dc] font-sans p-4">

            {/* Top Stats Section */}
            <PortfolioStats />

            {/* Portfolio Breakup Section */}
            <PortfolioBreakup />

            {/* Mutual Fund Info Banner */}
            <MutualFundBanner />

            {/* Action Cards Section */}
            <ActionCards />

            {/* Footer Section */}
            <CommunityFooter />
        </div>
    );
};

export default Overview;
