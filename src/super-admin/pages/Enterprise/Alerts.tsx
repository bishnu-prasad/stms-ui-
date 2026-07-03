import { useState } from "react";
import { EnterprisePageTemplate } from "../../components/Enterprise/EnterprisePageTemplate";
import { KPICard } from "../../components/Enterprise/KPICard";
import { ChartCard, SimpleBarChart, SimpleLineChart } from "../../components/Enterprise/ChartCard";
import { DataTable } from "../../components/Enterprise/DataTable";
import { ShieldCheck, Server, Activity, Users, Clock } from "lucide-react";

export default function AlertsPage() {
  const kpis = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <KPICard title="Active Incidents" value="0 Critical" status="Platform operational" delay={0.05} />
      <KPICard title="Advisory Alerts" value="2 Low" status="Optimizations suggested" delay={0.1} />
      <KPICard title="MTTR Response" value="8.4 mins" status="Incident resolution" delay={0.15} />
      <KPICard title="Alert Noise Filter" value="99.4%" status="De-duplicated alerts" delay={0.2} />
    </div>
  );

  const charts = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="Incident Frequency & Escalation Trend" subtitle="How quickly are automated platform alerts resolved by site reliability engineers?" delay={0.25}>
        <SimpleBarChart data={[{"name":"Jan","value":120,"sla":99.8},{"name":"Feb","value":135,"sla":99.9},{"name":"Mar","value":142,"sla":99.7},{"name":"Apr","value":158,"sla":99.9},{"name":"May","value":175,"sla":99.8},{"name":"Jun","value":190,"sla":100}]} dataKey="value" categoryKey="name" color="#2563EB" />
      </ChartCard>
      <ChartCard title="Platform SLA & Availability Trend" subtitle="Is system availability remaining strictly above 99.9% target?" delay={0.3}>
        <SimpleLineChart data={[{"name":"Jan","value":120,"sla":99.8},{"name":"Feb","value":135,"sla":99.9},{"name":"Mar","value":142,"sla":99.7},{"name":"Apr","value":158,"sla":99.9},{"name":"May","value":175,"sla":99.8},{"name":"Jun","value":190,"sla":100}]} dataKey="sla" categoryKey="name" color="#16A34A" />
      </ChartCard>
    </div>
  );

  const sampleTableData = [
    { id: "REC-101", name: "Reliance Jio Infocomm", category: "Enterprise Tier 1", metric: "99.4% Health", updated: "2 mins ago", status: "Active" },
    { id: "REC-102", name: "Bharti Airtel Ltd", category: "Enterprise Tier 1", metric: "98.8% Health", updated: "5 mins ago", status: "Active" },
    { id: "REC-103", name: "Vodafone Idea (Vi)", category: "Enterprise Tier 2", metric: "97.6% Health", updated: "12 mins ago", status: "Active" },
    { id: "REC-104", name: "Indus Towers Ltd", category: "Infrastructure Partner", metric: "99.8% Health", updated: "Just now", status: "Active" },
  ];

  const tableColumns = [
    { header: "Record ID", accessor: (r: any) => <span className="font-mono font-bold text-blue-600">{r.id}</span> },
    { header: "Entity Name", accessor: (r: any) => <span className="font-bold text-slate-900">{r.name}</span> },
    { header: "Category", accessor: (r: any) => <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{r.category}</span> },
    { header: "Operational Status", accessor: (r: any) => <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs">{r.metric}</span> },
    { header: "Last Activity", accessor: (r: any) => <span className="text-slate-400 text-xs">{r.updated}</span> },
  ];

  const table = (
    <DataTable
      columns={tableColumns}
      data={sampleTableData}
    />
  );

  const recommendations = [
    {
      title: "Optimize Platform Incident & Alert Monitoring Operational Parameters",
      detail: "Telemetry analysis recommends adjusting buffer allocations to maintain peak performance during 09:00 AM peak hours.",
      actionLabel: "Execute Optimization Task"
    },
    {
      title: "Schedule Routine Security Audit",
      detail: "SOC2 compliance guidelines mandate quarterly credential and access key rotation for this module.",
      actionLabel: "Initiate Security Review"
    }
  ];

  return (
    <EnterprisePageTemplate
      greeting="Alert Operations"
      title="Platform Incident & Alert Monitoring"
      summary="Real-time alert engine monitoring system incidents, hardware trips, and telemetry drops. Zero critical platform incidents currently active."
      icon={<ShieldCheck className="w-7 h-7 text-blue-600" />}
      kpis={kpis}
      charts={charts}
      table={table}
      recommendations={recommendations}
    />
  );
}
