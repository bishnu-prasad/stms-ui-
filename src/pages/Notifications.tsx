import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Users,
  SlidersHorizontal,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Mail,
  Radio,
  Trash2,
  Edit2,
  X,
  Check,
  Send,
  ChevronDown,
  ShieldCheck,
  Zap,
  Smartphone,
  Globe,
  Save,
  UserPlus,
  Settings,
  AlertTriangle,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* DATA STRUCTURES                                                           */
/* -------------------------------------------------------------------------- */

interface NotificationGroup {
  id: string;
  groupName: string;
  scopeType: "ALL" | "LOCATION";
  locationName?: string;
  recipients: string[];
  systemEvents: string;
  siteAlarms: string;
}

interface NotificationLog {
  id: number;
  siteId: string;
  eventType: string;
  lastReportedOn: string;
  status: "Delivered" | "Pending" | "Failed";
}

/* -------------------------------------------------------------------------- */
/* PRESERVED DATASETS FROM SCREENSHOTS                                       */
/* -------------------------------------------------------------------------- */

const initialGroups: NotificationGroup[] = [
  {
    id: "g-1",
    groupName: "Indio Ankush All",
    scopeType: "ALL",
    recipients: [
      "ankush.avion@gmail.com",
      "bhavesh.sonawane@indionetworks.com",
      "ankush.deshmukh@indionetworks.com",
      "aditya.jagtap@indionetworks.com",
    ],
    systemEvents: "None",
    siteAlarms: "None",
  },
  {
    id: "g-2",
    groupName: "Indio notification",
    scopeType: "LOCATION",
    locationName: "Wardha",
    recipients: ["ankush.avion@gmail.com"],
    systemEvents: "None",
    siteAlarms: "None",
  },
];

const initialLogs: NotificationLog[] = [
  { id: 1, siteId: "0000584546", eventType: "No Communication", lastReportedOn: "2026-05-08 07:22:02", status: "Delivered" },
  { id: 2, siteId: "0000584546", eventType: "No Communication", lastReportedOn: "2026-05-08 04:22:02", status: "Delivered" },
  { id: 3, siteId: "0000595279", eventType: "No Communication", lastReportedOn: "2026-05-08 03:22:02", status: "Delivered" },
  { id: 4, siteId: "0000596241", eventType: "No Communication", lastReportedOn: "2026-05-08 02:52:02", status: "Delivered" },
  { id: 5, siteId: "0000596241", eventType: "No Communication", lastReportedOn: "2026-05-08 02:16:02", status: "Delivered" },
  { id: 6, siteId: "0000584546", eventType: "No Communication", lastReportedOn: "2026-05-08 01:10:03", status: "Delivered" },
  { id: 7, siteId: "0000584546", eventType: "No Communication", lastReportedOn: "2026-05-07 22:52:02", status: "Delivered" },
  { id: 8, siteId: "0000584546", eventType: "No Communication", lastReportedOn: "2026-05-07 19:52:02", status: "Delivered" },
];

/* -------------------------------------------------------------------------- */
/* MAIN NOTIFICATIONS COMPONENT                                               */
/* -------------------------------------------------------------------------- */

export default function NotificationsPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const tabFromUrl = searchParams.get("tab") || "groups";

  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // STATE
  const [groups, setGroups] = useState<NotificationGroup[]>(initialGroups);
  const [logs, setLogs] = useState<NotificationLog[]>(initialLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSiteFilter, setSelectedSiteFilter] = useState("All Sites");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // PREFERENCES SWITCHES STATE
  const [masterSwitch, setMasterSwitch] = useState(true);
  const [toastSwitch, setToastSwitch] = useState(true);
  const [emailSwitch, setEmailSwitch] = useState(true);
  const [smsSwitch, setSmsSwitch] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // EVENT TYPES CHECKBOX STATE
  const [eventTypes, setEventTypes] = useState<Record<string, boolean>>({
    "No Communication": true,
    "Data Missing": true,
    "No Data Modem": true,
    "All Site Alarms": true,
    "Battery Discharge Threshold": false,
    "Mains Disruption": true,
  });

  // CREATE GROUP MODAL STATE
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupScope, setNewGroupScope] = useState<"ALL" | "LOCATION">("ALL");
  const [newGroupLocation, setNewGroupLocation] = useState("Wardha");
  const [newGroupEmail, setNewGroupEmail] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");
    if (tab === "groups" || tab === "logs" || tab === "preferences") {
      setActiveTab(tab);
    }
  }, [location, window.location.search]);

  // HANDLER: ADD GROUP
  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newRecord: NotificationGroup = {
      id: `g-${Date.now()}`,
      groupName: newGroupName.trim(),
      scopeType: newGroupScope,
      locationName: newGroupScope === "LOCATION" ? newGroupLocation : undefined,
      recipients: [newGroupEmail.trim() || "ankush.avion@gmail.com"],
      systemEvents: "None",
      siteAlarms: "None",
    };

    setGroups([newRecord, ...groups]);
    setNewGroupName("");
    setNewGroupEmail("");
    setIsAddGroupModalOpen(false);
  };

  // HANDLER: SAVE PREFERENCES
  const handleSavePreferences = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  // DELETE GROUP
  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter((g) => g.id !== id));
    setActiveDropdown(null);
  };

  // FILTERED LOGS
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.siteId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.eventType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSite = selectedSiteFilter === "All Sites" || log.siteId === selectedSiteFilter;
    return matchesSearch && matchesSite;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* 1. EXECUTIVE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Notifications & Alert Governance
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60">
              REAL-TIME BROADCAST ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage NOC alert dispatch groups, broadcast delivery logs, and personalized channel notification preferences
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "groups" && (
            <Button
              onClick={() => setIsAddGroupModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Create New Group
            </Button>
          )}
          {activeTab === "preferences" && (
            <Button
              onClick={handleSavePreferences}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs gap-1.5 shadow-xs"
            >
              <Save className="w-4 h-4" /> Save Preferences
            </Button>
          )}
        </div>
      </div>

      {/* 2. SUB-TABS SWITCHER */}
      <div className="border-b border-slate-200 dark:border-border flex gap-6 overflow-x-auto pt-1 pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab("groups")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "groups"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Notification Groups</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            {groups.length} Groups
          </span>
          {activeTab === "groups" && (
            <motion.div
              layoutId="notifications-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("logs")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "logs"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notification Logs</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
            {logs.length} Telemetry Events
          </span>
          {activeTab === "logs" && (
            <motion.div
              layoutId="notifications-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("preferences")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "preferences"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>My Preferences</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            Channel Settings
          </span>
          {activeTab === "preferences" && (
            <motion.div
              layoutId="notifications-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: NOTIFICATION GROUPS                                           */}
      {/* ==================================================================== */}
      {activeTab === "groups" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 block">
                  {groups.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Notification Dispatch Groups</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-purple-600 dark:text-purple-400 block">
                  5
                </span>
                <span className="text-xs text-slate-500 font-medium">Subscribed Recipients</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block">
                  100%
                </span>
                <span className="text-xs text-slate-500 font-medium">Broadcast SLA Compliance</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Groups Matrix Table with Actions Dropdown */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-5 py-3.5 text-left">GROUP NAME</th>
                    <th className="px-5 py-3.5 text-left">SCOPE</th>
                    <th className="px-5 py-3.5 text-left">RECIPIENTS DIRECTORY</th>
                    <th className="px-5 py-3.5 text-center">SYSTEM EVENTS</th>
                    <th className="px-5 py-3.5 text-center">SITE ALARMS</th>
                    <th className="px-5 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {groups.map((grp) => (
                    <tr key={grp.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
                      {/* Group Name */}
                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-slate-100 text-xs">
                        {grp.groupName}
                      </td>

                      {/* Scope */}
                      <td className="px-5 py-4">
                        {grp.scopeType === "ALL" ? (
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200">
                            ALL
                          </span>
                        ) : (
                          <div className="flex flex-col">
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 w-fit">
                              LOCATION
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                              {grp.locationName}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Recipients Directory */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-md">
                          <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-950 border border-emerald-200">
                            Internal
                          </span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-sky-50 text-sky-700 dark:bg-sky-950 border border-sky-200">
                            External
                          </span>
                          {grp.recipients.map((email, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-50 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60"
                            >
                              {email}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* System Events */}
                      <td className="px-5 py-4 text-center text-slate-400 italic">
                        {grp.systemEvents}
                      </td>

                      {/* Site Alarms */}
                      <td className="px-5 py-4 text-center text-slate-400 italic">
                        {grp.siteAlarms}
                      </td>

                      {/* Actions Dropdown */}
                      <td className="px-5 py-4 text-right relative">
                        <div className="inline-block text-left">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setActiveDropdown(activeDropdown === grp.id ? null : grp.id)
                            }
                            className="h-7 text-xs font-semibold gap-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 cursor-pointer"
                          >
                            <span>Actions</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </Button>

                          {activeDropdown === grp.id && (
                            <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-xl shadow-lg z-20 py-1 text-xs">
                              <button
                                onClick={() => setActiveDropdown(null)}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                              >
                                <Edit2 className="w-3.5 h-3.5 text-blue-500" /> Edit Group
                              </button>
                              <button
                                onClick={() => handleDeleteGroup(grp.id)}
                                className="w-full text-left px-3 py-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium text-rose-600 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" /> Delete Group
                              </button>
                            </div>
                          )}
                        </div>
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
      {/* TAB 2: NOTIFICATION LOGS                                            */}
      {/* ==================================================================== */}
      {activeTab === "logs" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Filter Toolbar */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">Filter by Site:</span>
              <select
                value={selectedSiteFilter}
                onChange={(e) => setSelectedSiteFilter(e.target.value)}
                className="h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none cursor-pointer"
              >
                <option value="All Sites">All Sites Monitored</option>
                <option value="0000584546">0000584546</option>
                <option value="0000595279">0000595279</option>
                <option value="0000596241">0000596241</option>
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search site ID or event (⌘K)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-5 py-3.5 text-left">#</th>
                    <th className="px-5 py-3.5 text-left">SITE IDENTIFIER</th>
                    <th className="px-5 py-3.5 text-left">TELEMETRY EVENT TYPE</th>
                    <th className="px-5 py-3.5 text-left">LAST REPORTED TIMESTAMP</th>
                    <th className="px-5 py-3.5 text-right">DELIVERY STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-slate-400">#{log.id}</td>
                      <td className="px-5 py-4 font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">
                        #{log.siteId}
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-slate-100 text-xs">
                        <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200/60 font-medium">
                          {log.eventType}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono text-slate-500 text-xs">
                        {log.lastReportedOn}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> DELIVERED
                        </span>
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
      {/* TAB 3: MY PREFERENCES                                                */}
      {/* ==================================================================== */}
      {activeTab === "preferences" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {saveToast && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-200 rounded-2xl p-4 text-xs font-bold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Notification preferences saved successfully across all active delivery channels!
            </motion.div>
          )}

          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-6 shadow-2xs space-y-6">
            {/* Notification Channels Header */}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                <Radio className="w-4 h-4 text-blue-600" /> Notification Delivery Channels
              </h3>
              <p className="text-xs text-slate-500">
                Enable or disable specific alert delivery channels globally for your NOC profile
              </p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-4 pt-2">
              {/* Master Switch */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs flex items-center gap-2">
                    Monitor Notifications
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[9px] font-bold">
                      Master Switch
                    </Badge>
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Master control for all telemetry alerts and active site monitoring
                  </span>
                </div>
                <button
                  onClick={() => setMasterSwitch(!masterSwitch)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    masterSwitch ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                      masterSwitch ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Toast Notifications */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                    Toast Notifications
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Browser popup alerts for instant on-screen NOC notifications
                  </span>
                </div>
                <button
                  disabled={!masterSwitch}
                  onClick={() => setToastSwitch(!toastSwitch)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    masterSwitch && toastSwitch ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700 opacity-50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                      toastSwitch ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                    Email Notifications
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Detailed incident summary email alerts sent to primary address
                  </span>
                </div>
                <button
                  disabled={!masterSwitch}
                  onClick={() => setEmailSwitch(!emailSwitch)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    masterSwitch && emailSwitch ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700 opacity-50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                      emailSwitch ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* SMS Notifications */}
              <div className="flex items-center justify-between pt-4">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                    SMS & Urgent Push Alerts
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Direct SMS messages for critical tower outages (P0 / P1 incidents)
                  </span>
                </div>
                <button
                  disabled={!masterSwitch}
                  onClick={() => setSmsSwitch(!smsSwitch)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    masterSwitch && smsSwitch ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700 opacity-50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                      smsSwitch ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Event Types Subscription */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-purple-600" /> Subscribed Event Types
              </h3>
              <p className="text-xs text-slate-500">
                Select which specific telemetry events trigger automatic alert broadcasts
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {Object.keys(eventTypes).map((eventKey) => {
                const isChecked = eventTypes[eventKey];
                return (
                  <button
                    key={eventKey}
                    onClick={() =>
                      setEventTypes({ ...eventTypes, [eventKey]: !isChecked })
                    }
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isChecked
                        ? "bg-purple-50/70 border-purple-300 text-purple-900 dark:bg-purple-950/40 dark:border-purple-800 dark:text-purple-200"
                        : "bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400"
                    }`}
                  >
                    <span className="text-xs font-bold">{eventKey}</span>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isChecked
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-slate-300 dark:border-slate-700"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-border flex justify-end">
              <Button
                onClick={handleSavePreferences}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs gap-1.5 shadow-xs"
              >
                <Save className="w-4 h-4" /> Save Preferences
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================================================================== */}
      {/* MODAL DIALOG: CREATE GROUP                                           */}
      {/* ==================================================================== */}
      {isAddGroupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl p-6 shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> Create Notification Dispatch Group
              </h3>
              <button
                onClick={() => setIsAddGroupModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddGroup} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Group Name
                </label>
                <Input
                  required
                  placeholder="e.g. Indio Ankush All"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Group Scope
                </label>
                <select
                  value={newGroupScope}
                  onChange={(e: any) => setNewGroupScope(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none"
                >
                  <option value="ALL">ALL SITES</option>
                  <option value="LOCATION">LOCATION BOUND</option>
                </select>
              </div>

              {newGroupScope === "LOCATION" && (
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Location Name
                  </label>
                  <Input
                    placeholder="e.g. Wardha, Jaipur, Lucknow"
                    value={newGroupLocation}
                    onChange={(e) => setNewGroupLocation(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Recipient Email
                </label>
                <Input
                  required
                  type="email"
                  placeholder="e.g. ankush.avion@gmail.com"
                  value={newGroupEmail}
                  onChange={(e) => setNewGroupEmail(e.target.value)}
                  className="h-9 text-xs font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddGroupModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-blue-600 text-white font-semibold">
                  Save Group
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
