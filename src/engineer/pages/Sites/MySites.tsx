import { MapPin, Bell, Radio } from "lucide-react";
import { useLocation } from "wouter";
import { activeJobs } from "../../data/engineerMockData";

export default function MySites() {
  const [, setLocation] = useLocation();
  // Extract unique sites from active jobs for display
  const sites = activeJobs.map(job => ({ id: job.siteId, name: job.site, customer: job.customer, status: "Online" }));

  return (
    <div className="p-4 max-w-md mx-auto md:max-w-full pb-20">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">My Sites</h1>
        <p className="text-xs text-slate-500 mt-1">Sites currently assigned to your region</p>
      </div>

      <div className="space-y-3">
        {sites.map((site, i) => (
          <div 
            key={i}
            onClick={() => setLocation(`/engineer/sites/${site.id}`)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <Radio className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{site.name}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {site.id} • {site.customer}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-bold uppercase">
                {site.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
