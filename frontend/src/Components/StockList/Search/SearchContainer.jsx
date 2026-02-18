import React, { useState, useRef, useEffect, useMemo } from "react";
import { searchInstrumentsAPI } from "../../../services/angelOneService";
import SearchInput from "./SearchInput";
import SearchFilters from "./SearchFilters";
import SearchResultsList from "./SearchResultsList";

/**
 * SearchContainer Component
 * Orchestrates the search functionality, state management, and filtering logic.
*/
const SearchContainer = ({ onAddStock, onSelectStock, onBuy, onSell }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");

    const searchTimeoutRef = useRef(null);
    const containerRef = useRef(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Filter Logic
    const filteredResults = useMemo(() => {
        if (!results || results.length === 0) return [];

        switch (activeFilter) {
            case "Indices":
                return results.filter(r =>
                    (r.instrumenttype && r.instrumenttype.includes("INDEX")) ||
                    (r.token && ["99926000", "99926009", "99926037", "99926017"].includes(r.token))
                );
            case "Cash":
                return results.filter(r =>
                    r.exch_seg === "NSE" || r.exch_seg === "BSE" ||
                    (r.instrumenttype && r.instrumenttype === "AMXIDX")
                );
            case "F&O":
                return results.filter(r =>
                    r.exch_seg === "NFO" || r.exch_seg === "MCX" ||
                    (r.instrumenttype && (r.instrumenttype.includes("FUT") || r.instrumenttype.includes("OPT")))
                );
            case "MF":
                return []; // Placeholder as search API might not return MF
            case "All":
            default:
                return results;
        }
    }, [results, activeFilter]);

    const handleSearch = (val) => {
        setQuery(val);

        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        if (val.length >= 2) {
            setIsLoading(true);
            searchTimeoutRef.current = setTimeout(async () => {
                try {
                    const data = await searchInstrumentsAPI(val);
                    setResults(data || []);
                    // Reset filter to All on new search
                    if (activeFilter !== "All") setActiveFilter("All");
                } catch (error) {
                    console.error("Search failed:", error);
                    setResults([]);
                } finally {
                    setIsLoading(false);
                }
            }, 300);
        } else {
            setResults([]);
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsFocused(false);
        setQuery("");
        setResults([]);
        setActiveFilter("All");
    };

    const handleSelect = (stock) => {
        onSelectStock(stock);
        handleClose();
    };

    return (
        <>
            {/* Search Input Area */}
            <div className="p-3 relative z-[100]" ref={containerRef}>
                <SearchInput
                    query={query}
                    onChange={handleSearch}
                    onClose={handleClose}
                    onClear={() => {
                        setQuery("");
                        setResults([]);
                    }}
                    isFocused={isFocused}
                    onFocus={() => setIsFocused(true)}
                />
            </div>

            {/* Full Screen Overlay Results */}
            {isFocused && (
                <div className="absolute top-[60px] left-0 right-0 bottom-0 bg-[#0b0e14] z-[90] overflow-y-auto customscrollbar border-t border-[#2a2e39] flex flex-col">

                    {/* Filter Tabs */}
                    <SearchFilters
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                    />

                    {/* Results List */}
                    <SearchResultsList
                        results={filteredResults}
                        isLoading={isLoading}
                        query={query}
                        activeFilter={activeFilter}
                        onSelect={handleSelect}
                        onAdd={(res) => {
                            onAddStock(res);
                            handleClose();
                        }}
                        onBuy={(res) => {
                            onBuy(res);
                            handleClose();
                        }}
                        onSell={(res) => {
                            onSell(res);
                            handleClose();
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default SearchContainer;
