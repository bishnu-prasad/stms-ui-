// ─── Operational Mock Data for Engineer Portal ────────────────────────────

export const engineerProfile = {
  id: "EMP-4921",
  name: "Alex Johnson",
  role: "L2 Field Technician",
  vendor: "Delta Electronics",
  phone: "+91 98765 43210",
  email: "alex.j@delta.com",
  certifications: ["Tower Climbing Safety", "Electrical Safety Level 3", "Huawei BBU Installation"],
  region: "Maharashtra (West)"
};

export const activeJobs = [
  { id: "TKT-8821", site: "Bandra Kurla-01", siteId: "S-10420", customer: "Jio", type: "Corrective", priority: "Critical", status: "In Progress", slaTime: "1h 15m", fault: "Mains Failure > 10x" },
  { id: "TKT-8824", site: "Andheri East-08", siteId: "S-70384", customer: "Airtel", type: "Preventive", priority: "Medium", status: "Accepted", slaTime: "4h 30m", fault: "Quarterly PM Checklist" },
  { id: "TKT-8842", site: "Nariman Point-02", siteId: "S-60145", customer: "ATC", type: "Corrective", priority: "High", status: "Assigned", slaTime: "2h 45m", fault: "DG Auto-Start Fail" },
];

export const todaySchedule = [
  { time: "09:00 AM", site: "Bandra Kurla-01", type: "CM", status: "In Progress" },
  { time: "12:30 PM", site: "Andheri East-08", type: "PM", status: "Scheduled" },
  { time: "03:15 PM", site: "Nariman Point-02", type: "CM", status: "Scheduled" },
];

export const recentNotifications = [
  { id: 1, type: "alert", title: "SLA Warning", desc: "TKT-8821 SLA breaches in 1 hour.", time: "10m ago" },
  { id: 2, type: "job", title: "New Job Assigned", desc: "TKT-8842 (Nariman Point-02) assigned to you.", time: "1h ago" },
  { id: 3, type: "msg", title: "NOC Message", desc: "Please check the DG fuel lines first at BKC.", time: "1h 15m ago" },
];

export const engineerInventory = [
  { id: "INV-BATT", name: "12V 100Ah VRLA Battery", type: "Power", issued: 4, used: 1, available: 3 },
  { id: "INV-RECT", name: "4000W Rectifier Module", type: "Power", issued: 2, used: 0, available: 2 },
  { id: "INV-CTRL", name: "Gateway Controller v2", type: "Telecom", issued: 1, used: 1, available: 0 },
  { id: "INV-SENS", name: "Temperature Sensor", type: "Sensor", issued: 10, used: 4, available: 6 },
  { id: "INV-FUSE", name: "63A DC MCB", type: "Electrical", issued: 20, used: 2, available: 18 },
];
