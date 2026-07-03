import { X, Building, Activity, ShieldCheck, Database, LogIn, ExternalLink, HardHat, FileText, Server } from "lucide-react";
import { useImpersonation, CustomerType } from "@/contexts/ImpersonationContext";

interface CustomerDrawerProps {
  customer: CustomerType | null;
  onClose: () => void;
}

export function CustomerDrawer({ customer, onClose }: CustomerDrawerProps) {
  const { startImpersonation } = useImpersonation();

  return (
    <div className={`fixed top-0 right-0 w-[450px] h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl transition-transform duration-300 ease-in-out transform z-[100] ${customer ? 'translate-x-0' : 'translate-x-full'}`}>
      {customer && (
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-slate-50 dark:bg-slate-800/30 pt-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-lg font-bold shadow-sm">{customer.logo}</div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{customer.name}</h2>
                <div className="text-xs text-slate-500 font-mono mt-1">{customer.id} • {customer.region}</div>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Impersonation CTA */}
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-blue-900 dark:text-blue-400">Support Access</div>
                <div className="text-xs text-blue-700 dark:text-blue-500/80 mt-0.5">Enter workspace in impersonation mode</div>
              </div>
              <button 
                onClick={() => { onClose(); startImpersonation(customer); }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Login as Customer
              </button>
            </div>

            {/* Health & Sub */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Subscription & Health</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 font-bold mb-1">Plan</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Enterprise Plus</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 font-bold mb-1">SLA Contract</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5"><Activity className="w-4 h-4 text-blue-500" /> {customer.slaRequired || '99.9'}% Availability</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 font-bold mb-1">Database Health</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5"><Database className="w-4 h-4 text-emerald-500" /> Optimal (12ms)</div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 font-bold mb-1">Platform Version</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5"><Server className="w-4 h-4 text-slate-500" /> v3.4.1-stable</div>
                </div>
              </div>
            </div>

            {/* Platform Usage Stats */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Platform Usage</h3>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                  <Building className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-slate-900 dark:text-white">{customer.totalSites}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Sites</div>
                </div>
                <div className="flex-1 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                  <HardHat className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-slate-900 dark:text-white">{Math.floor(Math.random() * 5) + 1}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Vendors</div>
                </div>
                <div className="flex-1 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
                  <FileText className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <div className="text-lg font-black text-slate-900 dark:text-white">{customer.tickets}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Tickets</div>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Activity</h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 bg-blue-500 shrink-0 shadow z-10" />
                  <div className="w-[calc(100%-2rem)] ml-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-slate-500">Super Admin Accessed</span>
                      <span className="text-[10px] font-mono text-slate-400">10 mins ago</span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">Root Super Admin entered workspace in Support Mode.</div>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500 shrink-0 shadow z-10" />
                  <div className="w-[calc(100%-2rem)] ml-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-slate-500">Configuration Changed</span>
                      <span className="text-[10px] font-mono text-slate-400">2 hrs ago</span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">Bulk config push to 45 gateway devices completed.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex gap-2">
            <button className="flex-1 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 shadow-sm transition-colors">
              Audit Logs
            </button>
            <button className="flex-1 py-2 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/30 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-900/10 shadow-sm transition-colors">
              Suspend Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
