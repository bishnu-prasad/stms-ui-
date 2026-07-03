import { NOCPageShell } from "../../components/NOCPageShell";

export default function OperationalReports() {
  return (
    <NOCPageShell title="Operational Reports" subtitle="Generate daily, weekly, and monthly NOC summaries">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm max-w-2xl">
        <h3 className="text-sm font-bold mb-4">Generate Report</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Report Type</label>
            <select className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none">
              <option>Daily Shift Handover Report</option>
              <option>Weekly Operational Summary</option>
              <option>Monthly NOC KPI Report</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date Range</label>
            <div className="flex gap-4">
              <input type="date" className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none" />
              <span className="text-slate-400 mt-2">to</span>
              <input type="date" className="w-full text-xs p-2.5 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700 outline-none" />
            </div>
          </div>
          <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors mt-2">
            Generate Report PDF
          </button>
        </div>
      </div>
    </NOCPageShell>
  );
}
