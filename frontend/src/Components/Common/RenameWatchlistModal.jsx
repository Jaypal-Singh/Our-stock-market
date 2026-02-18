import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const RenameWatchlistModal = ({ isOpen, onClose, onRename, currentName }) => {
    const [name, setName] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setName(currentName || '');
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, currentName]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (trimmed && trimmed !== currentName) {
            onRename(trimmed);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-[#1e222d] border border-[#2a2e39] rounded-lg w-full max-w-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-[#2a2e39]">
                    <h3 className="text-[#d1d4dc] font-medium text-sm">Rename Watchlist</h3>
                    <button onClick={onClose} className="text-[#868993] hover:text-white">
                        <X size={16} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <input
                        ref={inputRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter new name"
                        className="w-full bg-[#131722] border border-[#2a2e39] rounded px-3 py-2 text-sm text-[#d1d4dc] focus:outline-none focus:border-[#2962ff] transition-colors"
                        maxLength={30}
                    />
                    <div className="flex gap-2 mt-4 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-1.5 text-sm text-[#868993] hover:text-white transition-colors rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim() || name.trim() === currentName}
                            className="px-4 py-1.5 text-sm bg-[#2962ff] text-white rounded hover:bg-[#1e50e6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Rename
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RenameWatchlistModal;
