import React from "react";
import { Search } from "lucide-react";

function Hero() {
    return (
        <div className="w-full py-12 bg-[#f6f6f6] dark:bg-[var(--bg-card)] border-b border-[var(--border-primary)] transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
                    <h1 className="font-medium text-[#424242] dark:text-[var(--text-primary)] text-[2.1rem] m-0 flex-1">
                        Support Portal
                    </h1>
                    <button className="bg-[var(--accent-primary)] hover:opacity-90 text-white border border-[color:var(--accent-primary)] shadow-[var(--shadow-accent)] rounded-md py-[7px] px-[18px] font-medium text-[1rem] cursor-pointer md:ml-[24px] transition-all whitespace-nowrap">
                        My tickets
                    </button>
                </div>
                <div className="mt-[32px] flex items-center">
                    <div className="w-full max-w-[700px] bg-white dark:bg-[var(--bg-secondary)] border border-[#e3e6e8] dark:border-[var(--border-primary)] rounded-md flex items-center py-[12px] px-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-colors">
                        <span className="mr-[12px] text-[#b0b0b0] dark:text-gray-400 flex-shrink-0">
                            <Search size={20} strokeWidth={2.5} />
                        </span>
                        <input
                            type="text"
                            placeholder="Eg: How do I open my account, How do I activate F&O..."
                            className="border-none outline-none w-full text-[1.05rem] text-[#757575] dark:text-[var(--text-primary)] bg-transparent placeholder-[#b0b0b0] dark:placeholder-gray-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
