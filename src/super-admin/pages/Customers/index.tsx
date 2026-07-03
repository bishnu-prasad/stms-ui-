import { useState } from "react";
import { NOCPageShell } from "../../components/NOCPageShell";
import { customers } from "../../data/operationalMockData";
import { Plus, Download, Search, ChevronRight, LogIn } from "lucide-react";
import { useImpersonation } from "@/contexts/ImpersonationContext";
import { CustomerDrawer } from "../../components/CustomerDrawer";

export default function CustomerDirectory() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  
  const { startImpersonation } = useImpersonation();

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const kpis = [
    { label: "Total Customers", value: customers.length, sub: "All registered", color: "text-blue-600" },
    { label: "Active", value: customers.filter(c => c.status === "Active").length, sub: "Operational", color: "text-emerald-600" },
    { label: "Critical Health", value: customers.filter(c => c.health === "Critical").length, sub: "Need attention", color: "text-rose-600" },
    { label: "SLA At Risk", value: customers.filter(c => c.slaActual < c.slaRequired).length, sub: "Below contracted", color: "text-amber-600" },
  ];

  return (
    <NOCPageShell
      title="Enterprise Customers"
      subtitle={`${customers.length} registered organizations on the STMS platform`}
      kpis={kpis}
      actions={
        <>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Customer
          </button>
        </>
      }
      filters={
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      }
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex relative">
        
        {/* Main Table Area */}
        <div className={`flex-1 transition-all duration-300 ${selectedCustomer ? 'mr-[450px]' : ''}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Customer Info</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plan & Region</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Network Health</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filtered.map(c => (
                  <tr 
                    key={c.id} 
                    onClick={() => setSelectedCustomer(c)}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${selectedCustomer?.id === c.id ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">{c.logo}</div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{c.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">Enterprise Plus</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{c.region}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${c.slaActual}%`, background: c.slaActual >= c.slaRequired ? "#10B981" : "#EF4444" }} />
                        </div>
                        <span className={`text-[11px] font-bold ${c.slaActual >= c.slaRequired ? "text-emerald-600" : "text-rose-600"}`}>{c.slaActual}%</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        <span className="text-emerald-600 font-semibold">{c.onlineSites}</span> / {c.totalSites} online
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); startImpersonation(c as any); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 text-slate-600 dark:text-slate-300 text-xs font-bold rounded shadow-sm transition-colors mr-2"
                      >
                        <LogIn className="w-3.5 h-3.5" /> Workspace
                      </button>
                      <button className="inline-flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sliding Details Drawer Component */}
        <CustomerDrawer 
          customer={selectedCustomer as any} 
          onClose={() => setSelectedCustomer(null)} 
        />

      </div>
    </NOCPageShell>
  );
}
