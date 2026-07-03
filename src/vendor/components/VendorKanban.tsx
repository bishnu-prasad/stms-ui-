import { useState } from "react";
import { VendorJob } from "../data/vendorMockData";
import { Clock, MapPin, Wrench, UserCheck, AlertCircle, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface VendorKanbanProps {
  jobs: VendorJob[];
  onStatusChange?: (jobId: string, newStatus: VendorJob["status"]) => void;
}

const KANBAN_STAGES: VendorJob["status"][] = [
  "New",
  "Accepted",
  "Assigned",
  "Travelling",
  "On Site",
  "Repairing",
  "Waiting Parts",
  "Completed",
  "Waiting Customer Verification",
  "Closed"
];

export function VendorKanban({ jobs, onStatusChange }: VendorKanbanProps) {
  const [activeStage, setActiveStage] = useState<string>("All");

  const getPriorityBadge = (priority: VendorJob["priority"]) => {
    switch (priority) {
      case "CRITICAL":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">CRITICAL</span>;
      case "HIGH":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">HIGH</span>;
      case "MEDIUM":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">MEDIUM</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">LOW</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Horizontal Stage Selector / Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
        <button
          onClick={() => setActiveStage("All")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
            activeStage === "All"
              ? "bg-teal-600 text-white shadow-xs"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          All Stages ({jobs.length})
        </button>
        {KANBAN_STAGES.map((stage) => {
          const count = jobs.filter((j) => j.status === stage).length;
          return (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 ${
                activeStage === stage
                  ? "bg-teal-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{stage}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeStage === stage ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs
          .filter((j) => activeStage === "All" || j.status === activeStage)
          .map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400">{job.id}</span>
                    {getPriorityBadge(job.priority)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {job.status}
                  </span>
                </div>

                <h4 className="text-[14px] font-bold text-slate-900 leading-snug mb-1">
                  {job.title}
                </h4>
                
                <div className="text-[12px] text-teal-700 font-semibold mb-3 flex items-center gap-1">
                  <span>🏢 {job.customerName}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600 font-medium">{job.siteName}</span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-2 mb-4 text-[12px]">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Equipment:</span>
                    <span className="font-semibold text-slate-800">{job.equipment}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Engineer:</span>
                    <span className="font-semibold text-slate-800">
                      {job.assignedEngineer ? (
                        <span className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[9px] font-bold flex items-center justify-center">
                            {job.assignedEngineer.avatar}
                          </span>
                          {job.assignedEngineer.name}
                        </span>
                      ) : (
                        <span className="text-amber-600 font-medium">Unassigned</span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">ETA / Distance:</span>
                    <span className="font-medium text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-600" />
                      {job.eta} ({job.distanceKm} km)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-1.5 text-rose-600 font-bold bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>SLA: {job.slaRemainingMinutes}m left</span>
                </div>

                <div className="flex gap-1.5">
                  {job.status === "New" && (
                    <button
                      onClick={() => onStatusChange?.(job.id, "Accepted")}
                      className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Accept
                    </button>
                  )}
                  {job.status === "Accepted" && (
                    <button
                      onClick={() => onStatusChange?.(job.id, "Assigned")}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Assign
                    </button>
                  )}
                  {job.status !== "New" && job.status !== "Accepted" && (
                    <button className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer">
                      Details <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
