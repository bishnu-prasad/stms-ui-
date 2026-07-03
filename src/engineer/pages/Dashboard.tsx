import { Play, MapPin, Camera, ClipboardCheck, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import { activeJobs, todaySchedule, recentNotifications } from "../data/engineerMockData";
import { useLocation } from "wouter";

export default function EngineerDashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto md:max-w-full pb-20">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Assigned</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">1</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-200 dark:border-orange-800 shadow-sm">
          <div className="text-xs font-semibold text-orange-600 uppercase">In Progress</div>
          <div className="text-2xl font-black text-orange-700 dark:text-orange-400 mt-1">1</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">Completed</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">2</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase">SLA Breach</div>
          <div className="text-2xl font-black text-rose-600 mt-1">0</div>
        </div>
      </div>

      {/* Active Job Widget */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <WrenchIcon className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase border border-orange-500/30">
              In Progress
            </span>
            <span className="text-xs text-slate-300 font-mono">TKT-8821</span>
          </div>
          <h2 className="text-lg font-bold mb-1">Bandra Kurla-01</h2>
          <p className="text-xs text-slate-300 mb-4">Mains Failure &gt; 10x • Jio</p>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setLocation("/engineer/jobs/execute/TKT-8821")}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4 fill-current" /> Continue Work
            </button>
            <button className="px-3 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition-colors">
              <MapPin className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions (Grid of 4) */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: MapPin, label: "Check-In", color: "bg-blue-100 text-blue-600" },
          { icon: Camera, label: "Photo", color: "bg-emerald-100 text-emerald-600" },
          { icon: ClipboardCheck, label: "Checklist", color: "bg-purple-100 text-purple-600" },
          { icon: FileText, label: "Notes", color: "bg-amber-100 text-amber-600" },
        ].map((action, i) => (
          <button key={i} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shadow-sm`}>
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Today's Schedule */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
          <span>Today's Schedule</span>
          <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">3 Stops</span>
        </h3>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
          <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-2 space-y-4">
            {todaySchedule.map((stop, i) => (
              <div key={i} className="relative pl-4">
                <div className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full border-2 border-white dark:border-slate-900 ${
                  stop.status === 'In Progress' ? 'bg-orange-500' : 'bg-slate-300'
                }`} />
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{stop.site}</div>
                    <div className="text-[10px] text-slate-500">{stop.type}</div>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400">{stop.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Recent Alerts</h3>
        <div className="space-y-2">
          {recentNotifications.map(n => (
            <div key={n.id} className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm flex gap-3">
              <div className={`mt-0.5 shrink-0 ${n.type === 'alert' ? 'text-rose-500' : n.type === 'job' ? 'text-blue-500' : 'text-slate-400'}`}>
                {n.type === 'alert' ? <AlertTriangle className="w-4 h-4" /> : n.type === 'job' ? <ClipboardCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{n.desc}</div>
                <div className="text-[9px] font-semibold text-slate-400 mt-1">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WrenchIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
