import React, { useState, useRef, useEffect, useMemo } from "react";
import { searchInstrumentsAPI } from "../../../../services/angelOneService";
import MobileSearchInput from "./MobileSearchInput";
import MobileSearchResultsList from "./MobileSearchResultsList";
import { Search } from "lucide-react";

const MobileSearchContainer = ({ onAddStock, onSelectStock, onBuy, onSell, forceOpen, onForceOpenHandled }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [activeFilter, setActiveFilter] = useState("All");

    const searchTimeoutRef = useRef(null);

    // Handle forceOpen from parent (e.g. EmptyWatchlist button)
    useEffect(() => {
        if (forceOpen) {
            setIsFocused(true);
            if (onForceOpenHandled) onForceOpenHandled();
        }
    }, [forceOpen]);

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
                return [];
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

    return (
        <>
            {/* Initial Search Trigger (Visible when not focused) */}
            {!isFocused && (
                <div
                    className="p-4 mt-1"
                    onClick={() => setIsFocused(true)}
                >
                    <div className="bg-[#1e222d] rounded px-3 py-2 flex items-center border border-[#2a2e39] text-[#868993]">
                        <Search size={16} className="mr-2" />
                        <span className="text-sm font-medium">Search & add</span>
                        <span className="ml-auto text-xs border border-[#565961] rounded px-1.5 py-0.5">/</span>
                    </div>
                </div>
            )}

            {/* Full Screen Overlay when Focused */}
            {isFocused && (
                <div className="fixed inset-0 z-[100] bg-[#0b0e14] flex flex-col">
                    {/* Header with Input */}
                    <div className="p-2 border-b border-[#2a2e39] bg-[#0b0e14]">
                        <MobileSearchInput
                            query={query}
                            onChange={handleSearch}
                            onClose={handleClose}
                            onClear={() => {
                                setQuery("");
                                setResults([]);
                            }}
                            isFocused={isFocused}
                            onFocus={() => { }}
                        />
                        {/* Filter Tabs */}
                        <div className="flex gap-4 overflow-x-auto no-scrollbar mt-3 px-1 pb-1">
                            {["All", "Indices", "Cash", "F&O", "MF"].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${activeFilter === filter
                                        ? "bg-[#2962ff] text-white"
                                        : "bg-[#1e222d] text-[#868993] border border-[#2a2e39]"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="flex-1 overflow-y-auto customscrollbar bg-[#0b0e14]">
                        <MobileSearchResultsList
                            results={filteredResults}
                            isLoading={isLoading}
                            query={query}
                            activeFilter={activeFilter}
                            onAdd={(stock) => {
                                onAddStock(stock);
                                handleClose();
                            }}
                            onBuy={(stock) => {
                                onBuy(stock);
                                handleClose();
                            }}
                            onSell={(stock) => {
                                onSell(stock);
                                handleClose();
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileSearchContainer;
