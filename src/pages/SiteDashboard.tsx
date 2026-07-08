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
  const [activeChartMetric, setActiveChartMetric] = useState<"power" | "current" | "voltage">("power");
  const [galleryLightboxImage, setGalleryLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    setMapMounted(true);
  }, []);

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

      {/* Tabs Dynamic Content Panel */}
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
                  <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/30 hover:shadow-md transition-all group overflow-hidden relative bg-white dark:bg-card">
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
                      </div>
                    </CardContent>
                  </Card>

                  {/* SPS Block */}
                  <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/30 hover:shadow-md transition-all group overflow-hidden relative bg-white dark:bg-card">
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
                      </div>
                    </CardContent>
                  </Card>

                  {/* DGCON Block */}
                  <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/30 hover:shadow-md transition-all group overflow-hidden relative bg-white dark:bg-card">
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
                      </div>
                    </CardContent>
                  </Card>

                  {/* PFLS Block */}
                  <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/30 hover:shadow-md transition-all group overflow-hidden relative bg-white dark:bg-card">
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
                      </div>
                    </CardContent>
                  </Card>

                  {/* BMS Block */}
                  <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/30 hover:shadow-md transition-all group overflow-hidden relative bg-white dark:bg-card">
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
                      </div>
                    </CardContent>
                  </Card>

                  {/* UPS Block */}
                  <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/30 hover:shadow-md transition-all group overflow-hidden relative bg-white dark:bg-card">
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
                      </div>
                    </CardContent>
                  </Card>

                  {/* Air Conditioner Block */}
                  <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/30 hover:shadow-md transition-all group overflow-hidden relative bg-white dark:bg-card">
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
                      </div>
                    </CardContent>
                  </Card>

                  {/* Servo Stabilizer Block */}
                  <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-500/30 hover:shadow-md transition-all group overflow-hidden relative bg-white dark:bg-card">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Alert thresholds card */}
              <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
                <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <Settings className="w-4.5 h-4.5 text-blue-500" /> Operational Alert Thresholds
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 flex flex-col gap-4">
                  {/* Slider/input mockups */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      High Temperature Critical Limit (°C)
                    </label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="25" 
                        max="45" 
                        defaultValue="38" 
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                      />
                      <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">38°C</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Low Battery Voltage Alarm Trigger (V)
                    </label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="44" 
                        max="52" 
                        defaultValue="47.5" 
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                      />
                      <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">47.5V</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Mains Phase Under-Voltage Fault (V)
                    </label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="160" 
                        max="210" 
                        defaultValue="180" 
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                      />
                      <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">180V</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs cursor-pointer">
                      Save Threshold Configurations
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance team contacts */}
              <Card className="border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-card">
                <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                    <User className="w-4.5 h-4.5 text-blue-500" /> Assigned NOC Engineers & Vendors
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 flex flex-col gap-4">
                  <div className="flex items-start gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      SP
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Suresh P.</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Field Lead Technician (Udaipur)</span>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 font-mono">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-500" /> +91 98200 11223</span>
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-500" /> suresh.p@jio.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                      PM
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Priya M.</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">NOC Lead Coordinator</span>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1 font-mono">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-500" /> +91 99330 44556</span>
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-500" /> priya.m@jio.com</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
