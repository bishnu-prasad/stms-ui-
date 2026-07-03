import { useState } from "react";
import { Search, Server, MoreHorizontal, CheckCircle2 } from "lucide-react";

export default function ServersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const servers = [
    { id: "svr-01", name: "app-worker-01", region: "ap-south-1a", cpu: "45%", ram: "6.2GB/16GB", status: "Running" },
    { id: "svr-02", name: "app-worker-02", region: "ap-south-1b", cpu: "38%", ram: "5.8GB/16GB", status: "Running" },
    { id: "svr-03", name: "db-primary", region: "ap-south-1a", cpu: "62%", ram: "48GB/64GB", status: "Running" },
    { id: "svr-04", name: "db-replica", region: "ap-south-1b", cpu: "12%", ram: "24GB/64GB", status: "Running" },
    { id: "svr-05", name: "cache-redis", region: "ap-south-1a", cpu: "8%", ram: "12GB/32GB", status: "Running" },
  ];

  const filtered = servers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Compute Servers</h1>
          <p className="text-xs text-slate-400 mt-1">Manage platform VM and container infrastructure.</p>
        </div>
      </div>

      <div className="bg-[#1E293B] border border-slate-700/60 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between bg-slate-900/40">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search servers..."
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
                <th className="px-6 py-4">Instance</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">CPU Usage</th>
                <th className="px-6 py-4">RAM Usage</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {filtered.map((svr) => (
                <tr key={svr.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-blue-400" />
                      <div>
                        <div className="font-bold text-slate-100">{svr.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{svr.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-mono">{svr.region}</td>
                  <td className="px-6 py-4 text-slate-200 tabular-nums font-bold">{svr.cpu}</td>
                  <td className="px-6 py-4 text-slate-300 tabular-nums font-mono">{svr.ram}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {svr.status}
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
