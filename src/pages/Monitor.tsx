import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import SiteDashboard from "./SiteDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  WifiOff,
  Zap,
  Battery,
  Radio,
  Activity,
  Download,
  Search,
  Filter,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  Eye,
  Settings,
  Flame,
  ShieldCheck,
  Building2,
  Bell,
  Cpu,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Clock,
  AlertTriangle,
  ChevronDown,
  CheckCircle2,
  UserCheck,
  FileSpreadsheet,
  FileCode,
  Printer,
  PieChart,
  TrendingUp,
  Layers,
  MoreVertical,
  Calendar,
  X,
  ExternalLink,
  ShieldAlert,
  UserPlus,
  Check,
  RotateCcw,
  FileText,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* DATA STRUCTURES FOR SITES & ALARMS MONITORING                             */
/* -------------------------------------------------------------------------- */

interface FleetSite {
  id: string;
  name: string;
  equipment: string;
  vendor: "Vertiv" | "Delta" | "Intelux" | "N/A";
  status: "ONLINE" | "NO DATA" | "ALARMS" | "CRITICAL";
  reported: string;
  source: "Mains" | "Battery" | "DG" | "N/A";
  mainsHours: number;
  mainsPct: number;
  dgHours: number;
  dgPct: number;
  battHours: number;
  battPct: number;
  score: number;
  circle: string;
  loadKw: string;
}

export interface AlarmItem {
  id: string;
  siteId: string;
  siteName: string;
  circle: string;
  severity: "CRITICAL" | "MAJOR" | "MINOR" | "CLOSED" | "ACKNOWLEDGED";
  status: "Open" | "Investigating" | "Assigned" | "Acknowledged" | "Resolved" | "Closed";
  equipment: string;
  vendor: "Vertiv" | "Delta" | "Intelux" | "VNT";
  tags: string[];
  reportedRaw: string;
  reportedAgo: string;
  duration: string;
  durationMinutes: number;
  assignedEngineer?: {
    name: string;
    role: string;
    avatar: string;
  };
  telemetry: {
    dcVoltage: string;
    batteryCurrent: string;
    roomTemp: string;
    gridStatus: string;
  };
}

/* -------------------------------------------------------------------------- */
/* MOCK DATASETS                                                             */
/* -------------------------------------------------------------------------- */

const mockFleetData: FleetSite[] = [
  {
    id: "0000581861",
    name: "SATKHANDA",
    equipment: "SMPS 48V / 300A",
    vendor: "Vertiv",
    status: "ONLINE",
    reported: "45s ago",
    source: "Mains",
    mainsHours: 23.4,
    mainsPct: 97.5,
    dgHours: 0.0,
    dgPct: 0,
    battHours: 0.6,
    battPct: 2.5,
    score: 98,
    circle: "Rajasthan",
    loadKw: "3.2 kW",
  },
  {
    id: "0000590915",
    name: "Khandauli Agra LTP",
    equipment: "Telemetry Lost",
    vendor: "N/A",
    status: "NO DATA",
    reported: "4h 12m ago",
    source: "N/A",
    mainsHours: 0.0,
    mainsPct: 0,
    dgHours: 0.0,
    dgPct: 0,
    battHours: 0.0,
    battPct: 0,
    score: 0,
    circle: "Uttar Pradesh",
    loadKw: "--",
  },
  {
    id: "0000508711",
    name: "Rudawal",
    equipment: "SMPS 48V + SPS Unit",
    vendor: "Delta",
    status: "ALARMS",
    reported: "1m ago",
    source: "Mains",
    mainsHours: 19.1,
    mainsPct: 79.7,
    dgHours: 0.0,
    dgPct: 0,
    battHours: 1.7,
    battPct: 7.1,
    score: 80,
    circle: "Rajasthan",
    loadKw: "4.5 kW",
  },
  {
    id: "0000545111",
    name: "Smart City",
    equipment: "OPE Multi-Source Enclosure",
    vendor: "Intelux",
    status: "ONLINE",
    reported: "1m ago",
    source: "Battery",
    mainsHours: 21.6,
    mainsPct: 90.0,
    dgHours: 0.0,
    dgPct: 0,
    battHours: 2.4,
    battPct: 10.0,
    score: 90,
    circle: "Telangana",
    loadKw: "2.8 kW",
  },
  {
    id: "0000512498",
    name: "Nava Village Open Plot",
    equipment: "SMPS 48V Enterprise",
    vendor: "Vertiv",
    status: "CRITICAL",
    reported: "2m ago",
    source: "Battery",
    mainsHours: 9.6,
    mainsPct: 40.0,
    dgHours: 1.2,
    dgPct: 5.0,
    battHours: 2.9,
    battPct: 12.0,
    score: 42,
    circle: "Maharashtra",
    loadKw: "5.1 kW",
  },
  {
    id: "0000523812",
    name: "NANA PETH II",
    equipment: "SMPS High Capacity",
    vendor: "Delta",
    status: "CRITICAL",
    reported: "3m ago",
    source: "Battery",
    mainsHours: 8.4,
    mainsPct: 35.0,
    dgHours: 0.0,
    dgPct: 0,
    battHours: 3.6,
    battPct: 15.0,
    score: 38,
    circle: "Maharashtra",
    loadKw: "6.0 kW",
  },
  {
    id: "0000534920",
    name: "UDPR-PREM NAGAR",
    equipment: "OPE Smart Cabinet",
    vendor: "Intelux",
    status: "ALARMS",
    reported: "4m ago",
    source: "Mains",
    mainsHours: 15.6,
    mainsPct: 65.0,
    dgHours: 1.4,
    dgPct: 6.0,
    battHours: 3.4,
    battPct: 14.0,
    score: 68,
    circle: "Rajasthan",
    loadKw: "3.9 kW",
  },
  {
    id: "0000561284",
    name: "Vill Baijana",
    equipment: "SMPS 48V Premium",
    vendor: "Vertiv",
    status: "ALARMS",
    reported: "5m ago",
    source: "Mains",
    mainsHours: 13.9,
    mainsPct: 58.0,
    dgHours: 0.0,
    dgPct: 0,
    battHours: 5.3,
    battPct: 22.0,
    score: 62,
    circle: "Uttar Pradesh",
    loadKw: "4.1 kW",
  },
];

const mockAlarmsList: AlarmItem[] = [
  {
    id: "ALM-9021",
    siteId: "0000509489",
    siteName: "SATKHANDA Open Plot",
    circle: "Rajasthan",
    severity: "CRITICAL",
    status: "Open",
    equipment: "Vertiv SMPS 48V",
    vendor: "Vertiv",
    tags: ["Smoke", "Dg Emergency", "Dg Fail To Stop", "Battery Discharge"],
    reportedRaw: "2026-07-02 16:06:45",
    reportedAgo: "2 min ago",
    duration: "12 min",
    durationMinutes: 12,
    assignedEngineer: {
      name: "Rahul S.",
      role: "L1 NOC Specialist",
      avatar: "RS",
    },
    telemetry: {
      dcVoltage: "43.2 V (Critical Low)",
      batteryCurrent: "-84.2 A (Discharging)",
      roomTemp: "38.5 °C",
      gridStatus: "Mains Outage",
    },
  },
  {
    id: "ALM-9018",
    siteId: "0000459507",
    siteName: "Khandauli Agra LTP",
    circle: "Uttar Pradesh",
    severity: "MAJOR",
    status: "Investigating",
    equipment: "Delta SPS Unit",
    vendor: "Delta",
    tags: ["Battery Discharge", "Mains Fail"],
    reportedRaw: "2026-07-02 16:06:33",
    reportedAgo: "3 min ago",
    duration: "15 min",
    durationMinutes: 15,
    assignedEngineer: {
      name: "Vikas K.",
      role: "Field Tech (Agra)",
      avatar: "VK",
    },
    telemetry: {
      dcVoltage: "47.8 V",
      batteryCurrent: "-42.0 A",
      roomTemp: "31.2 °C",
      gridStatus: "Phase Voltage Lost",
    },
  },
  {
    id: "ALM-9015",
    siteId: "0000579397",
    siteName: "Rudawal Junction",
    circle: "Rajasthan",
    severity: "MAJOR",
    status: "Acknowledged",
    equipment: "Delta SMPS 48V",
    vendor: "Delta",
    tags: ["Mains Failure", "Dg Run On Load", "Load On Mains", "Dg Fail To Stop", "Battery Discharge", "Mains Fail", "Overload Warning"],
    reportedRaw: "2026-07-02 16:06:32",
    reportedAgo: "3 min ago",
    duration: "42 min",
    durationMinutes: 42,
    assignedEngineer: {
      name: "Priya M.",
      role: "NOC Lead Engineer",
      avatar: "PM",
    },
    telemetry: {
      dcVoltage: "52.4 V",
      batteryCurrent: "+12.5 A (Floating)",
      roomTemp: "34.0 °C",
      gridStatus: "Grid Restored",
    },
  },
  {
    id: "ALM-9012",
    siteId: "0000566897",
    siteName: "Smart City Hub",
    circle: "Telangana",
    severity: "CRITICAL",
    status: "Assigned",
    equipment: "Intelux OPE Cabinet",
    vendor: "Intelux",
    tags: ["Smoke", "Rectifier Over Temperature", "Cabinet Door Open"],
    reportedRaw: "2026-07-02 16:06:26",
    reportedAgo: "4 min ago",
    duration: "1h 05m",
    durationMinutes: 65,
    assignedEngineer: {
      name: "Amit V.",
      role: "L2 Senior Engineer",
      avatar: "AV",
    },
    telemetry: {
      dcVoltage: "45.1 V",
      batteryCurrent: "-62.0 A",
      roomTemp: "54.8 °C (High Alarm)",
      gridStatus: "Mains Normal",
    },
  },
  {
    id: "ALM-9008",
    siteId: "0000534855",
    siteName: "Vill Baijana Tower",
    circle: "Uttar Pradesh",
    severity: "MAJOR",
    status: "Open",
    equipment: "Vertiv SMPS 48V",
    vendor: "Vertiv",
    tags: [
      "Mains Failure",
      "Dg Off",
      "Auto Manual",
      "Load On Grid",
      "Gen Common Fault",
      "Llop Fault",
      "Amf Contactor Mains",
      "Gen Alternator Fault",
      "Low Fuel Alarm",
    ],
    reportedRaw: "2026-07-02 16:05:55",
    reportedAgo: "4 min ago",
    duration: "2h 14m",
    durationMinutes: 134,
    telemetry: {
      dcVoltage: "48.2 V",
      batteryCurrent: "-28.4 A",
      roomTemp: "36.1 °C",
      gridStatus: "Mains Outage",
    },
  },
  {
    id: "ALM-9003",
    siteId: "0000508711",
    siteName: "Rudawal Substation",
    circle: "Rajasthan",
    severity: "MINOR",
    status: "Acknowledged",
    equipment: "Delta SPS Unit",
    vendor: "Delta",
    tags: ["Llop Input", "Llop Fault", "Amf Contactor Mains"],
    reportedRaw: "2026-07-02 16:05:02",
    reportedAgo: "5 min ago",
    duration: "3h 40m",
    durationMinutes: 220,
    assignedEngineer: {
      name: "Kiran T.",
      role: "NOC Operator",
      avatar: "KT",
    },
    telemetry: {
      dcVoltage: "53.8 V",
      batteryCurrent: "0.0 A",
      roomTemp: "29.4 °C",
      gridStatus: "Mains Normal",
    },
  },
  {
    id: "ALM-8998",
    siteId: "0000508663",
    siteName: "KATRAJ TUNNEL II",
    circle: "Maharashtra",
    severity: "CRITICAL",
    status: "Investigating",
    equipment: "Delta SMPS High Cap",
    vendor: "Delta",
    tags: ["Amf Contactor Mains", "Sheltertemphigh", "Battery Discharge"],
    reportedRaw: "2026-07-02 16:03:49",
    reportedAgo: "7 min ago",
    duration: "4h 10m",
    durationMinutes: 250,
    assignedEngineer: {
      name: "Rahul S.",
      role: "L1 NOC Specialist",
      avatar: "RS",
    },
    telemetry: {
      dcVoltage: "44.0 V",
      batteryCurrent: "-92.1 A",
      roomTemp: "48.9 °C",
      gridStatus: "Grid Voltage Fluctuation",
    },
  },
  {
    id: "ALM-8990",
    siteId: "0000512498",
    siteName: "UDPR-PREM NAGAR",
    circle: "Rajasthan",
    severity: "MINOR",
    status: "Resolved",
    equipment: "Intelux OPE Cabinet",
    vendor: "Intelux",
    tags: ["Mains Fail", "Load On Mains"],
    reportedRaw: "2026-07-02 15:45:10",
    reportedAgo: "25 min ago",
    duration: "1 day",
    durationMinutes: 1440,
    assignedEngineer: {
      name: "Suresh P.",
      role: "Field Tech (Udaipur)",
      avatar: "SP",
    },
    telemetry: {
      dcVoltage: "54.1 V",
      batteryCurrent: "+8.2 A",
      roomTemp: "27.5 °C",
      gridStatus: "Mains Restored",
    },
  },
  {
    id: "ALM-8982",
    siteId: "0000523812",
    siteName: "NANA PETH II",
    circle: "Maharashtra",
    severity: "CLOSED",
    status: "Closed",
    equipment: "VNT Power Controller",
    vendor: "VNT",
    tags: ["Door Open", "Rectifier Module 1 Fail"],
    reportedRaw: "2026-07-02 14:20:00",
    reportedAgo: "1h 50m ago",
    duration: "45 min",
    durationMinutes: 45,
    assignedEngineer: {
      name: "Priya M.",
      role: "NOC Lead Engineer",
      avatar: "PM",
    },
    telemetry: {
      dcVoltage: "54.0 V",
      batteryCurrent: "0.0 A",
      roomTemp: "26.8 °C",
      gridStatus: "Mains Normal",
    },
  },
];

const mockTopProblemSites = [
  { siteId: "0000509489", name: "SATKHANDA Open Plot", circle: "Rajasthan", count: 8, critical: 3, uptime: "84.2%", health: 48 },
  { siteId: "0000512498", name: "Nava Village Open Plot", circle: "Maharashtra", count: 6, critical: 2, uptime: "79.1%", health: 42 },
  { siteId: "0000523812", name: "NANA PETH II", circle: "Maharashtra", count: 5, critical: 2, uptime: "81.0%", health: 38 },
  { siteId: "0000534855", name: "Vill Baijana Tower", circle: "Uttar Pradesh", count: 5, critical: 1, uptime: "88.4%", health: 62 },
  { siteId: "0000566897", name: "Smart City Hub", circle: "Telangana", count: 4, critical: 1, uptime: "90.1%", health: 68 },
];

/* -------------------------------------------------------------------------- */
/* MAIN MONITOR COMPONENT                                                     */
/* -------------------------------------------------------------------------- */

export default function Monitor() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const subFromUrl = searchParams.get("sub") || "sites";

  const [activeSub, setActiveSub] = useState(subFromUrl);
  const [inspectingSiteId, setInspectingSiteId] = useState<string | null>(
    searchParams.get("inspect")
  );

  // SITES TAB FILTERS
  const [siteHealthFilter, setSiteHealthFilter] = useState("all");
  const [siteStatusFilter, setSiteStatusFilter] = useState("all");
  const [siteVendorFilter, setSiteVendorFilter] = useState("all");
  const [siteSearchQuery, setSiteSearchQuery] = useState("");

  // ALARMS TAB FILTERS & SELECTION
  const [alarmSeverityFilter, setAlarmSeverityFilter] = useState("all");
  const [alarmStatusFilter, setAlarmStatusFilter] = useState("all");
  const [alarmCircleFilter, setAlarmCircleFilter] = useState("all");
  const [alarmVendorFilter, setAlarmVendorFilter] = useState("all");
  const [alarmSearchQuery, setAlarmSearchQuery] = useState("");
  const [expandedAlarmId, setExpandedAlarmId] = useState<string | null>("ALM-9021");
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [expandedTagsAlarmId, setExpandedTagsAlarmId] = useState<string | null>(null);

  useEffect(() => {
    const handleUrlChange = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const sub = searchParams.get("sub");
      if (sub === "sites" || sub === "alarms") {
        setActiveSub(sub);
      }
      const inspect = searchParams.get("inspect");
      setInspectingSiteId(inspect);
    };
    window.addEventListener("popstate", handleUrlChange);
    handleUrlChange();
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const handleInspectSite = (siteId: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("inspect", siteId);
    setLocation(window.location.pathname + "?" + params.toString());
    setInspectingSiteId(siteId);
  };

  const handleBackToList = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("inspect");
    params.delete("tab");
    setLocation(window.location.pathname + "?" + params.toString());
    setInspectingSiteId(null);
  };

  // FILTER LOGIC FOR SITES
  const filteredSites = mockFleetData.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(siteSearchQuery.toLowerCase()) ||
      site.id.toLowerCase().includes(siteSearchQuery.toLowerCase()) ||
      site.equipment.toLowerCase().includes(siteSearchQuery.toLowerCase()) ||
      site.circle.toLowerCase().includes(siteSearchQuery.toLowerCase());

    const matchesStatus =
      siteStatusFilter === "all" ||
      site.status.toLowerCase().replace(" ", "") === siteStatusFilter.toLowerCase();

    const matchesVendor =
      siteVendorFilter === "all" ||
      site.vendor.toLowerCase() === siteVendorFilter.toLowerCase();

    const matchesHealth =
      siteHealthFilter === "all" ||
      (siteHealthFilter === "critical" && site.score < 50) ||
      (siteHealthFilter === "warning" && site.score >= 50 && site.score <= 80) ||
      (siteHealthFilter === "healthy" && site.score > 80);

    return matchesSearch && matchesStatus && matchesVendor && matchesHealth;
  });

  // FILTER LOGIC FOR ALARMS
  const filteredAlarms = mockAlarmsList.filter((alarm) => {
    const matchesSearch =
      alarm.id.toLowerCase().includes(alarmSearchQuery.toLowerCase()) ||
      alarm.siteId.toLowerCase().includes(alarmSearchQuery.toLowerCase()) ||
      alarm.siteName.toLowerCase().includes(alarmSearchQuery.toLowerCase()) ||
      alarm.equipment.toLowerCase().includes(alarmSearchQuery.toLowerCase()) ||
      alarm.tags.some((t) => t.toLowerCase().includes(alarmSearchQuery.toLowerCase()));

    const matchesSeverity =
      alarmSeverityFilter === "all" ||
      alarm.severity.toLowerCase() === alarmSeverityFilter.toLowerCase();

    const matchesStatus =
      alarmStatusFilter === "all" ||
      alarm.status.toLowerCase() === alarmStatusFilter.toLowerCase();

    const matchesCircle =
      alarmCircleFilter === "all" ||
      alarm.circle.toLowerCase() === alarmCircleFilter.toLowerCase();

    const matchesVendor =
      alarmVendorFilter === "all" ||
      alarm.vendor.toLowerCase() === alarmVendorFilter.toLowerCase();

    return (
      matchesSearch &&
      matchesSeverity &&
      matchesStatus &&
      matchesCircle &&
      matchesVendor
    );
  });

  let inspectedSite = mockFleetData.find((s) => s.id === inspectingSiteId);

  if (!inspectedSite && inspectingSiteId) {
    const nameMap: Record<string, string> = {
      "0000459507": "KATRAJ TUNNEL II",
      "0000490457": "ACHALPUR",
      "0000508663": "JODHPUR ENGG COLLEGE",
      "0000508711": "RUDAWAL",
      "0000509489": "MALIKPUR",
      "0000530087": "ITBP JODHPUR COW",
      "0000534730": "PALI_KAMLAGRESH COLONY",
      "0000534855": "UDPR-PREM NAGAR",
      "0000581861": "SATKHANDA",
      "0000545111": "Smart City"
    };

    inspectedSite = {
      id: inspectingSiteId,
      name: nameMap[inspectingSiteId] || `SITE-${inspectingSiteId}`,
      equipment: "SPS Unit & SMPS 48V",
      vendor: "Delta",
      status: "ONLINE",
      reported: "45s ago",
      source: "Mains",
      mainsHours: 120.4,
      mainsPct: 90.0,
      dgHours: 8.5,
      dgPct: 6.5,
      battHours: 4.8,
      battPct: 3.5,
      score: 96,
      circle: "Rajasthan",
      loadKw: "2.8 kW"
    };
  }

  if (inspectedSite) {
    return (
      <SiteDashboard site={inspectedSite} onBack={handleBackToList} />
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Top Page Breadcrumb & Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Monitor
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE NOC TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time multi-vendor equipment health, power runtime & telecom alarm management matrix
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Configure Thresholds
          </Button>

          {/* Export Dropdown */}
          <div className="relative">
            <Button
              size="sm"
              onClick={() => setExportDropdownOpen(!exportDropdownOpen)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" /> Export Data <ChevronDown className="w-3 h-3 ml-0.5" />
            </Button>

            {exportDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-border rounded-xl shadow-lg py-1 z-50 text-xs font-medium">
                <button
                  onClick={() => setExportDropdownOpen(false)}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-500" /> Export CSV
                </button>
                <button
                  onClick={() => setExportDropdownOpen(false)}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" /> Export Excel (.xlsx)
                </button>
                <button
                  onClick={() => setExportDropdownOpen(false)}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                >
                  <FileCode className="w-3.5 h-3.5 text-purple-500" /> Export JSON
                </button>
                <button
                  onClick={() => setExportDropdownOpen(false)}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" /> Print Telemetry Stream
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-tabs Navigation Bar (Sites vs Alarms) */}
      <div className="border-b border-slate-200 dark:border-border flex gap-6 overflow-x-auto pt-1 pb-1 scrollbar-none">
        <button
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            params.set("sub", "sites");
            params.delete("inspect");
            setLocation(window.location.pathname + "?" + params.toString());
            setActiveSub("sites");
            setInspectingSiteId(null);
          }}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeSub === "sites"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Sites (Uptime Report)</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            26 Sites
          </span>
          {activeSub === "sites" && (
            <motion.div
              layoutId="monitor-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>

        <button
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            params.set("sub", "alarms");
            params.delete("inspect");
            setLocation(window.location.pathname + "?" + params.toString());
            setActiveSub("alarms");
            setInspectingSiteId(null);
          }}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeSub === "alarms"
              ? "text-rose-600 dark:text-rose-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Alarm Center</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
            82 Active Alarms
          </span>
          {activeSub === "alarms" && (
            <motion.div
              layoutId="monitor-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 dark:bg-rose-400 rounded-full"
            />
          )}
        </button>
      </div>

      {/* ==================================================================== */}
      {/* SUB-TAB 1: SITES (Uptime Report & 6 Metric Cards)                   */}
      {/* ==================================================================== */}
      {activeSub === "sites" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* 6 EXECUTIVE TOP METRIC CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {/* Total Sites */}
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:border-blue-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                  100% FLEET
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-50">26</span>
                  <span className="text-xs text-slate-400">sites</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Total Sites Monitored</p>
              </div>
            </div>

            {/* Offline Sites */}
            <div className="relative bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl p-4 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-rose-400">
                  <WifiOff className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-900/60 px-2 py-0.5 rounded">
                  38% OF FLEET
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-white">10</span>
                  <span className="text-xs text-slate-400">sites</span>
                </div>
                <p className="text-[11px] font-medium text-slate-400 mt-1">Offline Sites</p>
              </div>
            </div>

            {/* On Mains Power */}
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  PRIMARY GRID
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-50">12</span>
                  <span className="text-xs text-slate-400">sites</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">On Mains</p>
              </div>
            </div>

            {/* On Battery Backup */}
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Battery className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">
                  DISCHARGE
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-50">2</span>
                  <span className="text-xs text-slate-400">sites</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">On Battery</p>
              </div>
            </div>

            {/* On DG Generator */}
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:border-rose-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Radio className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">
                  DIESEL
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-50">1</span>
                  <span className="text-xs text-slate-400">site</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">On DG</p>
              </div>
            </div>

            {/* Avg Uptime (Mains) */}
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  UPTIME
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-50">4h</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Avg Uptime (Mains)</p>
              </div>
            </div>
          </div>

          {/* SITES FILTER TOOLBAR */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <button
                onClick={() => setSiteHealthFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  siteHealthFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                All Fleet ({mockFleetData.length})
              </button>
              <button
                onClick={() => setSiteHealthFilter("critical")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  siteHealthFilter === "critical"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900"
                }`}
              >
                Critical &lt;50% (2)
              </button>
              <button
                onClick={() => setSiteHealthFilter("warning")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  siteHealthFilter === "warning"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900"
                }`}
              >
                Warning 50-80% (3)
              </button>
              <button
                onClick={() => setSiteHealthFilter("healthy")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  siteHealthFilter === "healthy"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900"
                }`}
              >
                Healthy &gt;80% (3)
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={siteStatusFilter}
                onChange={(e) => setSiteStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
              >
                <option value="all">Status: All</option>
                <option value="online">Status: Online</option>
                <option value="alarms">Status: Alarms</option>
                <option value="nodata">Status: No Data</option>
                <option value="critical">Status: Critical</option>
              </select>

              <select
                value={siteVendorFilter}
                onChange={(e) => setSiteVendorFilter(e.target.value)}
                className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
              >
                <option value="all">Vendor: All</option>
                <option value="vertiv">Vendor: Vertiv</option>
                <option value="delta">Vendor: Delta</option>
                <option value="intelux">Vendor: Intelux</option>
              </select>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search ID, name or circle (⌘K)..."
                  value={siteSearchQuery}
                  onChange={(e) => setSiteSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>
            </div>
          </div>

          {/* SITES TABLE */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border">
                    <th className="px-4 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider">SITE IDENTIFIER</th>
                    <th className="px-4 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider">EQUIPMENT / CONTROLLER</th>
                    <th className="px-4 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider">STATUS</th>
                    <th className="px-4 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider">ACTIVE SOURCE</th>
                    <th className="px-4 py-3.5 text-right font-bold text-slate-500 uppercase tracking-wider">MAINS (H)</th>
                    <th className="px-4 py-3.5 text-right font-bold text-slate-500 uppercase tracking-wider">DG (H)</th>
                    <th className="px-4 py-3.5 text-right font-bold text-slate-500 uppercase tracking-wider">BATTERY (H)</th>
                    <th className="px-4 py-3.5 text-center font-bold text-slate-500 uppercase tracking-wider">UPTIME SCORE</th>
                    <th className="px-4 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider min-w-[180px]">UPTIME DISTRIBUTION %</th>
                    <th className="px-4 py-3.5 text-right font-bold text-slate-500 uppercase tracking-wider">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredSites.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-4 py-4 text-slate-400 font-mono font-semibold">{idx + 1}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-xs">
                            {item.id}
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-2.5 h-2.5 text-slate-400" />
                            {item.circle}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <Badge variant="outline" className="text-[10px] font-bold font-mono px-1.5 py-0">
                              {item.vendor}
                            </Badge>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                              {item.equipment}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400">Load: {item.loadKw}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                          item.status === "ONLINE"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : item.status === "ALARMS"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                            : item.status === "CRITICAL"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-medium text-xs text-slate-800 dark:text-slate-200">
                        {item.source}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                        {item.mainsHours}h
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-xs text-rose-600 dark:text-rose-400 font-bold">
                        {item.dgHours}h
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">
                        {item.battHours}h
                      </td>
                      <td className="px-4 py-4 text-center font-mono text-xs font-bold">
                        {item.score}%
                      </td>
                      <td className="px-4 py-4">
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                          <div className="h-full bg-emerald-500" style={{ width: `${item.mainsPct}%` }} />
                          <div className="h-full bg-rose-500" style={{ width: `${item.dgPct}%` }} />
                          <div className="h-full bg-amber-500" style={{ width: `${item.battPct}%` }} />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs font-semibold text-blue-600 cursor-pointer"
                          onClick={() => handleInspectSite(item.id)}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" /> Inspect
                        </Button>
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
      {/* SUB-TAB 2: ALARM CENTER (DATADOG / GRAFANA / LINEAR GRADE NOC CENTER) */}
      {/* ==================================================================== */}
      {activeSub === "alarms" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* 1. HERO KPI SUMMARY CARDS (DATADOG / GRAFANA DESIGN) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {/* Total Alarms */}
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                  +3 vs 1h
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-50">82</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Total Active Alarms</p>
              </div>
            </div>

            {/* Critical Alarms */}
            <div className="relative bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl p-4 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-rose-950 border border-rose-800 text-rose-400 flex items-center justify-center">
                  <Flame className="w-4 h-4 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/80 border border-rose-900 px-2 py-0.5 rounded">
                  ACTION REQD
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-white">3</span>
                  <span className="text-xs text-rose-400 font-medium">sites down</span>
                </div>
                <p className="text-[11px] font-medium text-slate-400 mt-1">Critical Faults</p>
              </div>
            </div>

            {/* Major Alarms */}
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-900 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">
                  ATTENTION
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-50">19</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Major Incidents</p>
              </div>
            </div>

            {/* Minor Alarms */}
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                  WARNINGS
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-50">56</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Minor Warnings</p>
              </div>
            </div>

            {/* Closed Today */}
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  96.4% SLA
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-50">48</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Closed Today</p>
              </div>
            </div>

            {/* Acknowledged */}
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                  IN PROGRESS
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-slate-50">34</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">Acknowledged</p>
              </div>
            </div>
          </div>

          {/* 2. ALARM DISTRIBUTION & TOP INSIGHTS PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Alarm Severity Ring Distribution */}
            <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-blue-500" /> Severity Ring Breakdown
                </h3>
                <span className="text-[10px] font-mono text-slate-400">82 Total Active</span>
              </div>

              <div className="flex items-center justify-around my-2">
                {/* Visual Segment Ring Gauge */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-rose-500"
                      strokeDasharray="15, 100"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-amber-500"
                      strokeDasharray="30, 100"
                      strokeDashoffset="-15"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-blue-500"
                      strokeDasharray="45, 100"
                      strokeDashoffset="-45"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold font-mono text-slate-900 dark:text-slate-100">82</span>
                    <span className="text-[9px] text-slate-400 font-medium">Alarms</span>
                  </div>
                </div>

                {/* Ring Breakdown Legend */}
                <div className="flex flex-col gap-1.5 text-xs">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Critical
                    </span>
                    <span className="font-mono font-bold text-rose-600">3 (3.7%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Major
                    </span>
                    <span className="font-mono font-bold text-amber-600">19 (23.1%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Minor
                    </span>
                    <span className="font-mono font-bold text-blue-600">56 (68.3%)</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Closed Today
                    </span>
                    <span className="font-mono font-bold text-emerald-600">48</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Problem Sites */}
            <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" /> Top 5 Problem Sites
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Most Active Faults</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {mockTopProblemSites.map((site) => (
                  <div key={site.siteId} className="py-2 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-900/40 px-1 rounded transition-colors">
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate max-w-[170px]">
                        {site.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{site.siteId} • {site.circle}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-mono font-bold text-rose-600 dark:text-rose-400 block">{site.count} Alarms</span>
                        <span className="text-[10px] text-slate-400">Health: {site.health}%</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] font-mono px-1.5 bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        {site.critical} Crit
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vendor Alarm Breakdown */}
            <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-500" /> Vendor Fault Reliability
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Telemetry Breakdown</span>
              </div>
              <div className="space-y-3 text-xs my-auto">
                <div>
                  <div className="flex justify-between font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">Delta (SMPS & SPS)</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">34 Alarms (41.4%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "41.4%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">Vertiv (Power Systems)</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">29 Alarms (35.3%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: "35.3%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">Intelux (OPE Enclosures)</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">12 Alarms (14.6%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "14.6%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1">
                    <span className="text-slate-700 dark:text-slate-300 font-bold">VNT (Controllers)</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">7 Alarms (8.5%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "8.5%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. FLOATING FILTER TOOLBAR (PILLS & MULTI-SELECT DROPDOWNS) */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Quick Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <button
                onClick={() => setAlarmSeverityFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  alarmSeverityFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                All ({mockAlarmsList.length})
              </button>
              <button
                onClick={() => setAlarmSeverityFilter("critical")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  alarmSeverityFilter === "critical"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900"
                }`}
              >
                🔴 Critical (3)
              </button>
              <button
                onClick={() => setAlarmSeverityFilter("major")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  alarmSeverityFilter === "major"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900"
                }`}
              >
                🟠 Major (3)
              </button>
              <button
                onClick={() => setAlarmSeverityFilter("minor")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  alarmSeverityFilter === "minor"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900"
                }`}
              >
                🟡 Minor (2)
              </button>
              <button
                onClick={() => setAlarmSeverityFilter("closed")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  alarmSeverityFilter === "closed"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900"
                }`}
              >
                🟢 Closed (1)
              </button>
            </div>

            {/* Selectors & Search Input */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={alarmCircleFilter}
                onChange={(e) => setAlarmCircleFilter(e.target.value)}
                className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
              >
                <option value="all">Circle: All Regions</option>
                <option value="maharashtra">Circle: Maharashtra</option>
                <option value="rajasthan">Circle: Rajasthan</option>
                <option value="uttar pradesh">Circle: Uttar Pradesh</option>
                <option value="telangana">Circle: Telangana</option>
              </select>

              <select
                value={alarmVendorFilter}
                onChange={(e) => setAlarmVendorFilter(e.target.value)}
                className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
              >
                <option value="all">Vendor: All</option>
                <option value="vertiv">Vendor: Vertiv</option>
                <option value="delta">Vendor: Delta</option>
                <option value="intelux">Vendor: Intelux</option>
                <option value="vnt">Vendor: VNT</option>
              </select>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search Alarm ID, site or tag (⌘K)..."
                  value={alarmSearchQuery}
                  onChange={(e) => setAlarmSearchQuery(e.target.value)}
                  className="pl-9 h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                />
              </div>

              {(alarmSeverityFilter !== "all" ||
                alarmStatusFilter !== "all" ||
                alarmCircleFilter !== "all" ||
                alarmVendorFilter !== "all" ||
                alarmSearchQuery !== "") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAlarmSeverityFilter("all");
                    setAlarmStatusFilter("all");
                    setAlarmCircleFilter("all");
                    setAlarmVendorFilter("all");
                    setAlarmSearchQuery("");
                  }}
                  className="h-9 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
                </Button>
              )}
            </div>
          </div>

          {/* 4. ENTERPRISE DATADOG / LINEAR-GRADE ALARM TABLE */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-4 py-3.5 text-left">ALARM ID</th>
                    <th className="px-4 py-3.5 text-left">SITE & CIRCLE</th>
                    <th className="px-4 py-3.5 text-left">SEVERITY</th>
                    <th className="px-4 py-3.5 text-left">EQUIPMENT</th>
                    <th className="px-4 py-3.5 text-left min-w-[260px]">DESCRIPTION & TAGS</th>
                    <th className="px-4 py-3.5 text-left">REPORTED TIME</th>
                    <th className="px-4 py-3.5 text-center">DURATION</th>
                    <th className="px-4 py-3.5 text-left">STATUS</th>
                    <th className="px-4 py-3.5 text-left">ASSIGNED ENGINEER</th>
                    <th className="px-4 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredAlarms.map((alarm) => {
                    const isExpanded = expandedAlarmId === alarm.id;

                    const severityChip =
                      alarm.severity === "CRITICAL" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                          🔴 Critical
                        </span>
                      ) : alarm.severity === "MAJOR" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          🟠 Major
                        </span>
                      ) : alarm.severity === "MINOR" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          🟡 Minor
                        </span>
                      ) : alarm.severity === "CLOSED" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          🟢 Closed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          🔵 Acknowledged
                        </span>
                      );

                    const durationBadgeColor =
                      alarm.durationMinutes > 180
                        ? "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200"
                        : alarm.durationMinutes > 60
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200";

                    const visibleTags = expandedTagsAlarmId === alarm.id ? alarm.tags : alarm.tags.slice(0, 3);
                    const hiddenCount = alarm.tags.length - 3;

                    return (
                      <React.Fragment key={alarm.id}>
                        <tr
                          onClick={() => setExpandedAlarmId(isExpanded ? null : alarm.id)}
                          className={`cursor-pointer transition-colors ${
                            isExpanded
                              ? "bg-blue-50/60 dark:bg-blue-950/30"
                              : "hover:bg-slate-50/80 dark:hover:bg-slate-900/50"
                          }`}
                        >
                          {/* Alarm ID */}
                          <td className="px-4 py-4 font-mono font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            <ChevronRight
                              className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                                isExpanded ? "rotate-90 text-blue-600" : ""
                              }`}
                            />
                            {alarm.id}
                          </td>

                          {/* Site & Circle */}
                          <td className="px-4 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                                {alarm.siteName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 text-slate-400" />
                                {alarm.siteId} • {alarm.circle}
                              </span>
                            </div>
                          </td>

                          {/* Severity */}
                          <td className="px-4 py-4">{severityChip}</td>

                          {/* Equipment */}
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                                {alarm.equipment}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">Vendor: {alarm.vendor}</span>
                            </div>
                          </td>

                          {/* Description & Tags */}
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap items-center gap-1 max-w-sm">
                              {visibleTags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                >
                                  {tag}
                                </span>
                              ))}
                              {hiddenCount > 0 && expandedTagsAlarmId !== alarm.id && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedTagsAlarmId(alarm.id);
                                  }}
                                  className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 border border-blue-200/60 hover:bg-blue-100"
                                >
                                  +{hiddenCount} More
                                </button>
                              )}
                            </div>
                          </td>

                          {/* Reported Time */}
                          <td className="px-4 py-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {alarm.reportedAgo}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">{alarm.reportedRaw}</span>
                            </div>
                          </td>

                          {/* Duration */}
                          <td className="px-4 py-4 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-xs font-bold border ${durationBadgeColor}`}
                            >
                              {alarm.duration}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-4">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/80">
                              {alarm.status}
                            </span>
                          </td>

                          {/* Assigned Engineer */}
                          <td className="px-4 py-4">
                            {alarm.assignedEngineer ? (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/80 text-blue-700 dark:text-blue-300 flex items-center justify-center text-[10px] font-extrabold shrink-0">
                                  {alarm.assignedEngineer.avatar}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs truncate max-w-[100px]">
                                    {alarm.assignedEngineer.name}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">Unassigned</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setExpandedAlarmId(isExpanded ? null : alarm.id)}
                                className="h-7 px-2 text-xs font-semibold text-blue-600 dark:text-blue-400"
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                className="h-7 px-2 text-xs bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 font-semibold"
                              >
                                Assign
                              </Button>
                            </div>
                          </td>
                        </tr>

                        {/* EXPANDABLE DIAGNOSTIC DRAWER */}
                        {isExpanded && (
                          <tr className="bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-border">
                            <td colSpan={10} className="px-6 py-5">
                              <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-xl p-5 shadow-xs flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-border pb-3">
                                  <div className="flex items-center gap-2.5">
                                    <Badge variant="outline" className="font-mono text-xs font-bold bg-slate-100">
                                      {alarm.id}
                                    </Badge>
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                                      {alarm.siteName} — Root Cause Telemetry & Field Operations
                                    </h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Resolve Alarm
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 text-xs font-semibold">
                                      <UserPlus className="w-3.5 h-3.5 mr-1" /> Dispatch Field Tech
                                    </Button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                                  <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200/60 dark:border-border">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">DC Bus Voltage</span>
                                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                                      {alarm.telemetry.dcVoltage}
                                    </span>
                                  </div>

                                  <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200/60 dark:border-border">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Battery Discharge Current</span>
                                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
                                      {alarm.telemetry.batteryCurrent}
                                    </span>
                                  </div>

                                  <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200/60 dark:border-border">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Shelter Room Temp</span>
                                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                                      {alarm.telemetry.roomTemp}
                                    </span>
                                  </div>

                                  <div className="bg-slate-50 dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200/60 dark:border-border">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Utility Grid Status</span>
                                    <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                                      {alarm.telemetry.gridStatus}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
