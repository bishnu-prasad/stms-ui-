import { NOCPageShell } from "../../components/NOCPageShell";
export default function SystemSettingsPage() {
  return (
    <NOCPageShell title="System Settings" subtitle="Global platform configuration and maintenance windows">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm max-w-2xl">
        <h3 className="text-sm font-bold mb-4">Platform Maintenance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div>
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200">Global Maintenance Mode</div>
              <div className="text-[10px] text-slate-500 mt-1">Disables all non-admin access and pauses alert generation.</div>
            </div>
            <button className="px-4 py-1.5 bg-rose-100 text-rose-700 font-bold text-xs rounded">Enable</button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div>
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200">Data Retention Policy</div>
              <div className="text-[10px] text-slate-500 mt-1">Telemetry data is kept for 90 days.</div>
            </div>
            <button className="px-4 py-1.5 bg-slate-200 text-slate-700 font-bold text-xs rounded">Configure</button>
          </div>
        </div>
      </div>
    </NOCPageShell>
  );
}
