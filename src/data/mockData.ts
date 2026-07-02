export const mockKPIs = {
  healthScore: 94.7,
  totalSites: 2847,
  activeAlarms: 63,
  batteryHours: 2334,
  revenueLeakage: 420000,
};

export const mockCriticalSites = [
  { id: "1", name: "Nava Village Open Plot", location: "Maharashtra", type: "Battery", severity: "CRITICAL", hours: "0h", issue: "0V - Down" },
  { id: "2", name: "NANA PETH II", location: "Maharashtra", type: "Battery", severity: "CRITICAL", hours: "0h", issue: "0V - Down" },
  { id: "3", name: "Smart City", location: "Telangana", type: "Battery", severity: "HIGH", hours: "2h", issue: "49V - Alarm" },
  { id: "4", name: "Vill Baijana", location: "Uttar Pradesh", type: "Battery", severity: "CRITICAL", hours: "0h", issue: "0V - Down" },
  { id: "5", name: "KATRAJ TUNNEL II", location: "Maharashtra", type: "Battery", severity: "CRITICAL", hours: "0h", issue: "0V - Down" },
];

export const mockSites = [
  ...mockCriticalSites,
  { id: "6", name: "Dhakouli", location: "Rajasthan", type: "Offline", severity: "MEDIUM", hours: "-", issue: "373V - Up", status: "Up" },
  { id: "7", name: "PALI_KAMLAGRESH COLONY", location: "Rajasthan", type: "Battery", severity: "CRITICAL", hours: "0h", issue: "0V - Down" },
  { id: "8", name: "Khejariyali", location: "Rajasthan", type: "Offline", severity: "MEDIUM", hours: "-", issue: "54V - Up", status: "Up" },
  { id: "9", name: "Rudawal", location: "Uttar Pradesh", type: "Mains", severity: "MEDIUM", hours: "-", issue: "54V - Up", status: "Up" },
  { id: "10", name: "Ganpatipur Barhapur", location: "Uttar Pradesh", type: "No Data", severity: "LOW", hours: "-", issue: "No Data", status: "No Data" },
  { id: "11", name: "Khandauli Agra LTP", location: "Uttar Pradesh", type: "No Data", severity: "LOW", hours: "-", issue: "No Data", status: "No Data" },
  { id: "12", name: "Dathingara", location: "Telangana", type: "No Data", severity: "LOW", hours: "-", issue: "No Data", status: "No Data" },
  { id: "13", name: "Kushmara New", location: "Telangana", type: "No Data", severity: "LOW", hours: "-", issue: "No Data", status: "No Data" },
  { id: "14", name: "Byonti Khurd", location: "Maharashtra", type: "No Data", severity: "LOW", hours: "-", issue: "No Data", status: "No Data" },
].map(s => ({
  ...s,
  voltage: s.issue.split(' - ')[0],
  status: s.status || s.issue.split(' - ')[1] || 'Unknown',
  uptime: Math.floor(Math.random() * 20) + 80,
  lastUpdate: "2 mins ago"
}));

export const mockActivityFeed = [
  { id: 1, time: "10:42 AM", message: "Critical battery voltage at Nava Village Open Plot", severity: "CRITICAL" },
  { id: 2, time: "10:39 AM", message: "Mains restored at Rudawal", severity: "SUCCESS" },
  { id: 3, time: "10:15 AM", message: "Multiple sites reporting offline in Telangana", severity: "HIGH" },
  { id: 4, time: "09:50 AM", message: "Scheduled maintenance completed at Khejariyali", severity: "SUCCESS" },
  { id: 5, time: "09:22 AM", message: "High temperature warning at Smart City", severity: "HIGH" },
];

export const mockSeverityTimeline = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  critical: Math.floor(Math.random() * 10),
  high: Math.floor(Math.random() * 20) + 5,
  medium: Math.floor(Math.random() * 30) + 10,
}));

export const mockBatteryRanking = [
  { name: "Maharashtra", hours: 2334 },
  { name: "Telangana", hours: 418 },
  { name: "Uttar Pradesh", hours: 338 },
  { name: "Rajasthan", hours: 118 },
  { name: "Mumbai", hours: 114 },
];

export const mockRevenueLeakage = [
  { bracket: "0-25%", sites: 12, avgLoad: 1.2 },
  { bracket: "25-50%", sites: 8, avgLoad: 2.5 },
  { bracket: "50-75%", sites: 4, avgLoad: 4.1 },
  { bracket: "75-100%", sites: 0, avgLoad: 0 },
  { bracket: ">100% Breached", sites: 2, avgLoad: 5.5 },
];

export const mockMapMarkers = mockSites.map(s => ({
  ...s,
  lat: 20 + Math.random() * 10,
  lng: 70 + Math.random() * 15,
}));
