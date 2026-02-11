import React from "react";

function Events() {
  const events = [
    { name: "Board Meeting", desc: "Quarterly Results", date: "2026-01-29" },
    { name: "Board Meeting", desc: "Quarterly Results", date: "2025-10-29" },
    { name: "Dividend", desc: "Dividend", date: "2025-07-18" },
  ];

  return (
    <div className="flex gap-4">
      <div className="flex-[2] bg-[#131722] p-4 rounded border border-[#2a2e39]">
        <h3 className="text-sm font-bold mb-4">Events</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[#868993] border-b border-[#2a2e39]">
              <th className="text-left py-2">Event</th>
              <th className="text-right py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={i} className="border-b border-[#1c202b]">
                <td className="py-3">
                  <p className="font-bold">{e.name}</p>
                  <p className="text-[10px] text-[#868993]">{e.desc}</p>
                </td>
                <td className="text-right text-[#868993]">{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-1 bg-[#131722] p-4 rounded border border-[#2a2e39]">
        <h3 className="text-sm font-bold mb-4">Top Mutual Funds</h3>
        <div className="space-y-3">
          <div className="text-[11px]">
            <p className="font-bold">ICICI Prudential Commodities</p>
            <p className="text-[#089981]">0.69% AUM</p>
          </div>
          <div className="text-[11px]">
            <p className="font-bold">Motilal Oswal Nifty Microcap</p>
            <p className="text-[#089981]">0.19% AUM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
