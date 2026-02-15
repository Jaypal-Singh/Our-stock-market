import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileSection = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
                <div className="w-16 h-16 md:w-12 md:h-12 rounded-full bg-[#1e2330] flex items-center justify-center text-[#5c6bc0] font-bold text-xl md:text-lg border border-[#2a2e39]">
                    JS
                </div>
                <div>
                    <div className="text-white text-lg md:text-base font-bold">Jaypal Singh</div>
                    <Link to="/profile" className="text-[#5c6bc0] text-xs md:text-[10px] font-bold uppercase hover:text-[#4a5699] transition-colors block mt-1 md:mt-0.5">
                        View Profile
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-2 text-[#868993] text-xs font-medium bg-[#1e2330] px-3 py-1.5 rounded-full border border-[#2a2e39]">
                <Clock size={14} />
                <span>Member since 2026</span>
            </div>
        </div>
    );
};

export default ProfileSection;
