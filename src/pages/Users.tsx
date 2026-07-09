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

  // EDIT MODAL STATES
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editTimezone, setEditTimezone] = useState("");
  const [editLanguage, setEditLanguage] = useState("");
  const [editDateFormat, setEditDateFormat] = useState("");
  const [editLocations, setEditLocations] = useState<string[]>([]);
  const [editStatus, setEditStatus] = useState<"Active" | "Inactive">("Active");
  const [editAccess, setEditAccess] = useState(true);
  const [editView, setEditView] = useState<"LTR" | "RTL">("LTR");
  const [edit2FA, setEdit2FA] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState<"details" | "access" | "activity">("details");

  // Mock list of locations for dropdown select
  const availableLocations = [
    "Mumbai NOC", "Delhi Tower Alpha", "Chennai Datacenter", 
    "Kolkata Hub", "Bangalore R&D", "Pune Edge Site", "Hyderabad Exchange"
  ];

  // Permissions state for Edit Access tab
  const [editPermissions, setEditPermissions] = useState<Record<string, boolean>>({
    "View My Sites": true,
    "Get Site Details": true,
    "Update Site Configuration": false,
    "Export Reports": false,
    "Trigger Alarms Triage": false,
    "Manage Vendor Dispatch": false,
  });

  const handleOpenEditModal = (user: UserAccount) => {
    setSelectedUser(user);
    const names = user.name.split(" ");
    setEditFirstName(names[0] || "");
    setEditLastName(names.slice(1).join(" ") || "");
    setEditEmail(user.email);
    setEditTimezone("(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi");
    setEditLanguage(user.language || "English");
    setEditDateFormat("YYYY-MM-DD");
    setEditLocations(["Mumbai NOC", "Delhi Tower Alpha"]);
    setEditStatus(user.status);
    setEditAccess(user.access);
    setEditView(user.view);
    setEdit2FA(user.id === "v-1" || user.id === "a-1"); // Default true for ankush users
    
    // Reset permissions based on type
    if (user.roleType === "Admin") {
      setEditPermissions({
        "View My Sites": true,
        "Get Site Details": true,
        "Update Site Configuration": true,
        "Export Reports": true,
        "Trigger Alarms Triage": true,
        "Manage Vendor Dispatch": true,
      });
    } else {
      setEditPermissions({
        "View My Sites": true,
        "Get Site Details": true,
        "Update Site Configuration": false,
        "Export Reports": false,
        "Trigger Alarms Triage": false,
        "Manage Vendor Dispatch": false,
      });
    }

    setActiveDetailTab("details");
    setIsEditModalOpen(true);
  };

  const handleUpdateDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const updatedName = `${editFirstName.trim()} ${editLastName.trim()}`.trim() || selectedUser.name;
    const initials = updatedName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    const updatedUser: UserAccount = {
      ...selectedUser,
      name: updatedName,
      email: editEmail,
      status: editStatus,
      access: editAccess,
      view: editView,
      language: editLanguage,
      initials,
    };

    if (selectedUser.roleType === "Vendor") {
      setVendors(vendors.map((v) => (v.id === selectedUser.id ? updatedUser : v)));
    } else {
      setAdmins(admins.map((a) => (a.id === selectedUser.id ? updatedUser : a)));
    }

    setIsEditModalOpen(false);
  };

  const handleTogglePermission = (permission: string) => {
    setEditPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

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
                            onClick={() => handleOpenEditModal(vendor)}
                            className="h-7 w-7 p-0 bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-none shadow-2xs"
                            title="View & Edit Details"
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
                            onClick={() => handleOpenEditModal(admin)}
                            className="h-7 w-7 p-0 bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-none shadow-2xs"
                            title="View & Edit Details"
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

      {/* ==================================================================== */}
      {/* MODAL DIALOG: VIEW / EDIT USER DETAILS (PREMIUM & UNIQUE)            */}
      {/* ==================================================================== */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-905/60 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row h-[85vh] max-h-[720px] text-left"
          >
            {/* Left Sidebar Info Card */}
            <div className="md:w-80 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center justify-between shrink-0">
              <div className="w-full space-y-5">
                {/* Top Title/Badge */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-250 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    User Profile
                  </span>
                  <Badge className={`${selectedUser.roleType === 'Admin' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'} text-white text-[9px] uppercase font-bold tracking-wider`}>
                    {selectedUser.roleType}
                  </Badge>
                </div>

                {/* Avatar and Info */}
                <div className="flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${selectedUser.roleType === 'Admin' ? 'from-indigo-500 to-purple-600' : 'from-blue-500 to-cyan-500'} text-white flex items-center justify-center font-extrabold text-2xl shadow-lg relative`}>
                    {selectedUser.initials}
                    <div className={`absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full border-2 border-white dark:border-slate-900 ${editStatus === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  </div>
                  <h4 className="mt-4 font-bold text-slate-800 dark:text-slate-100 text-base capitalize tracking-tight leading-snug">
                    {editFirstName} {editLastName}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono mt-1 select-all break-all w-full">
                    {editEmail}
                  </span>
                </div>

                {/* Quick Metrics */}
                <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-805/80 shadow-2xs">
                  <div className="text-center p-1">
                    <span className="block text-xs font-extrabold text-slate-800 dark:text-slate-100 font-mono">
                      {selectedUser.roleType === 'Admin' ? '8' : '3'}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Sites</span>
                  </div>
                  <div className="text-center p-1 border-x border-slate-100 dark:border-slate-800">
                    <span className="block text-xs font-extrabold text-slate-800 dark:text-slate-100 font-mono">
                      {selectedUser.roleType === 'Admin' ? '2' : '0'}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Alarms</span>
                  </div>
                  <div className="text-center p-1">
                    <span className="block text-xs font-extrabold text-emerald-500 font-mono">
                      98%
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Uptime</span>
                  </div>
                </div>

                {/* Settings Overview Badge List */}
                <div className="space-y-2 text-left w-full pt-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Locale Language</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{editLanguage}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Layout Direction</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 uppercase">{editView}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">2FA Security</span>
                    <span className={`font-bold ${edit2FA ? 'text-emerald-500' : 'text-slate-450'}`}>
                      {edit2FA ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer info */}
              <div className="text-[9px] text-slate-400 font-mono pt-4 w-full border-t border-slate-200/50 dark:border-slate-800/50">
                ID: {selectedUser.id} • STMS Premium IAM
              </div>
            </div>

            {/* Right Content Section */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900">
              {/* Header Tabs */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
                <div className="flex gap-2">
                  {(["details", "access", "activity"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveDetailTab(tab)}
                      className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all uppercase tracking-wider ${
                        activeDetailTab === tab
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {activeDetailTab === "details" && (
                    <motion.form
                      key="details-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleUpdateDetails}
                      className="space-y-5 text-xs"
                    >
                      <h5 className="font-extrabold text-slate-850 dark:text-slate-100 text-xs tracking-tight border-b border-slate-100 dark:border-slate-850 pb-1.5 uppercase">
                        Personal Details & Localization
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            First Name
                          </label>
                          <Input
                            required
                            value={editFirstName}
                            onChange={(e) => setEditFirstName(e.target.value)}
                            placeholder="Enter first name"
                            className="h-9 text-xs rounded-xl border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Last Name
                          </label>
                          <Input
                            required
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                            placeholder="Enter last name"
                            className="h-9 text-xs rounded-xl border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Timezone
                          </label>
                          <select
                            value={editTimezone}
                            onChange={(e) => setEditTimezone(e.target.value)}
                            className="w-full h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-900 px-3 text-xs focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                          >
                            <option value="(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi">
                              (GMT+05:30) Chennai, Kolkata, Mumbai
                            </option>
                            <option value="(GMT-05:00) Eastern Time (US & Canada)">
                              (GMT-05:00) Eastern Time (US & Canada)
                            </option>
                            <option value="(GMT+00:00) London, Dublin, Edinburgh">
                              (GMT+00:00) London, Dublin, Edinburgh
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Language
                          </label>
                          <select
                            value={editLanguage}
                            onChange={(e) => setEditLanguage(e.target.value)}
                            className="w-full h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-900 px-3 text-xs focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                          >
                            <option value="English">English (US)</option>
                            <option value="Spanish">Español</option>
                            <option value="Hindi">हिन्दी</option>
                            <option value="French">Français</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Date Format
                          </label>
                          <select
                            value={editDateFormat}
                            onChange={(e) => setEditDateFormat(e.target.value)}
                            className="w-full h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:bg-slate-900 px-3 text-xs focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300"
                          >
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                            Assigned Locations
                          </label>
                          <div className="flex flex-wrap gap-1.5 p-2 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[36px] bg-slate-50/50 dark:bg-slate-950/20">
                            {editLocations.map((loc) => (
                              <span key={loc} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 px-2 py-0.5 rounded-md font-bold text-[10px]">
                                {loc}
                                <button
                                  type="button"
                                  onClick={() => setEditLocations(editLocations.filter((l) => l !== loc))}
                                  className="text-blue-500 hover:text-blue-700 font-bold ml-1"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            {editLocations.length === 0 && (
                              <span className="text-slate-400 italic p-0.5">No locations assigned</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <h5 className="font-extrabold text-slate-850 dark:text-slate-100 text-xs tracking-tight border-b border-slate-100 dark:border-slate-855 pt-3 pb-1.5 uppercase">
                        Account Policies & Controls
                      </h5>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-955/10">
                          <div>
                            <span className="block font-bold text-slate-800 dark:text-slate-100">Status Type</span>
                            <span className="text-[10px] text-slate-400">Account login status</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditStatus(editStatus === "Active" ? "Inactive" : "Active")}
                            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all ${
                              editStatus === "Active"
                                ? "bg-emerald-500 text-white"
                                : "bg-rose-500 text-white"
                            }`}
                          >
                            {editStatus}
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-955/10">
                          <div>
                            <span className="block font-bold text-slate-800 dark:text-slate-100">Access Granted</span>
                            <span className="text-[10px] text-slate-400">NOC dashboard permissions</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditAccess(!editAccess)}
                            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all ${
                              editAccess
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-350 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {editAccess ? "Yes" : "No"}
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-955/10">
                          <div>
                            <span className="block font-bold text-slate-800 dark:text-slate-100">View Layout</span>
                            <span className="text-[10px] text-slate-400 font-mono">LTR / RTL design mode</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditView(editView === "LTR" ? "RTL" : "LTR")}
                            className="px-3 py-1 rounded-lg font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-250 dark:border-slate-700"
                          >
                            {editView}
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-955/10">
                          <div>
                            <span className="block font-bold text-slate-800 dark:text-slate-100">Enable 2FA</span>
                            <span className="text-[10px] text-slate-400">Multi-factor security</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEdit2FA(!edit2FA)}
                            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all ${
                              edit2FA
                                ? "bg-blue-600 text-white"
                                : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                            }`}
                          >
                            {edit2FA ? "On" : "Off"}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditModalOpen(false)}
                          className="rounded-xl h-9"
                        >
                          Close
                        </Button>
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-9 px-5"
                        >
                          Update Details
                        </Button>
                      </div>
                    </motion.form>
                  )}

                  {activeDetailTab === "access" && (
                    <motion.div
                      key="access-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-5"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div>
                          <h5 className="font-extrabold text-slate-850 dark:text-slate-100 text-xs uppercase tracking-tight">
                            Security Permissions Matrix
                          </h5>
                          <p className="text-[10px] text-slate-400">Grant or restrict detailed functionality</p>
                        </div>
                        <Badge variant="outline" className="border-emerald-350 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 font-bold">
                          IAM Live
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {Object.entries(editPermissions).map(([perm, val]) => (
                          <div
                            key={perm}
                            onClick={() => handleTogglePermission(perm)}
                            className="flex items-center justify-between p-3 rounded-2xl border border-slate-150 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                                val 
                                  ? "bg-blue-600 border-blue-600 text-white" 
                                  : "border-slate-300 dark:border-slate-700 bg-white dark:bg-transparent"
                              }`}>
                                {val && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <div>
                                <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                                  {perm}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  Allows access to perform action with this scope
                                </span>
                              </div>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              val 
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                                : "bg-slate-105 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                            }`}>
                              {val ? "Allowed" : "Inherited Off"}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditModalOpen(false)}
                          className="rounded-xl h-9"
                        >
                          Close
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            setIsEditModalOpen(false);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-9 px-5"
                        >
                          Update Access
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {activeDetailTab === "activity" && (
                    <motion.div
                      key="activity-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-5"
                    >
                      <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                        <h5 className="font-extrabold text-slate-850 dark:text-slate-100 text-xs uppercase tracking-tight">
                          Audit Activity Logs
                        </h5>
                        <p className="text-[10px] text-slate-400">Real-time session trail</p>
                      </div>

                      <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                        {[
                          { title: "Logged in via Browser Client", desc: "Session started from Mumbai NOC (IP 103.45.1.20) Chrome on macOS", time: "2 hours ago" },
                          { title: "Updated Site Allocation", desc: "Assigned to locations: Delhi Tower Alpha, Chennai Datacenter", time: "1 day ago" },
                          { title: "Security Credentials Refreshed", desc: "Reset 2-factor authentication status and API access token", time: "3 days ago" },
                          { title: "Account Initial Setup", desc: "User created by platform administrator root@atc.com", time: "5 days ago" },
                        ].map((act, index) => (
                          <div key={index} className="relative pl-7 group text-left">
                            <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900" />
                            <div className="flex flex-col gap-0.5 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-800 dark:text-slate-100">
                                  {act.title}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">
                                  {act.time}
                                </span>
                              </div>
                              <span className="text-[11px] text-slate-450">
                                {act.desc}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditModalOpen(false)}
                          className="rounded-xl h-9"
                        >
                          Close
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
