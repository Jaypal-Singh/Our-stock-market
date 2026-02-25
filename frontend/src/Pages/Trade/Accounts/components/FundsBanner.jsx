import React, { useState, useEffect } from 'react';
import { Wallet, Briefcase, Plus, Minus } from 'lucide-react';
import axios from 'axios';
import AddFundsModal from '../../../../Components/Common/AddFundsModal';
import WithdrawFundsModal from '../../../../Components/Common/WithdrawFundsModal';

const FundsBanner = () => {
    const [balance, setBalance] = useState(0);
    const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
    const [isWithdrawFundsOpen, setIsWithdrawFundsOpen] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.tradingBalance !== undefined) {
            setBalance(userInfo.tradingBalance);
        }
    }, []);

    const updateBalanceAPI = async (action, amount) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                'http://localhost:5000/api/auth/profile/balance',
                { action, amount },
                config
            );

            // Update local storage and trigger event for navbar
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.dispatchEvent(new Event('userInfoUpdated'));
            setBalance(data.tradingBalance);
            return true;
        } catch (error) {
            console.error('Error updating balance:', error.response?.data?.message || error.message);
            // In a real app, you'd show a toast notification here
            return false;
        }
    };

    const handleAddFunds = async (amount) => {
        if (amount > 0) {
            await updateBalanceAPI('add', amount);
        }
    };

    const handleWithdrawFunds = async (amount) => {
        if (amount > 0 && amount <= balance) {
            await updateBalanceAPI('withdraw', amount);
        }
    };

    return (
        <>
            <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-primary)] p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 w-full mb-8">

                {/* Left Section: Balance Info */}
                <div className="flex flex-col text-center md:text-left w-full md:w-auto">
                    <span className="text-xs text-[var(--text-muted)] mb-0.5">
                        Trading Balance
                    </span>
                    <span className="text-[22px] font-bold text-white">
                        ₹ {balance.toFixed(2)}
                    </span>
                </div>

                {/* Right Section: Action Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                    <button
                        onClick={() => setIsWithdrawFundsOpen(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#4d5162] text-[#6b82fe] bg-transparent text-xs font-semibold hover:border-[#6b82fe] transition-colors whitespace-nowrap"
                    >
                        <Wallet size={14} className="stroke-2 opacity-80" />
                        WITHDRAW FUNDS
                    </button>
                    <button
                        onClick={() => setIsAddFundsOpen(true)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#6b82fe] text-white text-xs font-semibold hover:bg-[#5b72ee] transition-colors whitespace-nowrap"
                    >
                        <Wallet size={14} className="stroke-2 opacity-90" />
                        ADD FUNDS
                    </button>
                </div>
            </div>

            <AddFundsModal
                isOpen={isAddFundsOpen}
                onClose={() => setIsAddFundsOpen(false)}
                onAdd={handleAddFunds}
            />

            <WithdrawFundsModal
                isOpen={isWithdrawFundsOpen}
                onClose={() => setIsWithdrawFundsOpen(false)}
                onWithdraw={handleWithdrawFunds}
                currentBalance={balance}
            />
        </>
    );
};

export default FundsBanner;
