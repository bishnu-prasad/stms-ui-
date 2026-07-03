import { EnterprisePageTemplate } from "../../components/Enterprise/EnterprisePageTemplate";
import { DataTable } from "../../components/Enterprise/DataTable";
import { ChartCard, SimpleLineChart, SimpleBarChart } from "../../components/Enterprise/ChartCard";

export default function CustomersPage() {
  const kpis = [
    { title: "Active Customers", value: "124" , trend: { value: "+2.4%", isPositive: true } },
    { title: "Trial Accounts", value: "3" , trend: { value: "Expiring soon", isPositive: false, isNeutral: true } },
    { title: "Needs Renewal", value: "2" , trend: { value: "Action Required", isPositive: false, isNeutral: true } },
    { title: "Overall Health", value: "99.4%" , trend: { value: "Healthy", isPositive: true } }
  ];

  const tableColumns = [
    { header: "Organization", accessor: (row: any) => <span className="font-medium">{row.name || row.organization || "Data"}</span> },
    { header: "Plan", accessor: (row: any) => <span className="font-medium">{row.plan || row.plan || "Data"}</span> },
    { header: "Devices", accessor: (row: any) => <span className="font-medium">{row.devices || row.devices || "Data"}</span> },
    { header: "Health", accessor: (row: any) => <span className="font-medium">{row.health || row.health || "Data"}</span> }
  ];

  const tableData = [
    {"name":"TechFlow Inc","plan":"Enterprise","devices":"1,204","health":"99.9%"},
    {"name":"City Telecom","plan":"Pro","devices":"432","health":"98.5%"}
  ];

  const mockChartData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 550 },
    { name: 'Thu', value: 480 },
    { name: 'Fri', value: 600 },
    { name: 'Sat', value: 200 },
    { name: 'Sun', value: 250 },
  ];

  return (
    <EnterprisePageTemplate
      title={`Customer Organizations`}
      summary={`Customer growth remains stable this month. Three customers are approaching license expiration. Two organizations have reported increased alarm volumes. No customer is currently suspended.`}
      kpis={kpis}
      charts={
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Activity Trend">
            <SimpleLineChart data={mockChartData} color="#2563EB" />
          </ChartCard>
          <ChartCard title="Distribution">
            <SimpleBarChart data={mockChartData} color="#60A5FA" />
          </ChartCard>
        </div>
      }
      table={
        <DataTable 
          columns={tableColumns} 
          data={tableData} 
        />
      }
      recommendations={
        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
            <p className="text-[13px] text-slate-700 leading-relaxed">Review the recent alerts for Tenant B to ensure SLAs are not impacted.</p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
            <p className="text-[13px] text-slate-700 leading-relaxed">Schedule a database vacuum process during the next maintenance window.</p>
          </div>
        </div>
      }
      recentActivity={
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-[11px] font-bold text-slate-500">
                SA
              </div>
              <div>
                <p className="text-[13px] font-medium text-slate-900">System admin updated configuration</p>
                <p className="text-[12px] text-slate-500 mt-0.5">{i * 2} hours ago</p>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}
