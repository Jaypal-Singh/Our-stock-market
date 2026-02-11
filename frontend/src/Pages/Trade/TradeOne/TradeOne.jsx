// import React, { useState } from "react";
// import ChartSection from "./ChartsSection/ChartSection";
// import OverviewSection from "./OverviewSection/OverviewSection";
// // import OptionChainSection from "./OptionChainSection/OptionChainSection";

// function TradeOne() {
//   const [activeTab, setActiveTab] = useState("chart"); // 'chart' or 'overview'

//   return (
//     <div className="flex flex-col h-full bg-[#131722] border-l border-[#2a2e39]">
//       {/* Navigation Tabs */}
//       <div className="flex bg-[#1c202b] border-b border-[#2a2e39] px-2">
//         <button
//           onClick={() => setActiveTab("chart")}
//           className={`px-4 py-2 text-[12px] font-semibold transition-colors ${
//             activeTab === "chart"
//               ? "text-[#2962ff] border-b-2 border-[#2962ff]"
//               : "text-[#868993] hover:text-white"
//           }`}
//         >
//           Chart
//         </button>
//         <button
//           onClick={() => setActiveTab("overview")}
//           className={`px-4 py-2 text-[12px] font-semibold transition-colors ${
//             activeTab === "overview"
//               ? "text-[#2962ff] border-b-2 border-[#2962ff]"
//               : "text-[#868993] hover:text-white"
//           }`}
//         >
//           Overview
//         </button>
//       </div>

//       {/* Content Rendering */}
//       <div className="flex-1 overflow-hidden">
//         {activeTab === "chart" ? (
//           <ChartSection />
//         ) : (
//           <div className="h-full overflow-y-auto customscrollbar">
//             <OverviewSection />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TradeOne;

import React, { useState } from "react";
import ChartSection from "./ChartsSection/ChartSection";
import OverviewSection from "./OverviewSection/OverviewSection";
import OptionChainSection from "./OptionChainSection/OptionChainSection"; // Comment hata kar import karein

function TradeOne() {
  const [activeTab, setActiveTab] = useState("chart"); // 'chart', 'overview', ya 'optionchain'

  return (
    <div className="flex flex-col h-full bg-[#131722] border-l border-[#2a2e39]">
      {/* Navigation Tabs */}
      <div className="flex bg-[#1c202b] border-b border-[#2a2e39] px-2">
        <button
          onClick={() => setActiveTab("chart")}
          className={`px-4 py-2 text-[12px] font-semibold transition-colors ${
            activeTab === "chart"
              ? "text-[#2962ff] border-b-2 border-[#2962ff]"
              : "text-[#868993] hover:text-white"
          }`}
        >
          Chart
        </button>
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-[12px] font-semibold transition-colors ${
            activeTab === "overview"
              ? "text-[#2962ff] border-b-2 border-[#2962ff]"
              : "text-[#868993] hover:text-white"
          }`}
        >
          Overview
        </button>
        {/* Naya Option Chain Button */}
        <button
          onClick={() => setActiveTab("optionchain")}
          className={`px-4 py-2 text-[12px] font-semibold transition-colors ${
            activeTab === "optionchain"
              ? "text-[#2962ff] border-b-2 border-[#2962ff]"
              : "text-[#868993] hover:text-white"
          }`}
        >
          Option Chain
        </button>
      </div>

      {/* Content Rendering */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "chart" && <ChartSection />}

        {activeTab === "overview" && (
          <div className="h-full overflow-y-auto customscrollbar">
            <OverviewSection />
          </div>
        )}

        {activeTab === "optionchain" && (
          <div className="h-full overflow-y-auto customscrollbar">
            <OptionChainSection />
          </div>
        )}
      </div>
    </div>
  );
}

export default TradeOne;
