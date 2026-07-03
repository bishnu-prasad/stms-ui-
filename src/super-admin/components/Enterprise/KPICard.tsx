import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
    isNeutral?: boolean;
  };
  icon?: ReactNode;
  delay?: number;
}

export function KPICard({ title, value, trend, icon, delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
        {icon && (
          <div className="text-slate-400">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-auto flex items-end justify-between">
        <div className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </div>
        {trend && (
          <div className={`flex items-center text-[13px] font-medium ${
            trend.isNeutral ? 'text-slate-500' : 
            trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
          }`}>
            {trend.isNeutral ? <Minus className="w-3.5 h-3.5 mr-1" /> :
             trend.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : 
             <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
            {trend.value}
          </div>
        )}
      </div>
    </motion.div>
  );
}
