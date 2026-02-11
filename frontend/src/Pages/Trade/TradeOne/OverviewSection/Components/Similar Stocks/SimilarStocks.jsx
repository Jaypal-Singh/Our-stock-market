import React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

function SimilarStocks() {
  const stocks = [
    {
      symbol: "ANURAS",
      name: "Anupam Rasayan",
      price: "1362.80",
      change: "+51.50 (+3.93%)",
      isUp: true,
    },
    {
      symbol: "SHARDACROP",
      name: "Sharda Cropchem",
      price: "1135.90",
      change: "-33.30 (-2.85%)",
      isUp: false,
    },
    {
      symbol: "RALLIS",
      name: "Rallis India Ltd",
      price: "271.00",
      change: "-4.35 (-1.58%)",
      isUp: false,
    },
    {
      symbol: "DHANUKA",
      name: "Dhanuka Agritech",
      price: "1149.40",
      change: "+17.40 (+1.54%)",
      isUp: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold">Similar Stocks</h3>
        <div className="flex gap-2 text-[#868993]">
          <ChevronLeft size={16} className="cursor-pointer" />
          <ChevronRight size={16} className="cursor-pointer" />
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {stocks.map((s, i) => (
          <div
            key={i}
            className="min-w-[200px] bg-[#131722] p-3 rounded-lg border border-[#2a2e39] hover:border-[#2962ff] transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold text-white">
                  {s.symbol}{" "}
                  <span className="text-[8px] bg-[#2a2e39] px-1 rounded text-[#868993]">
                    NSE
                  </span>
                </p>
                <p className="text-[10px] text-[#868993]">{s.name}</p>
              </div>
              <Star
                size={14}
                className="text-[#868993] group-hover:text-[#f7a821]"
              />
            </div>
            <div className="flex justify-between items-end">
              <p
                className={`text-xs font-bold ${s.isUp ? "text-[#089981]" : "text-[#f23645]"}`}
              >
                {s.price}
              </p>
              <p
                className={`text-[10px] ${s.isUp ? "text-[#089981]" : "text-[#f23645]"}`}
              >
                {s.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimilarStocks;
