import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Search,
  Download,
  Plus,
  MapPin,
  WifiOff,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Clock,
  Trash2,
  Eye,
  X,
  Cpu,
  Globe,
  Network,
  Copy,
  Check,
  SlidersHorizontal,
  Bell,
  ShieldCheck,
  ShieldAlert,
  Edit2,
  ChevronRight,
  Settings,
  Send,
  Wifi,
  Signal,
  Server,
  Radio,
  Zap,
  History,
  AlertCircle,
  CheckCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";

interface SiteAssetRecord {
  id: string;
  name: string;
  ip: string;
  macAddress: string;
  type: "SPS" | "SMPS" | "OPE";
  status: "Online" | "Alarm" | "Down";
  location: string;
  lastUpdate: string;
}

const initialSitesList: SiteAssetRecord[] = [
  {
    id: "0000459507",
    name: "KATRAJ TUNNEL II",
    ip: "10.4.142.12",
    macAddress: "70:6D:EC:1E:99:3C",
    type: "SPS",
    status: "Alarm",
    location: "Maharashtra",
    lastUpdate: "2 min ago",
  },
  {
    id: "0000490457",
    name: "ACHALPUR",
    ip: "10.4.148.55",
    macAddress: "70:6D:EC:1E:98:D0",
    type: "SMPS",
    status: "Down",
    location: "Maharashtra",
    lastUpdate: "4 min ago",
  },
  {
    id: "0000508663",
    name: "JODHPUR ENGG COLLEGE",
    ip: "10.4.150.80",
    macAddress: "70:6D:EC:1E:98:CC",
    type: "SPS",
    status: "Alarm",
    location: "Rajasthan",
    lastUpdate: "5 min ago",
  },
  {
    id: "0000508711",
    name: "RUDAWAL",
    ip: "10.4.153.32",
    macAddress: "70:6D:EC:1E:99:20",
    type: "SPS",
    status: "Alarm",
    location: "Rajasthan",
    lastUpdate: "6 min ago",
  },
  {
    id: "0000509489",
    name: "MALIKPUR",
    ip: "10.4.155.19",
    macAddress: "70:6D:EC:1E:69:8C",
    type: "SMPS",
    status: "Alarm",
    location: "Uttar Pradesh",
    lastUpdate: "7 min ago",
  },
  {
    id: "0000530087",
    name: "ITBP JODHPUR COW",
    ip: "106.207.150.214",
    macAddress: "70:6D:EC:1E:72:A1",
    type: "SPS",
    status: "Down",
    location: "Rajasthan",
    lastUpdate: "9 min ago",
  },
  {
    id: "0000534730",
    name: "PALI_KAMLAGRESH COLONY",
    ip: "10.4.162.44",
    macAddress: "70:6D:EC:1E:99:04",
    type: "SPS",
    status: "Alarm",
    location: "Rajasthan",
    lastUpdate: "12 min ago",
  },
  {
    id: "0000534855",
    name: "UDPR-PREM NAGAR",
    ip: "10.4.164.88",
    macAddress: "70:6D:EC:1E:69:94",
    type: "SPS",
    status: "Alarm",
    location: "Rajasthan",
    lastUpdate: "15 min ago",
  },
  {
    id: "0000581861",
    name: "SATKHANDA",
    ip: "10.4.170.10",
    macAddress: "70:6D:EC:1E:54:11",
    type: "SMPS",
    status: "Online",
    location: "Rajasthan",
    lastUpdate: "45s ago",
  },
  {
    id: "0000545111",
    name: "Smart City",
    ip: "10.4.175.22",
    macAddress: "70:6D:EC:1E:33:44",
    type: "OPE",
    status: "Online",
    location: "Telangana",
    lastUpdate: "1m ago",
  },
];

const PORT_OPTIONS = [
  "None",
  "SPS",
  "SMPS",
  "Delta SMPS",
  "NewBio SMPS",
  "BMS",
  "DG Controller",
  "Fuel Sensor",
  "Temperature Sensor",
  "Energy Meter",
  "Custom Device",
];

const configHistory = [
  {
    date: "Today",
    time: "09:42 AM",
    by: "Super Admin",
    sites: 24,
  },
  {
    date: "Yesterday",
    time: "03:15 PM",
    by: "Vendor",
    sites: 5,
  },
  {
    date: "Jun 29",
    time: "11:00 AM",
    by: "L1 Engineer",
    sites: 12,
  },
];

export default function Sites() {
  const [sites, setSites] = useState<SiteAssetRecord[]>(initialSitesList);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [copiedMac, setCopiedMac] = useState<string | null>(null);
  const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);

  // ── SELECTION STATE
  const [selectedSiteIds, setSelectedSiteIds] = useState<Set<string>>(new Set());

  // ── CONFIGURE DRAWER
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);
  const [configSaved, setConfigSaved] = useState(false);

  // Config form state
  const [configForm, setConfigForm] = useState({
    serialNumber: "70:6D:EC:1E:58:CC",
    deviceId: "device-39289",
    imei: "861433078383487",
    imsi: "",
    mobileNumber: "5754212424925",
    apn: "airteliot.com",
    rs232a: "None",
    rs232b: "None",
    rs485a: "None",
    rs485b: "None",
    lanA: "SMPS",
    lanB: "None",
    siteId: "IN-1004076",
    uploadInterval: "60",
  });

  // ── PUSH CONFIGURATION MODAL
  const [isPushModalOpen, setIsPushModalOpen] = useState(false);
  const [pushTarget, setPushTarget] = useState<"all" | "selected">("all");
  const [pushError, setPushError] = useState<string | null>(null);

  // ── PUSH PROGRESS
  const [isPushing, setIsPushing] = useState(false);
  const [pushProgress, setPushProgress] = useState(0);
  const [pushCurrentSite, setPushCurrentSite] = useState("");
  const [pushComplete, setPushComplete] = useState(false);
  const [pushResult, setPushResult] = useState({ applied: 0, failed: 0, skipped: 0 });

  // ── SAFETY WORKFLOW FOR PUSH
  const [pushSubStep, setPushSubStep] = useState<"default" | "switch_warning" | "all_sites_mode" | "final_safety_confirmation">("default");
  const [pushAllConfirmText, setPushAllConfirmText] = useState("");

  // FORM STATE FOR ADD SITE
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [newIp, setNewIp] = useState("");
  const [newMac, setNewMac] = useState("");
  const [newType, setNewType] = useState<"SPS" | "SMPS" | "OPE">("SPS");
  const [newStatus, setNewStatus] = useState<"Online" | "Alarm" | "Down">("Online");
  const [newLocation, setNewLocation] = useState("Rajasthan");

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId.trim() || !newName.trim()) return;

    const newRecord: SiteAssetRecord = {
      id: newId.trim(),
      name: newName.trim().toUpperCase(),
      ip: newIp.trim() || "10.4.180.01",
      macAddress: newMac.trim() || "70:6D:EC:1E:88:99",
      type: newType,
      status: newStatus,
      location: newLocation,
      lastUpdate: "Just now",
    };

    setSites([newRecord, ...sites]);
    setNewId("");
    setNewName("");
    setNewIp("");
    setNewMac("");
    setIsAddSiteModalOpen(false);
  };

  const handleDeleteSite = (id: string) => {
    setSites(sites.filter((s) => s.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMac(text);
    setTimeout(() => setCopiedMac(null), 2000);
  };

  const filteredSites = sites.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.macAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || site.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || site.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalCount = sites.length;
  const onlineCount = sites.filter((s) => s.status === "Online").length;
  const alarmCount = sites.filter((s) => s.status === "Alarm").length;
  const downCount = sites.filter((s) => s.status === "Down").length;

  // ── SELECTION HANDLERS
  const toggleSelectAll = () => {
    if (selectedSiteIds.size === filteredSites.length) {
      setSelectedSiteIds(new Set());
    } else {
      setSelectedSiteIds(new Set(filteredSites.map((s) => s.id)));
    }
  };

  const toggleSelectSite = (id: string) => {
    const next = new Set(selectedSiteIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedSiteIds(next);
  };

  const allSelected = filteredSites.length > 0 && selectedSiteIds.size === filteredSites.length;
  const someSelected = selectedSiteIds.size > 0 && selectedSiteIds.size < filteredSites.length;

  // ── SAVE CONFIGURATION
  const handleSaveConfig = () => {
    setConfigSaved(true);
    setIsConfigDrawerOpen(false);
    setTimeout(() => {}, 200);
  };

  // ── PUSH CONFIGURATION
  const handleOpenPush = () => {
    if (!configSaved) {
      setPushError("Please save the configuration before pushing.");
      setIsPushModalOpen(true);
      return;
    }
    setPushError(null);
    setPushComplete(false);
    setPushProgress(0);
    setPushCurrentSite("");
    setPushSubStep("default");
    setPushAllConfirmText("");
    if (selectedSiteIds.size > 0) {
      setPushTarget("selected");
    } else {
      setPushTarget("all");
    }
    setIsPushModalOpen(true);
  };

  const handleStartPush = () => {
    if (pushTarget === "selected" && selectedSiteIds.size === 0) {
      setPushError("No sites selected. Please select one or more sites from the table.");
      return;
    }
    setPushError(null);
    setIsPushing(true);

    const targetSites = pushTarget === "all" ? sites : sites.filter((s) => selectedSiteIds.has(s.id));
    const total = targetSites.length;
    let idx = 0;

    const interval = setInterval(() => {
      if (idx >= total) {
        clearInterval(interval);
        setIsPushing(false);
        setPushProgress(100);
        setPushComplete(true);
        setPushResult({ applied: total - 2 > 0 ? total - 2 : total, failed: Math.min(2, total > 2 ? 2 : 0), skipped: Math.min(1, total > 3 ? 1 : 0) });
        return;
      }
      setPushCurrentSite(targetSites[idx].name);
      setPushProgress(Math.round(((idx + 1) / total) * 100));
      idx++;
    }, 600);
  };

  const handleClosePushModal = () => {
    if (isPushing) return;
    setIsPushModalOpen(false);
    setPushComplete(false);
    setPushError(null);
    setPushProgress(0);
    setPushCurrentSite("");
    setIsPushing(false);
  };

  const selectedSites = sites.filter((s) => selectedSiteIds.has(s.id));

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* 1. EXECUTIVE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Sites Infrastructure Management
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60">
              TELECOM ASSET DIRECTORY
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time multi-site hardware equipment controller, IP assignment & MAC address matrix
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
            <Download className="w-3.5 h-3.5" /> Export Directory
          </Button>

          {/* Configure Button */}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs font-semibold border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-400"
            onClick={() => setIsConfigDrawerOpen(true)}
          >
            <Settings className="w-3.5 h-3.5" /> Configure
            {configSaved && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5" />
            )}
          </Button>

          {/* Push Configuration Button */}
          <Button
            size="sm"
            className="gap-1.5 text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-xs"
            onClick={handleOpenPush}
          >
            <Send className="w-3.5 h-3.5" /> Push Configuration
            {selectedSiteIds.size > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                {selectedSiteIds.size}
              </span>
            )}
          </Button>

          <Button
            onClick={() => setIsAddSiteModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Site
          </Button>
        </div>
      </div>

      {/* 2. EXECUTIVE KPI CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sites */}
        <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100 block">
              {totalCount}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 block">Total Sites Configured</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        {/* Online */}
        <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block">
              {onlineCount}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 block">Online & Healthy</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Active Alarms */}
        <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-3xl font-extrabold font-mono text-amber-600 dark:text-amber-400 block">
              {alarmCount}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 block">Active Alarms</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
            <Bell className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Down */}
        <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-3xl font-extrabold font-mono text-rose-600 dark:text-rose-400 block">
              {downCount}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 block">Down / Critical</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. CONTROLS & FILTERING TOOLBAR */}
      <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setTypeFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              typeFilter === "all"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            All Types ({sites.length})
          </button>
          <button
            onClick={() => setTypeFilter("sps")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              typeFilter === "sps"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60"
            }`}
          >
            SPS Controller ({sites.filter((s) => s.type === "SPS").length})
          </button>
          <button
            onClick={() => setTypeFilter("smps")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              typeFilter === "smps"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60"
            }`}
          >
            SMPS Controller ({sites.filter((s) => s.type === "SMPS").length})
          </button>
          <button
            onClick={() => setTypeFilter("ope")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              typeFilter === "ope"
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60"
            }`}
          >
            OPE Enclosure ({sites.filter((s) => s.type === "OPE").length})
          </button>
        </div>

        {/* Status Dropdown & Search Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          >
            <option value="all">Status: All</option>
            <option value="online">Status: Online 🟢</option>
            <option value="alarm">Status: Alarm 🔔</option>
            <option value="down">Status: Down ❌</option>
          </select>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search Site ID, Name, IP, MAC (⌘K)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Selection Bar */}
      <AnimatePresence>
        {selectedSiteIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-violet-700 dark:text-violet-300"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {selectedSiteIds.size} site{selectedSiteIds.size > 1 ? "s" : ""} selected
            </span>
            <button
              onClick={() => setSelectedSiteIds(new Set())}
              className="text-violet-500 hover:text-violet-700 cursor-pointer text-[11px] underline"
            >
              Clear selection
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. EXECUTIVE MATRIX TABLE WITH CHECKBOXES */}
      <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                {/* Checkbox Header */}
                <th className="px-4 py-3.5 text-left w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => { if (el) el.indeterminate = someSelected; }}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-violet-600 cursor-pointer accent-violet-600"
                  />
                </th>
                <th className="px-5 py-3.5 text-left">SITE ID</th>
                <th className="px-5 py-3.5 text-left">NAME & LOCATION</th>
                <th className="px-5 py-3.5 text-left">IP ADDRESS</th>
                <th className="px-5 py-3.5 text-left">MAC ADDRESS</th>
                <th className="px-5 py-3.5 text-left">EQUIPMENT TYPE</th>
                <th className="px-5 py-3.5 text-center">STATUS</th>
                <th className="px-5 py-3.5 text-right font-bold">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredSites.map((site) => {
                const isSelected = selectedSiteIds.has(site.id);

                const statusBadge =
                  site.status === "Online" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      ONLINE
                    </span>
                  ) : site.status === "Alarm" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200/60">
                      <Bell className="w-3 h-3 text-amber-600 animate-bounce" />
                      ALARM
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200/60">
                      <Flame className="w-3 h-3 text-rose-600" />
                      DOWN
                    </span>
                  );

                const typeBadge =
                  site.type === "SPS" ? (
                    <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/60">
                      SPS
                    </span>
                  ) : site.type === "SMPS" ? (
                    <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/60">
                      SMPS
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200/60">
                      OPE
                    </span>
                  );

                return (
                  <tr
                    key={site.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors ${
                      isSelected ? "bg-violet-50/60 dark:bg-violet-950/20" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectSite(site.id)}
                        className="w-4 h-4 rounded border-slate-300 text-violet-600 cursor-pointer accent-violet-600"
                      />
                    </td>

                    {/* Site ID */}
                    <td className="px-5 py-4 font-mono font-bold text-rose-600 dark:text-rose-400 text-xs">
                      {site.id}
                    </td>

                    {/* Name & Location */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-slate-100 text-xs tracking-wide">
                          {site.name}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5 text-slate-400" />
                          {site.location}
                        </span>
                      </div>
                    </td>

                    {/* IP Address */}
                    <td className="px-5 py-4 font-mono text-slate-700 dark:text-slate-300 text-xs">
                      {site.ip ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          <Network className="w-3 h-3 text-blue-500" /> {site.ip}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">—</span>
                      )}
                    </td>

                    {/* MAC Address */}
                    <td className="px-5 py-4 font-mono text-slate-600 dark:text-slate-400 text-xs">
                      <button
                        onClick={() => copyToClipboard(site.macAddress)}
                        className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-2 py-0.5 rounded hover:border-blue-400 transition-colors group cursor-pointer"
                        title="Click to copy MAC Address"
                      >
                        <span>{site.macAddress}</span>
                        {copiedMac === site.macAddress ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </button>
                    </td>

                    {/* Equipment Type */}
                    <td className="px-5 py-4">{typeBadge}</td>

                    {/* Status */}
                    <td className="px-5 py-4 text-center">{statusBadge}</td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <Button
                        size="sm"
                        className="h-8 px-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 text-white font-bold text-xs shadow-2xs gap-1"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL DIALOG: ADD SITE */}
      {isAddSiteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl p-6 shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" /> Add New Telecom Site Asset
              </h3>
              <button
                onClick={() => setIsAddSiteModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSite} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Site ID
                </label>
                <Input
                  required
                  placeholder="e.g. 0000599120"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  className="h-9 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Site Name
                </label>
                <Input
                  required
                  placeholder="e.g. KATRAJ TUNNEL II"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    IP Address
                  </label>
                  <Input
                    placeholder="e.g. 10.4.153.32"
                    value={newIp}
                    onChange={(e) => setNewIp(e.target.value)}
                    className="h-9 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    MAC Address
                  </label>
                  <Input
                    placeholder="e.g. 70:6D:EC:1E:99:3C"
                    value={newMac}
                    onChange={(e) => setNewMac(e.target.value)}
                    className="h-9 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Equipment Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none"
                  >
                    <option value="SPS">SPS Controller</option>
                    <option value="SMPS">SMPS Controller</option>
                    <option value="OPE">OPE Enclosure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e: any) => setNewStatus(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none"
                  >
                    <option value="Online">Online 🟢</option>
                    <option value="Alarm">Alarm 🔔</option>
                    <option value="Down">Down ❌</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddSiteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-blue-600 text-white font-semibold">
                  Save Asset Record
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ── 6. CONFIGURE DRAWER ──────────────────────────────────────── */}
      <AnimatePresence>
        {isConfigDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setIsConfigDrawerOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[700px] bg-white dark:bg-card border-l border-slate-200 dark:border-border shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950 border border-violet-200/60 flex items-center justify-center text-violet-600">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      IoT Gateway Configuration
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Universal Gateway — Remote device configuration template
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsConfigDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body — Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

                {/* ── Section 1: Device Information */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-md bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
                      <Cpu className="w-3 h-3 text-violet-600" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                      Device Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      { label: "Serial Number", key: "serialNumber", mono: true, placeholder: "e.g. 70:6D:EC:1E:58:CC" },
                      { label: "Device ID", key: "deviceId", mono: true, placeholder: "e.g. device-39289" },
                      { label: "IMEI", key: "imei", mono: true, placeholder: "e.g. 861433078383487" },
                      { label: "IMSI", key: "imsi", mono: true, placeholder: "e.g. 404010123456789" },
                      { label: "Mobile Number", key: "mobileNumber", mono: true, placeholder: "e.g. 5754212424925" },
                      { label: "APN", key: "apn", mono: false, placeholder: "e.g. airteliot.com" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1 text-[11px]">
                          {field.label}
                        </label>
                        <Input
                          value={(configForm as any)[field.key]}
                          onChange={(e) =>
                            setConfigForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                          }
                          placeholder={field.placeholder}
                          className={`h-9 text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 ${field.mono ? "font-mono" : ""}`}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <div className="border-t border-slate-100 dark:border-slate-800" />

                {/* ── Section 2: Port Configuration */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Radio className="w-3 h-3 text-blue-600" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                      Port Configuration
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      { label: "RS232 (A)", key: "rs232a" },
                      { label: "RS232 (B)", key: "rs232b" },
                      { label: "RS485 (A)", key: "rs485a" },
                      { label: "RS485 (B)", key: "rs485b" },
                      { label: "LAN A", key: "lanA" },
                      { label: "LAN B", key: "lanB" },
                    ].map((port) => {
                      const val = (configForm as any)[port.key];
                      const isConfigured = val && val !== "None";
                      return (
                        <div key={port.key}>
                          <div className="flex items-center justify-between mb-1">
                            <label className="font-bold text-slate-600 dark:text-slate-400 text-[11px]">
                              {port.label}
                            </label>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                              isConfigured
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                            }`}>
                              {isConfigured ? "CONFIGURED" : "NOT CONFIG"}
                            </span>
                          </div>
                          <select
                            value={val}
                            onChange={(e) =>
                              setConfigForm((prev) => ({ ...prev, [port.key]: e.target.value }))
                            }
                            className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none cursor-pointer text-slate-700 dark:text-slate-300"
                          >
                            {PORT_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <div className="border-t border-slate-100 dark:border-slate-800" />

                {/* ── Section 3: Upload Settings */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-emerald-600" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                      Upload Settings
                    </h4>
                  </div>
                  <div className="max-w-xs text-xs">
                    <div>
                      <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1 text-[11px]">
                        Upload Interval (Minutes)
                      </label>
                      <Input
                        value={configForm.uploadInterval}
                        onChange={(e) => setConfigForm((prev) => ({ ...prev, uploadInterval: e.target.value }))}
                        placeholder="e.g. 60"
                        type="number"
                        className="h-9 text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                      />
                    </div>
                  </div>
                </section>

                <div className="border-t border-slate-100 dark:border-slate-800" />

                {/* ── Section 4: Live Gateway Status */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-md bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                      <Signal className="w-3 h-3 text-amber-600" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                      Live Gateway Status
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Internet Status", status: "disconnected" },
                      { label: "MQTT Status", status: "disconnected" },
                      { label: "Cellular Status", status: "connecting" },
                      { label: "SIM Status", status: "not_configured" },
                    ].map((item) => {
                      const badge =
                        item.status === "connected" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Connected
                          </span>
                        ) : item.status === "connecting" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Connecting
                          </span>
                        ) : item.status === "disconnected" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Disconnected
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Not Configured
                          </span>
                        );
                      return (
                        <div key={item.label} className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                            {item.label}
                          </span>
                          {badge}
                        </div>
                      );
                    })}
                  </div>
                </section>

                <div className="border-t border-slate-100 dark:border-slate-800" />

                {/* ── Section 5: Cellular Information */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Wifi className="w-3 h-3 text-slate-600" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                      Cellular Information
                    </h4>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 p-4">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-[11px]">
                      {[
                        { label: "Operator", value: "SIM DEACTIVATED" },
                        { label: "MCC", value: "+CM" },
                        { label: "MNC", value: "E" },
                        { label: "RSSI", value: "-51 dBm" },
                        { label: "Network Type", value: "Not OK" },
                        { label: "LAC", value: "0" },
                        { label: "CID", value: "0" },
                        { label: "Signal Strength", value: "Poor" },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5 last:border-0 last:pb-0">
                          <span className="font-semibold text-slate-500 dark:text-slate-400">{row.label}</span>
                          <span className={`font-bold font-mono text-[11px] ${
                            row.value === "SIM DEACTIVATED" ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-slate-300"
                          }`}>
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <div className="border-t border-slate-100 dark:border-slate-800" />

                {/* ── Section 6: Configuration History */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <History className="w-3 h-3 text-indigo-600" />
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                      Configuration History
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {configHistory.map((entry, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                            {entry.date}
                            <span className="text-[10px] text-slate-400 font-normal ml-1.5">{entry.time}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Applied by <span className="font-semibold text-slate-600 dark:text-slate-300">{entry.by}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                          {entry.sites} Sites
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Drawer Footer */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 flex items-center justify-between gap-3 shrink-0">
                <p className="text-[11px] text-slate-400">
                  Saving only saves the template. Use{" "}
                  <span className="font-semibold text-violet-600">Push Configuration</span> to deploy.
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs font-semibold"
                    onClick={() => setIsConfigDrawerOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs gap-1.5 shadow-xs"
                    onClick={handleSaveConfig}
                  >
                    <Check className="w-3.5 h-3.5" /> Save Configuration
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── 7. PUSH CONFIGURATION MODAL ──────────────────────────────── */}
      <AnimatePresence>
        {isPushModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              {/* Error State */}
              {pushError && !isPushing && !pushComplete && (
                <>
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" /> Push Configuration
                    </h3>
                    <button onClick={handleClosePushModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="px-5 py-6 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 border border-amber-200/60 flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-6 h-6 text-amber-500" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Action Required</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{pushError}</p>
                  </div>
                  <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="text-xs" onClick={handleClosePushModal}>
                      Close
                    </Button>
                    {!configSaved && (
                      <Button
                        size="sm"
                        className="bg-violet-600 hover:bg-violet-700 text-white text-xs"
                        onClick={() => { handleClosePushModal(); setIsConfigDrawerOpen(true); }}
                      >
                        Open Configure
                      </Button>
                    )}
                  </div>
                </>
              )}

              {/* Push Progress */}
              {isPushing && !pushComplete && (
                <>
                  <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-violet-600 animate-spin" /> Pushing Configuration...
                    </h3>
                  </div>
                  <div className="px-5 py-6 space-y-5">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        <span>Progress</span>
                        <span className="font-mono text-violet-600">{pushProgress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-violet-500 to-violet-600 rounded-full"
                          style={{ width: `${pushProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                    {/* Current Site */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 px-4 py-3">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Current Site</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{pushCurrentSite || "—"}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Push Complete */}
              {pushComplete && (
                <>
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" /> Configuration Applied
                    </h3>
                    <button onClick={handleClosePushModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="px-5 py-6 space-y-4">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200/60 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-7 h-7 text-emerald-500" />
                      </div>
                      <p className="text-base font-bold text-slate-800 dark:text-slate-100">Configuration Successfully Applied</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 border border-emerald-100 dark:border-emerald-900">
                        <div className="text-xl font-black font-mono text-emerald-600">{pushResult.applied}</div>
                        <div className="text-[10px] font-semibold text-emerald-600/70 mt-0.5">Applied</div>
                      </div>
                      <div className="bg-rose-50 dark:bg-rose-950/50 rounded-xl p-3 border border-rose-100 dark:border-rose-900">
                        <div className="text-xl font-black font-mono text-rose-600">{pushResult.failed}</div>
                        <div className="text-[10px] font-semibold text-rose-600/70 mt-0.5">Failed</div>
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                        <div className="text-xl font-black font-mono text-slate-600">{pushResult.skipped}</div>
                        <div className="text-[10px] font-semibold text-slate-500 mt-0.5">Skipped</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" className="text-xs gap-1.5">
                      <History className="w-3.5 h-3.5" /> View Log
                    </Button>
                    <Button
                      size="sm"
                      className="bg-violet-600 hover:bg-violet-700 text-white text-xs"
                      onClick={handleClosePushModal}
                    >
                      Done
                    </Button>
                  </div>
                </>
              )}

               {/* Normal Push Selection */}
              {!pushError && !isPushing && !pushComplete && (
                <>
                  {/* Scenario 1: No Sites Selected - default mode */}
                  {pushSubStep === "default" && selectedSiteIds.size === 0 && (
                    <>
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500" /> Push Configuration
                        </h3>
                        <button onClick={handleClosePushModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="px-5 py-6 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 border border-amber-200/60 flex items-center justify-center mx-auto mb-3">
                          <AlertCircle className="w-6 h-6 text-amber-500" />
                        </div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">No Sites Selected</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          This configuration will be deployed to every site.
                        </p>
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200/60">
                          Total Sites : {sites.length}
                        </div>
                      </div>
                      <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-xs" onClick={handleClosePushModal}>
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs gap-1.5"
                          onClick={() => {
                            setPushTarget("all");
                            handleStartPush();
                          }}
                        >
                          <Send className="w-3.5 h-3.5" /> Push to All Sites
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Scenario 2: One or More Sites Selected - default mode */}
                  {pushSubStep === "default" && selectedSiteIds.size > 0 && (
                    <>
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <Send className="w-4 h-4 text-violet-600" /> Push Configuration
                        </h3>
                        <button onClick={handleClosePushModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="px-5 py-5 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200/60">
                            {selectedSiteIds.size} Site{selectedSiteIds.size > 1 ? "s" : ""} Selected
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          This configuration will only be deployed to the selected sites.
                        </p>
                        
                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/60 dark:border-slate-800 p-3 max-h-40 overflow-y-auto space-y-1.5">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Selected Sites</p>
                          {selectedSites.map((site) => (
                            <div key={site.id} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{site.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">({site.id})</span>
                            </div>
                          ))}
                        </div>

                        <div className="text-center pt-2">
                          <p className="text-[11px] text-slate-400">
                            Need to deploy this configuration to every site instead?
                          </p>
                          <button
                            onClick={() => setPushSubStep("switch_warning")}
                            className="text-[11px] font-bold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer mt-1"
                          >
                            Switch to Apply to All Sites
                          </button>
                        </div>
                      </div>
                      <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-xs" onClick={handleClosePushModal}>
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs gap-1.5"
                          onClick={() => {
                            setPushTarget("selected");
                            handleStartPush();
                          }}
                        >
                          <Send className="w-3.5 h-3.5" /> Push to {selectedSiteIds.size} Site{selectedSiteIds.size > 1 ? "s" : ""}
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Switch Scope Warning step */}
                  {pushSubStep === "switch_warning" && (
                    <>
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" /> Switch Deployment Scope
                        </h3>
                        <button onClick={handleClosePushModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="px-5 py-6 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 border border-amber-200/60 flex items-center justify-center mx-auto">
                          <AlertTriangle className="w-6 h-6 text-amber-500 animate-bounce" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            You currently have <span className="font-bold text-slate-800 dark:text-slate-200">{selectedSiteIds.size} site{selectedSiteIds.size > 1 ? "s" : ""}</span> selected.
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            Switching to "Apply to All Sites" will ignore the selected site list and deploy the configuration to every site.
                          </p>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            Do you want to continue?
                          </p>
                        </div>
                      </div>
                      <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="text-xs" onClick={() => setPushSubStep("default")}>
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs"
                          onClick={() => setPushSubStep("all_sites_mode")}
                        >
                          Continue
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Apply to All Mode step */}
                  {pushSubStep === "all_sites_mode" && (
                    <>
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-violet-600" /> Apply Configuration to ALL Sites
                        </h3>
                        <button onClick={handleClosePushModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="px-5 py-6 space-y-4">
                        <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/60 rounded-xl p-4 text-center">
                          <div className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest">Target Scope</div>
                          <div className="text-3xl font-black text-violet-700 dark:text-violet-300 font-mono mt-1">
                            Total Sites : {sites.length}
                          </div>
                        </div>
                        <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                          <p>This operation will deploy the saved configuration to every registered site.</p>
                          <p className="font-semibold text-rose-600 dark:text-rose-400">This action may affect all live gateways.</p>
                        </div>
                      </div>
                      <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <button
                          onClick={() => {
                            setPushSubStep("default");
                          }}
                          className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                        >
                          Back to Selected Sites
                        </button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-xs" onClick={handleClosePushModal}>
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs"
                            onClick={() => setPushSubStep("final_safety_confirmation")}
                          >
                            Continue
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Final Safety Confirmation step */}
                  {pushSubStep === "final_safety_confirmation" && (
                    <>
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-sm font-bold text-rose-600 flex items-center gap-2">
                          <ShieldAlert className="w-4 h-4 text-rose-600" /> Confirm Global Configuration Push
                        </h3>
                        <button onClick={handleClosePushModal} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="px-5 py-6 space-y-4">
                        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/60 rounded-xl p-4 text-center space-y-2">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300 uppercase tracking-wide">
                            WARNING
                          </div>
                          <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed font-semibold">
                            You have selected {selectedSiteIds.size} site{selectedSiteIds.size > 1 ? "s" : ""}, but you are about to deploy the configuration to ALL {sites.length} sites.
                          </p>
                          <div className="grid grid-cols-2 gap-3 text-left max-w-xs mx-auto pt-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                            <div className="flex justify-between">
                              <span>Selected Sites:</span>
                              <span className="font-mono text-slate-800 dark:text-slate-200">{selectedSiteIds.size}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Target Sites:</span>
                              <span className="font-mono text-rose-600 dark:text-rose-400">{sites.length}</span>
                            </div>
                          </div>
                          <p className="text-[11px] font-bold text-rose-700 dark:text-rose-400 pt-1">
                            This action cannot be undone.
                          </p>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
                            Please type <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-rose-600">PUSH ALL</span> to confirm.
                          </label>
                          <Input
                            value={pushAllConfirmText}
                            onChange={(e) => setPushAllConfirmText(e.target.value)}
                            placeholder="Type PUSH ALL"
                            className="h-9 text-xs text-center font-mono uppercase bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>
                      <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setPushSubStep("all_sites_mode")}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs"
                          disabled={pushAllConfirmText !== "PUSH ALL"}
                          onClick={() => {
                            setPushTarget("all");
                            handleStartPush();
                          }}
                        >
                          Push to All Sites
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
