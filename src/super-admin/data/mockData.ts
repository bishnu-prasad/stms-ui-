export interface SystemServiceHealth {
  id: string;
  name: string;
  category: "Gateway" | "Auth" | "Database" | "Cache" | "Analytics" | "Ingestion" | "Storage" | "Worker" | "Notification";
  status: "Healthy" | "Degraded" | "Maintenance";
  latencyMs: number;
  cpuPct: number;
  memoryPct: number;
  version: string;
  uptimePct: number;
  lastIncident: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  operator: string;
  action: string;
  category: "Provisioning" | "Backup" | "Security" | "Infrastructure" | "Billing" | "Config";
  severity: "INFO" | "SUCCESS" | "WARNING" | "CRITICAL";
  details: string;
}

export interface PendingActionItem {
  id: string;
  title: string;
  category: "Billing" | "Infrastructure" | "Security" | "Customer";
  priority: "HIGH" | "MEDIUM" | "LOW";
  details: string;
  impact: string;
  actionLabel: string;
}

export interface ExecutiveMetric {
  title: string;
  value: string | number;
  status: string;
  statusColor: string;
  trend: string;
  trendPositive: boolean;
  chartData: { name: string; val: number }[];
  recommendedAction: string;
}

export const platformSystemInfo = {
  platformName: "STMS Cloud Enterprise",
  version: "v3.4.2-prod",
  deploymentRegion: "ap-south-1 (Mumbai)",
  lastDeployment: "2 hours ago (Build #1482)",
  systemUptime: "99.98%",
  uptimeDuration: "148 days, 12 hrs",
  activeCustomers: 142,
  activeServers: 48,
  totalStorageTb: 124.5,
  monthlyArr: "₹4.82 Cr",
  mrr: "₹40.1L",
  platformStatus: "All Core Services Operational"
};

export const executiveSummaries: ExecutiveMetric[] = [
  {
    title: "Enterprise Customers",
    value: "142 Tenants",
    status: "99.2% Health Score",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    trend: "+4 this month",
    trendPositive: true,
    chartData: [{ name: "Jan", val: 128 }, { name: "Feb", val: 132 }, { name: "Mar", val: 135 }, { name: "Apr", val: 138 }, { name: "May", val: 142 }],
    recommendedAction: "Review 2 pending customer onboarding requests"
  },
  {
    title: "Platform Availability",
    value: "99.98%",
    status: "Exceeding SLA",
    statusColor: "bg-teal-50 text-teal-700 border-teal-200",
    trend: "0 Unscheduled Outages",
    trendPositive: true,
    chartData: [{ name: "Mon", val: 99.98 }, { name: "Tue", val: 99.99 }, { name: "Wed", val: 99.97 }, { name: "Thu", val: 99.98 }, { name: "Fri", val: 99.99 }],
    recommendedAction: "View multi-region latency telemetry"
  },
  {
    title: "Infrastructure Load",
    value: "22% Avg CPU",
    status: "Optimal Capacity",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
    trend: "RAM: 38% / Storage: 42%",
    trendPositive: true,
    chartData: [{ name: "00:00", val: 18 }, { name: "06:00", val: 24 }, { name: "12:00", val: 28 }, { name: "18:00", val: 21 }, { name: "24:00", val: 19 }],
    recommendedAction: "Redis cache memory optimization advised"
  },
  {
    title: "Financial ARR / MRR",
    value: "₹4.82 Cr",
    status: "MRR: ₹40.1L",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    trend: "+14.2% YoY",
    trendPositive: true,
    chartData: [{ name: "Q1", val: 3.8 }, { name: "Q2", val: 4.1 }, { name: "Q3", val: 4.5 }, { name: "Q4", val: 4.82 }],
    recommendedAction: "2 Enterprise renewals scheduled this week"
  },
  {
    title: "Security & Access",
    value: "0 Incidents",
    status: "100% MFA Enforced",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    trend: "24 Blocked IPs today",
    trendPositive: true,
    chartData: [{ name: "Mon", val: 12 }, { name: "Tue", val: 18 }, { name: "Wed", val: 8 }, { name: "Thu", val: 24 }, { name: "Fri", val: 15 }],
    recommendedAction: "Audited service account key rotation"
  },
  {
    title: "Platform Incidents",
    value: "0 Critical",
    status: "2 Low Advisory",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
    trend: "MTTR: 8.4 mins",
    trendPositive: true,
    chartData: [{ name: "W1", val: 2 }, { name: "W2", val: 1 }, { name: "W3", val: 3 }, { name: "W4", val: 0 }],
    recommendedAction: "Inspect ClickHouse storage volume compression"
  }
];

export const systemServices: SystemServiceHealth[] = [
  { id: "srv-1", name: "API Gateway (Envoy/Kong)", category: "Gateway", status: "Healthy", latencyMs: 4.2, cpuPct: 14, memoryPct: 28, version: "v2.8.1", uptimePct: 99.99, lastIncident: "None in 45 days" },
  { id: "srv-2", name: "Authentication (Auth0/OAuth2)", category: "Auth", status: "Healthy", latencyMs: 8.1, cpuPct: 18, memoryPct: 32, version: "v3.1.0", uptimePct: 100.0, lastIncident: "None in 60 days" },
  { id: "srv-3", name: "PostgreSQL Primary Cluster", category: "Database", status: "Healthy", latencyMs: 2.1, cpuPct: 24, memoryPct: 48, version: "v15.4", uptimePct: 99.98, lastIncident: "Minor failover 12 days ago" },
  { id: "srv-4", name: "Redis In-Memory Cache", category: "Cache", status: "Healthy", latencyMs: 0.4, cpuPct: 8, memoryPct: 62, version: "v7.0.11", uptimePct: 99.99, lastIncident: "None in 90 days" },
  { id: "srv-5", name: "ClickHouse Telemetry DB", category: "Analytics", status: "Healthy", latencyMs: 12.4, cpuPct: 31, memoryPct: 41, version: "v23.8", uptimePct: 99.95, lastIncident: "Index optimization 3 days ago" },
  { id: "srv-6", name: "MQTT Ingestion Engine", category: "Ingestion", status: "Healthy", latencyMs: 1.8, cpuPct: 22, memoryPct: 38, version: "v3.5.0", uptimePct: 99.99, lastIncident: "None in 30 days" },
  { id: "srv-7", name: "Object Storage Gateway (AWS S3)", category: "Storage", status: "Healthy", latencyMs: 18.0, cpuPct: 9, memoryPct: 19, version: "Cloud Native", uptimePct: 100.0, lastIncident: "None in 120 days" },
  { id: "srv-8", name: "Background Queue (Celery/RabbitMQ)", category: "Worker", status: "Healthy", latencyMs: 0.0, cpuPct: 15, memoryPct: 29, version: "v4.2.0", uptimePct: 99.97, lastIncident: "Worker scale-up yesterday" },
  { id: "srv-9", name: "Notification Engine (SMS/Push)", category: "Notification", status: "Healthy", latencyMs: 200.0, cpuPct: 5, memoryPct: 12, version: "v2.1.0", uptimePct: 99.99, lastIncident: "None in 15 days" },
];

export const platformActivityLog: ActivityLogItem[] = [
  { id: "act-101", timestamp: "10 mins ago", operator: "System Administrator (Arjun M.)", action: "Customer Upgrade", category: "Billing", severity: "SUCCESS", details: "Upgraded Bharti Airtel to Enterprise Unlimited Tier." },
  { id: "act-102", timestamp: "25 mins ago", operator: "Automated Backup Job", action: "Database Backup Completed", category: "Backup", severity: "SUCCESS", details: "PostgreSQL snapshot pg_dump_20260703_0900.sql (18.4 GB) saved to S3." },
  { id: "act-103", timestamp: "1 hour ago", operator: "DevOps Bot", action: "Redis Cluster Restart", category: "Infrastructure", severity: "INFO", details: "Completed graceful rolling restart of Redis Cache node-03." },
  { id: "act-104", timestamp: "2 hours ago", operator: "System Administrator (Arjun M.)", action: "Security Patch Installed", category: "Security", severity: "SUCCESS", details: "Applied CVE-2026-8812 patch to API Gateway nodes." },
  { id: "act-105", timestamp: "4 hours ago", operator: "Automated License Manager", action: "Customer License Renewed", category: "Billing", severity: "SUCCESS", details: "Reliance Jio 12-month license auto-renewed (₹1.20 Cr)." },
  { id: "act-106", timestamp: "6 hours ago", operator: "Security Engine", action: "IP Blocked", category: "Security", severity: "WARNING", details: "Automatically blocked IP 185.220.101.45 after 50 failed API auth attempts." },
];

export const pendingActions: PendingActionItem[] = [
  { id: "pa-1", title: "Approve Storage Allocation Expansion", category: "Infrastructure", priority: "HIGH", details: "Reliance Jio requested an additional 10 TB S3 telemetry object storage.", impact: "Prevent telemetry ingestion drops", actionLabel: "Approve 10 TB Allocation" },
  { id: "pa-2", title: "Review Expiring Customer License", category: "Billing", priority: "MEDIUM", details: "Vodafone Idea 1000-site enterprise tier expires in 5 days.", impact: "Maintain uninterrupted customer monitoring", actionLabel: "Send Renewal Invoice" },
  { id: "pa-3", title: "Inactive Administrator Security Audit", category: "Security", priority: "LOW", details: "2 customer tenant admin accounts have been inactive for over 90 days.", impact: "Comply with SOC2 security standards", actionLabel: "Revoke Inactive Credentials" },
];

export const aiOperationalRecommendations = [
  { title: "Customer Storage Pre-allocation Warning", detail: "Reliance Jio telemetry volume growth indicates storage threshold (>85%) will be reached in 4 days. Pre-provision S3 bucket capacity.", actionLabel: "Expand Storage Bucket" },
  { title: "Redis Cache Hit-Ratio Optimization", detail: "Redis cache hit-ratio dipped to 94.2% during peak 09:00 AM ingestion. Recommend expanding cache key TTL by 15 minutes.", actionLabel: "Tune Cache TTL" },
  { title: "API Gateway Rate-Limit Review", detail: "API Gateway experienced an 8% latency increase due to high webhooks from Cluster-04. Recommend adjusting rate-limiting rules.", actionLabel: "Optimize Gateway Rules" }
];
