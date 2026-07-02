import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WidgetCard } from "@/components/WidgetCard";
import { mockMapMarkers } from "@/data/mockData";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Filter, Layers, Zap } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const getMarkerIcon = (severity: string) => {
  const color = severity === "CRITICAL" ? "#ef4444" : severity === "HIGH" ? "#f59e0b" : severity === "LOW" ? "#64748b" : "#10b981";
  
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px ${color};"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

export default function NetworkMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col gap-6">
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Network Map</h1>
        <div className="flex gap-2">
          <div className="bg-card border border-border rounded-md px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter Regions</span>
          </div>
          <div className="bg-card border border-border rounded-md px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Map Layers</span>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-border shadow-sm relative min-h-[600px]">
        {mounted && (
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
                    <p className="text-xs text-gray-500 mb-2">{site.location}</p>
                    <div className="flex gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono text-white ${
                        site.severity === 'CRITICAL' ? 'bg-red-500' : 
                        site.severity === 'HIGH' ? 'bg-amber-500' : 
                        site.severity === 'LOW' ? 'bg-gray-500' : 'bg-emerald-500'
                      }`}>
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

    </motion.div>
  );
}
