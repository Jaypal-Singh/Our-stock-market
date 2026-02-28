import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[var(--bg-card)] border-t border-[var(--border-primary)] mt-10 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:max-w-[1200px]">
        <div className="flex flex-wrap pt-10 pb-4">
          <div className="w-full md:w-3/12 pr-4 relative">
            <img
              src="media/images/logoone.png"
              alt="Logo"
              className="w-[150px] mb-5 dark:hidden"
            />
            {/* Adding a placeholder for dark mode logo if needed, else apply brightness filter */}
            <img
              src="media/images/logoone.png"
              alt="Logo"
              className="w-[150px] mb-5 hidden dark:block brightness-[200%] contrast-200 grayscale"
            />
            <p className="text-[14px] leading-relaxed text-[var(--text-secondary)] mb-5">
              &copy; 2010 - 2025, MoneyDock Broking Ltd <br />
              All rights reserved.
            </p>
            <div className="text-[var(--text-secondary)]">
              <div className="flex gap-5 mb-4 text-[1.2rem]">
                <i className="fa-brands fa-x-twitter hover:text-[var(--text-primary)] cursor-pointer transition"></i>
                <i className="fa-brands fa-square-facebook hover:text-[var(--text-primary)] cursor-pointer transition"></i>
                <i className="fa-brands fa-instagram hover:text-[var(--text-primary)] cursor-pointer transition"></i>
                <i className="fa-brands fa-linkedin hover:text-[var(--text-primary)] cursor-pointer transition"></i>
              </div>
              <div className="flex gap-5 text-[1.2rem]">
                <i className="fa-brands fa-youtube hover:text-[var(--text-primary)] cursor-pointer transition"></i>
                <i className="fa-brands fa-whatsapp hover:text-[var(--text-primary)] cursor-pointer transition"></i>
                <i className="fa-brands fa-telegram hover:text-[var(--text-primary)] cursor-pointer transition"></i>
              </div>
            </div>
          </div>

          <div className="w-1/2 md:w-2/12 flex flex-col mt-8 md:mt-0">
            <h5 className="text-[var(--text-primary)] text-[18px] font-medium mb-4">Account</h5>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Referral program</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Minor demat account</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">NRI demat account</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Commodity</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Dematerialisation</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Fund transfer</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] hover:text-[#387ED1] block transition">MTF</Link>
          </div>

          <div className="w-1/2 md:w-2/12 flex flex-col mt-8 md:mt-0">
            <h5 className="text-[var(--text-primary)] text-[18px] font-medium mb-4">Support</h5>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Contact us</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">How to file a complaint?</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Support portal</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Status of your complaints</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Bulletin</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Circular</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Z-Connect blog</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] hover:text-[#387ED1] block transition">Downloads</Link>
          </div>

          <div className="w-1/2 md:w-2/12 flex flex-col mt-8 md:mt-0">
            <h5 className="text-[var(--text-primary)] text-[18px] font-medium mb-4">Company</h5>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">About</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Philosophy</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Press & media</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Careers</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">MoneyDock Cares (CSR)</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">MoneyDock.tech</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] hover:text-[#387ED1] block transition">Open source</Link>
          </div>

          <div className="w-1/2 md:w-2/12 flex flex-col mt-8 md:mt-0">
            <h5 className="text-[var(--text-primary)] text-[18px] font-medium mb-4">Quick links</h5>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Upcoming IPOs</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Brokerage charges</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Market holidays</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Economic calendar</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Calculators</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] mb-3 hover:text-[#387ED1] block transition">Markets</Link>
            <Link to="#" className="no-underline text-[var(--text-secondary)] text-[15px] hover:text-[#387ED1] block transition">Sectors</Link>
          </div>
        </div>

        <div className="flex flex-wrap mt-8 pt-4">
          <div className="w-full space-y-4">
            <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
              MoneyDock Broking Ltd.: Member of NSE, BSE & MCX – SEBI
              Registration no.: INZ000031633 CDSL/NSDL: Depository services
              through MoneyDock Broking Ltd. – SEBI Registration no.:
              IN-DP-431-2019 Commodity Trading through MoneyDock Commodities
              Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.:
              INZ000038238 Registered Address: MoneyDock Broking Ltd., #153/154,
              4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar
              4th Phase, Bengaluru - 560078, Karnataka, India. For any
              complaints pertaining to securities broking please write to{" "}
              <Link
                to={"#"}
                className="no-underline text-[#387ED1] hover:text-blue-500 transition"
              >
                complaints@MoneyDock.com
              </Link>
              , for DP related to{" "}
              <Link
                to={"#"}
                className="no-underline text-[#387ED1] hover:text-blue-500 transition"
              >
                dp@MoneyDock.com
              </Link>
              . Please ensure you carefully read the Risk Disclosure Document as
              prescribed by SEBI | ICF
            </p>
            <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
              Procedure to file a complaint on{" "}
              <Link
                to={"#"}
                className="no-underline text-[#387ED1] hover:text-blue-500 transition"
              >
                SEBI SCORES
              </Link>
              : Register on SCORES portal. Mandatory details for filing
              complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail
              ID. Benefits: Effective Communication, Speedy redressal of the
              grievances
            </p>
            <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
              Investments in securities market are subject to market risks; read
              all the related documents carefully before investing.
            </p>
            <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
              Attention investors: 1) Stock brokers can accept securities as
              margins from clients only by way of pledge in the depository
              system w.e.f September 01, 2020. 2) Update your e-mail and phone
              number with your stock broker / depository participant and receive
              OTP directly from depository on your e-mail and/or mobile number
              to create pledge. 3) Check your securities / MF / bonds in the
              consolidated account statement issued by NSDL/CDSL every month.
            </p>
            <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
              "Prevent unauthorised transactions in your account. Update your
              mobile numbers/email IDs with your stock brokers. Receive
              information of your transactions directly from Exchange on your
              mobile/email at the end of the day. Issued in the interest of
              investors. KYC is one time exercise while dealing in securities
              markets - once KYC is done through a SEBI registered intermediary
              (broker, DP, Mutual Fund etc.), you need not undergo the same
              process again when you approach another intermediary." Dear
              Investor, if you are subscribing to an IPO, there is no need to
              issue a cheque. Please write the Bank account number and sign the
              IPO application form to authorize your bank to make payment in
              case of allotment. In case of non allotment the funds will remain
              in your bank account. As a business we don't give stock tips, and
              have not authorized anyone to trade on behalf of others. If you
              find anyone claiming to be part of MoneyDock and offering such
              services, please{" "}
              <Link
                to={"#"}
                className="no-underline text-[#387ED1] hover:text-blue-500 transition"
              >
                create a ticket here.
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-6 pb-6 border-t border-[var(--border-primary)] pt-6 bg-[var(--bg-card)] transition-colors duration-300">
        <Link to="#" className="no-underline text-[var(--text-secondary)] text-[13px] font-medium mx-[12px] hover:text-[#387ED1] transition">NSE</Link>
        <Link to="#" className="no-underline text-[var(--text-secondary)] text-[13px] font-medium mx-[12px] hover:text-[#387ED1] transition">BSE</Link>
        <Link to="#" className="no-underline text-[var(--text-secondary)] text-[13px] font-medium mx-[12px] hover:text-[#387ED1] transition">Terms & Conditions</Link>
        <Link to="#" className="no-underline text-[var(--text-secondary)] text-[13px] font-medium mx-[12px] hover:text-[#387ED1] transition">Policies & procedures</Link>
        <Link to="#" className="no-underline text-[var(--text-secondary)] text-[13px] font-medium mx-[12px] hover:text-[#387ED1] transition">Privacy policy</Link>
        <Link to="#" className="no-underline text-[var(--text-secondary)] text-[13px] font-medium mx-[12px] hover:text-[#387ED1] transition">Disclosure</Link>
        <Link to="#" className="no-underline text-[var(--text-secondary)] text-[13px] font-medium mx-[12px] hover:text-[#387ED1] transition">For investor's attention</Link>
        <Link to="#" className="no-underline text-[var(--text-secondary)] text-[13px] font-medium mx-[12px] hover:text-[#387ED1] transition">Investor charter</Link>
      </div>
    </footer>
  );
}

export default Footer;