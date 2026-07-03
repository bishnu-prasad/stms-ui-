import { useRoute, useLocation } from "wouter";
import { activeJobs } from "../../data/engineerMockData";
import { ArrowLeft, MapPin, Clock, AlertTriangle, Phone, Navigation, Play, CheckCircle2 } from "lucide-react";

export default function TicketDetails() {
  const [match, params] = useRoute("/engineer/jobs/ticket/:id");
  const [, setLocation] = useLocation();
  
  const ticketId = params?.id;
  const job = activeJobs.find(j => j.id === ticketId) || activeJobs[0];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-full bg-slate-50 dark:bg-slate-950 max-w-md mx-auto md:max-w-full">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 shrink-0 flex items-center gap-3">
        <button 
          onClick={() => history.back()}
          className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-slate-900 dark:text-white">Ticket Details</h1>
          <div className="text-[10px] font-mono text-slate-500">{job.id}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Urgent Status Banner */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <Clock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-bold text-orange-900 dark:text-orange-400">SLA Timer Running</div>
            <div className="text-xs text-orange-700 dark:text-orange-300 mt-1">
              You have <span className="font-bold">{job.slaTime}</span> remaining to resolve this ticket before SLA breach.
            </div>
          </div>
        </div>

        {/* Core Info */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{job.site}</h2>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {job.siteId} • {job.customer}
              </div>
            </div>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded uppercase">
              {job.type}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Problem Description</div>
              <div className="text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                {job.fault}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{job.status}</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Priority</div>
                <div className={`text-xs font-bold ${job.priority === 'Critical' ? 'text-rose-600' : 'text-orange-500'}`}>
                  {job.priority}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Alarms affecting this site */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" /> Live Alarms
          </h3>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900/30 shadow-sm overflow-hidden">
            <div className="p-3 bg-rose-50 dark:bg-rose-900/10 border-b border-rose-100 dark:border-rose-900/30">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400">Mains Failure</span>
                <span className="text-[10px] font-mono text-rose-500">2h 14m ago</span>
              </div>
            </div>
            <div className="p-3 bg-rose-50 dark:bg-rose-900/10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400">Battery Voltage Low (44V)</span>
                <span className="text-[10px] font-mono text-rose-500">45m ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex justify-between items-center">
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Customer NOC</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Available 24/7</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-100 dark:border-blue-800/30 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Action Button Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:absolute bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50 max-w-md mx-auto md:max-w-full">
        <div className="flex gap-3">
          {job.status === 'Assigned' ? (
            <>
              <button className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors">
                Reject
              </button>
              <button className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Accept Job
              </button>
            </>
          ) : job.status === 'Accepted' ? (
            <>
              <button className="w-12 h-12 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-xl transition-colors flex items-center justify-center border border-blue-100 shrink-0">
                <Navigation className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setLocation(`/engineer/jobs/execute/${job.id}`)}
                className="flex-1 h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" /> GPS Check-In
              </button>
            </>
          ) : (
            <button 
              onClick={() => setLocation(`/engineer/jobs/execute/${job.id}`)}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Continue Work
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
