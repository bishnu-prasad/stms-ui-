import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { WidgetCard } from "@/components/WidgetCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  mockKPIs,
  mockCriticalSites,
  mockActivityFeed,
  mockSeverityTimeline,
  mockRevenueLeakage,
  mockSites,
  mockMapMarkers,
} from "@/data/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  Battery,
  AlertTriangle,
  WifiOff,
  Download,
  Cpu,
  Signal,
  IndianRupee,
  Clock,
  TrendingDown,
  TrendingUp,
  MapPin,
  RefreshCw,
  Wifi,
  Activity,
  Filter,
  Sparkles,
  ShieldAlert,
  Radio,
  ChevronDown,
  Zap,
  ActivitySquare,
  CheckCircle2,
  Wrench,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Gauge,
  BrainCircuit,
  RotateCw,
  Search,
  FileText,
  Plus,
  ChevronRight,
  Check,
  AlertCircle,
  Shield,
  Settings,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const getMarkerIcon = (severity: string) => {
  const color =
    severity === "CRITICAL"
      ? "#ef4444"
      : severity === "HIGH"
      ? "#f59e0b"
      : severity === "LOW"
      ? "#64748b"
      : "#10b981";

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px ${color};"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
};

const tabItems = [
  { id: "overview", label: "Overview" },
  { id: "performance", label: "Performance" },
  { id: "operations", label: "Operations" },
  { id: "predictive", label: "Predictive Maintenance" },
  { id: "ticketing", label: "Support Ticketing" },
  { id: "vendor", label: "Vendor Insights" },
  { id: "cost", label: "Cost Analytics" },
];

const powerConsumptionData = [
  { week: "W1", Mains: 4000, DG: 2400, Battery: 2400 },
  { week: "W2", Mains: 8200, DG: 3100, Battery: 2800 },
  { week: "W3", Mains: 12400, DG: 4500, Battery: 3200 },
  { week: "W4", Mains: 7800, DG: 2900, Battery: 2600 },
  { week: "W5", Mains: 8100, DG: 3000, Battery: 2700 },
];

const runtimeDeviationData = [
  { region: "North", val: 54 },
  { region: "South", val: -12 },
  { region: "East", val: 18 },
  { region: "West", val: 72 },
  { region: "Central", val: 40 },
];

const operationalInefficiencies = [
  { site: "Mau New", mains: 72, dg: 18, battery: 10 },
  { site: "KATRAJ TUNNEL II", mains: 65, dg: 25, battery: 10 },
  { site: "DAD MAHAL", mains: 58, dg: 30, battery: 12 },
  { site: "Vill Baijana", mains: 45, dg: 40, battery: 15 },
  { site: "PALLI_KAMLAGRESH COLONY", mains: 50, dg: 35, battery: 15 },
];

const alarmStatsList = [
  { site: "PALLI_KAMLAGRESH COLONY", alarm: "mainsbphaseok", color: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300" },
  { site: "PALLI_KAMLAGRESH COLONY", alarm: "mainsneutralampok", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
  { site: "PALLI_KAMLAGRESH COLONY", alarm: "mainsrphaseok", color: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300" },
  { site: "NANA PETH II", alarm: "smoke", color: "bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300" },
  { site: "Vill Baijana", alarm: "mainfail", color: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300" },
  { site: "KATRAJ TUNNEL II", alarm: "mainfail", color: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300" },
  { site: "Vill Baijana", alarm: "dgfailtobg", color: "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300" },
];

const topUniqueAlarms = [
  { name: "LLOP Input", count: 8 },
  { name: "Rectifier 1 Over Temperature", count: 6 },
  { name: "Mains Failure", count: 5 },
  { name: "Rectifier 2 Over Temperature", count: 5 },
  { name: "amf_contractor_mains", count: 4 },
  { name: "DG Off", count: 4 },
  { name: "Auto Manual", count: 4 },
  { name: "Load On Grid", count: 4 },
];

const alarmDistributionData = [
  { name: "dg_fail_to_stop", value: 38, color: "#3B82F6" },
  { name: "dg_fail_to_start", value: 27, color: "#10B981" },
  { name: "gen_common_fault", value: 18, color: "#F59E0B" },
  { name: "gen_alternator_fault", value: 12, color: "#EC4899" },
  { name: "rectifier_over_temp", value: 5, color: "#8B5CF6" },
];

const alarmCircleData = [
  { circle: "India", critical: 250, high: 180, medium: 90 },
  { circle: "Uttar Pradesh", critical: 120, high: 90, medium: 45 },
  { circle: "Maharashtra", critical: 95, high: 75, medium: 30 },
  { circle: "Rajasthan", critical: 40, high: 30, medium: 15 },
  { circle: "Mumbai", critical: 25, high: 15, medium: 10 },
];

const alarmTopSitesData = [
  { site: "Vill Baijana", count: 18, risk: "CRITICAL", lastAlarm: "dg_fail_to_start" },
  { site: "KATRAJ TUNNEL II", count: 14, risk: "HIGH", lastAlarm: "mainfail" },
  { site: "PALLI_KAMLAGRESH COLONY", count: 11, risk: "HIGH", lastAlarm: "mainsbphaseok" },
  { site: "UDPR-PREM NAGAR", count: 8, risk: "MEDIUM", lastAlarm: "smoke" },
  { site: "Jodhpur engg college", count: 6, risk: "MEDIUM", lastAlarm: "amf_contractor_mains" },
];

const alarmTrendsData = [
  { time: "Jun 02", alarms: 250 },
  { time: "Jun 08", alarms: 980 },
  { time: "Jun 14", alarms: 420 },
  { time: "Jun 20", alarms: 1850 },
  { time: "Jun 26", alarms: 2200 },
  { time: "Jul 02", alarms: 624 },
];

const runHoursData = [
  { week: "Week 1", mains: 750, dg: 150, battery: 100 },
  { week: "Week 2", mains: 720, dg: 180, battery: 90 },
  { week: "Week 3", mains: 810, dg: 120, battery: 110 },
  { week: "Week 4", mains: 690, dg: 210, battery: 120 },
  { week: "Week 5", mains: 520, dg: 90, battery: 70 },
];

const energyTrendData = [
  { week: "Week 1", solar: 880, mains: 820, dg: 110 },
  { week: "Week 2", solar: 890, mains: 810, dg: 115 },
  { week: "Week 3", solar: 920, mains: 825, dg: 105 },
  { week: "Week 4", solar: 910, mains: 815, dg: 108 },
  { week: "Week 5", solar: 895, mains: 700, dg: 95 },
];

const voltageTrendData = [
  { week: "W1", batteryVolt: 52.1, dcVolt: 48.2 },
  { week: "W2", batteryVolt: 51.9, dcVolt: 48.1 },
  { week: "W3", batteryVolt: 52.3, dcVolt: 48.3 },
  { week: "W4", batteryVolt: 51.8, dcVolt: 48.0 },
  { week: "W5", batteryVolt: 52.0, dcVolt: 48.1 },
];

const currentTrendData = [
  { week: "W1", total: 150, load1: 48, load2: 52, load3: 50 },
  { week: "W2", total: 152, load1: 49, load2: 51, load3: 52 },
  { week: "W3", total: 148, load1: 47, load2: 50, load3: 51 },
  { week: "W4", total: 151, load1: 50, load2: 49, load3: 52 },
  { week: "W5", total: 149, load1: 48, load2: 51, load3: 50 },
];

const sourceRuntimeDistData = [
  { week: "W1", mains: 95, dg: 15, battery: 8 },
  { week: "W2", mains: 92, dg: 18, battery: 10 },
  { week: "W3", mains: 94, dg: 12, battery: 7 },
  { week: "W4", mains: 91, dg: 20, battery: 11 },
  { week: "W5", mains: 93, dg: 14, battery: 9 },
];

const modemVsEquipmentData = [
  { time: "Jun 02", modem: 1350, equipment: 680 },
  { time: "Jun 08", modem: 2800, equipment: 1800 },
  { time: "Jun 14", modem: 2100, equipment: 1300 },
  { time: "Jun 20", modem: 2950, equipment: 1750 },
  { time: "Jun 26", modem: 2700, equipment: 1650 },
  { time: "Jun 30", modem: 3000, equipment: 1950 },
  { time: "Jul 04", modem: 2400, equipment: 1500 },
  { time: "Jul 10", modem: 2850, equipment: 1820 },
  { time: "Jul 16", modem: 2200, equipment: 1400 },
  { time: "Jul 22", modem: 2750, equipment: 1780 },
  { time: "Jul 28", modem: 2600, equipment: 1690 },
  { time: "Aug 02", modem: 2900, equipment: 1850 },
];

const predictiveRiskDistribution = [
  { level: "Critical", count: 23, pct: 3, color: "#EF4444" },
  { level: "High", count: 58, pct: 8, color: "#F97316" },
  { level: "Medium", count: 124, pct: 15, color: "#F59E0B" },
  { level: "Low", count: 287, pct: 25, color: "#3B82F6" },
  { level: "Healthy", count: 2355, pct: 49, color: "#10B981" },
];

const aiRecommendationsList = [
  {
    id: "rec-1",
    site: "MUM-01-Bandra",
    circle: "Mumbai",
    priority: "Critical",
    action: "Replace Battery Bank",
    reason: "Cell 3 voltage degradation <44.2V with high thermal risk",
    confidence: 94,
    estSavings: "₹2,40,000",
    downtimeAvoided: "24 hrs",
    affected: "1 site",
    btnLabel: "Schedule Replacement",
  },
  {
    id: "rec-2",
    site: "DEL-04-CP",
    circle: "Delhi",
    priority: "High",
    action: "Service Rectifier Unit",
    reason: "Phase 2 over-temperature spike (38°C) & voltage drop",
    confidence: 87,
    estSavings: "₹1,85,000",
    downtimeAvoided: "18 hrs",
    affected: "1 site",
    btnLabel: "Dispatch Field Ops",
  },
  {
    id: "rec-3",
    site: "BLR-02-Indiranagar",
    circle: "Bangalore",
    priority: "High",
    action: "DG Oil & Filter Service",
    reason: "DG runtime exceeded 250h threshold without maintenance",
    confidence: 82,
    estSavings: "₹95,000",
    downtimeAvoided: "12 hrs",
    affected: "1 site",
    btnLabel: "Schedule Service",
  },
  {
    id: "rec-4",
    site: "HYD-09-Koramangala",
    circle: "Hyderabad",
    priority: "Medium",
    action: "Battery Cell Balance Calibration",
    reason: "Voltage variance across cells exceeds ±0.4V threshold",
    confidence: 73,
    estSavings: "₹60,000",
    downtimeAvoided: "8 hrs",
    affected: "1 site",
    btnLabel: "Auto-Calibrate",
  },
  {
    id: "rec-5",
    site: "PUN-03-VimanNagar",
    circle: "Pune",
    priority: "Medium",
    action: "AMC Contract Renewal & Inspection",
    reason: "AMC expiring in 14 days with minor voltage fluctuations",
    confidence: 91,
    estSavings: "₹1,20,000",
    downtimeAvoided: "16 hrs",
    affected: "1 site",
    btnLabel: "Renew AMC",
  },
  {
    id: "rec-6",
    site: "AMD-02-SGHighway",
    circle: "Ahmedabad",
    priority: "Medium",
    action: "Cooling Fan Assembly Replacement",
    reason: "Fan RPM dropped by 28% resulting in ambient temp rise",
    confidence: 68,
    estSavings: "₹45,000",
    downtimeAvoided: "6 hrs",
    affected: "1 site",
    btnLabel: "Order Spares",
  },
];

const failureTimelineData = [
  {
    timeframe: "Today",
    items: [
      { site: "MUM-01-Bandra", component: "Battery Cell 3", issue: "Thermal Runaway Risk", risk: "Critical" },
      { site: "DEL-04-CP", component: "Rectifier Module 2", issue: "Phase Voltage Failure", risk: "Critical" },
    ],
  },
  {
    timeframe: "Tomorrow",
    items: [
      { site: "BLR-02-Indiranagar", component: "DG Starter Motor", issue: "Solenoide Degradation", risk: "High" },
      { site: "KAN-05-MallRoad", component: "Transformer Unit", issue: "Primary Voltage Dip", risk: "High" },
    ],
  },
  {
    timeframe: "Next Week",
    items: [
      { site: "HYD-09-Koramangala", component: "Rectifier Fan", issue: "Bearing Friction Noise", risk: "Medium" },
      { site: "CHE-01-HiTech", component: "DC Converter", issue: "Capacitor Ripple Rise", risk: "Medium" },
      { site: "KOL-05-SaltLake", component: "Solar MPPT Charger", issue: "Efficiency Drop >12%", risk: "Medium" },
    ],
  },
  {
    timeframe: "Next Month",
    items: [
      { site: "PUN-03-VimanNagar", component: "Main Battery Bank", issue: "End of Life Capacity Drop", risk: "Low" },
      { site: "JAI-01-MIRoad", component: "DG Alternator", issue: "Stator Winding Aging", risk: "Low" },
    ],
  },
];

const componentRULData = [
  { component: "Battery Bank", rul: "14.2 mo", health: 72, replacementEst: "Nov 2026", confidence: "94%" },
  { component: "Diesel Generator", rul: "32.5 mo", health: 88, replacementEst: "Jul 2028", confidence: "91%" },
  { component: "Rectifier Unit", rul: "18.0 mo", health: 78, replacementEst: "Jan 2027", confidence: "89%" },
  { component: "Solar Inverter Array", rul: "48.0 mo", health: 94, replacementEst: "Aug 2029", confidence: "96%" },
  { component: "System Controller", rul: "60.0 mo", health: 96, replacementEst: "Oct 2030", confidence: "98%" },
];

const componentMatrixData = [
  { component: "Battery Bank", voltage: "44.2V", temp: "38°C", cycles: "1,240", age: "42 mo", risk: 91, status: "Critical", health: 42 },
  { component: "Diesel Generator", voltage: "230V", temp: "72°C", cycles: "450", age: "28 mo", risk: 18, status: "Healthy", health: 88 },
  { component: "Rectifier Unit", voltage: "48.2V", temp: "45°C", cycles: "8,400", age: "36 mo", risk: 65, status: "High Risk", health: 68 },
  { component: "Solar Array", voltage: "120V", temp: "32°C", cycles: "220", age: "14 mo", risk: 12, status: "Healthy", health: 94 },
  { component: "System Controller", voltage: "5.0V", temp: "28°C", cycles: "N/A", age: "18 mo", risk: 8, status: "Healthy", health: 96 },
];

const regionalHealthComparison = [
  { region: "North", score: 84.2, totalAssets: 720, failures: 5, batteryHealth: 82 },
  { region: "South", score: 78.5, totalAssets: 640, failures: 7, batteryHealth: 74 },
  { region: "East", score: 72.1, totalAssets: 480, failures: 6, batteryHealth: 68 },
  { region: "West", score: 88.9, totalAssets: 580, failures: 3, batteryHealth: 86 },
  { region: "Central", score: 69.4, totalAssets: 427, failures: 8, batteryHealth: 64 },
];

const maintenanceScheduleList = [
  { site: "MUM-01-Bandra", task: "Battery Cell 3 Replacement", date: "Today, 15:00", engineer: "Rahul Sharma", priority: "Overdue", status: "In Progress" },
  { site: "DEL-04-CP", task: "Rectifier Phase 2 Overhaul", date: "Tomorrow, 10:00", engineer: "Amit Verma", priority: "High", status: "Scheduled" },
  { site: "BLR-02-Indiranagar", task: "DG Filter & Oil Replacement", date: "Jul 05, 09:30", engineer: "Karthik Raja", priority: "High", status: "Scheduled" },
  { site: "HYD-09-Koramangala", task: "Cell Voltage Balance Check", date: "Jul 08, 14:00", engineer: "Srinivas Rao", priority: "Medium", status: "Upcoming" },
  { site: "PUN-03-VimanNagar", task: "AMC Renewal Inspection", date: "Jul 12, 11:00", engineer: "Priya Nair", priority: "Medium", status: "Upcoming" },
];

const predictiveRiskTableData = [
  { site: "MUM-01-Bandra", circle: "Mumbai", volt: "44.2V", temp: "38°C", age: "42 mo", lastService: "Nov 2024", riskScore: 91, status: "Critical" },
  { site: "DEL-04-CP", circle: "Delhi", volt: "45.8V", temp: "35°C", age: "38 mo", lastService: "Jan 2025", riskScore: 78, status: "High" },
  { site: "BLR-02-Indiranagar", circle: "Bangalore", volt: "46.5V", temp: "34°C", age: "31 mo", lastService: "Feb 2025", riskScore: 65, status: "High" },
  { site: "HYD-09-Koramangala", circle: "Hyderabad", volt: "47.1V", temp: "32°C", age: "28 mo", lastService: "Mar 2025", riskScore: 54, status: "Medium" },
  { site: "PUN-03-VimanNagar", circle: "Pune", volt: "47.8V", temp: "31°C", age: "24 mo", lastService: "Apr 2025", riskScore: 42, status: "Medium" },
  { site: "CHE-01-HiTech", circle: "Chennai", volt: "48.4V", temp: "29°C", age: "18 mo", lastService: "May 2025", riskScore: 28, status: "Low" },
  { site: "KOL-05-SaltLake", circle: "Kolkata", volt: "49.2V", temp: "28°C", age: "14 mo", lastService: "Jun 2025", riskScore: 15, status: "Healthy" },
];

const vendorIntelligenceScoreboard = [
  {
    name: "Delta",
    fullName: "Delta Electronics Systems",
    score: 96.4,
    grade: "A+",
    status: "Preferred Vendor",
    reliability: 98.9,
    marketShare: 48,
    equipmentCount: 1366,
    maintCost: "₹42,000/mo",
    uptime: "99.2%",
    color: "#3B82F6",
  },
  {
    name: "Vertiv",
    fullName: "Vertiv Energy & Power",
    score: 92.1,
    grade: "A",
    status: "Primary Supplier",
    reliability: 95.4,
    marketShare: 28,
    equipmentCount: 797,
    maintCost: "₹68,000/mo",
    uptime: "98.4%",
    color: "#10B981",
  },
  {
    name: "VNT",
    fullName: "VNT Telecom Solutions",
    score: 88.5,
    grade: "B+",
    status: "Secondary Supplier",
    reliability: 91.2,
    marketShare: 14,
    equipmentCount: 398,
    maintCost: "₹84,000/mo",
    uptime: "97.1%",
    color: "#F59E0B",
  },
  {
    name: "Intelux",
    fullName: "Intelux Power Technologies",
    score: 84.7,
    grade: "B",
    status: "Under Review",
    reliability: 86.8,
    marketShare: 10,
    equipmentCount: 286,
    maintCost: "₹1,42,000/mo",
    uptime: "95.8%",
    color: "#EF4444",
  },
];

const equipmentMatrixData = [
  { vendor: "Delta", smps: 640, sps: 320, pfls: 180, battery: 126, rectifier: 70, controller: 30, total: 1366 },
  { vendor: "Vertiv", smps: 380, sps: 190, pfls: 95, battery: 72, rectifier: 40, controller: 20, total: 797 },
  { vendor: "VNT", smps: 180, sps: 100, pfls: 50, battery: 40, rectifier: 18, controller: 10, total: 398 },
  { vendor: "Intelux", smps: 120, sps: 80, pfls: 40, battery: 26, rectifier: 12, controller: 8, total: 286 },
];

const vendorReliabilitySuite = [
  { vendor: "Delta", uptime: "99.2%", downtime: "4.2 hrs", alarms: 120, mtbf: "720 hrs", mttr: "1.5 hrs", responseTime: "18 mins", warrantySuccess: "99.1%", quality: "98%" },
  { vendor: "Vertiv", uptime: "98.4%", downtime: "8.6 hrs", alarms: 240, mtbf: "580 hrs", mttr: "2.2 hrs", responseTime: "28 mins", warrantySuccess: "96.5%", quality: "94%" },
  { vendor: "VNT", uptime: "97.1%", downtime: "14.2 hrs", alarms: 410, mtbf: "420 hrs", mttr: "3.1 hrs", responseTime: "42 mins", warrantySuccess: "92.0%", quality: "89%" },
  { vendor: "Intelux", uptime: "95.8%", downtime: "22.8 hrs", alarms: 680, mtbf: "310 hrs", mttr: "4.2 hrs", responseTime: "65 mins", warrantySuccess: "88.4%", quality: "83%" },
];

const vendorDataQualityErrors = [
  { type: "Missing Packets", delta: 12, vertiv: 45, vnt: 120, intelux: 310, severity: "High" },
  { type: "Duplicate Records", delta: 5, vertiv: 18, vnt: 42, intelux: 95, severity: "Medium" },
  { type: "Length Mismatch", delta: 2, vertiv: 10, vnt: 28, intelux: 84, severity: "Medium" },
  { type: "Comm Errors", delta: 8, vertiv: 22, vnt: 65, intelux: 140, severity: "High" },
  { type: "CRC Errors", delta: 1, vertiv: 6, vnt: 19, intelux: 52, severity: "Low" },
  { type: "Parsing Errors", delta: 0, vertiv: 3, vnt: 11, intelux: 38, severity: "Low" },
];

const vendorProcurementInsights = [
  { title: "Highest ROI Supplier", vendor: "Delta", value: "18.4% Cost Savings", detail: "Lowest MTTR & zero SLA breaches", badge: "Preferred", badgeColor: "bg-emerald-100 text-emerald-700" },
  { title: "Highest Maint. Cost", vendor: "Intelux", value: "₹1,42,000 / mo", detail: "680 alarms/mo requiring field ops", badge: "Action Needed", badgeColor: "bg-red-100 text-red-700" },
  { title: "Most Economical Unit", vendor: "VNT", value: "₹24,500 / unit", detail: "Competitive acquisition pricing", badge: "Cost Optimal", badgeColor: "bg-blue-100 text-blue-700" },
  { title: "Recommended Phase-out", vendor: "Intelux Legacy", value: "286 units", detail: "High CRC errors & low MTBF (310h)", badge: "Replace Soon", badgeColor: "bg-amber-100 text-amber-700" },
];

const vendorRiskMatrixQuadrants = [
  { quadrant: "Preferred Vendor", vendors: [{ name: "Delta", score: 96.4, risk: "Low", color: "#3B82F6" }] },
  { quadrant: "Monitor Vendor", vendors: [{ name: "Vertiv", score: 92.1, risk: "Medium", color: "#10B981" }] },
  { quadrant: "High Cost Vendor", vendors: [{ name: "VNT", score: 88.5, risk: "Medium-High", color: "#F59E0B" }] },
  { quadrant: "Critical Risk Vendor", vendors: [{ name: "Intelux", score: 84.7, risk: "High", color: "#EF4444" }] },
];

const vendorIncomingDataVolumeStream = [
  { date: "2026-06-25", Delta: 420, Intelux: 310, Vertiv: 1680, VNT: 40 },
  { date: "2026-06-26", Delta: 480, Intelux: 330, Vertiv: 1640, VNT: 50 },
  { date: "2026-06-27", Delta: 350, Intelux: 320, Vertiv: 1550, VNT: 60 },
  { date: "2026-06-28", Delta: 520, Intelux: 340, Vertiv: 1600, VNT: 110 },
  { date: "2026-06-29", Delta: 498, Intelux: 354, Vertiv: 1703, VNT: 0 },
  { date: "2026-06-30", Delta: 510, Intelux: 330, Vertiv: 1620, VNT: 80 },
  { date: "2026-07-01", Delta: 540, Intelux: 300, Vertiv: 1450, VNT: 40 },
  { date: "2026-07-02", Delta: 180, Intelux: 110, Vertiv: 520, VNT: 10 },
];

const costSummaryMetrics = {
  totalCost: "₹ 1.78 L",
  totalCostRaw: 177800,
  mainsCost: "₹ 1.60 L",
  mainsPct: "89.99%",
  dgCost: "₹ 12.9K",
  dgPct: "7.26%",
  batteryCost: "₹ 4.9K",
  batteryPct: "2.75%",
  avgSiteCost: "₹6,838 / site",
  savingsIdentified: "₹24,500 / mo",
};

const costTrendDailyData = [
  { date: "2026-06-02", Mains: 5400, DG: 300, Battery: 100, Total: 5800 },
  { date: "2026-06-04", Mains: 5100, DG: 250, Battery: 120, Total: 5470 },
  { date: "2026-06-06", Mains: 6200, DG: 450, Battery: 150, Total: 6800 },
  { date: "2026-06-08", Mains: 4800, DG: 700, Battery: 200, Total: 5700 },
  { date: "2026-06-10", Mains: 5300, DG: 500, Battery: 220, Total: 6020 },
  { date: "2026-06-12", Mains: 4700, DG: 300, Battery: 110, Total: 5110 },
  { date: "2026-06-14", Mains: 5200, DG: 400, Battery: 180, Total: 5780 },
  { date: "2026-06-16", Mains: 4900, DG: 350, Battery: 140, Total: 5390 },
  { date: "2026-06-18", Mains: 5800, DG: 420, Battery: 160, Total: 6380 },
  { date: "2026-06-20", Mains: 5600, DG: 380, Battery: 150, Total: 6130 },
  { date: "2026-06-22", Mains: 6100, DG: 300, Battery: 120, Total: 6520 },
  { date: "2026-06-24", Mains: 5900, DG: 480, Battery: 170, Total: 6550 },
  { date: "2026-06-26", Mains: 5200, DG: 850, Battery: 280, Total: 6330 },
  { date: "2026-06-28", Mains: 4300, DG: 1100, Battery: 320, Total: 5720 },
  { date: "2026-06-30", Mains: 5400, DG: 550, Battery: 190, Total: 6140 },
  { date: "2026-07-02", Mains: 3100, DG: 200, Battery: 80, Total: 3380 },
];

const circleWiseCostData = [
  { circle: "Maharashtra", mains: 89200, dg: 3400, battery: 1200, total: 93800, pct: "52.7%", sites: 12 },
  { circle: "Rajasthan", mains: 46500, dg: 6800, battery: 2100, total: 55400, pct: "31.2%", sites: 8 },
  { circle: "Uttar Pradesh", mains: 27800, dg: 1800, battery: 1100, total: 30700, pct: "17.3%", sites: 4 },
  { circle: "Mumbai", mains: 14500, dg: 900, battery: 500, total: 15900, pct: "8.9%", sites: 2 },
];

const top10HighCostSitesData = [
  { site: "UDPR-PREM NAGAR", mains: 76400, dg: 1500, battery: 500, total: 78400, pct: "44.1%" },
  { site: "Vill Baijana", mains: 23500, dg: 3200, battery: 1500, total: 28200, pct: "15.9%" },
  { site: "PALI_KAMLAGRESH", mains: 21200, dg: 4100, battery: 1600, total: 26900, pct: "15.1%" },
  { site: "Nava Village Open", mains: 13200, dg: 1100, battery: 500, total: 14800, pct: "8.3%" },
  { site: "Jodhpur engg college", mains: 12800, dg: 400, battery: 0, total: 13200, pct: "7.4%" },
  { site: "KATRAJ TUNNEL II", mains: 9800, dg: 700, battery: 0, total: 10500, pct: "5.9%" },
  { site: "Rudawal", mains: 3500, dg: 2200, battery: 500, total: 6200, pct: "3.5%" },
  { site: "SATKHANDA", mains: 1600, dg: 200, battery: 0, total: 1800, pct: "1.0%" },
  { site: "Smart City", mains: 1100, dg: 100, battery: 0, total: 1200, pct: "0.7%" },
  { site: "NANA PETH II", mains: 800, dg: 100, battery: 0, total: 900, pct: "0.5%" },
];

const costAnomaliesSpikesData = [
  { site: "UDPR-PREM NAGAR", date: "2026-06-28", cost: "₹4,250", avg7d: "₹1,820", deviation: "+133%", driver: "Continuous Grid Outage (DG Run)", risk: "High" },
  { site: "PALI_KAMLAGRESH", date: "2026-06-29", cost: "₹2,840", avg7d: "₹1,210", deviation: "+134%", driver: "Peak Hour Grid Tariff Surge", risk: "Medium" },
  { site: "Vill Baijana", date: "2026-06-30", cost: "₹1,950", avg7d: "₹910", deviation: "+114%", driver: "High Battery Discharge Rate", risk: "Medium" },
];

function SourceBadge({ source }: { source: string }) {
  const map: Record<string, string> = {
    Battery: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    Mains: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    Offline: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    "No Data": "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
        map[source] ?? map["No Data"]
      }`}
    >
      {source}
    </span>
  );
}

function KPICard({
  title,
  value,
  icon: Icon,
  accentClass,
  trend,
  trendLabel,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  accentClass: string;
  trend?: "up" | "down";
  trendLabel?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-2xs hover:shadow-xs transition-all cursor-default">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <div className={`p-2 rounded-lg ${accentClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="text-3xl font-bold font-mono tracking-tight text-foreground">
        {value}
      </div>
      {trendLabel && (
        <div
          className={`flex items-center gap-1 mt-2 text-xs font-medium ${
            trend === "up" ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {trendLabel}
        </div>
      )}
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    CRITICAL: "bg-red-100 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900",
    HIGH: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-900",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-900",
    LOW: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  };
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
        map[severity] ?? map.LOW
      }`}
    >
      {severity}
    </span>
  );
}

const PremiumTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 dark:bg-black/90 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl shadow-xl text-slate-100 text-xs z-50">
        <div className="font-semibold mb-2 text-slate-300">{label}</div>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color || entry.fill || entry.stroke }}
              />
              <span className="font-medium text-slate-400">{entry.name || entry.dataKey}:</span>
              <span className="font-mono font-bold">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabFromUrl && tabItems.some((t) => t.id === tabFromUrl) ? tabFromUrl : "overview"
  );
  const [alarmSubTab, setAlarmSubTab] = useState("live");
  const [threshold, setThreshold] = useState([15]);
  const [saved, setSaved] = useState(false);
  const [mapMounted, setMapMounted] = useState(false);

  useEffect(() => {
    setMapMounted(true);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");
    if (tab && tabItems.some((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [location, window.location.search]);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {activeTab === "overview" ? "Overview" : "Analytics"}
          </h1>
          <div className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
            <span>Home</span>
            <span>&gt;</span>
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="text-foreground font-medium">
              {activeTab === "overview" ? "Overview" : "Analytics"}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh
          </Button>
          <Button
            size="sm"
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold"
            data-testid="btn-export-pdf"
          >
            <Download className="w-4 h-4 mr-1.5" /> Export All (PDF)
          </Button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-b border-slate-200 dark:border-border flex gap-6 overflow-x-auto pt-2 pb-1 scrollbar-none">
        {tabItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap cursor-pointer outline-none ${
                isActive
                  ? "text-rose-600 dark:text-rose-500 font-semibold"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="analytics-active-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-600 dark:bg-rose-500 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* OVERVIEW COMMAND CENTER */}
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* HERO COMMAND CENTER BANNER WITH 4 MINI METRIC CARDS */}
          <div className="relative bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-6 md:p-8 shadow-xs overflow-hidden">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Command Statement & Headline */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Main Statement */}
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
                  Network is operating at{" "}
                  <span className="text-blue-600 dark:text-blue-400">92%</span>{" "}
                  health,
                  <br />
                  with{" "}
                  <span className="text-amber-500 dark:text-amber-400">3</span>{" "}
                  incidents requiring your attention.
                </h2>

                {/* Subtitle */}
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                  2 sites breached SO thresholds in the last 24h. Field Ops has been
                  auto-notified for Rajasthan circle.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs">
                    <ShieldAlert className="w-4 h-4 mr-2" /> Review incidents
                  </Button>
                  <Button variant="outline" className="font-semibold text-slate-700 dark:text-slate-300">
                    <Download className="w-4 h-4 mr-2" /> Export PDF
                  </Button>
                  <Button variant="outline" className="font-semibold text-slate-700 dark:text-slate-300">
                    <Sparkles className="w-4 h-4 mr-2 text-blue-600" /> Ask Copilot
                  </Button>
                </div>
              </div>

              {/* Right Column: 4 Mini Metric Cards */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                {/* Total Sites */}
                <div className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                      <Radio className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      +2 this wk
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                      26
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Total sites
                    </div>
                  </div>
                </div>

                {/* Healthy */}
                <div className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                      <Wifi className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      92% of fleet
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                      24
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Healthy
                    </div>
                  </div>
                </div>

                {/* SO Breached */}
                <div className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center">
                      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      +1 vs last wk
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                      2
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      SO Breached
                    </div>
                  </div>
                </div>

                {/* Active Alarms */}
                <div className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      9 critical
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                      34
                    </div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Active alarms
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* 2. 4 Overview KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Sites"
          value={mockKPIs.totalSites.toLocaleString()}
          icon={Signal}
          accentClass="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
          trend="up"
          trendLabel="+12 since yesterday"
        />
        <KPICard
          title="Active Alarms"
          value={mockKPIs.activeAlarms.toString()}
          icon={AlertTriangle}
          accentClass="bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-400"
          trend="down"
          trendLabel="−4 resolved"
        />
        <KPICard
          title="Battery Hours"
          value={`${mockKPIs.batteryHours.toLocaleString()}h`}
          icon={Battery}
          accentClass="bg-amber-50 text-amber-500 dark:bg-amber-950 dark:text-amber-400"
          trend="down"
          trendLabel="−18h since 6h ago"
        />
        <KPICard
          title="Revenue Leakage"
          value={`₹${(mockKPIs.revenueLeakage / 100000).toFixed(1)}L`}
          icon={IndianRupee}
          accentClass="bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-400"
          trend="up"
          trendLabel="+₹0.3L this week"
        />
      </div>

      {/* 3. Hero grid: Network Score + Severity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Network Intelligence Score */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-2xs flex flex-col items-center justify-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Network Intelligence Score
          </p>
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#10B981"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${94.7 * 2.765} 276.5`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-mono text-emerald-600">
                94.7
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">
                / 100
              </span>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-center">
            <div>
              <div className="font-semibold text-foreground">98.2%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="font-semibold text-foreground">63</div>
              <div className="text-muted-foreground">Alarms</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="font-semibold text-foreground">5</div>
              <div className="text-muted-foreground">Critical</div>
            </div>
          </div>
        </div>

        {/* Severity Timeline */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">
              Severity Timeline — Last 24h
            </p>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />{" "}
                Critical
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />{" "}
                High
              </span>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockSeverityTimeline}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="critical"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="high"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Top Critical Sites + Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-2xs overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <p className="text-sm font-semibold text-foreground">
              Top Critical Sites
            </p>
            <Badge variant="destructive" className="text-[10px] font-bold">
              5 CRITICAL
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Site
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockCriticalSites.map((site) => (
                  <tr
                    key={site.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <SeverityBadge severity={site.severity} />
                    </td>
                    <td className="px-5 py-3 font-medium text-foreground">
                      {site.name}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {site.location}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                      {site.issue}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Investigate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-2xs overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-sm font-semibold text-foreground">
              Live Activity Feed
            </p>
          </div>
          <div className="p-5 relative border-l-2 border-border ml-8 mt-2 space-y-5">
            {mockActivityFeed.map((item) => (
              <div key={item.id} className="relative pl-5">
                <div
                  className={`absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full border-2 border-card shadow-xs ${
                    item.severity === "CRITICAL"
                      ? "bg-red-500"
                      : item.severity === "HIGH"
                      ? "bg-amber-400"
                      : "bg-emerald-500"
                  }`}
                />
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-snug">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )}

      {/* TAB 1: PERFORMANCE */}
      {activeTab === "performance" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* EXECUTIVE OPERATIONAL CRITICAL ALERTS MODULE */}
          <div className="relative bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-6 shadow-xs overflow-hidden">
            {/* Subtle top amber gradient line accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-sky-500" />

            {/* Module Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/20 dark:from-amber-950 dark:to-amber-900/50 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      Operational Critical Alerts
                    </h2>
                    <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      Action Required
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Real-time critical telemetry anomalies requiring priority intervention across NOC teams
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="text-xs font-semibold h-8 text-slate-700 dark:text-slate-300">
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Auto-Refresh (Live)
                </Button>
                <Button size="sm" className="h-8 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs">
                  <ShieldAlert className="w-3.5 h-3.5 mr-1.5" /> Acknowledge Alerts
                </Button>
              </div>
            </div>

            {/* 3 Executive Alert Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Sites with High Reliance of Battery */}
              <div className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-5 hover:border-amber-400/50 transition-all group shadow-2xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950/80 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Battery className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        Battery Reliance
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">High discharge hours</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    5 Sites
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Vill Baijana", val: "2,335.0h", pct: 94 },
                    { name: "Rudawal", val: "418.0h", pct: 68 },
                    { name: "KATRAJ TUNNEL II", val: "340.0h", pct: 52 },
                    { name: "UDPR-PREM NAGAR", val: "118.0h", pct: 35 },
                    { name: "Jodhpur engg college", val: "114.0h", pct: 31 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </span>
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                          {item.val}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Sites with Active Alarms */}
              <div className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-5 hover:border-red-400/50 transition-all group shadow-2xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        Active Alarms
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Unresolved faults</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    32 Alarms
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: "PALI_KAMLAGRESH COLONY", count: 11, sev: "CRITICAL" },
                    { name: "UDPR-PREM NAGAR", count: 8, sev: "HIGH" },
                    { name: "Vill Baijana", count: 6, sev: "HIGH" },
                    { name: "malikpur", count: 4, sev: "MEDIUM" },
                    { name: "Rudawal", count: 3, sev: "MEDIUM" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 hover:border-rose-300 dark:hover:border-rose-900 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            item.sev === "CRITICAL"
                              ? "bg-rose-500 animate-pulse"
                              : item.sev === "HIGH"
                              ? "bg-amber-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded text-[11px]">
                          {item.count} alarms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Sites without Data */}
              <div className="bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-5 hover:border-sky-400/50 transition-all group shadow-2xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950/80 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <WifiOff className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        Sites Without Data
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Offline telemetry</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                    5 Offline
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: "Khandauli Agra LTP", time: "4h 12m ago" },
                    { name: "Ganpatipur Barhapur", time: "2h 45m ago" },
                    { name: "Dathingara", time: "1h 10m ago" },
                    { name: "Kushmara New", time: "48m ago" },
                    { name: "Byonti Khurd", time: "22m ago" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 hover:border-sky-300 dark:hover:border-sky-900 transition-colors text-xs"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-slate-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Global Leakage Threshold & Revenue Leakage */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <WidgetCard title="Global Leakage Threshold" delay={0}>
              <div className="flex flex-col gap-5 h-full justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-4">
                    Persistent across all dashboards. Ignore source activities
                    shorter than this duration (minutes) as leakage.
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Threshold Limit
                    </span>
                    <span className="text-2xl font-mono font-bold text-primary">
                      {threshold[0]} mins
                    </span>
                  </div>
                  <Slider
                    value={threshold}
                    onValueChange={setThreshold}
                    max={60}
                    step={1}
                    className="w-full mb-4"
                  />
                  <div className="flex justify-between gap-2 mb-4">
                    {[0, 5, 10, 15, 30].map((val) => (
                      <Button
                        key={val}
                        variant={threshold[0] === val ? "default" : "outline"}
                        size="sm"
                        onClick={() => setThreshold([val])}
                        className="flex-1 text-xs"
                      >
                        {val}m
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-lg p-3">
                  <div className="flex items-start gap-2 text-amber-800 dark:text-amber-300 text-xs">
                    <Cpu className="w-4 h-4 mt-0.5 shrink-0" />
                    <p>
                      Estimated Impact: <strong>Medium</strong>. Increasing by 5
                      min reduces false alerts by ~12%.
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold"
                  onClick={handleSave}
                >
                  {saved ? "Saved Permanently!" : "Save Permanently"}
                </Button>
              </div>
            </WidgetCard>

            <WidgetCard
              title="Revenue Leakage — National, Last 30 days"
              className="lg:col-span-2"
              delay={1}
            >
              <div className="flex gap-4 mb-4">
                <div className="bg-muted px-3 py-2 rounded-lg border border-border">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Avg Peak Load
                  </div>
                  <div className="font-mono font-bold text-sm">3.45 KW</div>
                </div>
                <div className="bg-muted px-3 py-2 rounded-lg border border-border">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Avg Running Load
                  </div>
                  <div className="font-mono font-bold text-sm">2.05 KW</div>
                </div>
                <div className="bg-muted px-3 py-2 rounded-lg border border-border">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Avg SO Load
                  </div>
                  <div className="font-mono font-bold text-sm text-red-600">
                    5.49 KW
                  </div>
                </div>
              </div>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={mockRevenueLeakage}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="rlGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#2563EB"
                          stopOpacity={0.15}
                        />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="bracket"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Area
                      type="step"
                      dataKey="sites"
                      stroke="#2563EB"
                      fill="url(#rlGrad)"
                      strokeWidth={2}
                      name="Site Count"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </WidgetCard>
          </div>

          {/* Faulty Power Supply + Source Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <WidgetCard
              title="Faulty Power Supply (Mains/DG Discharging)"
              className="lg:col-span-2"
              delay={2}
            >
              <div className="flex flex-col gap-6 py-2">
                {[
                  {
                    name: "PALL_KAMLAGRESH COLONY",
                    mains: 2050,
                    dg: 180,
                    total: 2230,
                  },
                  { name: "Vill Baijana", mains: 340, dg: 0, total: 340 },
                  { name: "KATRAJ TUNNEL II", mains: 254.5, dg: 0, total: 254.5 },
                ].map((site) => {
                  const max = 2230;
                  const mainsPct = (site.mains / max) * 100;
                  const dgPct = (site.dg / max) * 100;
                  return (
                    <div key={site.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-semibold text-foreground truncate max-w-[220px]">
                          {site.name}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground ml-2 shrink-0">
                          {site.total.toFixed(0)} min
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] w-10 text-emerald-600 font-semibold shrink-0 text-right">
                          Mains
                        </span>
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                          <div
                            style={{ width: `${mainsPct}%` }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-emerald-700 w-14 shrink-0">
                          {site.mains.toFixed(0)}m
                        </span>
                      </div>
                      {site.dg > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] w-10 text-red-500 font-semibold shrink-0 text-right">
                            DG
                          </span>
                          <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                            <div
                              style={{ width: `${dgPct}%` }}
                              className="h-full rounded-full bg-gradient-to-r from-red-300 to-red-500"
                            />
                          </div>
                          <span className="text-[10px] font-mono text-red-600 w-14 shrink-0">
                            {site.dg.toFixed(0)}m
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </WidgetCard>

            <WidgetCard title="Source Breakdown" delay={3}>
              <div className="flex flex-col items-center justify-center h-full gap-4 py-2">
                <div className="relative w-44 h-28">
                  <svg
                    viewBox="0 0 180 100"
                    className="w-full h-full overflow-visible"
                  >
                    <path
                      d="M 10 90 A 80 80 0 0 1 170 90"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 10 90 A 80 80 0 0 1 170 90"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      strokeDashoffset="22.1"
                    />
                    <text
                      x="90"
                      y="82"
                      textAnchor="middle"
                      fontSize="22"
                      fontWeight="700"
                      fill="#2563EB"
                      fontFamily="monospace"
                    >
                      91.2%
                    </text>
                    <text
                      x="90"
                      y="96"
                      textAnchor="middle"
                      fontSize="9"
                      fill="#94a3b8"
                      letterSpacing="0.08em"
                    >
                      MAINS
                    </text>
                  </svg>
                </div>
                <div className="flex gap-3 w-full">
                  <div className="flex-1 bg-blue-50 dark:bg-blue-950/50 border border-blue-100 rounded-xl p-3 text-center">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-500 mb-1">
                      Mains
                    </div>
                    <div className="text-xl font-bold font-mono text-blue-700 dark:text-blue-300">
                      91.18%
                    </div>
                  </div>
                  <div className="flex-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-100 rounded-xl p-3 text-center">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-500 mb-1">
                      DG
                    </div>
                    <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-300">
                      8.82%
                    </div>
                  </div>
                </div>
              </div>
            </WidgetCard>
          </div>

          {/* CIRCLE-WISE OPERATIONAL UPTIME */}
          <WidgetCard title="Circle-wise Operational Uptime" delay={0}>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { region: "Uttar Pradesh", avg: 97.5 },
                { region: "Mumbai", avg: 97.3 },
                { region: "India", avg: 93.7 },
                { region: "Rajasthan", avg: 92.3 },
                { region: "Maharashtra", avg: 87.7 },
                { region: "Telangana", avg: 83.3 },
              ].map((item) => {
                const isHigh = item.avg >= 95;
                const isMid = item.avg >= 85;
                const color = isHigh
                  ? "#10B981"
                  : isMid
                  ? "#F59E0B"
                  : "#EF4444";
                return (
                  <div
                    key={item.region}
                    className="flex flex-col items-center gap-2 p-3 bg-slate-50 dark:bg-card rounded-xl border border-slate-200/60 dark:border-border"
                  >
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="6"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          fill="none"
                          stroke={color}
                          strokeWidth="6"
                          strokeDasharray="201"
                          strokeDashoffset={201 - (201 * item.avg) / 100}
                        />
                      </svg>
                      <span
                        className="absolute font-mono font-bold text-xs"
                        style={{ color }}
                      >
                        {item.avg}%
                      </span>
                    </div>
                    <span className="text-xs font-medium text-center">
                      {item.region}
                    </span>
                  </div>
                );
              })}
            </div>
          </WidgetCard>

          {/* LIVE SITE ENERGY STATUS TABLE */}
          <div className="bg-card border border-border rounded-xl shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Live Site Energy Status
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real-time voltage, power source, and uptime per site
                </p>
              </div>
              <Badge variant="outline" className="text-[10px] font-semibold">
                {mockSites.length} SITES MONITORED
              </Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Site Name
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Voltage
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Uptime
                    </th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockSites.map((site) => (
                    <tr
                      key={site.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-foreground">
                        {site.name}
                      </td>
                      <td className="px-5 py-3">
                        <SourceBadge source={site.type} />
                      </td>
                      <td className="px-5 py-3 font-mono text-sm text-muted-foreground">
                        {site.voltage}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                            site.status === "Up"
                              ? "text-emerald-600"
                              : site.status === "Down"
                              ? "text-red-500"
                              : site.status === "Alarm"
                              ? "text-amber-500"
                              : "text-blue-500"
                          }`}
                        >
                          {site.status === "Up" ? (
                            <Wifi className="w-3 h-3" />
                          ) : site.status === "Down" ? (
                            <WifiOff className="w-3 h-3" />
                          ) : (
                            <Activity className="w-3 h-3" />
                          )}
                          {site.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-[80px]">
                            <div
                              className={`h-full rounded-full ${
                                site.uptime >= 95
                                  ? "bg-emerald-500"
                                  : site.uptime >= 80
                                  ? "bg-amber-400"
                                  : "bg-red-400"
                              }`}
                              style={{ width: `${site.uptime}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">
                            {site.uptime}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right text-xs text-muted-foreground">
                        {site.lastUpdate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* REAL-TIME STATUS MAP */}
          <div className="bg-card border border-border rounded-xl shadow-2xs overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  Real-time Status Map
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Geographic distribution of sites across India
                </p>
              </div>
              <div className="flex gap-2">
                <div className="bg-muted px-3 py-1 rounded-md text-xs flex items-center gap-1.5 font-medium">
                  <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>All Regions</span>
                </div>
              </div>
            </div>
            <div className="h-[400px] relative w-full overflow-hidden">
              {mapMounted && (
                <MapContainer
                  center={[22.5937, 78.9629]}
                  zoom={5}
                  className="w-full h-full z-0"
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                  {mockMapMarkers.map((site) => (
                    <Marker
                      key={site.id}
                      position={[site.lat, site.lng]}
                      icon={getMarkerIcon(site.severity)}
                    >
                      <Popup className="custom-popup">
                        <div className="p-1">
                          <h3 className="font-bold text-sm mb-1">{site.name}</h3>
                          <p className="text-xs text-gray-500 mb-2">
                            {site.location}
                          </p>
                          <div className="flex gap-2">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-mono text-white ${
                                site.severity === "CRITICAL"
                                  ? "bg-red-500"
                                  : site.severity === "HIGH"
                                  ? "bg-amber-500"
                                  : site.severity === "LOW"
                                  ? "bg-gray-500"
                                  : "bg-emerald-500"
                              }`}
                            >
                              {site.severity}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-800 font-mono">
                              {site.type}
                            </span>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: OPERATIONS (POWER INTELLIGENCE, ALARM INTELLIGENCE, PERFORMANCE ANALYTICS, MONITOR STATUS) */}
      {activeTab === "operations" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          {/* SECTION 1: POWER INTELLIGENCE */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-blue-600 pl-4 py-1">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Power Intelligence
                </h2>
                <p className="text-xs text-muted-foreground">
                  Energy source analysis & runtime performance across fleet
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="font-semibold text-muted-foreground uppercase text-[10px]">
                  Filters:
                </span>
                <div className="bg-card border border-border px-3 py-1.5 rounded-lg font-medium cursor-pointer flex items-center gap-1.5 hover:bg-muted/50 transition-colors">
                  <span>All Circles</span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="bg-card border border-border px-3 py-1.5 rounded-lg font-medium cursor-pointer flex items-center gap-1.5 hover:bg-muted/50 transition-colors">
                  <span>All Regions</span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <div className="bg-card border border-border px-3 py-1.5 rounded-lg font-medium cursor-pointer flex items-center gap-1.5 hover:bg-muted/50 transition-colors">
                  <span>All Types</span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Row 1: Energy Source Breakdown + Operational Inefficiencies */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Energy Source Breakdown */}
              <WidgetCard title="Energy Source Breakdown" className="lg:col-span-4" delay={0}>
                <div className="flex flex-col justify-between h-full py-2 gap-6">
                  <div className="text-center pt-2">
                    <div className="text-4xl font-extrabold font-mono tracking-tight text-foreground">
                      2,847
                    </div>
                    <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground mt-1">
                      Total Sites
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Mains */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                          <span>Mains</span>
                        </span>
                        <span className="font-mono font-bold text-blue-600">67%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "67%" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-blue-600 rounded-full"
                        />
                      </div>
                    </div>

                    {/* DG */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span>DG</span>
                        </span>
                        <span className="font-mono font-bold text-amber-500">21%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "21%" }}
                          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                          className="h-full bg-amber-500 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Battery */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span>Battery</span>
                        </span>
                        <span className="font-mono font-bold text-emerald-500">12%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "12%" }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          className="h-full bg-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </WidgetCard>

              {/* Operational Inefficiencies - Premium Card Design */}
              <div className="lg:col-span-8">
                <div className="bg-card border border-border rounded-xl shadow-2xs overflow-hidden h-full">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Operational Inefficiencies</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Sites with abnormal power source reliance</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/70 dark:border-rose-900/60 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        {operationalInefficiencies.length} Sites Affected
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    {operationalInefficiencies.map((item, idx) => {
                      const dominant = item.mains >= item.dg && item.mains >= item.battery ? 'mains' : item.dg >= item.battery ? 'dg' : 'battery';
                      const riskLevel = item.dg + item.battery > 45 ? 'high' : item.dg + item.battery > 25 ? 'medium' : 'low';
                      return (
                        <motion.div
                          key={item.site}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.07 }}
                          className="group relative bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/60 rounded-xl p-3.5 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-200"
                        >
                          <div className="flex items-start justify-between mb-2.5">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                                riskLevel === 'high' ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400' :
                                riskLevel === 'medium' ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400' :
                                'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                              }`}>
                                {idx + 1}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-foreground leading-tight">{item.site}</div>
                                <div className={`text-[10px] font-semibold mt-0.5 ${
                                  riskLevel === 'high' ? 'text-red-500' : riskLevel === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                                }`}>
                                  {riskLevel === 'high' ? '⚠ High DG/Battery reliance' : riskLevel === 'medium' ? '△ Moderate deviation' : '✓ Normal operation'}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.5 rounded">{item.mains}%</span>
                              <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded">{item.dg}%</span>
                              <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">{item.battery}%</span>
                            </div>
                          </div>
                          {/* Segmented bar */}
                          <div className="h-2 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden flex">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.mains}%` }}
                              transition={{ duration: 0.8, delay: 0.1 + idx * 0.06, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                            />
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.dg}%` }}
                              transition={{ duration: 0.8, delay: 0.2 + idx * 0.06, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 ml-px"
                            />
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.battery}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + idx * 0.06, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 ml-px"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Footer legend */}
                  <div className="px-5 py-3 border-t border-border flex items-center gap-5 text-[11px]">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block" /><span className="text-muted-foreground font-medium">Mains</span></span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /><span className="text-muted-foreground font-medium">DG</span></span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /><span className="text-muted-foreground font-medium">Battery</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Power Consumption - Full Width */}
            <div className="grid grid-cols-1 gap-5">
              {/* Power Consumption */}
              <WidgetCard title="Power Consumption" delay={2}>
                <div className="h-[250px] w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={powerConsumptionData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="mainsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="dgGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="batteryGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="Mains"
                        stackId="1"
                        stroke="#2563EB"
                        fill="url(#mainsGrad)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="DG"
                        stackId="1"
                        stroke="#F59E0B"
                        fill="url(#dgGrad)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="Battery"
                        stackId="1"
                        stroke="#10B981"
                        fill="url(#batteryGrad)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </WidgetCard>
            </div>
          </div>

          {/* SECTION 2: ALARM INTELLIGENCE */}
          <div className="space-y-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between border-l-4 border-rose-600 pl-4 py-1">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Alarm Intelligence
                </h2>
                <p className="text-xs text-muted-foreground">
                  Active incidents & resolution tracking
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Alarm Statistics - Ultra Premium 5-Tab Suite */}
              <WidgetCard title="Alarm Statistics" className="lg:col-span-6" delay={0}>
                <div className="flex flex-col h-full gap-4">
                  {/* Header controls & Sub-tabs */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-2">
                    {/* Sub-tabs list */}
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-semibold">
                      {[
                        { id: "live", label: "Live" },
                        { id: "distribution", label: "Distribution" },
                        { id: "circle", label: "Circle Wise" },
                        { id: "top_sites", label: "Top Sites" },
                        { id: "trends", label: "Trends" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setAlarmSubTab(tab.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200 relative whitespace-nowrap ${
                            alarmSubTab === tab.id
                              ? "bg-rose-500 text-white font-bold shadow-xs"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Time Range Filter */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <select className="bg-muted border border-border text-[11px] font-semibold rounded-md px-2 py-1 outline-none cursor-pointer">
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                        <option>Last 90 Days</option>
                      </select>
                    </div>
                  </div>

                  {/* SUB-TAB 1: LIVE ALARMS */}
                  {alarmSubTab === "live" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="overflow-y-auto max-h-[260px] space-y-2 pr-1"
                    >
                      {alarmStatsList.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 hover:bg-muted/40 transition-all text-xs group"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                            <span className="font-semibold text-foreground truncate max-w-[180px]">
                              {item.site}
                            </span>
                          </div>
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border ${item.color}`}
                          >
                            {item.alarm}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* SUB-TAB 2: DISTRIBUTION (DONUT CHART) */}
                  {alarmSubTab === "distribution" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 py-1"
                    >
                      <div className="sm:col-span-6 h-[200px] relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Tooltip content={<PremiumTooltip />} />
                            <Pie
                              data={alarmDistributionData}
                              cx="50%"
                              cy="50%"
                              innerRadius={52}
                              outerRadius={76}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {alarmDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                          <span className="text-xl font-mono font-extrabold text-foreground">
                            100
                          </span>
                          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
                            Total Alarms
                          </span>
                        </div>
                      </div>

                      <div className="sm:col-span-6 space-y-2 text-xs">
                        {alarmDistributionData.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-1.5 rounded-lg hover:bg-muted/40 transition-colors"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="font-medium text-foreground truncate text-[11px]">
                                {item.name}
                              </span>
                            </div>
                            <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-muted">
                              {item.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* SUB-TAB 3: CIRCLE WISE */}
                  {alarmSubTab === "circle" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3 py-1"
                    >
                      {alarmCircleData.map((item, idx) => {
                        const total = item.critical + item.high + item.medium;
                        const maxTotal = 520;
                        const barPct = (total / maxTotal) * 100;
                        return (
                          <div key={item.circle} className="space-y-1 text-xs">
                            <div className="flex justify-between items-center text-[11px]">
                              <span className="font-bold text-foreground">{item.circle}</span>
                              <span className="font-mono font-bold text-rose-500">
                                {total} Alarms
                              </span>
                            </div>
                            <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.critical / total) * barPct}%` }}
                                transition={{ duration: 0.6, delay: idx * 0.05 }}
                                className="h-full bg-rose-500"
                              />
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.high / total) * barPct}%` }}
                                transition={{ duration: 0.6, delay: 0.1 + idx * 0.05 }}
                                className="h-full bg-amber-500"
                              />
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.medium / total) * barPct}%` }}
                                transition={{ duration: 0.6, delay: 0.2 + idx * 0.05 }}
                                className="h-full bg-blue-500"
                              />
                            </div>
                          </div>
                        );
                      })}

                      <div className="flex items-center justify-center gap-4 text-[10px] font-bold pt-2 border-t border-border">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-500" /> High
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500" /> Medium
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* SUB-TAB 4: TOP SITES */}
                  {alarmSubTab === "top_sites" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2 py-1 max-h-[260px] overflow-y-auto pr-1"
                    >
                      {alarmTopSitesData.map((item, idx) => (
                        <div
                          key={item.site}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-slate-50/50 dark:bg-slate-900/30 hover:border-border transition-all text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 font-extrabold text-[10px] flex items-center justify-center shrink-0">
                              #{idx + 1}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-foreground truncate">{item.site}</div>
                              <div className="text-[10px] text-muted-foreground font-mono truncate">
                                Last: {item.lastAlarm}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                                item.risk === "CRITICAL"
                                  ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                                  : item.risk === "HIGH"
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                                  : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                              }`}
                            >
                              {item.risk}
                            </span>
                            <span className="font-mono font-bold text-xs bg-muted px-2 py-1 rounded-lg">
                              {item.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* SUB-TAB 5: TRENDS */}
                  {alarmSubTab === "trends" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="h-[210px] pt-1"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={alarmTrendsData}
                          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="alarmTrendGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
                            </linearGradient>
                            <filter id="glowAlarmTrend" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                          <Tooltip content={<PremiumTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="alarms"
                            name="Incidents"
                            stroke="#F43F5E"
                            fill="url(#alarmTrendGrad)"
                            strokeWidth={3}
                            activeDot={{ r: 6, fill: "#F43F5E", stroke: "hsl(var(--card))", strokeWidth: 2 }}
                            filter="url(#glowAlarmTrend)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </motion.div>
                  )}
                </div>
              </WidgetCard>

              {/* Site-wise Top Unique Alarms - Premium Impact Design */}
              <div className="lg:col-span-6">
                <div className="bg-card border border-border rounded-xl shadow-2xs overflow-hidden h-full">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Site-wise Top Unique Alarms</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Network-wide alarm impact by affected sites</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200/60 dark:border-rose-900/60 px-2.5 py-1 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        {topUniqueAlarms.length} Alarm Types
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5">
                    {topUniqueAlarms.map((alarm, idx) => {
                      const maxCount = topUniqueAlarms[0].count;
                      const pct = (alarm.count / maxCount) * 100;
                      const severity = alarm.count >= 7 ? 'critical' : alarm.count >= 5 ? 'high' : alarm.count >= 4 ? 'medium' : 'low';
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.06 }}
                          className="group flex items-center gap-3 p-2.5 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all duration-200 cursor-default"
                        >
                          {/* Rank */}
                          <div className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center text-[10px] font-extrabold ${
                            idx === 0 ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600' :
                            idx === 1 ? 'bg-orange-100 dark:bg-orange-950/60 text-orange-600' :
                            idx === 2 ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600' :
                            'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            #{idx + 1}
                          </div>

                          {/* Name + Bar */}
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-foreground truncate mb-1.5">{alarm.name}</div>
                            <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.7, delay: 0.15 + idx * 0.06, ease: "easeOut" }}
                                className={`h-full rounded-full ${
                                  severity === 'critical' ? 'bg-gradient-to-r from-rose-400 to-rose-600' :
                                  severity === 'high' ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                                  severity === 'medium' ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                                  'bg-gradient-to-r from-blue-400 to-blue-500'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Sites affected count badge */}
                          <div className={`shrink-0 flex flex-col items-center justify-center w-11 h-11 rounded-xl border ${
                            severity === 'critical' ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200/60 dark:border-rose-900/60' :
                            severity === 'high' ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-200/60 dark:border-orange-900/60' :
                            severity === 'medium' ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200/60 dark:border-amber-900/60' :
                            'bg-slate-50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800'
                          }`}>
                            <span className={`text-base font-extrabold font-mono leading-none ${
                              severity === 'critical' ? 'text-rose-600 dark:text-rose-400' :
                              severity === 'high' ? 'text-orange-600 dark:text-orange-400' :
                              severity === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                              'text-slate-600 dark:text-slate-300'
                            }`}>{alarm.count}</span>
                            <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wide">sites</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="px-5 py-3 border-t border-border flex items-center gap-4 text-[10px] font-semibold">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" />Critical (7+)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500" />High (5–6)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" />Medium (4)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" />Low</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: PERFORMANCE ANALYTICS */}
          <div className="space-y-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between border-l-4 border-emerald-500 pl-4 py-1">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Performance Analytics
                </h2>
                <p className="text-xs text-muted-foreground">
                  Voltage, current & runtime metrics across operational circles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Run Hours */}
              <WidgetCard title="Run Hours" className="lg:col-span-6" delay={0}>
                <div className="flex flex-col h-full justify-between py-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold font-mono text-foreground">
                        4,215 hrs
                      </div>
                      <span className="text-xs text-emerald-600 font-medium">
                        +8% vs last month
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Mains
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> DG
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Battery
                      </span>
                    </div>
                  </div>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={runHoursData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="mainsBarGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                            <stop offset="100%" stopColor="#1D4ED8" stopOpacity={1} />
                          </linearGradient>
                          <linearGradient id="dgBarGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F87171" stopOpacity={1} />
                            <stop offset="100%" stopColor="#B91C1C" stopOpacity={1} />
                          </linearGradient>
                          <linearGradient id="batteryBarGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C084FC" stopOpacity={1} />
                            <stop offset="100%" stopColor="#7E22CE" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                        <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<PremiumTooltip />} cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }} />
                        <Bar dataKey="mains" name="Mains" fill="url(#mainsBarGrad)" radius={[4, 4, 0, 0]} barSize={12} />
                        <Bar dataKey="dg" name="DG" fill="url(#dgBarGrad)" radius={[4, 4, 0, 0]} barSize={12} />
                        <Bar dataKey="battery" name="Battery" fill="url(#batteryBarGrad)" radius={[4, 4, 0, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </WidgetCard>

              {/* Energy */}
              <WidgetCard title="Energy" className="lg:col-span-6" delay={1}>
                <div className="flex flex-col h-full justify-between py-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold font-mono text-foreground">
                        820M kWh
                      </div>
                      <span className="text-xs text-emerald-600 font-medium">
                        Mains peak this week
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Solar
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Mains
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> DG
                      </span>
                    </div>
                  </div>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={energyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <filter id="glowSolar" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                          <filter id="glowMains" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                        <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<PremiumTooltip />} />
                        <Line type="monotone" name="Solar" dataKey="solar" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "hsl(var(--card))" }} activeDot={{ r: 6, fill: "#F59E0B" }} filter="url(#glowSolar)" />
                        <Line type="monotone" name="Mains" dataKey="mains" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "hsl(var(--card))" }} activeDot={{ r: 6, fill: "#3B82F6" }} filter="url(#glowMains)" />
                        <Line type="monotone" name="DG" dataKey="dg" stroke="#EF4444" strokeWidth={2} strokeDasharray="6 6" dot={false} activeDot={{ r: 5, fill: "#EF4444" }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </WidgetCard>

              {/* Voltage */}
              <WidgetCard title="Voltage" className="lg:col-span-6" delay={2}>
                <div className="flex flex-col h-full justify-between py-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold font-mono text-foreground">
                        51.9V / 48.1V
                      </div>
                      <span className="text-xs text-emerald-600 font-medium">
                        Battery Volt / DC Volt avg
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Battery Volt
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> DC Volt
                      </span>
                    </div>
                  </div>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={voltageTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <filter id="glowBat" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                          <filter id="glowDC" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                        <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <YAxis domain={[45, 55]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<PremiumTooltip />} />
                        <Line type="monotone" name="Battery Volt" dataKey="batteryVolt" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "hsl(var(--card))" }} activeDot={{ r: 6, fill: "#8B5CF6" }} filter="url(#glowBat)" />
                        <Line type="monotone" name="DC Volt" dataKey="dcVolt" stroke="#10B981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "hsl(var(--card))" }} activeDot={{ r: 6, fill: "#10B981" }} filter="url(#glowDC)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </WidgetCard>

              {/* Current */}
              <WidgetCard title="Current" className="lg:col-span-6" delay={3}>
                <div className="flex flex-col h-full justify-between py-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold font-mono text-foreground">
                        150A
                      </div>
                      <span className="text-xs text-amber-600 font-medium">
                        Avg total load
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-slate-100" /> Total Load
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Load 1
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Load 2
                      </span>
                    </div>
                  </div>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <filter id="glowTotal" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                        <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                        <Tooltip content={<PremiumTooltip />} />
                        <Line type="monotone" name="Total Load" dataKey="total" stroke="hsl(var(--foreground))" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "hsl(var(--foreground))" }} filter="url(#glowTotal)" />
                        <Line type="monotone" name="Load 1" dataKey="load1" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#3B82F6" }} />
                        <Line type="monotone" name="Load 2" dataKey="load2" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#10B981" }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </WidgetCard>
            </div>
          </div>

          {/* SECTION 4: SOURCE RUNTIME DISTRIBUTION - PREMIUM NON-BAR DESIGN */}
          <div className="space-y-6 pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-purple-600 pl-4 py-1">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Source Runtime Distribution
                </h2>
                <p className="text-xs text-muted-foreground">
                  Weekly ON-time percentage by power source across monitored circles
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-900/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Fleet Avg Mains: 93%
                </span>
              </div>
            </div>

            {/* 5-Week Telemetry Card Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {sourceRuntimeDistData.map((item, idx) => {
                const isOptimal = item.mains >= 93;
                return (
                  <motion.div
                    key={item.week}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-card border border-border rounded-2xl p-4 shadow-2xs hover:shadow-md hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                  >
                    {/* Header: Week & Status */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono font-extrabold text-sm text-foreground bg-muted px-2.5 py-0.5 rounded-md border border-border/60">
                        {item.week}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isOptimal
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        {isOptimal ? "Optimal" : "Active DG"}
                      </span>
                    </div>

                    {/* Circular Radial Gauge for Mains */}
                    <div className="flex flex-col items-center justify-center my-2">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="hsl(var(--muted))"
                            strokeWidth="8"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={isOptimal ? "#10B981" : "#3B82F6"}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * item.mains) / 100}
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-xl font-extrabold font-mono text-foreground leading-none">
                            {item.mains}%
                          </span>
                          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">
                            Mains
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DG & Battery Sub-bars */}
                    <div className="space-y-2 pt-2 border-t border-border/60 text-xs">
                      {/* DG */}
                      <div>
                        <div className="flex justify-between text-[11px] font-semibold mb-1">
                          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> DG
                          </span>
                          <span className="font-mono font-bold text-rose-500">{item.dg}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.dg / 30) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.2 + idx * 0.05 }}
                            className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Battery */}
                      <div>
                        <div className="flex justify-between text-[11px] font-semibold mb-1">
                          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Battery
                          </span>
                          <span className="font-mono font-bold text-purple-500">{item.battery}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.battery / 30) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + idx * 0.05 }}
                            className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Smooth Telemetry Wave Chart */}
            <WidgetCard title="Source Telemetry Continuous Trend" delay={2}>
              <div className="h-[220px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={sourceRuntimeDistData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="waveMains" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="waveDG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="waveBattery" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                      </linearGradient>
                      <filter id="glowWaveMains" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<PremiumTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="mains"
                      name="Mains ON %"
                      stroke="#10B981"
                      fill="url(#waveMains)"
                      strokeWidth={3}
                      activeDot={{ r: 6, fill: "#10B981", stroke: "hsl(var(--card))", strokeWidth: 2 }}
                      filter="url(#glowWaveMains)"
                    />
                    <Area
                      type="monotone"
                      dataKey="dg"
                      name="DG ON %"
                      stroke="#EF4444"
                      fill="url(#waveDG)"
                      strokeWidth={2.5}
                      activeDot={{ r: 5, fill: "#EF4444" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="battery"
                      name="Battery ON %"
                      stroke="#8B5CF6"
                      fill="url(#waveBattery)"
                      strokeWidth={2.5}
                      activeDot={{ r: 5, fill: "#8B5CF6" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </WidgetCard>
          </div>

          {/* SECTION 5: MONITOR STATUS */}
          <div className="space-y-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between border-l-4 border-sky-500 pl-4 py-1">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Monitor Status
                </h2>
                <p className="text-xs text-muted-foreground">
                  Modem & equipment connectivity telemetry over time
                </p>
              </div>
            </div>

            <WidgetCard title="Modem vs Equipment Status" delay={0}>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={modemVsEquipmentData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="modemGradPrem" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="equipGradPrem" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                      </linearGradient>
                      <filter id="glowAreaModem" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      <filter id="glowAreaEquip" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                    <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<PremiumTooltip />} />
                    <Area type="monotone" dataKey="modem" stroke="#3B82F6" fill="url(#modemGradPrem)" strokeWidth={3} name="Modem Hits" activeDot={{ r: 6, fill: "#3B82F6", stroke: "hsl(var(--card))", strokeWidth: 2 }} filter="url(#glowAreaModem)" />
                    <Area type="monotone" dataKey="equipment" stroke="#10B981" fill="url(#equipGradPrem)" strokeWidth={3} name="Equipment Hits" activeDot={{ r: 6, fill: "#10B981", stroke: "hsl(var(--card))", strokeWidth: 2 }} filter="url(#glowAreaEquip)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </WidgetCard>
          </div>
        </motion.div>
      )}

      {/* TAB 3: PREDICTIVE MAINTENANCE (ENTERPRISE AI SUITE) */}
      {activeTab === "predictive" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* 1. HERO COMMAND HEADER */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-slate-800/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <BrainCircuit className="w-3 h-3 text-indigo-400" />
                    AI Health Engine v4.2
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Learning
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Predictive Maintenance Intelligence
                </h2>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  Continuous AI asset failure forecasting, degradation modeling & proactive maintenance recommendations for telecom fleet resilience.
                </p>

                {/* Metadata Chips */}
                <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    Last model refresh: <strong className="text-white font-mono">12m ago</strong>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Prediction confidence: <strong className="text-emerald-400 font-mono">94.2%</strong>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Gauge className="w-3.5 h-3.5 text-blue-400" />
                    Assets analyzed: <strong className="text-white font-mono">2,847</strong>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    6 active AI recommendations
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold text-xs">
                  <RotateCw className="w-3.5 h-3.5 mr-1.5" /> Refresh Predictions
                </Button>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold text-xs">
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Export Insights
                </Button>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-sm text-xs">
                  <FileText className="w-3.5 h-3.5 mr-1.5" /> Generate Maintenance Report
                </Button>
              </div>
            </div>
          </div>

          {/* 2. SMART FILTER TOOLBAR */}
          <div className="bg-card border border-border rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-muted-foreground flex items-center gap-1 text-[11px] uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5 text-indigo-500" /> Smart Filters:
              </span>
              <div className="bg-muted px-3 py-1.5 rounded-lg border border-border/60 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-muted/80 transition-colors">
                <span>Region: All Regions</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="bg-muted px-3 py-1.5 rounded-lg border border-border/60 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-muted/80 transition-colors">
                <span>Circle: All Circles</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="bg-muted px-3 py-1.5 rounded-lg border border-border/60 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-muted/80 transition-colors">
                <span>Vendor: All Vendors</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="bg-muted px-3 py-1.5 rounded-lg border border-border/60 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-muted/80 transition-colors">
                <span>Risk Level: Critical & High</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="bg-muted px-3 py-1.5 rounded-lg border border-border/60 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-muted/80 transition-colors">
                <span>AMC Status: All</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground font-mono font-semibold">
                Showing 2,847 assets
              </span>
              <Button variant="ghost" size="sm" className="h-7 text-[11px] text-indigo-600 hover:text-indigo-700">
                Reset Filters
              </Button>
            </div>
          </div>

          {/* 3. INTELLIGENT METRIC CARDS (6 CARDS) */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3.5">
            {/* Monitored Assets */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-indigo-500/40 transition-all cursor-default flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Monitored Assets
                </span>
                <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600">
                  <Radio className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-foreground">
                  2,847
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 mt-1">
                  <TrendingUp className="w-3 h-3" /> +2.4% MoM
                </div>
              </div>
            </div>

            {/* Assets Under AMC */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-indigo-500/40 transition-all cursor-default flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Under AMC
                </span>
                <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-foreground">
                  1,423
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-purple-600 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> 50.0% coverage
                </div>
              </div>
            </div>

            {/* AMC Expiring */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-indigo-500/40 transition-all cursor-default flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Expiring AMC
                </span>
                <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600">
                  <Clock className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-amber-600">
                  312
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded w-fit mt-1">
                  Action needed
                </div>
              </div>
            </div>

            {/* Predicted Failures */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-indigo-500/40 transition-all cursor-default flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Predicted Failures
                </span>
                <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950 text-red-600">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-red-600">
                  23
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-red-600 mt-1">
                  <TrendingDown className="w-3 h-3" /> Critical urgency
                </div>
              </div>
            </div>

            {/* Fleet Composite Health */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-indigo-500/40 transition-all cursor-default flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Fleet Health
                </span>
                <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                  <Activity className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-emerald-600">
                  76.8<span className="text-xs text-muted-foreground font-normal">/100</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mt-1">
                  Target: 85.0+
                </div>
              </div>
            </div>

            {/* Maintenance Due */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-indigo-500/40 transition-all cursor-default flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Due This Wk
                </span>
                <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-indigo-600">
                  14
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 mt-1">
                  4 High Priority
                </div>
              </div>
            </div>
          </div>

          {/* 4. AI FLEET HEALTH & RISK DISTRIBUTION DUAL WIDGET */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* AI Fleet Health Scorecard */}
            <div className="lg:col-span-4">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Fleet Health Index</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">AI Composite asset health score</p>
                  </div>
                  <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-900/60 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Model: XGB-Predict v4
                  </span>
                </div>

                {/* Ring & Stats */}
                <div className="flex flex-col items-center justify-center my-4">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={263.8}
                        strokeDashoffset={263.8 - (263.8 * 76.8) / 100}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-extrabold font-mono text-foreground">
                        76.8
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                        / 100 Composite
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sub Telemetry Specs */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border text-center">
                  <div className="bg-muted/50 p-2 rounded-xl border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold">Model Acc.</div>
                    <div className="font-mono font-bold text-xs text-foreground mt-0.5">98.1%</div>
                  </div>
                  <div className="bg-muted/50 p-2 rounded-xl border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold">Confidence</div>
                    <div className="font-mono font-bold text-xs text-emerald-600 mt-0.5">94.2%</div>
                  </div>
                  <div className="bg-muted/50 p-2 rounded-xl border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold">Training</div>
                    <div className="font-mono font-bold text-xs text-foreground mt-0.5">Today 02:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Distribution Horizontal Bar Widget */}
            <div className="lg:col-span-8">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Risk Urgency Distribution</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Assets categorized by predicted failure urgency</p>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 bg-muted px-2.5 py-1 rounded-lg">
                    2,847 Assets Total
                  </span>
                </div>

                <div className="space-y-4 my-2">
                  {predictiveRiskDistribution.map((item, idx) => (
                    <div key={item.level} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.level} Urgency</span>
                        </span>
                        <div className="flex items-center gap-3 font-mono text-[11px]">
                          <span className="text-muted-foreground font-medium">{item.pct}%</span>
                          <span className="font-bold text-foreground w-16 text-right">
                            {item.count.toLocaleString()} sites
                          </span>
                        </div>
                      </div>
                      <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.pct}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.08, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border text-[11px] text-muted-foreground">
                  <span>🔴 Critical (&lt;48h failure risk)</span>
                  <span>🟠 High (&lt;7d failure risk)</span>
                  <span>🟢 Healthy (No maintenance required)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. ACTIONABLE AI RECOMMENDATIONS PANEL */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">AI Actionable Recommendations</h3>
                  <p className="text-xs text-muted-foreground">High-impact predictive interventions generated by AI model</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 border border-indigo-200 dark:border-indigo-900/60">
                  6 Recommendations Available
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiRecommendationsList.map((rec, idx) => {
                const isCrit = rec.priority === "Critical";
                const isHigh = rec.priority === "High";
                return (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className={`bg-slate-50/70 dark:bg-slate-900/40 border rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all duration-200 ${
                      isCrit
                        ? "border-red-200/80 dark:border-red-900/60"
                        : isHigh
                        ? "border-amber-200/80 dark:border-amber-900/60"
                        : "border-slate-200/80 dark:border-slate-800"
                    }`}
                  >
                    <div>
                      {/* Header info */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-bold text-foreground text-xs">{rec.site}</span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                            isCrit
                              ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                              : isHigh
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          }`}
                        >
                          {rec.priority}
                        </span>
                      </div>

                      {/* Action Title */}
                      <h4 className="text-sm font-extrabold text-foreground mb-1.5 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        {rec.action}
                      </h4>

                      {/* Reason */}
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                        {rec.reason}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-border/60">
                      {/* Impact metrics */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white dark:bg-card p-2 rounded-lg border border-border/50">
                          <div className="text-[10px] text-muted-foreground uppercase font-semibold">Est. Savings</div>
                          <div className="font-mono font-bold text-emerald-600 text-xs">{rec.estSavings}</div>
                        </div>
                        <div className="bg-white dark:bg-card p-2 rounded-lg border border-border/50">
                          <div className="text-[10px] text-muted-foreground uppercase font-semibold">Downtime Saved</div>
                          <div className="font-mono font-bold text-indigo-600 text-xs">{rec.downtimeAvoided}</div>
                        </div>
                      </div>

                      {/* AI Confidence & Action button */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                          <BrainCircuit className="w-3 h-3 text-indigo-500" /> {rec.confidence}% confidence
                        </span>
                        <Button
                          size="sm"
                          className={`h-7 text-xs font-semibold ${
                            isCrit
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : isHigh
                              ? "bg-amber-600 hover:bg-amber-700 text-white"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          }`}
                        >
                          {rec.btnLabel}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 6. FAILURE FORECAST TIMELINE & REMAINING USEFUL LIFE (RUL) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Failure Forecast Timeline */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Failure Forecast Timeline</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Predicted component interventions over time</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    Chronological View
                  </Badge>
                </div>

                <div className="space-y-4">
                  {failureTimelineData.map((stage, idx) => (
                    <div key={stage.timeframe} className="flex gap-4 relative">
                      {/* Timeline Node */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 font-bold text-xs flex items-center justify-center z-10 border-2 border-card">
                          {idx + 1}
                        </div>
                        {idx < failureTimelineData.length - 1 && (
                          <div className="w-0.5 flex-1 bg-border my-1" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-extrabold text-xs text-foreground uppercase tracking-wider">
                            {stage.timeframe}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-medium">
                            ({stage.items.length} forecasted risks)
                          </span>
                        </div>

                        <div className="space-y-2">
                          {stage.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-muted/30 text-xs"
                            >
                              <div className="min-w-0">
                                <div className="font-bold text-foreground truncate">{item.site}</div>
                                <div className="text-[11px] text-muted-foreground truncate">
                                  {item.component} — <span className="text-rose-500 font-medium">{item.issue}</span>
                                </div>
                              </div>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0 ${
                                  item.risk === "Critical"
                                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                                    : item.risk === "High"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                                    : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                                }`}
                              >
                                {item.risk}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Component Remaining Useful Life (RUL) */}
            <div className="lg:col-span-5">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Remaining Useful Life (RUL)</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Major asset component longevity estimates</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    AI Degradation Model
                  </Badge>
                </div>

                <div className="space-y-4">
                  {componentRULData.map((item, idx) => (
                    <div key={item.component} className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground">{item.component}</span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-indigo-600 font-bold">{item.rul} RUL</span>
                          <span className="text-muted-foreground text-[10px]">({item.replacementEst})</span>
                        </div>
                      </div>

                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.health}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.08 }}
                          className={`h-full rounded-full ${
                            item.health >= 85
                              ? "bg-emerald-500"
                              : item.health >= 75
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>Health: {item.health}%</span>
                        <span>Confidence: {item.confidence}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border text-[11px] text-muted-foreground text-center">
                  Predictive degradation calculated via continuous discharge & temperature telemetry.
                </div>
              </div>
            </div>
          </div>

          {/* 7. COMPONENT TELEMETRY HEALTH MATRIX & REGIONAL COMPARISON */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Component Telemetry Matrix */}
            <div className="lg:col-span-8">
              <div className="bg-card border border-border rounded-2xl shadow-2xs overflow-hidden h-full flex flex-col justify-between">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Component Telemetry Health Matrix</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Multi-parameter operational degradation matrix</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    5 Components
                  </Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border text-left">
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">Component</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">Voltage</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">Temp</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">Cycles</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">Age</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">Risk Score</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider text-right">Health</th>
                      </tr>
                    </thead>
                    <tbody>
                      {componentMatrixData.map((row) => (
                        <tr key={row.component} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-bold text-foreground">{row.component}</td>
                          <td className="px-4 py-3 font-mono">{row.voltage}</td>
                          <td className="px-4 py-3 font-mono">{row.temp}</td>
                          <td className="px-4 py-3 font-mono">{row.cycles}</td>
                          <td className="px-4 py-3 font-mono">{row.age}</td>
                          <td className="px-4 py-3">
                            <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                              row.risk >= 80 ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" :
                              row.risk >= 50 ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
                              "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            }`}>
                              {row.risk}/100
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-mono font-extrabold text-xs ${
                              row.health >= 85 ? "text-emerald-600" : row.health >= 65 ? "text-amber-600" : "text-red-600"
                            }`}>
                              {row.health}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Color coding: 🔴 Critical (&gt;80) | 🟠 High Risk (50–79) | 🟢 Healthy (&lt;50)</span>
                </div>
              </div>
            </div>

            {/* Regional Health Comparison */}
            <div className="lg:col-span-4">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Regional Health Insights</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Circle health index comparison</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    5 Regions
                  </Badge>
                </div>

                <div className="space-y-3">
                  {regionalHealthComparison.map((reg) => (
                    <div key={reg.region} className="p-2.5 rounded-xl border border-border/60 bg-muted/30 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground">{reg.region} Circle</span>
                        <span className="font-mono font-bold text-indigo-600">{reg.score}% Health</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-muted-foreground">
                        <span>{reg.totalAssets} Assets</span>
                        <span className="text-rose-500 font-medium">{reg.failures} Predicted Failures</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 8. MAINTENANCE CALENDAR & AI FINANCIAL ROI SUMMARY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Maintenance Schedule Calendar */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Maintenance Schedule</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Field engineer task allocations & status</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Plus className="w-3 h-3 mr-1" /> Add Task
                  </Button>
                </div>

                <div className="space-y-2.5">
                  {maintenanceScheduleList.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-slate-50/50 dark:bg-slate-900/30 text-xs">
                      <div>
                        <div className="font-bold text-foreground flex items-center gap-2">
                          <span>{item.site}</span>
                          <span className="text-[10px] font-normal text-muted-foreground">• {item.task}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2">
                          <span>📅 {item.date}</span>
                          <span>👤 Engineer: <strong>{item.engineer}</strong></span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase ${
                        item.priority === "Overdue" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" :
                        item.priority === "High" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
                        "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Cost Savings & Financial ROI */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-md border border-indigo-800/60 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-indigo-700/60 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-emerald-400" />
                      <div>
                        <h3 className="text-sm font-bold text-white">AI Financial Impact & ROI</h3>
                        <p className="text-[11px] text-indigo-200 mt-0.5">Estimated monthly maintenance savings</p>
                      </div>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      +18.4% ROI
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-2">
                    <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                      <div className="text-[10px] text-indigo-200 uppercase font-semibold">Est. Monthly Savings</div>
                      <div className="text-xl font-extrabold font-mono text-emerald-400 mt-1">₹14.2 Lakhs</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                      <div className="text-[10px] text-indigo-200 uppercase font-semibold">Downtime Avoided</div>
                      <div className="text-xl font-extrabold font-mono text-indigo-300 mt-1">148 Hours</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                      <div className="text-[10px] text-indigo-200 uppercase font-semibold">Cost Avoided</div>
                      <div className="text-xl font-extrabold font-mono text-emerald-400 mt-1">₹8.5 Lakhs</div>
                    </div>
                    <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                      <div className="text-[10px] text-indigo-200 uppercase font-semibold">Prevented Failures</div>
                      <div className="text-xl font-extrabold font-mono text-white mt-1">18 Incidents</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-indigo-700/60 text-[11px] text-indigo-200">
                  Calculated based on average outage SLA penalty avoided & extended battery lifespan.
                </div>
              </div>
            </div>
          </div>

          {/* 9. REDESIGNED BATTERY RISK TABLE */}
          <div className="bg-card border border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h3 className="text-base font-bold text-foreground">Battery Health Risks</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Sites ranked by composite risk score & battery telemetry</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Export Risk CSV
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50 border-b border-border text-left">
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase tracking-wider">Site Name</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase tracking-wider">Circle</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase tracking-wider">Voltage</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase tracking-wider">Temp</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase tracking-wider">Battery Age</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase tracking-wider">Last Service</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase tracking-wider">Risk Score</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {predictiveRiskTableData.map((site) => {
                    const isCrit = site.status === "Critical";
                    const isHigh = site.status === "High";
                    return (
                      <tr key={site.site} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-foreground">{site.site}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{site.circle}</td>
                        <td className="px-5 py-3.5 font-mono font-bold text-rose-600">{site.volt}</td>
                        <td className="px-5 py-3.5 font-mono font-bold text-amber-600">{site.temp}</td>
                        <td className="px-5 py-3.5 font-mono">{site.age}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{site.lastService}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  isCrit ? "bg-red-500" : isHigh ? "bg-amber-500" : "bg-emerald-500"
                                }`}
                                style={{ width: `${site.riskScore}%` }}
                              />
                            </div>
                            <span className="font-mono font-bold">{site.riskScore}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                            isCrit ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" :
                            isHigh ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
                            "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isCrit ? "bg-red-500 animate-pulse" : isHigh ? "bg-amber-500" : "bg-emerald-500"}`} />
                            {site.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                            View &gt;
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: SUPPORT TICKETING */}
      {activeTab === "ticketing" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-card border border-border p-4 rounded-xl">
            <div className="text-xs text-muted-foreground uppercase font-semibold">
              Open Incident Tickets
            </div>
            <div className="text-2xl font-mono font-bold mt-1 text-blue-600">
              42
            </div>
          </div>
          <div className="bg-card border border-border p-4 rounded-xl">
            <div className="text-xs text-muted-foreground uppercase font-semibold">
              SLA Compliance %
            </div>
            <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">
              94.8%
            </div>
          </div>
          <div className="bg-card border border-border p-4 rounded-xl">
            <div className="text-xs text-muted-foreground uppercase font-semibold">
              Mean Time to Repair
            </div>
            <div className="text-2xl font-mono font-bold mt-1 text-amber-600">
              2.4 hrs
            </div>
          </div>
          <div className="bg-card border border-border p-4 rounded-xl">
            <div className="text-xs text-muted-foreground uppercase font-semibold">
              SLA Breached
            </div>
            <div className="text-2xl font-mono font-bold mt-1 text-red-600">
              3
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 5: VENDOR INSIGHTS (EXECUTIVE ENTERPRISE ANALYTICS SUITE) */}
      {activeTab === "vendor" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* 1. EXECUTIVE HERO HEADER */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 border border-blue-200 dark:border-blue-900/60 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                    Supplier Intelligence Platform
                  </span>
                  <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200 dark:border-emerald-900/60 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live SLA Sync
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                  Vendor Intelligence & Quality Analytics
                </h2>
                <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                  Supplier performance monitoring, equipment reliability scoring, downtime correlation, and AI procurement optimization across network deployments.
                </p>

                {/* Executive Metadata Chips */}
                <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    Last Sync: <strong className="text-foreground font-mono">2 mins ago</strong>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    Reporting Period: <strong className="text-foreground font-mono">Last 30 Days</strong>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Layers className="w-3.5 h-3.5 text-emerald-500" />
                    Total Vendors: <strong className="text-foreground font-mono">4 Monitored</strong>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    Overall Fleet Score: <strong>91.4 / 100</strong>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">
                  <RotateCw className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> Refresh
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">
                  <Download className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> Export CSV
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">
                  <FileText className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> PDF Report
                </Button>
                <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs">
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Supplier
                </Button>
              </div>
            </div>
          </div>

          {/* 2. SMART FILTER TOOLBAR */}
          <div className="bg-card border border-border rounded-xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-muted-foreground flex items-center gap-1 text-[11px] uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5 text-blue-500" /> Filters:
              </span>
              <div className="bg-muted px-3 py-1.5 rounded-lg border border-border/60 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-muted/80 transition-colors">
                <span>Vendor: All (4)</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="bg-muted px-3 py-1.5 rounded-lg border border-border/60 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-muted/80 transition-colors">
                <span>Region: All Regions</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="bg-muted px-3 py-1.5 rounded-lg border border-border/60 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-muted/80 transition-colors">
                <span>Equipment Type: All Types</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="bg-muted px-3 py-1.5 rounded-lg border border-border/60 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-muted/80 transition-colors">
                <span>Health Grade: All Grades</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="bg-muted px-3 py-1.5 rounded-lg border border-border/60 font-medium flex items-center gap-1.5 cursor-pointer hover:bg-muted/80 transition-colors">
                <span>Warranty Status: All</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground font-mono font-semibold">
                Showing 2,847 units
              </span>
              <Button variant="ghost" size="sm" className="h-7 text-[11px] text-blue-600 hover:text-blue-700">
                Clear Filters
              </Button>
            </div>
          </div>

          {/* 3. EXECUTIVE KPI CARDS GRID (8 CARDS) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {/* Card 1: Total Vendors */}
            <div className="bg-card border border-border rounded-xl p-3.5 shadow-2xs hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Total Vendors</span>
              <div className="mt-2">
                <div className="text-xl font-extrabold font-mono text-foreground">4</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">100% Monitored</div>
              </div>
            </div>

            {/* Card 2: Best Vendor */}
            <div className="bg-card border border-border rounded-xl p-3.5 shadow-2xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Top Supplier</span>
              <div className="mt-2">
                <div className="text-xl font-extrabold font-mono text-emerald-600">Delta</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">96.4% Score (A+)</div>
              </div>
            </div>

            {/* Card 3: Worst Vendor */}
            <div className="bg-card border border-border rounded-xl p-3.5 shadow-2xs hover:border-red-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Lowest Score</span>
              <div className="mt-2">
                <div className="text-xl font-extrabold font-mono text-red-600">Intelux</div>
                <div className="text-[10px] text-red-600 font-semibold mt-0.5">84.7% (Under Review)</div>
              </div>
            </div>

            {/* Card 4: Overall Vendor Score */}
            <div className="bg-card border border-border rounded-xl p-3.5 shadow-2xs hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Fleet Quality</span>
              <div className="mt-2">
                <div className="text-xl font-extrabold font-mono text-foreground">91.4<span className="text-xs font-normal text-muted-foreground">/100</span></div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">+1.8 pts MoM</div>
              </div>
            </div>

            {/* Card 5: Average Uptime */}
            <div className="bg-card border border-border rounded-xl p-3.5 shadow-2xs hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Avg Uptime</span>
              <div className="mt-2">
                <div className="text-xl font-extrabold font-mono text-blue-600">98.2%</div>
                <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">Target: &gt;98.0%</div>
              </div>
            </div>

            {/* Card 6: Equipment Installed */}
            <div className="bg-card border border-border rounded-xl p-3.5 shadow-2xs hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Installed Assets</span>
              <div className="mt-2">
                <div className="text-xl font-extrabold font-mono text-foreground">2,847</div>
                <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">SMPS / SPS / PFLS</div>
              </div>
            </div>

            {/* Card 7: Vendor SLA Compliance */}
            <div className="bg-card border border-border rounded-xl p-3.5 shadow-2xs hover:border-indigo-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">SLA Compliance</span>
              <div className="mt-2">
                <div className="text-xl font-extrabold font-mono text-indigo-600">94.8%</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">5.2% Delayed</div>
              </div>
            </div>

            {/* Card 8: Average MTTR */}
            <div className="bg-card border border-border rounded-xl p-3.5 shadow-2xs hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Avg MTTR</span>
              <div className="mt-2">
                <div className="text-xl font-extrabold font-mono text-amber-600">2.4<span className="text-xs font-normal text-muted-foreground"> hrs</span></div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">-15m vs target</div>
              </div>
            </div>
          </div>

          {/* 4. VENDOR PERFORMANCE SCOREBOARD (RANKED CARDS) */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Vendor Performance Scoreboard</h3>
                <p className="text-xs text-muted-foreground">Ranked operational quality score, reliability & equipment footprint</p>
              </div>
              <Badge variant="outline" className="font-mono text-xs font-semibold">
                Ranked #1 to #4
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vendorIntelligenceScoreboard.map((v, idx) => (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  className="bg-slate-50/70 dark:bg-slate-900/40 border border-border rounded-2xl p-4 flex flex-col justify-between hover:shadow-md hover:border-blue-500/40 transition-all duration-200"
                >
                  <div>
                    {/* Top row: Rank & Name */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 font-extrabold text-xs flex items-center justify-center shrink-0">
                          #{idx + 1}
                        </span>
                        <div>
                          <h4 className="font-extrabold text-foreground text-sm leading-tight">{v.name}</h4>
                          <span className="text-[10px] text-muted-foreground">{v.fullName}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        v.grade === "A+" || v.grade === "A"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : v.grade === "B+"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                      }`}>
                        {v.grade} Grade
                      </span>
                    </div>

                    {/* Score Bar */}
                    <div className="space-y-1 my-3 bg-white dark:bg-card p-2.5 rounded-xl border border-border/50">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground font-semibold">Performance Score</span>
                        <span className="font-mono font-extrabold text-sm text-foreground">{v.score}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${v.score}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.08 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: v.color }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Grid details */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border/60">
                    <div className="bg-muted/50 p-2 rounded-lg">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Reliability</span>
                      <span className="font-mono font-bold text-foreground text-xs">{v.reliability}%</span>
                    </div>
                    <div className="bg-muted/50 p-2 rounded-lg">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Market Share</span>
                      <span className="font-mono font-bold text-foreground text-xs">{v.marketShare}% ({v.equipmentCount})</span>
                    </div>
                    <div className="bg-muted/50 p-2 rounded-lg">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Avg Uptime</span>
                      <span className="font-mono font-bold text-emerald-600 text-xs">{v.uptime}</span>
                    </div>
                    <div className="bg-muted/50 p-2 rounded-lg">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Maint. Cost</span>
                      <span className="font-mono font-bold text-foreground text-xs">{v.maintCost}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 5. MARKET SHARE LEADERBOARD & EQUIPMENT COMPOSITION MATRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Market Share Ranked Bars (No Donut Chart) */}
            <div className="lg:col-span-5">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Market Share Leaderboard</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Network deployment share by vendor</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    2,847 Total Units
                  </Badge>
                </div>

                <div className="space-y-4">
                  {vendorIntelligenceScoreboard.map((v, idx) => (
                    <div key={v.name} className="space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v.color }} />
                          {v.fullName}
                        </span>
                        <span className="font-mono font-bold text-foreground">
                          {v.marketShare}% <span className="text-muted-foreground font-normal">({v.equipmentCount} units)</span>
                        </span>
                      </div>
                      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${v.marketShare}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.08 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: v.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Delta dominates network with 48% total footprint.</span>
                </div>
              </div>
            </div>

            {/* Equipment Composition Matrix */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-2xl shadow-2xs overflow-hidden h-full flex flex-col justify-between">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Equipment Composition Matrix</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Vendor breakdown across hardware asset types</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    6 Asset Categories
                  </Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border text-left">
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">Vendor</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">SMPS</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">SPS</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">PFLS</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">Battery</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">Rectifier</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider">Controller</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase tracking-wider text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {equipmentMatrixData.map((row) => (
                        <tr key={row.vendor} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-bold text-foreground">{row.vendor}</td>
                          <td className="px-4 py-3 font-mono">{row.smps}</td>
                          <td className="px-4 py-3 font-mono">{row.sps}</td>
                          <td className="px-4 py-3 font-mono">{row.pfls}</td>
                          <td className="px-4 py-3 font-mono">{row.battery}</td>
                          <td className="px-4 py-3 font-mono">{row.rectifier}</td>
                          <td className="px-4 py-3 font-mono">{row.controller}</td>
                          <td className="px-4 py-3 text-right font-mono font-extrabold text-blue-600">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Matrix accounts for all active telecommunication power & control units.</span>
                </div>
              </div>
            </div>
          </div>

          {/* 6. VENDOR HEALTH, RELIABILITY & DATA QUALITY ANALYTICS SUITE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Vendor Reliability Suite */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Vendor Reliability Analytics</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Uptime, MTBF, MTTR & SLA compliance metrics</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    Reliability Benchmarks
                  </Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border text-left">
                        <th className="px-3 py-2.5 font-bold text-muted-foreground uppercase">Vendor</th>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground uppercase">Uptime %</th>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground uppercase">MTBF</th>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground uppercase">MTTR</th>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground uppercase">Resp. Time</th>
                        <th className="px-3 py-2.5 font-bold text-muted-foreground uppercase text-right">Quality</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorReliabilitySuite.map((v) => (
                        <tr key={v.vendor} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-3 py-3 font-bold text-foreground">{v.vendor}</td>
                          <td className="px-3 py-3 font-mono font-bold text-emerald-600">{v.uptime}</td>
                          <td className="px-3 py-3 font-mono">{v.mtbf}</td>
                          <td className="px-3 py-3 font-mono text-amber-600">{v.mttr}</td>
                          <td className="px-3 py-3 font-mono">{v.responseTime}</td>
                          <td className="px-3 py-3 text-right font-mono font-extrabold text-blue-600">{v.quality}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Delta achieves fastest response time (18m) and highest MTBF (720h).</span>
                </div>
              </div>
            </div>

            {/* Data Quality & Communication Risks */}
            <div className="lg:col-span-5">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Data Quality & Communication Risks</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Packet loss, CRC & protocol parsing errors</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    Telemetry Audit
                  </Badge>
                </div>

                <div className="space-y-3">
                  {vendorDataQualityErrors.map((err) => (
                    <div key={err.type} className="p-2.5 rounded-xl border border-border/60 bg-slate-50/50 dark:bg-slate-900/30 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-foreground">{err.type}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                          err.severity === "High" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" :
                          err.severity === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
                          "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        }`}>
                          {err.severity} Risk
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground">
                        <span>Delta: <strong className="text-foreground">{err.delta}</strong></span>
                        <span>Vertiv: <strong className="text-foreground">{err.vertiv}</strong></span>
                        <span>VNT: <strong className="text-foreground">{err.vnt}</strong></span>
                        <span>Intelux: <strong className="text-rose-500 font-bold">{err.intelux}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 6.5 INCOMING TELEMETRY DATA VOLUME (ULTRA PREMIUM STREAM WIDGET) */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">Incoming Data Volume Stream (Last 7 Days)</h3>
                  <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200 dark:border-emerald-900/60 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Telemetry Feed
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real-time telemetry packet throughput, signal density & data stream volume breakdown by supplier
                </p>
              </div>

              {/* Live Telemetry Stats Chips */}
              <div className="flex items-center gap-3 flex-wrap text-xs font-semibold">
                <div className="flex items-center gap-1.5 bg-muted/60 border border-border px-3 py-1.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-muted-foreground">Vertiv:</span>
                  <span className="font-mono font-extrabold text-foreground">1,703 pkts/s</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted/60 border border-border px-3 py-1.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-muted-foreground">Delta:</span>
                  <span className="font-mono font-extrabold text-foreground">498 pkts/s</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted/60 border border-border px-3 py-1.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-muted-foreground">Intelux:</span>
                  <span className="font-mono font-extrabold text-foreground">354 pkts/s</span>
                </div>
                <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/70 dark:border-rose-900/60 px-3 py-1.5 rounded-xl text-rose-600">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>VNT:</span>
                  <span className="font-mono font-extrabold">0 pkts/s (Interrupted)</span>
                </div>
              </div>
            </div>

            {/* Glowing Stream Area Chart */}
            <div className="h-[280px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vendorIncomingDataVolumeStream} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="streamVertivGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="streamDeltaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="streamInteluxGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="streamVNTGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                    </linearGradient>
                    <filter id="glowStreamVertiv" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="glowStreamDelta" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<PremiumTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="Vertiv"
                    name="Vertiv Data Stream"
                    stroke="#F59E0B"
                    fill="url(#streamVertivGrad)"
                    strokeWidth={3}
                    activeDot={{ r: 6, fill: "#F59E0B", stroke: "hsl(var(--card))", strokeWidth: 2 }}
                    filter="url(#glowStreamVertiv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Delta"
                    name="Delta Data Stream"
                    stroke="#3B82F6"
                    fill="url(#streamDeltaGrad)"
                    strokeWidth={3}
                    activeDot={{ r: 6, fill: "#3B82F6", stroke: "hsl(var(--card))", strokeWidth: 2 }}
                    filter="url(#glowStreamDelta)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Intelux"
                    name="Intelux Data Stream"
                    stroke="#10B981"
                    fill="url(#streamInteluxGrad)"
                    strokeWidth={2.5}
                    activeDot={{ r: 5, fill: "#10B981" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="VNT"
                    name="VNT Data Stream"
                    stroke="#EF4444"
                    fill="url(#streamVNTGrad)"
                    strokeWidth={2.5}
                    activeDot={{ r: 5, fill: "#EF4444" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="px-2 pt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border">
              <span>Peak data stream recorded on 2026-06-29 with 1,703 pkts/sec from Vertiv equipment.</span>
              <span className="font-semibold text-emerald-600">Avg Ingestion Latency: 14ms</span>
            </div>
          </div>

          {/* 7. SIDE-BY-SIDE VENDOR COMPARISON & RISK MATRIX QUADRANT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Side-by-Side Vendor Comparison */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Side-by-Side Vendor Comparison</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Direct head-to-head operational benchmark</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-1 rounded-md">Delta</span>
                    <span className="text-xs font-bold text-muted-foreground">vs</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded-md">Vertiv</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Performance Score", valA: "96.4%", valB: "92.1%", win: "A" },
                    { label: "Reliability Index", valA: "98.9%", valB: "95.4%", win: "A" },
                    { label: "Average Uptime", valA: "99.2%", valB: "98.4%", win: "A" },
                    { label: "Equipment Footprint", valA: "1,366 units", valB: "797 units", win: "A" },
                    { label: "Mean Time to Repair (MTTR)", valA: "1.5 hrs", valB: "2.2 hrs", win: "A" },
                    { label: "Monthly Maintenance Cost", valA: "₹42,000", valB: "₹68,000", win: "A" },
                    { label: "Warranty Success Rate", valA: "99.1%", valB: "96.5%", win: "A" },
                  ].map((comp, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl border border-border/60 bg-muted/30 flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-600 font-mono w-24">{comp.valA}</span>
                      <span className="font-semibold text-foreground text-center flex-1">{comp.label}</span>
                      <span className="font-bold text-emerald-600 font-mono w-24 text-right">{comp.valB}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vendor Risk Matrix Quadrant */}
            <div className="lg:col-span-5">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Vendor Risk Quadrant</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">2x2 Performance vs Risk matrix</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    Strategic Matrix
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 my-2 text-xs">
                  <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 p-3.5 rounded-2xl">
                    <div className="text-[11px] font-extrabold text-blue-600 uppercase tracking-wider mb-2">Preferred Vendor</div>
                    <div className="font-bold text-foreground text-sm">Delta Electronics</div>
                    <p className="text-[10px] text-muted-foreground mt-1">High Performance (96.4%) & Low Risk.</p>
                  </div>

                  <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60 p-3.5 rounded-2xl">
                    <div className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider mb-2">Monitor Vendor</div>
                    <div className="font-bold text-foreground text-sm">Vertiv Power</div>
                    <p className="text-[10px] text-muted-foreground mt-1">High Performance (92.1%) & Moderate Risk.</p>
                  </div>

                  <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 p-3.5 rounded-2xl">
                    <div className="text-[11px] font-extrabold text-amber-600 uppercase tracking-wider mb-2">High Cost Vendor</div>
                    <div className="font-bold text-foreground text-sm">VNT Telecom</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Moderate Performance (88.5%) & High OPEX.</p>
                  </div>

                  <div className="bg-red-50/70 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/60 p-3.5 rounded-2xl">
                    <div className="text-[11px] font-extrabold text-red-600 uppercase tracking-wider mb-2">Critical Risk</div>
                    <div className="font-bold text-foreground text-sm">Intelux Tech</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Lowest Score (84.7%) & High Alarms.</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border text-[11px] text-muted-foreground text-center">
                  Matrix guides procurement allocation & contract renewal decisions.
                </div>
              </div>
            </div>
          </div>

          {/* 8. PROCUREMENT INSIGHTS & AI VENDOR RECOMMENDATIONS */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Procurement Insights & AI Vendor Recommendations</h3>
                <p className="text-xs text-muted-foreground">Strategic procurement guidance based on hardware performance data</p>
              </div>
              <Badge variant="secondary" className="font-mono text-xs font-bold bg-blue-50 text-blue-600">
                AI Sourcing Engine
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vendorProcurementInsights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-border/60 bg-muted/30 flex flex-col justify-between space-y-3">
                  <div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <h4 className="font-extrabold text-foreground text-sm mt-2">{item.title}</h4>
                    <div className="text-lg font-extrabold font-mono text-blue-600 mt-1">{item.value}</div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs font-semibold w-full">
                    View Vendor Profile
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* 9. REDESIGNED ENTERPRISE VENDOR RANKING TABLE */}
          <div className="bg-card border border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <h3 className="text-base font-bold text-foreground">Enterprise Vendor Ranking Table</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Comprehensive supplier performance, warranty & SLA compliance directory</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Export Full Audit CSV
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50 border-b border-border text-left">
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase">Rank & Vendor</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase">Assets Installed</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase">Market Share</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase">Uptime %</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase">Alarms / mo</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase">Avg Response</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase">Health Score</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase">Grade</th>
                    <th className="px-5 py-3 font-bold text-muted-foreground uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorIntelligenceScoreboard.map((v, idx) => (
                    <tr key={v.name} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-foreground flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 font-extrabold text-[11px] flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <span>{v.fullName}</span>
                      </td>
                      <td className="px-5 py-3.5 font-mono font-semibold">{v.equipmentCount} units</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${v.marketShare}%`, backgroundColor: v.color }} />
                          </div>
                          <span className="font-mono font-bold">{v.marketShare}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-mono font-bold text-emerald-600">{v.uptime}</td>
                      <td className="px-5 py-3.5 font-mono text-rose-600">{idx === 0 ? "120" : idx === 1 ? "240" : idx === 2 ? "410" : "680"}</td>
                      <td className="px-5 py-3.5 font-mono">{idx === 0 ? "18 mins" : idx === 1 ? "28 mins" : idx === 2 ? "42 mins" : "65 mins"}</td>
                      <td className="px-5 py-3.5 font-mono font-extrabold text-blue-600">{v.score}/100</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                          v.grade === "A+" || v.grade === "A" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" :
                          v.grade === "B+" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
                          "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                        }`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold text-blue-600 hover:text-blue-700">
                          Details &gt;
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 6: COST ANALYTICS (EXECUTIVE FINANCIAL INTELLIGENCE SUITE) */}
      {activeTab === "cost" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* 1. EXECUTIVE COST HEADER */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-2xs relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200 dark:border-emerald-900/60 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <IndianRupee className="w-3 h-3 text-emerald-500" />
                    Financial & Energy Cost Intelligence
                  </span>
                  <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 border border-blue-200 dark:border-blue-900/60 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Tier-1 Tariff Model Active
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                  Energy Operational Expense (OPEX) Analytics
                </h2>
                <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                  Real-time power consumption expenditure tracking, multi-source tariff modeling, circle-wise cost allocation, and AI anomaly detection.
                </p>

                {/* Executive Metadata Chips */}
                <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    Updated: <strong className="text-foreground font-mono">10 mins ago</strong>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    Period: <strong className="text-foreground font-mono">Last 30 Days</strong>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    OPEX Efficiency Score: <strong>94.2 / 100</strong>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">
                  <Settings className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> Configure Rates
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">
                  <Download className="w-3.5 h-3.5 mr-1.5 text-slate-500" /> Export Audit CSV
                </Button>
                <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs">
                  <FileText className="w-3.5 h-3.5 mr-1.5" /> Download P&L Report
                </Button>
              </div>
            </div>
          </div>

          {/* 2. FINANCIAL KPI CARDS GRID (6 CARDS) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Total OPEX */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Total Energy OPEX</span>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-mono text-emerald-600">₹ 1.78 L</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> -4.2% vs last month
                </div>
              </div>
            </div>

            {/* Mains Grid Cost */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Mains Grid Cost</span>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-mono text-blue-600">₹ 1.60 L</div>
                <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">89.99% of Total OPEX</div>
              </div>
            </div>

            {/* DG Fuel Cost */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">DG Fuel Expense</span>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-mono text-amber-600">₹ 12.9K</div>
                <div className="text-[10px] text-amber-600 font-semibold mt-0.5">7.26% of Total OPEX</div>
              </div>
            </div>

            {/* Battery Cost */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-rose-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Battery Depr. Cost</span>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-mono text-rose-600">₹ 4.9K</div>
                <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">2.75% of Total OPEX</div>
              </div>
            </div>

            {/* Avg Cost / Site */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-indigo-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Avg Cost / Site</span>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-mono text-indigo-600">₹ 6,838</div>
                <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">26 Sites Monitored</div>
              </div>
            </div>

            {/* AI Cost Savings */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-2xs hover:border-emerald-500/40 transition-all flex flex-col justify-between">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Identified Savings</span>
              <div className="mt-2">
                <div className="text-2xl font-extrabold font-mono text-emerald-600">₹ 24.5K</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">AI Optimization Potential</div>
              </div>
            </div>
          </div>

          {/* 3. COST BREAKDOWN & STACKED MULTI-SOURCE TREND */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Cost Source Contribution Breakdown */}
            <div className="lg:col-span-4">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Cost Breakdown by Source</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Mains vs DG vs Battery expense share</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    Last 30 Days
                  </Badge>
                </div>

                {/* Progress Meters */}
                <div className="space-y-4 my-2">
                  {/* Mains */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-foreground flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Mains Grid
                      </span>
                      <span className="font-mono font-bold text-emerald-600">₹ 1.60 L (89.99%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "89.99%" }} />
                    </div>
                  </div>

                  {/* DG */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-foreground flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Diesel Generator (DG)
                      </span>
                      <span className="font-mono font-bold text-amber-600">₹ 12.9K (7.26%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "7.26%" }} />
                    </div>
                  </div>

                  {/* Battery */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-foreground flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Battery Storage
                      </span>
                      <span className="font-mono font-bold text-rose-600">₹ 4.9K (2.75%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: "2.75%" }} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Mains Grid Rate:</span>
                    <strong className="text-foreground font-mono">₹ 8.20 / kWh</strong>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Diesel Fuel Cost:</span>
                    <strong className="text-foreground font-mono">₹ 94.50 / Liter</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Multi-Source Cost Trend Area Chart */}
            <div className="lg:col-span-8">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">30-Day Energy Cost Trend (Daily Stacked)</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Daily operational expenditure fluctuation across power sources</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1 text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Mains</span>
                    <span className="flex items-center gap-1 text-amber-600"><span className="w-2 h-2 rounded-full bg-amber-500" /> DG</span>
                    <span className="flex items-center gap-1 text-rose-600"><span className="w-2 h-2 rounded-full bg-rose-500" /> Battery</span>
                  </div>
                </div>

                <div className="h-[250px] w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={costTrendDailyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="costMainsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="costDgGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="costBatteryGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <Tooltip content={<PremiumTooltip />} />
                      <Area type="monotone" dataKey="Mains" name="Mains Grid (₹)" stroke="#10B981" fill="url(#costMainsGrad)" strokeWidth={2.5} stackId="1" />
                      <Area type="monotone" dataKey="DG" name="DG Fuel (₹)" stroke="#F59E0B" fill="url(#costDgGrad)" strokeWidth={2.5} stackId="1" />
                      <Area type="monotone" dataKey="Battery" name="Battery Wear (₹)" stroke="#EF4444" fill="url(#costBatteryGrad)" strokeWidth={2} stackId="1" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Peak daily cost recorded on June 06 (₹6,800 total).</span>
                  <span className="font-semibold text-emerald-600">Efficiency Index: 94.2%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. CIRCLE-WISE EXPENDITURE MATRIX & REGIONAL COMPARISON */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Circle-Wise Cost Allocation & Regional OPEX</h3>
                <p className="text-xs text-muted-foreground">Regional energy cost breakdown across telecom operational circles</p>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                4 Circles Analyzed
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {circleWiseCostData.map((circle) => (
                <div key={circle.circle} className="p-4 rounded-2xl border border-border/60 bg-muted/30 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-extrabold text-foreground text-sm">{circle.circle}</h4>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {circle.pct} Share
                      </span>
                    </div>
                    <div className="text-xl font-extrabold font-mono text-emerald-600 mt-1">₹ {circle.total.toLocaleString()}</div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{circle.sites} Sites Monitored</p>
                  </div>

                  {/* Breakdown mini progress */}
                  <div className="space-y-1 text-[11px] font-mono pt-2 border-t border-border/60">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mains Grid:</span>
                      <strong className="text-foreground">₹{circle.mains.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">DG Fuel:</span>
                      <strong className="text-amber-600">₹{circle.dg.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Battery:</span>
                      <strong className="text-rose-600">₹{circle.battery.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. TOP 10 HIGH-COST SITES & COST ANOMALIES ENGINE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Top 10 High-Cost Sites Leaderboard */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-2xl shadow-2xs overflow-hidden h-full flex flex-col justify-between">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Top 10 High-Cost Sites Leaderboard</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Highest OPEX telecom tower sites</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    Top Expenditure Sites
                  </Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border text-left">
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase">Rank & Site Name</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase">Mains Cost</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase">DG Fuel</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase">Battery</th>
                        <th className="px-4 py-3 font-bold text-muted-foreground uppercase text-right">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {top10HighCostSitesData.map((s, idx) => (
                        <tr key={s.site} className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-bold text-foreground flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 font-extrabold text-[10px] flex items-center justify-center">
                              #{idx + 1}
                            </span>
                            <span>{s.site}</span>
                          </td>
                          <td className="px-4 py-3 font-mono">₹{s.mains.toLocaleString()}</td>
                          <td className="px-4 py-3 font-mono text-amber-600">₹{s.dg.toLocaleString()}</td>
                          <td className="px-4 py-3 font-mono text-rose-600">₹{s.battery.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-mono font-extrabold text-emerald-600">₹{s.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-5 py-3 border-t border-border text-[11px] text-muted-foreground">
                  UDPR-PREM NAGAR accounts for 44.1% of total network energy expenditure.
                </div>
              </div>
            </div>

            {/* Cost Anomalies (Spikes) & Leakage Detection */}
            <div className="lg:col-span-5">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs h-full flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">AI Cost Anomalies & Spikes</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Automated detection of abnormal energy cost spikes</p>
                  </div>
                  <span className="bg-amber-50 dark:bg-amber-950 text-amber-600 border border-amber-200 dark:border-amber-900/60 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    3 Anomalies Detected
                  </span>
                </div>

                <div className="space-y-3">
                  {costAnomaliesSpikesData.map((anomaly, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-border/60 bg-slate-50/50 dark:bg-slate-900/30 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground">{anomaly.site}</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                          {anomaly.deviation} Deviation
                        </span>
                      </div>
                      <div className="flex justify-between items-center font-mono text-[11px] text-muted-foreground">
                        <span>Date: <strong className="text-foreground">{anomaly.date}</strong></span>
                        <span>Cost: <strong className="text-rose-600 font-bold">{anomaly.cost}</strong></span>
                        <span>Avg 7d: <strong>{anomaly.avg7d}</strong></span>
                      </div>
                      <p className="text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                        Root Cause: <strong className="text-foreground">{anomaly.driver}</strong>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border text-[11px] text-muted-foreground text-center">
                  AI engine automatically flags cost spikes exceeding +50% of 7-day moving average.
                </div>
              </div>
            </div>
          </div>

          {/* 6. AI COST SAVINGS & OPTIMIZATION OPPORTUNITIES */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-foreground">AI Energy Savings & OPEX Optimization Opportunities</h3>
                <p className="text-xs text-muted-foreground">Actionable interventions to reduce monthly energy expenditure</p>
              </div>
              <Badge variant="secondary" className="font-mono text-xs font-bold bg-emerald-50 text-emerald-600">
                Potential: ₹24,500 / mo
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-border/60 bg-muted/30 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
                    High Savings Impact
                  </span>
                  <h4 className="font-extrabold text-foreground text-sm mt-2">Deploy Solar Hybrid at UDPR-PREM NAGAR</h4>
                  <div className="text-lg font-extrabold font-mono text-emerald-600 mt-1">Save ₹18,200 / mo</div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    High grid downtime site relying heavily on Mains grid. Solar hybrid integration reduces monthly OPEX by 23%.
                  </p>
                </div>
                <Button size="sm" className="h-7 text-xs font-semibold w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Execute Solar Proposal
                </Button>
              </div>

              <div className="p-4 rounded-2xl border border-border/60 bg-muted/30 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 uppercase">
                    Automation Optimization
                  </span>
                  <h4 className="font-extrabold text-foreground text-sm mt-2">Optimize DG Auto-Start Delay (30s to 120s)</h4>
                  <div className="text-lg font-extrabold font-mono text-blue-600 mt-1">Save ₹4,800 / mo</div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Extending DG start delay prevents unnecessary engine ignitions during momentary grid dips across Rajasthan sites.
                  </p>
                </div>
                <Button size="sm" variant="outline" className="h-7 text-xs font-semibold w-full">
                  Apply Timer Setting
                </Button>
              </div>

              <div className="p-4 rounded-2xl border border-border/60 bg-muted/30 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 uppercase">
                    Tariff Optimization
                  </span>
                  <h4 className="font-extrabold text-foreground text-sm mt-2">Peak Shaving via Lithium Battery Bank</h4>
                  <div className="text-lg font-extrabold font-mono text-indigo-600 mt-1">Save ₹3,500 / mo</div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Discharge lithium storage during peak grid tariff hours (6 PM - 10 PM) in Maharashtra circle to lower energy rates.
                  </p>
                </div>
                <Button size="sm" variant="outline" className="h-7 text-xs font-semibold w-full">
                  Enable Peak Shaving
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
