import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateWatchlistModal = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const maxLength = 15;

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name.trim());
            setName('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1e222d] w-full max-w-sm rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-medium text-[#333] dark:text-[#d1d4dc]">
                            Create Watchlist
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-[#868993] hover:text-[#d1d4dc] transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-xs font-medium text-[#666] dark:text-[#868993] mb-2">
                                Enter Watchlist Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        if (e.target.value.length <= maxLength) {
                                            setName(e.target.value);
                                        }
                                    }}
                                    placeholder="Type a name for your watchlist"
                                    className="w-full bg-white dark:bg-[#1e222d] text-[#333] dark:text-[#d1d4dc] border border-[#e0e0e0] dark:border-[#2a2e39] rounded px-3 py-2.5 focus:outline-none focus:border-[#2962ff] transition-colors placeholder:text-[#999] dark:placeholder:text-[#50535e]"
                                    autoFocus
                                />
                            </div>
                            <div className="mt-1 text-right">
                                <span className="text-xs text-[#868993]">
                                    {name.length}/{maxLength} Characters
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className="w-full bg-[#2962ff] hover:bg-[#1e54eb] disabled:bg-[#2962ff]/50 disabled:cursor-not-allowed text-white font-medium py-3 rounded transition-colors"
                        >
                            CREATE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateWatchlistModal;
