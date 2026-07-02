import { useState } from "react";
import { motion } from "framer-motion";
import { WidgetCard } from "@/components/WidgetCard";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";

const performanceData = Array.from({ length: 30 }).map((_, i) => ({
  date: `Day ${i + 1}`,
  uptime: 95 + Math.random() * 5,
  latency: 20 + Math.random() * 30,
}));

export default function Performance() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Performance Trends</h1>
        <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
          {["24h", "7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors relative ${
                timeRange === range ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {timeRange === range && (
                <motion.div
                  layoutId="time-range-tab"
                  className="absolute inset-0 bg-card rounded-md shadow-sm border border-border/50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{range}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <WidgetCard title="Network Uptime Trend (%)" delay={0.1} className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                itemStyle={{ color: 'hsl(var(--success))' }}
              />
              <Area type="monotone" dataKey="uptime" stroke="hsl(var(--success))" fillOpacity={1} fill="url(#colorUptime)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="Average Latency (ms)" delay={0.2} className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                itemStyle={{ color: 'hsl(var(--primary))' }}
              />
              <Line type="monotone" dataKey="latency" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--card))', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </WidgetCard>
      </div>

    </motion.div>
  );
}
