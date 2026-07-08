import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShieldCheck,
  Key,
  Plus,
  Search,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  LogIn,
  Trash2,
  Edit2,
  SlidersHorizontal,
  Mail,
  Shield,
  UserCheck,
  UserX,
  Globe,
  Lock,
  X,
  Sparkles,
  ChevronRight,
  MoreVertical,
  Check,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* DATA STRUCTURES                                                           */
/* -------------------------------------------------------------------------- */

interface UserAccount {
  id: string;
  name: string;
  email: string;
  access: boolean;
  view: "LTR" | "RTL";
  language: string;
  status: "Active" | "Inactive";
  roleType: "Vendor" | "Admin";
  initials: string;
}

interface RoleRecord {
  id: string;
  title: string;
  description: string;
  assignedUsers: number;
  permissions: string[];
  status: "Active" | "Draft";
}

/* -------------------------------------------------------------------------- */
/* PRESERVED DATASETS FROM SCREENSHOTS                                       */
/* -------------------------------------------------------------------------- */

const initialVendors: UserAccount[] = [
  {
    id: "v-1",
    name: "ankush deshmukh",
    email: "ankushd919@gmail.com",
    access: true,
    view: "LTR",
    language: "English",
    status: "Active",
    roleType: "Vendor",
    initials: "AD",
  },
  {
    id: "v-2",
    name: "Gaurav indio",
    email: "gaurav.jadhav1@indionetworks.com",
    access: true,
    view: "LTR",
    language: "English",
    status: "Active",
    roleType: "Vendor",
    initials: "GI",
  },
  {
    id: "v-3",
    name: "sohail MD",
    email: "sohail@indionetworks.com",
    access: true,
    view: "LTR",
    language: "English",
    status: "Active",
    roleType: "Vendor",
    initials: "SM",
  },
];

const initialAdmins: UserAccount[] = [
  {
    id: "a-1",
    name: "ankush 9191c",
    email: "ankushd9191@gmail.com",
    access: true,
    view: "LTR",
    language: "English",
    status: "Active",
    roleType: "Admin",
    initials: "A9",
  },
  {
    id: "a-2",
    name: "admin baner",
    email: "adminbaner@atc.com",
    access: true,
    view: "RTL",
    language: "English",
    status: "Inactive",
    roleType: "Admin",
    initials: "AB",
  },
  {
    id: "a-3",
    name: "admin rajasthan",
    email: "adminrajasthan@atc.com",
    access: true,
    view: "LTR",
    language: "English",
    status: "Inactive",
    roleType: "Admin",
    initials: "AR",
  },
  {
    id: "a-4",
    name: "aditya j",
    email: "adi91@gmail.com",
    access: true,
    view: "LTR",
    language: "English",
    status: "Active",
    roleType: "Admin",
    initials: "AJ",
  },
  {
    id: "a-5",
    name: "Mohit Mathur",
    email: "mohit.m@inteluxindia.com",
    access: true,
    view: "LTR",
    language: "English",
    status: "Inactive",
    roleType: "Admin",
    initials: "MM",
  },
  {
    id: "a-6",
    name: "Prem Kumar",
    email: "Premkumar.Kp@altiusinfra.com",
    access: true,
    view: "LTR",
    language: "English",
    status: "Active",
    roleType: "Admin",
    initials: "PK",
  },
  {
    id: "a-7",
    name: "Ravi Intelux",
    email: "ravi.d@inteluxindia.com",
    access: true,
    view: "LTR",
    language: "English",
    status: "Active",
    roleType: "Admin",
    initials: "RI",
  },
  {
    id: "a-8",
    name: "Vendor india",
    email: "vendor.india@atc.com",
    access: true,
    view: "LTR",
    language: "English",
    status: "Inactive",
    roleType: "Admin",
    initials: "VI",
  },
];

const initialRoles: RoleRecord[] = [
  {
    id: "r-1",
    title: "Super Administrator",
    description: "Full system control across Analytics, Alarms, Config, Sites, and User IAM Matrix.",
    assignedUsers: 12,
    permissions: ["Full IAM", "Global Telemetry Edit", "System Config", "Export All Data"],
    status: "Active",
  },
  {
    id: "r-2",
    title: "NOC Operations Lead",
    description: "Real-time alarm triage, incident resolution, dispatch field tech, and telemetry monitoring.",
    assignedUsers: 18,
    permissions: ["Alarms Triage", "Field Ops Dispatch", "Telemetry Stream", "Reports Export"],
    status: "Active",
  },
  {
    id: "r-3",
    title: "Field Service Engineer",
    description: "On-site tower diagnostics, battery/DG status updates, and ticket resolution.",
    assignedUsers: 45,
    permissions: ["Site Diagnostics", "Ticket Close", "Voltage Log"],
    status: "Active",
  },
  {
    id: "r-4",
    title: "Vendor Manager",
    description: "SLA compliance tracking, vendor insights analytics, and reliability monitoring.",
    assignedUsers: 15,
    permissions: ["Vendor Insights", "SLA Reports", "Equipment Audit"],
    status: "Active",
  },
  {
    id: "r-5",
    title: "Read-Only Operator",
    description: "Executive read-only access to network overview and performance metrics.",
    assignedUsers: 8,
    permissions: ["View Dashboards", "Read Telemetry"],
    status: "Active",
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN USERS COMPONENT                                                       */
/* -------------------------------------------------------------------------- */

export default function UsersPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const tabFromUrl = searchParams.get("tab") || "vendors";

  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // VENDORS & ADMINS STATE
  const [vendors, setVendors] = useState<UserAccount[]>(initialVendors);
  const [admins, setAdmins] = useState<UserAccount[]>(initialAdmins);
  const [roles, setRoles] = useState<RoleRecord[]>(initialRoles);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewFilter, setViewFilter] = useState("all");

  // MODAL STATES
  const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);

  // FORM INPUTS
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newView, setNewView] = useState<"LTR" | "RTL">("LTR");
  const [newStatus, setNewStatus] = useState<"Active" | "Inactive">("Active");

  // Premium additional fields
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newAccess, setNewAccess] = useState(true);
  const [newLanguage, setNewLanguage] = useState("English");
  const [newTimezone, setNewTimezone] = useState("(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi");
  const [newDateFormat, setNewDateFormat] = useState("YYYY-MM-DD");
  const [newLocation, setNewLocation] = useState("All Locations");

  // ROLE FORM INPUTS
  const [newRoleTitle, setNewRoleTitle] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  useEffect(() => {
    const handleUrlChange = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const tab = searchParams.get("tab");
      if (tab === "vendors" || tab === "admins" || tab === "roles") {
        setActiveTab(tab);
      }
    };
    window.addEventListener("popstate", handleUrlChange);
    handleUrlChange();
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  // HANDLER: ADD VENDOR
  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    const fullName = `${newFirstName.trim()} ${newLastName.trim()}`.trim() || newName.trim() || "New Vendor";
    const initials = fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const newRecord: UserAccount = {
      id: `v-${Date.now()}`,
      name: fullName,
      email: newEmail.trim(),
      access: newAccess,
      view: newView,
      language: newLanguage,
      status: newStatus,
      roleType: "Vendor",
      initials,
    };

    setVendors([newRecord, ...vendors]);
    setNewName("");
    setNewEmail("");
    setNewFirstName("");
    setNewLastName("");
    setNewPassword("");
    setNewAccess(true);
    setNewLanguage("English");
    setNewTimezone("(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi");
    setNewDateFormat("YYYY-MM-DD");
    setNewLocation("All Locations");
    setIsAddVendorModalOpen(false);
  };

  // HANDLER: ADD ADMIN
  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    const fullName = `${newFirstName.trim()} ${newLastName.trim()}`.trim() || newName.trim() || "New Admin";
    const initials = fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const newRecord: UserAccount = {
      id: `a-${Date.now()}`,
      name: fullName,
      email: newEmail.trim(),
      access: newAccess,
      view: newView,
      language: newLanguage,
      status: newStatus,
      roleType: "Admin",
      initials,
    };

    setAdmins([newRecord, ...admins]);
    setNewName("");
    setNewEmail("");
    setNewFirstName("");
    setNewLastName("");
    setNewPassword("");
    setNewAccess(true);
    setNewLanguage("English");
    setNewTimezone("(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi");
    setNewDateFormat("YYYY-MM-DD");
    setNewLocation("All Locations");
    setIsAddAdminModalOpen(false);
  };

  // HANDLER: ADD ROLE
  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleTitle.trim()) return;

    const newRecord: RoleRecord = {
      id: `r-${Date.now()}`,
      title: newRoleTitle.trim(),
      description: newRoleDesc.trim() || "Custom RBAC Role for Telecom NOC Management.",
      assignedUsers: 1,
      permissions: ["View Telemetry", "Acknowledge Alarms"],
      status: "Active",
    };

    setRoles([newRecord, ...roles]);
    setNewRoleTitle("");
    setNewRoleDesc("");
    setIsAddRoleModalOpen(false);
  };

  // DELETE HANDLERS
  const handleDeleteVendor = (id: string) => setVendors(vendors.filter((v) => v.id !== id));
  const handleDeleteAdmin = (id: string) => setAdmins(admins.filter((a) => a.id !== id));
  const handleDeleteRole = (id: string) => setRoles(roles.filter((r) => r.id !== id));

  // FILTER LOGIC
  const filteredVendors = vendors.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesView = viewFilter === "all" || user.view.toLowerCase() === viewFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesView;
  });

  const filteredAdmins = admins.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesView = viewFilter === "all" || user.view.toLowerCase() === viewFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesView;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* 1. EXECUTIVE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Identity & Access Management
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60">
              IAM SECURITY CENTER
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage NOC vendor accounts, system administrators, and role-based access control (RBAC) matrix
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "vendors" && (
            <Button
              onClick={() => setIsAddVendorModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Vendor
            </Button>
          )}
          {activeTab === "admins" && (
            <Button
              onClick={() => setIsAddAdminModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Admin
            </Button>
          )}
          {activeTab === "roles" && (
            <Button
              onClick={() => setIsAddRoleModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Create Role
            </Button>
          )}
        </div>
      </div>

      {/* 2. SUB-TABS SWITCHER */}
      <div className="border-b border-slate-200 dark:border-border flex gap-6 overflow-x-auto pt-1 pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab("vendors")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "vendors"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Vendors</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            {vendors.length} Accounts
          </span>
          {activeTab === "vendors" && (
            <motion.div
              layoutId="users-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("admins")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "admins"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Admins</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
            {admins.length} Admins
          </span>
          {activeTab === "admins" && (
            <motion.div
              layoutId="users-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          className={`pb-3 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none ${
            activeTab === "roles"
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Roles & Permissions</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            {roles.length} Active RBAC
          </span>
          {activeTab === "roles" && (
            <motion.div
              layoutId="users-subtab-underline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
            />
          )}
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: VENDORS                                                       */}
      {/* ==================================================================== */}
      {activeTab === "vendors" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 block">
                  {vendors.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Vendor User Accounts</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block">
                  {vendors.filter((v) => v.status === "Active").length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Active & Authenticated</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-blue-600 dark:text-blue-400 block">
                  100%
                </span>
                <span className="text-xs text-slate-500 font-medium">Granted NOC Access</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                All ({vendors.length})
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === "active"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60"
                }`}
              >
                Active (3)
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search name or email (⌘K)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>

          {/* Vendors Table */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-5 py-3.5 text-left">VENDOR USER</th>
                    <th className="px-5 py-3.5 text-center">ACCESS PERMISSION</th>
                    <th className="px-5 py-3.5 text-center">VIEW MODE</th>
                    <th className="px-5 py-3.5 text-center">LANGUAGE</th>
                    <th className="px-5 py-3.5 text-center">STATUS</th>
                    <th className="px-5 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
                      {/* User Info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                            {vendor.initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-slate-100 text-xs capitalize">
                              {vendor.name}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {vendor.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Access Permission */}
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-500" /> GRANTED
                        </span>
                      </td>

                      {/* View Mode */}
                      <td className="px-5 py-4 text-center">
                        <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {vendor.view}
                        </span>
                      </td>

                      {/* Language */}
                      <td className="px-5 py-4 text-center font-medium text-slate-700 dark:text-slate-300">
                        {vendor.language}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 text-center">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
                          ACTIVE
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-none shadow-2xs"
                            title="Log in / Impersonate"
                          >
                            <LogIn className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteVendor(vendor.id)}
                            className="h-7 w-7 p-0 bg-rose-600 hover:bg-rose-700 text-white border-none shadow-2xs"
                            title="Delete Vendor"
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
      {/* TAB 2: ADMINS                                                        */}
      {/* ==================================================================== */}
      {activeTab === "admins" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 block">
                  {admins.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">System Administrators</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block">
                  {admins.filter((a) => a.status === "Active").length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Active & Online</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-rose-600 dark:text-rose-400 block">
                  {admins.filter((a) => a.status === "Inactive").length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Inactive Accounts</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                <UserX className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                All ({admins.length})
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === "active"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60"
                }`}
              >
                Active (5)
              </button>
              <button
                onClick={() => setStatusFilter("inactive")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === "inactive"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60"
                }`}
              >
                Inactive (3)
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search admin name or email (⌘K)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>

          {/* Admins Table */}
          <div className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50/90 dark:bg-slate-900/70 border-b border-slate-200 dark:border-border text-slate-500 uppercase tracking-wider font-bold">
                    <th className="px-5 py-3.5 text-left">ADMIN USER</th>
                    <th className="px-5 py-3.5 text-center">ACCESS PERMISSION</th>
                    <th className="px-5 py-3.5 text-center">VIEW MODE</th>
                    <th className="px-5 py-3.5 text-center">LANGUAGE</th>
                    <th className="px-5 py-3.5 text-center">STATUS</th>
                    <th className="px-5 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors">
                      {/* Admin Info */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                            {admin.initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 dark:text-slate-100 text-xs capitalize">
                              {admin.name}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {admin.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Access */}
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-500" /> GRANTED
                        </span>
                      </td>

                      {/* View */}
                      <td className="px-5 py-4 text-center">
                        <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {admin.view}
                        </span>
                      </td>

                      {/* Language */}
                      <td className="px-5 py-4 text-center font-medium text-slate-700 dark:text-slate-300">
                        {admin.language}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 text-center">
                        {admin.status === "Active" ? (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200">
                            INACTIVE
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0 bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-none shadow-2xs"
                            title="Log in / Impersonate"
                          >
                            <LogIn className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="h-7 w-7 p-0 bg-rose-600 hover:bg-rose-700 text-white border-none shadow-2xs"
                            title="Delete Admin"
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
      {/* TAB 3: ROLES & RBAC MATRIX                                           */}
      {/* ==================================================================== */}
      {activeTab === "roles" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-6"
        >
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100 block">
                  {roles.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Active RBAC Security Roles</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 block">
                  96
                </span>
                <span className="text-xs text-slate-500 font-medium">Assigned NOC Personnel</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-card border border-slate-200/80 dark:border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold font-mono text-blue-600 dark:text-blue-400 block">
                  24
                </span>
                <span className="text-xs text-slate-500 font-medium">Granular Permission Nodes</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Roles Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roles.map((role) => (
              <div
                key={role.id}
                className="bg-white dark:bg-card border border-slate-200/90 dark:border-border rounded-2xl p-5 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center font-bold">
                        <Key className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {role.title}
                      </h3>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {role.assignedUsers} Users
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                    {role.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Granted Permissions:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((p, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                          ✓ {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-border flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Security Policy
                  </span>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-blue-600">
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                      className="h-7 w-7 p-0 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ==================================================================== */}
      {/* MODAL DIALOG: ADD VENDOR                                             */}
      {/* ==================================================================== */}
      {isAddVendorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl p-6 shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">Add New Vendor Account</span>
                  <span className="text-[10px] text-slate-400 font-medium block">Configure profile fields, localizations, and permissions</span>
                </div>
              </h3>
              <button
                onClick={() => setIsAddVendorModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddVendor} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name & Last Name */}
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">First Name</label>
                  <Input
                    required
                    placeholder="e.g. Rajesh"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="h-9 text-xs rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Last Name</label>
                  <Input
                    required
                    placeholder="e.g. Kumar"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="h-9 text-xs rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  />
                </div>

                {/* Email & Password */}
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Email / Username</label>
                  <Input
                    required
                    type="email"
                    placeholder="e.g. rajesh@vendor.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="h-9 text-xs rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Password</label>
                  <Input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-9 text-xs rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  />
                </div>

                {/* Location & Language */}
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Location scope</label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs font-medium outline-none"
                  >
                    <option value="All Locations">All Locations</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Telangana">Telangana</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Language</label>
                  <select
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs font-medium outline-none"
                  >
                    <option value="English">English (United States)</option>
                    <option value="Hindi">Hindi (India)</option>
                    <option value="Spanish">Spanish (Spain)</option>
                    <option value="German">German (Germany)</option>
                  </select>
                </div>

                {/* Date Format & Timezone */}
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Date Format</label>
                  <select
                    value={newDateFormat}
                    onChange={(e) => setNewDateFormat(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs font-medium outline-none"
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-07-08)</option>
                    <option value="DD-MM-YYYY">DD-MM-YYYY (e.g. 08-07-2026)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 07/08/2026)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">TimeZone</label>
                  <select
                    value={newTimezone}
                    onChange={(e) => setNewTimezone(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs font-medium outline-none"
                  >
                    <option value="(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi">(GMT+05:30) Mumbai, New Delhi</option>
                    <option value="(GMT-05:00) Eastern Time (US & Canada)">(GMT-05:00) Eastern Time (US)</option>
                    <option value="(GMT+00:00) Greenwich Mean Time (London)">(GMT+00:00) GMT (London)</option>
                    <option value="(GMT+08:00) Beijing, Singapore">(GMT+08:00) Singapore</option>
                  </select>
                </div>

                {/* Access, Status & View Mode */}
                <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Access Permission</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setNewAccess(true)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          newAccess
                            ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Grant
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewAccess(false)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          !newAccess
                            ? "bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Revoke
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Status</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setNewStatus("Active")}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          newStatus === "Active"
                            ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewStatus("Inactive")}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          newStatus === "Inactive"
                            ? "bg-white dark:bg-slate-800 text-slate-500 shadow-xs font-extrabold"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">View Layout</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setNewView("LTR")}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          newView === "LTR"
                            ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        LTR
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewView("RTL")}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          newView === "RTL"
                            ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        RTL
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddVendorModalOpen(false)}
                  className="rounded-lg text-xs"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs">
                  Save Vendor
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL DIALOG: ADD ADMIN                                              */}
      {/* ==================================================================== */}
      {isAddAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl p-6 shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-5 border-b border-slate-100 dark:border-slate-800 pb-3.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">Add New Administrator</span>
                  <span className="text-[10px] text-slate-400 font-medium block">Configure administrative credentials, localizations, and permissions</span>
                </div>
              </h3>
              <button
                onClick={() => setIsAddAdminModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAdmin} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name & Last Name */}
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">First Name</label>
                  <Input
                    required
                    placeholder="e.g. Vikram"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="h-9 text-xs rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Last Name</label>
                  <Input
                    required
                    placeholder="e.g. Sharma"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="h-9 text-xs rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  />
                </div>

                {/* Email & Password */}
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Email / Username</label>
                  <Input
                    required
                    type="email"
                    placeholder="e.g. vikram@atc.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="h-9 text-xs rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Password</label>
                  <Input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-9 text-xs rounded-xl bg-slate-50/50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  />
                </div>

                {/* Location & Language */}
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Location scope</label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs font-medium outline-none"
                  >
                    <option value="All Locations">All Locations</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Telangana">Telangana</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Language</label>
                  <select
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs font-medium outline-none"
                  >
                    <option value="English">English (United States)</option>
                    <option value="Hindi">Hindi (India)</option>
                    <option value="Spanish">Spanish (Spain)</option>
                    <option value="German">German (Germany)</option>
                  </select>
                </div>

                {/* Date Format & Timezone */}
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">Date Format</label>
                  <select
                    value={newDateFormat}
                    onChange={(e) => setNewDateFormat(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs font-medium outline-none"
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-07-08)</option>
                    <option value="DD-MM-YYYY">DD-MM-YYYY (e.g. 08-07-2026)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 07/08/2026)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-400 mb-1">TimeZone</label>
                  <select
                    value={newTimezone}
                    onChange={(e) => setNewTimezone(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-xs font-medium outline-none"
                  >
                    <option value="(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi">(GMT+05:30) Mumbai, New Delhi</option>
                    <option value="(GMT-05:00) Eastern Time (US & Canada)">(GMT-05:00) Eastern Time (US)</option>
                    <option value="(GMT+00:00) Greenwich Mean Time (London)">(GMT+00:00) GMT (London)</option>
                    <option value="(GMT+08:00) Beijing, Singapore">(GMT+08:00) Singapore</option>
                  </select>
                </div>

                {/* Access, Status & View Mode */}
                <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Access Permission</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setNewAccess(true)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          newAccess
                            ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Grant
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewAccess(false)}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          !newAccess
                            ? "bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Revoke
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Status</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setNewStatus("Active")}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          newStatus === "Active"
                            ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewStatus("Inactive")}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          newStatus === "Inactive"
                            ? "bg-white dark:bg-slate-800 text-slate-500 shadow-xs font-extrabold"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">View Layout</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setNewView("LTR")}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          newView === "LTR"
                            ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        LTR
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewView("RTL")}
                        className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          newView === "RTL"
                            ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        RTL
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddAdminModalOpen(false)}
                  className="rounded-lg text-xs"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg shadow-xs">
                  Save Admin
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL DIALOG: ADD ROLE                                               */}
      {/* ==================================================================== */}
      {isAddRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-card border border-slate-200 dark:border-border rounded-2xl p-6 shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-600" /> Create New Security Role
              </h3>
              <button
                onClick={() => setIsAddRoleModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddRole} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Role Title
                </label>
                <Input
                  required
                  placeholder="e.g. NOC Audit Manager"
                  value={newRoleTitle}
                  onChange={(e) => setNewRoleTitle(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <Input
                  placeholder="Role responsibilities & scope..."
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddRoleModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-blue-600 text-white font-semibold">
                  Save Role
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
