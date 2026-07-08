import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Activity,
  Bell,
  Camera,
  Boxes,
  FileText,
  Settings,
  Battery,
  Zap,
  Sun,
  Shield,
  Wind,
  Layers,
  Thermometer,
  Play,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Compass,
  Cpu,
  Tv,
  HardDrive,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Download,
  Calendar,
  Share2,
  Lock,
  Plus,
  Edit,
  Trash,
  Check,
  ToggleLeft,
  ToggleRight,
  Search,
  ChevronDown,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Set up custom marker icon for Leaflet
const getMarkerIcon = (status: string) => {
  const color =
    status === "CRITICAL"
      ? "#ef4444"
      : status === "ALARMS"
      ? "#f59e0b"
      : status === "NO DATA"
      ? "#64748b"
      : "#10b981";

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 8px ${color}; animate: pulse 2s infinite;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

interface SiteDashboardProps {
  site: {
    id: string;
    name: string;
    equipment: string;
    vendor: "Vertiv" | "Delta" | "Intelux" | "N/A";
    status: "ONLINE" | "NO DATA" | "ALARMS" | "CRITICAL";
    reported: string;
    source: "Mains" | "Battery" | "DG" | "N/A";
    mainsHours: number;
    mainsPct: number;
    dgHours: number;
    dgPct: number;
    battHours: number;
    battPct: number;
    score: number;
    circle: string;
    loadKw: string;
  };
  onBack: () => void;
}

export default function SiteDashboard({ site, onBack }: SiteDashboardProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "alarms" | "gallery" | "inventory" | "report" | "settings">("dashboard");
  const [mapMounted, setMapMounted] = useState(false);
  const [settingsMapMounted, setSettingsMapMounted] = useState(false);
  const [activeChartMetric, setActiveChartMetric] = useState<"power" | "current" | "voltage">("power");
  const [galleryLightboxImage, setGalleryLightboxImage] = useState<string | null>(null);
  const [energySubTab, setEnergySubTab] = useState<"data" | "trend">("data");
  const [smpsDetailOpen, setSmpsDetailOpen] = useState(false);
  const [smpsTab, setSmpsTab] = useState<"overview" | "trends">("overview");
  const [globalSiteEnabled, setGlobalSiteEnabled] = useState(true);

  // Initialize and sync tab state with URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabFromUrl = params.get("tab") as any;
    const validTabs = ["dashboard", "alarms", "gallery", "inventory", "report", "settings"];
    if (validTabs.includes(tabFromUrl) && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("tab") !== activeTab) {
      params.set("tab", activeTab);
      window.history.replaceState({}, "", window.location.pathname + "?" + params.toString());
    }
  }, [activeTab]);

  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const tabFromUrl = params.get("tab") as any;
      const validTabs = ["dashboard", "alarms", "gallery", "inventory", "report", "settings"];
      if (validTabs.includes(tabFromUrl) && tabFromUrl !== activeTab) {
        setActiveTab(tabFromUrl);
      }
    };
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, [activeTab]);

  useEffect(() => {
    setMapMounted(true);
  }, []);

  useEffect(() => {
    if (activeTab === "settings") {
      setTimeout(() => setSettingsMapMounted(true), 100);
    }
  }, [activeTab]);

  // Reproducible site stats & telemetry details based on Site ID
  const seed = parseInt(site.id) || 12345;
  const ipAddress = `10.128.${(seed % 250) + 1}.${(seed % 254) + 1}`;
  const macAddress = `70:6D:EC:${(seed % 89 + 10).toString(16).toUpperCase()}:${(seed % 79 + 10).toString(16).toUpperCase()}:${(seed % 69 + 10).toString(16).toUpperCase()}`;
  const lat = 24.5854 + ((seed % 100) - 50) * 0.003;
  const lng = 73.7125 + ((seed % 79) - 40) * 0.003;
  
  // Custom Dynamic Telemetry values
  const smpsLoad = parseFloat(site.loadKw) || 2.5;
  const solarLoad = (seed % 2 === 0) ? (smpsLoad * 0.3).toFixed(1) : "0.0";
  const batteryVoltage = (54.2 - (seed % 10) * 0.1).toFixed(1);
  const roomTemperature = (24.5 + (seed % 8) * 0.5).toFixed(1);

  // Alarm logs specifically for this site
  const siteAlarms = [
    { id: "ALM-9801", name: "Door Sensor Open Alert", severity: "MINOR", status: "Open", time: "10 mins ago", code: "DOR-01" },
    { id: "ALM-9802", name: "Rectifier Module 2 Faulty", severity: "MAJOR", status: "Investigating", time: "1 hour ago", code: "REC-02" },
    ...(site.status === "CRITICAL" ? [{ id: "ALM-9803", name: "Critical Battery Voltage Low", severity: "CRITICAL", status: "Assigned", time: "25 mins ago", code: "BAT-03" }] : []),
    ...(site.status === "ALARMS" ? [{ id: "ALM-9804", name: "Mains Fail Alarm Triggered", severity: "MAJOR", status: "Open", time: "5 mins ago", code: "MNS-01" }] : []),
  ];

  // Grid / DG Voltage stats
  const rPhaseVolts = 230 + (seed % 15);
  const yPhaseVolts = 228 + (seed % 12);
  const bPhaseVolts = 232 + (seed % 17);
  const rPhaseAmps = 12 + (seed % 8);
  const yPhaseAmps = 14 + (seed % 7);
  const bPhaseAmps = 11 + (seed % 9);

  // Inventory assets details
  const inventoryList = [
    { name: "Vertiv SMPS 48V Controller", model: "NetSure 731 A91", serial: "VT-90291038", date: "2024-04-12", status: "Active" },
    { name: "Delta Solar Power System Controller", model: "Orion Controller", serial: "DL-88192801", date: "2025-01-20", status: "Active" },
    { name: "Exide 48V 600Ah VRLA Battery Bank", model: "6-BAT-600", serial: "EX-7788102", date: "2023-11-05", status: "Active" },
    { name: "Cummins 15kVA DG Controller Unit", model: "PowerStart 500", serial: "CM-229104", date: "2023-08-15", status: "Active" },
    { name: "Daikin Split Air Conditioner 1.5 Ton", model: "FTKF50TV", serial: "DK-009181", date: "2024-06-10", status: "Active" },
  ];

  // Weekly run hour charts (stacked data)
  const reportChartData = [
    { name: "Week 1", Grid: 145, DG: 15, Battery: 8 },
    { name: "Week 2", Grid: 152, DG: 10, Battery: 6 },
    { name: "Week 3", Grid: 138, DG: 22, Battery: 8 },
    { name: "Week 4", Grid: 148, DG: 12, Battery: 8 },
    { name: "Week 5", Grid: 155, DG: 8, Battery: 5 },
  ];

  // Dynamic values for charts
  const liveChartData = Array.from({ length: 12 }, (_, i) => {
    const minVal = 48 + (seed % 5);
    const maxVal = 55 + (seed % 3);
    const hour = `${(9 + i) % 12 || 12}:00 ${9 + i >= 12 ? "PM" : "AM"}`;
    return {
      time: hour,
      voltage: (parseFloat(batteryVoltage) + Math.sin(i) * 0.4).toFixed(1),
      current: (rPhaseAmps + Math.cos(i) * 1.5).toFixed(1),
      load: (smpsLoad + Math.sin(i * 1.5) * 0.2).toFixed(2),
    };
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-xl border-slate-200/80 dark:border-slate-800 dark:hover:bg-slate-800/80 shadow-xs transition-transform hover:-translate-x-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Button>
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="cursor-pointer hover:text-blue-600" onClick={onBack}>Monitor</span>
              <span>&gt;</span>
              <span className="text-slate-400 dark:text-slate-500">Site Dashboard</span>
              <span>&gt;</span>
              <span className="text-slate-900 dark:text-slate-200 font-bold">{site.name}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mt-1 text-slate-900 dark:text-foreground flex items-center gap-3">
              {site.name}
              <span className="text-sm font-normal text-slate-400 dark:text-slate-500 font-mono">
                #{site.id}
              </span>
            </h1>
          </div>
        </div>

        {/* Site Quick Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-lg border-slate-200/80 dark:border-slate-800 font-semibold cursor-pointer">
            <Share2 className="w-4 h-4 text-slate-500" /> Share
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-lg border-slate-200/80 dark:border-slate-800 font-semibold cursor-pointer">
            <Download className="w-4 h-4 text-slate-500" /> Export Data
          </Button>
          <Button size="sm" className="h-9 gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm cursor-pointer">
            <Clock className="w-4 h-4" /> Live Sync
          </Button>
        </div>
      </div>

      {/* Hero Overview Info Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Stats Info Card */}
        <Card className="xl:col-span-8 overflow-hidden border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card relative">
          {/* Status color indicator ribbon */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1.5" 
            style={{ 
              backgroundColor: 
                site.status === "CRITICAL" ? "#ef4444" : 
                site.status === "ALARMS" ? "#f59e0b" : 
                site.status === "NO DATA" ? "#64748b" : "#10b981" 
            }} 
          />

          <CardContent className="p-6 pl-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Site Details */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge 
                    className={`font-semibold rounded-md border-0 px-2.5 py-1 ${
                      site.status === "CRITICAL" ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400" :
                      site.status === "ALARMS" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" :
                      site.status === "NO DATA" ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" :
                      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full mr-1.5 inline-block" style={{ 
                      backgroundColor: 
                        site.status === "CRITICAL" ? "#ef4444" : 
                        site.status === "ALARMS" ? "#f59e0b" : 
                        site.status === "NO DATA" ? "#64748b" : "#10b981" 
                    }} />
                    {site.status}
                  </Badge>
                  
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Last seen {site.reported}
                  </span>
                </div>

                {/* Primary Site Info Columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">IP ADDRESS</span>
                    <span className="font-mono text-sm text-slate-800 dark:text-slate-200 font-semibold">{ipAddress}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">MAC ID</span>
                    <span className="font-mono text-sm text-slate-800 dark:text-slate-200 font-semibold">{macAddress}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">CIRCLE & REGION</span>
                    <span className="text-sm text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" /> {site.circle}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">CURRENT LOAD</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 font-bold">{site.loadKw}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">PRIMARY CONTROLLER</span>
                    <span className="text-sm text-slate-800 dark:text-slate-200 font-semibold">{site.equipment}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">MAIN MANUFACTURER</span>
                    <span className="text-sm text-slate-800 dark:text-slate-200 font-semibold">{site.vendor}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-3.5 mt-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">SITE ADDRESS</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5 inline-block">
                    Jio Telecom Tower Complex, Baner Zone, Udaipur Division, {site.circle}, India
                  </span>
                </div>
              </div>

              {/* Styled CCTV Camera mockup block */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="w-full sm:w-60 h-40 rounded-xl overflow-hidden relative border border-slate-200/80 dark:border-slate-800 bg-slate-950 flex flex-col items-center justify-center shadow-inner group">
                  <div className="absolute top-3 left-3 bg-red-600 text-[10px] font-bold text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm z-10 select-none animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                    CAM-01 LIVE
                  </div>
                  
                  {/* Styled visual Tower CCTV vector overlay */}
                  <div className="opacity-40 group-hover:opacity-60 transition-opacity duration-300 flex flex-col items-center gap-2 text-white">
                    <Tv className="w-12 h-12 stroke-[1.5]" />
                    <span className="text-[10px] font-mono tracking-wider font-semibold">SITE SECURITY FEED</span>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-3 select-none">
                    <span className="text-[9px] text-slate-400 font-mono">10.128.84.19</span>
                    <span className="text-[9px] text-slate-400 font-mono">2026-07-08 13:01</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Live Map Location */}
        <Card className="xl:col-span-4 overflow-hidden border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
          <CardHeader className="p-4 border-b border-slate-100 dark:border-slate-800">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-blue-500" /> Geographic Location
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-44 relative bg-slate-100 dark:bg-slate-900">
            {mapMounted ? (
              <MapContainer
                center={[lat, lng]}
                zoom={14}
                className="w-full h-full z-0"
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[lat, lng]} icon={getMarkerIcon(site.status)}>
                  <Popup>
                    <div className="p-1">
                      <h4 className="font-bold text-xs">{site.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">ID: {site.id}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                Loading Map...
              </div>
            )}
            {/* Coordinates Badge */}
            <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-slate-950/95 px-2 py-1 rounded-md border border-slate-200/80 dark:border-slate-800 font-mono text-[9px] font-bold text-slate-600 dark:text-slate-300 z-10 shadow-xs select-none">
              {lat.toFixed(5)}, {lng.toFixed(5)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex items-center border-b border-slate-200/80 dark:border-slate-800 mt-2 select-none overflow-x-auto scrollbar-none">
        {(["dashboard", "alarms", "gallery", "inventory", "report", "settings"] as const).map((tab) => {
          const isActive = activeTab === tab;
          const label = tab.charAt(0).toUpperCase() + tab.slice(1);
          const Icon = 
            tab === "dashboard" ? Activity : 
            tab === "alarms" ? Bell : 
            tab === "gallery" ? Camera : 
            tab === "inventory" ? Boxes : 
            tab === "report" ? FileText : Settings;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3.5 border-b-2 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap outline-none ${
                isActive 
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold" 
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300"
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`} />
              {label}
              {tab === "alarms" && siteAlarms.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white leading-none">
                  {siteAlarms.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ==================== SMPS DETAIL DASHBOARD ==================== */}
      {smpsDetailOpen && (() => {
        const vendor = site.vendor !== "N/A" ? site.vendor : "Delta";
        const hours = seed % 100 + 400;
        const dgRunHrs = (site.dgHours + 57.3).toFixed(1);
        const mainsRunHrs = (site.mainsHours + 3349.7).toFixed(1);
        const battRunHrs = (site.battHours + 1598.6).toFixed(1);
        const loadCurrent = (60.1 + seed % 10).toFixed(1);
        const battTemp = seed % 5;
        const serialNo = `VT-${90000000 + seed}`;
        const lastReported = new Date().toLocaleString("sv-SE").replace("T", " ").slice(0, 16);

        // Trend data
        const pts = Array.from({length: 24}, (_,i) => i);
        const battVoltageData = pts.map(i => ({ t: `${String(i).padStart(2,"0")}:00`, V: (parseFloat(batteryVoltage) + Math.sin(i * 0.6) * 2.5 + Math.cos(i * 0.3) * 1.2).toFixed(1) }));
        const energyData = pts.map(i => ({ t: `${String(i).padStart(2,"0")}:00`, kWh: (1.2 + Math.sin(i * 0.4) * 0.8 + Math.random() * 0.2).toFixed(2) }));
        const powerData = pts.map(i => ({ t: `${String(i).padStart(2,"0")}:00`, L1: (1200 + Math.sin(i * 0.5) * 300 + Math.random() * 150).toFixed(0), L2: (800 + Math.cos(i * 0.7) * 200 + Math.random() * 100).toFixed(0) }));
        const tempData = pts.map(i => ({ t: `${String(i).padStart(2,"0")}:00`, C: (24 + Math.sin(i * 0.4) * 4 + Math.random() * 1).toFixed(1) }));

        const tooltipStyle = { backgroundColor: "rgba(15,23,42,0.97)", borderRadius: "10px", border: "none", color: "white", fontSize: "11px", padding: "10px 14px" };

        return (
          <div className="flex flex-col gap-6 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setSmpsDetailOpen(false)}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-xl border-slate-200/80 dark:border-slate-800 shadow-xs transition-transform hover:-translate-x-0.5 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </Button>
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <span className="cursor-pointer hover:text-blue-600" onClick={() => setSmpsDetailOpen(false)}>Dashboard</span>
                    <span>&gt;</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">SMPS Equipment</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground">{vendor} Dashboard</h1>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono text-slate-400">Slave ID: 1</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">ONLINE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-lg border-slate-200/80 dark:border-slate-800 font-semibold cursor-pointer">
                  <Download className="w-4 h-4 text-slate-500" /> Export CSV
                </Button>
                <Button
                  onClick={() => setSmpsTab(smpsTab === "overview" ? "trends" : "overview")}
                  size="sm"
                  className={`h-9 gap-1.5 rounded-lg font-semibold cursor-pointer ${smpsTab === "trends" ? "bg-violet-600 hover:bg-violet-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                >
                  {smpsTab === "overview" ? <><TrendingUp className="w-4 h-4" /> View Trends</> : <><Zap className="w-4 h-4" /> Overview</>}
                </Button>
              </div>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1 border border-slate-200/80 dark:border-slate-800 rounded-xl p-1 bg-slate-50/50 dark:bg-slate-900/30 self-start">
              {[{k:"overview" as const, label:"Overview", icon:<Cpu className="w-3.5 h-3.5"/>},{k:"trends" as const, label:"Trends", icon:<TrendingUp className="w-3.5 h-3.5"/>}].map(t=>(
                <button key={t.k} onClick={()=>setSmpsTab(t.k)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${smpsTab===t.k ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
                >{t.icon}{t.label}</button>
              ))}
            </div>

            {/* ======= OVERVIEW TAB ======= */}
            {smpsTab === "overview" && (
              <div className="flex flex-col gap-5">

                {/* ── HERO IDENTITY STRIP ── */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800/60 shadow-xl">
                  {/* decorative grid */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)'}} />
                  <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-blue-600/10 -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-violet-600/10 translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
                  <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 p-6">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/30 border border-blue-400/20 flex items-center justify-center shadow-lg">
                      <HardDrive className="w-10 h-10 text-blue-300" strokeWidth={1.2} />
                    </div>
                    {/* Identity */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400/70">SMPS Equipment</span>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Slave ID: 1</span>
                      </div>
                      <h2 className="text-3xl font-black text-white tracking-tight">{vendor} <span className="text-blue-400 font-light">Dashboard</span></h2>
                      <p className="text-slate-400 text-xs mt-1.5 font-mono">Model: New(Bi) ATC · Type: SMPS · Serial: {serialNo}</p>
                    </div>
                    {/* Status pills */}
                    <div className="flex flex-col gap-2 items-end">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">Connected</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25">
                        <Clock className="w-3 h-3 text-blue-300" />
                        <span className="text-xs font-bold text-blue-300 font-mono">Last sync: just now</span>
                      </div>
                    </div>
                  </div>
                  {/* Horizontal stats belt */}
                  <div className="relative border-t border-white/5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                    {[
                      {l:"Run Hours", v:`${hours}`, u:"hrs", accent:"text-blue-300"},
                      {l:"Software", v:"v4.2.1", u:"", accent:"text-violet-300"},
                      {l:"Manufacturer", v: vendor, u:"", accent:"text-teal-300"},
                      {l:"Last Report", v: lastReported, u:"", accent:"text-amber-300"},
                    ].map(s=>(
                      <div key={s.l} className="flex flex-col px-5 py-3.5">
                        <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1">{s.l}</span>
                        <span className={`text-sm font-black font-mono ${s.accent}`}>{s.v}<span className="text-xs font-semibold ml-0.5 text-slate-400">{s.u}</span></span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── LIVE PARAMETERS + DEVICE INFO ── */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">

                  {/* Device Info — left narrow col */}
                  <Card className="xl:col-span-4 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs overflow-hidden">
                    <div className="flex items-center gap-2 p-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-rose-400 to-rose-600" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Device Information</span>
                    </div>
                    <CardContent className="p-0">
                      {[
                        {l:"Product Serial Number", v: serialNo},
                        {l:"Product Software Version", v:"v4.2.1"},
                        {l:"Manufacturer", v: vendor},
                        {l:"Type", v:"SMPS"},
                        {l:"Make", v: vendor, hi:true},
                        {l:"Model", v:"New(Bi) ATC"},
                        {l:"Last Reported On", v: lastReported},
                      ].map((row,i)=>(
                        <div key={row.l} className={`flex items-center justify-between px-5 py-3 ${i % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-900/20' : ''}`}>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500">{row.l}</span>
                          <span className={`text-xs font-black font-mono ${row.hi ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{row.v}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Live Parameters — right wide col */}
                  <div className="xl:col-span-8 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-amber-400 to-orange-600" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Live Parameters</span>
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping ml-1" />
                    </div>
                    {/* Voltage row — 3 wide cards */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {l:"Main Voltage R", v: rPhaseVolts, u:"V", from:"#059669", to:"#0d9488"},
                        {l:"Main Voltage Y", v: yPhaseVolts, u:"V", from:"#059669", to:"#0d9488"},
                        {l:"Main Voltage B", v: bPhaseVolts, u:"V", from:"#059669", to:"#0d9488"},
                      ].map(m=>(
                        <div key={m.l} className="relative overflow-hidden rounded-xl p-4 flex flex-col gap-1" style={{background:`linear-gradient(135deg,${m.from},${m.to})`}}>
                          <div className="absolute top-0 right-0 w-12 h-12 rounded-full opacity-20" style={{background:m.to, filter:'blur(16px)'}} />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">{m.l}</span>
                          <div className="flex items-end gap-1">
                            <span className="text-3xl font-black text-white leading-none">{m.v}</span>
                            <span className="text-sm font-bold text-white/70 mb-0.5">{m.u}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Run hours row — 3 teal cards */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {l:"DG Run Hrs", v: dgRunHrs, u:"Hrs", from:"#0891b2", to:"#2563eb"},
                        {l:"Mains Run Hrs", v: mainsRunHrs, u:"Hrs", from:"#0891b2", to:"#2563eb"},
                        {l:"Battery Run Hrs", v: battRunHrs, u:"Hrs", from:"#0891b2", to:"#2563eb"},
                      ].map(m=>(
                        <div key={m.l} className="relative overflow-hidden rounded-xl p-4 flex flex-col gap-1" style={{background:`linear-gradient(135deg,${m.from},${m.to})`}}>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">{m.l}</span>
                          <div className="flex items-end gap-1">
                            <span className="text-2xl font-black text-white leading-none">{m.v}</span>
                            <span className="text-xs font-bold text-white/70 mb-0.5">{m.u}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Bottom row — 2 special cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative overflow-hidden rounded-xl p-5 flex flex-col gap-1" style={{background:'linear-gradient(135deg,#7c3aed,#4f46e5)'}}>
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-20" style={{background:'#a78bfa',filter:'blur(20px)'}} />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">Total Load Current</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl font-black text-white leading-none">{loadCurrent}</span>
                          <span className="text-base font-bold text-white/70 mb-1">A</span>
                        </div>
                      </div>
                      <div className="relative overflow-hidden rounded-xl p-5 flex flex-col gap-1" style={{background:'linear-gradient(135deg,#ea580c,#d97706)'}}>
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-20" style={{background:'#fb923c',filter:'blur(20px)'}} />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">Battery Temperature</span>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl font-black text-white leading-none">{battTemp}</span>
                          <span className="text-base font-bold text-white/70 mb-1">°C</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── POWER SOURCE STRIP ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {label:"Primary Source", name:"Grid (Mains)", desc:"Utility grid supply — 3-phase AC input", accentFrom:"#10b981", accentTo:"#0d9488", status:"ACTIVE", statusBg:"bg-emerald-50 dark:bg-emerald-950/30", statusColor:"text-emerald-700 dark:text-emerald-400", metrics:[{l:"Voltage",v:`${rPhaseVolts} V`},{l:"Frequency",v:`${(seed%3)+49} Hz`}]},
                    {label:"Secondary Source", name:"DG (Generator)", desc:"Diesel generator backup — auto-start enabled", accentFrom:"#f97316", accentTo:"#d97706", status:"STANDBY", statusBg:"bg-orange-50 dark:bg-orange-950/30", statusColor:"text-orange-700 dark:text-orange-400", metrics:[{l:"Voltage",v:`0 V`},{l:"Fuel Level",v:`${85-seed%15}%`}]},
                    {label:"Backup Source", name:"Battery Bank", desc:"VRLA 48V bank — auto discharge on failure", accentFrom:"#7c3aed", accentTo:"#6d28d9", status:"FLOAT", statusBg:"bg-violet-50 dark:bg-violet-950/30", statusColor:"text-violet-700 dark:text-violet-400", metrics:[{l:"Voltage",v:`${parseFloat(batteryVoltage).toFixed(1)} V`},{l:"Capacity",v:`${site.battPct.toFixed(0)}%`}]},
                  ].map(src=>(
                    <div key={src.label} className="relative rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs hover:shadow-md transition-shadow">
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{background:`linear-gradient(to bottom,${src.accentFrom},${src.accentTo})`}} />
                      <div className="pl-5 pr-4 pt-4 pb-4">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{src.label}</span>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">{src.name}</h4>
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${src.statusBg} ${src.statusColor}`}>{src.status}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{src.desc}</p>
                        <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-3">
                          {src.metrics.map(m=>(
                            <div key={m.l}>
                              <span className="text-[9px] text-slate-400 font-bold uppercase block mb-0.5">{m.l}</span>
                              <span className="text-sm font-black text-slate-700 dark:text-slate-300 font-mono">{m.v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======= TRENDS TAB ======= */}
            {smpsTab === "trends" && (
              <div className="flex flex-col gap-5">
                {[
                  {title:"Common Trends", subtitle:"Battery Voltage · 24 hr window", icon:"📉", iconBg:"bg-rose-600", data:battVoltageData, key:"V", unit:"V", color:"#7c3aed", fill:"#7c3aed", label:"Battery Voltage"},
                  {title:"Energy Trends", subtitle:"Total kWh consumption over 24 hrs", icon:"⚡", iconBg:"bg-amber-500", data:energyData, key:"kWh", unit:"kWh", color:"#f59e0b", fill:"#f59e0b", label:"Energy (kWh)"},
                  {title:"Temperature Trends", subtitle:"Ambient & battery temperature", icon:"🌡️", iconBg:"bg-rose-500", data:tempData, key:"C", unit:"°C", color:"#ef4444", fill:"#ef4444", label:"Temperature (°C)"},
                ].map((chart)=>(
                  <Card key={chart.title} className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs overflow-hidden">
                    <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${chart.iconBg} flex items-center justify-center shadow-sm`}>
                          <span className="text-base">{chart.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{chart.title}</h4>
                          <p className="text-[10px] text-slate-400 font-mono">{chart.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border border-slate-200/80 dark:border-slate-700 rounded-lg px-3 py-1.5 bg-slate-50 dark:bg-slate-900">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-mono text-slate-500">2026/07/08 TO 2026/07/08</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5">
                      <div className="h-52 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chart.data} margin={{top:10,right:10,left:-20,bottom:0}}>
                            <defs>
                              <linearGradient id={`smpsGrad-${chart.key}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chart.fill} stopOpacity={0.18} />
                                <stop offset="95%" stopColor={chart.fill} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800/60" vertical={false} />
                            <XAxis dataKey="t" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} unit={chart.unit} domain={["auto","auto"]} />
                            <ChartTooltip contentStyle={tooltipStyle} />
                            <Area type="monotone" dataKey={chart.key} stroke={chart.color} strokeWidth={2.5}
                              fill={`url(#smpsGrad-${chart.key})`} name={chart.label} dot={false}
                              activeDot={{r:5, fill:chart.color, stroke:"white", strokeWidth:2}} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Power Trends — dual line */}
                <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs overflow-hidden">
                  <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-sm">
                        <span className="text-base">🔥</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Power Trends</h4>
                        <p className="text-[10px] text-slate-400 font-mono">Load 1 & Load 2 power draw · 24 hr window</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {[{c:"#7c3aed",l:"Load 1 Power"},{c:"#ef4444",l:"Load 2 Power"}].map(x=>(
                          <span key={x.l} className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                            <span className="w-4 h-0.5 rounded inline-block" style={{backgroundColor:x.c}} />{x.l}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 border border-slate-200/80 dark:border-slate-700 rounded-lg px-3 py-1.5 bg-slate-50 dark:bg-slate-900">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-mono text-slate-500">2026/07/08 TO 2026/07/08</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="h-52 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={powerData} margin={{top:10,right:10,left:-15,bottom:0}}>
                          <defs>
                            <linearGradient id="smpsL1" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="smpsL2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.12} />
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800/60" vertical={false} />
                          <XAxis dataKey="t" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} unit="W" domain={["auto","auto"]} />
                          <ChartTooltip contentStyle={tooltipStyle} />
                          <Area type="monotone" dataKey="L1" stroke="#7c3aed" strokeWidth={2.5} fill="url(#smpsL1)" name="Load 1 Power (W)" dot={false} activeDot={{r:5,fill:"#7c3aed",stroke:"white",strokeWidth:2}} />
                          <Area type="monotone" dataKey="L2" stroke="#ef4444" strokeWidth={2} fill="url(#smpsL2)" name="Load 2 Power (W)" dot={false} activeDot={{r:5,fill:"#ef4444",stroke:"white",strokeWidth:2}} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        );
      })()}

      {/* Tabs Dynamic Content Panel */}
      {!smpsDetailOpen && (
      <AnimatePresence mode="wait">

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="min-h-[400px]"
        >
          {/* ==================== 1. DASHBOARD TAB ==================== */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              {/* Telemetry Blocks Grid */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
                  <Cpu className="w-4.5 h-4.5 text-blue-500" /> Live Power Equipment Telemetry
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* SMPS Block */}
                  <Card
                    onClick={() => setSmpsDetailOpen(true)}
                    className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/40 hover:shadow-lg transition-all group overflow-hidden relative bg-white dark:bg-card cursor-pointer"
                  >
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                          <Zap className="w-5 h-5" />
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-600 border-0 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold">ON</Badge>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">SMPS</h4>
                        <span className="text-xl font-bold text-slate-900 dark:text-foreground mt-0.5 block">{site.loadKw}</span>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
                          <span>Make: {site.vendor !== "N/A" ? site.vendor.toUpperCase() : "VERTIV"}</span>
                          <span>{seed % 100 + 400} Hours</span>
                        </div>
                        <p className="text-[9px] font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest mt-2">Click to inspect →</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* SPS Block */}
                  <Card onClick={() => setSmpsDetailOpen(true)} className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-amber-500/40 hover:shadow-lg transition-all group overflow-hidden relative bg-white dark:bg-card cursor-pointer">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                          <Sun className="w-5 h-5" />
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-600 border-0 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold">ON</Badge>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Solar Power System (SPS)</h4>
                        <span className="text-xl font-bold text-slate-900 dark:text-foreground mt-0.5 block">{solarLoad} kW</span>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
                          <span>Make: DELTA</span>
                          <span>{(seed % 50) + 120} Hours</span>
                        </div>
                        <p className="text-[9px] font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest mt-2">Click to inspect →</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* DGCON Block */}
                  <Card onClick={() => setSmpsDetailOpen(true)} className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-rose-500/40 hover:shadow-lg transition-all group overflow-hidden relative bg-white dark:bg-card cursor-pointer">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-rose-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <Badge className="bg-rose-50 text-rose-600 border-0 dark:bg-rose-950/30 dark:text-rose-400 font-bold">OFF</Badge>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">DG Controller (DGCON)</h4>
                        <span className="text-xl font-bold text-slate-900 dark:text-foreground mt-0.5 block">0.0 Hz</span>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
                          <span>Fuel: {85 - (seed % 15)}%</span>
                          <span>{(seed % 40) + 85} Hours</span>
                        </div>
                        <p className="text-[9px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-widest mt-2">Click to inspect →</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* PFLS Block */}
                  <Card onClick={() => setSmpsDetailOpen(true)} className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-purple-500/40 hover:shadow-lg transition-all group overflow-hidden relative bg-white dark:bg-card cursor-pointer">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                          <Layers className="w-5 h-5" />
                        </div>
                        <Badge className="bg-rose-50 text-rose-600 border-0 dark:bg-rose-950/30 dark:text-rose-400 font-bold">OFF</Badge>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Power Free Leakage (PFLS)</h4>
                        <span className="text-xl font-bold text-slate-900 dark:text-foreground mt-0.5 block">Inactive</span>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
                          <span>Make: N/A</span>
                          <span>-</span>
                        </div>
                        <p className="text-[9px] font-bold text-purple-500 dark:text-purple-400 uppercase tracking-widest mt-2">Click to inspect →</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* BMS Block */}
                  <Card onClick={() => setSmpsDetailOpen(true)} className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-500/40 hover:shadow-lg transition-all group overflow-hidden relative bg-white dark:bg-card cursor-pointer">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                          <Battery className="w-5 h-5" />
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-600 border-0 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold">ON</Badge>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Battery Mgmt (BMS)</h4>
                        <span className="text-xl font-bold text-slate-900 dark:text-foreground mt-0.5 block">{batteryVoltage} V</span>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
                          <span>Make: Exide</span>
                          <span>Temp: {roomTemperature}°C</span>
                        </div>
                        <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-2">Click to inspect →</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* UPS Block */}
                  <Card onClick={() => setSmpsDetailOpen(true)} className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-teal-500/40 hover:shadow-lg transition-all group overflow-hidden relative bg-white dark:bg-card cursor-pointer">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                          <Zap className="w-5 h-5" />
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-600 border-0 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold">ON</Badge>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Auxiliary UPS</h4>
                        <span className="text-xl font-bold text-slate-900 dark:text-foreground mt-0.5 block">0.8 kW</span>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
                          <span>Make: APC</span>
                          <span>98% Charged</span>
                        </div>
                        <p className="text-[9px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mt-2">Click to inspect →</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Air Conditioner Block */}
                  <Card onClick={() => setSmpsDetailOpen(true)} className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 hover:shadow-lg transition-all group overflow-hidden relative bg-white dark:bg-card cursor-pointer">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                          <Wind className="w-5 h-5" />
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-600 border-0 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold">ON</Badge>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Air Conditioner</h4>
                        <span className="text-xl font-bold text-slate-900 dark:text-foreground mt-0.5 block">24.0 °C</span>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
                          <span>Make: DAIKIN</span>
                          <span>Set Temp: 22°C</span>
                        </div>
                        <p className="text-[9px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mt-2">Click to inspect →</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Servo Stabilizer Block */}
                  <Card onClick={() => setSmpsDetailOpen(true)} className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-orange-500/40 hover:shadow-lg transition-all group overflow-hidden relative bg-white dark:bg-card cursor-pointer">
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                          <Shield className="w-5 h-5" />
                        </div>
                        <Badge className="bg-emerald-50 text-emerald-600 border-0 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold">ON</Badge>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Line Servo Stabilizer</h4>
                        <span className="text-xl font-bold text-slate-900 dark:text-foreground mt-0.5 block">Normal</span>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 font-mono">
                          <span>Make: Servokon</span>
                          <span>Input: 415 V AC</span>
                        </div>
                        <p className="text-[9px] font-bold text-orange-500 dark:text-orange-400 uppercase tracking-widest mt-2">Click to inspect →</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Tenants & Chart Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Tenants card */}
                <Card className="lg:col-span-4 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs">
                  <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
                      <span>Tenants</span>
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5 rounded-md font-mono text-slate-500 border-slate-200 dark:border-slate-800">
                        Max: 3, Assigned: 2
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 flex flex-col gap-4">
                    {/* Reliance Jio Tenant */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-950/10">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          RJ
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Reliance Jio</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-mono">Anchor Carrier</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">{(smpsLoad * 0.65).toFixed(2)} kW</span>
                        <span className="text-[10px] text-emerald-500 dark:text-emerald-400 block font-bold">65% share</span>
                      </div>
                    </div>

                    {/* Airtel Tenant */}
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/20">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          AT
                        </div>
                        <div>
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Bharti Airtel</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-mono">Shared Carrier</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">{(smpsLoad * 0.35).toFixed(2)} kW</span>
                        <span className="text-[10px] text-emerald-500 dark:text-emerald-400 block font-bold">35% share</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full h-10 border-dashed border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 font-semibold gap-1.5 rounded-xl text-xs cursor-pointer">
                      <Plus className="w-4 h-4" /> Add Tenant Share
                    </Button>
                  </CardContent>
                </Card>

                {/* Live charts */}
                <Card className="lg:col-span-8 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs">
                  <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between flex-wrap gap-3">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Site Telemetry Trends
                    </CardTitle>
                    {/* Toggle metrics Buttons */}
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200/60 dark:border-slate-800/80">
                      {(["power", "current", "voltage"] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setActiveChartMetric(m)}
                          className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            activeChartMetric === m
                              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={liveChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800/60" />
                          <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} domain={["auto", "auto"]} />
                          <ChartTooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.95)",
                              borderRadius: "8px",
                              border: "none",
                              color: "white",
                              fontSize: "11px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey={
                              activeChartMetric === "power" ? "load" : 
                              activeChartMetric === "current" ? "current" : "voltage"
                            }
                            stroke="#2563eb"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#metricGrad)"
                            name={
                              activeChartMetric === "power" ? "Load (kW)" : 
                              activeChartMetric === "current" ? "Current (A)" : "Voltage (V)"
                            }
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ============ ENERGY DATA SECTION ============ */}
              <div className="flex flex-col gap-0">
                {/* Energy Sub-tab switcher */}
                <div className="flex items-center gap-1 border border-slate-200/80 dark:border-slate-800 rounded-xl p-1 bg-slate-50/50 dark:bg-slate-900/30 self-start mb-5">
                  <button
                    onClick={() => setEnergySubTab("data")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      energySubTab === "data"
                        ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" /> Energy Data
                  </button>
                  <button
                    onClick={() => setEnergySubTab("trend")}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      energySubTab === "trend"
                        ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                        : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" /> Energy Trend
                  </button>
                </div>

                {/* ===== ENERGY DATA TAB ===== */}
                {energySubTab === "data" && (
                  <div className="flex flex-col gap-8">

                    {/* Energy Run Hours Breakdown + Donut row */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      <Card className="lg:col-span-8 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs">
                        <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
                          <CardTitle className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-pulse" />
                            Energy Run Hours Breakdown
                          </CardTitle>
                          <div className="flex items-center gap-2 border border-slate-200/80 dark:border-slate-700 rounded-lg px-3 py-1.5 bg-slate-50 dark:bg-slate-900">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[10px] font-mono text-slate-500">2026/06/09 TO 2026/07/08</span>
                          </div>
                        </CardHeader>
                        <CardContent className="p-5">
                          <div className="h-56 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={reportChartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                <defs>
                                  <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.95} />
                                    <stop offset="100%" stopColor="#059669" stopOpacity={0.85} />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800/60" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} unit=" h" />
                                <ChartTooltip
                                  cursor={{ fill: "rgba(99,102,241,0.06)" }}
                                  contentStyle={{ backgroundColor: "rgba(15,23,42,0.96)", borderRadius: "10px", border: "none", color: "white", fontSize: "11px", padding: "10px 14px" }}
                                />
                                <Bar dataKey="Grid" name="Grid" stackId="a" fill="url(#gridGrad)" radius={[0,0,0,0]} />
                                <Bar dataKey="DG" name="DG" stackId="a" fill="#f97316" radius={[0,0,0,0]} />
                                <Bar dataKey="Battery" name="Battery" stackId="a" fill="#ec4899" radius={[3,3,0,0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="flex items-center gap-5 mt-3 justify-center">
                            {[{c:"#10b981",l:"Grid"},{c:"#f97316",l:"DG"},{c:"#ec4899",l:"Battery"}].map(i=>(
                              <span key={i.l} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                                <span className="w-3 h-2 rounded inline-block" style={{backgroundColor:i.c}} />{i.l}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Site total hours donut summary */}
                      <Card className="lg:col-span-4 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs">
                        <CardContent className="p-6 flex flex-col items-center justify-center gap-5 h-full">
                          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase text-center w-full">
                            Site Started On: 2025-10-27 09:16:03
                          </div>
                          <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="9" className="dark:stroke-slate-800" />
                              <circle cx="50" cy="50" r="40" fill="none" stroke="#2563eb" strokeWidth="9"
                                strokeDasharray={`${2 * Math.PI * 40 * (site.mainsPct / 100)} ${2 * Math.PI * 40 * (1 - site.mainsPct / 100)}`}
                                strokeLinecap="round" className="transition-all duration-700" />
                              <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="9"
                                strokeDasharray={`${2 * Math.PI * 40 * (site.dgPct / 100)} ${2 * Math.PI * 40 * (1 - site.dgPct / 100)}`}
                                strokeDashoffset={-(2 * Math.PI * 40 * (site.mainsPct / 100))}
                                strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">195</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Hrs</span>
                            </div>
                          </div>
                          <div className="w-full flex flex-col gap-3">
                            {[
                              {label:"GRID", pct: site.mainsPct, color:"bg-blue-600", textColor:"text-blue-600 dark:text-blue-400"},
                              {label:"DG", pct: site.dgPct, color:"bg-orange-500", textColor:"text-orange-600 dark:text-orange-400"},
                              {label:"Battery", pct: site.battPct, color:"bg-pink-500", textColor:"text-pink-600 dark:text-pink-400"},
                            ].map(row=>(
                              <div key={row.label} className="flex items-center gap-2.5">
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 w-12 uppercase tracking-wide">{row.label}</span>
                                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div className={`h-full ${row.color} rounded-full transition-all duration-700`} style={{width:`${Math.max(row.pct,1)}%`}} />
                                </div>
                                <span className={`text-[10px] font-bold font-mono w-9 text-right ${row.textColor}`}>{row.pct.toFixed(1)}%</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* GRID Energy Information */}
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/10">
                            <Zap className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Utility Grid Analytics</h3>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">Real-time utility grid supply parameters and phase diagnostics</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-start md:self-auto">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900/30 uppercase tracking-wider">Grid Active</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          {phase:"R", name:"Phase Red", color:"text-red-500", border:"border-red-100 dark:border-red-950/20", bg:"from-red-500", volts: rPhaseVolts, amps: rPhaseAmps},
                          {phase:"Y", name:"Phase Yellow", color:"text-amber-500", border:"border-amber-100 dark:border-amber-950/20", bg:"from-amber-500", volts: yPhaseVolts, amps: yPhaseAmps},
                          {phase:"B", name:"Phase Blue", color:"text-blue-500", border:"border-blue-100 dark:border-blue-950/20", bg:"from-blue-500", volts: bPhaseVolts, amps: bPhaseAmps},
                        ].map(p=>(
                          <Card key={p.phase} className={`border ${p.border} bg-white dark:bg-card shadow-xs hover:shadow-md transition-all overflow-hidden relative group`}>
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.bg} to-slate-200 dark:to-slate-800`} />
                            <CardContent className="p-5 pt-6">
                              <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2.5 h-2.5 rounded-full ${p.phase === "R" ? "bg-red-500 animate-pulse" : p.phase === "Y" ? "bg-amber-500 animate-pulse" : "bg-blue-500 animate-pulse"}`} />
                                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">{p.name}</span>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-500">L{p.phase}</span>
                              </div>
                              
                              <div className="flex items-baseline gap-1.5 mb-5">
                                <span className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-mono">{p.volts}</span>
                                <span className="text-sm font-semibold text-slate-400 uppercase">V AC</span>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100/70 dark:border-slate-800/40">
                                  <span className="text-slate-400 dark:text-slate-500">Current Load</span>
                                  <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">{p.amps} A</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100/70 dark:border-slate-800/40">
                                  <span className="text-slate-400 dark:text-slate-500">Line Frequency</span>
                                  <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">{(seed%3)+49}.0 Hz</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5">
                                  <span className="text-slate-400 dark:text-slate-500">Active Power</span>
                                  <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">{(p.amps*p.volts/1000).toFixed(2)} kW</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          {label:"Total Grid Hours", val: `${site.mainsHours} hrs`, color:"bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-950/30", icon: Clock},
                          {label:"Single-Phase Time", val: `${(site.mainsHours*0.05).toFixed(1)} hrs`, color:"bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border-amber-100/50 dark:border-amber-950/30", icon: Activity},
                          {label:"Dual-Phase Time", val: `${(site.mainsHours*0.02).toFixed(1)} hrs`, color:"bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-100/50 dark:border-blue-950/30", icon: Layers},
                          {label:"Three-Phase Time", val: `${site.mainsHours} hrs`, color:"bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border-indigo-100/50 dark:border-indigo-950/30", icon: Zap},
                        ].map(b=>(
                          <Card key={b.label} className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-card shadow-xs hover:shadow-md transition-all">
                            <CardContent className="p-4 flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl ${b.color.split(" ")[0]} ${b.color.split(" ")[1]} flex items-center justify-center border ${b.color.split(" ").slice(4).join(" ")}`}>
                                <b.icon className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{b.label}</span>
                                <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100 font-mono tracking-tight">{b.val}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* DG Energy Information */}
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center shadow-lg shadow-amber-500/10">
                            <Cpu className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Diesel Generator Diagnostics</h3>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">Generator output telemetry, engine loads, and mode tracking</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-start md:self-auto">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-800 uppercase tracking-wider">Engine Standby</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          {phase:"R", name:"Phase Red", color:"text-slate-400 dark:text-slate-500", border:"border-slate-100 dark:border-slate-900", volts: 0, amps: 0},
                          {phase:"Y", name:"Phase Yellow", color:"text-slate-400 dark:text-slate-500", border:"border-slate-100 dark:border-slate-900", volts: 0, amps: 0},
                          {phase:"B", name:"Phase Blue", color:"text-slate-400 dark:text-slate-500", border:"border-slate-100 dark:border-slate-900", volts: 0, amps: 0},
                        ].map(p=>(
                          <Card key={p.phase} className={`border ${p.border} bg-slate-50/50 dark:bg-slate-950/20 shadow-xs hover:shadow-md transition-all overflow-hidden relative group`}>
                            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800" />
                            <CardContent className="p-5 pt-6">
                              <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">{p.name}</span>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600">L{p.phase}</span>
                              </div>
                              
                              <div className="flex items-baseline gap-1.5 mb-5 opacity-60">
                                <span className="text-4xl font-extrabold tracking-tight text-slate-500 dark:text-slate-400 font-mono">{p.volts}</span>
                                <span className="text-sm font-semibold text-slate-400 uppercase">V AC</span>
                              </div>
                              
                              <div className="space-y-2 opacity-60">
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100/70 dark:border-slate-800/40">
                                  <span className="text-slate-400 dark:text-slate-500">Current Load</span>
                                  <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">{p.amps} A</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100/70 dark:border-slate-800/40">
                                  <span className="text-slate-400 dark:text-slate-500">Line Frequency</span>
                                  <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">{p.volts}.0 Hz</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5">
                                  <span className="text-slate-400 dark:text-slate-500">Real Power</span>
                                  <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">0.00 kW</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[
                          {label:"Total Engine Hours", val: `${site.dgHours} hrs`, color:"from-slate-700 to-slate-900"},
                          {label:"On-Load Runtime", val: `${(site.dgHours*0.9).toFixed(1)} hrs`, color:"from-emerald-400 to-emerald-600"},
                          {label:"Off-Load Runtime", val: `${(site.dgHours*0.1).toFixed(1)} hrs`, color:"from-red-400 to-red-600"},
                          {label:"Auto Mode Run", val: `${(site.dgHours*0.8).toFixed(1)} hrs`, color:"from-blue-400 to-blue-600"},
                          {label:"Manual Mode Run", val: `${(site.dgHours*0.2).toFixed(1)} hrs`, color:"from-purple-400 to-purple-600"},
                          {label:"Tamper Lockout", val: "0.0 hrs", color:"from-orange-400 to-orange-600"},
                        ].map(b=>(
                          <Card key={b.label} className="border border-slate-150 dark:border-slate-800 bg-white dark:bg-card shadow-xs hover:shadow-md transition-all overflow-hidden">
                            <CardContent className="p-3.5 flex flex-col items-center justify-center gap-1.5 text-center">
                              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{b.label}</span>
                              <span className="text-base font-extrabold text-slate-800 dark:text-slate-100 font-mono tracking-tight">{b.val}</span>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Battery Energy Information */}
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-500 to-indigo-400 text-white flex items-center justify-center shadow-lg shadow-violet-500/10">
                            <Battery className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">DC Power & Battery Storage</h3>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">Main battery bank voltage levels, starter status, and backup duration</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-start md:self-auto">
                          <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
                          <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-2.5 py-0.5 rounded-full border border-violet-100 dark:border-violet-900/30 uppercase tracking-wider">Active Backup Mode</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          {label:"DG Starter Battery", desc:"Engine starter voltage status", val:`${(parseFloat(batteryVoltage)-1.2).toFixed(1)} V`, icon: Cpu, iconColor:"text-violet-500", bg:"from-violet-500", border:"border-violet-100 dark:border-violet-950/30"},
                          {label:"Main Battery Bank", desc:"Main DC system voltage level", val:`${batteryVoltage} V`, icon: Battery, iconColor:"text-emerald-500", bg:"from-emerald-500", border:"border-emerald-100 dark:border-emerald-950/30"},
                          {label:"Backup Run Hours", desc:"Accumulated discharge runtime", val:`${site.battHours} Hrs`, icon: Clock, iconColor:"text-rose-500", bg:"from-rose-500", border:"border-rose-100 dark:border-rose-950/30"},
                        ].map(b=>(
                          <Card key={b.label} className={`border ${b.border} bg-white dark:bg-card shadow-xs hover:shadow-md transition-all overflow-hidden relative group`}>
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${b.bg} to-slate-200 dark:to-slate-800`} />
                            <CardContent className="p-6 pl-8 flex items-center justify-between">
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{b.label}</span>
                                <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 font-mono tracking-tight">{b.val}</span>
                                <span className="text-[10px] text-slate-400/80 dark:text-slate-500">{b.desc}</span>
                              </div>
                              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900/60 flex items-center justify-center border border-slate-100 dark:border-slate-800 text-slate-500">
                                <b.icon className={`w-6 h-6 ${b.iconColor}`} />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ===== ENERGY TREND TAB ===== */}
                {energySubTab === "trend" && (() => {
                  const dateRange = "2026/07/08 TO 2026/07/08";
                  const hours = ["00:00","02:00","04:00","06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00"];

                  const energyUsageData = hours.map((h,i)=>({ time:h, kWh: (3.2 + Math.sin(i*0.7)*1.8 + Math.cos(i*0.3)*0.6).toFixed(2) }));
                  const gridData = hours.map((h,i)=>({ time:h, kW: (rPhaseVolts*rPhaseAmps/1000 + Math.sin(i*0.5)*0.4 + 0.1*(seed%5)).toFixed(2) }));
                  const acVoltageData = hours.map((h,i)=>({ time:h, R: (rPhaseVolts + Math.sin(i*0.8)*3).toFixed(1), Y: (yPhaseVolts + Math.cos(i*0.6)*2.5).toFixed(1), B: (bPhaseVolts + Math.sin(i*1.1)*2).toFixed(1) }));
                  const dgData = hours.map((h,i)=>({ time:h, kW: Math.max(0, (site.dgPct > 5 ? 1.2 + Math.sin(i*0.4)*0.3 : 0)).toFixed(2) }));
                  const battData = hours.map((h,i)=>({ time:h, V: (parseFloat(batteryVoltage) + Math.sin(i*0.9)*1.2).toFixed(1) }));

                  const trendChartStyle = { backgroundColor:"rgba(15,23,42,0.96)", borderRadius:"10px", border:"none", color:"white", fontSize:"11px", padding:"10px 14px" };

                  const trendCharts = [
                    {
                      title: "Energy Usage Trend",
                      icon: "⚡",
                      iconBg: "bg-violet-600",
                      data: energyUsageData,
                      dataKey: "kWh",
                      unit: "kWh",
                      stroke: "#7c3aed",
                      fill: "#7c3aed",
                      label: "Total Usage",
                    },
                    {
                      title: "GRID Supply Energy Trend",
                      icon: "🏭",
                      iconBg: "bg-emerald-600",
                      data: gridData,
                      dataKey: "kW",
                      unit: "kW",
                      stroke: "#10b981",
                      fill: "#10b981",
                      label: "Grid Supply",
                    },
                    {
                      title: "DG Supply Energy Trend",
                      icon: "⛽",
                      iconBg: "bg-orange-500",
                      data: dgData,
                      dataKey: "kW",
                      unit: "kW",
                      stroke: "#f97316",
                      fill: "#f97316",
                      label: "DG Output",
                    },
                    {
                      title: "Battery Supply Trend",
                      icon: "🔋",
                      iconBg: "bg-rose-600",
                      data: battData,
                      dataKey: "V",
                      unit: "V",
                      stroke: "#ec4899",
                      fill: "#ec4899",
                      label: "Battery Voltage",
                    },
                  ];

                  return (
                    <div className="flex flex-col gap-5">

                      {/* AC Voltage Trend – multi-line special card */}
                      <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs overflow-hidden">
                        <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                              <span className="text-sm text-white font-bold">AC</span>
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">AC Voltage Trend</h4>
                              <p className="text-[10px] text-slate-400 font-mono">R · Y · B Phase comparison</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3">
                              {[{c:"#ef4444",l:"R"},{c:"#eab308",l:"Y"},{c:"#2563eb",l:"B"}].map(x=>(
                                <span key={x.l} className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                                  <span className="w-4 h-0.5 rounded inline-block" style={{backgroundColor:x.c}} />{x.l} Phase
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 border border-slate-200/80 dark:border-slate-700 rounded-lg px-3 py-1.5 bg-slate-50 dark:bg-slate-900">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-[10px] font-mono text-slate-500">{dateRange}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-5">
                          <div className="h-52 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={acVoltageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                  {[{id:"rGrad",c:"#ef4444"},{id:"yGrad",c:"#eab308"},{id:"bGrad",c:"#2563eb"}].map(g=>(
                                    <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor={g.c} stopOpacity={0.15} />
                                      <stop offset="95%" stopColor={g.c} stopOpacity={0} />
                                    </linearGradient>
                                  ))}
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800/60" vertical={false} />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} domain={["auto","auto"]} unit="V" />
                                <ChartTooltip contentStyle={trendChartStyle} />
                                <Area type="monotone" dataKey="R" stroke="#ef4444" strokeWidth={2} fill="url(#rGrad)" name="R Phase (V)" dot={false} />
                                <Area type="monotone" dataKey="Y" stroke="#eab308" strokeWidth={2} fill="url(#yGrad)" name="Y Phase (V)" dot={false} />
                                <Area type="monotone" dataKey="B" stroke="#2563eb" strokeWidth={2} fill="url(#bGrad)" name="B Phase (V)" dot={false} />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Single-metric trend cards */}
                      {trendCharts.map((chart) => (
                        <Card key={chart.title} className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs overflow-hidden">
                          <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg ${chart.iconBg} flex items-center justify-center shadow-sm`}>
                                <span className="text-base">{chart.icon}</span>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{chart.title}</h4>
                                <p className="text-[10px] text-slate-400 font-mono">{chart.label} over 24 hrs</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 border border-slate-200/80 dark:border-slate-700 rounded-lg px-3 py-1.5 bg-slate-50 dark:bg-slate-900">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-[10px] font-mono text-slate-500">{dateRange}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="p-5">
                            <div className="h-48 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chart.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                  <defs>
                                    <linearGradient id={`grad-${chart.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor={chart.fill} stopOpacity={0.2} />
                                      <stop offset="95%" stopColor={chart.fill} stopOpacity={0} />
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800/60" vertical={false} />
                                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                                  <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} domain={["auto","auto"]} unit={chart.unit} />
                                  <ChartTooltip contentStyle={trendChartStyle} />
                                  <Area
                                    type="monotone"
                                    dataKey={chart.dataKey}
                                    stroke={chart.stroke}
                                    strokeWidth={2.5}
                                    fill={`url(#grad-${chart.dataKey})`}
                                    name={`${chart.label} (${chart.unit})`}
                                    dot={false}
                                    activeDot={{ r: 5, fill: chart.stroke, stroke: "white", strokeWidth: 2 }}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}



          {/* ==================== 2. ALARMS TAB ==================== */}
          {activeTab === "alarms" && (
            <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs">
              <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Active & Historical Alarms
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 mt-1">
                    System logs generated specifically for {site.name} controller.
                  </CardDescription>
                </div>
                <Badge variant="destructive" className="font-bold">
                  {siteAlarms.length} Active Alarms
                </Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider text-left">
                        <th className="px-5 py-3">Alarm ID</th>
                        <th className="px-5 py-3">Alarm Description</th>
                        <th className="px-5 py-3">Severity</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Logged Time</th>
                        <th className="px-5 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      {siteAlarms.map((alarm) => (
                        <tr key={alarm.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 text-xs">
                          <td className="px-5 py-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                            {alarm.id}
                            <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">{alarm.code}</span>
                          </td>
                          <td className="px-5 py-4 text-slate-800 dark:text-slate-200 font-medium">
                            {alarm.name}
                          </td>
                          <td className="px-5 py-4">
                            <Badge 
                              className={`font-semibold border-0 text-[10px] rounded-md px-2 py-0.5 ${
                                alarm.severity === "CRITICAL" ? "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400" :
                                alarm.severity === "MAJOR" ? "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400" :
                                "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                              }`}
                            >
                              {alarm.severity}
                            </Badge>
                          </td>
                          <td className="px-5 py-4">
                            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
                              {alarm.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                            {alarm.time}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <Button size="sm" variant="outline" className="h-8 text-xs font-semibold text-blue-600 hover:text-blue-700 border-slate-200/80 dark:border-slate-800 cursor-pointer">
                              Investigate
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ==================== 3. GALLERY TAB ==================== */}
          {activeTab === "gallery" && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Live Surveillance & Assets Photos
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    CCTV cameras snapshots and maintenance logs media records.
                  </p>
                </div>
                <Button className="h-9 gap-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs cursor-pointer">
                  <Camera className="w-4 h-4" /> Trigger Snapshot
                </Button>
              </div>

              {/* Styled Mock Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { title: "CCTV Outdoor view", desc: "Main entry perimeter gate", url: "cam-entry" },
                  { title: "CCTV Indoor Rack view", desc: "SMPS battery stack", url: "cam-rack" },
                  { title: "Generator Room View", desc: "DG enclosure indoor", url: "cam-dg" },
                  { title: "SPS Panels Roof view", desc: "Solar photovoltaic panels", url: "cam-solar" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setGalleryLightboxImage(item.title)}
                    className="group border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-950 h-44 relative shadow-xs cursor-pointer select-none"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/50 group-hover:text-white/80 transition-colors bg-slate-900/20 group-hover:bg-black/40 duration-300">
                      <Camera className="w-10 h-10 stroke-[1.2]" />
                      <span className="text-[10px] font-bold tracking-wider font-mono">TAP TO VIEW IMAGE</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-3.5">
                      <span className="text-xs font-bold text-white block leading-tight">{item.title}</span>
                      <span className="text-[10px] text-slate-300 block mt-0.5 leading-none">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lightbox Modal Animation */}
              {galleryLightboxImage && (
                <div 
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 backdrop-blur-xs select-none"
                  onClick={() => setGalleryLightboxImage(null)}
                >
                  <div className="max-w-2xl w-full flex flex-col items-center gap-4">
                    <div className="w-full h-80 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden p-6 text-slate-400">
                      <div className="absolute top-4 left-4 bg-black/50 px-2 py-1 rounded text-xs font-mono text-slate-300">
                        {galleryLightboxImage}
                      </div>
                      <Camera className="w-20 h-20 text-slate-600 animate-bounce" />
                      <span className="text-xs font-bold mt-4 tracking-wider text-slate-500">PREMIUM SURVEILLANCE FEED RECORD</span>
                      <span className="text-[10px] text-slate-600 font-mono mt-1">2026-07-08 13:02:44 (LOCAL NOC SOURCE)</span>
                    </div>
                    <Button variant="outline" className="text-white hover:text-white bg-slate-900 hover:bg-slate-800 border-slate-700 h-9 font-semibold text-xs cursor-pointer">
                      Close Window
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== 4. INVENTORY TAB ==================== */}
          {activeTab === "inventory" && (
            <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs">
              <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Installed Telemetry Assets
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 mt-1">
                    Complete listing of tracked controllers, batteries, and sensors hardware modules.
                  </CardDescription>
                </div>
                <Button size="sm" className="h-9 gap-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs cursor-pointer">
                  <Boxes className="w-4 h-4" /> Add Asset
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider text-left">
                        <th className="px-5 py-3">Asset Item</th>
                        <th className="px-5 py-3">Model/Specification</th>
                        <th className="px-5 py-3">Serial ID</th>
                        <th className="px-5 py-3">Installation Date</th>
                        <th className="px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                      {inventoryList.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                          <td className="px-5 py-4 font-bold text-slate-800 dark:text-slate-200">
                            {item.name}
                          </td>
                          <td className="px-5 py-4 text-slate-600 dark:text-slate-400 font-medium">
                            {item.model}
                          </td>
                          <td className="px-5 py-4 font-mono text-slate-500 dark:text-slate-400">
                            {item.serial}
                          </td>
                          <td className="px-5 py-4 text-slate-500 dark:text-slate-400 font-mono">
                            {item.date}
                          </td>
                          <td className="px-5 py-4">
                            <Badge className="bg-emerald-50 text-emerald-600 border-0 dark:bg-emerald-950/30 dark:text-emerald-400 font-bold">
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ==================== 5. REPORT TAB ==================== */}
          {activeTab === "report" && (
            <div className="flex flex-col gap-6">
              {/* Scorecard row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
                  <CardContent className="p-4">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Uptime Score</span>
                    <span className="text-2xl font-bold text-emerald-500 block mt-1">{site.score}%</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Excellent performance</span>
                  </CardContent>
                </Card>
                <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
                  <CardContent className="p-4">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Total Run Hours</span>
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-200 block mt-1">195 Hrs</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Site lifetime operational log</span>
                  </CardContent>
                </Card>
                <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
                  <CardContent className="p-4">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Grid Consumption</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 block mt-1">{site.mainsHours} Hrs</span>
                    <span className="text-[10px] text-slate-500 block mt-1">{(site.mainsPct).toFixed(1)}% of total energy share</span>
                  </CardContent>
                </Card>
                <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
                  <CardContent className="p-4">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">DG Running log</span>
                    <span className="text-2xl font-bold text-rose-500 block mt-1">{site.dgHours} Hrs</span>
                    <span className="text-[10px] text-slate-500 block mt-1">{(site.dgPct).toFixed(1)}% backup power usage</span>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly source Share chart */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-8 border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
                  <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Weekly Power Sources Share (Hours)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={reportChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" className="dark:stroke-slate-800/60" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                          <ChartTooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.95)",
                              borderRadius: "8px",
                              border: "none",
                              color: "white",
                              fontSize: "11px",
                            }}
                          />
                          <Bar dataKey="Grid" name="Grid Mains" stackId="a" fill="#10b981" />
                          <Bar dataKey="DG" name="Generator (DG)" stackId="a" fill="#ef4444" />
                          <Bar dataKey="Battery" name="Battery Back" stackId="a" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Energy statistics right column */}
                <Card className="lg:col-span-4 border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
                  <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Grid Line Quality (Live)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> Phase R (Red)
                        </span>
                        <span className="font-mono text-slate-500">{rPhaseVolts} V / {rPhaseAmps} A</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600" style={{ width: `${(rPhaseVolts / 260) * 100}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" /> Phase Y (Yellow)
                        </span>
                        <span className="font-mono text-slate-500">{yPhaseVolts} V / {yPhaseAmps} A</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: `${(yPhaseVolts / 260) * 100}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Phase B (Blue)
                        </span>
                        <span className="font-mono text-slate-500">{bPhaseVolts} V / {bPhaseAmps} A</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600" style={{ width: `${(bPhaseVolts / 260) * 100}%` }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* ==================== 6. SETTINGS TAB ==================== */}
          {activeTab === "settings" && (
            <div className="flex flex-col gap-6">
              {/* Site ID Header & Global Toggle */}
              <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-card shadow-xs overflow-hidden">
                <div className="px-5 py-3 bg-slate-800 dark:bg-slate-950 text-white font-mono text-sm font-semibold tracking-wide">
                  {site.id}
                </div>
                <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/30">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Global Site Settings:</span>
                  <button
                    onClick={() => setGlobalSiteEnabled(!globalSiteEnabled)}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors cursor-pointer ${
                      globalSiteEnabled ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
                    }`}
                  >
                    <span className={`inline-block w-4 h-4 transform rounded-full bg-white shadow transition-transform ${
                      globalSiteEnabled ? "translate-x-7" : "translate-x-1"
                    }`} />
                  </button>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    globalSiteEnabled ? "text-emerald-600" : "text-slate-400"
                  }`}>{globalSiteEnabled ? "ON" : "OFF"}</span>
                  <Button size="sm" variant="outline" className="h-8 text-xs font-bold cursor-pointer border-slate-200 dark:border-slate-700">
                    Preview
                  </Button>
                </div>

                {/* Details Form */}
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Details</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                    {/* Site ID */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Site Id</label>
                      <input
                        type="text"
                        defaultValue={site.id}
                        readOnly
                        className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-not-allowed"
                      />
                    </div>
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Name</label>
                      <input
                        type="text"
                        defaultValue={site.name}
                        className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Description</label>
                      <input
                        type="text"
                        placeholder="Optional description..."
                        className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                      />
                    </div>
                    {/* SQ Load */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">SQ Load (KW)</label>
                      <input
                        type="number"
                        defaultValue={parseFloat(site.loadKw) || 8.94}
                        step="0.01"
                        className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                    {/* Locations */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Locations</label>
                      <div className="relative">
                        <select className="w-full h-10 pl-3 pr-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-xs font-semibold text-slate-700 dark:text-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer">
                          <option value="rajasthan">{site.circle}</option>
                          <option value="maharashtra">Maharashtra</option>
                          <option value="telangana">Telangana</option>
                          <option value="up">Uttar Pradesh</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    {/* Category */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Category</label>
                      <div className="relative">
                        <select className="w-full h-10 pl-3 pr-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-xs font-semibold text-slate-700 dark:text-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer">
                          <option value="">Category</option>
                          <option value="network">Network</option>
                          <option value="atm">ATM</option>
                          <option value="main">Main</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    {/* SubCategory */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">SubCategory</label>
                      <div className="relative">
                        <select className="w-full h-10 pl-3 pr-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-xs font-semibold text-slate-700 dark:text-slate-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer">
                          <option value="">SubCategory</option>
                          <option value="fiber">Fiber</option>
                          <option value="eco">Eco</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {/* Latitude */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Latitude <span className="text-rose-500">*</span></label>
                      <input
                        type="number"
                        defaultValue={lat.toFixed(6)}
                        step="0.000001"
                        className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    {/* Longitude */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Longitude <span className="text-rose-500">*</span></label>
                      <input
                        type="number"
                        defaultValue={lng.toFixed(6)}
                        step="0.000001"
                        className="h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                    {/* Search Location */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Search location</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search by place, address, landmark"
                          className="w-full h-10 pl-8 pr-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location on Map */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Location on Map</span>
                    </div>
                    <div className="h-56 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-700 relative">
                      {settingsMapMounted ? (
                        <MapContainer
                          center={[lat, lng]}
                          zoom={13}
                          className="w-full h-full z-0"
                          zoomControl={true}
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                          />
                          <Marker position={[lat, lng]} icon={getMarkerIcon(site.status)}>
                            <Popup>
                              <div className="p-1">
                                <h4 className="font-bold text-xs">{site.name}</h4>
                                <p className="text-[10px] text-slate-500 mt-0.5">ID: {site.id}</p>
                              </div>
                            </Popup>
                          </Marker>
                        </MapContainer>
                      ) : (
                        <div className="w-full h-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                          <span className="text-xs text-slate-400">Loading map...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button variant="outline" size="sm" className="h-9 text-xs font-semibold border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 cursor-pointer gap-1.5">
                      <Trash className="w-3.5 h-3.5 text-rose-500" /> Delete Site
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-9 text-xs font-semibold border-slate-200 dark:border-slate-700 cursor-pointer">
                        Cancel
                      </Button>
                      <Button size="sm" className="h-9 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer gap-1.5">
                        <Check className="w-3.5 h-3.5" /> Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Threshold + Contacts row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
                  <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-blue-500" /> Operational Alert Thresholds
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 flex flex-col gap-5">
                    {[
                      {label:"High Temperature Critical Limit (°C)", min:25, max:45, val:"38", unit:"°C"},
                      {label:"Low Battery Voltage Alarm Trigger (V)", min:44, max:52, val:"47.5", unit:"V"},
                      {label:"Mains Phase Under-Voltage Fault (V)", min:160, max:210, val:"180", unit:"V"},
                    ].map(t=>(
                      <div key={t.label}>
                        <div className="flex justify-between mb-2">
                          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t.label}</label>
                          <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400">{t.val}{t.unit}</span>
                        </div>
                        <input type="range" min={t.min} max={t.max} defaultValue={t.val}
                          className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                      </div>
                    ))}
                    <div className="flex justify-end pt-1">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer">
                        Save Thresholds
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
                  <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" /> Assigned NOC Engineers & Vendors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 flex flex-col gap-4">
                    {[
                      {init:"SP",name:"Suresh P.",role:"Field Lead Technician (Udaipur)",ph:"+91 98200 11223",mail:"suresh.p@jio.com",bg:"bg-blue-100 text-blue-700"},
                      {init:"PM",name:"Priya M.",role:"NOC Lead Coordinator",ph:"+91 99330 44556",mail:"priya.m@jio.com",bg:"bg-teal-100 text-teal-700"},
                    ].map((e,i)=>(
                      <div key={i} className={`flex items-start gap-3 ${i>0?"":"border-b border-slate-100 dark:border-slate-800 pb-4"}` }>
                        <div className={`w-10 h-10 rounded-full ${e.bg} flex items-center justify-center font-bold text-sm shrink-0`}>{e.init}</div>
                        <div className="flex-1">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{e.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">{e.role}</span>
                          <div className="flex flex-wrap gap-3 text-[10px] text-slate-400 mt-1 font-mono">
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{e.ph}</span>
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{e.mail}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      )}
    </div>
  );
}
