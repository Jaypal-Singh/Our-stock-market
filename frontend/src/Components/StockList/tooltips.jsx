import { BarChart2, Flag, Link, MoreVertical, Trash2 } from "lucide-react";

function Tooltips({ position, onBuy, onSell, onDelete }) {
    return (
        <div className="relative inline-block">
            {/* Tooltip Container */}
            <div className="flex items-center gap-1 bg-[var(--bg-card)] px-2 py-1.5 rounded-md border border-[var(--border-primary)] shadow-xl">

                {/* Buy Button (B) */}
                <button
                    onClick={onBuy}
                    className="w-6 h-6 flex items-center justify-center bg-[#26a69a] hover:bg-[#2bbbad] text-white text-xs font-bold rounded shadow-sm transition-colors cursor-pointer"
                >
                    B
                </button>

                {/* Sell Button (S) */}
                <button
                    onClick={onSell}
                    className="w-6 h-6 flex items-center justify-center bg-[#ef5350] hover:bg-[#e57373] text-white text-xs font-bold rounded shadow-sm transition-colors cursor-pointer mr-2"
                >
                    S
                </button>

                {/* Icons */}
                <div className="flex items-center gap-3 text-[var(--text-muted)]">
                    <button className="hover:text-white transition-colors cursor-pointer" title="Chart">
                        <BarChart2 size={16} />
                    </button>

                    <button className="hover:text-white transition-colors cursor-pointer" title="Market Depth">
                        <Link size={16} />
                        {/* Note: Screenshot showed a Link icon, assuming generic link or option chain */}
                    </button>

                    <button className="hover:text-white transition-colors cursor-pointer" title="Pin">
                        <Flag size={16} />
                    </button>

                    <button onClick={onDelete} className="hover:text-red-400 transition-colors cursor-pointer" title="Delete">
                        <Trash2 size={16} />
                    </button>

                    <div className="h-4 w-px bg-[var(--border-primary)] mx-0.5"></div>

                    <button className="hover:text-white transition-colors cursor-pointer" title="More">
                        <MoreVertical size={16} />
                    </button>
                </div>

                {/* Arrow Pointer */}
                {position === "bottom" ? (
                    // Arrow at TOP (for bottom tooltip)
                    <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 bg-[var(--bg-card)] border-t border-l border-[var(--border-primary)] rotate-45 transform"></div>
                ) : (
                    // Arrow at BOTTOM (for top tooltip - default)
                    <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-[var(--bg-card)] border-b border-r border-[var(--border-primary)] rotate-45 transform"></div>
                )}
            </div>
        </div>
    );
}

export default Tooltips;
