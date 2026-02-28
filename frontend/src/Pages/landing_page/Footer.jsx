import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[color:var(--border-primary)] py-12 mt-16 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">

          {/* Logo & Info */}
          <div className="w-full md:w-1/4">
            <h2 className="text-2xl font-bold text-[var(--accent-primary)] mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              Money Dock
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-4 transition-colors duration-300">
              &copy; {new Date().getFullYear()} Money Dock Broking Ltd.<br />
              All rights reserved.
            </p>
            <div className="flex space-x-4 text-[var(--text-muted)]">
              <span className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors duration-200">X</span>
              <span className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors duration-200">fb</span>
              <span className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors duration-200">ig</span>
              <span className="hover:text-[var(--accent-primary)] cursor-pointer transition-colors duration-200">in</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="w-full md:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4 transition-colors duration-300">Account</h3>
              <ul className="space-y-3 text-[var(--text-muted)] text-sm transition-colors duration-300">
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Open demat account</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Minor demat account</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">NRI demat account</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Commodity</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Dematerialisation</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Fund transfer</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4 transition-colors duration-300">Support</h3>
              <ul className="space-y-3 text-[var(--text-muted)] text-sm transition-colors duration-300">
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Contact us</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Support portal</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">How to file a complaint?</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Status of your complaints</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4 transition-colors duration-300">Company</h3>
              <ul className="space-y-3 text-[var(--text-muted)] text-sm transition-colors duration-300">
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">About</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Philosophy</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Careers</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Money Dock Cares</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Open source</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-4 transition-colors duration-300">Quick links</h3>
              <ul className="space-y-3 text-[var(--text-muted)] text-sm transition-colors duration-300">
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Upcoming IPOs</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Brokerage charges</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Market holidays</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Calculators</li>
                <li className="hover:text-[var(--accent-primary)] cursor-pointer">Markets & Sectors</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <div className="border-t border-[color:var(--border-primary)] pt-8 mt-8 transition-colors duration-300">
          <p className="text-xs text-[var(--text-muted)] opacity-70 leading-relaxed mb-4 text-justify">
            Money Dock Broking Ltd.: Member of NSE, BSE, MCX & MSEI – SEBI Registration no.: INZ000031633. CDSL/NSDL: Depository services through Money Dock Broking Ltd. – SEBI Registration no.: IN-DP-431-2019. Registered Address: Money Dock Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India.
          </p>
          <p className="text-xs text-[var(--text-muted)] opacity-70 leading-relaxed text-justify">
            Investments in securities market are subject to market risks; read all the related documents carefully before investing. Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;