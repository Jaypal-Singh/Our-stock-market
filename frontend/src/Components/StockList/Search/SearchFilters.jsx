import React from "react";

/**
 * SearchFilters Component
 * Renders the filter tabs for search results (All, Indices, Cash, F&O, MF).
 */
const SearchFilters = ({ activeFilter, onFilterChange }) => {
    const filters = ["All", "Indices", "Cash", "F&O", "MF"];

    return (
        <div className="sticky top-0 bg-[#0b0e14] z-10 px-4 pt-2 border-b border-[#2a2e39] flex gap-6 text-sm font-medium text-[#868993] mb-2">
            {filters.map((filter) => (
                <button
                    key={filter}
                    className={`pb-2 cursor-pointer transition-colors ${activeFilter === filter
                            ? 'text-[#2962ff] border-b-2 border-[#2962ff]'
                            : 'hover:text-[#d1d4dc]'
                        }`}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default SearchFilters;
