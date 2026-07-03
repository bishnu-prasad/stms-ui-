import { ReactNode } from "react";
import { VendorHeroBriefing } from "./VendorHeroBriefing";

interface VendorPageTemplateProps {
  greeting?: string;
  title: string;
  narrative: string;
  icon?: ReactNode;
  status?: "normal" | "warning" | "critical";
  kpis?: ReactNode;
  charts?: ReactNode;
  table?: ReactNode;
  extraContent?: ReactNode;
  recommendations?: { title: string; detail: string; actionLabel?: string }[];
}

export function VendorPageTemplate({
  greeting,
  title,
  narrative,
  icon,
  status = "normal",
  kpis,
  charts,
  table,
  extraContent,
  recommendations
}: VendorPageTemplateProps) {
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 font-sans">
      {/* Narrative Operational Briefing */}
      <VendorHeroBriefing
        greeting={greeting}
        title={title}
        narrative={narrative}
        icon={icon}
        status={status}
      />

      {/* Primary Metrics Grid */}
      {kpis && (
        <section className="space-y-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Key Field Metrics</h2>
          {kpis}
        </section>
      )}

      {/* Charts Section */}
      {charts && (
        <section className="space-y-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Operational Analytics</h2>
          {charts}
        </section>
      )}

      {/* Extra Content (e.g. Kanban or Map or Custom Tabs) */}
      {extraContent}

      {/* Primary Table Section */}
      {table && (
        <section className="space-y-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Data & Records</h2>
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs overflow-hidden">
            {table}
          </div>
        </section>
      )}

      {/* Recommendations & Actionable Insights */}
      {recommendations && recommendations.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Recommended Action Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-teal-50/50 border border-teal-100 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-teal-900 mb-1">{rec.title}</h4>
                  <p className="text-xs text-teal-700/90 leading-relaxed">{rec.detail}</p>
                </div>
                {rec.actionLabel && (
                  <div className="mt-4">
                    <button className="text-xs font-bold text-teal-800 hover:text-teal-950 underline underline-offset-4 cursor-pointer">
                      {rec.actionLabel} →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
