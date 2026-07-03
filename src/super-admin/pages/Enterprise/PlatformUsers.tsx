import { EnterprisePageTemplate } from "../../components/Enterprise/EnterprisePageTemplate";
import { DataTable } from "../../components/Enterprise/DataTable";
import { ChartCard, SimpleLineChart, SimpleBarChart } from "../../components/Enterprise/ChartCard";

export default function PlatformUsersPage() {
  const kpis = [
    { title: "Total Users", value: "1,284"  },
    { title: "Active Users", value: "96%"  },
    { title: "Locked Accounts", value: "18"  },
    { title: "New Users", value: "42"  }
  ];

  const tableColumns = [
    { header: "Name", accessor: (row: any) => <span className="font-medium">{row.name || row.name || "Data"}</span> },
    { header: "Role", accessor: (row: any) => <span className="font-medium">{row.role || row.role || "Data"}</span> },
    { header: "Last Login", accessor: (row: any) => <span className="font-medium">{row.login || row.lastlogin || "Data"}</span> }
  ];

  const tableData = [
    {"name":"Alice Smith","role":"Super Admin","login":"2 mins ago"}
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
      title={`Platform Users`}
      summary={`User activity increased by 8% this week. Most failed logins originated from inactive accounts. No suspicious privilege escalation detected. 42 new users onboarded this month.`}
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
