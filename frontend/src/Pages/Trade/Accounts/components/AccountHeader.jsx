import React from 'react';
import { LogOut } from 'lucide-react';

const AccountHeader = () => {
    return (
        <div className="flex justify-between items-center p-6 border-b border-[#2a2e39]">
            <h1 className="text-white text-lg font-bold">My Account</h1>
            <button className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-wide">
                <LogOut size={16} />
                Logout
            </button>
        </div>
    );
};

export default AccountHeader;
