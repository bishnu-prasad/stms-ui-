const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'vendor', 'pages');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

const pages = [
  {
    fileName: 'Dashboard.tsx',
    name: 'Dashboard',
    title: 'Vendor Maintenance Operations Dashboard',
    narrative: 'Good Morning, Delta Service Team. You have 18 maintenance jobs today. 3 critical alarms require immediate response across the Rajasthan and Uttar Pradesh circles. 2 SLA deadlines expire within the next 45 minutes. Priority focus: SATKHANDA Open Plot (Battery Discharge - 28m SLA remaining). Field engineers Rahul Sharma and Vikas Kumar are currently en-route.',
    status: 'critical',
    greeting: 'Good Morning, Delta Electronics Team',
    kpi1: { title: "Jobs Today", val: "18", sub: "3 Critical, 8 High Priority", badgeText: "Active Dispatch" },
    kpi2: { title: "SLA Response Rate", val: "98.4%", sub: "Avg response: 18 mins" },
    kpi3: { title: "Engineers Deployed", val: "4 / 5", sub: "1 Engineer on Leave", badgeText: "80% Capacity" },
    kpi4: { title: "Spare Parts Available", val: "93 Units", sub: "2 Items Low Stock" },
    hasKanban: true,
    chartTitle: "Weekly Job Resolution & SLA Compliance Trend",
    chartQuestion: "Are our field engineers meeting response SLA targets across major customer networks?",
  },
  {
    fileName: 'Jobs.tsx',
    name: 'Jobs',
    title: 'Field Service Maintenance Jobs (Kanban & Table)',
    narrative: 'Your field dispatch queue currently has 18 active maintenance tickets. 4 jobs are actively under repair on-site, 2 are in transit, 1 is awaiting customer verification from Reliance Jio, and 1 ticket requires spare part replacement (Controller Board V3.1).',
    status: 'warning',
    greeting: 'Delta Dispatch Operations',
    kpi1: { title: "Total Active Jobs", val: "18", sub: "10 Assigned, 8 Open" },
    kpi2: { title: "Critical Priority", val: "3 Jobs", sub: "Immediate dispatch required" },
    kpi3: { title: "Avg Resolution Time", val: "1.4 hrs", sub: "12% faster than contract SLA" },
    kpi4: { title: "First-Time Fix Rate", val: "94.2%", sub: "High component reliability" },
    hasKanban: true,
    chartTitle: "Job Distribution by Customer & Priority",
    chartQuestion: "Which customer network requires the highest field repair volume this week?",
  },
  {
    fileName: 'AssignedSites.tsx',
    name: 'AssignedSites',
    title: 'Assigned Telecom Sites Portfolio',
    narrative: 'Delta Electronics is contracted to maintain 4 primary customer site clusters comprising 16 multi-vendor equipment assets. Site SATKHANDA Open Plot requires urgent battery bank replacement. All other contracted sites are operating within normal thermal and power parameters.',
    status: 'warning',
    greeting: 'Contracted Site Assets',
    kpi1: { title: "Contracted Sites", val: "4 Sites", sub: "Across 3 Circles" },
    kpi2: { title: "Avg Site Health", val: "80.0%", sub: "1 Site in Critical state" },
    kpi3: { title: "Equipment Assets", val: "16 Assets", sub: "SMPS, Battery Banks, OPE" },
    kpi4: { title: "Preventive Maintenance", val: "100%", sub: "Q2 PM routines completed" },
    chartTitle: "Site Power Source & Health Metrics",
    chartQuestion: "What is the health and backup runtime profile across customer sites?",
  },
  {
    fileName: 'ActiveAlarms.tsx',
    name: 'ActiveAlarms',
    title: 'Contracted Equipment Alarm Management',
    narrative: 'There are currently 3 active hardware fault alarms on Delta-assigned equipment. Alarm ALM-9021 at SATKHANDA Open Plot has been escalated to L2 Senior Engineer Rahul Sharma. Response SLA is actively counting down (28 mins remaining).',
    status: 'critical',
    greeting: 'Equipment Fault Monitoring',
    kpi1: { title: "Active Alarms", val: "3 Alarms", sub: "1 Critical, 2 Major" },
    kpi2: { title: "SLA Countdown", val: "28 mins", sub: "Nearest SLA expiry" },
    kpi3: { title: "MTTR Average", val: "1.2 hrs", sub: "Mean Time to Repair" },
    kpi4: { title: "Acknowledged Alarms", val: "100%", sub: "All alerts assigned" },
    chartTitle: "Alarm Frequency by Equipment Type",
    chartQuestion: "Which hardware component component generates the most fault tickets?",
  },
  {
    fileName: 'Maintenance.tsx',
    name: 'Maintenance',
    title: 'Preventive Maintenance (PM) Schedule',
    narrative: 'Delta Field Services has 4 Preventive Maintenance audits scheduled for July 2026. PM-Q3-03 (HVAC & Thermal Audit at UDPR-PREM NAGAR) is currently in progress. 1 PM routine (DG Service at Rudawal) was completed yesterday and verified by Vodafone Idea.',
    status: 'normal',
    greeting: 'Preventive Maintenance Hub',
    kpi1: { title: "Upcoming PMs", val: "3 Audits", sub: "Scheduled for July" },
    kpi2: { title: "Completed PMs", val: "1 Audit", sub: "100% Sign-off" },
    kpi3: { title: "Missed PMs", val: "0", sub: "Zero SLA violations" },
    kpi4: { title: "PM Compliance", val: "100%", sub: "On-time maintenance" },
    chartTitle: "Quarterly PM Completion vs Target",
    chartQuestion: "Are field teams adhering to quarterly preventive maintenance quotas?",
  },
  {
    fileName: 'Engineers.tsx',
    name: 'Engineers',
    title: 'Field Engineer Roster & Dispatch Tracking',
    narrative: '4 out of 5 field engineers are active today. Rahul Sharma is on-site at SATKHANDA Open Plot, Vikas Kumar is in transit to Agra LTP, and Priya Mehta is available at the Bikaner base. Average field rating across customer sign-offs is 4.88 / 5.0.',
    status: 'normal',
    greeting: 'Field Operations Team',
    kpi1: { title: "Engineers Active", val: "4 Techs", sub: "1 Tech on Leave" },
    kpi2: { title: "Avg Customer Rating", val: "4.88 ★", sub: "Based on 48 reviews" },
    kpi3: { title: "Avg Repair Speed", val: "1.5 hrs", sub: "Per maintenance job" },
    kpi4: { title: "GPS Tracking", val: "Online", sub: "Live location streams" },
    chartTitle: "Engineer Productivity & Completed Jobs",
    chartQuestion: "Which field engineers solved the most maintenance jobs this week?",
  },
  {
    fileName: 'Inventory.tsx',
    name: 'Inventory',
    title: 'Spare Parts & Hardware Inventory',
    narrative: 'Delta Electronics holds 93 spare parts in local service base inventory. 5 units of SMPS Controller V3.1 are currently reserved for pending jobs. Stock warning: Auto Mains Failure Solenoid Kits have dropped to 3 units; automated reorder generated.',
    status: 'warning',
    greeting: 'Service Base Spare Parts',
    kpi1: { title: "Available Parts", val: "93 Units", sub: "Across 5 Categories" },
    kpi2: { title: "Reserved for Jobs", val: "25 Units", sub: "Active work orders" },
    kpi3: { title: "In Transit", val: "51 Units", sub: "Dispatched from warehouse" },
    kpi4: { title: "Inventory Value", val: "₹34.8L", sub: "Field spare parts asset" },
    chartTitle: "Spare Parts Consumption Breakdown",
    chartQuestion: "Which component replacement incurs the highest material consumption?",
  },
  {
    fileName: 'Customers.tsx',
    name: 'Customers',
    title: 'Contracted Telecommunication Customers',
    narrative: 'Delta Electronics provides SLA-managed field services to 4 major telecommunication operators: Reliance Jio, Bharti Airtel, Vodafone Idea, and Indus Towers. Overall customer satisfaction score stands at 4.83 / 5.0 with 98.4% average SLA compliance.',
    status: 'normal',
    greeting: 'Contracted Operator Accounts',
    kpi1: { title: "Active Accounts", val: "4 Operators", sub: "Contracted Partners" },
    kpi2: { title: "Contracted Sites", val: "5,150", sub: "Nationwide coverage" },
    kpi3: { title: "SLA Compliance", val: "98.4%", sub: "Target >97.5%" },
    kpi4: { title: "Overall Satisfaction", val: "4.83 ★", sub: "Customer reviews" },
    chartTitle: "Customer SLA Performance Comparison",
    chartQuestion: "How do our SLA compliance rates compare across customer networks?",
  },
  {
    fileName: 'Reports.tsx',
    name: 'Reports',
    title: 'Service Reports & SLA Analytics Export',
    narrative: 'Generate and download certified field service reports, SLA audit logs, engineer productivity metrics, and spare parts consumption records. Daily maintenance log export for July 2, 2026 is ready for customer compliance submission.',
    status: 'normal',
    greeting: 'Service Reporting Suite',
    kpi1: { title: "Generated Reports", val: "142", sub: "This month" },
    kpi2: { title: "Customer Exports", val: "48 PDFs", sub: "Sent for sign-off" },
    kpi3: { title: "Audit Log Integrity", val: "100%", sub: "Cryptographically verified" },
    kpi4: { title: "Billing Attachments", val: "Ready", sub: "SLA verification ready" },
    chartTitle: "Monthly Maintenance Report Generations",
    chartQuestion: "What is the volume trend of service completion reports generated?",
  },
  {
    fileName: 'Notifications.tsx',
    name: 'Notifications',
    title: 'Dispatch Alerts & Customer Feedbacks',
    narrative: 'Real-time alert log for field operations. 3 high-priority dispatch notifications were dispatched to field technicians in the last hour. Reliance Jio submitted 5-star feedback for yesterday’s SMPS overhaul at SATKHANDA Primary.',
    status: 'normal',
    greeting: 'Vendor Dispatch Center',
    kpi1: { title: "Alerts Sent", val: "48", sub: "Today via SMS/App" },
    kpi2: { title: "Customer Reviews", val: "12 New", sub: "100% Positive" },
    kpi3: { title: "Critical Dispatches", val: "3", sub: "Under 15m response" },
    kpi4: { title: "Delivery Success", val: "99.8%", sub: "Push notifications" },
    chartTitle: "Notification Dispatch Channels",
    chartQuestion: "How quickly are field engineers acknowledging dispatch alerts?",
  },
  {
    fileName: 'Settings.tsx',
    name: 'Settings',
    title: 'Vendor Partner Platform Settings',
    narrative: 'Configure SLA notification thresholds, default dispatch radiuses, engineer auto-assignment parameters, and API integration endpoints with customer ticket management systems.',
    status: 'normal',
    greeting: 'Configuration Suite',
    kpi1: { title: "SLA Threshold", val: "30 Mins", sub: "Warning trigger" },
    kpi2: { title: "Auto-Dispatch", val: "Enabled", sub: "Proximity matching" },
    kpi3: { title: "Max Dispatch Distance", val: "50 km", sub: "Per engineer" },
    kpi4: { title: "API Gateway Status", val: "Connected", sub: "STMS Customer Sync" },
    chartTitle: "API Synchronization Latency",
    chartQuestion: "Is real-time ticket synchronization responding under 100ms?",
  },
  {
    fileName: 'Profile.tsx',
    name: 'Profile',
    title: 'Vendor Partner Organization Profile',
    narrative: 'Delta Electronics Field Services Division — Registered STMS Partner. License code DEL-IND-042. SLA tier: Tier 1 Strategic Hardware Partner.',
    status: 'normal',
    greeting: 'Partner Credentials',
    kpi1: { title: "Partner Tier", val: "Tier 1", sub: "Strategic Partner" },
    kpi2: { title: "Certified Engineers", val: "148 Techs", sub: "Licensed Field Staff" },
    kpi3: { title: "Warranty Coverage", val: "Active", sub: "Until Dec 2028" },
    kpi4: { title: "Base Headquarters", val: "Pune, IN", sub: "Central Operations Base" },
    chartTitle: "Partner Contract Duration & Renewal",
    chartQuestion: "Contract status: Active with 30 months remaining.",
  },
  {
    fileName: 'Support.tsx',
    name: 'Support',
    title: 'STMS Vendor Field Support & Helpdesk',
    narrative: 'Contact STMS platform technical support or request emergency field backup resources for multi-vendor diagnostic assistance.',
    status: 'normal',
    greeting: 'Field Support Desk',
    kpi1: { title: "Open Support Tickets", val: "0", sub: "No outstanding tickets" },
    kpi2: { title: "Avg Helpdesk Speed", val: "4 mins", sub: "Response time" },
    kpi3: { title: "System Uptime", val: "99.99%", sub: "STMS Sync API" },
    kpi4: { title: "Emergency Backup", val: "Ready", sub: "L3 Expert Desk" },
    chartTitle: "Support Ticket Resolution Efficiency",
    chartQuestion: "How quickly does STMS L3 support resolve complex hardware diagnostic requests?",
  }
];

const chartSampleData = [
  { name: "Mon", value: 14, sla: 98 },
  { name: "Tue", value: 22, sla: 99 },
  { name: "Wed", value: 18, sla: 97 },
  { name: "Thu", value: 26, sla: 99 },
  { name: "Fri", value: 30, sla: 98 },
  { name: "Sat", value: 16, sla: 100 },
  { name: "Sun", value: 12, sla: 100 }
];

pages.forEach(p => {
  const code = `import { useState } from "react";
import { VendorPageTemplate } from "../components/VendorPageTemplate";
import { VendorMetricCard } from "../components/VendorMetricCard";
import { VendorChartCard, SimpleVendorBarChart, SimpleVendorLineChart } from "../components/VendorChartCard";
import { VendorDataTable } from "../components/VendorDataTable";
import { VendorKanban } from "../components/VendorKanban";
import { mockVendorJobs } from "../data/vendorMockData";
import { Wrench, Clock, UserCheck, Boxes } from "lucide-react";

export default function ${p.name}Page() {
  const [jobsList, setJobsList] = useState(mockVendorJobs);

  const handleStatusChange = (jobId: string, newStatus: any) => {
    setJobsList(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
  };

  const kpis = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <VendorMetricCard title="${p.kpi1.title}" value="${p.kpi1.val}" subtitle="${p.kpi1.sub}" badgeText="${p.kpi1.badgeText || ''}" icon={<Wrench className="w-5 h-5 text-teal-600" />} delay={0.05} />
      <VendorMetricCard title="${p.kpi2.title}" value="${p.kpi2.val}" subtitle="${p.kpi2.sub}" icon={<Clock className="w-5 h-5 text-teal-600" />} delay={0.1} />
      <VendorMetricCard title="${p.kpi3.title}" value="${p.kpi3.val}" subtitle="${p.kpi3.sub}" badgeText="${p.kpi3.badgeText || ''}" icon={<UserCheck className="w-5 h-5 text-teal-600" />} delay={0.15} />
      <VendorMetricCard title="${p.kpi4.title}" value="${p.kpi4.val}" subtitle="${p.kpi4.sub}" icon={<Boxes className="w-5 h-5 text-teal-600" />} delay={0.2} />
    </div>
  );

  const charts = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <VendorChartCard title="${p.chartTitle}" businessQuestion="${p.chartQuestion}" delay={0.25}>
        <SimpleVendorBarChart data={${JSON.stringify(chartSampleData)}} dataKey="value" categoryKey="name" color="#0D9488" />
      </VendorChartCard>
      <VendorChartCard title="SLA Compliance & Response Target Trend" businessQuestion="What is the average response latency across maintenance dispatches?" delay={0.3}>
        <SimpleVendorLineChart data={${JSON.stringify(chartSampleData)}} dataKey="sla" categoryKey="name" color="#2563EB" />
      </VendorChartCard>
    </div>
  );

  ${p.name === 'Jobs' || p.name === 'Dashboard' ? `
  const extraContent = (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Dispatch Job Board (Kanban View)</h2>
        <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
          Live Dispatch Sync
        </span>
      </div>
      <VendorKanban jobs={jobsList} onStatusChange={handleStatusChange} />
    </section>
  );
  ` : 'const extraContent = null;'}

  const jobColumns = [
    { header: "Job ID", accessor: (r: any) => <span className="font-mono font-bold text-teal-700">{r.id}</span> },
    { header: "Title & Issue", accessor: (r: any) => <div><div className="font-bold text-slate-900">{r.title}</div><div className="text-xs text-slate-400">{r.equipment}</div></div> },
    { header: "Customer & Site", accessor: (r: any) => <div><div className="font-semibold text-teal-800">{r.customerName}</div><div className="text-xs text-slate-500">{r.siteName} ({r.circle})</div></div> },
    { header: "Priority", accessor: (r: any) => <span className={\`px-2 py-0.5 rounded-full text-[10px] font-bold \${r.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : r.priority === 'HIGH' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}\`}>{r.priority}</span> },
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
      greeting="${p.greeting}"
      title="${p.title}"
      narrative={\`${p.narrative.replace(/"/g, '\\"')}\`}
      status="${p.status}"
      icon={<Wrench className="w-6 h-6 text-teal-600" />}
      kpis={kpis}
      charts={charts}
      extraContent={extraContent}
      table={table}
      recommendations={recommendations}
    />
  );
}
`;

  fs.writeFileSync(path.join(pagesDir, p.fileName), code);
});

console.log('Vendor pages generated successfully!');
