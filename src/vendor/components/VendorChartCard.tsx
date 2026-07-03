import { ReactNode } from "react";
import { motion } from "framer-motion";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area
} from "recharts";

interface VendorChartCardProps {
  title: string;
  businessQuestion?: string;
  children: ReactNode;
  delay?: number;
  action?: ReactNode;
}

export function VendorChartCard({ title, businessQuestion, children, delay = 0, action }: VendorChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
    >
      <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
          {businessQuestion && (
            <p className="text-[12px] font-medium text-teal-700 bg-teal-50/70 border border-teal-100 rounded-md px-2.5 py-1 mt-1.5 inline-block">
              💡 {businessQuestion}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div className="flex-1 min-h-[220px] w-full">
        {children}
      </div>
    </motion.div>
  );
}

export function SimpleVendorBarChart({ data, dataKey = "value", categoryKey = "name", color = "#0D9488" }: { data: any[], dataKey?: string, categoryKey?: string, color?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
        <XAxis dataKey={categoryKey} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} dy={8} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
        <Tooltip 
          cursor={{ fill: '#F8FAFC' }}
          contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={36} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export function SimpleVendorLineChart({ data, dataKey = "value", categoryKey = "name", color = "#2563EB" }: { data: any[], dataKey?: string, categoryKey?: string, color?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
        <XAxis dataKey={categoryKey} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} dy={8} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }} activeDot={{ r: 6 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export function SimpleVendorAreaChart({ data, dataKey = "value", categoryKey = "name", color = "#0D9488" }: { data: any[], dataKey?: string, categoryKey?: string, color?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={`colorVendorArea_${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.25}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
        <XAxis dataKey={categoryKey} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} dy={8} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} fillOpacity={1} fill={`url(#colorVendorArea_${dataKey})`} />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
