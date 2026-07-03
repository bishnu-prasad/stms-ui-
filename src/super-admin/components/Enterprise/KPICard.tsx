import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  status?: string;
  statusColor?: string;
  trend?: string;
  trendPositive?: boolean;
  chartData?: { name: string; val: number }[];
  recommendedAction?: string;
  delay?: number;
  icon?: ReactNode;
}

export function KPICard({
  title,
  value,
  status,
  statusColor = "bg-slate-50 text-slate-700 border-slate-200",
  trend,
  trendPositive = true,
  chartData,
  recommendedAction,
  delay = 0,
  icon
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
          {status && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColor}`}>
              {status}
            </span>
          )}
        </div>

        {/* Value + Sparkline */}
        <div className="flex items-end justify-between gap-4 my-2">
          <div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
            {trend && (
              <div className={`text-[11px] font-bold mt-1 flex items-center gap-0.5 ${trendPositive ? 'text-emerald-600' : 'text-slate-500'}`}>
                {trendPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />}
                {trend}
              </div>
            )}
          </div>

          {/* Mini Sparkline Chart */}
          {chartData && (
            <div className="w-24 h-11 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`kpiArea_${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#2563EB" strokeWidth={2} fill={`url(#kpiArea_${title.replace(/\s+/g, '')})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Action Footer */}
      {recommendedAction && (
        <div className="pt-3 border-t border-slate-100 mt-3 text-[11.5px]">
          <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center justify-between w-full transition-colors cursor-pointer group">
            <span className="truncate">{recommendedAction}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
