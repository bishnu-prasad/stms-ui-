import { NOCPageShell } from "../../components/NOCPageShell";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { vendors } from "../../data/operationalMockData";

export default function VendorAnalytics() {
  return (
    <NOCPageShell title="Vendor Analytics" subtitle="Deep dive into vendor performance metrics">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold mb-6 text-slate-800 dark:text-slate-200">SLA Compliance by Vendor</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={vendors} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{fontSize: 12, fill: "#64748B"}} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{fontSize: 12, fill: "#64748B"}} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#F1F5F9', opacity: 0.4}} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar dataKey="slaCompliance" name="SLA Compliance (%)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </NOCPageShell>
  );
}
