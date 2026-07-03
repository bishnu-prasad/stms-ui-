import { NOCPageShell } from "../../components/NOCPageShell";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const networkData = [
  { time: "00:00", latency: 24, loss: 0.1 },
  { time: "04:00", latency: 28, loss: 0.2 },
  { time: "08:00", latency: 45, loss: 1.5 },
  { time: "12:00", latency: 52, loss: 2.1 },
  { time: "16:00", latency: 48, loss: 1.2 },
  { time: "20:00", latency: 32, loss: 0.5 },
  { time: "24:00", latency: 25, loss: 0.1 },
];

export default function NetworkHealth() {
  return (
    <NOCPageShell title="Network Health Analytics" subtitle="Global network availability and communication trends">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold mb-6 text-slate-800 dark:text-slate-200">Global MQTT Latency & Packet Loss (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={networkData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" tick={{fontSize: 12, fill: "#64748B"}} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{fontSize: 12, fill: "#64748B"}} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12, fill: "#64748B"}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Line yAxisId="left" type="monotone" dataKey="latency" name="Latency (ms)" stroke="#3B82F6" strokeWidth={3} dot={{r: 4, fill: "#3B82F6"}} activeDot={{r: 6}} />
                <Line yAxisId="right" type="monotone" dataKey="loss" name="Packet Loss (%)" stroke="#EF4444" strokeWidth={3} dot={{r: 4, fill: "#EF4444"}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </NOCPageShell>
  );
}
