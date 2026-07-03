import { pendingActions } from "../../data/mockData";
import { AlertCircle, ChevronRight, CheckCircle2 } from "lucide-react";

export function PendingActionsPanel() {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" /> Pending Administrative Tasks
        </h3>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          3 Action Items
        </span>
      </div>

      <div className="space-y-3">
        {pendingActions.map((item) => (
          <div key={item.id} className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <span className="font-bold text-slate-900 text-xs">{item.title}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                item.priority === 'HIGH' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {item.priority} PRIORITY
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{item.details}</p>
            <div className="pt-2 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">Impact: {item.impact}</span>
              <button className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer">
                {item.actionLabel} <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
