import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowLeft, RefreshCw, AlertCircle, ChevronDown, Clock, Info } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

// ─── F&O Indices available for Option Greeks ──────────────────────────────────
const FNO_INDICES = [
  { name: "NIFTY", label: "NIFTY 50" },
  { name: "BANKNIFTY", label: "BANK NIFTY" },
  { name: "FINNIFTY", label: "FIN NIFTY" },
  { name: "MIDCPNIFTY", label: "MIDCAP NIFTY" },
  { name: "SENSEX", label: "SENSEX" },
];

// ─── Market hours helper (IST) ────────────────────────────────────────────────
function isMarketOpen() {
  const now = new Date();
  // Convert to IST (UTC+5:30)
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 5.5 * 3600000);
  const day = ist.getDay(); // 0=Sun, 6=Sat
  if (day === 0 || day === 6) return false;
  const hhmm = ist.getHours() * 100 + ist.getMinutes();
  return hhmm >= 915 && hhmm <= 1530;
}

// ─── Expiry date helpers ─────────────────────────────────────────────────────
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** Generate next N weekly/monthly expiry dates in AngelOne format e.g. "27FEB2026" */
function generateExpiries(count = 8) {
  const today = new Date();
  const expiries = [];
  const d = new Date(today);

  // Walk forward up to 180 days, pick every Thursday (weekly) up to count
  while (expiries.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 4) {
      // Thursday
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = MONTHS[d.getMonth()];
      const yyyy = d.getFullYear();
      expiries.push(`${dd}${mm}${yyyy}`);
    }
  }
  return expiries;
}

/** Format "27FEB2026" → "27 Feb 2026" for display */
function formatExpiry(raw) {
  if (!raw || raw.length < 9) return raw;
  const dd = raw.slice(0, 2);
  const mon = raw.slice(2, 5);
  const yyyy = raw.slice(5);
  return `${parseInt(dd)} ${mon} ${yyyy}`;
}

// ─── Number formatting ────────────────────────────────────────────────────────
const fmt4 = (v) => (v == null ? "—" : Number(v).toFixed(4));
const fmt2 = (v) => (v == null ? "—" : Number(v).toFixed(2));

// ─── Component ────────────────────────────────────────────────────────────────
function OptionChain() {
  const navigate = useNavigate();
  const location = useLocation();
  const stock = location.state?.stock;
  const isMobileView = location.pathname.includes("/trade/option-chain");

  const expiries = generateExpiries(8);
  const [expiry, setExpiry] = useState(expiries[0] ?? "");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const [cachedAt, setCachedAt] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const lastFetchTime = React.useRef(0);

  // Index/stock selector
  const defaultIndex = stock?.name ?? stock?.symbol ?? "NIFTY";
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const underlyingName = selectedIndex;
  const marketOpen = useMemo(() => isMarketOpen(), []);

  const COOLDOWN_SEC = 10; // Minimum seconds between API calls

  const isIndexSupported = useMemo(() => {
    return FNO_INDICES.some(idx => idx.name === selectedIndex);
  }, [selectedIndex]);

  const fetchGreeks = useCallback(async () => {
    if (!expiry) return;

    // Reset error when starting new fetch
    setError(null);

    // If it's a stock and not in our supported list, show early warning
    if (!isIndexSupported) {
      setError(`Greeks are currently only supported for Indices (NIFTY, BANKNIFTY, etc.). Data for "${selectedIndex}" may not be available from the API.`);
      setRows([]);
      return;
    }

    // Enforce cooldown to avoid rate limits
    const elapsed = (Date.now() - lastFetchTime.current) / 1000;
    if (elapsed < COOLDOWN_SEC && lastFetchTime.current > 0) {
      const remaining = Math.ceil(COOLDOWN_SEC - elapsed);
      setCooldown(remaining);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
      return;
    }

    setLoading(true);
    lastFetchTime.current = Date.now();

    try {
      const res = await fetch("/api/option-chain/greeks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: underlyingName, expirydate: expiry }),
      });
      const json = await res.json();

      if (!json.success) {
        // Customize the message if we know it's a data-less response
        setError(json.message || "No data available for this expiry.");
        setRows([]);
        setCachedAt(null);
      } else {
        setRows(json.data ?? []);
        setLastFetched(new Date());
        setCachedAt(json.fromCache && json.cachedAt ? new Date(json.cachedAt) : null);
      }
    } catch (err) {
      setError("Network error: " + err.message);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [underlyingName, expiry, isIndexSupported]);

  useEffect(() => {
    fetchGreeks();
  }, [fetchGreeks]);

  // ─── Render helpers ─────────────────────────────────────────────────────────
  const ColHeader = ({ label, cls = "" }) => (
    <th className={`p-2 min-w-[70px] whitespace-nowrap ${cls}`}>{label}</th>
  );

  const CallCell = ({ value, cls = "" }) => (
    <td className={`p-2 text-[#089981] ${cls}`}>{value}</td>
  );

  const PutCell = ({ value, cls = "" }) => (
    <td className={`p-2 text-[#f23645] ${cls}`}>{value}</td>
  );

  return (
    <div
      className={`bg-[var(--bg-main)] text-[var(--text-secondary)] font-sans ${isMobileView ? "h-full flex flex-col" : "p-4 min-h-full"
        }`}
    >
      {/* ── Mobile Header ── */}
      {isMobileView && (
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-primary)] bg-[var(--bg-card)] shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-[var(--text-secondary)]">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-[var(--text-primary)] text-lg font-bold uppercase">
                {stock?.name || "OPTION CHAIN"}
              </h1>
              {stock && (
                <div className="text-[10px] font-bold flex items-center gap-1">
                  <span className="text-[var(--text-muted)]">{stock.exchange}</span>
                  <span className="text-[var(--text-secondary)]">•</span>
                  <span className="text-[var(--text-primary)]">₹{stock.price}</span>
                  <span className={stock.isUp ? "text-[#089981]" : "text-[#f23645]"}>
                    {stock.percent}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Content Container ── */}
      <div className={`${isMobileView ? "flex-1 overflow-hidden flex flex-col" : ""}`}>

        {/* ── Toolbar ── */}
        <div
          className={`flex flex-wrap justify-between items-center gap-2 mb-3 ${isMobileView ? "p-4 pb-0" : ""
            }`}
        >
          {/* Title */}
          {!isMobileView && (
            <h3 className="text-sm font-bold uppercase tracking-wide">
              {underlyingName} — Option Chain Greeks
            </h3>
          )}

          <div className="flex items-center gap-3 ml-auto">
            {/* Index Selector */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-[var(--text-muted)]">Index:</span>
              <div className="relative">
                <select
                  value={selectedIndex}
                  onChange={(e) => setSelectedIndex(e.target.value)}
                  className="appearance-none bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded px-2 pr-6 py-1 outline-none text-[var(--text-secondary)] cursor-pointer"
                >
                  {FNO_INDICES.map((idx) => (
                    <option key={idx.name} value={idx.name}>
                      {idx.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
                />
              </div>
            </div>

            {/* Expiry Selector */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-[var(--text-muted)]">Expiry:</span>
              <div className="relative">
                <select
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="appearance-none bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded px-2 pr-6 py-1 outline-none text-[var(--text-secondary)] cursor-pointer"
                >
                  {expiries.map((ex) => (
                    <option key={ex} value={ex}>
                      {formatExpiry(ex)}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[#868993] pointer-events-none"
                />
              </div>
            </div>

            {/* Refresh button */}
            <button
              onClick={fetchGreeks}
              disabled={loading || cooldown > 0}
              className="flex items-center gap-1 text-[11px] bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded px-2 py-1 hover:border-[var(--accent-primary)] transition-colors disabled:opacity-40"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              {loading ? "Loading…" : cooldown > 0 ? `Wait ${cooldown}s` : "Refresh"}
            </button>
          </div>
        </div>

        {/* ── Last updated / Cache indicator ── */}
        {lastFetched && !loading && (
          <div className={`text-[10px] mb-2 flex items-center gap-2 ${isMobileView ? "px-4" : ""}`}>
            <span className="text-[var(--text-muted)]">
              Updated: {lastFetched.toLocaleTimeString()}
            </span>
            {cachedAt && (
              <span className="bg-[#2a2000] text-[#f0b90b] px-2 py-0.5 rounded text-[9px] font-medium">
                📊 Last closing data ({new Date(cachedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })})
              </span>
            )}
          </div>
        )}

        {/* ── Market Closed Banner ── */}
        {!marketOpen && (
          <div
            className={`flex items-start gap-2 bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/30 rounded p-3 text-[11px] text-[var(--accent-primary)] mb-3 ${isMobileView ? "mx-4" : ""}`}
          >
            <Clock size={14} className="shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Market is closed.</span>{" "}
              <span className="text-[var(--text-muted)]">Option Greeks data is only available during market hours (Mon–Fri, 9:15 AM – 3:30 PM IST).</span>
            </div>
          </div>
        )}

        {/* ── Error Banner ── */}
        {error && (
          <div
            className={`flex items-start gap-2 bg-[var(--bg-secondary)] border border-[#f23645]/40 rounded p-3 text-[11px] text-[#f23645] mb-3 ${isMobileView ? "mx-4" : ""}`}
          >
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>
              {error === "No Data Available" && !marketOpen
                ? "No data — the market is currently closed. Please try again during market hours."
                : error}
            </span>
          </div>
        )}

        {/* ── Loading Skeleton ── */}
        {loading && rows.length === 0 && (
          <div className={`space-y-1 ${isMobileView ? "px-4" : ""}`}>
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-8 bg-[var(--bg-secondary)] rounded animate-pulse"
                />
              ))}
          </div>
        )}

        {/* ── Greeks Table ── */}
        {!loading && rows.length > 0 && (
          <div className="overflow-x-auto overflow-y-auto customscrollbar flex-1">
            <table className="w-full text-[11px] text-center border-collapse min-w-[720px]">
              <thead className="sticky top-0 z-10">
                {/* Group header */}
                <tr className="bg-[var(--bg-secondary)] border-y border-[var(--border-primary)]">
                  <th
                    colSpan="5"
                    className="py-2 border-r border-[var(--border-primary)] text-[#089981] tracking-widest font-bold"
                  >
                    CALL
                  </th>
                  <th className="py-2 text-[var(--text-primary)] bg-[var(--bg-card)] px-3 whitespace-nowrap">
                    STRIKE
                  </th>
                  <th
                    colSpan="5"
                    className="py-2 border-l border-[var(--border-primary)] text-[#f23645] tracking-widest font-bold"
                  >
                    PUT
                  </th>
                </tr>
                {/* Column headers */}
                <tr className="bg-[var(--bg-card)] text-[var(--text-muted)] border-b border-[var(--border-primary)]">
                  <ColHeader label="Vega" />
                  <ColHeader label="Gamma" />
                  <ColHeader label="Theta" />
                  <ColHeader label="Delta" />
                  <ColHeader label="IV" cls="border-r border-[var(--border-primary)]" />
                  <th className="p-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] min-w-[80px] whitespace-nowrap">
                    Price
                  </th>
                  <ColHeader label="IV" cls="border-l border-[var(--border-primary)]" />
                  <ColHeader label="Delta" />
                  <ColHeader label="Theta" />
                  <ColHeader label="Gamma" />
                  <ColHeader label="Vega" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const ce = row.CE ?? {};
                  const pe = row.PE ?? {};
                  return (
                    <tr
                      key={i}
                      className="border-b border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                    >
                      {/* CALL side */}
                      <CallCell value={fmt4(ce.vega)} />
                      <CallCell value={fmt4(ce.gamma)} />
                      <CallCell value={fmt4(ce.theta)} />
                      <CallCell value={fmt4(ce.delta)} />
                      <CallCell
                        value={fmt2(ce.impliedVolatility)}
                        cls="border-r border-[var(--border-primary)]"
                      />

                      {/* Strike */}
                      <td className="p-2 bg-[var(--bg-secondary)] font-bold text-[var(--text-primary)] whitespace-nowrap">
                        {Number(row.strikePrice).toLocaleString("en-IN")}
                      </td>

                      {/* PUT side */}
                      <PutCell
                        value={fmt2(pe.impliedVolatility)}
                        cls="border-l border-[var(--border-primary)]"
                      />
                      <PutCell value={fmt4(pe.delta)} />
                      <PutCell value={fmt4(pe.theta)} />
                      <PutCell value={fmt4(pe.gamma)} />
                      <PutCell value={fmt4(pe.vega)} />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && rows.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-[var(--text-muted)] gap-3">
            {!marketOpen ? (
              <>
                <Clock size={32} className="opacity-40" />
                <p className="text-sm">Market is closed — data will be available during trading hours.</p>
                <p className="text-[10px]">Mon–Fri, 9:15 AM – 3:30 PM IST</p>
              </>
            ) : (
              <>
                <AlertCircle size={32} className="opacity-40" />
                <p className="text-sm">No Greeks data available for this expiry.</p>
              </>
            )}
            <button
              onClick={fetchGreeks}
              disabled={cooldown > 0}
              className="text-[11px] border border-[var(--border-primary)] rounded px-3 py-1 hover:border-[var(--accent-primary)] transition-colors disabled:opacity-40"
            >
              {cooldown > 0 ? `Wait ${cooldown}s` : "Try Again"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OptionChain;
