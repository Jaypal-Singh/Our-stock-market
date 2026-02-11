import React from "react";

function OptionChain() {
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
    <div className="p-4 bg-[#0b0e14] text-[#d1d4dc] min-h-full font-sans">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold">LXCHEM Option Chain</h3>
        <div className="flex gap-2 text-[11px]">
          <span className="text-[#868993]">Expiry:</span>
          <select className="bg-[#1c202b] border border-[#2a2e39] rounded px-1 outline-none">
            <option>26 Feb 2026</option>
            <option>26 Mar 2026</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-center border-collapse">
          <thead>
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
              <th className="p-2">OI</th>
              <th className="p-2">VOL</th>
              <th className="p-2">IV</th>
              <th className="p-2 border-r border-[#2a2e39]">LTP</th>
              <th className="p-2 bg-[#1c202b] text-white">Price</th>
              <th className="p-2 border-l border-[#2a2e39]">LTP</th>
              <th className="p-2">IV</th>
              <th className="p-2">VOL</th>
              <th className="p-2">OI</th>
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
  );
}

export default OptionChain;
