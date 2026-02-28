import React, { useState } from 'react';

const Team = () => {
    const [openBio, setOpenBio] = useState(null);

    const teamMembers = [
        { name: 'Nikhil Kamath', role: 'Co-founder & CFO', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=250&auto=format&fit=crop', bio: 'Nikhil is an avid reader and always keeps up with the latest in the financial world.' },
        { name: 'Dr. Kailash Nadh', role: 'CTO', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop', bio: 'Kailash has a PhD in Artificial Intelligence & Computational Linguistics, and is the mastermind behind our tech and products.' },
        { name: 'Venu Madhav', role: 'COO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop', bio: 'Venu is the backbone of our operations ensuring smooth sailing for all our processes.' },
        {
            name: 'Seema Patil',
            role: 'Director',
            img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop',
            bio: 'Seema who has lead the quality team since the beginning of Zerodha, is now a director. She is an extremely disciplined fitness enthusiast.'
        },
        {
            name: 'Karthik Rangappa',
            role: 'Chief of Education',
            img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=250&auto=format&fit=crop',
            bio: 'Karthik "Guru" Rangappa single handledly wrote Varsity, Zerodha\'s massive educational program. He heads investor education initiatives at Zerodha and loves stock markets, classic rock, single malts, and photography.'
        },
        { name: 'Austin Prakesh', role: 'Director Strategy', img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=250&auto=format&fit=crop', bio: 'Austin is a strategist with a profound understanding of global financial markets.' },
    ];

    return (
        <div className="container mx-auto px-4 py-8 mt-12">
            <h2 className="text-[32px] text-center text-[var(--text-primary)] font-medium mb-16 transition-colors duration-300">People</h2>

            {/* CEO Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center max-w-[1000px] mx-auto gap-8 md:gap-16">
                <div className="w-full md:w-[45%] flex flex-col items-center">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=290&auto=format&fit=crop" className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[290px] md:h-[290px] rounded-full object-cover mb-6 border border-[color:var(--border-primary)] transition-colors duration-300" alt="Nithin Kamath" />
                    <h3 className="text-[22px] text-[var(--text-primary)] font-medium pb-2 transition-colors duration-300">Nithin Kamath</h3>
                    <p className="text-[var(--text-muted)] text-[15px] mt-1 transition-colors duration-300">Founder, CEO</p>
                </div>
                <div className="w-full md:w-[55%] text-left space-y-5 text-[var(--text-secondary)] leading-[1.8] text-[16.5px] mt-4 md:mt-10 px-4 md:px-0 transition-colors duration-300">
                    <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>
                    <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>
                    <p>Playing basketball is his zen.</p>
                    <p>Connect on <span className="text-[color:var(--accent-primary)] hover:opacity-80 transition-colors cursor-pointer font-medium">Homepage</span> / <span className="text-[color:var(--accent-primary)] hover:opacity-80 transition-colors cursor-pointer font-medium">TradingQnA</span> / <span className="text-[color:var(--accent-primary)] hover:opacity-80 transition-colors cursor-pointer font-medium">Twitter</span></p>
                </div>
            </div>

            {/* Grid of Team Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-8 max-w-[1000px] mx-auto mt-28 mb-20">
                {teamMembers.map((member, idx) => (
                    <div key={idx} className="flex flex-col items-center px-4">
                        <img src={member.img} className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full object-cover mb-6 border border-[color:var(--border-primary)] transition-colors duration-300" alt={member.name} />
                        <h3 className="text-[20px] text-[var(--text-primary)] font-medium transition-colors duration-300">{member.name}</h3>
                        <p className="text-[var(--text-muted)] text-[15px] mt-2 mb-3 transition-colors duration-300">{member.role}</p>
                        <div
                            className="text-[var(--text-muted)] text-[15px] cursor-pointer hover:text-[var(--text-primary)] transition-colors flex items-center justify-center space-x-1"
                            onClick={() => setOpenBio(openBio === idx ? null : idx)}
                        >
                            <span>Bio</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform ${openBio === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        <div className={`mt-5 text-[15px] text-[var(--text-secondary)] text-center md:text-left w-[85%] transition-all duration-300 ease-in-out overflow-hidden ${openBio === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <p className="leading-[1.7]">{member.bio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
