const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'super-admin', 'pages', 'Enterprise');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

const superAdminPages = [
  {
    fileName: 'Customers.tsx',
    name: 'Customers',
    title: 'Enterprise Customer Tenant Management',
    summary: 'Manage 142 active enterprise customer accounts. Overall customer health score is 99.2%. Reliance Jio expanded site footprint (+120 sites this month). 2 customer accounts are flagged for license renewal review.',
    greeting: 'Tenant Administration',
    kpi1: { title: "Total Customers", val: "142 Tenants", sub: "+4 this month" },
    kpi2: { title: "Avg Customer Health", val: "99.2%", sub: "SLA compliance" },
    kpi3: { title: "Active Sites Portfolio", val: "5,570 Sites", sub: "Nationwide coverage" },
    kpi4: { title: "Expiring Licenses", val: "2 Accounts", sub: "Action required in 7 days" },
    chartTitle: "Customer Account Footprint & Site Growth",
    chartQuestion: "Which enterprise customer tenant expanded their site monitoring allocation most rapidly?",
  },
  {
    fileName: 'PlatformUsers.tsx',
    name: 'PlatformUsers',
    title: 'Platform Administrators & Access Control',
    summary: 'Manage platform administration accounts, security roles, and API access privileges. 100% MFA adoption enforced across all system administrator profiles.',
    greeting: 'Access & IAM Control',
    kpi1: { title: "Platform Users", val: "24 Admins", sub: "Across 4 Roles" },
    kpi2: { title: "MFA Enforcement", val: "100%", sub: "Zero unauthenticated logins" },
    kpi3: { title: "Active Sessions", val: "12 Sessions", sub: "Currently authenticated" },
    kpi4: { title: "Security Rating", val: "SOC2 Met", sub: "Quarterly audit cleared" },
    chartTitle: "Admin Activity & Access Stream",
    chartQuestion: "How many administrative actions were performed per role tier this week?",
  },
  {
    fileName: 'PlatformHealth.tsx',
    name: 'PlatformHealth',
    title: 'Cloud Infrastructure & Service Health',
    summary: 'Real-time telemetry and health monitoring across 9 core microservices clusters. Overall system SLA stands at 99.98% availability with zero unscheduled outages.',
    greeting: 'Infrastructure Telemetry',
    kpi1: { title: "Cluster Availability", val: "99.98%", sub: "Exceeding 99.9% target" },
    kpi2: { title: "Avg Gateway Latency", val: "4.2 ms", sub: "Sub-10ms performance" },
    kpi3: { title: "CPU Load Factor", val: "22% Avg", sub: "Peak load 34%" },
    kpi4: { title: "Memory Allocation", val: "38% RAM", sub: "Buffer headroom 62%" },
    chartTitle: "Microservice Latency & Throughput",
    chartQuestion: "Are cloud microservices responding under sub-10ms SLAs during peak ingestion?",
  },
  {
    fileName: 'Servers.tsx',
    name: 'Servers',
    title: 'Cloud Compute Nodes & Server Fleet',
    summary: 'Monitor 48 compute instances across Kubernetes and EC2 bare-metal clusters in region ap-south-1. All server nodes report healthy thermal and memory metrics.',
    greeting: 'Compute Node Fleet',
    kpi1: { title: "Active Instances", val: "48 Nodes", sub: "Across 3 Availability Zones" },
    kpi2: { title: "Fleet CPU Load", val: "24.5%", sub: "Optimal range" },
    kpi3: { title: "Disk I/O Latency", val: "1.2 ms", sub: "NVMe SSD backed" },
    kpi4: { title: "Auto-Scale Buffer", val: "12 Nodes", sub: "Standby capacity" },
    chartTitle: "Compute Instance CPU Utilization",
    chartQuestion: "What is the CPU utilization distribution across availability zones?",
  },
  {
    fileName: 'Database.tsx',
    name: 'Database',
    title: 'Database Clusters & Query Engine',
    summary: 'Monitor PostgreSQL primary/replica clusters, ClickHouse analytics engine, and Redis in-memory caches. Automated hourly backups executed successfully.',
    greeting: 'Database Engine Ops',
    kpi1: { title: "DB Query Time", val: "2.1 ms", sub: "PostgreSQL p95" },
    kpi2: { title: "ClickHouse Ingestion", val: "45k msg/s", sub: "Telemetry stream" },
    kpi3: { title: "Redis Hit Ratio", val: "98.4%", sub: "In-memory cache" },
    kpi4: { title: "Backup Freshness", val: "25m ago", sub: "100% Verified" },
    chartTitle: "Database Write Ops & Storage Scaling",
    chartQuestion: "How fast is telemetry data expanding database volume storage?",
  },
  {
    fileName: 'Storage.tsx',
    name: 'Storage',
    title: 'Object Storage & Telemetry Archival',
    summary: 'AWS S3 object storage holds 124.5 TB of raw telemetry logs, alarm snapshots, and service audit files. Life-cycle policy automatically compresses archives past 90 days.',
    greeting: 'Object Storage Gateway',
    kpi1: { title: "Used Storage", val: "124.5 TB", sub: "Of 250 TB quota" },
    kpi2: { title: "Monthly Objects", val: "1.4B Items", sub: "Telemetry data points" },
    kpi3: { title: "S3 Read Speed", val: "18 ms", sub: "High throughput" },
    kpi4: { title: "Compression Savings", val: "68%", sub: "Parquet columnar storage" },
    chartTitle: "Storage Capacity Growth Forecast",
    chartQuestion: "When will current S3 storage buckets hit 85% capacity threshold?",
  },
  {
    fileName: 'Backup.tsx',
    name: 'Backup',
    title: 'Disaster Recovery & Backup Automation',
    summary: 'Disaster recovery automation suite. Daily snapshot pg_dump_20260703_0900.sql (18.4 GB) verified. RPO < 15 mins, RTO < 1 hour guaranteed by automated failover.',
    greeting: 'Disaster Recovery Suite',
    kpi1: { title: "Backup Status", val: "100% Success", sub: "Zero failed jobs" },
    kpi2: { title: "RPO Guarantee", val: "< 15 Mins", sub: "Recovery Point Objective" },
    kpi3: { title: "RTO Guarantee", val: "< 1 Hour", sub: "Recovery Time Objective" },
    kpi4: { title: "Last Snapshot", val: "18.4 GB", sub: "Checksum verified" },
    chartTitle: "Daily Backup Size & Transfer Speed",
    chartQuestion: "Are automated database backup jobs completing within designated maintenance windows?",
  },
  {
    fileName: 'ApiGateway.tsx',
    name: 'ApiGateway',
    title: 'API Gateway & Rate Limiting Engine',
    summary: 'Kong/Envoy API Gateway managing 42M daily telemetry and REST API requests. Rate-limiting rules active with zero unauthorized access breaches.',
    greeting: 'API Gateway Management',
    kpi1: { title: "Daily API Calls", val: "42.8M", sub: "Avg 495 req/sec" },
    kpi2: { title: "Gateway Latency", val: "4.2 ms", sub: "Sub-5ms SLA" },
    kpi3: { title: "Error Rate 5xx", val: "0.001%", sub: "Exceptional stability" },
    kpi4: { title: "Blocked Abuse Req", val: "2,410", sub: "Automatically rejected" },
    chartTitle: "API Throughput & Rate Limit Enforcement",
    chartQuestion: "What is the peak hourly API call volume handled by gateway nodes?",
  },
  {
    fileName: 'Vendors.tsx',
    name: 'Vendors',
    title: 'Third-Party Hardware Vendors Portfolio',
    summary: 'Manage 4 contracted hardware vendors (Vertiv, Delta Electronics, Intelux, VNT). Overall vendor SLA compliance rate is 98.4%.',
    greeting: 'Vendor Partners',
    kpi1: { title: "Active Vendors", val: "4 Partners", sub: "Vertiv, Delta, Intelux, VNT" },
    kpi2: { title: "Vendor SLA Rate", val: "98.4%", sub: "Contract compliance" },
    kpi3: { title: "Active Dispatches", val: "18 Jobs", sub: "Field work orders" },
    kpi4: { title: "Avg MTTR Speed", val: "1.4 hrs", sub: "Contract target <2.0h" },
    chartTitle: "Vendor Repair Speed (MTTR) Comparison",
    chartQuestion: "Which hardware vendor delivers the fastest Mean Time to Repair (MTTR)?",
  },
  {
    fileName: 'VendorSLA.tsx',
    name: 'VendorSLA',
    title: 'Vendor SLA Tracking & Penalty Audits',
    summary: 'Audit vendor contract SLA performance, response latency, and penalty assessments. Delta Electronics leads in SLA compliance (99.1%).',
    greeting: 'Contract SLA Audits',
    kpi1: { title: "Target SLA Met", val: "98.4%", sub: "Quarterly average" },
    kpi2: { title: "Penalty Tickets", val: "0 Tickets", sub: "Zero SLA breaches" },
    kpi3: { title: "First-Time Fix", val: "94.2%", sub: "High repair quality" },
    kpi4: { title: "Response Latency", val: "18 mins", sub: "SLA target <30m" },
    chartTitle: "Quarterly Vendor SLA Compliance Trend",
    chartQuestion: "Are hardware vendors fulfilling contractual SLA uptime guarantees?",
  },
  {
    fileName: 'Inventory.tsx',
    name: 'Inventory',
    title: 'Platform Hardware & Component Inventory',
    summary: 'Global telecom equipment asset tracker across all customer networks. 5,570 active sites hosting 22,280 monitored equipment components.',
    greeting: 'Global Asset Inventory',
    kpi1: { title: "Monitored Assets", val: "22,280", sub: "SMPS, SPS, Batteries, DG" },
    kpi2: { title: "Asset Health Rate", val: "97.8%", sub: "Fully operational" },
    kpi3: { title: "Replacement Parts", val: "93 Units", sub: "In service bases" },
    kpi4: { title: "Asset Valuation", val: "₹184 Cr", sub: "Managed hardware value" },
    chartTitle: "Equipment Asset Distribution by Type",
    chartQuestion: "What proportion of site equipment consists of lithium battery banks vs rectifiers?",
  },
  {
    fileName: 'Alerts.tsx',
    name: 'Alerts',
    title: 'Platform Incident & Alert Monitoring',
    summary: 'Real-time alert engine monitoring system incidents, hardware trips, and telemetry drops. Zero critical platform incidents currently active.',
    greeting: 'Alert Operations',
    kpi1: { title: "Active Incidents", val: "0 Critical", sub: "Platform operational" },
    kpi2: { title: "Advisory Alerts", val: "2 Low", sub: "Optimizations suggested" },
    kpi3: { title: "MTTR Response", val: "8.4 mins", sub: "Incident resolution" },
    kpi4: { title: "Alert Noise Filter", val: "99.4%", sub: "De-duplicated alerts" },
    chartTitle: "Incident Frequency & Escalation Trend",
    chartQuestion: "How quickly are automated platform alerts resolved by site reliability engineers?",
  },
  {
    fileName: 'AuditLogs.tsx',
    name: 'AuditLogs',
    title: 'Security Audit & Compliance Logs',
    summary: 'Immutable audit trail of all platform administrator actions, API key modifications, tenant provisioning events, and security access attempts.',
    greeting: 'Audit & Compliance',
    kpi1: { title: "Audit Trail Count", val: "1.2M Logs", sub: "Retention 365 days" },
    kpi2: { title: "Integrity Verification", val: "100%", sub: "Cryptographically signed" },
    kpi3: { title: "SOC2 Compliance", val: "Passed", sub: "Audit certified" },
    kpi4: { title: "Security Events", val: "24 Today", sub: "Automated IP blocks" },
    chartTitle: "Daily Administrative Audit Events",
    chartQuestion: "What is the volume of administrative actions recorded per hour?",
  },
  {
    fileName: 'Reports.tsx',
    name: 'Reports',
    title: 'Enterprise Platform Reporting Suite',
    summary: 'Generate certified executive reports covering platform availability, tenant growth, infrastructure costs, SLA compliance, and security audits.',
    greeting: 'Executive Reporting',
    kpi1: { title: "Reports Generated", val: "142", sub: "This month" },
    kpi2: { title: "Scheduled Exports", val: "24 Daily", sub: "Automated PDFs" },
    kpi3: { title: "Compliance Ready", val: "ISO 27001", sub: "SOC2 Type II" },
    kpi4: { title: "Data Precision", val: "100%", sub: "Audited financial stats" },
    chartTitle: "Monthly Report Exports by Type",
    chartQuestion: "Which report categories are requested most frequently by enterprise executives?",
  },
  {
    fileName: 'Settings.tsx',
    name: 'Settings',
    title: 'Global Platform Settings & Configurations',
    summary: 'System settings controlling multi-region deployment parameters, security authentication rules, automated backup schedules, and global API rate limits.',
    greeting: 'Global Settings',
    kpi1: { title: "System Region", val: "ap-south-1", sub: "Primary data center" },
    kpi2: { title: "Security Level", val: "High (SOC2)", sub: "MFA Mandatory" },
    kpi3: { title: "API Rate Limit", val: "500 req/s", sub: "Global ceiling" },
    kpi4: { title: "Backup Window", val: "02:00 UTC", sub: "Daily maintenance" },
    chartTitle: "API Synchronization Latency",
    chartQuestion: "Is real-time ticket synchronization responding under 100ms?",
  },
  {
    fileName: 'Subscriptions.tsx',
    name: 'Subscriptions',
    title: 'Enterprise Subscription & Licensing',
    summary: 'Manage tenant subscription tiers, contract renewals, site licensing limits, and billing schedules. 142 active enterprise subscriptions generating ₹4.82 Cr ARR.',
    greeting: 'Licensing & Subscriptions',
    kpi1: { title: "Active Subscriptions", val: "142 Contracts", sub: "100% Renewal rate" },
    kpi2: { title: "Annual ARR", val: "₹4.82 Cr", sub: "+14.2% YoY growth" },
    kpi3: { title: "Monthly MRR", val: "₹40.1L", sub: "Recurring revenue" },
    kpi4: { title: "Renewals Pending", val: "2 Contracts", sub: "Action in 7 days" },
    chartTitle: "ARR Growth & Renewal Forecast",
    chartQuestion: "What is the projected ARR expansion for the upcoming fiscal quarter?",
  },
  {
    fileName: 'CustomerHealth.tsx',
    name: 'CustomerHealth',
    title: 'Customer Health Score & SLA Monitoring',
    summary: 'Real-time customer tenant health scoring based on site uptime, alarm resolution velocity, telemetry packet drop rates, and user engagement.',
    greeting: 'Tenant Health Scorecard',
    kpi1: { title: "Average Health", val: "99.2%", sub: "Across all 142 tenants" },
    kpi2: { title: "Healthy Tenants", val: "140 Accounts", sub: ">98% Health score" },
    kpi3: { title: "At-Risk Tenants", val: "2 Accounts", sub: "Under observation" },
    kpi4: { title: "SLA SLA Met", val: "100%", sub: "Zero contract breaches" },
    chartTitle: "Tenant Health Score Distribution",
    chartQuestion: "How many customer tenants are operating at 99%+ operational health?",
  },
  {
    fileName: 'Permissions.tsx',
    name: 'Permissions',
    title: 'Platform RBAC & Security Permissions',
    summary: 'Fine-grained Role-Based Access Control (RBAC) permissions manager for system administrators, NOC operators, audit officers, and vendor partners.',
    greeting: 'RBAC Permission Matrix',
    kpi1: { title: "System Roles", val: "8 Roles", sub: "Pre-configured RBAC" },
    kpi2: { title: "Granular Rights", val: "64 Privileges", sub: "CRUD matrix" },
    kpi3: { title: "Assigned Users", val: "24 Admins", sub: "100% Audited" },
    kpi4: { title: "Security Level", val: "Strict", sub: "Zero-Trust Model" },
    chartTitle: "Permission Assignment Distribution",
    chartQuestion: "Which security roles carry administrative write privileges across microservices?",
  },
  {
    fileName: 'Roles.tsx',
    name: 'Roles',
    title: 'Administrative Security Roles Manager',
    summary: 'Manage platform administrative role definitions, security policies, and user assignment quotas under SOC2 guidelines.',
    greeting: 'Security Roles',
    kpi1: { title: "Active Roles", val: "8 Definitions", sub: "Root, Admin, NOC, Audit" },
    kpi2: { title: "User Assignments", val: "24 Accounts", sub: "Active users" },
    kpi3: { title: "Audit Status", val: "Cleared", sub: "Quarterly review" },
    kpi4: { title: "Policy Compliance", val: "100%", sub: "Zero over-privileged accounts" },
    chartTitle: "Role Distribution across Users",
    chartQuestion: "How are administrator accounts distributed across operational roles?",
  }
];

const chartSampleData = [
  { name: "Jan", value: 120, sla: 99.8 },
  { name: "Feb", value: 135, sla: 99.9 },
  { name: "Mar", value: 142, sla: 99.7 },
  { name: "Apr", value: 158, sla: 99.9 },
  { name: "May", value: 175, sla: 99.8 },
  { name: "Jun", value: 190, sla: 100.0 }
];

superAdminPages.forEach(p => {
  const code = `import { useState } from "react";
import { EnterprisePageTemplate } from "../../components/Enterprise/EnterprisePageTemplate";
import { KPICard } from "../../components/Enterprise/KPICard";
import { ChartCard, SimpleBarChart, SimpleLineChart } from "../../components/Enterprise/ChartCard";
import { DataTable } from "../../components/Enterprise/DataTable";
import { ShieldCheck, Server, Activity, Users, Clock } from "lucide-react";

export default function ${p.name}Page() {
  const kpis = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <KPICard title="${p.kpi1.title}" value="${p.kpi1.val}" status="${p.kpi1.sub}" delay={0.05} />
      <KPICard title="${p.kpi2.title}" value="${p.kpi2.val}" status="${p.kpi2.sub}" delay={0.1} />
      <KPICard title="${p.kpi3.title}" value="${p.kpi3.val}" status="${p.kpi3.sub}" delay={0.15} />
      <KPICard title="${p.kpi4.title}" value="${p.kpi4.val}" status="${p.kpi4.sub}" delay={0.2} />
    </div>
  );

  const charts = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard title="${p.chartTitle}" subtitle="${p.chartQuestion}" delay={0.25}>
        <SimpleBarChart data={${JSON.stringify(chartSampleData)}} dataKey="value" categoryKey="name" color="#2563EB" />
      </ChartCard>
      <ChartCard title="Platform SLA & Availability Trend" subtitle="Is system availability remaining strictly above 99.9% target?" delay={0.3}>
        <SimpleLineChart data={${JSON.stringify(chartSampleData)}} dataKey="sla" categoryKey="name" color="#16A34A" />
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
      title: "Optimize ${p.title} Operational Parameters",
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
      greeting="${p.greeting}"
      title="${p.title}"
      summary="${p.summary.replace(/"/g, '\\"')}"
      icon={<ShieldCheck className="w-7 h-7 text-blue-600" />}
      kpis={kpis}
      charts={charts}
      table={table}
      recommendations={recommendations}
    />
  );
}
`;

  fs.writeFileSync(path.join(pagesDir, p.fileName), code);
});

console.log('SuperAdmin Enterprise pages generated successfully!');
