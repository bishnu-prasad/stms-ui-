import { NOCPageShell } from "../../components/NOCPageShell";
import { alarmTrend7d, alarmCategories } from "../../data/operationalMockData";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

export default function AlarmAnalytics() {
  const kpis = [
    { label: "Peak Alarm Hour", value: "10:00 AM", sub: "Most alarm-dense", color: "text-rose-600" },
    { label: "Most Common", value: "Power Fail", sub: "184 occurrences", color: "text-orange-600" },
    { label: "Avg MTTR", value: "38m", color: "text-blue-600" },
    { label: "Recurring Sites", value: 12, sub: "3+ alarms this week", color: "text-amber-600" },
  ];

  return (
    <NOCPageShell title="Alarm Analytics" subtitle="Trend analysis and alarm intelligence" kpis={kpis}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 7 day trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-4">7-Day Alarm Volume by Severity</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={alarmTrend7d} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "11px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="critical" name="Critical" fill="#EF4444" stackId="a" />
              <Bar dataKey="major" name="Major" fill="#F97316" stackId="a" />
              <Bar dataKey="minor" name="Minor" fill="#FBBF24" stackId="a" />
              <Bar dataKey="warning" name="Warning" fill="#FDE68A" stackId="a" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Type distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-4">Alarm Type Distribution</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={alarmCategories} dataKey="count" nameKey="name" cx="40%" cy="50%" outerRadius={75} innerRadius={40}>
                {alarmCategories.map((cat, i) => <Cell key={i} fill={cat.color} />)}
              </Pie>
              <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: "11px" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "11px", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </NOCPageShell>
  );
}
