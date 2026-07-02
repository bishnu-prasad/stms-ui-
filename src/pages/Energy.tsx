import { motion } from "framer-motion";
import { WidgetCard } from "@/components/WidgetCard";
import { mockBatteryRanking } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

export default function Energy() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Energy & Battery Intelligence</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WidgetCard title="Battery Risk Ranking (Hours Remaining)" delay={0.1} className="h-[400px]">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={mockBatteryRanking} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
               <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
               <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
               <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }} />
               <Tooltip 
                 cursor={{fill: 'hsl(var(--muted)/0.3)'}}
                 contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
               />
               <Bar dataKey="hours" radius={[0, 4, 4, 0]} barSize={20}>
                 {mockBatteryRanking.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.hours < 200 ? 'hsl(var(--destructive))' : entry.hours < 500 ? 'hsl(var(--warning))' : 'hsl(var(--primary))'} />
                 ))}
               </Bar>
             </BarChart>
           </ResponsiveContainer>
        </WidgetCard>

        <WidgetCard title="Circle-wise Uptime Matrix" delay={0.2} className="h-[400px]">
           <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center border-2 border-dashed border-border rounded-xl">
             <div className="grid grid-cols-6 gap-1 w-full flex-1">
               {Array.from({ length: 5 }).map((_, row) => (
                 Array.from({ length: 6 }).map((_, col) => {
                   const uptime = Math.random() * 100;
                   const colorClass = uptime > 95 ? "bg-success" : uptime > 85 ? "bg-warning" : "bg-destructive";
                   const opacityClass = uptime > 95 ? "opacity-80" : uptime > 85 ? "opacity-90" : "opacity-100";
                   
                   return (
                     <motion.div 
                       key={`${row}-${col}`}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: 0.2 + (row * 0.05) + (col * 0.05) }}
                       className={`rounded-sm ${colorClass} ${opacityClass} hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center`}
                       title={`${uptime.toFixed(1)}%`}
                     >
                       {col === 0 && <span className="text-[8px] text-white opacity-50 absolute left-2 -ml-8 w-16 text-right truncate overflow-hidden bg-card/50 px-1 rounded backdrop-blur-sm z-10 mix-blend-difference">{['UP', 'MH', 'TG', 'RJ', 'DL'][row]}</span>}
                     </motion.div>
                   )
                 })
               ))}
             </div>
             <div className="flex items-center gap-4 mt-4 text-xs font-medium">
               <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-destructive"></div> &lt; 85%</span>
               <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-warning"></div> 85-95%</span>
               <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-success"></div> &gt; 95%</span>
             </div>
           </div>
        </WidgetCard>
      </div>

    </motion.div>
  );
}
