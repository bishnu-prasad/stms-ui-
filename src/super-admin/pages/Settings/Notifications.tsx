import { NOCPageShell } from "../../components/NOCPageShell";
export default function NotificationsPage() {
  return (
    <NOCPageShell title="Notification Rules" subtitle="Configure automated alert routing and escalation rules">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm max-w-2xl">
        <h3 className="text-sm font-bold mb-4">Escalation Policies</h3>
        <div className="space-y-4">
          <div className="p-4 border border-rose-200 bg-rose-50 rounded-lg">
            <div className="font-bold text-xs text-rose-800">Critical Alarms (Level 1)</div>
            <div className="text-[10px] text-rose-600 mt-1">SMS to NOC Manager immediately. Escalates to Ops Director after 30 mins.</div>
          </div>
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
            <div className="font-bold text-xs text-amber-800">Major Alarms (Level 2)</div>
            <div className="text-[10px] text-amber-600 mt-1">Email to regional teams immediately.</div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded w-full">Add New Policy</button>
        </div>
      </div>
    </NOCPageShell>
  );
}
