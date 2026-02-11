import React from "react";
import {
  Settings,
  Maximize2,
  Camera,
  Save,
  Search,
  ChevronDown,
  Crosshair,
  Undo2,
  Redo2,
  Info,
  Clock,
} from "lucide-react";

function ChartSection() {
  return (
    <div className="flex flex-col h-full bg-[#131722] text-[#d1d4dc]">
      {/* Upper Toolbar */}
      <div className="flex items-center justify-between p-1 border-b border-[#2a2e39] bg-[#1c202b]">
        <div className="flex items-center gap-3 px-2">
          <span className="text-xs font-bold border-r border-[#2a2e39] pr-3">
            5m
          </span>
          <div className="flex gap-4 items-center text-[#868993]">
            <span className="flex items-center gap-1 text-[11px] hover:text-white cursor-pointer">
              Indicators
            </span>
            <div className="h-4 w-[1px] bg-[#2a2e39]"></div>
            <div className="flex items-center gap-2">
              <span className="text-[10px]">Instant Orders</span>
              <div className="w-7 h-4 bg-[#434651] rounded-full relative">
                <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 px-2">
          <div className="flex gap-3 text-[#868993]">
            <Undo2 size={16} className="cursor-not-allowed" />
            <Redo2 size={16} className="cursor-not-allowed" />
          </div>
          <div className="flex items-center gap-2 text-[#2962ff] text-[10px] font-bold border border-[#2a2e39] px-2 py-1 rounded">
            SCALPER MODE <Maximize2 size={12} />
          </div>
          <div className="flex items-center gap-2 text-[#868993]">
            <Save size={16} />
            <Settings size={16} />
            <Camera size={16} />
          </div>
        </div>
      </div>

      {/* Price Info Bar */}
      <div className="flex items-center p-2 text-[12px] border-b border-[#2a2e39]">
        <span className="font-bold text-white mr-2">LXCHEM • 5 • NSE</span>
        <div className="flex gap-2">
          <span className="text-[#868993]">
            O<span className="text-[#089981]">150.39</span>
          </span>
          <span className="text-[#868993]">
            H<span className="text-[#089981]">150.85</span>
          </span>
          <span className="text-[#868993]">
            L<span className="text-[#f23645]">150.00</span>
          </span>
          <span className="text-[#868993]">
            C<span className="text-[#089981]">150.61</span>
          </span>
          <span className="text-[#089981] font-bold">+0.30 (+0.20%)</span>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="relative flex-1 bg-[#131722] overflow-hidden">
        {/* Buy/Sell Floating Buttons */}
        <div className="absolute top-4 left-4 flex items-center z-10 shadow-lg">
          <div className="bg-[#089981] text-white px-3 py-1.5 rounded-l text-[11px] font-bold cursor-pointer hover:opacity-90">
            BUY @ 149.96
          </div>
          <div className="bg-[#2a2e39] text-white border-x border-black/20 px-2 py-1.5 text-[11px]">
            1
          </div>
          <div className="bg-[#f23645] text-white px-3 py-1.5 rounded-r text-[11px] font-bold cursor-pointer hover:opacity-90">
            SELL @ 149.96
          </div>
        </div>

        {/* Chart Background Grid (Simulation) */}
        <div
          className="w-full h-full opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#2a2e39 1px, transparent 1px), linear-gradient(90deg, #2a2e39 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Right Axis Price */}
        <div className="absolute right-0 top-[40%] bg-[#089981] text-white text-[11px] px-1 font-bold z-20">
          150.61
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="flex items-center justify-between p-1 bg-[#1c202b] text-[#868993] text-[10px] border-t border-[#2a2e39]">
        <div className="flex gap-3 px-2">
          <span>1D</span>
          <span>5D</span>
          <span>1M</span>
          <span>3M</span>
          <span>1Y</span>
          <span>5Y</span>
        </div>
        <div className="flex gap-4 px-2 items-center">
          <span className="text-white">17:33:28 (UTC+5:30)</span>
          <div className="flex gap-2">
            <span>%</span>
            <span>log</span>
            <span className="text-[#2962ff]">auto</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartSection;
