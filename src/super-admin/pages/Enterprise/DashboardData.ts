import { 
  Building2, Server, Activity, Users, AlertTriangle, Zap,
  Radio, Clock, Database, CheckCircle2, XCircle, ShieldAlert,
  ArrowUpRight, ArrowDownRight, Settings, Wrench, HardDrive, Share2
} from "lucide-react";

export const kpiStats = {
  totalCustomers: { value: 142, trend: "+4", isUp: true },
  activeCustomers: { value: 138, trend: "+2", isUp: true },
  totalSites: { value: 12450, trend: "+124", isUp: true },
  onlineSites: { value: 12100, trend: "+102", isUp: true },
  offlineSites: { value: 350, trend: "-12", isUp: false },
  activeAlarms: { value: 482, trend: "+45", isUp: true },
  openTickets: { value: 128, trend: "-5", isUp: false },
  onlineGateways: { value: 12150, trend: "+110", isUp: true },
};

export const customerHealth = [
  { id: "CUST-001", name: "Reliance Jio", totalSites: 4200, healthySites: 4120, criticalSites: 12, availability: 99.8, openTickets: 14, slaStatus: "Healthy" },
  { id: "CUST-002", name: "Bharti Airtel", totalSites: 3800, healthySites: 3650, criticalSites: 45, availability: 98.4, openTickets: 32, slaStatus: "Warning" },
  { id: "CUST-003", name: "Vodafone Idea", totalSites: 2100, healthySites: 1980, criticalSites: 52, availability: 97.2, openTickets: 45, slaStatus: "Critical" },
  { id: "CUST-004", name: "BSNL", totalSites: 1500, healthySites: 1420, criticalSites: 18, availability: 99.1, openTickets: 12, slaStatus: "Healthy" },
  { id: "CUST-005", name: "Indus Towers", totalSites: 850, healthySites: 810, criticalSites: 8, availability: 99.5, openTickets: 8, slaStatus: "Healthy" },
];

export const alarmCategories = [
  { name: "Power Failure", count: 184, color: "#EF4444" },
  { name: "Battery Low", count: 126, color: "#F59E0B" },
  { name: "Comm. Loss", count: 85, color: "#64748B" },
  { name: "Temp High", count: 42, color: "#EC4899" },
  { name: "DG Failure", count: 28, color: "#8B5CF6" },
  { name: "Door Open", count: 17, color: "#06B6D4" },
];

export const availabilityData = [
  { time: "00:00", online: 12350, offline: 100 },
  { time: "04:00", online: 12300, offline: 150 },
  { time: "08:00", online: 12200, offline: 250 },
  { time: "12:00", online: 12050, offline: 400 },
  { time: "16:00", online: 12100, offline: 350 },
  { time: "20:00", online: 12150, offline: 300 },
  { time: "24:00", online: 12200, offline: 250 },
];

export const criticalSitesData = [
  { id: "S-1042", name: "Bandra Kurla-01", customer: "Reliance Jio", region: "West", alarm: "Power Failure", power: "Battery", gwStatus: "Online", lastComm: "2m ago", status: "Critical" },
  { id: "S-2055", name: "Connaught Place-04", customer: "Bharti Airtel", region: "North", alarm: "Comm. Loss", power: "Unknown", gwStatus: "Offline", lastComm: "45m ago", status: "Critical" },
  { id: "S-3012", name: "Salt Lake Sector-V", customer: "Vodafone Idea", region: "East", alarm: "DG Failure", power: "Battery Low", gwStatus: "Online", lastComm: "1m ago", status: "Critical" },
  { id: "S-4099", name: "Electronic City-02", customer: "BSNL", region: "South", alarm: "Temp High", power: "Mains", gwStatus: "Online", lastComm: "5m ago", status: "Warning" },
];

export const recentActivities = [
  { id: 1, type: "config", message: "Firmware v2.4 pushed to 450 gateways", time: "10 mins ago", user: "Admin" },
  { id: 2, type: "alarm", message: "Critical alarm acknowledged for S-1042", time: "15 mins ago", user: "NOC L1" },
  { id: 3, type: "site", message: "New site added by Indus Towers", time: "1 hour ago", user: "System" },
  { id: 4, type: "vendor", message: "Vendor 'Delta' assigned to 12 open tickets", time: "2 hours ago", user: "NOC L2" },
  { id: 5, type: "customer", message: "Bharti Airtel added 50 new sites", time: "3 hours ago", user: "System" },
];
