import { useState } from "react";
import { Search, Filter, CheckCircle2, AlertCircle } from "lucide-react";
import { platformHealthServices } from "../../data/mockData";

export default function PlatformHealthPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = platformHealthServices.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Platform Health</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time status of STMS microservices and core infrastructure.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-700/80 transition-colors shadow-sm">
            <Filter className="w-3.5 h-3.5" /> Filter Status
          </button>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-slate-700/60 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/40">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
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
                <th className="px-6 py-4">Service Name</th>
                <th className="px-6 py-4">Version</th>
                <th className="px-6 py-4 text-right">Uptime</th>
                <th className="px-6 py-4 text-right">Avg Response</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {filtered.map((svc) => (
                <tr key={svc.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-100">{svc.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">{svc.version}</td>
                  <td className="px-6 py-4 text-slate-200 text-right font-mono tabular-nums">{svc.uptime}%</td>
                  <td className="px-6 py-4 text-slate-200 text-right font-mono tabular-nums">{svc.responseTime}ms</td>
                  <td className="px-6 py-4">
                    {svc.status === 'healthy' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800/60">
                        <AlertCircle className="w-3.5 h-3.5" /> Degraded
                      </span>
                    )}
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
