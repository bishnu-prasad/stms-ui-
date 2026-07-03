import { NOCPageShell } from "../../components/NOCPageShell";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const uptimeData = [
  { month: "Jan", uptime: 99.1 },
  { month: "Feb", uptime: 99.2 },
  { month: "Mar", uptime: 98.8 },
  { month: "Apr", uptime: 99.5 },
  { month: "May", uptime: 99.4 },
  { month: "Jun", uptime: 99.8 },
];

export default function Availability() {
  return (
    <NOCPageShell title="Site Availability" subtitle="Uptime trends across regions and customers">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold mb-6 text-slate-800 dark:text-slate-200">Global Uptime (6 Months)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={uptimeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{fontSize: 12, fill: "#64748B"}} axisLine={false} tickLine={false} />
              <YAxis domain={[95, 100]} tick={{fontSize: 12, fill: "#64748B"}} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(v: number) => [`${v}%`, 'Uptime']} />
              <Area type="monotone" dataKey="uptime" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorUptime)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </NOCPageShell>
  );
}
