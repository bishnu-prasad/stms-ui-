import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface VendorMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    isNeutral?: boolean;
  };
  icon?: ReactNode;
  delay?: number;
  badgeText?: string;
  badgeColor?: string;
}

export function VendorMetricCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  delay = 0,
  badgeText,
  badgeColor = "bg-teal-50 text-teal-700 border-teal-200"
}: VendorMetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all hover:border-slate-300"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {icon && (
          <div className="p-2.5 bg-slate-50 text-slate-600 rounded-xl border border-slate-100">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
          {value}
        </div>

        {trend && (
          <div className={`flex items-center text-[12px] font-semibold ${
            trend.isNeutral ? 'text-slate-500' : 
            trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
          }`}>
            {trend.isNeutral ? <Minus className="w-3.5 h-3.5 mr-0.5" /> :
             trend.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : 
             <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {trend.value}
          </div>
        )}

        {badgeText && !trend && (
          <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${badgeColor}`}>
            {badgeText}
          </span>
        )}
      </div>
    </motion.div>
  );
}
