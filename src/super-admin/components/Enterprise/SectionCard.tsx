import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  delay?: number;
  className?: string;
}

export function SectionCard({ title, description, children, action, delay = 0, className = "" }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col ${className}`}
    >
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          {description && (
            <p className="text-[13px] text-slate-500 mt-1">{description}</p>
          )}
        </div>
        {action && (
          <div>{action}</div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
