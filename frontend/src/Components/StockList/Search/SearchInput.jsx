import React, { useRef, useEffect } from "react";
import { Search, X, ArrowLeft } from "lucide-react";

/**
 * SearchInput Component
 * Renders the search bar input field with search icon, clear button, and close functionality.
 */
const SearchInput = ({
    query,
    onChange,
    onClose,
    onClear,
    isFocused,
    onFocus
}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <div className={`flex items-center bg-[#1e222d] rounded-md px-3 py-2 border transition-colors ${isFocused ? 'border-[#2962ff]' : 'border-[#2a2e39]'}`}>
            {isFocused ? (
                <ArrowLeft
                    size={18}
                    className="text-[#d1d4dc] mr-3 cursor-pointer hover:text-white"
                    onClick={onClose}
                />
            ) : (
                <Search size={18} className="text-[#868993] mr-3" />
            )}

            <input
                ref={inputRef}
                type="text"
                placeholder="Search e.g. Reliance, TCS"
                className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-[#50535e] font-medium"
                value={query}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
            />

            {query ? (
                <button
                    onClick={onClear}
                    className="text-[#868993] hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            ) : !isFocused && (
                <span className="text-[#50535e] text-[10px] px-1.5 py-0.5 border border-[#2a2e39] rounded bg-[#2a2e39]/20">
                    CTRL+K
                </span>
            )}
        </div>
    );
};

export default SearchInput;
