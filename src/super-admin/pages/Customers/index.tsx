import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { superAdminCustomers } from "../../data/mockData";

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = superAdminCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.orgId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Customers</h1>
          <p className="text-xs text-slate-400 mt-1">Manage tenant environments and site limits.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-700/80 transition-colors shadow-sm">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/20">
            <Plus className="w-3.5 h-3.5" /> Provision Customer
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#1E293B] border border-slate-700/60 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/40">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#0F172A] border border-slate-700 text-slate-100 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="text-xs font-semibold text-slate-400">
            Showing {filtered.length} customers
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-900/60 border-b border-slate-700/60 text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              <tr>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Org ID</th>
                <th className="px-6 py-4">Subscription Plan</th>
                <th className="px-6 py-4 text-right">Sites</th>
                <th className="px-6 py-4 text-right">MRR</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Provisioned</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-100">{customer.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{customer.id}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-mono">{customer.orgId}</td>
                  <td className="px-6 py-4 text-slate-300">{customer.plan}</td>
                  <td className="px-6 py-4 text-slate-200 text-right tabular-nums font-semibold">{customer.sites.toLocaleString()}</td>
                  <td className="px-6 py-4 font-bold text-emerald-400 text-right tabular-nums">{customer.mrr}</td>
                  <td className="px-6 py-4">
                    {customer.status === "Active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-red-950/60 text-red-400 border border-red-800/60">
                        <XCircle className="w-3.5 h-3.5" /> Suspended
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono">{customer.provisioned}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded-md hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 text-slate-500" />
                      <div className="text-sm font-semibold text-slate-300">No customers found</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
