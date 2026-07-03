import { NOCPageShell } from "../../components/NOCPageShell";

export default function BulkPush() {
  return (
    <NOCPageShell title="Bulk Configuration Push" subtitle="Push configurations to multiple sites simultaneously">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm max-w-2xl">
        <h3 className="text-sm font-bold mb-4">New Bulk Push Job</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Select Configuration Profile</label>
            <select className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none">
              <option>CP-2024-08 (Standard Edge Config v8)</option>
              <option>CP-2024-07 (Standard Edge Config v7)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Target Selection</label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <input type="radio" name="target" defaultChecked className="accent-blue-600" />
                <span className="text-xs font-bold">All Gateways (12,450)</span>
              </label>
              <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <input type="radio" name="target" className="accent-blue-600" />
                <span className="text-xs font-bold">By Customer/Region</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Rollout Strategy</label>
            <select className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none">
              <option>Batch Rollout (1,000 devices / hour)</option>
              <option>Immediate (All at once)</option>
              <option>Canary (1% first, then 100%)</option>
            </select>
          </div>
          <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors mt-2">
            Initialize Push Job
          </button>
        </div>
      </div>
    </NOCPageShell>
  );
}
