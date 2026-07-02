import { useState } from "react";
import { Key, Layers, HardDrive, Database, RefreshCw } from "lucide-react";

type Tab = "api-keys" | "integrations" | "storage" | "database" | "backup";

export default function OwnerSystem() {
  const [activeTab, setActiveTab] = useState<Tab>("api-keys");

  const tabs = [
    { id: "api-keys" as Tab, label: "API Keys", icon: Key },
    { id: "integrations" as Tab, label: "Integrations", icon: Layers },
    { id: "storage" as Tab, label: "Storage", icon: HardDrive },
    { id: "database" as Tab, label: "Database", icon: Database },
    { id: "backup" as Tab, label: "Backup", icon: RefreshCw },
  ];

  const apiKeys = [
    { name: "Production API Key", key: "stms_prod_•••••••3f2a", created: "2026-01-15", lastUsed: "2 min ago", requests: "4.82M/day", status: "active" },
    { name: "Analytics Integration", key: "stms_anl_•••••••9c4e", created: "2026-03-01", lastUsed: "1 hour ago", requests: "142K/day", status: "active" },
    { name: "Webhook Endpoint", key: "stms_wbk_•••••••7a1d", created: "2026-04-12", lastUsed: "5 min ago", requests: "28K/day", status: "active" },
    { name: "Deprecated Mobile Key", key: "stms_mob_•••••••2b8f", created: "2025-06-01", lastUsed: "90 days ago", requests: "0/day", status: "revoked" },
  ];

  const integrations = [
    { name: "SMTP Server", provider: "AWS SES", status: "healthy", lastSync: "Active" },
    { name: "SMS Gateway", provider: "Twilio", status: "healthy", lastSync: "Active" },
    { name: "S3 Storage", provider: "AWS S3", status: "healthy", lastSync: "Active" },
    { name: "Grafana", provider: "Self-hosted", status: "warning", lastSync: "Degraded" },
    { name: "PagerDuty", provider: "PagerDuty Cloud", status: "healthy", lastSync: "Active" },
    { name: "Slack", provider: "Slack API", status: "healthy", lastSync: "Active" },
  ];

  const statusColors: Record<string, string> = {
    healthy: "#10B981", warning: "#F59E0B", down: "#EF4444", active: "#10B981", revoked: "#EF4444",
  };

  return (
    <div className="space-y-5 pb-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">System</h1>
        <p className="text-sm text-slate-500 mt-0.5">Platform system settings, API keys, and infrastructure</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl w-fit" style={{ background: "#F1F5F9" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
            style={{ background: activeTab === t.id ? "#fff" : "transparent", color: activeTab === t.id ? "#6366F1" : "#64748B", boxShadow: activeTab === t.id ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}
          >
            <t.icon className="w-3.5 h-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {/* API Keys */}
      {activeTab === "api-keys" && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white cursor-pointer" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
              <Key className="w-3.5 h-3.5" /> Generate API Key
            </button>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
            <table className="w-full text-xs">
              <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                <tr>
                  {["Name", "Key", "Created", "Last Used", "Requests", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {apiKeys.map((k) => (
                  <tr key={k.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-slate-800">{k.name}</td>
                    <td className="px-5 py-3 font-mono text-[10px] text-slate-500">{k.key}</td>
                    <td className="px-5 py-3 text-slate-400">{k.created}</td>
                    <td className="px-5 py-3 text-slate-500">{k.lastUsed}</td>
                    <td className="px-5 py-3 font-semibold text-slate-700">{k.requests}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize" style={{ background: `${statusColors[k.status]}15`, color: statusColors[k.status] }}>{k.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">Copy</button>
                        {k.status === "active" && <button className="text-xs text-rose-500 hover:underline cursor-pointer">Revoke</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Integrations */}
      {activeTab === "integrations" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {integrations.map((intg) => (
            <div key={intg.name} className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-800">{intg.name}</span>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: statusColors[intg.status] }} />
              </div>
              <div className="text-xs text-slate-400 mb-1">{intg.provider}</div>
              <div className="text-[11px] font-semibold" style={{ color: statusColors[intg.status] }}>{intg.lastSync}</div>
              <button className="mt-3 text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">Configure →</button>
            </div>
          ))}
        </div>
      )}

      {/* Storage */}
      {activeTab === "storage" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Storage", value: "3.78 TB", pct: 85, color: "#F59E0B" },
              { label: "Used", value: "3.21 TB", pct: 85, color: "#EF4444" },
              { label: "Available", value: "570 GB", pct: 15, color: "#10B981" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-5 rounded-2xl" style={{ border: "1px solid #E2E8F0" }}>
                <div className="text-xl font-bold tabular-nums" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">{s.label}</div>
                <div className="h-1.5 rounded-full bg-slate-100 mt-2">
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
            <h3 className="text-sm font-bold text-slate-800 mb-4">Storage Breakdown</h3>
            <div className="space-y-3">
              {[
                { name: "ClickHouse (TSDB)", size: "2.14 TB", pct: 67, color: "#6366F1" },
                { name: "PostgreSQL", size: "848 GB", pct: 22, color: "#8B5CF6" },
                { name: "S3 Attachments", size: "180 GB", pct: 5, color: "#3B82F6" },
                { name: "Redis (Cache)", size: "24 GB", pct: 1, color: "#10B981" },
                { name: "System & Logs", size: "48 GB", pct: 2, color: "#64748B" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: item.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-xs font-medium text-slate-600">{item.name}</span>
                      <span className="text-xs font-bold text-slate-800">{item.size}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full" style={{ width: `${item.pct * 1.2}%`, background: item.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Database */}
      {activeTab === "database" && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "PostgreSQL (Primary)", version: "16.2", size: "848 GB", connections: "142/500", uptime: "99.97%", status: "healthy" },
            { name: "ClickHouse (Analytics)", version: "24.3.1", size: "2.14 TB", connections: "28/100", uptime: "99.82%", status: "warning" },
            { name: "Redis (Cache)", version: "7.2.4", size: "24 GB", connections: "84/1000", uptime: "100.0%", status: "healthy" },
            { name: "Redis (Queue)", version: "7.2.4", size: "8 GB", connections: "32/1000", uptime: "100.0%", status: "healthy" },
          ].map((db) => (
            <div key={db.name} className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-800">{db.name}</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: statusColors[db.status] }} />
                  <span className="text-[11px] font-semibold capitalize" style={{ color: statusColors[db.status] }}>{db.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><div className="text-slate-400">Version</div><div className="font-semibold text-slate-700 mt-0.5 font-mono">{db.version}</div></div>
                <div><div className="text-slate-400">Size</div><div className="font-semibold text-slate-700 mt-0.5">{db.size}</div></div>
                <div><div className="text-slate-400">Connections</div><div className="font-semibold text-slate-700 mt-0.5">{db.connections}</div></div>
                <div><div className="text-slate-400">Uptime</div><div className="font-bold mt-0.5" style={{ color: statusColors[db.status] }}>{db.uptime}</div></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Backup */}
      {activeTab === "backup" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Last Backup", value: "Today 09:00", color: "#10B981" },
              { label: "Backup Size", value: "284 GB", color: "#6366F1" },
              { label: "Next Backup", value: "Today 21:00", color: "#F59E0B" },
            ].map((s) => (
              <div key={s.label} className="bg-white p-4 rounded-2xl" style={{ border: "1px solid #E2E8F0" }}>
                <div className="text-base font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Backup History</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white cursor-pointer" style={{ background: "#6366F1" }}>
                <RefreshCw className="w-3.5 h-3.5" /> Run Now
              </button>
            </div>
            <table className="w-full text-xs">
              <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                <tr>
                  {["Date", "Type", "Size", "Duration", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { date: "2026-07-02 09:00", type: "Full", size: "284 GB", duration: "23 min", status: "success" },
                  { date: "2026-07-02 03:00", type: "Full", size: "284 GB", duration: "—", status: "failed" },
                  { date: "2026-07-01 21:00", type: "Incremental", size: "18 GB", duration: "4 min", status: "success" },
                  { date: "2026-07-01 09:00", type: "Full", size: "282 GB", duration: "22 min", status: "success" },
                  { date: "2026-06-30 21:00", type: "Incremental", size: "16 GB", duration: "3 min", status: "success" },
                ].map((b, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-[10px] text-slate-500">{b.date}</td>
                    <td className="px-5 py-3 text-slate-600">{b.type}</td>
                    <td className="px-5 py-3 text-slate-600">{b.size}</td>
                    <td className="px-5 py-3 text-slate-500">{b.duration}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: b.status === "success" ? "#ECFDF5" : "#FEF2F2", color: b.status === "success" ? "#059669" : "#DC2626" }}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
