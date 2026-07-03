import { useState } from "react";
import { Search, Plus, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { superAdminPlans } from "../../data/mockData";

export default function PlansPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = superAdminPlans.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Subscription Plans</h1>
          <p className="text-xs text-slate-400 mt-1">Manage global billing tiers and feature access levels.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/20">
            <Plus className="w-3.5 h-3.5" /> Create Plan
          </button>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-slate-700/60 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/40">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#0F172A] border border-slate-700 text-slate-100 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-900/60 border-b border-slate-700/60 text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              <tr>
                <th className="px-6 py-4">Plan Name</th>
                <th className="px-6 py-4 text-right">Max Sites</th>
                <th className="px-6 py-4 text-right">Monthly Price</th>
                <th className="px-6 py-4">Included Features</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {filtered.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-100">{plan.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{plan.id}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-200 text-right font-semibold tabular-nums">
                    {plan.maxSites.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-emerald-400 text-right font-bold tabular-nums">
                    {plan.price}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs truncate max-w-[300px]">
                    {plan.features}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded-md hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
