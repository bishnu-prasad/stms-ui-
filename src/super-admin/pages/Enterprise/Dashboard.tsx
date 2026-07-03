import { useState } from "react";
import { EnterprisePageTemplate } from "../../components/Enterprise/EnterprisePageTemplate";
import { KPICard } from "../../components/Enterprise/KPICard";
import { PlatformHealthGrid } from "../../components/Enterprise/PlatformHealthGrid";
import { DataTable } from "../../components/Enterprise/DataTable";
import { executiveSummaries, aiOperationalRecommendations } from "../../data/mockData";
import { ShieldCheck, Server, Globe, Activity, Users } from "lucide-react";

const customerLedgerData = [
  { id: "TEN-101", name: "Reliance Jio Infocomm", plan: "Enterprise Unlimited", sites: 1420, mrr: "₹12,40,000", status: "Active", health: "99.4%" },
  { id: "TEN-102", name: "Bharti Airtel Ltd", plan: "Enterprise Pro", sites: 980, mrr: "₹8,80,000", status: "Active", health: "98.8%" },
  { id: "TEN-103", name: "Vodafone Idea (Vi)", plan: "Enterprise Standard", sites: 650, mrr: "₹5,20,000", status: "Active", health: "97.6%" },
  { id: "TEN-104", name: "Indus Towers Ltd", plan: "Enterprise Master", sites: 2100, mrr: "₹18,50,000", status: "Active", health: "99.8%" },
  { id: "TEN-105", name: "ATC Telecom Infrastructure", plan: "Enterprise Pro", sites: 420, mrr: "₹3,90,000", status: "Active", health: "98.2%" },
];

export default function SuperAdminDashboard() {
  // 6 Executive Cards Summary
  const kpis = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {executiveSummaries.map((m, idx) => (
        <KPICard
          key={m.title}
          title={m.title}
          value={m.value}
          status={m.status}
          statusColor={m.statusColor}
          trend={m.trend}
          trendPositive={m.trendPositive}
          chartData={m.chartData}
          recommendedAction={m.recommendedAction}
          delay={idx * 0.05}
        />
      ))}
    </div>
  );

  // Platform Operations Panel
  const extraSection = (
    <section className="space-y-3">
      <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Cloud Microservices Operations Panel</h2>
      <PlatformHealthGrid />
    </section>
  );

  // Customer Data Ledger Table
  const tableColumns = [
    { header: "Tenant ID", accessor: (r: any) => <span className="font-mono font-bold text-blue-600">{r.id}</span> },
    { header: "Customer Name", accessor: (r: any) => <span className="font-bold text-slate-900">{r.name}</span> },
    { header: "Subscription Plan", accessor: (r: any) => <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">{r.plan}</span> },
    { header: "Monitored Sites", accessor: (r: any) => <span className="font-mono text-slate-700 font-semibold">{r.sites} Sites</span> },
    { header: "Monthly MRR", accessor: (r: any) => <span className="font-bold text-slate-900">{r.mrr}</span> },
    { header: "Tenant Health", accessor: (r: any) => <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs">{r.health}</span> },
  ];

  const table = (
    <DataTable
      columns={tableColumns}
      data={customerLedgerData}
    />
  );

  return (
    <EnterprisePageTemplate
      greeting="Good Morning, System Administrator"
      title="STMS Enterprise SaaS Command Center"
      summary="All core platform microservices are operational. 142 enterprise customer tenants are online with 99.98% platform availability. No critical infrastructure incidents require immediate intervention. Two customer license renewals are scheduled for this week."
      icon={<ShieldCheck className="w-7 h-7 text-blue-600" />}
      kpis={kpis}
      extraSection={extraSection}
      table={table}
      recommendations={aiOperationalRecommendations}
    />
  );
}
