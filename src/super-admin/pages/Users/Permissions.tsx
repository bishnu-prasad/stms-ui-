import { useState } from "react";
import { Search, Filter, ShieldCheck } from "lucide-react";
import { superAdminPermissions } from "../../data/mockData";

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = superAdminPermissions.filter(p => 
    p.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Permissions Matrix</h1>
          <p className="text-xs text-slate-400 mt-1">Global permission keys available for role assignment.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-700/80 transition-colors shadow-sm">
            <Filter className="w-3.5 h-3.5" /> Filter by Module
          </button>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-slate-700/60 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/40">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search permissions..."
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
                <th className="px-6 py-4 w-12"></th>
                <th className="px-6 py-4">Module</th>
                <th className="px-6 py-4">Permission Action</th>
                <th className="px-6 py-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {filtered.map((perm) => (
                <tr key={perm.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-200">{perm.module}</td>
                  <td className="px-6 py-4 font-mono text-xs text-blue-400 bg-blue-950/60 border border-blue-800/60 rounded px-2 py-0.5 inline-block">
                    {perm.action.replace(" ", "_").toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{perm.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
