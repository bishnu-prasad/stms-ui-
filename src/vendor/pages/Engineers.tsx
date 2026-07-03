import { useState } from "react";
import { VendorPageTemplate } from "../components/VendorPageTemplate";
import { VendorMetricCard } from "../components/VendorMetricCard";
import { VendorChartCard, SimpleVendorBarChart, SimpleVendorLineChart } from "../components/VendorChartCard";
import { VendorDataTable } from "../components/VendorDataTable";
import { VendorKanban } from "../components/VendorKanban";
import { mockVendorJobs } from "../data/vendorMockData";
import { Wrench, Clock, UserCheck, Boxes } from "lucide-react";

export default function EngineersPage() {
  const [jobsList, setJobsList] = useState(mockVendorJobs);

  const handleStatusChange = (jobId: string, newStatus: any) => {
    setJobsList(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
  };

  const kpis = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <VendorMetricCard title="Engineers Active" value="4 Techs" subtitle="1 Tech on Leave" badgeText="" icon={<Wrench className="w-5 h-5 text-teal-600" />} delay={0.05} />
      <VendorMetricCard title="Avg Customer Rating" value="4.88 ★" subtitle="Based on 48 reviews" icon={<Clock className="w-5 h-5 text-teal-600" />} delay={0.1} />
      <VendorMetricCard title="Avg Repair Speed" value="1.5 hrs" subtitle="Per maintenance job" badgeText="" icon={<UserCheck className="w-5 h-5 text-teal-600" />} delay={0.15} />
      <VendorMetricCard title="GPS Tracking" value="Online" subtitle="Live location streams" icon={<Boxes className="w-5 h-5 text-teal-600" />} delay={0.2} />
    </div>
  );

  const charts = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <VendorChartCard title="Engineer Productivity & Completed Jobs" businessQuestion="Which field engineers solved the most maintenance jobs this week?" delay={0.25}>
        <SimpleVendorBarChart data={[{"name":"Mon","value":14,"sla":98},{"name":"Tue","value":22,"sla":99},{"name":"Wed","value":18,"sla":97},{"name":"Thu","value":26,"sla":99},{"name":"Fri","value":30,"sla":98},{"name":"Sat","value":16,"sla":100},{"name":"Sun","value":12,"sla":100}]} dataKey="value" categoryKey="name" color="#0D9488" />
      </VendorChartCard>
      <VendorChartCard title="SLA Compliance & Response Target Trend" businessQuestion="What is the average response latency across maintenance dispatches?" delay={0.3}>
        <SimpleVendorLineChart data={[{"name":"Mon","value":14,"sla":98},{"name":"Tue","value":22,"sla":99},{"name":"Wed","value":18,"sla":97},{"name":"Thu","value":26,"sla":99},{"name":"Fri","value":30,"sla":98},{"name":"Sat","value":16,"sla":100},{"name":"Sun","value":12,"sla":100}]} dataKey="sla" categoryKey="name" color="#2563EB" />
      </VendorChartCard>
    </div>
  );

  const extraContent = null;

  const jobColumns = [
    { header: "Job ID", accessor: (r: any) => <span className="font-mono font-bold text-teal-700">{r.id}</span> },
    { header: "Title & Issue", accessor: (r: any) => <div><div className="font-bold text-slate-900">{r.title}</div><div className="text-xs text-slate-400">{r.equipment}</div></div> },
    { header: "Customer & Site", accessor: (r: any) => <div><div className="font-semibold text-teal-800">{r.customerName}</div><div className="text-xs text-slate-500">{r.siteName} ({r.circle})</div></div> },
    { header: "Priority", accessor: (r: any) => <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${r.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : r.priority === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{r.priority}</span> },
    { header: "Status", accessor: (r: any) => <span className="font-semibold text-slate-700 text-xs px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">{r.status}</span> },
    { header: "Engineer", accessor: (r: any) => r.assignedEngineer ? <span className="font-medium text-slate-800">{r.assignedEngineer.name}</span> : <span className="text-amber-600 font-semibold">Unassigned</span> },
    { header: "SLA Left", accessor: (r: any) => <span className="font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md text-xs">{r.slaRemainingMinutes} mins</span> },
  ];

  const table = (
    <VendorDataTable
      columns={jobColumns}
      data={jobsList}
    />
  );

  const recommendations = [
    {
      title: "Prioritize Critical Battery Discharge at SATKHANDA Open Plot",
      detail: "SLA countdown expires in 28 minutes. Rahul Sharma is on site — verify surge suppressor replacement & reset breaker.",
      actionLabel: "View Critical Ticket"
    },
    {
      title: "Reorder Auto Mains Failure Solenoid Kits",
      detail: "Stock level at Bikaner base has reached 3 units (below safety buffer of 5). Automated PO generated.",
      actionLabel: "Review Spare Parts Reorder"
    }
  ];

  return (
    <VendorPageTemplate
      greeting="Field Operations Team"
      title="Field Engineer Roster & Dispatch Tracking"
      narrative={`4 out of 5 field engineers are active today. Rahul Sharma is on-site at SATKHANDA Open Plot, Vikas Kumar is in transit to Agra LTP, and Priya Mehta is available at the Bikaner base. Average field rating across customer sign-offs is 4.88 / 5.0.`}
      status="normal"
      icon={<Wrench className="w-6 h-6 text-teal-600" />}
      kpis={kpis}
      charts={charts}
      extraContent={extraContent}
      table={table}
      recommendations={recommendations}
    />
  );
}
