import { ReactNode } from "react";
import { HeroBriefing } from "./HeroBriefing";
import { KPICard } from "./KPICard";
import { SectionCard } from "./SectionCard";

interface KPI {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
    isNeutral?: boolean;
  };
  icon?: ReactNode;
}

interface EnterprisePageTemplateProps {
  title: string;
  summary: string;
  status?: "normal" | "warning" | "critical";
  icon?: ReactNode;
  kpis: KPI[];
  charts?: ReactNode;
  tableTitle?: string;
  tableDescription?: string;
  tableAction?: ReactNode;
  table: ReactNode;
  recommendations?: ReactNode;
  recentActivity?: ReactNode;
}

export function EnterprisePageTemplate({
  title,
  summary,
  status = "normal",
  icon,
  kpis,
  charts,
  tableTitle = "Detailed Records",
  tableDescription,
  tableAction,
  table,
  recommendations,
  recentActivity
}: EnterprisePageTemplateProps) {
  return (
    <div className="pb-12">
      <HeroBriefing 
        title={title}
        summary={summary}
        icon={icon}
        status={status}
      />

      {kpis.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <KPICard 
              key={index} 
              {...kpi} 
              delay={0.1 + (index * 0.05)} 
            />
          ))}
        </div>
      )}

      {charts && (
        <div className="mb-8">
          {charts}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <SectionCard 
            title={tableTitle} 
            description={tableDescription}
            action={tableAction}
            delay={0.3}
          >
            {table}
          </SectionCard>
        </div>
        
        <div className="flex flex-col gap-8">
          {recommendations && (
            <SectionCard title="Recommendations" delay={0.4} className="bg-blue-50/30 border-blue-100">
              {recommendations}
            </SectionCard>
          )}
          
          {recentActivity && (
            <SectionCard title="Recent Activity" delay={0.5}>
              {recentActivity}
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}
