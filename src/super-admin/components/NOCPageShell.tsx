import { ReactNode } from "react";
import { motion } from "framer-motion";

interface KPI {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  bgColor?: string;
  icon?: ReactNode;
}

interface NOCPageShellProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  kpis?: KPI[];
  actions?: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
}

export function NOCPageShell({ title, subtitle, badge, badgeColor, kpis, actions, filters, children }: NOCPageShellProps) {
  return (
    <div className="space-y-5 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h1>
            {badge && (
              <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wide ${badgeColor ?? "bg-blue-500"}`}>
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>

      {/* KPI Strip */}
      {kpis && kpis.length > 0 && (
        <div className={`grid gap-4 ${kpis.length <= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"}`}>
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                {kpi.icon && <span className={`${kpi.color ?? "text-blue-500"}`}>{kpi.icon}</span>}
              </div>
              <div className={`text-xl font-bold tabular-nums ${kpi.color ?? "text-slate-900 dark:text-white"}`}>
                {typeof kpi.value === "number" ? kpi.value.toLocaleString() : kpi.value}
              </div>
              {kpi.sub && <div className="text-[10px] text-slate-400 font-medium mt-0.5">{kpi.sub}</div>}
            </motion.div>
          ))}
        </div>
      )}

      {/* Filters */}
      {filters && (
        <div className="flex items-center gap-2 flex-wrap">
          {filters}
        </div>
      )}

      {/* Content */}
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

// Re-usable table component
interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  width?: string;
}

interface NOCTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function NOCTable<T>({ columns, data, emptyMessage, onRowClick }: NOCTableProps<T>) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.header}
                  className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider"
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-400 text-xs">
                  {emptyMessage ?? "No data available"}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  onClick={() => onRowClick?.(row)}
                  className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${onRowClick ? "cursor-pointer" : ""}`}
                >
                  {columns.map((col) => (
                    <td key={col.header} className="px-4 py-3">
                      {col.accessor(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Severity badge
export function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    Critical: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
    Major: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Minor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Normal: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    None: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
    Healthy: "bg-emerald-100 text-emerald-700",
    "Warning ": "bg-amber-100 text-amber-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${styles[severity] ?? "bg-slate-100 text-slate-500"}`}>
      {severity}
    </span>
  );
}

// Status dot
export function StatusDot({ status }: { status: string }) {
  const color = status === "Online" || status === "Active" || status === "Connected"
    ? "bg-emerald-500"
    : status === "Degraded" || status === "Warning"
    ? "bg-amber-500"
    : "bg-slate-400";
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full shrink-0 ${color} ${status === "Online" ? "animate-pulse" : ""}`} />
      <span className="font-semibold">{status}</span>
    </span>
  );
}

// Action button
export function ActionBtn({ label, onClick, variant = "default" }: { label: string; onClick?: () => void; variant?: "default" | "danger" | "success" }) {
  const styles = {
    default: "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400",
    danger: "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400",
    success: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400",
  };
  return (
    <button onClick={onClick} className={`px-2.5 py-1 rounded text-[10px] font-bold transition-colors ${styles[variant]}`}>
      {label}
    </button>
  );
}
