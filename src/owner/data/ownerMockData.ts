// ============================================================
// STMS Platform Admin — Mock Data
// ============================================================

export type CustomerStatus = "active" | "trial" | "expired" | "suspended";
export type CustomerPlan = "Enterprise" | "Professional" | "Business" | "Basic" | "Trial";
export type HealthScore = "Healthy" | "Warning" | "Critical" | "Offline";
export type ServiceStatus = "healthy" | "warning" | "down";

// ─── Customers ───────────────────────────────────────────────
export interface Customer {
  id: string;
  name: string;
  logo: string;
  plan: CustomerPlan;
  status: CustomerStatus;
  sites: number;
  healthySites: number;
  offlineSites: number;
  users: number;
  health: HealthScore;
  uptime: number;
  mrr: number;
  arr: number;
  region: string;
  circle: string;
  riskScore: number;
  joinDate: string;
  renewalDate: string;
  devices: number;
  alarms: { critical: number; major: number; minor: number };
  invoiceDue: number;
}

export const customers: Customer[] = [
  {
    id: "cust-001",
    name: "Reliance Jio",
    logo: "RJ",
    plan: "Enterprise",
    status: "active",
    sites: 3842,
    healthySites: 3780,
    offlineSites: 62,
    users: 248,
    health: "Healthy",
    uptime: 99.4,
    mrr: 1200000,
    arr: 14400000,
    region: "West",
    circle: "Mumbai",
    riskScore: 8,
    joinDate: "2022-01-15",
    renewalDate: "2026-01-15",
    devices: 28640,
    alarms: { critical: 3, major: 18, minor: 42 },
    invoiceDue: 0,
  },
  {
    id: "cust-002",
    name: "Vodafone Idea",
    logo: "VI",
    plan: "Enterprise",
    status: "active",
    sites: 2640,
    healthySites: 2510,
    offlineSites: 130,
    users: 184,
    health: "Warning",
    uptime: 97.8,
    mrr: 860000,
    arr: 10320000,
    region: "West",
    circle: "Gujarat",
    riskScore: 34,
    joinDate: "2022-03-20",
    renewalDate: "2026-09-20",
    devices: 19280,
    alarms: { critical: 12, major: 47, minor: 86 },
    invoiceDue: 285000,
  },
  {
    id: "cust-003",
    name: "Bharti Airtel",
    logo: "BA",
    plan: "Enterprise",
    status: "active",
    sites: 4120,
    healthySites: 4090,
    offlineSites: 30,
    users: 312,
    health: "Healthy",
    uptime: 99.7,
    mrr: 1480000,
    arr: 17760000,
    region: "North",
    circle: "Delhi",
    riskScore: 5,
    joinDate: "2021-11-01",
    renewalDate: "2026-11-01",
    devices: 31440,
    alarms: { critical: 1, major: 8, minor: 22 },
    invoiceDue: 0,
  },
  {
    id: "cust-004",
    name: "BSNL",
    logo: "BN",
    plan: "Professional",
    status: "active",
    sites: 1860,
    healthySites: 1640,
    offlineSites: 220,
    users: 96,
    health: "Warning",
    uptime: 95.2,
    mrr: 420000,
    arr: 5040000,
    region: "National",
    circle: "All India",
    riskScore: 58,
    joinDate: "2023-04-01",
    renewalDate: "2025-09-01",
    devices: 12480,
    alarms: { critical: 28, major: 84, minor: 143 },
    invoiceDue: 840000,
  },
  {
    id: "cust-005",
    name: "Tata Teleservices",
    logo: "TT",
    plan: "Professional",
    status: "active",
    sites: 820,
    healthySites: 804,
    offlineSites: 16,
    users: 64,
    health: "Healthy",
    uptime: 99.1,
    mrr: 280000,
    arr: 3360000,
    region: "South",
    circle: "Tamil Nadu",
    riskScore: 12,
    joinDate: "2022-08-15",
    renewalDate: "2026-08-15",
    devices: 6140,
    alarms: { critical: 2, major: 11, minor: 28 },
    invoiceDue: 0,
  },
  {
    id: "cust-006",
    name: "MTS India",
    logo: "MT",
    plan: "Business",
    status: "trial",
    sites: 340,
    healthySites: 298,
    offlineSites: 42,
    users: 28,
    health: "Warning",
    uptime: 93.4,
    mrr: 95000,
    arr: 1140000,
    region: "East",
    circle: "West Bengal",
    riskScore: 72,
    joinDate: "2025-04-01",
    renewalDate: "2025-07-01",
    devices: 2480,
    alarms: { critical: 18, major: 32, minor: 64 },
    invoiceDue: 190000,
  },
  {
    id: "cust-007",
    name: "Quadrant Televentures",
    logo: "QT",
    plan: "Basic",
    status: "active",
    sites: 180,
    healthySites: 174,
    offlineSites: 6,
    users: 18,
    health: "Healthy",
    uptime: 98.4,
    mrr: 48000,
    arr: 576000,
    region: "North",
    circle: "Punjab",
    riskScore: 18,
    joinDate: "2023-12-01",
    renewalDate: "2026-12-01",
    devices: 1240,
    alarms: { critical: 0, major: 4, minor: 12 },
    invoiceDue: 0,
  },
  {
    id: "cust-008",
    name: "Tikona Digital Networks",
    logo: "TN",
    plan: "Business",
    status: "active",
    sites: 460,
    healthySites: 442,
    offlineSites: 18,
    users: 42,
    health: "Healthy",
    uptime: 98.8,
    mrr: 138000,
    arr: 1656000,
    region: "West",
    circle: "Maharashtra",
    riskScore: 22,
    joinDate: "2023-06-15",
    renewalDate: "2026-06-15",
    devices: 3480,
    alarms: { critical: 1, major: 8, minor: 19 },
    invoiceDue: 0,
  },
];

// ─── Vendors ─────────────────────────────────────────────────
export interface Vendor {
  id: string;
  name: string;
  logo: string;
  installedSites: number;
  failureRate: number;
  avgResponseTime: number;
  slaCompliance: number;
  healthScore: number;
  customerRating: number;
  products: string[];
  since: string;
  region: string;
  openTickets: number;
  firmware: string;
  status: "active" | "suspended";
}

export const vendors: Vendor[] = [
  { id: "v-001", name: "Delta Electronics", logo: "DE", installedSites: 4820, failureRate: 0.8, avgResponseTime: 2.4, slaCompliance: 98.6, healthScore: 96, customerRating: 4.7, products: ["SMPS", "Rectifier", "Battery Controller"], since: "2020-01-01", region: "National", openTickets: 12, firmware: "v4.2.1", status: "active" },
  { id: "v-002", name: "Emerson Network Power", logo: "EN", installedSites: 3640, failureRate: 1.2, avgResponseTime: 3.1, slaCompliance: 96.8, healthScore: 88, customerRating: 4.3, products: ["UPS", "SMPS", "Monitoring"], since: "2019-06-01", region: "West", openTickets: 28, firmware: "v3.8.4", status: "active" },
  { id: "v-003", name: "Huawei Technologies", logo: "HW", installedSites: 5280, failureRate: 0.6, avgResponseTime: 1.8, slaCompliance: 99.1, healthScore: 98, customerRating: 4.8, products: ["BTS", "Microwave", "BBU", "RRU"], since: "2018-03-01", region: "National", openTickets: 6, firmware: "v6.1.3", status: "active" },
  { id: "v-004", name: "Ericsson India", logo: "ER", installedSites: 3920, failureRate: 0.9, avgResponseTime: 2.2, slaCompliance: 97.4, healthScore: 93, customerRating: 4.5, products: ["RBS", "Tower", "Fiber"], since: "2019-01-01", region: "National", openTickets: 19, firmware: "v5.4.2", status: "active" },
  { id: "v-005", name: "Nokia Solutions", logo: "NK", installedSites: 2840, failureRate: 1.4, avgResponseTime: 3.8, slaCompliance: 94.2, healthScore: 81, customerRating: 4.0, products: ["BTS", "IP/MPLS", "Antenna"], since: "2021-04-01", region: "South", openTickets: 44, firmware: "v4.9.0", status: "active" },
  { id: "v-006", name: "Vertiv India", logo: "VT", installedSites: 2120, failureRate: 2.1, avgResponseTime: 4.2, slaCompliance: 91.6, healthScore: 74, customerRating: 3.8, products: ["Thermal", "Power", "UPS"], since: "2022-01-01", region: "North", openTickets: 62, firmware: "v2.1.4", status: "active" },
  { id: "v-007", name: "ZTE Corporation", logo: "ZT", installedSites: 1640, failureRate: 1.8, avgResponseTime: 3.4, slaCompliance: 93.8, healthScore: 78, customerRating: 3.9, products: ["RRU", "BBU", "Splitter"], since: "2022-06-01", region: "West", openTickets: 38, firmware: "v3.5.2", status: "active" },
];

// ─── Revenue ─────────────────────────────────────────────────
export const revenueMonthly = [
  { month: "Jan", revenue: 13400000, customers: 112, newCustomers: 4 },
  { month: "Feb", revenue: 14100000, customers: 114, newCustomers: 3 },
  { month: "Mar", revenue: 15200000, customers: 116, newCustomers: 5 },
  { month: "Apr", revenue: 15800000, customers: 118, newCustomers: 4 },
  { month: "May", revenue: 16400000, customers: 120, newCustomers: 3 },
  { month: "Jun", revenue: 17200000, customers: 121, newCustomers: 2 },
  { month: "Jul", revenue: 18200000, customers: 124, newCustomers: 4 },
];

export const subscriptionCounts = {
  Enterprise: 8,
  Professional: 24,
  Business: 42,
  Basic: 31,
  Trial: 12,
  Expired: 7,
  ExpiringSoon: 6,
  RenewalsToday: 2,
};

// ─── Platform Services ────────────────────────────────────────
export interface PlatformService {
  name: string;
  status: ServiceStatus;
  responseTime: number;
  uptime: number;
  lastIncident: string | null;
  version: string;
}

export const platformServices: PlatformService[] = [
  { name: "API Gateway", status: "healthy", responseTime: 42, uptime: 99.98, lastIncident: null, version: "v3.2.1" },
  { name: "Authentication", status: "healthy", responseTime: 18, uptime: 99.99, lastIncident: null, version: "v2.8.4" },
  { name: "PostgreSQL", status: "healthy", responseTime: 8, uptime: 99.97, lastIncident: "2026-06-15", version: "16.2" },
  { name: "Redis Cache", status: "healthy", responseTime: 1, uptime: 100.0, lastIncident: null, version: "7.2.4" },
  { name: "ClickHouse", status: "warning", responseTime: 284, uptime: 99.82, lastIncident: "2026-07-01", version: "24.3.1" },
  { name: "MQTT Broker", status: "healthy", responseTime: 6, uptime: 99.95, lastIncident: null, version: "v5.0.2" },
  { name: "Notification Service", status: "healthy", responseTime: 64, uptime: 99.89, lastIncident: null, version: "v1.9.3" },
  { name: "Scheduler", status: "healthy", responseTime: 22, uptime: 99.94, lastIncident: null, version: "v2.1.0" },
  { name: "Storage", status: "warning", responseTime: 142, uptime: 99.76, lastIncident: "2026-07-02", version: "v4.1.2" },
  { name: "Workers", status: "healthy", responseTime: 38, uptime: 99.91, lastIncident: null, version: "v3.4.1" },
  { name: "Analytics Engine", status: "healthy", responseTime: 186, uptime: 99.84, lastIncident: null, version: "v2.6.0" },
  { name: "IoT Gateway", status: "healthy", responseTime: 12, uptime: 99.96, lastIncident: null, version: "v1.8.4" },
];

// ─── Infrastructure Metrics ───────────────────────────────────
export const infraMetrics = {
  cpu: 48,
  ram: 62,
  disk: 71,
  storage: 85,
  bandwidth: 34,
  queue: 218,
  network: 42,
  dbLoad: 58,
  requestsPerSec: 4821,
  latency: 68,
  errors: 0.12,
};

// ─── AI Insights ─────────────────────────────────────────────
export interface AIInsight {
  id: string;
  severity: "critical" | "warning" | "info" | "positive";
  category: string;
  title: string;
  description: string;
  affectedEntities: string;
  timestamp: string;
  confidence: number;
}

export const aiInsights: AIInsight[] = [
  {
    id: "ai-001",
    severity: "warning",
    category: "Hardware",
    title: "Battery failure rate increasing in North Region",
    description: "Delta battery units in UP & Rajasthan circles showing 3.2x normal failure rate over last 7 days.",
    affectedEntities: "142 sites across BSNL & Airtel",
    timestamp: "2026-07-02T06:00:00Z",
    confidence: 94,
  },
  {
    id: "ai-002",
    severity: "warning",
    category: "Vendor SLA",
    title: "Vendor Delta SLA compliance dropped this week",
    description: "Average SLA compliance dropped from 98.6% to 91.2% over the past 7 days.",
    affectedEntities: "Delta Electronics — 4820 sites",
    timestamp: "2026-07-01T18:30:00Z",
    confidence: 88,
  },
  {
    id: "ai-003",
    severity: "critical",
    category: "Subscriptions",
    title: "42 customer subscriptions expire within 30 days",
    description: "Action required. 6 enterprise + 14 professional subscriptions expiring. Estimated at-risk MRR: ₹28.4L.",
    affectedEntities: "42 customers",
    timestamp: "2026-07-02T00:00:00Z",
    confidence: 100,
  },
  {
    id: "ai-004",
    severity: "positive",
    category: "Revenue",
    title: "Revenue forecast for next month increased by 9%",
    description: "Based on renewal pipeline and new customer trials, July revenue projected at ₹1.98 Cr (+9.2%).",
    affectedEntities: "12 accounts in pipeline",
    timestamp: "2026-07-01T12:00:00Z",
    confidence: 82,
  },
  {
    id: "ai-005",
    severity: "warning",
    category: "Alarms",
    title: "South Circle showing abnormal alarm frequency",
    description: "Karnataka and Andhra circles reporting 4.8x baseline critical alarms. Possible systematic power outages.",
    affectedEntities: "284 sites across Airtel & Tata",
    timestamp: "2026-07-02T04:15:00Z",
    confidence: 91,
  },
  {
    id: "ai-006",
    severity: "warning",
    category: "Infrastructure",
    title: "Storage utilization expected to reach 90% in 18 days",
    description: "Current storage at 85%. At current ingestion rate, critical threshold will be reached in ~18 days.",
    affectedEntities: "ClickHouse cluster — 3.2TB",
    timestamp: "2026-07-02T08:00:00Z",
    confidence: 97,
  },
];

// ─── Activity Feed ────────────────────────────────────────────
export interface ActivityEvent {
  id: string;
  icon: string;
  action: string;
  detail: string;
  actor: string;
  timestamp: string;
  type: "customer" | "vendor" | "billing" | "system" | "security" | "user";
}

export const activityFeed: ActivityEvent[] = [
  { id: "act-001", icon: "👤", action: "New Customer Onboarded", detail: "Reliance Digital Telecom — Enterprise Plan", actor: "Priya Sharma", timestamp: "2026-07-02T11:15:00Z", type: "customer" },
  { id: "act-002", icon: "💰", action: "Invoice Generated", detail: "INV-2026-0842 — Bharti Airtel ₹14,80,000", actor: "System", timestamp: "2026-07-02T10:45:00Z", type: "billing" },
  { id: "act-003", icon: "🔑", action: "API Key Created", detail: "Production key for Tata Teleservices", actor: "Rahul Kumar", timestamp: "2026-07-02T10:20:00Z", type: "system" },
  { id: "act-004", icon: "📦", action: "Firmware Uploaded", detail: "Delta SMPS v4.2.1 — 4820 devices queued", actor: "Vikram Singh", timestamp: "2026-07-02T09:50:00Z", type: "vendor" },
  { id: "act-005", icon: "🔄", action: "Subscription Renewed", detail: "Tikona Digital Networks — Business Plan 12mo", actor: "System", timestamp: "2026-07-02T09:30:00Z", type: "billing" },
  { id: "act-006", icon: "💾", action: "Database Backup Completed", detail: "PostgreSQL full backup — 284GB — 23 min", actor: "Scheduler", timestamp: "2026-07-02T09:00:00Z", type: "system" },
  { id: "act-007", icon: "🏢", action: "Vendor Added", detail: "Powertech Solutions India — 3 products listed", actor: "Amit Patel", timestamp: "2026-07-02T08:30:00Z", type: "vendor" },
  { id: "act-008", icon: "👥", action: "Role Updated", detail: "NOC Analyst permissions modified", actor: "Admin", timestamp: "2026-07-02T08:00:00Z", type: "user" },
  { id: "act-009", icon: "🛡️", action: "Security Alert Resolved", detail: "5 blocked IPs from brute-force attempt", actor: "Security Engine", timestamp: "2026-07-02T07:30:00Z", type: "security" },
  { id: "act-010", icon: "📊", action: "Monthly Report Generated", detail: "June 2026 Executive Report — All Customers", actor: "Priya Sharma", timestamp: "2026-07-02T07:00:00Z", type: "system" },
];

// ─── Platform Notifications ───────────────────────────────────
export interface PlatformNotification {
  id: string;
  type: "error" | "warning" | "info" | "success";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const platformNotifications: PlatformNotification[] = [
  { id: "n-001", type: "error", title: "Database Backup Failed", message: "Scheduled backup at 03:00 failed. Manual intervention required.", timestamp: "2026-07-02T03:15:00Z", read: false },
  { id: "n-002", type: "warning", title: "Customer License Expiring", message: "BSNL license expires in 8 days. Renewal pending.", timestamp: "2026-07-02T08:00:00Z", read: false },
  { id: "n-003", type: "info", title: "Vendor Firmware Available", message: "Huawei BTS firmware v6.2.0 available for deployment.", timestamp: "2026-07-02T09:00:00Z", read: false },
  { id: "n-004", type: "success", title: "Payment Received", message: "₹14,80,000 received from Bharti Airtel — INV-2026-0840.", timestamp: "2026-07-02T10:30:00Z", read: true },
  { id: "n-005", type: "warning", title: "High Storage Utilization", message: "ClickHouse storage at 85%. Consider expansion.", timestamp: "2026-07-02T11:00:00Z", read: false },
  { id: "n-006", type: "error", title: "Security Alert", message: "Multiple failed login attempts detected from 203.88.12.44.", timestamp: "2026-07-02T07:22:00Z", read: true },
];

// ─── Invoices ─────────────────────────────────────────────────
export interface Invoice {
  id: string;
  number: string;
  customer: string;
  plan: CustomerPlan;
  amount: number;
  tax: number;
  total: number;
  status: "paid" | "pending" | "overdue" | "draft";
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
}

export const invoices: Invoice[] = [
  { id: "inv-001", number: "INV-2026-0842", customer: "Reliance Jio", plan: "Enterprise", amount: 1017000, tax: 183000, total: 1200000, status: "paid", issuedDate: "2026-07-01", dueDate: "2026-07-15", paidDate: "2026-07-02" },
  { id: "inv-002", number: "INV-2026-0841", customer: "Bharti Airtel", plan: "Enterprise", amount: 1254000, tax: 226000, total: 1480000, status: "paid", issuedDate: "2026-07-01", dueDate: "2026-07-15", paidDate: "2026-07-02" },
  { id: "inv-003", number: "INV-2026-0840", customer: "Vodafone Idea", plan: "Enterprise", amount: 728000, tax: 132000, total: 860000, status: "pending", issuedDate: "2026-07-01", dueDate: "2026-07-15" },
  { id: "inv-004", number: "INV-2026-0839", customer: "BSNL", plan: "Professional", amount: 356000, tax: 64000, total: 420000, status: "overdue", issuedDate: "2026-06-01", dueDate: "2026-06-15" },
  { id: "inv-005", number: "INV-2026-0838", customer: "Tata Teleservices", plan: "Professional", amount: 237000, tax: 43000, total: 280000, status: "paid", issuedDate: "2026-07-01", dueDate: "2026-07-15", paidDate: "2026-07-01" },
  { id: "inv-006", number: "INV-2026-0837", customer: "Tikona Digital Networks", plan: "Business", amount: 117000, tax: 21000, total: 138000, status: "paid", issuedDate: "2026-07-01", dueDate: "2026-07-15", paidDate: "2026-07-02" },
  { id: "inv-007", number: "INV-2026-0836", customer: "MTS India", plan: "Business", amount: 81000, tax: 14000, total: 95000, status: "overdue", issuedDate: "2026-06-01", dueDate: "2026-06-15" },
  { id: "inv-008", number: "INV-2026-0835", customer: "Quadrant Televentures", plan: "Basic", amount: 41000, tax: 7000, total: 48000, status: "pending", issuedDate: "2026-07-01", dueDate: "2026-07-15" },
];

// ─── Platform Admins ──────────────────────────────────────────
export interface PlatformAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  lastLogin: string;
  mfaEnabled: boolean;
  permissions: string[];
}

export const platformAdmins: PlatformAdmin[] = [
  { id: "adm-001", name: "Arjun Mehta", email: "arjun@indionetworks.com", role: "Super Admin", department: "Platform Engineering", status: "active", lastLogin: "2026-07-02T11:30:00Z", mfaEnabled: true, permissions: ["*"] },
  { id: "adm-002", name: "Priya Sharma", email: "priya@indionetworks.com", role: "Operations Admin", department: "Operations", status: "active", lastLogin: "2026-07-02T10:15:00Z", mfaEnabled: true, permissions: ["customers:*", "vendors:*", "reports:*"] },
  { id: "adm-003", name: "Rahul Kumar", email: "rahul@indionetworks.com", role: "Billing Admin", department: "Finance", status: "active", lastLogin: "2026-07-02T09:00:00Z", mfaEnabled: true, permissions: ["billing:*", "invoices:*", "reports:read"] },
  { id: "adm-004", name: "Vikram Singh", email: "vikram@indionetworks.com", role: "Technical Admin", department: "Engineering", status: "active", lastLogin: "2026-07-01T18:00:00Z", mfaEnabled: true, permissions: ["vendors:*", "system:*", "platform:read"] },
  { id: "adm-005", name: "Anjali Nair", email: "anjali@indionetworks.com", role: "Support Admin", department: "Customer Success", status: "active", lastLogin: "2026-07-02T08:45:00Z", mfaEnabled: false, permissions: ["customers:read", "alarms:read", "reports:read"] },
];

// ─── Alarm Analytics ─────────────────────────────────────────
export const alarmStats = {
  critical: 63,
  major: 210,
  minor: 414,
  resolved: 1842,
  avgResolutionTime: 47,
  topCategories: [
    { name: "Power Failure", count: 184, pct: 28 },
    { name: "Battery Low", count: 142, pct: 22 },
    { name: "Temperature High", count: 98, pct: 15 },
    { name: "Mains Fail", count: 88, pct: 14 },
    { name: "Door Open", count: 64, pct: 10 },
    { name: "Smoke Detected", count: 42, pct: 6 },
    { name: "Communication Lost", count: 32, pct: 5 },
  ],
  byRegion: [
    { region: "North", critical: 22, major: 68, minor: 124 },
    { region: "South", critical: 18, major: 74, minor: 148 },
    { region: "East", critical: 8, major: 32, minor: 68 },
    { region: "West", critical: 12, major: 26, minor: 52 },
    { region: "Central", critical: 3, major: 10, minor: 22 },
  ],
};

// ─── Device Analytics ────────────────────────────────────────
export const deviceStats = {
  total: 61220,
  online: 58840,
  offline: 1840,
  inactive: 540,
  warrantyExpiring: 2840,
  byType: [
    { type: "SMPS", count: 18640, pct: 30 },
    { type: "Battery", count: 14280, pct: 23 },
    { type: "Generator", count: 12480, pct: 20 },
    { type: "DG Set", count: 8420, pct: 14 },
    { type: "Energy Meter", count: 4820, pct: 8 },
    { type: "Other", count: 2580, pct: 4 },
  ],
  firmwareVersions: [
    { version: "v4.2.1 (Latest)", count: 32840, pct: 54 },
    { version: "v4.1.x", count: 18420, pct: 30 },
    { version: "v3.x.x", count: 7640, pct: 12 },
    { version: "< v3.0", count: 2320, pct: 4 },
  ],
};

// ─── KPI Summary ─────────────────────────────────────────────
export const platformKPIs = {
  totalCustomers: 124,
  activeCustomers: 108,
  trialCustomers: 12,
  expiredCustomers: 4,
  totalSites: 8462,
  healthySites: 8118,
  offlineSites: 344,
  totalDevices: 61220,
  platformUsers: 1284,
  vendors: 18,
  monthlyRevenue: 18200000,
  dailyApiRequests: 4821840,
  platformAvailability: 98.9,
};

// ─── Quick Actions ────────────────────────────────────────────
export const quickActions = [
  { id: "qa-001", label: "New Customer", icon: "UserPlus", shortcut: "C" },
  { id: "qa-002", label: "New Vendor", icon: "Building2", shortcut: "V" },
  { id: "qa-003", label: "Generate Report", icon: "FileText", shortcut: "R" },
  { id: "qa-004", label: "Create Invoice", icon: "Receipt", shortcut: "I" },
  { id: "qa-005", label: "Invite Admin", icon: "UserCheck", shortcut: "A" },
  { id: "qa-006", label: "Upload Firmware", icon: "Upload", shortcut: "F" },
  { id: "qa-007", label: "Add API Key", icon: "Key", shortcut: "K" },
];
