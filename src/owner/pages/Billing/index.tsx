import { useState } from "react";
import { invoices } from "../../data/ownerMockData";
import { Download, Search, Filter } from "lucide-react";

export default function OwnerBilling() {
  const [search, setSearch] = useState("");

  const totalRevenue = invoices.reduce((acc, i) => acc + (i.status === "paid" ? i.total : 0), 0);
  const pending = invoices.filter((i) => i.status === "pending").reduce((acc, i) => acc + i.total, 0);
  const overdue = invoices.filter((i) => i.status === "overdue").reduce((acc, i) => acc + i.total, 0);
  const taxCollected = invoices.filter((i) => i.status === "paid").reduce((acc, i) => acc + i.tax, 0);

  const filtered = invoices.filter((i) =>
    i.customer.toLowerCase().includes(search.toLowerCase()) ||
    i.number.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors: Record<string, { bg: string; color: string }> = {
    paid: { bg: "#ECFDF5", color: "#059669" },
    pending: { bg: "#FFFBEB", color: "#D97706" },
    overdue: { bg: "#FEF2F2", color: "#DC2626" },
    draft: { bg: "#F8FAFC", color: "#94A3B8" },
  };

  return (
    <div className="space-y-5 pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Billing & Invoices</h1>
          <p className="text-sm text-slate-500 mt-0.5">Revenue, payments, and subscription billing</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white cursor-pointer" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
          + Create Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Collected", value: `₹${(totalRevenue / 100000).toFixed(1)}L`, color: "#10B981", bg: "#ECFDF5" },
          { label: "Pending", value: `₹${(pending / 100000).toFixed(1)}L`, color: "#F59E0B", bg: "#FFFBEB" },
          { label: "Overdue", value: `₹${(overdue / 100000).toFixed(1)}L`, color: "#EF4444", bg: "#FEF2F2" },
          { label: "GST Collected", value: `₹${(taxCollected / 100000).toFixed(1)}L`, color: "#6366F1", bg: "rgba(99,102,241,0.06)" },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-2xl" style={{ background: s.bg, border: `1px solid ${s.color}20` }}>
            <div className="text-2xl font-bold tabular-nums" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-semibold mt-1" style={{ color: s.color }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Subscription Plans Revenue */}
      <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E2E8F0" }}>
        <h3 className="text-sm font-bold text-slate-800 mb-4">Revenue by Plan</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { plan: "Enterprise", rev: "₹3.54 Cr", pct: 95, color: "#6366F1" },
            { plan: "Professional", rev: "₹70L", pct: 38, color: "#8B5CF6" },
            { plan: "Business", rev: "₹23.3L", pct: 18, color: "#3B82F6" },
            { plan: "Basic", rev: "₹4.8L", pct: 6, color: "#64748B" },
          ].map((p) => (
            <div key={p.plan} className="text-center p-4 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
              <div className="text-base font-bold" style={{ color: p.color }}>{p.rev}</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">{p.plan}</div>
              <div className="h-1.5 rounded-full bg-slate-100 mt-2">
                <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Invoice History</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 h-8 rounded-lg" style={{ border: "1px solid #E2E8F0" }}>
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs text-slate-700 bg-transparent outline-none placeholder:text-slate-400 w-36"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-semibold text-slate-600 cursor-pointer" style={{ border: "1px solid #E2E8F0" }}>
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>
        <table className="w-full text-xs">
          <thead style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
            <tr>
              {["Invoice #", "Customer", "Plan", "Amount", "GST", "Total", "Status", "Due Date", "Action"].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-semibold text-slate-400 uppercase tracking-wide text-[10px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((inv) => {
              const sc = statusColors[inv.status];
              return (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-[11px] text-indigo-600 font-semibold">{inv.number}</td>
                  <td className="px-5 py-3 font-semibold text-slate-800">{inv.customer}</td>
                  <td className="px-5 py-3 text-slate-500">{inv.plan}</td>
                  <td className="px-5 py-3 font-semibold tabular-nums text-slate-800">₹{(inv.amount / 100000).toFixed(2)}L</td>
                  <td className="px-5 py-3 tabular-nums text-slate-500">₹{(inv.tax / 100000).toFixed(2)}L</td>
                  <td className="px-5 py-3 font-bold tabular-nums text-slate-900">₹{(inv.total / 100000).toFixed(2)}L</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize" style={{ background: sc.bg, color: sc.color }}>{inv.status}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{inv.dueDate}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer">View</button>
                      <button className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"><Download className="w-3 h-3" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
