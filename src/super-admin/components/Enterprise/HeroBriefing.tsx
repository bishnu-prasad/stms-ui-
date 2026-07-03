import { ReactNode } from "react";
import { motion } from "framer-motion";

interface HeroBriefingProps {
  title: string;
  summary: string;
  icon?: ReactNode;
  status?: "normal" | "warning" | "critical";
}

export function HeroBriefing({ title, summary, icon, status = "normal" }: HeroBriefingProps) {
  const statusColors = {
    normal: "bg-emerald-500",
    warning: "bg-amber-500",
    critical: "bg-rose-500"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
            {icon}
          </div>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex gap-6 items-start">
        <div className="mt-1.5 flex shrink-0 h-3 w-3 relative">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-20 ${statusColors[status]}`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${statusColors[status]}`}></span>
        </div>
        <div className="flex-1 text-slate-700 text-[15px] leading-relaxed max-w-4xl font-medium">
          {summary}
        </div>
      </div>
    </motion.div>
  );
}
