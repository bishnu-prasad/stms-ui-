import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Key, AlertTriangle, CheckCircle2 } from "lucide-react";
import { superAdminLicenses } from "../../data/mockData";

export default function LicensesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = superAdminLicenses.filter(l => 
    l.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.org.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Platform Licenses</h1>
          <p className="text-xs text-slate-400 mt-1">Issue and manage enterprise licensing keys.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-700/80 transition-colors shadow-sm">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-colors shadow-md shadow-blue-600/20">
            <Plus className="w-3.5 h-3.5" /> Issue License
          </button>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-slate-700/60 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/40">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search keys or organizations..."
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
                <th className="px-6 py-4">License Key</th>
                <th className="px-6 py-4">Organization</th>
                <th className="px-6 py-4">Plan Level</th>
                <th className="px-6 py-4">Issued On</th>
                <th className="px-6 py-4">Expires On</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {filtered.map((license) => (
                <tr key={license.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Key className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-mono font-semibold text-slate-100">{license.key}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-200 font-medium">{license.org}</td>
                  <td className="px-6 py-4 text-slate-300">{license.plan}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono">{license.issued}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono">{license.expiry}</td>
                  <td className="px-6 py-4">
                    {license.status === "Valid" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                      </span>
                    )}
                    {license.status === "Expiring Soon" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/60">
                        <AlertTriangle className="w-3.5 h-3.5" /> Expiring Soon
                      </span>
                    )}
                    {license.status === "Expired" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-red-950/60 text-red-400 border border-red-800/60">
                        <AlertTriangle className="w-3.5 h-3.5" /> Expired
                      </span>
                    )}
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
