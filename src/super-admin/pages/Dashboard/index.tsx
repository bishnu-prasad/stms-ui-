import { 
  Building2, Users, HardDrive, ShieldCheck, FileText, 
  RefreshCw, CheckCircle2, AlertCircle, Clock, Plus, Zap, Box, Activity
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { 
  platformHealthServices, kpiStats, pendingTasks, 
  securityMetrics, auditLogs, resourceCharts 
} from "../../data/mockData";

export default function SuperAdminDashboard() {
  const kpiItems = [
    { label: "Customers", value: kpiStats.customers.value, trend: kpiStats.customers.trend, trendType: kpiStats.customers.trendType },
    { label: "Platform Users", value: kpiStats.platformUsers.value, trend: kpiStats.platformUsers.trend, trendType: kpiStats.platformUsers.trendType },
    { label: "Online Devices", value: kpiStats.devices.value, trend: kpiStats.devices.trend, trendType: kpiStats.devices.trendType },
    { label: "Platform Services", value: kpiStats.platformServices.value, trend: kpiStats.platformServices.trend, trendType: kpiStats.platformServices.trendType },
    { label: "Pending Approvals", value: kpiStats.pendingApprovals.value, trend: kpiStats.pendingApprovals.trend, trendType: kpiStats.pendingApprovals.trendType },
    { label: "Open Tickets", value: kpiStats.openTickets.value, trend: kpiStats.openTickets.trend, trendType: kpiStats.openTickets.trendType },
    { label: "Expired Licenses", value: kpiStats.expiredLicenses.value, trend: kpiStats.expiredLicenses.trend, trendType: kpiStats.expiredLicenses.trendType },
    { label: "Failed Backups", value: kpiStats.failedBackups.value, trend: kpiStats.failedBackups.trend, trendType: kpiStats.failedBackups.trendType },
  ];

  return (
    <div className="space-y-6">
      {/* ── HERO BANNER ────────────────────────────────────────────── */}
      <div className="bg-[#1E293B] rounded-xl p-6 border border-slate-700/60 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight mb-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span> Super Admin Control Center
          </h1>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/70 px-2.5 py-0.5 rounded border border-emerald-800/60">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> All Systems Operational
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Manage global customer tenants, system users, compute infrastructure, and security policies across the STMS enterprise suite.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-700/80 transition-colors">
            <Plus className="w-3.5 h-3.5 text-blue-400" /> Add Customer
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-700/80 transition-colors">
            <Users className="w-3.5 h-3.5 text-blue-400" /> Create User
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-700/80 transition-colors">
            <HardDrive className="w-3.5 h-3.5 text-emerald-400" /> Backup DB
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 shadow-md shadow-blue-600/20 transition-colors">
            <Activity className="w-3.5 h-3.5" /> System Health
          </button>
        </div>
      </div>

      {/* ── KPI CARDS ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiItems.map((kpi, idx) => {
          const trendColor = {
            positive: "text-emerald-400",
            negative: "text-red-400",
            warning: "text-amber-400",
            neutral: "text-slate-400"
          }[kpi.trendType];

          return (
            <div key={idx} className="bg-[#1E293B] rounded-xl p-4 border border-slate-700/60 shadow-md">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">{kpi.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-2xl font-extrabold text-slate-100 tabular-nums leading-none">
                  {kpi.value.toLocaleString()}
                </div>
                <div className={`text-xs font-bold ${trendColor}`}>
                  {kpi.trend}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* ── LEFT COLUMN ────────────────────────────────────────── */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* QUICK ACTIONS */}
          <div className="bg-[#1E293B] rounded-xl border border-slate-700/60 shadow-md overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-700/60 bg-slate-900/40">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Quick Administrative Actions</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-800/80">
              {[
                { label: "Create Customer", icon: Building2 },
                { label: "Platform User", icon: Users },
                { label: "Assign License", icon: ShieldCheck },
                { label: "Register Vendor", icon: Box },
                { label: "Generate Report", icon: FileText },
                { label: "Restart Service", icon: RefreshCw },
                { label: "API Keys", icon: Zap },
                { label: "Database Backup", icon: HardDrive },
              ].map((action, i) => (
                <button key={i} className="bg-[#1E293B] p-4 flex flex-col items-center justify-center gap-2 hover:bg-slate-800/80 transition-colors group">
                  <action.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PLATFORM HEALTH */}
          <div className="bg-[#1E293B] rounded-xl border border-slate-700/60 shadow-md">
            <div className="px-5 py-3.5 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/40">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Microservices Status</h2>
              <button className="text-xs font-semibold text-blue-400 hover:text-blue-300">Infrastructure Detail →</button>
            </div>
            <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {platformHealthServices.map((svc) => (
                <div key={svc.id} className="p-3 rounded-lg border border-slate-700/50 bg-slate-900/40 flex items-start justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-200 mb-1">{svc.name}</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                      <span>{svc.uptime}%</span>
                      <span>•</span>
                      <span>{svc.responseTime}ms</span>
                    </div>
                  </div>
                  {svc.status === 'healthy' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEM RESOURCES (Charts) */}
          <div className="bg-[#1E293B] rounded-xl border border-slate-700/60 shadow-md">
            <div className="px-5 py-3.5 border-b border-slate-700/60 bg-slate-900/40">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Resource Utilization Trends</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CPU Chart */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 mb-4">Cluster CPU Load (%)</h3>
                <ResponsiveContainer width="100%" height={120}>
                  <AreaChart data={resourceCharts.cpu} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #334155', background: '#0F172A', color: '#F8FAFC' }} />
                    <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" />
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              {/* API Traffic */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 mb-4">API Gateway (requests/min)</h3>
                <ResponsiveContainer width="100%" height={120}>
                  <AreaChart data={resourceCharts.apiTraffic} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #334155', background: '#0F172A', color: '#F8FAFC' }} />
                    <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorApi)" />
                    <defs>
                      <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ───────────────────────────────────────── */}
        <div className="space-y-6">
          
          {/* USER SUMMARY */}
          <div className="bg-[#1E293B] rounded-xl border border-slate-700/60 shadow-md overflow-hidden">
             <div className="px-5 py-3.5 border-b border-slate-700/60 bg-slate-900/40">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Account Distribution</h2>
            </div>
            <div className="divide-y divide-slate-700/40">
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-xs font-medium text-slate-300">Platform Admins</span>
                <span className="text-xs font-mono font-bold text-blue-400 bg-slate-800 px-2 py-0.5 rounded">18</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-xs font-medium text-slate-300">Customer Admins</span>
                <span className="text-xs font-mono font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded">124</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3">
                <span className="text-xs font-medium text-slate-300">Vendor Users</span>
                <span className="text-xs font-mono font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded">32</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3 bg-red-950/20">
                <span className="text-xs font-medium text-red-400">Locked Accounts</span>
                <span className="text-xs font-mono font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/50">{securityMetrics.failedLogins}</span>
              </div>
            </div>
          </div>

          {/* SECURITY CENTER */}
          <div className="bg-[#1E293B] rounded-xl border border-slate-700/60 shadow-md overflow-hidden">
             <div className="px-5 py-3.5 border-b border-slate-700/60 bg-slate-900/40">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Security Telemetry</h2>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-700/40 border-b border-slate-700/40">
              <div className="p-4 flex flex-col items-center justify-center text-center">
                <div className="text-xl font-extrabold text-slate-100">{securityMetrics.blockedIps}</div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase mt-1">Blocked IPs</div>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center">
                <div className="text-xl font-extrabold text-emerald-400">{securityMetrics.mfaEnabled}</div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase mt-1">MFA Enabled</div>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center">
                <div className="text-xl font-extrabold text-blue-400">{securityMetrics.activeSessions}</div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase mt-1">Active Sessions</div>
              </div>
              <div className="p-4 flex flex-col items-center justify-center text-center">
                <div className="text-xl font-extrabold text-amber-400">{securityMetrics.passwordExpiry}</div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase mt-1">Pass Expiry (7d)</div>
              </div>
            </div>
          </div>

          {/* PENDING TASKS */}
          <div className="bg-[#1E293B] rounded-xl border border-slate-700/60 shadow-md">
             <div className="px-5 py-3.5 border-b border-slate-700/60 bg-slate-900/40">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Action Required</h2>
            </div>
            <div className="divide-y divide-slate-700/40">
              {pendingTasks.map((task) => (
                <div key={task.id} className="p-3.5 hover:bg-slate-800/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">{task.type}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono"><Clock className="w-3 h-3"/> {task.time}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 mb-0.5">{task.target}</div>
                  <div className="text-[11px] text-slate-400">Req: {task.requestedBy}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── AUDIT LOGS TIMELINE ────────────────────────────────────── */}
      <div className="bg-[#1E293B] rounded-xl border border-slate-700/60 shadow-md">
        <div className="px-5 py-3.5 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/40">
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Security & Operational Audit Log</h2>
          <button className="text-xs font-semibold text-blue-400 hover:text-blue-300">Full Log →</button>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-700/60">
                <tr>
                  <th className="pb-3 px-3 font-semibold">Time</th>
                  <th className="pb-3 px-3 font-semibold">Actor</th>
                  <th className="pb-3 px-3 font-semibold">Action</th>
                  <th className="pb-3 px-3 font-semibold">Resource Target</th>
                  <th className="pb-3 px-3 font-semibold">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">{log.time}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-200 whitespace-nowrap">{log.actor}</td>
                    <td className="py-2.5 px-3 text-blue-400 font-semibold whitespace-nowrap">{log.action}</td>
                    <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap max-w-[200px] truncate">{log.resource}</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono whitespace-nowrap">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between py-4 text-[11px] text-slate-400 border-t border-slate-800">
        <div className="flex items-center gap-4 font-mono">
          <span>STMS Enterprise Console v3.4.1</span>
          <span>•</span>
          <span>Environment: Production</span>
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <span>Last Backup: 45m ago</span>
          <a href="#" className="text-blue-400 hover:text-blue-300">System Manual</a>
        </div>
      </div>
    </div>
  );
}
