import React from "react";

function AnalystRatings() {
  return (
    <div className="flex gap-8 py-4 border-b border-[#2a2e39]">
      <div className="flex-1 space-y-4">
        <h3 className="text-sm font-bold">Analyst Ratings</h3>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">196.5</span>
          <span className="text-[#089981] text-sm font-bold">
            28.83%{" "}
            <span className="text-[#868993] font-normal text-xs block">
              Expected Profit
            </span>
          </span>
        </div>
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between">
            <span>HOLD</span>
            <span>50%</span>
          </div>
          <div className="w-full h-1.5 bg-[#2a2e39] rounded-full overflow-hidden">
            <div className="bg-[#f7a821] h-full" style={{ width: "50%" }}></div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <h3 className="text-sm font-bold">Fundamental Ratios</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#131722] p-2 rounded border border-[#2a2e39]">
            <p className="text-[10px] text-[#868993]">PE Ratio</p>
            <p className="font-bold">53.16</p>
          </div>
          <div className="bg-[#131722] p-2 rounded border border-[#2a2e39]">
            <p className="text-[10px] text-[#868993]">ROE (Latest)</p>
            <p className="font-bold text-[#089981]">4.33%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalystRatings;
