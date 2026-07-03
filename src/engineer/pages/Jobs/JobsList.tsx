import { useRoute } from "wouter";
import { activeJobs } from "../../data/engineerMockData";
import { Clock, MapPin, ChevronRight, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function JobsList() {
  const [matchJobs, paramsJobs] = useRoute("/engineer/jobs/:status");
  const [matchMaint, paramsMaint] = useRoute("/engineer/maintenance/:type");
  const [, setLocation] = useLocation();
  
  let viewContext = "jobs"; // 'jobs', 'maintenance'
  let filterValue = "assigned";
  
  if (matchMaint && paramsMaint?.type) {
    viewContext = "maintenance";
    filterValue = paramsMaint.type; // 'pm', 'cm', 'visits'
  } else if (matchJobs && paramsJobs?.status) {
    filterValue = paramsJobs.status;
  }

  const getStatusLabel = () => {
    if (viewContext === "maintenance") {
      switch(filterValue) {
        case 'pm': return "Preventive Maintenance (PM)";
        case 'cm': return "Corrective Maintenance (CM)";
        case 'visits': return "Site Visits";
        default: return "Maintenance";
      }
    } else {
      switch(filterValue) {
        case 'assigned': return "Assigned Jobs";
        case 'accepted': return "Accepted Jobs";
        case 'in-progress': return "In Progress";
        case 'completed': return "Completed Jobs";
        default: return "Jobs";
      }
    }
  };

  const filteredJobs = activeJobs.filter(job => {
    if (viewContext === "maintenance") {
      if (filterValue === 'pm') return job.type === 'Preventive';
      if (filterValue === 'cm') return job.type === 'Corrective';
      return true; // fallback for visits
    } else {
      if (filterValue === 'assigned') return job.status === 'Assigned';
      if (filterValue === 'accepted') return job.status === 'Accepted';
      if (filterValue === 'in-progress') return job.status === 'In Progress';
      if (filterValue === 'completed') return job.status === 'Completed';
      return true;
    }
  });

  return (
    <div className="p-4 max-w-md mx-auto md:max-w-full pb-20">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{getStatusLabel()}</h1>
        <p className="text-xs text-slate-500 mt-1">{filteredJobs.length} active tickets</p>
      </div>

      <div className="space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="text-slate-400 text-xs">No jobs found for this status.</div>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div 
              key={job.id} 
              onClick={() => setLocation(`/engineer/jobs/ticket/${job.id}`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{job.id}</span>
                  {job.priority === 'Critical' && (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-800/30">
                      <AlertCircle className="w-2.5 h-2.5" /> CRITICAL
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg border border-orange-100 dark:border-orange-800/30">
                  <Clock className="w-3 h-3" /> {job.slaTime}
                </div>
              </div>
              
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{job.site}</h3>
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {job.customer} • {job.type}
              </div>
              
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 mb-3 line-clamp-1 border border-slate-100 dark:border-slate-800">
                {job.fault}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{job.status}</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-blue-600">
                  View Details <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
