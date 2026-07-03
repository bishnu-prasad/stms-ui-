import { NOCPageShell } from "../../components/NOCPageShell";

const regions = [
  { name: "North", cx: 155, cy: 95, sites: 2840, online: 2780, color: "#10B981" },
  { name: "West", cx: 110, cy: 185, sites: 2880, online: 2710, color: "#F59E0B" },
  { name: "South", cx: 168, cy: 278, sites: 3120, online: 3080, color: "#10B981" },
  { name: "East", cx: 218, cy: 148, sites: 1980, online: 1940, color: "#10B981" },
  { name: "Central", cx: 162, cy: 198, sites: 1630, online: 1590, color: "#10B981" },
];

export default function SiteHealth() {
  const kpis = [
    { label: "North Region", value: "2,780", sub: "Online / 2,840 total", color: "text-emerald-600" },
    { label: "West Region", value: "2,710", sub: "Warning – 170 offline", color: "text-amber-600" },
    { label: "South Region", value: "3,080", sub: "Online / 3,120 total", color: "text-emerald-600" },
    { label: "East Region", value: "1,940", sub: "Online / 1,980 total", color: "text-emerald-600" },
  ];

  return (
    <NOCPageShell title="Site Health" subtitle="Regional site distribution and health status" kpis={kpis}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Map */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-4">Site Distribution – India</div>
          <div className="relative" style={{ height: 360 }}>
            <svg viewBox="0 0 320 380" className="absolute inset-0 w-full h-full">
              <path d="M120,30 L160,25 L195,40 L215,55 L235,80 L248,110 L258,145 L262,180 L255,220 L242,255 L228,280 L212,300 L195,315 L175,325 L158,315 L142,300 L128,285 L115,265 L105,240 L98,215 L100,185 L96,160 L100,130 L108,105 L112,80 L116,55 Z"
                fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <path d="M155,315 L162,335 L158,352 L152,335 L148,318 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              {regions.map(r => {
                const pct = Math.round((r.online / r.sites) * 100);
                const isWarning = r.color === "#F59E0B";
                return (
                  <g key={r.name}>
                    <circle cx={r.cx} cy={r.cy} r={r.sites > 2500 ? 12 : r.sites > 1800 ? 9 : 7}
                      fill={r.color} fillOpacity={0.85} stroke="white" strokeWidth="2" />
                    {isWarning && <circle cx={r.cx} cy={r.cy} r={r.sites > 2500 ? 16 : 12} fill="none" stroke={r.color} strokeWidth="1.5" strokeOpacity="0.4" />}
                    <text x={r.cx} y={r.cy + (r.sites > 2500 ? 24 : 20)} textAnchor="middle" fontSize="9" fill="#475569" fontWeight="700">{r.name}</text>
                    <text x={r.cx} y={r.cy + (r.sites > 2500 ? 34 : 30)} textAnchor="middle" fontSize="8" fill="#94A3B8">{pct}%</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="flex items-center gap-5 mt-2 text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Healthy</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" />Warning</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" />Critical</span>
          </div>
        </div>

        {/* Regional breakdown */}
        <div className="space-y-4">
          {regions.map(r => {
            const pct = Math.round((r.online / r.sites) * 100);
            const offline = r.sites - r.online;
            return (
              <div key={r.name} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-slate-800 dark:text-white">{r.name} Region</div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${pct >= 99 ? "text-emerald-700 bg-emerald-100" : "text-amber-700 bg-amber-100"}`}>{pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: r.color }} />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>{r.online.toLocaleString()} online</span>
                  <span className={offline > 100 ? "text-amber-600 font-bold" : ""}>{offline} offline</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </NOCPageShell>
  );
}
