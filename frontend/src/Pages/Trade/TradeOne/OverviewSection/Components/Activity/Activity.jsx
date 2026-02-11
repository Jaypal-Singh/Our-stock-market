import React from "react";
import { Star } from "lucide-react";

function Activity() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">
            LXCHEM{" "}
            <span className="text-[10px] bg-[#2a2e39] px-1 rounded ml-1 text-[#868993]">
              NSE
            </span>
          </h2>
          <p className="text-sm text-[#868993]">Laxmi Organic Indus Ltd</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-[#f23645] text-lg font-bold">149.96 ▼</p>
            <p className="text-[#f23645] text-xs">-2.57 (-1.68%)</p>
          </div>
          <Star
            size={18}
            className="text-[#f7a821] fill-[#f7a821] cursor-pointer"
          />
          <button className="bg-[#089981] text-white text-[11px] font-bold px-3 py-1 rounded">
            BUY
          </button>
          <button className="bg-[#f23645] text-white text-[11px] font-bold px-3 py-1 rounded">
            SELL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 border-y border-[#2a2e39] py-4">
        <div>
          <p className="text-[11px] text-[#868993]">Open</p>
          <p className="font-bold">152.53</p>
        </div>
        <div>
          <p className="text-[11px] text-[#868993]">High</p>
          <p className="font-bold text-[#089981]">153.44</p>
        </div>
        <div>
          <p className="text-[11px] text-[#868993]">Low</p>
          <p className="font-bold text-[#f23645]">148.32</p>
        </div>
        <div>
          <p className="text-[11px] text-[#868993]">Close</p>
          <p className="font-bold text-white">152.53</p>
        </div>
      </div>
    </div>
  );
}

export default Activity;
