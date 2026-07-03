import { ReactNode } from "react";
import { motion } from "framer-motion";

interface VendorHeroBriefingProps {
  greeting?: string;
  title: string;
  narrative: string;
  icon?: ReactNode;
  status?: "normal" | "warning" | "critical";
}

export function VendorHeroBriefing({
  greeting = "Good Morning, Delta Service Team",
  title,
  narrative,
  icon,
  status = "normal"
}: VendorHeroBriefingProps) {
  const statusBadges = {
    normal: { bg: "bg-teal-50 border-teal-200 text-teal-700", dot: "bg-teal-500", label: "Operations Normal" },
    warning: { bg: "bg-amber-50 border-amber-200 text-amber-700", dot: "bg-amber-500", label: "Attention Needed" },
    critical: { bg: "bg-rose-50 border-rose-200 text-rose-700", dot: "bg-rose-500", label: "Critical SLA Timers" }
  };

  const st = statusBadges[status];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">
            {greeting}
          </div>
          <h1 className="text-2.5xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            {icon && (
              <span className="p-2 bg-teal-50 text-teal-600 rounded-lg border border-teal-100 shrink-0">
                {icon}
              </span>
            )}
            {title}
          </h1>
        </div>

        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold shrink-0 ${st.bg}`}>
          <span className={`w-2 h-2 rounded-full animate-pulse ${st.dot}`} />
          {st.label}
        </div>
      </div>
      
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex gap-5 items-start">
        <div className="mt-1 flex shrink-0 h-3 w-3 relative">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-30 ${st.dot}`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${st.dot}`}></span>
        </div>
        <div className="flex-1 text-slate-700 text-[14.5px] leading-relaxed font-normal">
          {narrative}
        </div>
      </div>
    </motion.div>
  );
}
