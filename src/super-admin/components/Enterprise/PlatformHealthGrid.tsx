import { useState } from "react";
import { systemServices, SystemServiceHealth } from "../../data/mockData";
import { Activity, RefreshCw, Server, Cpu, HardDrive, CheckCircle2, AlertTriangle } from "lucide-react";

export function PlatformHealthGrid() {
  const [services, setServices] = useState<SystemServiceHealth[]>(systemServices);
  const [restartingId, setRestartingId] = useState<string | null>(null);

  const handleRestart = (id: string) => {
    setRestartingId(id);
    setTimeout(() => {
      setServices(prev => prev.map(s => s.id === id ? { ...s, latencyMs: +(s.latencyMs * 0.9).toFixed(1), cpuPct: Math.floor(s.cpuPct * 0.8) } : s));
      setRestartingId(null);
    }, 1200);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" /> Platform Infrastructure & Core Microservices
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Real-time status, CPU/RAM utilization, versioning, and latency across cloud clusters.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            9/9 Services Operational
          </span>
        </div>
      </div>

      {/* Grid of Microservices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((srv) => (
          <div 
            key={srv.id}
            className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-4 space-y-3 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs font-bold text-slate-900 leading-snug">{srv.name}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">{srv.category} • {srv.version}</div>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-700">
                <CheckCircle2 className="w-3 h-3" /> Healthy
              </span>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-200/60 text-[11px]">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Latency</div>
                <div className="font-mono font-bold text-slate-800">{srv.latencyMs} ms</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">CPU</div>
                <div className="font-mono font-bold text-slate-800">{srv.cpuPct}%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">RAM</div>
                <div className="font-mono font-bold text-slate-800">{srv.memoryPct}%</div>
              </div>
            </div>

            {/* Footer with Uptime & Restart Action */}
            <div className="flex items-center justify-between text-[11px]">
              <div className="text-slate-500 font-medium">
                SLA: <span className="font-bold text-slate-700">{srv.uptimePct}%</span>
              </div>

              <button
                onClick={() => handleRestart(srv.id)}
                disabled={restartingId === srv.id}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-[10.5px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${restartingId === srv.id ? 'animate-spin text-blue-600' : ''}`} />
                {restartingId === srv.id ? 'Restarting...' : 'Restart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
