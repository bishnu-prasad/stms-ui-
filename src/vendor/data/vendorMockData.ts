export interface VendorJob {
  id: string;
  ticketId: string;
  title: string;
  customerName: string;
  siteId: string;
  siteName: string;
  circle: string;
  cluster: string;
  equipment: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "New" | "Accepted" | "Assigned" | "Travelling" | "On Site" | "Repairing" | "Testing" | "Waiting Parts" | "Completed" | "Waiting Customer Verification" | "Closed";
  assignedEngineer?: {
    id: string;
    name: string;
    avatar: string;
    phone: string;
  };
  slaRemainingMinutes: number;
  eta: string;
  reportedAgo: string;
  createdDate: string;
  rootCause?: string;
  suggestedResolution?: string;
  distanceKm?: number;
}

export interface VendorEngineer {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  status: "Available" | "On Site" | "Travelling" | "On Leave";
  currentSite?: string;
  assignedJobsCount: number;
  todayCompletedJobs: number;
  avgRepairTimeHours: number;
  rating: number;
  circle: string;
  gpsLocation: { lat: number; lng: number };
}

export interface VendorSite {
  id: string;
  name: string;
  circle: string;
  cluster: string;
  customerName: string;
  healthScore: number;
  equipmentCount: number;
  openJobsCount: number;
  lastVisit: string;
  status: "Healthy" | "Attention" | "Critical";
  installedEquipment: string[];
}

export interface VendorSparePart {
  id: string;
  partNumber: string;
  name: string;
  category: "Rectifier" | "Battery Cell" | "Controller Card" | "DG Sensor" | "SMPS Board";
  availableQty: number;
  reservedQty: number;
  inTransitQty: number;
  unitCost: number;
  status: "In Stock" | "Low Stock" | "Reorder";
}

export interface VendorPreventiveMaintenance {
  id: string;
  pmCode: string;
  siteId: string;
  siteName: string;
  customerName: string;
  dueDate: string;
  type: "Battery Load Test" | "DG Service" | "SMPS Inspection" | "HVAC & Thermal Audit";
  status: "Upcoming" | "Completed" | "Missed" | "In Progress";
  assignedEngineer: string;
}

export interface VendorCustomerAccount {
  id: string;
  name: string;
  logo: string;
  activeSitesCount: number;
  openJobsCount: number;
  slaCompliancePct: number;
  customerRating: number;
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
}

export const mockVendorInfo = {
  name: "Delta Electronics Field Services",
  code: "DEL-IND-042",
  circleCoverage: ["Maharashtra", "Rajasthan", "Telangana", "Uttar Pradesh"],
  activeContractors: 148,
  slaComplianceRate: 98.4,
  avgResponseTimeMin: 18,
};

export const mockVendorJobs: VendorJob[] = [
  {
    id: "JOB-8841",
    ticketId: "ALM-9021",
    title: "Critical Battery Discharge & Rectifier Trip",
    customerName: "Reliance Jio",
    siteId: "0000509489",
    siteName: "SATKHANDA Open Plot",
    circle: "Rajasthan",
    cluster: "Bikaner",
    equipment: "Delta SMPS 48V / 300A",
    priority: "CRITICAL",
    status: "Repairing",
    assignedEngineer: { id: "ENG-101", name: "Rahul S.", avatar: "RS", phone: "+91 98765 43210" },
    slaRemainingMinutes: 28,
    eta: "On Site (Arrived 10m ago)",
    reportedAgo: "35m ago",
    createdDate: "2026-07-03 08:30",
    rootCause: "Utility voltage surge triggered primary rectifier breaker trip.",
    suggestedResolution: "Replace MOV surge protection card & reset 100A DC breaker.",
    distanceKm: 4.2
  },
  {
    id: "JOB-8842",
    ticketId: "ALM-9018",
    title: "Phase Voltage Lost & Secondary Battery Fail",
    customerName: "Bharti Airtel",
    siteId: "0000459507",
    siteName: "Khandauli Agra LTP",
    circle: "Uttar Pradesh",
    cluster: "Lucknow",
    equipment: "Delta SPS Power Unit",
    priority: "HIGH",
    status: "Travelling",
    assignedEngineer: { id: "ENG-102", name: "Vikas K.", avatar: "VK", phone: "+91 98123 45678" },
    slaRemainingMinutes: 45,
    eta: "15 mins away",
    reportedAgo: "1h 10m ago",
    createdDate: "2026-07-03 08:00",
    rootCause: "Single phase dropout from grid transformer.",
    suggestedResolution: "Inspect phase selector relay & activate auto-gen start.",
    distanceKm: 12.8
  },
  {
    id: "JOB-8843",
    ticketId: "ALM-9015",
    title: "DG Failure to Start on Grid Outage",
    customerName: "Vodafone Idea",
    siteId: "0000579397",
    siteName: "Rudawal Junction",
    circle: "Rajasthan",
    cluster: "Ajmer",
    equipment: "Delta Integrated Controller",
    priority: "HIGH",
    status: "New",
    slaRemainingMinutes: 110,
    eta: "Unassigned",
    reportedAgo: "22m ago",
    createdDate: "2026-07-03 08:45",
    rootCause: "Low starter battery voltage or solenoid coil failure.",
    suggestedResolution: "Perform starter motor diagnostic & replace 12V 80Ah starter cell.",
    distanceKm: 18.5
  },
  {
    id: "JOB-8844",
    ticketId: "ALM-8994",
    title: "Cabinet Over-Temperature Warning",
    customerName: "Indus Towers",
    siteId: "0000534920",
    siteName: "UDPR-PREM NAGAR",
    circle: "Rajasthan",
    cluster: "Bikaner",
    equipment: "Delta High-Cap Cooling Unit",
    priority: "MEDIUM",
    status: "Assigned",
    assignedEngineer: { id: "ENG-104", name: "Amit V.", avatar: "AV", phone: "+91 97654 32109" },
    slaRemainingMinutes: 180,
    eta: "Scheduled 11:30 AM",
    reportedAgo: "2h 05m ago",
    createdDate: "2026-07-03 07:15",
    rootCause: "Dust buildup on condenser filters causing high thermal alarm.",
    suggestedResolution: "Clean intake filters & test dual exhaust fan controller.",
    distanceKm: 8.1
  },
  {
    id: "JOB-8845",
    ticketId: "PM-2026-042",
    title: "Quarterly Preventive Maintenance Audit",
    customerName: "Reliance Jio",
    siteId: "0000581861",
    siteName: "SATKHANDA",
    circle: "Rajasthan",
    cluster: "Bikaner",
    equipment: "SMPS 48V + Battery Bank",
    priority: "LOW",
    status: "Waiting Customer Verification",
    assignedEngineer: { id: "ENG-103", name: "Priya M.", avatar: "PM", phone: "+91 99887 76655" },
    slaRemainingMinutes: 480,
    eta: "Work Completed",
    reportedAgo: "4h 00m ago",
    createdDate: "2026-07-03 05:00",
    rootCause: "Scheduled quarterly PM routine.",
    suggestedResolution: "Conducted 100A battery discharge test, torqued busbar bolts.",
    distanceKm: 0
  },
];

export const mockVendorEngineers: VendorEngineer[] = [
  { id: "ENG-101", name: "Rahul Sharma", avatar: "RS", email: "rahul.s@deltafield.in", phone: "+91 98765 43210", status: "On Site", currentSite: "SATKHANDA Open Plot", assignedJobsCount: 2, todayCompletedJobs: 3, avgRepairTimeHours: 1.4, rating: 4.9, circle: "Rajasthan", gpsLocation: { lat: 28.0229, lng: 73.3119 } },
  { id: "ENG-102", name: "Vikas Kumar", avatar: "VK", email: "vikas.k@deltafield.in", phone: "+91 98123 45678", status: "Travelling", currentSite: "En Route to Agra LTP", assignedJobsCount: 1, todayCompletedJobs: 2, avgRepairTimeHours: 1.8, rating: 4.8, circle: "Uttar Pradesh", gpsLocation: { lat: 27.1767, lng: 78.0081 } },
  { id: "ENG-103", name: "Priya Mehta", avatar: "PM", email: "priya.m@deltafield.in", phone: "+91 99887 76655", status: "Available", currentSite: "Bikaner Service Base", assignedJobsCount: 1, todayCompletedJobs: 4, avgRepairTimeHours: 1.2, rating: 5.0, circle: "Rajasthan", gpsLocation: { lat: 28.0150, lng: 73.3000 } },
  { id: "ENG-104", name: "Amit Verma", avatar: "AV", email: "amit.v@deltafield.in", phone: "+91 97654 32109", status: "Available", currentSite: "Ajmer Service Hub", assignedJobsCount: 1, todayCompletedJobs: 1, avgRepairTimeHours: 2.1, rating: 4.7, circle: "Rajasthan", gpsLocation: { lat: 26.4499, lng: 74.6399 } },
  { id: "ENG-105", name: "Suresh Patil", avatar: "SP", email: "suresh.p@deltafield.in", phone: "+91 98220 11223", status: "On Leave", currentSite: "N/A", assignedJobsCount: 0, todayCompletedJobs: 0, avgRepairTimeHours: 1.6, rating: 4.6, circle: "Maharashtra", gpsLocation: { lat: 18.5204, lng: 73.8567 } },
];

export const mockVendorSites: VendorSite[] = [
  { id: "0000509489", name: "SATKHANDA Open Plot", circle: "Rajasthan", cluster: "Bikaner", customerName: "Reliance Jio", healthScore: 42, equipmentCount: 4, openJobsCount: 1, lastVisit: "10 mins ago", status: "Critical", installedEquipment: ["Delta SMPS 48V/300A", "100Ah Lithium Battery Array", "DG AMF Controller", "OPE Outdoor Cabinet"] },
  { id: "0000459507", name: "Khandauli Agra LTP", circle: "Uttar Pradesh", cluster: "Lucknow", customerName: "Bharti Airtel", healthScore: 78, equipmentCount: 3, openJobsCount: 1, lastVisit: "Yesterday", status: "Attention", installedEquipment: ["Delta SPS Power Module", "SMPS Controller V3", "Battery Bank 48V"] },
  { id: "0000579397", name: "Rudawal Junction", circle: "Rajasthan", cluster: "Ajmer", customerName: "Vodafone Idea", healthScore: 82, equipmentCount: 5, openJobsCount: 1, lastVisit: "3 days ago", status: "Attention", installedEquipment: ["Delta Integrated SMPS", "15kVA DG Controller", "Solar Hybrid Unit"] },
  { id: "0000581861", name: "SATKHANDA Primary", circle: "Rajasthan", cluster: "Bikaner", customerName: "Reliance Jio", healthScore: 98, equipmentCount: 4, openJobsCount: 0, lastVisit: "4 hours ago", status: "Healthy", installedEquipment: ["Delta High-Efficiency Rectifiers", "48V 400Ah Battery Bank"] },
];

export const mockVendorSpareParts: VendorSparePart[] = [
  { id: "PART-101", partNumber: "DLT-REC-48V50A", name: "50A High-Efficiency Rectifier Module", category: "Rectifier", availableQty: 42, reservedQty: 8, inTransitQty: 12, unitCost: 18500, status: "In Stock" },
  { id: "PART-102", partNumber: "DLT-CTL-V31", name: "SMPS Controller Mainboard V3.1", category: "Controller Card", availableQty: 6, reservedQty: 4, inTransitQty: 5, unitCost: 12400, status: "Low Stock" },
  { id: "PART-103", partNumber: "DLT-MOV-SURGE", name: "Heavy Duty MOV Surge Suppressor Card", category: "SMPS Board", availableQty: 28, reservedQty: 5, inTransitQty: 10, unitCost: 3200, status: "In Stock" },
  { id: "PART-104", partNumber: "DLT-BAT-LFP100", name: "100Ah 48V Lithium Battery Cell Pack", category: "Battery Cell", availableQty: 14, reservedQty: 6, inTransitQty: 20, unitCost: 45000, status: "In Stock" },
  { id: "PART-105", partNumber: "DLT-DG-AMF02", name: "Auto Mains Failure Solenoid Kit", category: "DG Sensor", availableQty: 3, reservedQty: 2, inTransitQty: 4, unitCost: 8900, status: "Reorder" },
];

export const mockVendorPMs: VendorPreventiveMaintenance[] = [
  { id: "PM-901", pmCode: "PM-Q3-01", siteId: "0000581861", siteName: "SATKHANDA Primary", customerName: "Reliance Jio", dueDate: "2026-07-05", type: "Battery Load Test", status: "Upcoming", assignedEngineer: "Rahul Sharma" },
  { id: "PM-902", pmCode: "PM-Q3-02", siteId: "0000459507", siteName: "Khandauli Agra LTP", customerName: "Bharti Airtel", dueDate: "2026-07-08", type: "SMPS Inspection", status: "Upcoming", assignedEngineer: "Vikas Kumar" },
  { id: "PM-903", pmCode: "PM-Q3-03", siteId: "0000534920", siteName: "UDPR-PREM NAGAR", customerName: "Indus Towers", dueDate: "2026-07-02", type: "HVAC & Thermal Audit", status: "In Progress", assignedEngineer: "Amit Verma" },
  { id: "PM-904", pmCode: "PM-Q2-88", siteId: "0000579397", siteName: "Rudawal Junction", customerName: "Vodafone Idea", dueDate: "2026-06-28", type: "DG Service", status: "Completed", assignedEngineer: "Priya Mehta" },
];

export const mockVendorCustomers: VendorCustomerAccount[] = [
  { id: "CUST-01", name: "Reliance Jio", logo: "RJ", activeSitesCount: 1420, openJobsCount: 2, slaCompliancePct: 99.1, customerRating: 4.9, primaryContact: { name: "Anil Kapoor", email: "anil.k@jio.com", phone: "+91 98200 12345" } },
  { id: "CUST-02", name: "Bharti Airtel", logo: "BA", activeSitesCount: 980, openJobsCount: 1, slaCompliancePct: 98.4, customerRating: 4.8, primaryContact: { name: "Sunil Dutt", email: "sunil.d@airtel.com", phone: "+91 98110 54321" } },
  { id: "CUST-03", name: "Vodafone Idea", logo: "VI", activeSitesCount: 650, openJobsCount: 1, slaCompliancePct: 97.2, customerRating: 4.7, primaryContact: { name: "Meera Reddy", email: "meera.r@vodafoneidea.com", phone: "+91 98400 98765" } },
  { id: "CUST-04", name: "Indus Towers", logo: "IT", activeSitesCount: 2100, openJobsCount: 1, slaCompliancePct: 98.9, customerRating: 4.9, primaryContact: { name: "Rakesh Sharma", email: "rakesh.s@industowers.com", phone: "+91 98711 22334" } },
];
