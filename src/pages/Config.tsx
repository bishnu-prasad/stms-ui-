import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Layers,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  Globe2,
  Building,
  Radio,
  SlidersHorizontal,
  FolderTree,
  Tag,
  Clock,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  RefreshCw,
  X,
  Check,
  Download,
  Copy,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* DATA STRUCTURES                                                           */
/* -------------------------------------------------------------------------- */

interface LocationItem {
  id: number;
  name: string;
  type: "zone" | "cluster" | "circle";
  updatedOn: string;
}

interface CategoryItem {
  id: number;
  name: string;
  parentCategory: string;
  type: "main" | "sub";
  updatedOn: string;
}

/* -------------------------------------------------------------------------- */
/* INITIAL PRESERVED DATASETS                                                 */
/* -------------------------------------------------------------------------- */

const initialLocations: LocationItem[] = [
  { id: 1, name: "zone 3", type: "zone", updatedOn: "2026-01-12 09:53:43" },
  { id: 2, name: "lucknow", type: "cluster", updatedOn: "2025-11-28 11:07:45" },
  { id: 3, name: "Bikaner", type: "cluster", updatedOn: "2025-11-28 11:07:34" },
  { id: 4, name: "Ajmer", type: "cluster", updatedOn: "2025-11-28 11:07:23" },
  { id: 5, name: "Jodhpur", type: "cluster", updatedOn: "2025-11-28 11:07:01" },
  { id: 6, name: "Wardha", type: "cluster", updatedOn: "2025-11-28 11:05:53" },
  { id: 7, name: "Sambhaji Nagar", type: "cluster", updatedOn: "2025-11-28 11:03:43" },
  { id: 8, name: "Hyderabad", type: "cluster", updatedOn: "2025-11-28 11:02:41" },
  { id: 9, name: "Telangana", type: "circle", updatedOn: "2025-11-28 11:02:26" },
];

const initialCategories: CategoryItem[] = [
  { id: 1, name: "Network", parentCategory: "—", type: "main", updatedOn: "2025-11-09 13:37:03" },
  { id: 2, name: "Fiber", parentCategory: "Network", type: "sub", updatedOn: "2025-11-09 13:37:03" },
  { id: 3, name: "ATM", parentCategory: "None", type: "main", updatedOn: "2025-11-10 06:18:16" },
  { id: 4, name: "Eco", parentCategory: "ATM", type: "sub", updatedOn: "2025-11-10 06:19:39" },
  { id: 5, name: "Main", parentCategory: "None", type: "main", updatedOn: "2025-11-10 06:29:41" },
  { id: 6, name: "Category", parentCategory: "None", type: "main", updatedOn: "2025-11-11 06:08:25" },
  { id: 7, name: "Sub-Category", parentCategory: "Category", type: "sub", updatedOn: "2025-11-11 06:08:50" },
];

/* -------------------------------------------------------------------------- */
/* CONFIG COMPONENT                                                           */
/* -------------------------------------------------------------------------- */

export default function Config() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const tabFromUrl = searchParams.get("tab") || "location";

  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // LOCATIONS STATE
  const [locations, setLocations] = useState<LocationItem[]>(initialLocations);
  const [locFilterType, setLocFilterType] = useState("all");
  const [locSearchQuery, setLocSearchQuery] = useState("");
  const [isAddLocModalOpen, setIsAddLocModalOpen] = useState(false);
  const [newLocName, setNewLocName] = useState("");
  const [newLocType, setNewLocType] = useState<"zone" | "cluster" | "circle">("cluster");

  // CATEGORIES STATE
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [catFilterType, setCatFilterType] = useState("all");
  const [catSearchQuery, setCatSearchQuery] = useState("");
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatParent, setNewCatParent] = useState("None");
  const [newCatType, setNewCatType] = useState<"main" | "sub">("main");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");
    if (tab === "location" || tab === "category") {
      setActiveTab(tab);
    }
  }, [location, window.location.search]);

  // ADD LOCATION HANDLER
  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocName.trim()) return;
    const newItem: LocationItem = {
      id: locations.length + 1,
      name: newLocName.trim(),
      type: newLocType,
      updatedOn: new Date().toISOString().replace("T", " ").substring(0, 19),
    };
    setLocations([newItem, ...locations]);
    setNewLocName("");
    setIsAddLocModalOpen(false);
  };

  // ADD CATEGORY HANDLER
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const newItem: CategoryItem = {
      id: categories.length + 1,
      name: newCatName.trim(),
      parentCategory: newCatParent,
      type: newCatType,
      updatedOn: new Date().toISOString().replace("T", " ").substring(0, 19),
    };
    setCategories([newItem, ...categories]);
    setNewCatName("");
    setIsAddCatModalOpen(false);
  };

  // DELETE LOCATION
  const handleDeleteLocation = (id: number) => {
    setLocations(locations.filter((item) => item.id !== id));
  };

  // DELETE CATEGORY
  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((item) => item.id !== id));
  };

  // FILTER LOCATIONS
  const filteredLocations = locations.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(locSearchQuery.toLowerCase());
    const matchesType = locFilterType === "all" || item.type === locFilterType;
    return matchesSearch && matchesType;
  });

  // FILTER CATEGORIES
  const filteredCategories = categories.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(catSearchQuery.toLowerCase()) ||
      item.parentCategory.toLowerCase().includes(catSearchQuery.toLowerCase());
    const matchesType = catFilterType === "all" || item.type === catFilterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* 1. EXECUTIVE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              System Configuration
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60">
              STMS V3 CONTROL PANEL
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage geographical telemetry hierarchy (Zones, Clusters, Circles) and system alarm taxonomy categories
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "location" ? (
            <Button
              onClick={() => setIsAddLocModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Location
            </Button>
          ) : (
            <Button
              onClick={() => setIsAddCatModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Category
            </Button>
          )}
        </div>
      </div>

      {/* 2. SUB-TABS SWITCHER */}
      <div className="border-b border-slate-200 dark:border-border flex gap-6 overflow-x-auto pt-1 pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab("location")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "location"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Location Management</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            {locations.length} Entries
          </span>
          {activeTab === "location" && (
            <motion.div
              layoutId="config-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("category")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "category"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Category Management</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
            {categories.length} Taxonomy Types
          </span>
          {activeTab === "category" && (
            <motion.div
              layoutId="config-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: LOCATION CONFIGURATION                                        */}
      {/* ==================================================================== */}
      {activeTab === "location" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Top Location Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 block">
                  {locations.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Total Locations</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-purple-600 dark:text-purple-400 block">
                  {locations.filter((l) => l.type === "zone").length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Zones Monitored</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-blue-600 dark:text-blue-400 block">
                  {locations.filter((l) => l.type === "cluster").length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Clusters Active</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block">
                  {locations.filter((l) => l.type === "circle").length}
                </span>
                <span className="text-xs text-slate-500 font-medium">State Circles</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Location Toolbar */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setLocFilterType("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  locFilterType === "all"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                All ({locations.length})
              </button>
              <button
                onClick={() => setLocFilterType("zone")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  locFilterType === "zone"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60"
                }`}
              >
                Zones (1)
              </button>
              <button
                onClick={() => setLocFilterType("cluster")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  locFilterType === "cluster"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60"
                }`}
              >
                Clusters (7)
              </button>
              <button
                onClick={() => setLocFilterType("circle")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  locFilterType === "circle"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60"
                }`}
              >
                Circles (1)
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search location name (⌘K)..."
                value={locSearchQuery}
                onChange={(e) => setLocSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>

          {/* Location Matrix Table */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-5 py-3.5 text-left">ID</th>
                    <th className="px-5 py-3.5 text-left">LOCATION NAME</th>
                    <th className="px-5 py-3.5 text-left">HIERARCHY TYPE</th>
                    <th className="px-5 py-3.5 text-left">LAST UPDATED</th>
                    <th className="px-5 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredLocations.map((loc) => {
                    const typeBadge =
                      loc.type === "zone" ? (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200/60">
                          ZONE
                        </span>
                      ) : loc.type === "cluster" ? (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/60">
                          CLUSTER
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/60">
                          CIRCLE
                        </span>
                      );

                    return (
                      <tr key={loc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-slate-400">#{loc.id.toString().padStart(2, "0")}</td>
                        <td className="px-5 py-4 font-bold text-slate-900 dark:text-slate-100 text-xs capitalize">
                          {loc.name}
                        </td>
                        <td className="px-5 py-4">{typeBadge}</td>
                        <td className="px-5 py-4 font-mono text-slate-500 text-xs flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {loc.updatedOn}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-blue-600">
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteLocation(loc.id)}
                              className="h-7 w-7 p-0 text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
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

      {/* ==================================================================== */}
      {/* TAB 2: CATEGORY CONFIGURATION                                        */}
      {/* ==================================================================== */}
      {activeTab === "category" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Top Category Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 block">
                  {categories.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Total Categories</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <FolderTree className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 block">
                  {categories.filter((c) => c.type === "main").length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Main Categories</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-sky-600 dark:text-sky-400 block">
                  {categories.filter((c) => c.type === "sub").length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Sub-Categories</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Category Toolbar */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setCatFilterType("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  catFilterType === "all"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                All ({categories.length})
              </button>
              <button
                onClick={() => setCatFilterType("main")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  catFilterType === "main"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60"
                }`}
              >
                Main Categories (4)
              </button>
              <button
                onClick={() => setCatFilterType("sub")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  catFilterType === "sub"
                    ? "bg-sky-600 text-white shadow-xs"
                    : "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200/60"
                }`}
              >
                Sub-Categories (3)
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search category name (⌘K)..."
                value={catSearchQuery}
                onChange={(e) => setCatSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>

          {/* Category Matrix Table */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-5 py-3.5 text-left">ID</th>
                    <th className="px-5 py-3.5 text-left">CATEGORY NAME</th>
                    <th className="px-5 py-3.5 text-left">PARENT CATEGORY</th>
                    <th className="px-5 py-3.5 text-left">TAXONOMY TYPE</th>
                    <th className="px-5 py-3.5 text-left">LAST UPDATED</th>
                    <th className="px-5 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredCategories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-slate-400">#{cat.id.toString().padStart(2, "0")}</td>
                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-slate-100 text-xs">
                        {cat.name}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {cat.parentCategory}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {cat.type === "main" ? (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/60">
                            MAIN CATEGORY
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border border-sky-200/60">
                            SUB CATEGORY
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 font-mono text-slate-500 text-xs flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {cat.updatedOn}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-blue-600">
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="h-7 w-7 p-0 text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================================================================== */}
      {/* MODAL DIALOG: ADD LOCATION                                           */}
      {/* ==================================================================== */}
      {isAddLocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl p-6 shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" /> Add New Telemetry Location
              </h3>
              <button
                onClick={() => setIsAddLocModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddLocation} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Location Name
                </label>
                <Input
                  required
                  placeholder="e.g. Jaipur, Zone 4, NCR West"
                  value={newLocName}
                  onChange={(e) => setNewLocName(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hierarchy Type
                </label>
                <select
                  value={newLocType}
                  onChange={(e: any) => setNewLocType(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none"
                >
                  <option value="zone">Zone</option>
                  <option value="cluster">Cluster</option>
                  <option value="circle">Circle</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddLocModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-blue-600 text-white font-semibold">
                  Save Location
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL DIALOG: ADD CATEGORY                                           */}
      {/* ==================================================================== */}
      {isAddCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl p-6 shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-600" /> Add New Taxonomy Category
              </h3>
              <button
                onClick={() => setIsAddCatModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category Name
                </label>
                <Input
                  required
                  placeholder="e.g. Rectifier, DG Power, Transmission"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parent Category
                </label>
                <Input
                  placeholder="e.g. Network, ATM or None"
                  value={newCatParent}
                  onChange={(e) => setNewCatParent(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category Type
                </label>
                <select
                  value={newCatType}
                  onChange={(e: any) => setNewCatType(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium outline-none"
                >
                  <option value="main">Main Category</option>
                  <option value="sub">Sub Category</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddCatModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-blue-600 text-white font-semibold">
                  Save Category
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
