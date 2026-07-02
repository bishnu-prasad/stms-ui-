import { useState } from "react";
import { activityFeed } from "../../data/ownerMockData";
import { Search, Filter, Download } from "lucide-react";

export default function OwnerAuditLogs() {
  const [search, setSearch] = useState("");

  const extendedLogs = [
    ...activityFeed,
    { id: "act-011", icon: "⚙️", action: "System Config Changed", detail: "Email SMTP settings updated", actor: "Arjun Mehta", timestamp: "2026-07-02T06:30:00Z", type: "system" as const },
    { id: "act-012", icon: "🔐", action: "Password Reset", detail: "Admin password reset — Anjali Nair", actor: "Arjun Mehta", timestamp: "2026-07-02T06:00:00Z", type: "security" as const },
    { id: "act-013", icon: "📤", action: "Report Exported", detail: "June 2026 Revenue Report — PDF", actor: "Rahul Kumar", timestamp: "2026-07-01T17:30:00Z", type: "system" as const },
    { id: "act-014", icon: "🏢", action: "Customer Plan Changed", detail: "BSNL: Professional → Enterprise", actor: "Priya Sharma", timestamp: "2026-07-01T15:00:00Z", type: "customer" as const },
  ];

  const typeColors: Record<string, { bg: string; color: string }> = {
    customer: { bg: "rgba(99,102,241,0.08)", color: "#6366F1" },
    vendor: { bg: "rgba(139,92,246,0.08)", color: "#8B5CF6" },
    billing: { bg: "rgba(16,185,129,0.08)", color: "#10B981" },
    system: { bg: "rgba(100,116,139,0.08)", color: "#64748B" },
    security: { bg: "rgba(239,68,68,0.08)", color: "#EF4444" },
    user: { bg: "rgba(245,158,11,0.08)", color: "#F59E0B" },
  };

  const filtered = extendedLogs.filter((e) =>
    e.action.toLowerCase().includes(search.toLowerCase()) ||
    e.actor.toLowerCase().includes(search.toLowerCase()) ||
    e.detail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Audit Logs</h1>
          <p className="text-sm text-slate-500 mt-0.5">Complete history of all platform actions</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer" style={{ border: "1px solid #E2E8F0", background: "#fff" }}>
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer" style={{ border: "1px solid #E2E8F0", background: "#fff" }}>
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 h-9 rounded-lg w-full max-w-sm" style={{ border: "1px solid #E2E8F0", background: "#fff" }}>
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-xs bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
        <table className="w-full text-xs">
          <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
            <tr>
              {["Time", "Action", "Detail", "Actor", "Type"].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((log) => {
              const tc = typeColors[log.type] ?? typeColors.system;
              return (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 text-slate-400 font-mono text-[10px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{log.icon}</span>
                      <span className="font-semibold text-slate-800">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500 max-w-xs truncate">{log.detail}</td>
                  <td className="px-5 py-3 font-semibold text-slate-700">{log.actor}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize" style={{ background: tc.bg, color: tc.color }}>{log.type}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filtered.length} of {extendedLogs.length} events</span>
          <button className="font-semibold text-indigo-600 hover:underline cursor-pointer">Load more →</button>
        </div>
      </div>
    </div>
  );
}
