import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Building2,
  Clock,
  Zap,
  BatteryCharging,
  Download,
  Search,
  Filter,
  Calendar,
  Sparkles,
  Printer,
  FileSpreadsheet,
  FileCode,
  FileCheck,
  ZapOff,
  Activity,
  Flame,
  TrendingUp,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  RefreshCw,
  Share2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* DATA TYPES                                                                 */
/* -------------------------------------------------------------------------- */

interface SiteEnergyRecord {
  date: string;
  gensetKwh: number;
  gridKwh: number;
  batteryKwh: number;
  totalKwh: number;
}

interface LeakageRecord {
  id: number;
  siteId: string;
  siteName: string;
  date: string;
  sources: string[];
  mainsLeak: string;
  dgLeak: string;
  batteryLeak: string;
  totalLeak: string;
  mainsRun: string;
  dgRun: string;
  battRun: string;
}

interface ConsumptionRecord {
  id: number;
  siteId: string;
  siteName: string;
  date: string;
  mainsRun: string;
  dgRun: string;
  batteryRun: string;
  totalRun: string;
  mainsPct: number;
  dgPct: number;
  batteryPct: number;
  mainsWatt: number;
}

/* -------------------------------------------------------------------------- */
/* PRESERVED DATASETS FROM SCREENSHOTS                                       */
/* -------------------------------------------------------------------------- */

const initialSiteEnergy: SiteEnergyRecord[] = [
  { date: "2026-07-02", gensetKwh: 14.2, gridKwh: 128.5, batteryKwh: 32.1, totalKwh: 174.8 },
  { date: "2026-07-01", gensetKwh: 0.0, gridKwh: 154.0, batteryKwh: 18.6, totalKwh: 172.6 },
  { date: "2026-06-30", gensetKwh: 8.4, gridKwh: 112.0, batteryKwh: 45.0, totalKwh: 165.4 },
  { date: "2026-06-29", gensetKwh: 22.1, gridKwh: 98.6, batteryKwh: 60.2, totalKwh: 180.9 },
  { date: "2026-06-28", gensetKwh: 0.0, gridKwh: 160.4, batteryKwh: 12.0, totalKwh: 172.4 },
];

const initialLeakage: LeakageRecord[] = [
  {
    id: 1,
    siteId: "0000459507",
    siteName: "KATRAJ TUNNEL II",
    date: "2026-07-02",
    sources: ["Mains"],
    mainsLeak: "00:14",
    dgLeak: "00:00",
    batteryLeak: "00:00",
    totalLeak: "00:14",
    mainsRun: "00:36",
    dgRun: "00:00",
    battRun: "00:14",
  },
  {
    id: 2,
    siteId: "0000534730",
    siteName: "PALI_KAMLAGRESH COLONY",
    date: "2026-07-02",
    sources: ["Mains"],
    mainsLeak: "01:49",
    dgLeak: "00:00",
    batteryLeak: "00:00",
    totalLeak: "01:49",
    mainsRun: "01:48",
    dgRun: "00:00",
    battRun: "01:49",
  },
  {
    id: 3,
    siteId: "0000579397",
    siteName: "Vill Baijana",
    date: "2026-07-02",
    sources: ["Mains", "DG"],
    mainsLeak: "00:04",
    dgLeak: "00:02",
    batteryLeak: "00:00",
    totalLeak: "00:06",
    mainsRun: "00:12",
    dgRun: "00:06",
    battRun: "00:06",
  },
  {
    id: 4,
    siteId: "0000459507",
    siteName: "KATRAJ TUNNEL II",
    date: "2026-07-01",
    sources: ["Mains"],
    mainsLeak: "00:08",
    dgLeak: "00:00",
    batteryLeak: "00:00",
    totalLeak: "00:08",
    mainsRun: "00:24",
    dgRun: "00:00",
    battRun: "00:08",
  },
  {
    id: 5,
    siteId: "0000534730",
    siteName: "PALI_KAMLAGRESH COLONY",
    date: "2026-07-01",
    sources: ["Mains"],
    mainsLeak: "01:39",
    dgLeak: "00:00",
    batteryLeak: "00:00",
    totalLeak: "01:39",
    mainsRun: "01:36",
    dgRun: "00:00",
    battRun: "01:39",
  },
];

const initialConsumption: ConsumptionRecord[] = [
  {
    id: 61,
    siteId: "0000508663",
    siteName: "Jodhpur engg college",
    date: "2026-07-02",
    mainsRun: "14:00",
    dgRun: "00:00",
    batteryRun: "00:30",
    totalRun: "14:30",
    mainsPct: 96.55,
    dgPct: 0.0,
    batteryPct: 3.45,
    mainsWatt: 66.34,
  },
  {
    id: 62,
    siteId: "0000459507",
    siteName: "KATRAJ TUNNEL II",
    date: "2026-07-02",
    mainsRun: "10:54",
    dgRun: "00:00",
    batteryRun: "00:52",
    totalRun: "11:46",
    mainsPct: 92.55,
    dgPct: 0.0,
    batteryPct: 7.45,
    mainsWatt: 17.0,
  },
  {
    id: 63,
    siteId: "0000509489",
    siteName: "malikpur",
    date: "2026-07-02",
    mainsRun: "00:00",
    dgRun: "00:00",
    batteryRun: "00:00",
    totalRun: "00:00",
    mainsPct: 0.0,
    dgPct: 0.0,
    batteryPct: 0.0,
    mainsWatt: 0.0,
  },
  {
    id: 64,
    siteId: "0000566897",
    siteName: "NANA PETH II",
    date: "2026-07-02",
    mainsRun: "16:30",
    dgRun: "00:00",
    batteryRun: "00:00",
    totalRun: "16:30",
    mainsPct: 100.0,
    dgPct: 0.0,
    batteryPct: 0.0,
    mainsWatt: 0.0,
  },
  {
    id: 65,
    siteId: "0000582323",
    siteName: "Nava Village Open Plot",
    date: "2026-07-02",
    mainsRun: "00:00",
    dgRun: "00:00",
    batteryRun: "00:00",
    totalRun: "00:00",
    mainsPct: 0.0,
    dgPct: 0.0,
    batteryPct: 0.0,
    mainsWatt: 0.0,
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN REPORTS COMPONENT                                                     */
/* -------------------------------------------------------------------------- */

export default function ReportsPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const tabFromUrl = searchParams.get("tab") || "site";

  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [searchQuery, setSearchQuery] = useState("");
  const [reportType, setReportType] = useState("Total Energy Consumption");
  const [reportBy, setReportBy] = useState("Date wise Report");
  const [selectedSite, setSelectedSite] = useState("All Sites");
  const [dateRange, setDateRange] = useState("2026-06-03 - 2026-07-02");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");
    if (tab === "site" || tab === "leakage" || tab === "energy" || tab === "consumption") {
      setActiveTab(tab);
    }
  }, [location, window.location.search]);

  // EXPORT SIMULATION
  const handleExport = (format: string) => {
    alert(`Exporting ${activeTab.toUpperCase()} Report in ${format.toUpperCase()} format.`);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* 1. EXECUTIVE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Telemetry Intelligence & Audit Reports
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60">
              AUDIT GOVERNANCE ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comprehensive power grid consumption, generator usage, disruption leakage time, and site runtime analytics
          </p>
        </div>

        {/* Global Export Bar */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleExport("Excel")}
            variant="outline"
            size="sm"
            className="h-8 text-xs font-semibold gap-1 text-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> Excel
          </Button>
          <Button
            onClick={() => handleExport("CSV")}
            variant="outline"
            size="sm"
            className="h-8 text-xs font-semibold gap-1 text-blue-700 border-blue-200 hover:bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300"
          >
            <FileText className="w-3.5 h-3.5" /> CSV
          </Button>
          <Button
            onClick={() => handleExport("PDF")}
            className="h-8 text-xs font-semibold gap-1 bg-slate-900 text-white hover:bg-slate-800 shadow-xs dark:bg-slate-100 dark:text-slate-900"
          >
            <Download className="w-3.5 h-3.5" /> Export PDF
          </Button>
        </div>
      </div>

      {/* 2. SUB-TABS SWITCHER */}
      <div className="border-b border-slate-200 dark:border-border flex gap-6 overflow-x-auto pt-1 pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab("site")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "site"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Site Overview</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            Energy Log
          </span>
          {activeTab === "site" && (
            <motion.div
              layoutId="reports-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("leakage")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "leakage"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Site Leakage Time</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
            Disruption Log
          </span>
          {activeTab === "leakage" && (
            <motion.div
              layoutId="reports-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("energy")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "energy"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Energy & Power</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
            Grid & Rectifier
          </span>
          {activeTab === "energy" && (
            <motion.div
              layoutId="reports-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("consumption")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "consumption"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <BatteryCharging className="w-4 h-4" />
          <span>Site Consumption</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            Runtime Share %
          </span>
          {activeTab === "consumption" && (
            <motion.div
              layoutId="reports-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>
      </div>

      {/* ==================================================================== */}
      {/* SUB-TAB 1: SITE OVERVIEW                                            */}
      {/* ==================================================================== */}
      {activeTab === "site" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Controls Bar */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none"
              >
                <option value="Total Energy Consumption">Total Energy Consumption</option>
                <option value="Grid Reliance Audit">Grid Reliance Audit</option>
                <option value="DG Genset Fuel Audit">DG Genset Fuel Audit</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Date Range
              </label>
              <Input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="h-9 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Report By
              </label>
              <select
                value={reportBy}
                onChange={(e) => setReportBy(e.target.value)}
                className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none"
              >
                <option value="Date wise Report">Date wise Report</option>
                <option value="Site wise Report">Site wise Report</option>
                <option value="Monthly Summary">Monthly Summary</option>
              </select>
            </div>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs">
              <span className="text-2xl font-extrabold font-mono text-blue-600 dark:text-blue-400 block">
                653.50 kWh
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5 block">Total Grid Consumed</span>
            </div>
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs">
              <span className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400 block">
                44.70 kWh
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5 block">Consumed-Genset (DG 1)</span>
            </div>
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs">
              <span className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block">
                167.90 kWh
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5 block">Battery Cycle Consumption</span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-5 py-3.5 text-left">DATE</th>
                    <th className="px-5 py-3.5 text-center">CONSUMED-GENSET 1 (KWH)</th>
                    <th className="px-5 py-3.5 text-center">TOTAL GRID UNIT CONSUMED (KWH)</th>
                    <th className="px-5 py-3.5 text-center">BATTERY CYCLE CONSUMPTION (KWH)</th>
                    <th className="px-5 py-3.5 text-right">TOTAL ENERGY (KWH)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {initialSiteEnergy.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                        {row.date}
                      </td>
                      <td className="px-5 py-4 text-center font-mono font-bold text-amber-600 dark:text-amber-400">
                        {row.gensetKwh.toFixed(2)} kWh
                      </td>
                      <td className="px-5 py-4 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                        {row.gridKwh.toFixed(2)} kWh
                      </td>
                      <td className="px-5 py-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {row.batteryKwh.toFixed(2)} kWh
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-extrabold text-slate-900 dark:text-slate-100">
                        {row.totalKwh.toFixed(2)} kWh
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================================================================== */}
      {/* SUB-TAB 2: SITE LEAKAGE TIME                                         */}
      {/* ==================================================================== */}
      {activeTab === "leakage" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Controls */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Interval</span>
                <select className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Site Scope</span>
                <select
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none"
                >
                  <option value="All Sites">All Monitored Sites</option>
                  <option value="0000459507">0000459507 - KATRAJ TUNNEL II</option>
                  <option value="0000534730">0000534730 - PALI_KAMLAGRESH COLONY</option>
                </select>
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search site ID or name (⌘K)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-4 py-3.5 text-left">#</th>
                    <th className="px-4 py-3.5 text-left">SITE ID & NAME</th>
                    <th className="px-4 py-3.5 text-left">DATE</th>
                    <th className="px-4 py-3.5 text-center">LEAKAGE SOURCES</th>
                    <th className="px-4 py-3.5 text-center">MAINS LEAK</th>
                    <th className="px-4 py-3.5 text-center">DG LEAK</th>
                    <th className="px-4 py-3.5 text-center">BATTERY LEAK</th>
                    <th className="px-4 py-3.5 text-center bg-amber-50/50 dark:bg-amber-950/20">TOTAL LEAK</th>
                    <th className="px-4 py-3.5 text-center">MAINS RUN</th>
                    <th className="px-4 py-3.5 text-center">DG RUN</th>
                    <th className="px-4 py-3.5 text-center">BATT RUN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {initialLeakage.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-4 py-4 font-mono font-bold text-slate-400">{row.id}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-xs">
                            #{row.siteId}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                            {row.siteName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-mono text-slate-600 dark:text-slate-400">
                        {row.date}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {row.sources.map((src, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center font-mono font-bold text-slate-800 dark:text-slate-200">
                        {row.mainsLeak}
                      </td>
                      <td className="px-4 py-4 text-center font-mono text-slate-500">
                        {row.dgLeak}
                      </td>
                      <td className="px-4 py-4 text-center font-mono text-slate-500">
                        {row.batteryLeak}
                      </td>
                      <td className="px-4 py-4 text-center font-mono font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50/30 dark:bg-amber-950/10">
                        {row.totalLeak}
                      </td>
                      <td className="px-4 py-4 text-center font-mono text-slate-400">
                        {row.mainsRun}
                      </td>
                      <td className="px-4 py-4 text-center font-mono text-slate-400">
                        {row.dgRun}
                      </td>
                      <td className="px-4 py-4 text-center font-mono text-slate-400">
                        {row.battRun}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================================================================== */}
      {/* SUB-TAB 3: ENERGY & POWER                                            */}
      {/* ==================================================================== */}
      {activeTab === "energy" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* PDF Generator Control Toolbar */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-5 shadow-2xs grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Equipment Scope
              </label>
              <select className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none">
                <option value="All">All Controllers (SMPS / SPS / OPE)</option>
                <option value="SPS">SPS Controllers</option>
                <option value="SMPS">SMPS Rectifiers</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Telemetry Sections
              </label>
              <select className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none">
                <option value="All">All Sections (Energy, Power, Voltage, Freq)</option>
                <option value="Voltage">Grid Voltage RMS (L1, L2, L3)</option>
                <option value="Frequency">Frequency Stability & Power Factor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Site
              </label>
              <select className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none">
                <option value="0000459507">0000459507 - KATRAJ TUNNEL II</option>
                <option value="0000508663">0000508663 - Jodhpur engg college</option>
              </select>
            </div>

            <div>
              <Button
                onClick={() => handleExport("PDF")}
                className="w-full h-9 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Generate PDF Report
              </Button>
            </div>
          </div>

          {/* Energy & Power Diagnostics Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Grid Voltage RMS</span>
                <Badge variant="outline" className="font-mono text-[10px]">L1 / L2 / L3</Badge>
              </div>
              <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                230.4 V <span className="text-xs font-normal text-slate-400">± 1.2%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[94%]" />
              </div>
              <span className="text-[11px] text-slate-500 block">Optimal Phase Balance (Phase Shift 120°)</span>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Power Factor (cos φ)</span>
                <Badge variant="outline" className="font-mono text-[10px] bg-emerald-50 text-emerald-700">HIGH</Badge>
              </div>
              <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                0.98 <span className="text-xs font-normal text-slate-400">cos φ</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[98%]" />
              </div>
              <span className="text-[11px] text-slate-500 block">Capacitor Bank Active Correction</span>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Rectifier Efficiency</span>
                <Badge variant="outline" className="font-mono text-[10px]">SMPS</Badge>
              </div>
              <div className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                95.4% <span className="text-xs font-normal text-slate-400">Utilization</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[95%]" />
              </div>
              <span className="text-[11px] text-slate-500 block">DC Bus Operating Voltage: 54.2V</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================================================================== */}
      {/* SUB-TAB 4: SITE CONSUMPTION                                          */}
      {/* ==================================================================== */}
      {activeTab === "consumption" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Controls Bar */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Date Scope</span>
                <Input type="text" value="2026-06-26 to 2026-07-02" readOnly className="h-9 text-xs font-mono w-48" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-1">Interval</span>
                <select className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search site name or ID (⌘K)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-4 py-3.5 text-left">#</th>
                    <th className="px-4 py-3.5 text-left">SITE ID & NAME</th>
                    <th className="px-4 py-3.5 text-left">DATE</th>
                    <th className="px-4 py-3.5 text-center text-blue-600">MAINS (HH:MM)</th>
                    <th className="px-4 py-3.5 text-center text-amber-600">DG (HH:MM)</th>
                    <th className="px-4 py-3.5 text-center text-emerald-600">BATTERY (HH:MM)</th>
                    <th className="px-4 py-3.5 text-center font-extrabold">TOTAL (HH:MM)</th>
                    <th className="px-4 py-3.5 text-center text-blue-600">MAINS %</th>
                    <th className="px-4 py-3.5 text-center text-amber-600">DG %</th>
                    <th className="px-4 py-3.5 text-center text-emerald-600">BATTERY %</th>
                    <th className="px-4 py-3.5 text-right font-bold">MAINS ENERGY (WATT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {initialConsumption.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-4 py-4 font-mono font-bold text-slate-400">{row.id}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">
                            #{row.siteId}
                          </span>
                          <span className="font-bold text-slate-900 dark:text-slate-100 text-xs capitalize">
                            {row.siteName}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-mono text-slate-500">{row.date}</td>
                      <td className="px-4 py-4 text-center font-mono font-bold text-blue-600">{row.mainsRun}</td>
                      <td className="px-4 py-4 text-center font-mono text-amber-600">{row.dgRun}</td>
                      <td className="px-4 py-4 text-center font-mono text-emerald-600">{row.batteryRun}</td>
                      <td className="px-4 py-4 text-center font-mono font-extrabold text-slate-900 dark:text-slate-100">{row.totalRun}</td>
                      <td className="px-4 py-4 text-center font-mono font-bold text-blue-600">{row.mainsPct}%</td>
                      <td className="px-4 py-4 text-center font-mono text-amber-600">{row.dgPct}%</td>
                      <td className="px-4 py-4 text-center font-mono text-emerald-600">{row.batteryPct}%</td>
                      <td className="px-4 py-4 text-right font-mono font-bold text-slate-900 dark:text-slate-100">
                        {row.mainsWatt.toFixed(2)} W
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
