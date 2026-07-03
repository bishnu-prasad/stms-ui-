import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Server, Globe, Clock, Zap, Cpu } from "lucide-react";
import { platformSystemInfo } from "../../data/mockData";

interface HeroBriefingProps {
  greeting?: string;
  title?: string;
  narrative?: string;
  icon?: ReactNode;
}

export function HeroBriefing({
  greeting = "Good Morning, System Administrator",
  title = "STMS Enterprise SaaS Command Center",
  narrative = "All core platform microservices are operational. 142 enterprise customer tenants are online with 99.98% platform availability. No critical infrastructure incidents require immediate intervention. Two customer license renewals are scheduled for this week.",
  icon
}: HeroBriefingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 space-y-4 font-sans"
    >
      {/* Top Title & Quick System Badges */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            {greeting}
          </div>
          <h1 className="text-2.5xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            {icon || <ShieldCheck className="w-7 h-7 text-blue-600 shrink-0" />}
            {title}
          </h1>
        </div>

        {/* System Attributes Row */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 text-slate-600 flex items-center gap-1.5 shadow-2xs">
            <span className="font-semibold text-slate-400">Ver:</span>
            <span className="font-bold text-slate-900">{platformSystemInfo.version}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 text-slate-600 flex items-center gap-1.5 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold text-slate-900">{platformSystemInfo.deploymentRegion}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 text-slate-600 flex items-center gap-1.5 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Uptime:</span>
            <span className="font-bold text-emerald-600">{platformSystemInfo.systemUptime}</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold flex items-center gap-1.5 px-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{platformSystemInfo.platformStatus}</span>
          </div>
        </div>
      </div>

      {/* Narrative Operational Summary Box */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex gap-5 items-start">
        <div className="mt-1 flex shrink-0 h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
        </div>
        <div className="flex-1 text-slate-700 text-[14.5px] leading-relaxed font-normal">
          {narrative}
        </div>
      </div>
    </motion.div>
  );
}
