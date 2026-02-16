import React from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function OptionChain() {
  const navigate = useNavigate();
  const location = useLocation();
  const stock = location.state?.stock;
  const isMobileView = location.pathname.includes('/trade/option-chain');

  // Dummy data for representation
  const data = Array(10).fill({
    oi: "12.5L",
    vol: "45.2K",
    iv: "18.4",
    ltp: "145.20",
    strike: "150.00",
    pLtp: "122.10",
    pIv: "16.2",
    pVol: "38K",
    pOi: "10.2L",
  });

  return (
    <div className={`bg-[#0b0e14] text-[#d1d4dc] font-sans ${isMobileView ? 'h-full flex flex-col' : 'p-4 min-h-full'}`}>

      {/* Mobile Header */}
      {isMobileView && (
        <div className="flex items-center justify-between p-4 border-b border-[#2a2e39] bg-[#14161f] shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-[#d1d4dc]">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-white text-lg font-bold uppercase">{stock?.name || "OPTION CHAIN"}</h1>
              {stock && (
                <div className="text-[10px] font-bold flex items-center gap-1">
                  <span className="text-[#868993]">{stock.exchange}</span>
                  <span className="text-[#d1d4dc]">•</span>
                  <span className="text-white">₹{stock.price}</span>
                  <span className={stock.isUp ? 'text-[#089981]' : 'text-[#f23645]'}>{stock.percent}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className={`${isMobileView ? 'flex-1 overflow-hidden flex flex-col' : ''}`}>
        <div className={`flex justify-between items-center mb-4 ${isMobileView ? 'p-4 pb-0' : ''}`}>
          {!isMobileView && <h3 className="text-sm font-bold">LXCHEM Option Chain</h3>}
          <div className="flex gap-2 text-[11px] items-center">
            <span className="text-[#868993]">Expiry:</span>
            <select className="bg-[#1c202b] border border-[#2a2e39] rounded px-1 outline-none py-1">
              <option>26 Feb 2026</option>
              <option>26 Mar 2026</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto customscrollbar flex-1">
          <table className="w-full text-[11px] text-center border-collapse min-w-[600px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#1c202b] text-[#868993] border-y border-[#2a2e39]">
                <th
                  colSpan="4"
                  className="py-2 border-r border-[#2a2e39] text-[#089981]"
                >
                  CALLS
                </th>
                <th className="py-2">STRIKE</th>
                <th
                  colSpan="4"
                  className="py-2 border-l border-[#2a2e39] text-[#f23645]"
                >
                  PUTS
                </th>
              </tr>
              <tr className="bg-[#131722] text-[#868993] border-b border-[#2a2e39]">
                <th className="p-2 min-w-[60px]">OI</th>
                <th className="p-2 min-w-[60px]">VOL</th>
                <th className="p-2 min-w-[50px]">IV</th>
                <th className="p-2 border-r border-[#2a2e39] min-w-[60px]">LTP</th>
                <th className="p-2 bg-[#1c202b] text-white min-w-[70px]">Price</th>
                <th className="p-2 border-l border-[#2a2e39] min-w-[60px]">LTP</th>
                <th className="p-2 min-w-[50px]">IV</th>
                <th className="p-2 min-w-[60px]">VOL</th>
                <th className="p-2 min-w-[60px]">OI</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[#1e222d] hover:bg-[#1c202b] transition-colors"
                >
                  <td className="p-2">{row.oi}</td>
                  <td className="p-2">{row.vol}</td>
                  <td className="p-2">{row.iv}</td>
                  <td className="p-2 border-r border-[#2a2e39] text-[#089981] font-bold">
                    {row.ltp}
                  </td>
                  <td className="p-2 bg-[#1c202b] font-bold text-white">
                    {row.strike}
                  </td>
                  <td className="p-2 border-l border-[#2a2e39] text-[#f23645] font-bold">
                    {row.pLtp}
                  </td>
                  <td className="p-2">{row.pIv}</td>
                  <td className="p-2">{row.pVol}</td>
                  <td className="p-2">{row.pOi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OptionChain;
