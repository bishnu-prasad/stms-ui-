import { Bell, CheckCircle2 } from "lucide-react";
import { recentNotifications } from "../data/engineerMockData";

export default function Notifications() {
  return (
    <div className="p-4 max-w-md mx-auto md:max-w-full pb-20">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-xs text-slate-500 mt-1">Alerts and NOC messages</p>
        </div>
        <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Mark all read
        </button>
      </div>

      <div className="space-y-2">
        {recentNotifications.map(n => (
          <div key={n.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-4">
            <div className={`mt-0.5 shrink-0 ${n.type === 'alert' ? 'text-rose-500' : 'text-blue-500'}`}>
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{n.title}</div>
              <div className="text-xs text-slate-500 mt-1">{n.desc}</div>
              <div className="text-[10px] font-bold text-slate-400 mt-2">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
