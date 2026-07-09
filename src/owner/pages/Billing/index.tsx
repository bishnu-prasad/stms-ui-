import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { invoices, customers } from "../../data/ownerMockData";
import { Download, Search } from "lucide-react";

interface Invoice {
  id: string;
  number: string;
  customer: string;
  plan: string;
  amount: number;
  tax: number;
  total: number;
  status: "paid" | "pending" | "overdue" | "draft";
  dueDate: string;
}

function AddInvoiceModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (inv: Invoice) => void;
}) {
  const [customerName, setCustomerName] = useState(customers[0]?.name || "Reliance Jio");
  const [plan, setPlan] = useState("Enterprise");
  const [amount, setAmount] = useState(0);
  const [gstPercent, setGstPercent] = useState(18);
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"paid" | "pending" | "overdue" | "draft">("pending");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    const baseVal = Number(amount);
    const taxVal = baseVal * (gstPercent / 100);
    const totalVal = baseVal + taxVal;

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      number: `INV-2026-0${843 + Math.floor(Math.random() * 9000)}`,
      customer: customerName,
      plan,
      amount: baseVal,
      tax: taxVal,
      total: totalVal,
      status,
      dueDate: dueDate || new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    };

    onSave(newInvoice);
    onClose();
    setAmount(0);
    setGstPercent(18);
    setDueDate("");
    setStatus("pending");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col p-6 space-y-4 shadow-xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h2 className="text-sm font-bold text-slate-800">Create New Invoice</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm leading-none cursor-pointer">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-600">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Customer</label>
            <select
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full h-8.5 rounded-lg border border-slate-200 px-2 outline-none focus:border-indigo-500"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Plan</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-2 outline-none focus:border-indigo-500"
              >
                <option value="Enterprise">Enterprise</option>
                <option value="Professional">Professional</option>
                <option value="Business">Business</option>
                <option value="Basic">Basic</option>
                <option value="Trial">Trial</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-2 outline-none focus:border-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Base Amount (in ₹)</label>
              <input
                type="number"
                required
                placeholder="e.g. 500000"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">GST Rate (%)</label>
              <select
                value={gstPercent}
                onChange={(e) => setGstPercent(Number(e.target.value))}
                className="w-full h-8.5 rounded-lg border border-slate-200 px-2 outline-none focus:border-indigo-500"
              >
                <option value={18}>18% (Standard)</option>
                <option value={12}>12%</option>
                <option value={5}>5%</option>
                <option value={0}>0% (Exempt)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Due Date</label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full h-8.5 rounded-lg border border-slate-200 px-3 outline-none focus:border-indigo-500"
            />
          </div>

          {amount > 0 && (
            <div className="bg-slate-50 p-3 rounded-lg space-y-1 text-[11px] border border-slate-100">
              <div className="flex justify-between"><span>Base:</span><span className="font-semibold">₹{amount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>GST ({gstPercent}%):</span><span className="font-semibold">₹{(amount * (gstPercent / 100)).toLocaleString()}</span></div>
              <div className="flex justify-between border-t pt-1 font-bold text-slate-800"><span>Total:</span><span>₹{(amount * (1 + gstPercent / 100)).toLocaleString()}</span></div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="h-8.5 px-4 rounded-lg text-slate-600 hover:bg-slate-50 border border-slate-200 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-8.5 px-5 rounded-lg text-white font-bold cursor-pointer transition-all active:scale-95 shadow-sm"
              style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OwnerBilling() {
  const [invoicesList, setInvoicesList] = useState<Invoice[]>(invoices as any);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const totalRevenue = invoicesList.reduce((acc, i) => acc + (i.status === "paid" ? i.total : 0), 0);
  const pending = invoicesList.filter((i) => i.status === "pending").reduce((acc, i) => acc + i.total, 0);
  const overdue = invoicesList.filter((i) => i.status === "overdue").reduce((acc, i) => acc + i.total, 0);
  const taxCollected = invoicesList.filter((i) => i.status === "paid").reduce((acc, i) => acc + i.tax, 0);

  const filtered = invoicesList.filter((i) =>
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
      <AnimatePresence>
        {isAddModalOpen && (
          <AddInvoiceModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={(newInv) => setInvoicesList([newInv, ...invoicesList])}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Billing & Invoices</h1>
          <p className="text-sm text-slate-500 mt-0.5">Revenue, payments, and subscription billing</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white cursor-pointer transition-all active:scale-95 shadow-sm"
          style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}
        >
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
              const sc = statusColors[inv.status] || { bg: "#F8FAFC", color: "#94A3B8" };
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
                      <button className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"><Download className="w-3.5 h-3.5" /></button>
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
