const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'super-admin', 'pages', 'Enterprise');

if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

const pages = [
  {
    name: 'Dashboard',
    route: 'dashboard',
    title: 'Platform Overview',
    summary: 'Good morning. Your STMS platform is operating normally. All core services are online. 2 customers require attention today. One enterprise license expires tomorrow. Database storage has reached 82%. No critical outages detected.',
    kpis: [
      { title: 'Total Customers', value: '124', trend: { value: '+3 this month', isPositive: true } },
      { title: 'Platform Users', value: '1,284', trend: { value: '+8% active', isPositive: true } },
      { title: 'API Requests / min', value: '4,291', trend: { value: 'Stable', isNeutral: true } },
      { title: 'Active Alerts', value: '12', trend: { value: '-4 from yesterday', isPositive: true } },
    ],
    tableCols: [{ header: 'Customer', accessor: 'customer' }, { header: 'Status', accessor: 'status' }, { header: 'License', accessor: 'license' }],
    tableData: [{ customer: 'Acme Corp', status: 'Healthy', license: 'Enterprise' }, { customer: 'GlobalNet', status: 'Warning', license: 'Pro' }]
  },
  {
    name: 'Customers',
    route: 'customers',
    title: 'Customer Organizations',
    summary: 'Customer growth remains stable this month. Three customers are approaching license expiration. Two organizations have reported increased alarm volumes. No customer is currently suspended.',
    kpis: [
      { title: 'Active Customers', value: '124', trend: { value: '+2.4%', isPositive: true } },
      { title: 'Trial Accounts', value: '3', trend: { value: 'Expiring soon', isNeutral: true } },
      { title: 'Needs Renewal', value: '2', trend: { value: 'Action Required', isNeutral: true } },
      { title: 'Overall Health', value: '99.4%', trend: { value: 'Healthy', isPositive: true } },
    ],
    tableCols: [{ header: 'Organization', accessor: 'name' }, { header: 'Plan', accessor: 'plan' }, { header: 'Devices', accessor: 'devices' }, { header: 'Health', accessor: 'health' }],
    tableData: [{ name: 'TechFlow Inc', plan: 'Enterprise', devices: '1,204', health: '99.9%' }, { name: 'City Telecom', plan: 'Pro', devices: '432', health: '98.5%' }]
  },
  {
    name: 'CustomerHealth',
    route: 'customer-health',
    title: 'Customer Health Status',
    summary: 'Global customer health is optimal. TechFlow Inc is experiencing higher than normal packet loss on edge devices. City Telecom has unresolved critical alarms from yesterday.',
    kpis: [
      { title: 'Healthy Tenants', value: '121', trend: { value: '97.5%', isPositive: true } },
      { title: 'At Risk', value: '3', trend: { value: 'Requires investigation', isNeutral: true } },
    ],
    tableCols: [{ header: 'Tenant', accessor: 'name' }, { header: 'Issues', accessor: 'issues' }],
    tableData: [{ name: 'TechFlow Inc', issues: 'Packet Loss' }, { name: 'City Telecom', issues: 'Critical Alarms' }]
  },
  {
    name: 'Subscriptions',
    route: 'subscriptions',
    title: 'Subscription Management',
    summary: 'Subscription revenue grew by 4% this quarter. Two enterprise trials converted to paid plans. One legacy customer downgraded to the standard tier.',
    kpis: [
      { title: 'Active Subs', value: '124' },
      { title: 'MRR', value: '$248.5k' },
    ],
    tableCols: [{ header: 'Customer', accessor: 'name' }, { header: 'Tier', accessor: 'tier' }, { header: 'Renewal Date', accessor: 'date' }],
    tableData: [{ name: 'Acme Corp', tier: 'Enterprise', date: 'Oct 12, 2026' }]
  },
  {
    name: 'PlatformUsers',
    route: 'users',
    title: 'Platform Users',
    summary: 'User activity increased by 8% this week. Most failed logins originated from inactive accounts. No suspicious privilege escalation detected. 42 new users onboarded this month.',
    kpis: [
      { title: 'Total Users', value: '1,284' },
      { title: 'Active Users', value: '96%' },
      { title: 'Locked Accounts', value: '18' },
      { title: 'New Users', value: '42' },
    ],
    tableCols: [{ header: 'Name', accessor: 'name' }, { header: 'Role', accessor: 'role' }, { header: 'Last Login', accessor: 'login' }],
    tableData: [{ name: 'Alice Smith', role: 'Super Admin', login: '2 mins ago' }]
  },
  {
    name: 'Roles',
    route: 'roles',
    title: 'Role Management',
    summary: 'Default roles are assigned to 92% of users. Three custom roles were created by enterprise tenants this week. Consider deprecating legacy "Observer" role.',
    kpis: [{ title: 'Total Roles', value: '24' }, { title: 'Custom Roles', value: '8' }],
    tableCols: [{ header: 'Role Name', accessor: 'name' }, { header: 'Assigned Users', accessor: 'users' }],
    tableData: [{ name: 'Super Admin', users: '12' }, { name: 'Tenant Admin', users: '248' }]
  },
  {
    name: 'Permissions',
    route: 'permissions',
    title: 'Permission Matrices',
    summary: 'Global permissions are enforced correctly. No orphaned permission policies found. The new API access scope was successfully rolled out to all developer roles.',
    kpis: [{ title: 'Total Policies', value: '142' }],
    tableCols: [{ header: 'Policy Name', accessor: 'name' }, { header: 'Scope', accessor: 'scope' }],
    tableData: [{ name: 'billing:read', scope: 'Global' }, { name: 'devices:write', scope: 'Tenant' }]
  },
  {
    name: 'PlatformHealth',
    route: 'infrastructure/health',
    title: 'Platform Health Overview',
    summary: 'Authentication and API Gateway remain healthy. ClickHouse latency increased slightly during peak hours. No customer impact detected. Node pool auto-scaled successfully.',
    kpis: [
      { title: 'Uptime', value: '99.99%' },
      { title: 'API Latency', value: '42ms' },
      { title: 'Error Rate', value: '0.01%' },
      { title: 'Active Nodes', value: '48' },
    ],
    tableCols: [{ header: 'Service', accessor: 'service' }, { header: 'Status', accessor: 'status' }, { header: 'Latency', accessor: 'latency' }],
    tableData: [{ service: 'API Gateway', status: 'Healthy', latency: '42ms' }, { service: 'Auth Service', status: 'Healthy', latency: '28ms' }]
  },
  {
    name: 'Servers',
    route: 'infrastructure/servers',
    title: 'Compute Instances',
    summary: 'All Kubernetes worker nodes are operating within optimal CPU and memory limits. Two nodes in us-east-1 were recycled due to kernel updates. Capacity at 64%.',
    kpis: [{ title: 'Total Nodes', value: '48' }, { title: 'Avg CPU', value: '42%' }],
    tableCols: [{ header: 'Instance ID', accessor: 'id' }, { header: 'Region', accessor: 'region' }, { header: 'CPU', accessor: 'cpu' }],
    tableData: [{ id: 'i-0abcd1234', region: 'us-east-1a', cpu: '45%' }]
  },
  {
    name: 'Database',
    route: 'infrastructure/database',
    title: 'Database Clusters',
    summary: 'PostgreSQL primary is healthy with replication lag under 10ms. ClickHouse ingestion rate peaked at 45k rows/sec. Redis cache hit ratio remains above 98%.',
    kpis: [{ title: 'DB Load', value: '24%' }, { title: 'Replication Lag', value: '<10ms' }],
    tableCols: [{ header: 'Cluster', accessor: 'name' }, { header: 'Engine', accessor: 'engine' }, { header: 'Status', accessor: 'status' }],
    tableData: [{ name: 'stms-main-db', engine: 'PostgreSQL 15', status: 'Primary (Healthy)' }]
  },
  {
    name: 'Storage',
    route: 'infrastructure/storage',
    title: 'Storage Volumes',
    summary: 'Object storage utilization grew by 12TB this month. Log retention policies successfully archived older data. Block volumes attached to DB nodes have 40% headroom.',
    kpis: [{ title: 'Total Used', value: '142 TB' }, { title: 'Growth (MoM)', value: '+12 TB' }],
    tableCols: [{ header: 'Volume/Bucket', accessor: 'name' }, { header: 'Type', accessor: 'type' }, { header: 'Usage', accessor: 'usage' }],
    tableData: [{ name: 'stms-telemetry-logs', type: 'S3 Standard', usage: '84 TB' }]
  },
  {
    name: 'Backup',
    route: 'infrastructure/backup',
    title: 'Backup & Recovery',
    summary: 'All scheduled backups completed successfully overnight. One archive is nearing the retention limit. No recovery actions are required. Database snapshots verified.',
    kpis: [
      { title: 'Last Backup', value: '02:00 AM' },
      { title: 'Status', value: 'Success', trend: { value: 'Verified', isPositive: true } },
      { title: 'Storage Usage', value: '72%' },
      { title: 'Next Backup', value: 'Tonight' },
    ],
    tableCols: [{ header: 'Job Name', accessor: 'name' }, { header: 'Schedule', accessor: 'schedule' }, { header: 'Last Run', accessor: 'lastRun' }],
    tableData: [{ name: 'Postgres Full Dump', schedule: 'Daily @ 02:00', lastRun: 'Success (2h 14m)' }]
  },
  {
    name: 'ApiGateway',
    route: 'infrastructure/gateway',
    title: 'API Gateway',
    summary: 'Gateway is routing 4,200 requests per second. Edge caching is absorbing 40% of traffic. No rate limits triggered for enterprise tenants. Two IPs blocked for brute force.',
    kpis: [{ title: 'Requests / sec', value: '4,200' }, { title: 'Cache Hit', value: '40%' }],
    tableCols: [{ header: 'Endpoint', accessor: 'endpoint' }, { header: 'Traffic', accessor: 'traffic' }, { header: 'Latency', accessor: 'latency' }],
    tableData: [{ name: '/api/v1/telemetry', traffic: '2.4k/s', latency: '12ms' }]
  },
  {
    name: 'Vendors',
    route: 'vendors',
    title: 'Hardware Vendors',
    summary: 'Cisco and Juniper firmware catalogs were updated successfully. Two new vendor integrations (Aruba) are in beta testing. Vendor API endpoints are responding normally.',
    kpis: [{ title: 'Active Vendors', value: '14' }, { title: 'Catalogs Updated', value: '2' }],
    tableCols: [{ header: 'Vendor Name', accessor: 'name' }, { header: 'Supported Models', accessor: 'models' }, { header: 'Integration', accessor: 'integration' }],
    tableData: [{ name: 'Cisco', models: '142', integration: 'Healthy' }]
  },
  {
    name: 'VendorSLA',
    route: 'vendor-sla',
    title: 'Vendor SLAs',
    summary: 'All vendors are meeting their 99.9% uptime SLA for remote management APIs this month. Support ticket resolution time for critical hardware faults averages 4 hours.',
    kpis: [{ title: 'Avg Uptime', value: '99.95%' }, { title: 'SLA Breaches', value: '0' }],
    tableCols: [{ header: 'Vendor', accessor: 'name' }, { header: 'Uptime (30d)', accessor: 'uptime' }, { header: 'Support SLA', accessor: 'support' }],
    tableData: [{ name: 'Juniper', uptime: '100%', support: 'Met (2h avg)' }]
  },
  {
    name: 'Inventory',
    route: 'inventory',
    title: 'Global Hardware Inventory',
    summary: 'Total provisioned devices reached 61,220. 98.6% are currently online. 142 devices have pending firmware updates scheduled for the maintenance window.',
    kpis: [
      { title: 'Total Devices', value: '61,220' },
      { title: 'Online', value: '98.6%' },
      { title: 'Pending Updates', value: '142' },
    ],
    tableCols: [{ header: 'Device Model', accessor: 'model' }, { header: 'Total Deployed', accessor: 'total' }, { header: 'Online', accessor: 'online' }],
    tableData: [{ model: 'Cisco C9200', total: '14,204', online: '14,100' }]
  },
  {
    name: 'Alerts',
    route: 'monitoring/alerts',
    title: 'System Alerts',
    summary: 'No critical alerts active. 14 warning alerts regarding high CPU on edge routers for Tenant B. PagerDuty integration is active and verified.',
    kpis: [{ title: 'Critical', value: '0' }, { title: 'Warnings', value: '14' }],
    tableCols: [{ header: 'Severity', accessor: 'severity' }, { header: 'Message', accessor: 'message' }, { header: 'Time', accessor: 'time' }],
    tableData: [{ severity: 'Warning', message: 'Edge Router CPU > 90%', time: '10 mins ago' }]
  },
  {
    name: 'AuditLogs',
    route: 'monitoring/audit-logs',
    title: 'Security & Audit Logs',
    summary: 'Security posture is healthy. Multiple failed login attempts from unknown IPs were automatically blocked. No abnormal API usage detected. 2 password resets processed.',
    kpis: [
      { title: 'Failed Logins', value: '18' },
      { title: 'Blocked IPs', value: '6' },
      { title: 'Password Resets', value: '2' },
      { title: 'Critical Threats', value: '0' },
    ],
    tableCols: [{ header: 'Action', accessor: 'action' }, { header: 'Actor', accessor: 'actor' }, { header: 'IP Address', accessor: 'ip' }, { header: 'Timestamp', accessor: 'time' }],
    tableData: [{ action: 'Tenant Provisioned', actor: 'Arjun Mehta', ip: '192.168.1.42', time: '1 hour ago' }, { action: 'Failed Login', actor: 'System', ip: '45.22.11.x', time: '2 hours ago' }]
  },
  {
    name: 'Reports',
    route: 'reports',
    title: 'System Reports',
    summary: 'Monthly SLA compliance reports were generated and emailed to all enterprise tenants. System health report is ready for download. Custom report generation increased by 12%.',
    kpis: [{ title: 'Generated (30d)', value: '1,420' }, { title: 'Scheduled Jobs', value: '45' }],
    tableCols: [{ header: 'Report Name', accessor: 'name' }, { header: 'Type', accessor: 'type' }, { header: 'Generated', accessor: 'date' }],
    tableData: [{ name: 'Q3 Enterprise SLA', type: 'Compliance', date: 'Oct 1, 2026' }]
  },
  {
    name: 'Settings',
    route: 'settings',
    title: 'Platform Settings',
    summary: 'Global configuration is synchronized across all regions. SMTP credentials were updated yesterday. The new SSO SAML provider is enabled in test mode.',
    kpis: [{ title: 'Config Sync', value: '100%' }, { title: 'Active Regions', value: '3' }],
    tableCols: [{ header: 'Setting Group', accessor: 'group' }, { header: 'Last Modified', accessor: 'modified' }, { header: 'Modified By', accessor: 'by' }],
    tableData: [{ group: 'SMTP / Email', modified: 'Yesterday', by: 'System Admin' }, { group: 'SSO / SAML', modified: '3 days ago', by: 'Security Team' }]
  }
];

pages.forEach(page => {
  const fileContent = `import { EnterprisePageTemplate } from "../../components/Enterprise/EnterprisePageTemplate";
import { DataTable } from "../../components/Enterprise/DataTable";
import { ChartCard, SimpleLineChart, SimpleBarChart } from "../../components/Enterprise/ChartCard";

export default function ${page.name}Page() {
  const kpis = [
    ${page.kpis.map(kpi => `{ title: "${kpi.title}", value: "${kpi.value}" ${kpi.trend ? `, trend: { value: "${kpi.trend.value}", isPositive: ${kpi.trend.isPositive ? 'true' : 'false'}${kpi.trend.isNeutral ? ', isNeutral: true' : ''} }` : ''} }`).join(',\n    ')}
  ];

  const tableColumns = [
    ${page.tableCols.map(col => `{ header: "${col.header}", accessor: (row: any) => <span className="font-medium">{row.${col.accessor || 'name'} || row.${col.header.toLowerCase().replace(/[^a-z0-9]/g, '')} || "Data"}</span> }`).join(',\n    ')}
  ];

  const tableData = [
    ${page.tableData.map(row => JSON.stringify(row)).join(',\n    ')}
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
      title={\`${page.title.replace(/"/g, '\\"')}\`}
      summary={\`${page.summary.replace(/"/g, '\\"')}\`}
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
`;

  fs.writeFileSync(path.join(pagesDir, `${page.name}.tsx`), fileContent);
});

console.log('Pages generated successfully!');
