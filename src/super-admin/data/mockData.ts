// Super Admin Mock Data for Enterprise Administrative Console

export const platformHealthServices = [
  { id: "svc-1", name: "Authentication", status: "healthy", uptime: 99.99, responseTime: 18, version: "v2.1.4" },
  { id: "svc-2", name: "API Gateway", status: "healthy", uptime: 99.98, responseTime: 42, version: "v3.0.1" },
  { id: "svc-3", name: "PostgreSQL", status: "healthy", uptime: 100.0, responseTime: 8, version: "16.2" },
  { id: "svc-4", name: "Redis", status: "healthy", uptime: 100.0, responseTime: 2, version: "7.2.4" },
  { id: "svc-5", name: "ClickHouse", status: "warning", uptime: 99.95, responseTime: 145, version: "24.3.1" },
  { id: "svc-6", name: "MQTT Broker", status: "healthy", uptime: 99.97, responseTime: 22, version: "v5.0.0" },
  { id: "svc-7", name: "Notification Service", status: "healthy", uptime: 99.99, responseTime: 35, version: "v1.4.2" },
  { id: "svc-8", name: "Scheduler", status: "healthy", uptime: 100.0, responseTime: 12, version: "v2.0.0" },
  { id: "svc-9", name: "Analytics Engine", status: "healthy", uptime: 99.96, responseTime: 85, version: "v1.8.5" },
  { id: "svc-10", name: "Storage Service", status: "healthy", uptime: 100.0, responseTime: 45, version: "v2.2.0" },
  { id: "svc-11", name: "IoT Gateway", status: "warning", uptime: 99.92, responseTime: 120, version: "v4.1.0" },
];

export const kpiStats = {
  customers: { value: 142, trend: "+4", trendType: "positive" },
  platformUsers: { value: 28, trend: "+2", trendType: "positive" },
  devices: { value: 64285, trend: "+1250", trendType: "positive" },
  platformServices: { value: 11, trend: "100%", trendType: "neutral" },
  pendingApprovals: { value: 8, trend: "+3", trendType: "warning" },
  openTickets: { value: 24, trend: "-5", trendType: "positive" },
  expiredLicenses: { value: 2, trend: "+2", trendType: "negative" },
  failedBackups: { value: 0, trend: "0", trendType: "neutral" }
};

export const pendingTasks = [
  { id: "pt-1", type: "Customer Approval", target: "Tata Communications", requestedBy: "Raj Sharma", time: "2 hours ago" },
  { id: "pt-2", type: "License Renewal", target: "Vodafone Idea (Enterprise)", requestedBy: "System", time: "4 hours ago" },
  { id: "pt-3", type: "Vendor Registration", target: "Huawei Networks", requestedBy: "Admin", time: "1 day ago" },
  { id: "pt-4", type: "Firmware Pending", target: "Delta SMPS v2.4 (Critical)", requestedBy: "Vendor", time: "1 day ago" },
  { id: "pt-5", type: "Role Assignment", target: "Amit Kumar -> Billing Admin", requestedBy: "Super Admin", time: "2 days ago" },
];

export const securityMetrics = {
  failedLogins: 142,
  blockedIps: 18,
  mfaEnabled: "98.5%",
  activeSessions: 425,
  expiredTokens: 1240,
  passwordExpiry: 12
};

export const auditLogs = [
  { id: "aud-1", actor: "Arjun Mehta (Super Admin)", action: "Created API Key", resource: "Analytics Integration", ip: "103.11.22.33", time: "10 mins ago" },
  { id: "aud-2", actor: "System", action: "Database Backup", resource: "PostgreSQL Primary", ip: "10.0.1.5", time: "45 mins ago" },
  { id: "aud-3", actor: "Priya Patel (Admin)", action: "Updated Permissions", resource: "Billing Role", ip: "115.112.44.55", time: "2 hours ago" },
  { id: "aud-4", actor: "Raj Sharma (Admin)", action: "Customer Provisioned", resource: "BSNL Enterprise", ip: "103.11.22.44", time: "3 hours ago" },
  { id: "aud-5", actor: "System Guard", action: "IP Blocked", resource: "Failed Logins (5+)", ip: "45.22.11.99", time: "5 hours ago" },
];

export const resourceCharts = {
  cpu: [
    { time: "00:00", value: 45 }, { time: "04:00", value: 38 },
    { time: "08:00", value: 65 }, { time: "12:00", value: 72 },
    { time: "16:00", value: 68 }, { time: "20:00", value: 55 },
  ],
  ram: [
    { time: "00:00", value: 60 }, { time: "04:00", value: 58 },
    { time: "08:00", value: 62 }, { time: "12:00", value: 75 },
    { time: "16:00", value: 78 }, { time: "20:00", value: 70 },
  ],
  apiTraffic: [
    { time: "00:00", value: 1200 }, { time: "04:00", value: 800 },
    { time: "08:00", value: 3500 }, { time: "12:00", value: 5200 },
    { time: "16:00", value: 4800 }, { time: "20:00", value: 2800 },
  ]
};

export const superAdminCustomers = [
  { id: "c-001", name: "Reliance Jio", orgId: "org-001", plan: "Enterprise Unlimited", sites: 4250, status: "Active", provisioned: "2023-01-15", mrr: "$12,500" },
  { id: "c-002", name: "Bharti Airtel", orgId: "org-002", plan: "Enterprise Pro", sites: 3820, status: "Active", provisioned: "2023-02-10", mrr: "$11,200" },
  { id: "c-003", name: "Vodafone Idea", orgId: "org-003", plan: "Enterprise Pro", sites: 2150, status: "Active", provisioned: "2023-04-22", mrr: "$8,600" },
  { id: "c-004", name: "BSNL", orgId: "org-004", plan: "Government Standard", sites: 5840, status: "Active", provisioned: "2024-01-05", mrr: "$14,000" },
  { id: "c-005", name: "Tata Teleservices", orgId: "org-005", plan: "Enterprise Plus", sites: 1120, status: "Suspended", provisioned: "2023-06-18", mrr: "$0" },
  { id: "c-006", name: "MTS India", orgId: "org-006", plan: "Trial", sites: 45, status: "Active", provisioned: "2026-06-01", mrr: "$0" },
];

export const superAdminOrganizations = [
  { id: "org-001", name: "Jio Platforms Ltd", type: "Telecom Operator", region: "India", billingEmail: "billing@jio.com", customers: 1, status: "Active" },
  { id: "org-002", name: "Bharti Enterprises", type: "Telecom Operator", region: "India", billingEmail: "finance@airtel.com", customers: 2, status: "Active" },
  { id: "org-003", name: "Aditya Birla Group", type: "Telecom Operator", region: "India", billingEmail: "accounts@vodafoneidea.com", customers: 1, status: "Active" },
  { id: "org-004", name: "Government of India", type: "Public Sector", region: "India", billingEmail: "telecom.finance@gov.in", customers: 3, status: "Active" },
];

export const superAdminPlans = [
  { id: "plan-1", name: "Trial", maxSites: 50, price: "$0/mo", features: "Basic Monitoring, 7-day retention", status: "Active" },
  { id: "plan-2", name: "Professional", maxSites: 500, price: "$999/mo", features: "Advanced Monitoring, 30-day retention, Email Alerts", status: "Active" },
  { id: "plan-3", name: "Enterprise Pro", maxSites: 5000, price: "$4,999/mo", features: "Full Analytics, 1-year retention, SMS/Email Alerts, API Access", status: "Active" },
  { id: "plan-4", name: "Enterprise Unlimited", maxSites: "Unlimited", price: "Custom", features: "All Features, Custom Integration, Dedicated Support", status: "Active" },
  { id: "plan-5", name: "Government Standard", maxSites: 10000, price: "Custom", features: "Compliance Reporting, 5-year retention, Audit Logs", status: "Active" },
];

export const superAdminLicenses = [
  { id: "lic-001", key: "STMS-ENT-1X49-QW82", org: "Jio Platforms Ltd", plan: "Enterprise Unlimited", issued: "2026-01-01", expiry: "2027-01-01", status: "Valid" },
  { id: "lic-002", key: "STMS-PRO-8H22-MN55", org: "Bharti Enterprises", plan: "Enterprise Pro", issued: "2026-03-15", expiry: "2027-03-15", status: "Valid" },
  { id: "lic-003", key: "STMS-TRIAL-0091-ZZ22", org: "MTS India", plan: "Trial", issued: "2026-06-01", expiry: "2026-07-01", status: "Expiring Soon" },
  { id: "lic-004", key: "STMS-ENT-5521-YY99", org: "Tata Teleservices", plan: "Enterprise Plus", issued: "2025-01-01", expiry: "2026-01-01", status: "Expired" },
];

export const superAdminPlatformUsers = [
  { id: "u-001", name: "Arjun Mehta", email: "arjun@indionetworks.com", role: "Super Admin", status: "Active", mfa: true, lastLogin: "10 mins ago" },
  { id: "u-002", name: "Priya Patel", email: "priya@indionetworks.com", role: "Admin", status: "Active", mfa: true, lastLogin: "2 hours ago" },
  { id: "u-003", name: "Rohan Gupta", email: "rohan@indionetworks.com", role: "Billing Admin", status: "Active", mfa: true, lastLogin: "1 day ago" },
  { id: "u-004", name: "Sneha Desai", email: "sneha@indionetworks.com", role: "Support L2", status: "Active", mfa: false, lastLogin: "4 hours ago" },
  { id: "u-005", name: "Amit Kumar", email: "amit@indionetworks.com", role: "Read Only", status: "Locked", mfa: true, lastLogin: "5 days ago" },
];

export const superAdminRoles = [
  { id: "role-1", name: "Super Admin", type: "System", users: 2, permissions: "All (Full Access)" },
  { id: "role-2", name: "Admin", type: "System", users: 5, permissions: "Manage Tenants, Manage Users, View Settings" },
  { id: "role-3", name: "Billing Admin", type: "System", users: 3, permissions: "Manage Invoices, Plans, Payments" },
  { id: "role-4", name: "Support L2", type: "Custom", users: 12, permissions: "View Customers, View Audits, Reset Passwords" },
  { id: "role-5", name: "Read Only", type: "System", users: 8, permissions: "View Only" },
];

export const superAdminPermissions = [
  { id: "perm-1", module: "Tenant Management", action: "Create Customer", description: "Allow provisioning new customer tenants" },
  { id: "perm-2", module: "Tenant Management", action: "Delete Customer", description: "Allow permanent deletion of customer tenants" },
  { id: "perm-3", module: "User Management", action: "Reset Password", description: "Allow forcing password reset for any user" },
  { id: "perm-4", module: "Billing", action: "Issue Credit", description: "Allow issuing credits to customer accounts" },
  { id: "perm-5", module: "Infrastructure", action: "Restart Services", description: "Allow restarting core STMS microservices" },
  { id: "perm-6", module: "Security", action: "Manage API Keys", description: "Allow generation and revocation of global API keys" },
];
