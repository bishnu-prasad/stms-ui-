import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Building2, Server, Activity, AlertTriangle, Radio, Settings, Wrench, HardDrive, Share2, Plus,
  RefreshCw, UploadCloud, ChevronRight, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, Search, Filter,
  MapPin, Clock, Battery, Zap, AlertCircle
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from "recharts";
import {
  kpiStats, customerHealth, alarmCategories, availabilityData,
  criticalSitesData, recentActivities
} from "./DashboardData";
import { CustomerDrawer } from "../../components/CustomerDrawer";
import { customers } from "../../data/operationalMockData";

export default function SuperAdminDashboard() {
  const [activeFilter, setActiveFilter] = useState("All");

  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);

  return (
    <div className="space-y-6 pb-12">
      {/* ── HEADER & GLOBAL FILTERS ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time global telemetry, alarm triage, and edge configuration operations.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 shadow-sm">
            {["All", "North", "South", "East", "West"].map((region) => (
              <button
                key={region}
                onClick={() => setActiveFilter(region)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeFilter === region
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
              >
                {region}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-colors">
            <Filter className="w-3.5 h-3.5" /> More Filters
          </button>
        </div>
      </div>

      {/* ── 1. EXECUTIVE KPI OVERVIEW ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[
          { label: "Total Customers", data: kpiStats.totalCustomers, icon: Building2, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "Active Customers", data: kpiStats.activeCustomers, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Total Sites", data: kpiStats.totalSites, icon: MapPin, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
          { label: "Online Sites", data: kpiStats.onlineSites, icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
          { label: "Offline Sites", data: kpiStats.offlineSites, icon: XCircle, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
          { label: "Active Alarms", data: kpiStats.activeAlarms, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
          { label: "Open Tickets", data: kpiStats.openTickets, icon: Wrench, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
          { label: "Online Gateways", data: kpiStats.onlineGateways, icon: Radio, color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-900/20" },
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-1.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-bold flex items-center gap-0.5 ${kpi.data.isUp ? "text-emerald-600" : "text-rose-600"}`}>
                {kpi.data.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {kpi.data.trend}
              </span>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
              {kpi.data.value.toLocaleString()}
            </div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5 group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
              {kpi.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── LEFT COLUMN (WIDER) ── */}
        <div className="xl:col-span-2 space-y-6">

          {/* ── 3. SITE OVERVIEW & AVAILABILITY ── */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-500" /> Global Site Availability
              </h2>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">24h View</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
              {[
                { label: "Online", value: 12100, color: "text-emerald-600" },
                { label: "On Battery", value: 450, color: "text-amber-500" },
                { label: "On DG", value: 120, color: "text-purple-500" },
                { label: "Comm. Fail", value: 85, color: "text-slate-500" },
                { label: "Critical", value: 45, color: "text-rose-600" }
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 pl-3 py-1" style={{ borderColor: "currentColor", color: "var(--tw-text-opacity)" }}>
                  <div className={`text-lg font-bold tabular-nums ${stat.color}`}>{stat.value.toLocaleString()}</div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={availabilityData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="online" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorOnline)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── 2. CUSTOMER HEALTH OVERVIEW ── */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-500" /> Customer Health Matrix
              </h2>
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 uppercase">View All Customers</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3 text-center">Sites (H/C)</th>
                    <th className="px-4 py-3 text-center">Availability</th>
                    <th className="px-4 py-3 text-center">Tickets</th>
                    <th className="px-4 py-3 text-center">SLA Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {customerHealth.map((c) => {
                    const fullCustomerInfo = customers.find(cust => cust.name === c.name);
                    return (
                      <tr 
                        key={c.id} 
                        onClick={() => fullCustomerInfo && setSelectedCustomer(fullCustomerInfo)}
                        className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${selectedCustomer?.name === c.name ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                      >
                        <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{c.name}</td>
                      <td className="px-4 py-3 text-center font-mono">
                        <span className="text-slate-700 dark:text-slate-300">{c.totalSites}</span>
                        <span className="text-slate-400 mx-1">|</span>
                        <span className="text-emerald-600">{c.healthySites}</span>
                        <span className="text-slate-400 mx-1">|</span>
                        <span className={c.criticalSites > 20 ? "text-rose-600 font-bold" : "text-amber-500"}>{c.criticalSites}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${c.availability}%` }} />
                          </div>
                          <span className="font-bold tabular-nums">{c.availability}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-slate-600 dark:text-slate-300">{c.openTickets}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${c.slaStatus === 'Healthy' ? 'bg-emerald-100 text-emerald-700' :
                            c.slaStatus === 'Warning' ? 'bg-amber-100 text-amber-700' :
                              'bg-rose-100 text-rose-700'
                          }`}>
                          {c.slaStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-blue-600 font-bold hover:underline">Monitor</button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 9. CRITICAL SITES TRIAGE ── */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-rose-600 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 animate-pulse" /> Critical Sites Triage
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-rose-50 dark:bg-rose-900/10 text-rose-800 dark:text-rose-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Site ID / Name</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Current Alarm</th>
                    <th className="px-4 py-3">Gateway</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {criticalSitesData.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-mono font-bold text-slate-900 dark:text-white">{s.id}</div>
                        <div className="text-[10px] text-slate-500">{s.name} ({s.region})</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">{s.customer}</td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-rose-600 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> {s.alarm}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-0.5">Pwr: {s.power}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`font-bold flex items-center gap-1 ${s.gwStatus === 'Online' ? 'text-emerald-600' : 'text-slate-500'}`}>
                          {s.gwStatus === 'Online' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {s.gwStatus}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Last Sync: {s.lastComm}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="px-3 py-1 bg-rose-100 text-rose-700 hover:bg-rose-200 font-bold rounded">Triage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 7 & 8. VENDOR & TICKET OPERATIONS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Vendor Operations */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-500" /> Vendor Operations
                </h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase">Active Vendors</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">18</div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-100 dark:border-orange-900/30">
                    <div className="text-[10px] font-semibold text-orange-600 uppercase">SLA Breaches</div>
                    <div className="text-xl font-bold text-orange-700 dark:text-orange-400 mt-1">4</div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Open Dispatch Jobs</span>
                  <span className="font-bold tabular-nums">142</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Average Response</span>
                  <span className="font-bold tabular-nums text-emerald-600">42 mins</span>
                </div>
              </div>
            </div>

            {/* Ticket Center */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-purple-500" /> Ticket Center
                </h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase">Open Tickets</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">128</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-lg border border-purple-100 dark:border-purple-900/30">
                    <div className="text-[10px] font-semibold text-purple-600 uppercase">Escalated</div>
                    <div className="text-xl font-bold text-purple-700 dark:text-purple-400 mt-1">12</div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Resolved Today</span>
                  <span className="font-bold tabular-nums text-emerald-600">45</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Pending Approval</span>
                  <span className="font-bold tabular-nums">8</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ── RIGHT COLUMN (NARROWER) ── */}
        <div className="space-y-6">

          {/* ── 11. QUICK ACTIONS ── */}
          <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none">
              <Zap className="w-24 h-24 text-blue-500" />
            </div>
            <h2 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 relative z-10">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2 relative z-10">
              <button className="flex items-center gap-2 p-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200 transition-colors">
                <Plus className="w-3.5 h-3.5 text-blue-400" /> Add Site
              </button>
              <button className="flex items-center gap-2 p-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200 transition-colors">
                <UploadCloud className="w-3.5 h-3.5 text-emerald-400" /> Push Config
              </button>
              <button className="flex items-center gap-2 p-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200 transition-colors">
                <Wrench className="w-3.5 h-3.5 text-orange-400" /> Create Ticket
              </button>
              <button className="flex items-center gap-2 p-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200 transition-colors">
                <Users className="w-3.5 h-3.5 text-purple-400" /> Assign Vendor
              </button>
            </div>
          </div>

          {/* ── 4. ALARM CENTER ── */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Alarm Intelligence
            </h2>
            <div className="space-y-3">
              {alarmCategories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tabular-nums text-slate-900 dark:text-white">{cat.count}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/10 rounded-lg hover:bg-amber-100 transition-colors">
              View All Active Alarms
            </button>
          </div>

          {/* ── 5 & 6. GATEWAY & CONFIGURATION CENTER ── */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Server className="w-4 h-4 text-teal-500" /> Edge Configuration Ops
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">Pending Sync</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">142</div>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/10 p-3 rounded-lg border border-rose-100 dark:border-rose-900/30">
                  <div className="text-[10px] font-semibold text-rose-600 uppercase">Failed Pushes</div>
                  <div className="text-xl font-bold text-rose-700 dark:text-rose-400 mt-1">18</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                  <span>Global Firmware Compliance (v2.4)</span>
                  <span className="text-emerald-600">92%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">MQTT Heartbeat Rate</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-500" /> 12,150 / min
                </span>
              </div>
            </div>
          </div>

          {/* ── 10. RECENT ACTIVITY TIMELINE ── */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-slate-500" /> NOC Activity Log
            </h2>
            <div className="relative border-l border-slate-200 dark:border-slate-700 ml-2 space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="relative pl-4">
                  <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 ${act.type === 'config' ? 'bg-blue-500' :
                      act.type === 'alarm' ? 'bg-rose-500' :
                        act.type === 'vendor' ? 'bg-orange-500' : 'bg-emerald-500'
                    }`} />
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-tight">{act.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-semibold text-slate-400">{act.time}</span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] font-semibold text-slate-500">{act.user}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors uppercase tracking-widest border-t border-slate-100 dark:border-slate-800">
              View Audit Trail
            </button>
          </div>

        </div>
      </div>

      <CustomerDrawer 
        customer={selectedCustomer as any} 
        onClose={() => setSelectedCustomer(null)} 
      />
    </div>
  );
}
