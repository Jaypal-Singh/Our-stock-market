import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileSection = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1e2330] flex items-center justify-center text-[#5c6bc0] font-bold text-lg border border-[#2a2e39]">
                    JS
                </div>
                <div>
                    <div className="text-white text-base font-bold">Jaypal Singh</div>
                    <Link to="/profile" className="text-[#5c6bc0] text-[10px] font-bold uppercase hover:text-[#4a5699] transition-colors block mt-0.5">
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
