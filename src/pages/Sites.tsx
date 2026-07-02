import React, { useState } from "react";
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

export default function Sites() {
  const [sites, setSites] = useState<SiteAssetRecord[]>(initialSitesList);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [copiedMac, setCopiedMac] = useState<string | null>(null);
  const [isAddSiteModalOpen, setIsAddSiteModalOpen] = useState(false);

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

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
            <Download className="w-3.5 h-3.5" /> Export Directory
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

      {/* 4. EXECUTIVE DATADOG/LINEAR-GRADE MATRIX TABLE */}
      <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
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
                  <tr key={site.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
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
    </div>
  );
}
