// ─── Operational Mock Data for Super Admin Console ────────────────────────────
// All modules share this data file for consistency

// ── CUSTOMERS ──────────────────────────────────────────────────────────────────
export const customers = [
  { id: "CUST-001", name: "Reliance Jio Infocomm", shortName: "Jio", logo: "RJ", region: "Pan India", totalSites: 4200, onlineSites: 4156, offlineSites: 44, criticalSites: 12, alarms: 28, tickets: 14, slaRequired: 99.5, slaActual: 99.8, status: "Active", health: "Healthy", lastSync: "1m ago" },
  { id: "CUST-002", name: "Bharti Airtel Ltd", shortName: "Airtel", logo: "BA", region: "Pan India", totalSites: 3800, onlineSites: 3710, offlineSites: 90, criticalSites: 45, alarms: 112, tickets: 32, slaRequired: 99.0, slaActual: 98.4, status: "Active", health: "Warning", lastSync: "2m ago" },
  { id: "CUST-003", name: "Vodafone Idea (Vi)", shortName: "Vi", logo: "VI", region: "Pan India", totalSites: 2100, onlineSites: 1998, offlineSites: 102, criticalSites: 52, alarms: 184, tickets: 45, slaRequired: 99.0, slaActual: 97.2, status: "Active", health: "Critical", lastSync: "3m ago" },
  { id: "CUST-004", name: "BSNL", shortName: "BSNL", logo: "BS", region: "Pan India", totalSites: 1500, onlineSites: 1464, offlineSites: 36, criticalSites: 18, alarms: 42, tickets: 12, slaRequired: 99.0, slaActual: 99.1, status: "Active", health: "Healthy", lastSync: "2m ago" },
  { id: "CUST-005", name: "Indus Towers Ltd", shortName: "Indus", logo: "IT", region: "Pan India", totalSites: 850, onlineSites: 834, offlineSites: 16, criticalSites: 8, alarms: 18, tickets: 8, slaRequired: 99.5, slaActual: 99.5, status: "Active", health: "Healthy", lastSync: "1m ago" },
  { id: "CUST-006", name: "ATC Telecom India", shortName: "ATC", logo: "AT", region: "South India", totalSites: 620, onlineSites: 608, offlineSites: 12, criticalSites: 5, alarms: 10, tickets: 4, slaRequired: 99.0, slaActual: 99.3, status: "Active", health: "Healthy", lastSync: "4m ago" },
  { id: "CUST-007", name: "MTNL Mumbai", shortName: "MTNL", logo: "MT", region: "West India", totalSites: 280, onlineSites: 245, offlineSites: 35, criticalSites: 22, alarms: 55, tickets: 18, slaRequired: 98.5, slaActual: 96.8, status: "Active", health: "Critical", lastSync: "5m ago" },
  { id: "CUST-008", name: "TATA Tele Services", shortName: "TATA", logo: "TT", region: "Pan India", totalSites: 450, onlineSites: 441, offlineSites: 9, criticalSites: 3, alarms: 6, tickets: 2, slaRequired: 99.0, slaActual: 99.6, status: "Active", health: "Healthy", lastSync: "2m ago" },
];

// ── SITES ──────────────────────────────────────────────────────────────────────
export const sites = [
  { id: "S-10420", name: "Bandra Kurla Complex-01", customer: "Jio", customerId: "CUST-001", region: "West", state: "Maharashtra", status: "Online", powerSource: "Mains", gatewayStatus: "Online", gatewayId: "GW-42101", lastAlarm: "Door Open", alarmSeverity: "Minor", lastComm: "1m ago", health: 98 },
  { id: "S-20551", name: "Connaught Place-04", customer: "Airtel", customerId: "CUST-002", region: "North", state: "Delhi", status: "Offline", powerSource: "Unknown", gatewayStatus: "Offline", gatewayId: "GW-20551", lastAlarm: "Comm. Loss", alarmSeverity: "Critical", lastComm: "45m ago", health: 0 },
  { id: "S-30122", name: "Salt Lake Sector-V", customer: "Vi", customerId: "CUST-003", region: "East", state: "West Bengal", status: "Online", powerSource: "Battery", gatewayStatus: "Online", gatewayId: "GW-30122", lastAlarm: "DG Failure", alarmSeverity: "Critical", lastComm: "1m ago", health: 34 },
  { id: "S-40993", name: "Electronic City Phase-2", customer: "BSNL", customerId: "CUST-004", region: "South", state: "Karnataka", status: "Online", powerSource: "Mains", gatewayStatus: "Online", gatewayId: "GW-40993", lastAlarm: "Temp High", alarmSeverity: "Warning", lastComm: "3m ago", health: 82 },
  { id: "S-50211", name: "Hitech City Tower-06", customer: "Indus", customerId: "CUST-005", region: "South", state: "Telangana", status: "Online", powerSource: "Mains", gatewayStatus: "Online", gatewayId: "GW-50211", lastAlarm: "None", alarmSeverity: "None", lastComm: "2m ago", health: 99 },
  { id: "S-60145", name: "Nariman Point-02", customer: "ATC", customerId: "CUST-006", region: "West", state: "Maharashtra", status: "Online", powerSource: "DG", gatewayStatus: "Online", gatewayId: "GW-60145", lastAlarm: "Mains Fail", alarmSeverity: "Major", lastComm: "2m ago", health: 65 },
  { id: "S-70384", name: "Andheri East-08", customer: "Airtel", customerId: "CUST-002", region: "West", state: "Maharashtra", status: "Online", powerSource: "Battery", gatewayStatus: "Online", gatewayId: "GW-70384", lastAlarm: "Battery Low", alarmSeverity: "Major", lastComm: "5m ago", health: 48 },
  { id: "S-80556", name: "Dwarka Sector-22", customer: "Jio", customerId: "CUST-001", region: "North", state: "Delhi", status: "Online", powerSource: "Mains", gatewayStatus: "Online", gatewayId: "GW-80556", lastAlarm: "None", alarmSeverity: "None", lastComm: "1m ago", health: 100 },
];

// ── ALARMS ─────────────────────────────────────────────────────────────────────
export const liveAlarms = [
  { id: "ALM-8821", site: "Connaught Place-04", siteId: "S-20551", customer: "Airtel", region: "North", type: "Communication Loss", severity: "Critical", startTime: "45 mins ago", duration: "45m", gwStatus: "Offline", ack: false },
  { id: "ALM-8822", site: "Salt Lake Sector-V", siteId: "S-30122", customer: "Vi", region: "East", type: "DG Failure", severity: "Critical", startTime: "1h 12m ago", duration: "72m", gwStatus: "Online", ack: false },
  { id: "ALM-8823", site: "Nariman Point-02", siteId: "S-60145", customer: "ATC", region: "West", type: "Mains Failure", severity: "Major", startTime: "2h 05m ago", duration: "125m", gwStatus: "Online", ack: false },
  { id: "ALM-8824", site: "Andheri East-08", siteId: "S-70384", customer: "Airtel", region: "West", type: "Battery Low (15%)", severity: "Major", startTime: "20m ago", duration: "20m", gwStatus: "Online", ack: false },
  { id: "ALM-8825", site: "Electronic City Phase-2", siteId: "S-40993", customer: "BSNL", region: "South", type: "Temperature High (52°C)", severity: "Warning", startTime: "35m ago", duration: "35m", gwStatus: "Online", ack: true },
  { id: "ALM-8826", site: "Bandra Kurla Complex-01", siteId: "S-10420", customer: "Jio", region: "West", type: "Door Open", severity: "Minor", startTime: "12m ago", duration: "12m", gwStatus: "Online", ack: false },
  { id: "ALM-8827", site: "Linking Road BKC-03", siteId: "S-11240", customer: "Jio", region: "West", type: "SMPS Fault", severity: "Major", startTime: "3h ago", duration: "180m", gwStatus: "Online", ack: false },
  { id: "ALM-8828", site: "Rohini Sector-15", siteId: "S-21884", customer: "Airtel", region: "North", type: "Communication Loss", severity: "Critical", startTime: "2h ago", duration: "120m", gwStatus: "Offline", ack: false },
];

// ── GATEWAYS ───────────────────────────────────────────────────────────────────
export const gateways = [
  { id: "GW-42101", siteId: "S-10420", siteName: "Bandra Kurla Complex-01", customer: "Jio", region: "West", mqttStatus: "Connected", lastHeartbeat: "12s ago", firmware: "v2.4.1", configVersion: "CP-2024-08", packetLoss: 0, latency: 28, status: "Online" },
  { id: "GW-20551", siteId: "S-20551", siteName: "Connaught Place-04", customer: "Airtel", region: "North", mqttStatus: "Disconnected", lastHeartbeat: "45m ago", firmware: "v2.3.8", configVersion: "CP-2024-07", packetLoss: 100, latency: 0, status: "Offline" },
  { id: "GW-30122", siteId: "S-30122", siteName: "Salt Lake Sector-V", customer: "Vi", region: "East", mqttStatus: "Connected", lastHeartbeat: "8s ago", firmware: "v2.4.1", configVersion: "CP-2024-08", packetLoss: 2, latency: 42, status: "Online" },
  { id: "GW-40993", siteId: "S-40993", siteName: "Electronic City Phase-2", customer: "BSNL", region: "South", mqttStatus: "Connected", lastHeartbeat: "15s ago", firmware: "v2.4.0", configVersion: "CP-2024-08", packetLoss: 0, latency: 35, status: "Online" },
  { id: "GW-50211", siteId: "S-50211", siteName: "Hitech City Tower-06", customer: "Indus", region: "South", mqttStatus: "Connected", lastHeartbeat: "5s ago", firmware: "v2.4.1", configVersion: "CP-2024-08", packetLoss: 0, latency: 22, status: "Online" },
  { id: "GW-60145", siteId: "S-60145", siteName: "Nariman Point-02", customer: "ATC", region: "West", mqttStatus: "Connected", lastHeartbeat: "10s ago", firmware: "v2.3.8", configVersion: "CP-2024-07", packetLoss: 5, latency: 88, status: "Degraded" },
  { id: "GW-70384", siteId: "S-70384", siteName: "Andheri East-08", customer: "Airtel", region: "West", mqttStatus: "Connected", lastHeartbeat: "6s ago", firmware: "v2.4.1", configVersion: "CP-2024-08", packetLoss: 0, latency: 31, status: "Online" },
];

// ── TICKETS ─────────────────────────────────────────────────────────────────────
export const tickets = [
  { id: "TKT-4421", title: "Communication Loss – 45 mins", customer: "Airtel", site: "Connaught Place-04", priority: "Critical", status: "Open", vendor: "Delta Electronics", slaLeft: "2h 15m", created: "45m ago", assignedTo: "NOC L2" },
  { id: "TKT-4422", title: "DG Failure – Engine Won't Start", customer: "Vi", site: "Salt Lake Sector-V", priority: "Critical", status: "In Progress", vendor: "Sigma Services", slaLeft: "48m", created: "1h 12m ago", assignedTo: "Rahul Sharma" },
  { id: "TKT-4423", title: "Battery Backup Failure", customer: "Airtel", site: "Andheri East-08", priority: "High", status: "Open", vendor: "Unassigned", slaLeft: "3h 40m", created: "20m ago", assignedTo: "Unassigned" },
  { id: "TKT-4424", title: "Temperature Sensor Reading 52°C", customer: "BSNL", site: "Electronic City Phase-2", priority: "Medium", status: "Acknowledged", vendor: "Alpha Infra", slaLeft: "5h 25m", created: "35m ago", assignedTo: "NOC L1" },
  { id: "TKT-4425", title: "SMPS Fault – Rectifier Module 2", customer: "Jio", site: "Linking Road BKC-03", priority: "High", status: "In Progress", vendor: "Delta Electronics", slaLeft: "1h 20m", created: "3h ago", assignedTo: "Vikas Kumar" },
];

// ── VENDORS ─────────────────────────────────────────────────────────────────────
export const vendors = [
  { id: "VND-01", name: "Delta Electronics", regions: ["West", "North"], openJobs: 28, completedToday: 14, slaCompliance: 96.2, avgResponse: 38, status: "Active" },
  { id: "VND-02", name: "Sigma Services", regions: ["East", "North-East"], openJobs: 15, completedToday: 9, slaCompliance: 94.8, avgResponse: 52, status: "Active" },
  { id: "VND-03", name: "Alpha Infra", regions: ["South"], openJobs: 22, completedToday: 11, slaCompliance: 98.1, avgResponse: 28, status: "Active" },
  { id: "VND-04", name: "Omega Field Services", regions: ["Central", "North"], openJobs: 8, completedToday: 6, slaCompliance: 88.4, avgResponse: 72, status: "Active" },
  { id: "VND-05", name: "Apex Telecom Services", regions: ["West"], openJobs: 12, completedToday: 7, slaCompliance: 91.2, avgResponse: 61, status: "Warning" },
];

// ── CHART DATA ──────────────────────────────────────────────────────────────────
export const availabilityTrend = [
  { time: "00:00", online: 12350, offline: 100 },
  { time: "02:00", online: 12340, offline: 110 },
  { time: "04:00", online: 12300, offline: 150 },
  { time: "06:00", online: 12250, offline: 200 },
  { time: "08:00", online: 12200, offline: 250 },
  { time: "10:00", online: 12100, offline: 350 },
  { time: "12:00", online: 12050, offline: 400 },
  { time: "14:00", online: 12080, offline: 370 },
  { time: "16:00", online: 12100, offline: 350 },
  { time: "18:00", online: 12150, offline: 300 },
  { time: "20:00", online: 12200, offline: 250 },
  { time: "22:00", online: 12250, offline: 200 },
];

export const alarmTrend7d = [
  { day: "Mon", critical: 12, major: 28, minor: 45, warning: 62 },
  { day: "Tue", critical: 18, major: 32, minor: 38, warning: 54 },
  { day: "Wed", critical: 8, major: 22, minor: 52, warning: 71 },
  { day: "Thu", critical: 24, major: 40, minor: 33, warning: 48 },
  { day: "Fri", critical: 15, major: 30, minor: 41, warning: 59 },
  { day: "Sat", critical: 6, major: 18, minor: 28, warning: 40 },
  { day: "Sun", critical: 4, major: 12, minor: 22, warning: 35 },
];

export const alarmCategories = [
  { name: "Power Fail", count: 184, color: "#F59E0B" },
  { name: "Comm. Loss", count: 142, color: "#EF4444" },
  { name: "Hardware Fault", count: 86, color: "#8B5CF6" },
  { name: "Environment", count: 54, color: "#10B981" },
  { name: "Security", count: 28, color: "#3B82F6" },
];

export const powerDistribution = [
  { name: "Mains", value: 9840, color: "#10B981" },
  { name: "DG", value: 1420, color: "#F59E0B" },
  { name: "Battery", value: 840, color: "#6366F1" },
  { name: "Solar", value: 350, color: "#06B6D4" },
];

export const slaComplianceTrend = [
  { month: "Feb", jio: 99.8, airtel: 98.9, vi: 97.8, bsnl: 99.2 },
  { month: "Mar", jio: 99.7, airtel: 98.5, vi: 97.1, bsnl: 99.0 },
  { month: "Apr", jio: 99.9, airtel: 98.7, vi: 97.4, bsnl: 99.1 },
  { month: "May", jio: 99.8, airtel: 98.6, vi: 97.2, bsnl: 99.3 },
  { month: "Jun", jio: 99.8, airtel: 98.4, vi: 97.2, bsnl: 99.1 },
];

// ── ACTIVITY FEED ────────────────────────────────────────────────────────────────
export const activityFeed = [
  { id: 1, type: "config", event: "Firmware v2.4.1 pushed to 450 gateways – 98% success", time: "10m ago", actor: "Admin" },
  { id: 2, type: "alarm", event: "Critical alarm acknowledged – S-20551 (Connaught Place)", time: "15m ago", actor: "NOC L1" },
  { id: 3, type: "ticket", event: "TKT-4422 assigned to Sigma Services – Rahul Sharma", time: "32m ago", actor: "NOC L2" },
  { id: 4, type: "site", event: "New site S-90201 onboarded for Indus Towers", time: "1h ago", actor: "System" },
  { id: 5, type: "vendor", event: "Delta Electronics SLA warning – 4 breaches this week", time: "2h ago", actor: "System" },
  { id: 6, type: "config", event: "Config Profile CP-2024-08 pushed to 280 Vi sites", time: "3h ago", actor: "Admin" },
];

// ── CONFIG PUSH HISTORY ─────────────────────────────────────────────────────────
export const configPushHistory = [
  { id: "PUSH-1021", profile: "CP-2024-08", targetSites: 450, successful: 441, failed: 9, pushedBy: "Admin", status: "Completed", started: "10m ago", duration: "4m 22s" },
  { id: "PUSH-1020", profile: "CP-2024-07", targetSites: 280, successful: 280, failed: 0, pushedBy: "Admin", status: "Completed", started: "3h ago", duration: "2m 18s" },
  { id: "PUSH-1019", profile: "EMERGENCY-01", targetSites: 50, successful: 48, failed: 2, pushedBy: "NOC L3", status: "Completed", started: "Yesterday", duration: "1m 05s" },
];

// ── USERS ─────────────────────────────────────────────────────────────────────
export const adminUsers = [
  { id: "USR-001", name: "Arjun Mehta", email: "arjun@stms.io", role: "Super Admin", lastLogin: "Just now", status: "Active" },
  { id: "USR-002", name: "Priya Nair", email: "priya@stms.io", role: "NOC L2", lastLogin: "20m ago", status: "Active" },
  { id: "USR-003", name: "Ravi Kumar", email: "ravi@stms.io", role: "NOC L1", lastLogin: "1h ago", status: "Active" },
  { id: "USR-004", name: "Anita Desai", email: "anita@stms.io", role: "Read Only", lastLogin: "2 days ago", status: "Inactive" },
];
