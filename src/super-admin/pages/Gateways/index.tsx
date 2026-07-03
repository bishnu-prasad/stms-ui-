import { NOCPageShell, NOCTable, StatusDot, ActionBtn } from "../../components/NOCPageShell";
import { gateways } from "../../data/operationalMockData";

export default function GatewayStatus() {
  const online = gateways.filter(g => g.status === "Online").length;
  const offline = gateways.filter(g => g.status === "Offline").length;
  const degraded = gateways.filter(g => g.status === "Degraded").length;

  const kpis = [
    { label: "Total Gateways", value: 12450, sub: "Registered" },
    { label: "Online", value: 12150, sub: "MQTT connected", color: "text-emerald-600" },
    { label: "Offline", value: 300, sub: "No heartbeat", color: "text-rose-600" },
    { label: "Heartbeat Rate", value: "12,150/min", sub: "MQTT packets/min", color: "text-blue-600" },
  ];

  const columns = [
    { header: "Gateway ID", accessor: (g: typeof gateways[0]) => <span className="font-mono font-bold text-blue-600 text-[11px]">{g.id}</span> },
    {
      header: "Site / Customer",
      accessor: (g: typeof gateways[0]) => (
        <div>
          <div className="font-semibold text-xs text-slate-900 dark:text-white">{g.siteName}</div>
          <div className="text-[10px] text-slate-400">{g.customer} · {g.region}</div>
        </div>
      ),
    },
    {
      header: "MQTT Status",
      accessor: (g: typeof gateways[0]) => (
        <StatusDot status={g.mqttStatus === "Connected" ? "Online" : "Offline"} />
      ),
    },
    { header: "Last Heartbeat", accessor: (g: typeof gateways[0]) => <span className={`text-xs font-bold ${g.lastHeartbeat.includes("m") ? "text-rose-600" : "text-emerald-600"}`}>{g.lastHeartbeat}</span> },
    { header: "Firmware", accessor: (g: typeof gateways[0]) => <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">{g.firmware}</span> },
    { header: "Config Version", accessor: (g: typeof gateways[0]) => <span className="font-mono text-[11px] text-slate-500">{g.configVersion}</span> },
    {
      header: "Packet Loss",
      accessor: (g: typeof gateways[0]) => (
        <span className={`text-xs font-bold ${g.packetLoss > 5 ? "text-rose-600" : g.packetLoss > 0 ? "text-amber-600" : "text-emerald-600"}`}>
          {g.packetLoss}%
        </span>
      ),
    },
    {
      header: "Latency",
      accessor: (g: typeof gateways[0]) => (
        <span className={`text-xs font-bold ${g.latency > 80 ? "text-amber-600" : g.latency === 0 ? "text-rose-600" : "text-slate-600"}`}>
          {g.latency === 0 ? "—" : `${g.latency}ms`}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (g: typeof gateways[0]) => (
        <div className="flex gap-1">
          <ActionBtn label="Ping" />
          {g.status === "Offline" && <ActionBtn label="Restart" variant="danger" />}
        </div>
      ),
    },
  ];

  return (
    <NOCPageShell
      title="Gateway Status"
      subtitle="Real-time MQTT heartbeat and connectivity monitoring for all deployed gateways"
      kpis={kpis}
    >
      {/* Heartbeat grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-3">Heartbeat Matrix (Each block = ~100 gateways)</div>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 121 }, (_, i) => {
            const isOffline = i > 118;
            const isDegraded = i > 115 && i <= 118;
            return (
              <div key={i} title={isOffline ? "Offline" : isDegraded ? "Degraded" : "Online"}
                className={`w-4 h-4 rounded-sm cursor-pointer transition-opacity hover:opacity-70 ${isOffline ? "bg-rose-400" : isDegraded ? "bg-amber-400" : "bg-emerald-400"} ${!isOffline && !isDegraded ? "animate-pulse" : ""}`}
                style={{ animationDelay: `${(i % 10) * 100}ms` }}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 text-[10px] font-semibold text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-400" /> Online (119 blocks)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-400" /> Degraded (3 blocks)</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-rose-400" /> Offline (2 blocks)</span>
        </div>
      </div>

      <NOCTable columns={columns} data={gateways} />
    </NOCPageShell>
  );
}
