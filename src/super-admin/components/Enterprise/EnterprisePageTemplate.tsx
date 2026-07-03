import { ReactNode } from "react";
import { HeroBriefing } from "./HeroBriefing";
import { OperationalTimeline } from "./OperationalTimeline";
import { PendingActionsPanel } from "./PendingActionsPanel";

interface EnterprisePageTemplateProps {
  greeting?: string;
  title: string;
  summary: string;
  icon?: ReactNode;
  kpis?: ReactNode;
  charts?: ReactNode;
  operationalInsights?: ReactNode;
  table?: ReactNode;
  recommendations?: { title: string; detail: string; actionLabel?: string }[];
  extraSection?: ReactNode;
}

export function EnterprisePageTemplate({
  greeting,
  title,
  summary,
  icon,
  kpis,
  charts,
  operationalInsights,
  table,
  recommendations,
  extraSection
}: EnterprisePageTemplateProps) {
  return (
    <div className="p-8 max-w-[1650px] mx-auto space-y-8 font-sans">
      {/* 1. Executive Briefing Narrative */}
      <HeroBriefing
        greeting={greeting}
        title={title}
        narrative={summary}
        icon={icon}
      />

      {/* 2. KPI Summary Grid */}
      {kpis && (
        <section className="space-y-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Executive Key Performance Indicators</h2>
          {kpis}
        </section>
      )}

      {/* 3. Operational Charts (1-3 Charts) */}
      {charts && (
        <section className="space-y-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Platform Analytics & Trends</h2>
          {charts}
        </section>
      )}

      {/* 4. Operational Insights */}
      {operationalInsights && (
        <section className="space-y-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Operational Insights & Telemetry</h2>
          {operationalInsights}
        </section>
      )}

      {extraSection}

      {/* 5. Primary Data Table */}
      {table && (
        <section className="space-y-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">System Records & Data Ledger</h2>
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs overflow-hidden">
            {table}
          </div>
        </section>
      )}

      {/* 6. Recommended Actions & 7. Recent Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Actions */}
        <section className="space-y-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Recommended Operational Actions</h2>
          {recommendations && recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{rec.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{rec.detail}</p>
                  </div>
                  {rec.actionLabel && (
                    <button className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer w-fit">
                      {rec.actionLabel} →
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <PendingActionsPanel />
          )}
        </section>

        {/* Recent Activity */}
        <section className="space-y-3">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Recent Platform Activity</h2>
          <OperationalTimeline />
        </section>
      </div>
    </div>
  );
}
