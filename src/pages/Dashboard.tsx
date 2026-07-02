import { motion, AnimatePresence } from "framer-motion";
import { WidgetCard } from "@/components/WidgetCard";
import { mockKPIs, mockCriticalSites, mockActivityFeed, mockSeverityTimeline, mockBatteryRanking } from "@/data/mockData";
import { Activity, AlertTriangle, Battery, IndianRupee, Zap, MapPin, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10 }
};

function KPICard({ title, value, icon: Icon, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-card border border-border p-5 rounded-xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
      <div className="flex justify-between items-start">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">{title}</p>
          <h3 className="text-3xl font-mono font-bold text-foreground">
            {typeof value === 'number' ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {value.toLocaleString()}
              </motion.span>
            ) : value}
          </h3>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-current`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6">
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Global Command Center</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Schedule Maintenance</Button>
          <Button variant="outline" size="sm">Export Report</Button>
          <Button size="sm">Acknowledge All</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Sites" value={mockKPIs.totalSites} icon={Activity} color="text-primary bg-primary" delay={0.1} />
        <KPICard title="Active Alarms" value={mockKPIs.activeAlarms} icon={AlertTriangle} color="text-destructive bg-destructive" delay={0.2} />
        <KPICard title="Battery Hours" value={`${mockKPIs.batteryHours}h`} icon={Battery} color="text-warning bg-warning" delay={0.3} />
        <KPICard title="Revenue Leakage" value={`₹${(mockKPIs.revenueLeakage / 100000).toFixed(1)}L`} icon={IndianRupee} color="text-destructive bg-destructive" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <WidgetCard title="Severity Timeline (24h)" delay={0.5}>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockSeverityTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="critical" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorCritical)" strokeWidth={2} />
                  <Area type="monotone" dataKey="high" stroke="hsl(var(--warning))" fillOpacity={1} fill="url(#colorHigh)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </WidgetCard>

          <WidgetCard title="Top Critical Sites" delay={0.6}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-md">
                  <tr>
                    <th className="px-4 py-3 font-medium">Severity</th>
                    <th className="px-4 py-3 font-medium">Site Name</th>
                    <th className="px-4 py-3 font-medium">Location</th>
                    <th className="px-4 py-3 font-medium">Issue</th>
                    <th className="px-4 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCriticalSites.map((site, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + (i * 0.1) }}
                      key={site.id} 
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Badge variant={site.severity === 'CRITICAL' ? 'destructive' : 'default'} className="font-mono text-[10px]">
                          {site.severity}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">{site.name}</td>
                      <td className="px-4 py-3 text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {site.location}</td>
                      <td className="px-4 py-3 font-mono text-xs">{site.issue}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Investigate</Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </WidgetCard>
        </div>

        <div className="flex flex-col gap-6">
          <WidgetCard title="Network Intelligence Score" className="h-64" delay={0.3}>
             <div className="flex flex-col items-center justify-center h-full">
               <div className="relative w-40 h-40 flex items-center justify-center">
                 <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                   <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                   <motion.circle 
                     cx="50" cy="50" r="45" fill="none" 
                     stroke="hsl(var(--success))" strokeWidth="8" 
                     strokeDasharray={`${94.7 * 2.83} 283`}
                     initial={{ strokeDasharray: "0 283" }}
                     animate={{ strokeDasharray: `${94.7 * 2.83} 283` }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                   />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-3xl font-bold font-mono tracking-tighter text-success">94.7</span>
                   <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Score</span>
                 </div>
               </div>
             </div>
          </WidgetCard>

          <WidgetCard title="Live Activity Feed" className="flex-1" delay={0.7}>
            <div className="relative border-l-2 border-border ml-3 mt-2 space-y-6">
              {mockActivityFeed.map((feed, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + (i * 0.1) }}
                  key={feed.id} className="relative pl-6"
                >
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-card ${
                    feed.severity === 'CRITICAL' ? 'bg-destructive' : 
                    feed.severity === 'HIGH' ? 'bg-warning' : 
                    'bg-success'
                  }`} />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> {feed.time}</span>
                  </div>
                  <p className="text-sm text-foreground">{feed.message}</p>
                </motion.div>
              ))}
            </div>
          </WidgetCard>
        </div>
      </div>
    </motion.div>
  );
}
