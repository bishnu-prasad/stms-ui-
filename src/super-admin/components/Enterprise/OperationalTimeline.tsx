import { platformActivityLog } from "../../data/mockData";
import { Clock, ShieldCheck, Database, Server, CreditCard, Key } from "lucide-react";

export function OperationalTimeline() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Billing": return <CreditCard className="w-3.5 h-3.5 text-emerald-600" />;
      case "Backup": return <Database className="w-3.5 h-3.5 text-blue-600" />;
      case "Security": return <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />;
      default: return <Server className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" /> Real-Time Operational Activity Stream
        </h3>
        <span className="text-[11px] font-semibold text-slate-400">Live Audit Sync</span>
      </div>

      <div className="space-y-3.5">
        {platformActivityLog.map((act) => (
          <div key={act.id} className="flex items-start gap-3 text-xs pb-3 border-b border-slate-100 last:border-0 last:pb-0">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 shrink-0">
              {getCategoryIcon(act.category)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-bold text-slate-900 truncate">{act.action}</span>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{act.timestamp}</span>
              </div>
              <p className="text-slate-600 text-[12px] leading-relaxed">{act.details}</p>
              <div className="mt-1 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span>Op: {act.operator}</span>
                <span>•</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">{act.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
