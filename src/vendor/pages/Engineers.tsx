import { useState } from "react";
import { VendorPageTemplate } from "../components/VendorPageTemplate";
import { VendorMetricCard } from "../components/VendorMetricCard";
import { VendorChartCard, SimpleVendorBarChart, SimpleVendorLineChart } from "../components/VendorChartCard";
import { VendorDataTable } from "../components/VendorDataTable";
import { mockVendorEngineers, VendorEngineer } from "../data/vendorMockData";
import { Wrench, Clock, UserCheck, Boxes, Plus, X, MapPin, Briefcase, Star, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EngineersPage() {
  const [engineersList, setEngineersList] = useState<VendorEngineer[]>(mockVendorEngineers);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"view" | "add">("view");
  const [selectedEngineer, setSelectedEngineer] = useState<VendorEngineer | null>(null);

  const openAddDrawer = () => {
    setDrawerMode("add");
    setSelectedEngineer(null);
    setIsDrawerOpen(true);
  };

  const openViewDrawer = (eng: VendorEngineer) => {
    setDrawerMode("view");
    setSelectedEngineer(eng);
    setIsDrawerOpen(true);
  };

  const kpis = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <VendorMetricCard title="Engineers Active" value="4 Techs" subtitle="1 Tech on Leave" badgeText="" icon={<Wrench className="w-5 h-5 text-teal-600" />} delay={0.05} />
      <VendorMetricCard title="Avg Customer Rating" value="4.88 ★" subtitle="Based on 48 reviews" icon={<Clock className="w-5 h-5 text-teal-600" />} delay={0.1} />
      <VendorMetricCard title="Avg Repair Speed" value="1.5 hrs" subtitle="Per maintenance job" badgeText="" icon={<UserCheck className="w-5 h-5 text-teal-600" />} delay={0.15} />
      <VendorMetricCard title="GPS Tracking" value="Online" subtitle="Live location streams" icon={<Boxes className="w-5 h-5 text-teal-600" />} delay={0.2} />
    </div>
  );

  const charts = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <VendorChartCard title="Engineer Productivity & Completed Jobs" businessQuestion="Which field engineers solved the most maintenance jobs this week?" delay={0.25}>
        <SimpleVendorBarChart data={[{"name":"Mon","value":14,"sla":98},{"name":"Tue","value":22,"sla":99},{"name":"Wed","value":18,"sla":97},{"name":"Thu","value":26,"sla":99},{"name":"Fri","value":30,"sla":98},{"name":"Sat","value":16,"sla":100},{"name":"Sun","value":12,"sla":100}]} dataKey="value" categoryKey="name" color="#0D9488" />
      </VendorChartCard>
      <VendorChartCard title="SLA Compliance & Response Target Trend" businessQuestion="What is the average response latency across maintenance dispatches?" delay={0.3}>
        <SimpleVendorLineChart data={[{"name":"Mon","value":14,"sla":98},{"name":"Tue","value":22,"sla":99},{"name":"Wed","value":18,"sla":97},{"name":"Thu","value":26,"sla":99},{"name":"Fri","value":30,"sla":98},{"name":"Sat","value":16,"sla":100},{"name":"Sun","value":12,"sla":100}]} dataKey="sla" categoryKey="name" color="#2563EB" />
      </VendorChartCard>
    </div>
  );

  const extraContent = (
    <div className="flex justify-end">
      <button 
        onClick={openAddDrawer}
        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" /> Add Field Engineer
      </button>
    </div>
  );

  const engineerColumns = [
    { 
      header: "Engineer", 
      accessor: (r: VendorEngineer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-teal-800 bg-teal-100">{r.avatar}</div>
          <div>
            <div className="font-bold text-slate-900">{r.name}</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{r.id}</div>
          </div>
        </div>
      ) 
    },
    { 
      header: "Contact", 
      accessor: (r: VendorEngineer) => (
        <div>
          <div className="text-sm text-slate-700">{r.phone}</div>
          <div className="text-xs text-slate-500">{r.email}</div>
        </div>
      ) 
    },
    { 
      header: "Status", 
      accessor: (r: VendorEngineer) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
          r.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 
          r.status === 'On Site' ? 'bg-amber-100 text-amber-700' : 
          r.status === 'Travelling' ? 'bg-blue-100 text-blue-700' : 
          'bg-slate-100 text-slate-600'
        }`}>{r.status}</span>
      ) 
    },
    { 
      header: "Location / Site", 
      accessor: (r: VendorEngineer) => (
        <div>
          <div className="font-semibold text-teal-800">{r.currentSite || "N/A"}</div>
          <div className="text-xs text-slate-500">{r.circle}</div>
        </div>
      ) 
    },
    { 
      header: "Active Jobs", 
      accessor: (r: VendorEngineer) => (
        <div className="font-bold text-slate-800">{r.assignedJobsCount}</div>
      ) 
    },
    { 
      header: "Rating", 
      accessor: (r: VendorEngineer) => (
        <div className="flex items-center gap-1 font-bold text-amber-500">
          {r.rating} <Star className="w-3.5 h-3.5 fill-amber-500" />
        </div>
      ) 
    },
  ];

  const table = (
    <VendorDataTable
      columns={engineerColumns}
      data={engineersList}
      onRowClick={(row) => openViewDrawer(row)}
    />
  );

  return (
    <>
      <VendorPageTemplate
        greeting="Field Operations Team"
        title="Field Engineer Roster & Dispatch Tracking"
        narrative={`4 out of 5 field engineers are active today. Rahul Sharma is on-site at SATKHANDA Open Plot, Vikas Kumar is in transit to Agra LTP, and Priya Mehta is available at the Bikaner base. Average field rating across customer sign-offs is 4.88 / 5.0.`}
        status="normal"
        icon={<Wrench className="w-6 h-6 text-teal-600" />}
        kpis={kpis}
        charts={charts}
        extraContent={extraContent}
        table={table}
      />

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
                <h2 className="text-lg font-bold text-slate-900">
                  {drawerMode === "add" ? "Add New Engineer" : "Engineer Profile"}
                </h2>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {drawerMode === "add" ? (
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsDrawerOpen(false); }}>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                      <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none text-sm" placeholder="e.g. Rahul Sharma" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone</label>
                        <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none text-sm" placeholder="+91..." />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email</label>
                        <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none text-sm" placeholder="email@..." />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Circle / Region</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none text-sm bg-white">
                        <option>Mumbai</option>
                        <option>Delhi</option>
                        <option>Gujarat</option>
                        <option>Rajasthan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Skills / Certifications</label>
                      <textarea className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none text-sm" rows={3} placeholder="List certified equipment..."></textarea>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <button type="submit" className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition-colors">
                        Create Engineer Profile
                      </button>
                    </div>
                  </form>
                ) : selectedEngineer ? (
                  <div className="space-y-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-2xl font-bold mb-4 shadow-inner">
                        {selectedEngineer.avatar}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{selectedEngineer.name}</h3>
                      <div className="text-sm font-mono text-slate-500">{selectedEngineer.id}</div>
                      
                      <span className={`mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                        selectedEngineer.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 
                        selectedEngineer.status === 'On Site' ? 'bg-amber-100 text-amber-700' : 
                        selectedEngineer.status === 'Travelling' ? 'bg-blue-100 text-blue-700' : 
                        'bg-slate-100 text-slate-600'
                      }`}>{selectedEngineer.status}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <Phone className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Phone</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-800">{selectedEngineer.phone}</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <Mail className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Email</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-800 truncate">{selectedEngineer.email}</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 col-span-2">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <MapPin className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Current Location</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-800">{selectedEngineer.currentSite || "N/A"}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{selectedEngineer.circle} Circle</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Performance Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Customer Rating</span>
                          <span className="text-sm font-bold text-slate-900 flex items-center gap-1">{selectedEngineer.rating} <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Active Jobs</span>
                          <span className="text-sm font-bold text-slate-900">{selectedEngineer.assignedJobsCount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Jobs Completed Today</span>
                          <span className="text-sm font-bold text-slate-900">{selectedEngineer.todayCompletedJobs}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Avg Repair Time</span>
                          <span className="text-sm font-bold text-slate-900">{selectedEngineer.avgRepairTimeHours} hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
