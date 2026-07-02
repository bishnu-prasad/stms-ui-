import { useState } from "react";
import { motion } from "framer-motion";
import { WidgetCard } from "@/components/WidgetCard";
import {
  mockKPIs,
  mockCriticalSites,
  mockActivityFeed,
  mockSeverityTimeline,
  mockBatteryRanking,
  mockRevenueLeakage,
  mockSites,
} from "@/data/mockData";
import {
  Activity,
  AlertTriangle,
  Battery,
  IndianRupee,
  Clock,
  MapPin,
  Cpu,
  TrendingDown,
  TrendingUp,
  Download,
  RefreshCw,
  Wifi,
  WifiOff,
  Signal,
  Globe,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

function stagger(i: number) {
  return { ...fade, transition: { delay: i * 0.07, duration: 0.35 } };
}

function SectionHeading({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-foreground tracking-tight">{label}</h2>
      {sub && <p className="text-sm text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  );
}

function SectionDivider({ id }: { id: string }) {
  return <div id={id} className="pt-10" />;
}

function KPICard({
  title,
  value,
  icon: Icon,
  accentClass,
  trend,
  trendLabel,
  delay,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  accentClass: string;
  trend?: "up" | "down";
  trendLabel?: string;
  delay: number;
}) {
  return (
    <motion.div
      {...stagger(delay)}
      className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-default"
      data-testid={`kpi-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
        <div className={`p-2 rounded-lg ${accentClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-3xl font-bold font-mono tracking-tight text-foreground">{value}</div>
      {trendLabel && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trendLabel}
        </div>
      )}
    </motion.div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    CRITICAL: "bg-red-100 text-red-700 border-red-200",
    HIGH: "bg-orange-100 text-orange-700 border-orange-200",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-200",
    LOW: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${map[severity] ?? map.LOW}`}>
      {severity}
    </span>
  );
}

function SourceBadge({ source }: { source: string }) {
  const map: Record<string, string> = {
    Battery: "bg-amber-100 text-amber-700",
    Mains: "bg-emerald-100 text-emerald-700",
    Offline: "bg-slate-100 text-slate-600",
    "No Data": "bg-blue-100 text-blue-600",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${map[source] ?? map["No Data"]}`}>
      {source}
    </span>
  );
}

export default function Home() {
  const [threshold, setThreshold] = useState([15]);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-0">

      {/* ── OVERVIEW ── */}
      <section id="overview" className="scroll-mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Test bsijs </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Real-time network intelligence — India operations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" data-testid="btn-schedule"><RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh</Button>
            <Button variant="outline" size="sm" data-testid="btn-export"><Download className="w-3.5 h-3.5 mr-1.5" /> Export Report</Button>
            <Button size="sm" data-testid="btn-acknowledge">Acknowledge All</Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard title="Total Sites" value={mockKPIs.totalSites.toLocaleString()} icon={Signal} accentClass="bg-blue-50 text-blue-600" trend="up" trendLabel="+12 since yesterday" delay={0} />
          <KPICard title="Active Alarms" value={mockKPIs.activeAlarms.toString()} icon={AlertTriangle} accentClass="bg-red-50 text-red-500" trend="down" trendLabel="−4 resolved" delay={1} />
          <KPICard title="Battery Hours" value={`${mockKPIs.batteryHours.toLocaleString()}h`} icon={Battery} accentClass="bg-amber-50 text-amber-500" trend="down" trendLabel="−18h since 6h ago" delay={2} />
          <KPICard title="Revenue Leakage" value={`₹${(mockKPIs.revenueLeakage / 100000).toFixed(1)}L`} icon={IndianRupee} accentClass="bg-red-50 text-red-500" trend="up" trendLabel="+₹0.3L this week" delay={3} />
        </div>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          {/* Network Intelligence Score */}
          <motion.div {...stagger(4)} className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col items-center justify-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Network Intelligence Score</p>
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="44" fill="none"
                  stroke="#10B981" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${94.7 * 2.765} 276.5`}
                  initial={{ strokeDasharray: "0 276.5" }}
                  animate={{ strokeDasharray: `${94.7 * 2.765} 276.5` }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold font-mono text-emerald-600">94.7</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">/ 100</span>
              </div>
            </div>
            <div className="flex gap-4 text-xs text-center">
              <div><div className="font-semibold text-foreground">98.2%</div><div className="text-muted-foreground">Uptime</div></div>
              <div className="w-px bg-border" />
              <div><div className="font-semibold text-foreground">63</div><div className="text-muted-foreground">Alarms</div></div>
              <div className="w-px bg-border" />
              <div><div className="font-semibold text-foreground">5</div><div className="text-muted-foreground">Critical</div></div>
            </div>
          </motion.div>

          {/* Severity Timeline */}
          <motion.div {...stagger(5)} className="lg:col-span-2 bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-foreground">Severity Timeline — Last 24h</p>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Critical</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> High</span>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockSeverityTimeline} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} interval={3} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: "hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                  <Area type="monotone" dataKey="critical" stroke="#EF4444" fill="url(#gc)" strokeWidth={2} />
                  <Area type="monotone" dataKey="high" stroke="#F59E0B" fill="url(#gh)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Critical Sites + Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <motion.div {...stagger(6)} className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <p className="text-sm font-semibold text-foreground">Top Critical Sites</p>
              <Badge variant="destructive" className="text-[10px] font-bold">5 CRITICAL</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Severity</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Site</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Issue</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCriticalSites.map((site, i) => (
                    <motion.tr
                      key={site.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.06 }}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-5 py-3"><SeverityBadge severity={site.severity} /></td>
                      <td className="px-5 py-3 font-medium text-foreground">{site.name}</td>
                      <td className="px-5 py-3 text-muted-foreground text-xs flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{site.location}</td>
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{site.issue}</td>
                      <td className="px-5 py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Investigate</Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Live Activity Feed */}
          <motion.div {...stagger(7)} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <p className="text-sm font-semibold text-foreground">Live Activity Feed</p>
            </div>
            <div className="p-5 relative border-l-2 border-border ml-8 mt-2 space-y-5">
              {mockActivityFeed.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="relative pl-5"
                >
                  <div className={`absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 border-card shadow-sm ${item.severity === "CRITICAL" ? "bg-red-500" :
                      item.severity === "HIGH" ? "bg-amber-400" :
                        "bg-emerald-500"
                    }`} />
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[11px] font-mono text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm text-foreground leading-snug">{item.message}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OPERATIONAL CRITICAL ALERTS ── */}
      <SectionDivider id="operations" />
      <section className="scroll-mt-16">
        <SectionHeading label="Operational Critical Alerts" sub="Battery risk, active alarms and data blackouts — action required" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Battery Risk */}
          <div className="bg-card border border-l-4 border-l-amber-400 border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Battery className="w-4 h-4 text-amber-500" />
              <p className="text-sm font-semibold text-foreground">High Battery Reliance Sites</p>
            </div>
            <div className="space-y-3">
              {[
                { name: "Vill Baijana", hours: "2334.0h", color: "text-red-600" },
                { name: "Rudawal", hours: "418.0h", color: "text-red-500" },
                { name: "KATRAJ TUNNEL II", hours: "338.0h", color: "text-amber-600" },
                { name: "UDPR-PREM NAGAR", hours: "118.0h", color: "text-amber-500" },
                { name: "Jodhpur engg college", hours: "114.0h", color: "text-amber-400" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-foreground truncate">{s.name}</span>
                  <span className={`text-sm font-mono font-semibold ${s.color}`}>{s.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alarms */}
          <div className="bg-card border border-l-4 border-l-red-500 border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <p className="text-sm font-semibold text-foreground">Sites with Active Alarms</p>
            </div>
            <div className="space-y-3">
              {[
                { name: "PALL_KAMLAGRESH COLONY", count: 11 },
                { name: "UDPR-PREM NAGAR", count: 8 },
                { name: "Vill Baijana", count: 7 },
                { name: "malikpur", count: 4 },
                { name: "Rudawal", count: 3 },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-foreground truncate">{s.name}</span>
                  <span className={`text-sm font-mono font-bold ${s.count >= 8 ? "text-red-600" : s.count >= 5 ? "text-orange-500" : "text-amber-500"}`}>{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sites without data */}
          <div className="bg-card border border-l-4 border-l-blue-400 border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <WifiOff className="w-4 h-4 text-blue-500" />
              <p className="text-sm font-semibold text-foreground">Sites without Data</p>
            </div>
            <div className="space-y-3">
              {["Ganpatipur Barhapur", "Khandauli Agra LTP", "Dathingara", "Kushmara New", "Byonti Khurd"].map((name, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-foreground truncate">{name}</span>
                  <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">No Data</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ANALYTICS ── */}
      <SectionDivider id="analytics" />
      <section className="scroll-mt-16">
        <SectionHeading label="Performance Analytics" sub="Revenue leakage, leakage threshold and power source breakdown" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {/* Leakage Threshold Config */}
          <WidgetCard title="Global Leakage Threshold" delay={0}>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Threshold Limit</span>
                <span className="text-2xl font-mono font-bold text-primary">{threshold[0]} min</span>
              </div>
              <Slider value={threshold} onValueChange={setThreshold} max={60} step={1} className="w-full" data-testid="threshold-slider" />
              <div className="flex justify-between gap-2">
                {[0, 5, 10, 15, 30].map((val) => (
                  <Button
                    key={val}
                    variant={threshold[0] === val ? "default" : "outline"}
                    size="sm"
                    onClick={() => setThreshold([val])}
                    className="flex-1 text-xs"
                    data-testid={`preset-${val}`}
                  >
                    {val}m
                  </Button>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-start gap-2 text-amber-700">
                  <Cpu className="w-4 h-4 mt-0.5 shrink-0" />
                  <p className="text-xs leading-relaxed">Estimated Impact: <strong>Medium</strong>. Increasing by 5 min reduces critical alerts by ~12% but raises leakage risk by ~2.4%.</p>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleSave}
                data-testid="save-threshold"
                variant={saved ? "outline" : "default"}
              >
                {saved ? "Saved!" : "Apply Global Threshold"}
              </Button>
            </div>
          </WidgetCard>

          {/* Revenue Leakage Chart */}
          <WidgetCard title="Revenue Leakage — National, Last 30 days" className="lg:col-span-2" delay={1}>
            <div className="flex gap-4 mb-4">
              <div className="bg-muted px-3 py-2 rounded-lg border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Peak Load</div>
                <div className="font-mono font-bold text-sm">3.45 KW</div>
              </div>
              <div className="bg-muted px-3 py-2 rounded-lg border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Running Load</div>
                <div className="font-mono font-bold text-sm">2.05 KW</div>
              </div>
              <div className="bg-muted px-3 py-2 rounded-lg border border-border">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg SO Load</div>
                <div className="font-mono font-bold text-sm text-red-600">5.49 KW</div>
              </div>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockRevenueLeakage} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="bracket" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: "hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                  <Area type="step" dataKey="sites" stroke="#2563EB" fill="url(#rl)" strokeWidth={2} name="Site Count" />
                  <Area type="monotone" dataKey="avgLoad" stroke="#EF4444" fill="none" strokeWidth={2} strokeDasharray="4 2" name="Avg Load KW" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </WidgetCard>
        </div>

        {/* Faulty Power + Source Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Premium Lollipop Chart */}
          <WidgetCard title="Faulty Power Supply (Mains/DG Discharging)" className="lg:col-span-2" delay={2}>
            <div className="flex flex-col gap-6 py-2">
              {[
                { name: "PALL_KAMLAGRESH COLONY", mains: 2050, dg: 180, total: 2230 },
                { name: "Vill Baijana", mains: 340, dg: 0, total: 340 },
                { name: "KATRAJ TUNNEL II", mains: 254.5, dg: 0, total: 254.5 },
              ].map((site, i) => {
                const max = 2230;
                const mainsPct = (site.mains / max) * 100;
                const dgPct = (site.dg / max) * 100;
                return (
                  <motion.div
                    key={site.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                    className="flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold text-foreground truncate max-w-[220px]">{site.name}</span>
                      <span className="text-xs font-mono text-muted-foreground ml-2 shrink-0">{site.total.toFixed(0)} min</span>
                    </div>
                    {/* Mains bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] w-10 text-emerald-600 font-semibold shrink-0 text-right">Mains</span>
                      <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${mainsPct}%` }}
                          transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 relative"
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white shadow-sm translate-x-1/2" />
                        </motion.div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 w-14 shrink-0">{site.mains.toFixed(0)}m</span>
                    </div>
                    {/* DG bar */}
                    {site.dg > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] w-10 text-red-500 font-semibold shrink-0 text-right">DG</span>
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${dgPct}%` }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-red-300 to-red-500 relative"
                          >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-sm translate-x-1/2" />
                          </motion.div>
                        </div>
                        <span className="text-[10px] font-mono text-red-600 w-14 shrink-0">{site.dg.toFixed(0)}m</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
              <div className="flex items-center gap-5 pt-1 border-t border-border mt-1">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-1.5 rounded-full bg-emerald-500 inline-block" />Mains Leakage</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-1.5 rounded-full bg-red-400 inline-block" />DG Leakage</span>
              </div>
            </div>
          </WidgetCard>

          {/* Premium Arc Gauge */}
          <WidgetCard title="Source Breakdown" delay={3}>
            <div className="flex flex-col items-center justify-center h-full gap-4 py-2">
              <div className="relative w-44 h-28">
                <svg viewBox="0 0 180 100" className="w-full h-full overflow-visible">
                  {/* Track arc (semi-circle) */}
                  <path
                    d="M 10 90 A 80 80 0 0 1 170 90"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  {/* DG segment (tiny orange slice at end) */}
                  <motion.path
                    d="M 10 90 A 80 80 0 0 1 170 90"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: 229.1 }}
                    transition={{ duration: 0, delay: 0 }}
                  />
                  {/* Mains segment (blue, 91.18% of arc) */}
                  <motion.path
                    d="M 10 90 A 80 80 0 0 1 170 90"
                    fill="none"
                    stroke="url(#arcGrad)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 22.1 }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                  />
                  <defs>
                    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  {/* Center value */}
                  <text x="90" y="82" textAnchor="middle" fontSize="22" fontWeight="700" fill="#2563EB" fontFamily="ui-monospace, monospace">91.2%</text>
                  <text x="90" y="96" textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="ui-sans-serif, sans-serif" letterSpacing="0.08em">MAINS</text>
                </svg>
              </div>

              {/* Legend cards */}
              <div className="flex gap-3 w-full">
                <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 mb-1">Mains</div>
                  <div className="text-xl font-bold font-mono text-blue-700">91.18%</div>
                  <div className="text-[10px] text-blue-400 mt-0.5">26 sites</div>
                </div>
                <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 mb-1">DG</div>
                  <div className="text-xl font-bold font-mono text-amber-600">8.82%</div>
                  <div className="text-[10px] text-amber-400 mt-0.5">2 sites</div>
                </div>
              </div>
            </div>
          </WidgetCard>
        </div>
      </section>

      {/* ── ENERGY & BATTERY ── */}
      <SectionDivider id="energy" />
      <section className="scroll-mt-16">
        <SectionHeading label="Energy & Battery Intelligence" sub="Battery risk ranking and circle-wise uptime by region" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Premium Battery Risk Ranking */}
          <WidgetCard title="Battery Risk Ranking — Hours Remaining" delay={0}>
            <div className="flex flex-col gap-3">
              {[
                { name: "Maharashtra", hours: 2334, max: 2334 },
                { name: "Telangana", hours: 418, max: 2334 },
                { name: "Uttar Pradesh", hours: 338, max: 2334 },
                { name: "Rajasthan", hours: 118, max: 2334 },
                { name: "Mumbai", hours: 114, max: 2334 },
              ].map((item, i) => {
                const pct = (item.hours / item.max) * 100;
                const isHealthy = item.hours > 1000;
                const isWarning = item.hours > 200 && item.hours <= 1000;
                const isCritical = item.hours <= 200;
                const barColor = isHealthy
                  ? "from-blue-400 to-blue-600"
                  : isWarning
                    ? "from-amber-300 to-amber-500"
                    : "from-red-400 to-red-600";
                const textColor = isHealthy ? "text-blue-700" : isWarning ? "text-amber-600" : "text-red-600";
                const bgColor = isHealthy ? "bg-blue-50 text-blue-700 border-blue-100" : isWarning ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-red-50 text-red-600 border-red-100";
                const label = isHealthy ? "Healthy" : isWarning ? "Warning" : "Critical";
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm font-medium text-foreground">{item.name}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${bgColor}`}>
                          {label}
                        </span>
                      </div>
                      <span className={`text-sm font-mono font-bold ${textColor}`}>{item.hours.toLocaleString()}h</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.1 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${barColor} shadow-sm`}
                      />
                    </div>
                  </motion.div>
                );
              })}
              <div className="flex items-center gap-5 pt-2 mt-1 border-t border-border text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />Healthy &gt;1000h</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Warning 200–1000h</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Critical &lt;200h</span>
              </div>
            </div>
          </WidgetCard>

          {/* Radial Ring Gauges — Circle-wise Uptime */}
          <WidgetCard title="Circle-wise Uptime" delay={1}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { region: "Uttar Pradesh", avg: 97.5 },
                { region: "Mumbai", avg: 97.3 },
                { region: "India", avg: 93.7 },
                { region: "Rajasthan", avg: 92.3 },
                { region: "Maharashtra", avg: 87.7 },
                { region: "Telangana", avg: 83.3 },
              ].map((item, i) => {
                const r = 34;
                const circ = 2 * Math.PI * r; // 213.6
                const filled = (item.avg / 100) * circ;
                const gap = circ - filled;
                const isHigh = item.avg >= 95;
                const isMid = item.avg >= 85;
                const arcColor = isHigh ? "#10B981" : isMid ? "#F59E0B" : "#EF4444";
                const bgBadge = isHigh
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : isMid
                    ? "bg-amber-50 text-amber-700 border-amber-100"
                    : "bg-red-50 text-red-600 border-red-100";
                const label = isHigh ? "Healthy" : isMid ? "Warning" : "Critical";

                return (
                  <motion.div
                    key={item.region}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-default group"
                  >
                    {/* Ring */}
                    <div className="relative w-20 h-20">
                      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                        {/* Track */}
                        <circle cx="40" cy="40" r={r} fill="none" stroke="#f1f5f9" strokeWidth="7" />
                        {/* Arc */}
                        <motion.circle
                          cx="40" cy="40" r={r}
                          fill="none"
                          stroke={arcColor}
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeDasharray={`${circ}`}
                          initial={{ strokeDashoffset: circ }}
                          animate={{ strokeDashoffset: gap }}
                          transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease: "easeOut" }}
                        />
                      </svg>
                      {/* Center text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-sm font-bold font-mono leading-none" style={{ color: arcColor }}>
                          {item.avg.toFixed(1)}
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium leading-none mt-0.5">%</span>
                      </div>
                      {/* Pulse dot on arc tip for critical */}
                      {!isHigh && (
                        <motion.div
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                          className="absolute top-1 right-1 w-2 h-2 rounded-full"
                          style={{ backgroundColor: arcColor }}
                        />
                      )}
                    </div>

                    {/* Region name */}
                    <span className="text-[11px] font-semibold text-foreground text-center leading-tight">
                      {item.region}
                    </span>

                    {/* Status badge */}
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${bgBadge}`}>
                      {label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-5 pt-3 mt-2 border-t border-border text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />Healthy ≥95%</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />Warning 85–95%</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />Critical &lt;85%</span>
            </div>
          </WidgetCard>

        </div>
      </section>

      {/* ── SITES ── */}
      <SectionDivider id="sites" />
      <section className="scroll-mt-16">
        <SectionHeading label="Live Site Energy Status" sub="Real-time voltage, source and status per site" />

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Site Name</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Source</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Voltage</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Uptime</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {mockSites.map((site, i) => (
                  <motion.tr
                    key={site.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    data-testid={`site-row-${site.id}`}
                  >
                    <td className="px-5 py-3 font-medium text-foreground">{site.name}</td>
                    <td className="px-5 py-3"><SourceBadge source={site.type} /></td>
                    <td className="px-5 py-3 font-mono text-sm text-muted-foreground">{site.voltage}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${site.status === "Up" ? "text-emerald-600" :
                          site.status === "Down" ? "text-red-500" :
                            site.status === "Alarm" ? "text-amber-500" :
                              "text-blue-500"
                        }`}>
                        {site.status === "Up" ? <Wifi className="w-3 h-3" /> : site.status === "Down" ? <WifiOff className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                        {site.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-[80px]">
                          <div
                            className={`h-full rounded-full ${site.uptime >= 95 ? "bg-emerald-500" : site.uptime >= 80 ? "bg-amber-400" : "bg-red-400"}`}
                            style={{ width: `${site.uptime}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{site.uptime}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right text-xs text-muted-foreground">{site.lastUpdate}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── NETWORK / MAP ── */}
      <SectionDivider id="network" />
      <section className="scroll-mt-16 pb-10">
        <SectionHeading label="Real-time Status Map" sub="Geographic distribution of sites across India" />

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden h-[400px] flex items-center justify-center">
          <div className="text-center">
            <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium text-foreground">Interactive Map</p>
            <p className="text-xs text-muted-foreground mt-1">Navigate to the <strong>Network</strong> section for the full map view</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => window.location.href = "/network"}>Open Map View</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
