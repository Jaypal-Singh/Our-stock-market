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

  const [interval, setInterval] = React.useState('ONE_MINUTE');
  const [showIntervalMenu, setShowIntervalMenu] = React.useState(false);

  const intervals = [
    { label: '1m', value: 'ONE_MINUTE' },
    { label: '5m', value: 'FIVE_MINUTE' },
    { label: '15m', value: 'FIFTEEN_MINUTE' },
    { label: '30m', value: 'THIRTY_MINUTE' },
    { label: '1h', value: 'ONE_HOUR' },
    { label: '1d', value: 'ONE_DAY' },
  ];

  const currentIntervalLabel = intervals.find(i => i.value === interval)?.label || '1m';

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
    <div className="flex flex-col h-full bg-[var(--bg-main)] text-[var(--text-secondary)]">

      {/* Mobile Header */}
      {isMobileView && (
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-[var(--text-secondary)]">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-[var(--text-primary)] text-lg font-bold uppercase">{stock?.name || "CHART"}</h1>
              {stock && (
                <div className="text-[10px] font-bold flex items-center gap-1">
                  <span className="text-[var(--text-muted)]">{stock.exchange}</span>
                  <span className="text-[var(--text-secondary)]">•</span>
                  <span className="text-[var(--text-primary)]">₹{stock.price}</span>
                  <span className={stock.isUp ? 'text-[#089981]' : 'text-[#f23645]'}>{stock.percent}%</span>
                </div>
              )}
            </div>
          </div>
          {/* Mobile Interval Selector */}
          <div className="relative">
            <button
              onClick={() => setShowIntervalMenu(!showIntervalMenu)}
              className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded"
            >
              {currentIntervalLabel} <ChevronDown size={12} />
            </button>
            {showIntervalMenu && (
              <div className="absolute right-0 top-full mt-1 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded shadow-xl z-50 py-1 min-w-[80px]">
                {intervals.map(opt => (
                  <div
                    key={opt.value}
                    className={`px-3 py-2 text-xs cursor-pointer hover:bg-[var(--bg-secondary)] ${interval === opt.value ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'}`}
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
        <div className="flex items-center justify-between p-1 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-3 px-2">
            {/* Desktop Interval Selector */}
            <div className="relative">
              <div
                className="flex items-center gap-1 text-xs font-bold border-r border-[var(--border-primary)] pr-3 cursor-pointer hover:text-[var(--text-primary)]"
                onClick={() => setShowIntervalMenu(!showIntervalMenu)}
              >
                {currentIntervalLabel} <ChevronDown size={10} />
              </div>
              {showIntervalMenu && (
                <div className="absolute left-0 top-full mt-2 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded shadow-xl z-50 py-1 min-w-[80px]">
                  {intervals.map(opt => (
                    <div
                      key={opt.value}
                      className={`px-4 py-2 text-xs cursor-pointer hover:bg-[var(--bg-secondary)] ${interval === opt.value ? 'text-[var(--accent-primary)]' : ''}`}
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

            <div className="flex gap-4 items-center text-[var(--text-muted)]">
              <span className="flex items-center gap-1 text-[11px] hover:text-[var(--text-primary)] cursor-pointer">
                Indicators
              </span>
              <div className="h-4 w-[1px] bg-[var(--border-primary)]"></div>
              <div className="flex items-center gap-2">
                <span className="text-[10px]">Instant Orders</span>
                <div className="w-10 h-5 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-full relative">
                  <div className="absolute right-1 top-1 w-2.5 h-2.5 bg-[var(--accent-primary)] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-2">
            <div className="flex gap-3 text-[var(--text-muted)]">
              <Undo2 size={16} className="cursor-not-allowed" />
              <Redo2 size={16} className="cursor-not-allowed" />
            </div>
            <div className="flex items-center gap-2 text-[var(--accent-primary)] text-[10px] font-bold border border-[var(--border-primary)] px-2 py-1 rounded">
              SCALPER MODE <Maximize2 size={12} />
            </div>
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <Save size={16} />
              <Settings size={16} />
              <Camera size={16} />
            </div>
          </div>
        </div>
      )}



      {!isMobileView && stock && (
        <div className="flex items-center p-2 text-[12px] border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <span className="font-bold text-[var(--text-primary)] mr-2 uppercase">
            {stock.name} • {stock.exch_seg || stock.exchange}
          </span>
          <div className="flex gap-2">
            <span className="text-[var(--text-muted)]">
              O<span className={textColor}>{displayOpen}</span>
            </span>
            <span className="text-[var(--text-muted)]">
              H<span className={textColor}>{displayHigh}</span>
            </span>
            <span className="text-[var(--text-muted)]">
              L<span className={textColor}>{displayLow}</span>
            </span>
            <span className="text-[var(--text-muted)]">
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
      <div className="relative flex-1 bg-[var(--bg-main)] overflow-hidden">
        {stock ? (
          <TradingViewChart
            stock={stock}
            interval={interval}
            onCrosshairMove={handleCrosshairMove}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[var(--text-muted)]">
            Select a stock to view chart
          </div>
        )}

        {/* Buy/Sell Floating Buttons */}
        <div className="absolute top-4 left-4 flex items-center z-10 shadow-lg pointer-events-none">
          {/* Use pointer-events-auto on buttons to allow clicking over the chart */}
          <div className="bg-[#089981] text-white px-3 py-1.5 rounded-l text-[11px] font-bold cursor-pointer hover:opacity-90 pointer-events-auto">
            BUY @ {stock?.price || "0.00"}
          </div>
          <div className="bg-[var(--bg-secondary)] text-[var(--text-primary)] border-x border-[var(--border-primary)] px-2 py-1.5 text-[11px]">
            1
          </div>
          <div className="bg-[#f23645] text-white px-3 py-1.5 rounded-r text-[11px] font-bold cursor-pointer hover:opacity-90 pointer-events-auto">
            SELL @ {stock?.price || "0.00"}
          </div>
        </div>
      </div>

      {/* Footer Info Bar */}
      {!isMobileView && (
        <div className="flex items-center justify-between p-1 bg-[var(--bg-secondary)] text-[var(--text-muted)] text-[10px] border-t border-[var(--border-primary)]">

          <div className="flex gap-4 px-2 items-center">

            <span className="text-[var(--text-primary)]">
              {new Date().toLocaleTimeString('en-GB', { hour12: false })} (UTC+5:30)
            </span>


          </div>
        </div>
      )}
    </div>
  );
}

export default ChartSection;
