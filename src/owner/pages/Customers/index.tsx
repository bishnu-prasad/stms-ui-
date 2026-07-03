import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronRight, Users, Building2, TrendingUp, ArrowUpRight, X, LogIn } from "lucide-react";
import { customers, Customer } from "../../data/ownerMockData";
import { useImpersonation } from "@/contexts/ImpersonationContext";

type Tab = "all" | "health" | "subscriptions" | "plans";

function CustomerCard({ c, onClick }: { c: Customer; onClick: () => void }) {
  const healthColor = { Healthy: "#10B981", Warning: "#F59E0B", Critical: "#EF4444", Offline: "#94A3B8" }[c.health];
  const planColor = { Enterprise: "#6366F1", Professional: "#8B5CF6", Business: "#3B82F6", Basic: "#64748B", Trial: "#F59E0B" }[c.plan];
  const statusColor = { active: "#10B981", trial: "#F59E0B", expired: "#EF4444", suspended: "#94A3B8" }[c.status];
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(99,102,241,0.1)" }}
      onClick={onClick}
      className="bg-white rounded-2xl p-5 cursor-pointer transition-all"
      style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
            {c.logo}
          </div>
          <div>
            <div className="font-bold text-slate-800 text-sm leading-tight">{c.name}</div>
            <div className="text-[11px] font-semibold mt-0.5 px-1.5 py-0.5 rounded inline-block" style={{ background: `${planColor}15`, color: planColor }}>{c.plan}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: healthColor }} />
          <span className="text-[11px] font-bold" style={{ color: healthColor }}>{c.health}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Sites</div>
          <div className="text-sm font-bold text-slate-800 tabular-nums">{c.sites.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Users</div>
          <div className="text-sm font-bold text-slate-800">{c.users}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Uptime</div>
          <div className="text-sm font-bold text-slate-800">{c.uptime}%</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">MRR</div>
          <div className="text-sm font-bold text-slate-800">₹{(c.mrr / 100000).toFixed(1)}L</div>
        </div>
      </div>
      {/* Risk Score Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-slate-400 font-medium">Risk Score</span>
          <span className="font-bold" style={{ color: c.riskScore < 25 ? "#10B981" : c.riskScore < 60 ? "#F59E0B" : "#EF4444" }}>{c.riskScore}/100</span>
        </div>
        <div className="h-1 rounded-full bg-slate-100">
          <div className="h-full rounded-full" style={{ width: `${c.riskScore}%`, background: c.riskScore < 25 ? "#10B981" : c.riskScore < 60 ? "#F59E0B" : "#EF4444" }} />
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize" style={{ background: `${statusColor}12`, color: statusColor }}>{c.status}</span>
        <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-0.5">View details <ChevronRight className="w-3 h-3" /></span>
      </div>
    </motion.div>
  );
}

function CustomerDetail({ c, onClose }: { c: Customer; onClose: () => void }) {
  const healthColor = { Healthy: "#10B981", Warning: "#F59E0B", Critical: "#EF4444", Offline: "#94A3B8" }[c.health];
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["overview", "sites", "users", "revenue", "subscription", "invoices", "alarms", "settings"];
  const { startSuperAdminImpersonation } = useImpersonation();

  const handleOpenWorkspace = () => {
    startSuperAdminImpersonation({
      id: c.id,
      name: c.name,
      logo: c.logo,
      region: c.region,
      status: c.status,
      totalSites: c.sites,
      onlineSites: c.healthySites,
      alarms: c.alarms.critical + c.alarms.major,
      tickets: Math.floor(c.alarms.critical * 1.5),
      vendors: 3,
      admins: 1,
      plan: c.plan
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)", border: "1px solid #E2E8F0" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold text-white" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
              {c.logo}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{c.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold text-indigo-600">{c.plan}</span>
                <span className="text-slate-300">·</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: healthColor }} />
                  <span className="text-xs font-semibold" style={{ color: healthColor }}>{c.health}</span>
                </div>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500">{c.region} Region</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleOpenWorkspace}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-400" /> Open Workspace
            </button>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center cursor-pointer">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 pt-4 border-b border-slate-100 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className="px-3 py-2 text-xs font-semibold capitalize rounded-t-lg transition-colors cursor-pointer whitespace-nowrap"
              style={{ color: activeTab === t ? "#6366F1" : "#94A3B8", borderBottom: activeTab === t ? "2px solid #6366F1" : "2px solid transparent" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Sites", value: c.sites.toLocaleString(), icon: "🗼" },
                { label: "Healthy Sites", value: c.healthySites.toLocaleString(), icon: "✅" },
                { label: "Offline Sites", value: c.offlineSites, icon: "📡" },
                { label: "Users", value: c.users, icon: "👥" },
                { label: "Devices", value: c.devices.toLocaleString(), icon: "💾" },
                { label: "Uptime", value: `${c.uptime}%`, icon: "📊" },
                { label: "Monthly Revenue", value: `₹${(c.mrr / 100000).toFixed(1)}L`, icon: "💰" },
                { label: "Annual Revenue", value: `₹${(c.arr / 10000000).toFixed(2)}Cr`, icon: "📈" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl text-center" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="text-base font-bold text-slate-800 mt-1 tabular-nums">{stat.value}</div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">{stat.label}</div>
                </div>
              ))}
              {/* Alarms Summary */}
              <div className="col-span-2 p-4 rounded-xl" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                <h4 className="text-xs font-bold text-red-700 mb-3">Active Alarms</h4>
                <div className="flex items-center gap-4">
                  <div className="text-center"><div className="text-xl font-bold text-red-600">{c.alarms.critical}</div><div className="text-[10px] text-red-400">Critical</div></div>
                  <div className="text-center"><div className="text-xl font-bold text-amber-600">{c.alarms.major}</div><div className="text-[10px] text-amber-400">Major</div></div>
                  <div className="text-center"><div className="text-xl font-bold text-slate-500">{c.alarms.minor}</div><div className="text-[10px] text-slate-400">Minor</div></div>
                </div>
              </div>
              <div className="col-span-2 p-4 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <h4 className="text-xs font-bold text-slate-700 mb-3">Subscription Details</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Plan</span><span className="font-semibold text-indigo-600">{c.plan}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Circle</span><span className="font-semibold text-slate-700">{c.circle}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Joined</span><span className="font-semibold text-slate-700">{c.joinDate}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Renewal</span><span className="font-semibold text-slate-700">{c.renewalDate}</span></div>
                  {c.invoiceDue > 0 && (
                    <div className="flex justify-between"><span className="text-slate-500">Invoice Due</span><span className="font-bold text-red-600">₹{(c.invoiceDue / 100000).toFixed(2)}L</span></div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab !== "overview" && (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400">
              <div className="text-4xl mb-3">🚧</div>
              <div className="text-sm font-semibold capitalize">{activeTab} tab content</div>
              <div className="text-xs mt-1">Coming soon in next iteration</div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function OwnerCustomers() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: "All Customers" },
    { id: "health", label: "Customer Health" },
    { id: "subscriptions", label: "Subscriptions" },
    { id: "plans", label: "Customer Plans" },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.plan.toLowerCase().includes(search.toLowerCase()) ||
      c.region.toLowerCase().includes(search.toLowerCase())
  );

  const summaryStats = [
    { label: "Total", value: customers.length, color: "#6366F1" },
    { label: "Active", value: customers.filter((c) => c.status === "active").length, color: "#10B981" },
    { label: "Trial", value: customers.filter((c) => c.status === "trial").length, color: "#F59E0B" },
    { label: "Expired", value: customers.filter((c) => c.status === "expired").length, color: "#EF4444" },
  ];

  return (
    <div className="space-y-5 pb-6">
      <AnimatePresence>
        {selectedCustomer && <CustomerDetail c={selectedCustomer} onClose={() => setSelectedCustomer(null)} />}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Customers</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage all STMS platform customers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white cursor-pointer" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
          <Users className="w-3.5 h-3.5" /> + New Customer
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-white p-4 rounded-xl text-center" style={{ border: "1px solid #E2E8F0" }}>
            <div className="text-2xl font-bold tabular-nums" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-semibold text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: "#F1F5F9" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{ background: activeTab === t.id ? "#fff" : "transparent", color: activeTab === t.id ? "#6366F1" : "#64748B", boxShadow: activeTab === t.id ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 h-9 rounded-lg w-full max-w-xs" style={{ border: "1px solid #E2E8F0", background: "#fff" }}>
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-xs bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* Customer Cards */}
      {activeTab === "all" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map((c) => (
            <CustomerCard key={c.id} c={c} onClick={() => setSelectedCustomer(c)} />
          ))}
        </div>
      )}

      {/* Health Tab */}
      {activeTab === "health" && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              <tr>
                {["Customer", "Health", "Uptime", "Sites", "Offline Sites", "Critical Alarms", "Risk Score"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((c) => {
                const hc = { Healthy: "#10B981", Warning: "#F59E0B", Critical: "#EF4444", Offline: "#94A3B8" }[c.health];
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelectedCustomer(c)}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg text-[10px] font-bold text-white flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>{c.logo}</div>
                        <span className="font-semibold text-slate-800">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3"><span className="font-bold" style={{ color: hc }}>{c.health}</span></td>
                    <td className="px-5 py-3 font-semibold tabular-nums">{c.uptime}%</td>
                    <td className="px-5 py-3 tabular-nums">{c.sites.toLocaleString()}</td>
                    <td className="px-5 py-3 font-semibold" style={{ color: c.offlineSites > 100 ? "#EF4444" : "#64748B" }}>{c.offlineSites}</td>
                    <td className="px-5 py-3 font-bold" style={{ color: c.alarms.critical > 10 ? "#EF4444" : c.alarms.critical > 0 ? "#F59E0B" : "#10B981" }}>{c.alarms.critical}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-100 w-16">
                          <div className="h-full rounded-full" style={{ width: `${c.riskScore}%`, background: c.riskScore < 25 ? "#10B981" : c.riskScore < 60 ? "#F59E0B" : "#EF4444" }} />
                        </div>
                        <span className="font-bold tabular-nums" style={{ color: c.riskScore < 25 ? "#10B981" : c.riskScore < 60 ? "#F59E0B" : "#EF4444" }}>{c.riskScore}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Subscriptions Tab */}
      {activeTab === "subscriptions" && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              <tr>
                {["Customer", "Plan", "MRR", "ARR", "Status", "Joined", "Renewal Date", "Invoice Due"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((c) => {
                const sc = { active: "#10B981", trial: "#F59E0B", expired: "#EF4444", suspended: "#94A3B8" }[c.status];
                const pc = { Enterprise: "#6366F1", Professional: "#8B5CF6", Business: "#3B82F6", Basic: "#64748B", Trial: "#F59E0B" }[c.plan];
                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-800">{c.name}</td>
                    <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `${pc}15`, color: pc }}>{c.plan}</span></td>
                    <td className="px-5 py-3 font-bold tabular-nums text-slate-800">₹{(c.mrr / 100000).toFixed(1)}L</td>
                    <td className="px-5 py-3 tabular-nums text-slate-600">₹{(c.arr / 10000000).toFixed(2)}Cr</td>
                    <td className="px-5 py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize" style={{ background: `${sc}15`, color: sc }}>{c.status}</span></td>
                    <td className="px-5 py-3 text-slate-500">{c.joinDate}</td>
                    <td className="px-5 py-3 text-slate-500">{c.renewalDate}</td>
                    <td className="px-5 py-3 font-bold" style={{ color: c.invoiceDue > 0 ? "#EF4444" : "#10B981" }}>
                      {c.invoiceDue > 0 ? `₹${(c.invoiceDue / 100000).toFixed(1)}L` : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "plans" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: "Enterprise", price: "₹12L+/yr", sites: "Unlimited", users: "Unlimited", sla: "99.9%", color: "#6366F1", count: 8 },
            { name: "Professional", price: "₹4L–12L/yr", sites: "Up to 2000", users: "200", sla: "99.5%", color: "#8B5CF6", count: 24 },
            { name: "Business", price: "₹1.2L–4L/yr", sites: "Up to 500", users: "50", sla: "99%", color: "#3B82F6", count: 42 },
            { name: "Basic", price: "₹40K–1.2L/yr", sites: "Up to 200", users: "20", sla: "99%", color: "#64748B", count: 31 },
            { name: "Trial", price: "₹0 (30 days)", sites: "Up to 50", users: "5", sla: "Standard", color: "#F59E0B", count: 12 },
            { name: "Custom", price: "Negotiated", sites: "Custom", users: "Custom", sla: "Custom", color: "#10B981", count: 7 },
          ].map((plan) => (
            <div key={plan.name} className="bg-white rounded-2xl p-5" style={{ border: `2px solid ${plan.color}20` }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold" style={{ color: plan.color }}>{plan.name}</span>
                <span className="text-lg font-bold text-slate-800">{plan.count}</span>
              </div>
              <div className="text-base font-bold text-slate-900 mb-3">{plan.price}</div>
              <div className="space-y-1.5 text-xs text-slate-500">
                <div className="flex justify-between"><span>Sites</span><span className="font-semibold text-slate-700">{plan.sites}</span></div>
                <div className="flex justify-between"><span>Users</span><span className="font-semibold text-slate-700">{plan.users}</span></div>
                <div className="flex justify-between"><span>SLA</span><span className="font-semibold text-slate-700">{plan.sla}</span></div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{plan.count} Active Customers</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
