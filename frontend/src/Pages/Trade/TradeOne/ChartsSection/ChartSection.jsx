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
  ArrowLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import TradingViewChart from "../../../../Components/Chart/TradingViewChart";

function ChartSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const stock = location.state?.stock;
  const isMobileView = location.pathname.includes('/trade/chart');

  const [interval, setInterval] = React.useState('FIVE_MINUTE');
  const [showIntervalMenu, setShowIntervalMenu] = React.useState(false);

  const intervals = [
    { label: '1m', value: 'ONE_MINUTE' },
    { label: '5m', value: 'FIVE_MINUTE' },
    { label: '15m', value: 'FIFTEEN_MINUTE' },
    { label: '30m', value: 'THIRTY_MINUTE' },
    { label: '1h', value: 'ONE_HOUR' },
    { label: '1d', value: 'ONE_DAY' },
  ];

  const currentIntervalLabel = intervals.find(i => i.value === interval)?.label || '5m';

  const [hoveredCandle, setHoveredCandle] = React.useState(null);

  // Display data: Hovered candle OR current stock live data
  const displayOpen = hoveredCandle ? hoveredCandle.open : (stock?.open || 0);
  const displayHigh = hoveredCandle ? hoveredCandle.high : (stock?.high || 0);
  const displayLow = hoveredCandle ? hoveredCandle.low : (stock?.low || 0);
  const displayClose = hoveredCandle ? hoveredCandle.close : (stock?.close || stock?.ltp || 0);

  const isHoverUp = hoveredCandle ? (hoveredCandle.close >= hoveredCandle.open) : stock?.isUp;
  const textColor = isHoverUp ? "text-[#089981]" : "text-[#f23645]";

  const handleCrosshairMove = React.useCallback((data) => {
    setHoveredCandle(prev => {
      // optimizaton: if data is null and prev is null, do nothing
      if (!data && !prev) return prev;
      // optimization: if data and prev exist and times match, do nothing (avoid re-render)
      if (data && prev && data.time === prev.time) return prev;
      return data;
    });
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#131722] text-[#d1d4dc]">

      {/* Mobile Header */}
      {isMobileView && (
        <div className="flex items-center justify-between p-4 border-b border-[#2a2e39] bg-[#0b0e14] shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-[#d1d4dc]">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-white text-lg font-bold uppercase">{stock?.name || "CHART"}</h1>
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
          {/* Mobile Interval Selector */}
          <div className="relative">
            <button
              onClick={() => setShowIntervalMenu(!showIntervalMenu)}
              className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-[#2a2e39] rounded"
            >
              {currentIntervalLabel} <ChevronDown size={12} />
            </button>
            {showIntervalMenu && (
              <div className="absolute right-0 top-full mt-1 bg-[#1c202b] border border-[#2a2e39] rounded shadow-xl z-50 py-1 min-w-[80px]">
                {intervals.map(opt => (
                  <div
                    key={opt.value}
                    className={`px-3 py-2 text-xs cursor-pointer hover:bg-[#2a2e39] ${interval === opt.value ? 'text-[#2962ff]' : 'text-[#d1d4dc]'}`}
                    onClick={() => {
                      setInterval(opt.value);
                      setShowIntervalMenu(false);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upper Toolbar - Desktop Only */}
      {!isMobileView && (
        <div className="flex items-center justify-between p-1 border-b border-[#2a2e39] bg-[#1c202b]">
          <div className="flex items-center gap-3 px-2">
            {/* Desktop Interval Selector */}
            <div className="relative">
              <div
                className="flex items-center gap-1 text-xs font-bold border-r border-[#2a2e39] pr-3 cursor-pointer hover:text-white"
                onClick={() => setShowIntervalMenu(!showIntervalMenu)}
              >
                {currentIntervalLabel} <ChevronDown size={10} />
              </div>
              {showIntervalMenu && (
                <div className="absolute left-0 top-full mt-2 bg-[#1c202b] border border-[#2a2e39] rounded shadow-xl z-50 py-1 min-w-[80px]">
                  {intervals.map(opt => (
                    <div
                      key={opt.value}
                      className={`px-4 py-2 text-xs cursor-pointer hover:bg-[#2a2e39] ${interval === opt.value ? 'text-[#2962ff]' : ''}`}
                      onClick={() => {
                        setInterval(opt.value);
                        setShowIntervalMenu(false);
                      }}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

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
      )}



      {!isMobileView && stock && (
        <div className="flex items-center p-2 text-[12px] border-b border-[#2a2e39]">
          <span className="font-bold text-white mr-2 uppercase">
            {stock.name} • {stock.exch_seg || stock.exchange}
          </span>
          <div className="flex gap-2">
            <span className="text-[#868993]">
              O<span className={textColor}>{displayOpen}</span>
            </span>
            <span className="text-[#868993]">
              H<span className={textColor}>{displayHigh}</span>
            </span>
            <span className="text-[#868993]">
              L<span className={textColor}>{displayLow}</span>
            </span>
            <span className="text-[#868993]">
              C<span className={textColor}>{displayClose}</span>
            </span>
            {!hoveredCandle && (
              <span className={`${stock.isUp ? "text-[#089981]" : "text-[#f23645]"} font-bold`}>
                {stock.change > 0 ? "+" : ""}{stock.change} ({stock.changePercent}%)
              </span>
            )}
            {hoveredCandle && (
              <span className={`${textColor} font-bold`}>
                {/* Optional: Show candle change? For now just OHLC is requested. */}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Chart Area */}
      <div className="relative flex-1 bg-[#131722] overflow-hidden">
        {stock ? (
          <TradingViewChart
            stock={stock}
            interval={interval}
            onCrosshairMove={handleCrosshairMove}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a stock to view chart
          </div>
        )}

        {/* Buy/Sell Floating Buttons */}
        <div className="absolute top-4 left-4 flex items-center z-10 shadow-lg pointer-events-none">
          {/* Use pointer-events-auto on buttons to allow clicking over the chart */}
          <div className="bg-[#089981] text-white px-3 py-1.5 rounded-l text-[11px] font-bold cursor-pointer hover:opacity-90 pointer-events-auto">
            BUY @ {stock?.price || "0.00"}
          </div>
          <div className="bg-[#2a2e39] text-white border-x border-black/20 px-2 py-1.5 text-[11px]">
            1
          </div>
          <div className="bg-[#f23645] text-white px-3 py-1.5 rounded-r text-[11px] font-bold cursor-pointer hover:opacity-90 pointer-events-auto">
            SELL @ {stock?.price || "0.00"}
          </div>
        </div>
      </div>

      {/* Footer Info Bar */}
      {!isMobileView && (
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
      )}
    </div>
  );
}

export default ChartSection;
