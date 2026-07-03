import { BarChart, CheckCircle2, Clock } from "lucide-react";

export default function Reports() {
  return (
    <div className="p-4 max-w-md mx-auto md:max-w-full pb-20">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">My Performance</h1>
        <p className="text-xs text-slate-500 mt-1">Key metrics for this month</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
            <div className="text-xs font-semibold text-slate-500 uppercase">Jobs Done</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">42</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Clock className="w-5 h-5 text-blue-500 mb-2" />
            <div className="text-xs font-semibold text-slate-500 uppercase">Avg MTTR</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">1.2h</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2">
            <BarChart className="w-5 h-5 text-purple-500 mb-2" />
            <div className="text-xs font-semibold text-slate-500 uppercase">First Time Fix Rate (FTFR)</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1 text-emerald-600">98.5%</div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
