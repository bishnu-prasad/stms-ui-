import { NOCPageShell, NOCTable, StatusDot, ActionBtn } from "../../components/NOCPageShell";
import { gateways } from "../../data/operationalMockData";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const commTrend = [
  { time: "00:00", loss: 0.2, latency: 32 }, { time: "04:00", loss: 0.4, latency: 35 },
  { time: "08:00", loss: 1.8, latency: 48 }, { time: "12:00", loss: 2.1, latency: 52 },
  { time: "16:00", loss: 1.4, latency: 44 }, { time: "20:00", loss: 0.8, latency: 38 },
];

export default function CommunicationHealth() {
  const kpis = [
    { label: "Comm Failure Rate", value: "2.1%", sub: "Packet loss avg", color: "text-amber-600" },
    { label: "Avg Latency", value: "38ms", color: "text-blue-600" },
    { label: "MQTT Queue", value: "142", sub: "Messages queued", color: "text-slate-600" },
    { label: "Failed Sites", value: 85, sub: "No communication", color: "text-rose-600" },
  ];

  const columns = [
    { header: "Gateway", accessor: (g: typeof gateways[0]) => <span className="font-mono text-[11px] font-bold">{g.id}</span> },
    { header: "Site", accessor: (g: typeof gateways[0]) => <span className="text-xs font-semibold">{g.siteName}</span> },
    { header: "MQTT", accessor: (g: typeof gateways[0]) => <StatusDot status={g.mqttStatus === "Connected" ? "Online" : "Offline"} /> },
    { header: "Packet Loss", accessor: (g: typeof gateways[0]) => <span className={`font-bold text-xs ${g.packetLoss > 5 ? "text-rose-600" : g.packetLoss > 0 ? "text-amber-600" : "text-emerald-600"}`}>{g.packetLoss}%</span> },
    { header: "Latency", accessor: (g: typeof gateways[0]) => <span className={`font-bold text-xs ${g.latency > 80 ? "text-amber-600" : "text-slate-600"}`}>{g.latency === 0 ? "—" : `${g.latency}ms`}</span> },
    { header: "Last Heartbeat", accessor: (g: typeof gateways[0]) => <span className="text-xs text-slate-400">{g.lastHeartbeat}</span> },
    { header: "Action", accessor: (g: typeof gateways[0]) => <ActionBtn label="Diagnose" /> },
  ];

  return (
    <NOCPageShell title="Communication Health" subtitle="MQTT connectivity, packet loss, and latency diagnostics" kpis={kpis}>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-4">24h Packet Loss & Latency Trend</div>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={commTrend} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "11px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} />
            <Line type="monotone" dataKey="loss" name="Packet Loss %" stroke="#EF4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="latency" name="Latency ms" stroke="#3B82F6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <NOCTable columns={columns} data={gateways} />
    </NOCPageShell>
  );
}
