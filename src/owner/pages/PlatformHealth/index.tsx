import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Clock, RefreshCw, Server, Database, HardDrive } from "lucide-react";
import { platformServices, infraMetrics } from "../../data/ownerMockData";

const serviceIcons: Record<string, React.ElementType> = {
  "API Gateway": Server,
  "Authentication": CheckCircle2,
  "PostgreSQL": Database,
  "Redis Cache": Server,
  "ClickHouse": Database,
  "MQTT Broker": Server,
  "Notification Service": Server,
  "Scheduler": Clock,
  "Storage": HardDrive,
  "Workers": Server,
  "Analytics Engine": Server,
  "IoT Gateway": Server,
};

const statusConfig = {
  healthy: { bg: "#ECFDF5", border: "#A7F3D0", textColor: "#059669", badgeBg: "#10B981", icon: CheckCircle2, label: "Healthy" },
  warning: { bg: "#FFFBEB", border: "#FDE68A", textColor: "#D97706", badgeBg: "#F59E0B", icon: AlertTriangle, label: "Warning" },
  down: { bg: "#FEF2F2", border: "#FECACA", textColor: "#DC2626", badgeBg: "#EF4444", icon: XCircle, label: "Down" },
};

function MetricBar({ label, value, unit = "%", color, warn = 75, critical = 90 }: {
  label: string; value: number; unit?: string; color?: string; warn?: number; critical?: number;
}) {
  const barColor = value >= critical ? "#EF4444" : value >= warn ? "#F59E0B" : color ?? "#6366F1";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-bold tabular-nums" style={{ color: barColor }}>{typeof value === "number" && value > 1000 ? value.toLocaleString() : value}{unit}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(value, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: barColor }}
        />
      </div>
    </div>
  );
}

export default function OwnerPlatformHealth() {
  const [refreshing, setRefreshing] = useState(false);

  const healthyCount = platformServices.filter((s) => s.status === "healthy").length;
  const warningCount = platformServices.filter((s) => s.status === "warning").length;
  const downCount = platformServices.filter((s) => s.status === "down").length;

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Platform Health</h1>
          <p className="text-sm text-slate-500 mt-0.5">Live infrastructure monitoring across all services</p>
        </div>
        <button
          onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1200); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-indigo-600 cursor-pointer transition-colors"
          style={{ border: "1px solid #E0E7FF", background: "rgba(99,102,241,0.05)" }}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Summary Badges */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Operational", count: healthyCount, color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0" },
          { label: "Degraded", count: warningCount, color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
          { label: "Down", count: downCount, color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-2xl" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
            <div className="text-3xl font-bold tabular-nums" style={{ color: s.color }}>{s.count}</div>
            <div className="text-xs font-semibold mt-1" style={{ color: s.color }}>{s.label} Services</div>
          </div>
        ))}
      </div>

      {/* Service Grid */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 mb-3">Service Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {platformServices.map((service) => {
            const cfg = statusConfig[service.status];
            const SvcIcon = serviceIcons[service.name] ?? Server;
            const StatusIcon = cfg.icon;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.7)" }}>
                    <SvcIcon className="w-4 h-4" style={{ color: cfg.textColor }} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {service.status === "healthy" && (
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: cfg.badgeBg }} />
                    )}
                    <span className="text-[11px] font-bold" style={{ color: cfg.textColor }}>{cfg.label}</span>
                  </div>
                </div>
                <div className="text-sm font-bold text-slate-800 leading-snug">{service.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">v{service.version}</div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t" style={{ borderColor: `${cfg.border}` }}>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Response</div>
                    <div className="text-xs font-bold tabular-nums" style={{ color: cfg.textColor }}>{service.responseTime}ms</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-medium">Uptime</div>
                    <div className="text-xs font-bold tabular-nums" style={{ color: cfg.textColor }}>{service.uptime}%</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Infrastructure Metrics */}
      <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #E2E8F0" }}>
        <h2 className="text-sm font-bold text-slate-800 mb-5">Infrastructure Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5">
          <MetricBar label="CPU Usage" value={infraMetrics.cpu} color="#6366F1" />
          <MetricBar label="RAM Usage" value={infraMetrics.ram} color="#8B5CF6" />
          <MetricBar label="Disk Usage" value={infraMetrics.disk} color="#3B82F6" />
          <MetricBar label="Storage" value={infraMetrics.storage} color="#F59E0B" warn={70} critical={85} />
          <MetricBar label="Bandwidth" value={infraMetrics.bandwidth} color="#10B981" />
          <MetricBar label="DB Load" value={infraMetrics.dbLoad} color="#6366F1" />
          <MetricBar label="Network" value={infraMetrics.network} color="#8B5CF6" />
          <MetricBar label="Queue Depth" value={Math.round((infraMetrics.queue / 500) * 100)} unit="%" color="#F59E0B" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-100">
          {[
            { label: "Requests/sec", value: infraMetrics.requestsPerSec.toLocaleString(), unit: "req/s", color: "#6366F1" },
            { label: "Latency (P95)", value: `${infraMetrics.latency}`, unit: "ms", color: "#8B5CF6" },
            { label: "Error Rate", value: `${infraMetrics.errors}`, unit: "%", color: "#10B981" },
            { label: "Queue Depth", value: infraMetrics.queue.toLocaleString(), unit: "jobs", color: "#F59E0B" },
          ].map((m) => (
            <div key={m.label} className="text-center p-3 rounded-xl" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
              <div className="text-lg font-bold tabular-nums" style={{ color: m.color }}>{m.value}</div>
              <div className="text-[10px] font-semibold text-slate-400 mt-0.5">{m.unit}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
