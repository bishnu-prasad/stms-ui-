import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw, ExternalLink, FileText, CheckCircle2, AlertTriangle,
  XCircle, Server, ArrowUpRight, ChevronRight, Activity,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  customers, platformServices, aiInsights, activityFeed, revenueMonthly,
} from "../../data/ownerMockData";
import { useLocation } from "wouter";

// ─── Animated Counter ─────────────────────────────────────────
function Counter({
  value, prefix = "", suffix = "", decimals = 0,
}: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const dur = 1000;
    const start = Date.now();
    const raf = requestAnimationFrame(function tick() {
      const t = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(ease * value);
      if (t < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [value]);
  const fmt = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString("en-IN");
  return <>{prefix}{fmt}{suffix}</>;
}

// ─── Fade-Up Wrapper ──────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section Label ────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
      {children}
    </div>
  );
}

// ─── Service Status Dot ───────────────────────────────────────
const dot = {
  healthy: "#10B981",
  warning: "#F59E0B",
  down: "#EF4444",
};

// ─── Incidents (mock) ─────────────────────────────────────────
const incidents = [
  { id: 1, severity: "critical", customer: "BSNL", region: "North", issue: "28 sites offline — power outage", impact: "High", team: "NOC L2", status: "open" },
  { id: 2, severity: "critical", customer: "Vodafone Idea", region: "West", issue: "SMPS failure cluster — 14 sites", impact: "High", team: "Field Ops", status: "investigating" },
  { id: 3, severity: "warning", customer: "MTS India", region: "East", issue: "Battery voltage below threshold", impact: "Medium", team: "NOC L1", status: "open" },
  { id: 4, severity: "warning", customer: "Vodafone Idea", region: "Gujarat", issue: "Mains fail — 42 sites", impact: "Medium", team: "NOC L1", status: "acknowledged" },
  { id: 5, severity: "critical", customer: "BSNL", region: "UP", issue: "Communication loss — 18 towers", impact: "High", team: "Field Ops", status: "open" },
];

const sevConfig = {
  critical: { label: "Critical", color: "#DC2626", bg: "#FEF2F2", dot: "#EF4444" },
  warning: { label: "Warning", color: "#D97706", bg: "#FFFBEB", dot: "#F59E0B" },
  info: { label: "Info", color: "#2563EB", bg: "#EFF6FF", dot: "#3B82F6" },
};

const statusBadge: Record<string, { bg: string; color: string }> = {
  open: { bg: "#FEF2F2", color: "#DC2626" },
  investigating: { bg: "#FFFBEB", color: "#D97706" },
  acknowledged: { bg: "#EFF6FF", color: "#2563EB" },
  resolved: { bg: "#ECFDF5", color: "#059669" },
};

// ─── Main Component ───────────────────────────────────────────
export default function OwnerOverview() {
  const [, setLocation] = useLocation();
  const [lastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const criticalCount = incidents.filter((i) => i.severity === "critical").length;
  const topCustomers = customers.slice(0, 5);
  const revenueData = revenueMonthly.map((m) => ({ month: m.month, value: m.revenue / 100000 }));

  const healthyServices = platformServices.filter((s) => s.status === "healthy").length;
  const totalServices = platformServices.length;

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }

  return (
    <div
      className="space-y-8 pb-10"
      style={{ fontFamily: "'Inter Variable', 'Inter', system-ui, sans-serif" }}
    >
      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — Executive Status Banner
      ═══════════════════════════════════════════════════════ */}
      <FadeUp delay={0}>
        <div
          className="rounded-2xl px-7 py-6"
          style={{
            background: "#ffffff",
            border: "1px solid #E2E8F0",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            {/* Left */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: "#10B981",
                    boxShadow: "0 0 0 3px rgba(16,185,129,0.15)",
                  }}
                />
                <span className="text-sm font-semibold text-slate-600">
                  Platform Status — Operating Normally
                </span>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <span className="text-[32px] font-bold text-slate-900 tracking-tight leading-none">
                  99.96%
                </span>
                <span className="text-sm text-slate-400 font-medium">Platform Availability</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-slate-500 font-medium">
                <span><span className="font-bold text-slate-800">124</span> Active Customers</span>
                <span className="text-slate-200">·</span>
                <span><span className="font-bold text-slate-800">8,462</span> Sites</span>
                <span className="text-slate-200">·</span>
                <span><span className="font-bold text-slate-800">18</span> Vendors</span>
                <span className="text-slate-200">·</span>
                <span
                  className="font-bold"
                  style={{ color: criticalCount > 0 ? "#DC2626" : "#10B981" }}
                >
                  {criticalCount} Critical Issues
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Last updated{" "}
                {Math.round((Date.now() - lastUpdated.getTime()) / 60000) || "< 1"} minute{" "}
                ago
              </div>
            </div>

            {/* Right — Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer transition-colors"
                style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F1F5F9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8FAFC"; }}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <button
                onClick={() => setLocation("/owner/platform-health")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer transition-colors"
                style={{ border: "1px solid #E2E8F0", background: "#F8FAFC" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F1F5F9"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8FAFC"; }}
              >
                <Activity className="w-3.5 h-3.5" />
                Incident Center
              </button>
              <button
                onClick={() => setLocation("/owner/reports")}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer transition-colors"
                style={{ background: "#1E293B" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#0F172A"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1E293B"; }}
              >
                <FileText className="w-3.5 h-3.5" />
                View Reports
              </button>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — Platform Health Summary (4 cards only)
      ═══════════════════════════════════════════════════════ */}
      <FadeUp delay={0.05}>
        <SectionLabel>Platform Health</SectionLabel>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Platform Health",
              value: "99.96%",
              sub: "Healthy",
              subColor: "#10B981",
              icon: CheckCircle2,
              iconColor: "#10B981",
            },
            {
              title: "Customers",
              value: "124",
              sub: "All Active",
              subColor: "#64748B",
              icon: CheckCircle2,
              iconColor: "#10B981",
            },
            {
              title: "Infrastructure",
              value: `${healthyServices}/${totalServices}`,
              sub: "Services Online",
              subColor: "#64748B",
              icon: Server,
              iconColor: "#6366F1",
            },
            {
              title: "Critical Incidents",
              value: String(criticalCount),
              sub: "Needs Attention",
              subColor: "#DC2626",
              icon: AlertTriangle,
              iconColor: "#DC2626",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl px-5 py-5"
              style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {card.title}
                </span>
                <card.icon className="w-4 h-4 shrink-0" style={{ color: card.iconColor }} />
              </div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums tracking-tight">
                {card.value}
              </div>
              <div
                className="text-xs font-semibold mt-1"
                style={{ color: card.subColor }}
              >
                {card.sub}
              </div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — Platform Overview (one clean panel)
      ═══════════════════════════════════════════════════════ */}
      <FadeUp delay={0.08}>
        <SectionLabel>Platform Overview</SectionLabel>
        <div
          className="bg-white rounded-xl px-6 py-5"
          style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {[
              { label: "Customers", value: 124, prefix: "", suffix: "" },
              { label: "Sites", value: 8462, prefix: "", suffix: "" },
              { label: "Devices", value: 61220, prefix: "", suffix: "" },
              { label: "Monthly Revenue", value: 1.82, prefix: "₹", suffix: " Cr", decimals: 2 },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col px-5 py-1 ${i === 0 ? "pl-0" : ""}`}
              >
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  {item.label}
                </span>
                <span className="text-xl font-bold text-slate-900 tabular-nums">
                  <Counter
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    decimals={item.decimals ?? 0}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 + 5 — Map & Incidents (side by side on xl)
      ═══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* ── Section 4: Global India Map ───────────────────── */}
        <FadeUp delay={0.1} >
          <div
            className="xl:col-span-2 bg-white rounded-xl p-5 h-full"
            style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <SectionLabel>Site Distribution — India</SectionLabel>
            <div className="relative" style={{ height: 260 }}>
              {/* Simplified India SVG */}
              <svg viewBox="0 0 320 380" className="absolute inset-0 w-full h-full">
                <path
                  d="M120,30 L160,25 L195,40 L215,55 L235,80 L248,110 L258,145 L262,180 L255,220 L242,255 L228,280 L212,300 L195,315 L175,325 L158,315 L142,300 L128,285 L115,265 L105,240 L98,215 L100,185 L96,160 L100,130 L108,105 L112,80 L116,55 Z"
                  fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5"
                />
                <path d="M155,315 L162,335 L158,352 L152,335 L148,318 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />

                {/* Region markers */}
                {[
                  { name: "North", cx: 155, cy: 95, sites: 2840, status: "healthy" },
                  { name: "West", cx: 110, cy: 180, sites: 2180, status: "warning" },
                  { name: "South", cx: 168, cy: 280, sites: 1920, status: "healthy" },
                  { name: "East", cx: 220, cy: 145, sites: 980, status: "healthy" },
                  { name: "Central", cx: 160, cy: 195, sites: 542, status: "healthy" },
                ].map((r) => (
                  <g key={r.name}>
                    <circle
                      cx={r.cx} cy={r.cy}
                      r={r.sites > 2000 ? 9 : r.sites > 1000 ? 7 : 5}
                      fill={dot[r.status as keyof typeof dot]}
                      fillOpacity={0.85}
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <text x={r.cx} y={r.cy + 20} textAnchor="middle" fontSize="9" fill="#64748B" fontWeight="600">
                      {r.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-2 text-[11px] font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />Healthy
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />Warning
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />Offline
              </span>
            </div>
          </div>
        </FadeUp>

        {/* ── Section 5: Active Incidents ───────────────────── */}
        <FadeUp delay={0.12}>
          <div
            className="xl:col-span-3 bg-white rounded-xl overflow-hidden"
            style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <SectionLabel>Active Incidents</SectionLabel>
              <button
                onClick={() => setLocation("/owner/platform-health")}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
              >
                View Incident Center <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <table className="w-full text-xs">
              <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
                <tr>
                  {["Sev", "Customer", "Region", "Issue", "Team", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-400 text-[10px] uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {incidents.map((inc) => {
                  const sc = sevConfig[inc.severity as keyof typeof sevConfig];
                  const st = statusBadge[inc.status];
                  return (
                    <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full" style={{ background: sc.dot }} />
                          <span className="font-semibold text-[10px] uppercase" style={{ color: sc.color }}>{sc.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{inc.customer}</td>
                      <td className="px-4 py-3 text-slate-400">{inc.region}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate">{inc.issue}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{inc.team}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold capitalize" style={{ background: st.bg, color: st.color }}>
                          {inc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-[11px] font-semibold text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors">View</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — Customer Health (Top 5)
      ═══════════════════════════════════════════════════════ */}
      <FadeUp delay={0.14}>
        <div
          className="bg-white rounded-xl overflow-hidden"
          style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <SectionLabel>Customer Health</SectionLabel>
            <button
              onClick={() => setLocation("/owner/customers")}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
            >
              View All Customers <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <table className="w-full text-xs">
            <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
              <tr>
                {["Customer", "Plan", "Sites", "Health Score", "Uptime", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-2.5 font-semibold text-slate-400 text-[10px] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topCustomers.map((c) => {
                const hColor = { Healthy: "#10B981", Warning: "#F59E0B", Critical: "#EF4444", Offline: "#94A3B8" }[c.health];
                const sColor = { active: "#10B981", trial: "#F59E0B", expired: "#EF4444", suspended: "#94A3B8" }[c.status];
                const healthScore = Math.round((c.healthySites / c.sites) * 100);
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ background: "#1E293B" }}
                        >
                          {c.logo}
                        </div>
                        <span className="font-semibold text-slate-800">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[11px] font-semibold text-slate-500">{c.plan}</span>
                    </td>
                    <td className="px-5 py-3 font-semibold text-slate-700 tabular-nums">{c.sites.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-100">
                          <div className="h-full rounded-full" style={{ width: `${healthScore}%`, background: hColor }} />
                        </div>
                        <span className="font-bold tabular-nums text-[11px]" style={{ color: hColor }}>{healthScore}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-semibold tabular-nums text-slate-700">{c.uptime}%</td>
                    <td className="px-5 py-3">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-semibold capitalize"
                        style={{ background: `${sColor}12`, color: sColor }}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </FadeUp>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — Infrastructure Status
      ═══════════════════════════════════════════════════════ */}
      <FadeUp delay={0.16}>
        <SectionLabel>Infrastructure Status</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {platformServices.map((svc) => {
            const statusDot = dot[svc.status];
            const statusLabel = { healthy: "Healthy", warning: "Degraded", down: "Down" }[svc.status];
            const statusTextColor = { healthy: "#10B981", warning: "#D97706", down: "#DC2626" }[svc.status];
            return (
              <div
                key={svc.name}
                className="bg-white rounded-xl p-4"
                style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: statusDot }} />
                  {svc.status === "healthy" && (
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: statusDot, opacity: 0.5 }}
                    />
                  )}
                </div>
                <div className="text-[11px] font-bold text-slate-700 leading-tight mb-2">{svc.name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold" style={{ color: statusTextColor }}>{statusLabel}</span>
                  <span className="text-[10px] text-slate-400 tabular-nums">{svc.responseTime}ms</span>
                </div>
              </div>
            );
          })}
        </div>
      </FadeUp>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8 + 9 — AI Summary & Revenue (row)
      ═══════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* ── Section 8: AI Executive Summary ──────────────── */}
        <FadeUp delay={0.18}>
          <div
            className="xl:col-span-2 bg-white rounded-xl p-5 h-full"
            style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <SectionLabel>Platform Insights</SectionLabel>
              <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded" style={{ background: "#F1F5F9" }}>
                AI · Updated 6m ago
              </span>
            </div>
            <div className="space-y-3">
              {[
                { text: "Battery failures increased 8% in North Region — 142 sites affected across BSNL and Airtel.", sev: "warning" },
                { text: "Two enterprise customers (BSNL, MTS India) require subscription renewal within 8 days.", sev: "critical" },
                { text: "Vendor Delta SLA compliance dropped to 91.2% — below contracted 98% threshold.", sev: "warning" },
                { text: "Revenue expected to increase by 6% this month based on renewal pipeline.", sev: "positive" },
                { text: "South Region showing abnormal alarm frequency — 4.8x baseline across 284 sites.", sev: "warning" },
                { text: "Storage utilization reached 85%. At current rate, threshold in approximately 18 days.", sev: "warning" },
              ].map((item, i) => {
                const dotC = { warning: "#F59E0B", critical: "#EF4444", positive: "#10B981", info: "#6366F1" }[item.sev];
                return (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: dotC }} />
                    <p className="text-[12px] text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>

        {/* ── Section 9: Revenue Snapshot ───────────────────── */}
        <FadeUp delay={0.20}>
          <div
            className="xl:col-span-3 bg-white rounded-xl p-5 h-full"
            style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center justify-between mb-1">
              <SectionLabel>Revenue Snapshot</SectionLabel>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <ArrowUpRight className="w-3.5 h-3.5" /> +5.8% MoM
              </span>
            </div>
            <div className="mb-4">
              <span className="text-[11px] text-slate-400 font-medium">Monthly Revenue Trend — Jan to Jul 2026</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="revSnap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E293B" stopOpacity={0.08} />
                    <stop offset="95%" stopColor="#1E293B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip
                  contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
                  formatter={(v: number) => [`₹${v.toFixed(1)}L`, "Revenue"]}
                />
                <Area type="monotone" dataKey="value" stroke="#1E293B" strokeWidth={2} fill="url(#revSnap)" dot={false} activeDot={{ r: 4, fill: "#1E293B" }} />
              </AreaChart>
            </ResponsiveContainer>

            {/* Mini Stats Row */}
            <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
              {[
                { label: "MRR", value: "₹1.82 Cr" },
                { label: "ARR", value: "₹21.8 Cr" },
                { label: "Growth", value: "+5.8%" },
                { label: "Renewals Today", value: "2" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-sm font-bold text-slate-900">{s.value}</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ═══════════════════════════════════════════════════════
          SECTION 10 — Recent Platform Activity
      ═══════════════════════════════════════════════════════ */}
      <FadeUp delay={0.22}>
        <div
          className="bg-white rounded-xl p-5"
          style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>Recent Platform Activity</SectionLabel>
            <button className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 cursor-pointer transition-colors flex items-center gap-1">
              View audit log <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ background: "#F1F5F9" }} />
            <div className="space-y-3">
              {activityFeed.slice(0, 10).map((event) => (
                <div key={event.id} className="flex items-start gap-4 pl-1">
                  {/* Timeline dot */}
                  <div
                    className="w-5 h-5 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs shrink-0 z-10 mt-0.5"
                    style={{ fontSize: "10px" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-baseline gap-3 pb-3 border-b border-slate-50 last:border-0">
                    <span className="text-[10px] font-bold text-slate-300 tabular-nums whitespace-nowrap font-mono">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[12px] font-semibold text-slate-700">{event.action}</span>
                      <span className="text-[11px] text-slate-400 ml-2">{event.detail}</span>
                    </div>
                    <span className="text-[10px] text-slate-300 ml-auto whitespace-nowrap shrink-0">{event.actor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
