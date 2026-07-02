import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Download, Maximize2, RefreshCw } from "lucide-react";
import { Card } from "./ui/card";

interface WidgetCardProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
  onRefresh?: () => void;
  action?: ReactNode;
}

export function WidgetCard({ title, children, className = "", delay = 0, onRefresh, action }: WidgetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`h-full ${className}`}
    >
      <Card className="h-full flex flex-col overflow-hidden bg-card border-border hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5">
        <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/30">
          <div className="font-semibold text-sm tracking-tight text-foreground">{title}</div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {action}
            {onRefresh && (
              <button onClick={onRefresh} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Refresh">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Export">
              <Download className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Fullscreen">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="p-4 flex-1 relative overflow-hidden">
          {children}
        </div>
      </Card>
    </motion.div>
  );
}
