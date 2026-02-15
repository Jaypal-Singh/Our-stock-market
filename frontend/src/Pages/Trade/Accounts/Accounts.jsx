import React from 'react';
import AccountHeader from './components/AccountHeader';
import ProfileSection from './components/ProfileSection';
import FundsBanner from './components/FundsBanner';

function Accounts() {
    return (
        <div className="h-full flex flex-col bg-[#0b0e14] text-[#d1d4dc] font-sans overflow-y-auto customscrollbar">
            <AccountHeader />

            <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
                <ProfileSection />
                <FundsBanner />
            </div>
        </div>
    )
}

export default Accounts;
