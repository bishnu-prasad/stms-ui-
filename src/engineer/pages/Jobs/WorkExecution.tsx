import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { activeJobs } from "../../data/engineerMockData";
import { ArrowLeft, MapPin, Camera, CheckSquare, Package, FileText, CheckCircle2, Navigation } from "lucide-react";

export default function WorkExecution() {
  const [match, params] = useRoute("/engineer/jobs/execute/:id");
  const [, setLocation] = useLocation();
  const ticketId = params?.id;
  const job = activeJobs.find(j => j.id === ticketId) || activeJobs[0];

  const [activeStep, setActiveStep] = useState(1);
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-full bg-slate-50 dark:bg-slate-950 max-w-md mx-auto md:max-w-full">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => history.back()}
            className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-white">Execute Work</h1>
            <div className="text-[10px] font-mono text-slate-500">{job.id} • {job.site}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Step 1: GPS Check-In */}
        <div className={`bg-white dark:bg-slate-900 rounded-xl border ${activeStep === 1 ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-slate-200 dark:border-slate-800 opacity-60'} overflow-hidden transition-all`}>
          <div className="p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800" onClick={() => setActiveStep(1)}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${checkedIn ? 'bg-emerald-500 text-white' : activeStep === 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                {checkedIn ? <CheckCircle2 className="w-5 h-5" /> : 1}
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">GPS Check-In</h3>
            </div>
            {checkedIn && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Verified</span>}
          </div>
          
          {activeStep === 1 && !checkedIn && (
            <div className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Distance to Site</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">45 Meters</div>
                </div>
              </div>
              <div className="text-xs text-slate-500 mb-5">
                You are within the 200m allowed radius. Please check in to start the SLA work timer.
              </div>
              <button 
                onClick={() => {
                  setCheckedIn(true);
                  setActiveStep(2);
                }}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" /> Confirm Arrival
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Documentation (Photos) */}
        <div className={`bg-white dark:bg-slate-900 rounded-xl border ${activeStep === 2 ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-slate-200 dark:border-slate-800 opacity-60'} overflow-hidden transition-all`}>
          <div className="p-4 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800" onClick={() => checkedIn && setActiveStep(2)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${activeStep === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>2</div>
            <h3 className="font-bold text-slate-900 dark:text-white">Photo Documentation</h3>
          </div>
          {activeStep === 2 && (
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">Before Repair (Required)</label>
                <button className="w-full h-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold">Tap to capture</span>
                </button>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">After Repair (Required)</label>
                <button className="w-full h-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold">Tap to capture</span>
                </button>
              </div>
              <button 
                onClick={() => setActiveStep(3)}
                className="w-full h-11 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white font-bold text-sm rounded-xl transition-colors mt-2"
              >
                Next Step
              </button>
            </div>
          )}
        </div>

        {/* Step 3: Maintenance Checklist */}
        <div className={`bg-white dark:bg-slate-900 rounded-xl border ${activeStep === 3 ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-slate-200 dark:border-slate-800 opacity-60'} overflow-hidden transition-all`}>
          <div className="p-4 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800" onClick={() => checkedIn && setActiveStep(3)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${activeStep === 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>3</div>
            <h3 className="font-bold text-slate-900 dark:text-white">Maintenance Checklist</h3>
          </div>
          {activeStep === 3 && (
            <div className="p-5 space-y-4">
              <div className="space-y-3">
                {['Mains AC Voltage Checked', 'Battery Terminals Tightened', 'Rectifier Module Reseated', 'Alarms Cleared on Controller'].map((item, i) => (
                  <label key={i} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                    <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{item}</span>
                  </label>
                ))}
              </div>
              <button 
                onClick={() => setActiveStep(4)}
                className="w-full h-11 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white font-bold text-sm rounded-xl transition-colors mt-2"
              >
                Next Step
              </button>
            </div>
          )}
        </div>

        {/* Step 4: Parts & Notes */}
        <div className={`bg-white dark:bg-slate-900 rounded-xl border ${activeStep === 4 ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-slate-200 dark:border-slate-800 opacity-60'} overflow-hidden transition-all`}>
          <div className="p-4 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800" onClick={() => checkedIn && setActiveStep(4)}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${activeStep === 4 ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>4</div>
            <h3 className="font-bold text-slate-900 dark:text-white">Parts &amp; Notes</h3>
          </div>
          {activeStep === 4 && (
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">Parts Consumed (Optional)</label>
                <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-600 dark:text-slate-400">Select Part from Inventory</span>
                  </div>
                  <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Add</button>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">Resolution Remarks (Required)</label>
                <textarea 
                  className="w-full h-24 p-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Enter details on root cause and fix applied..."
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Complete Action */}
      {activeStep === 4 && (
        <div className="fixed bottom-0 left-0 right-0 md:absolute bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-50 max-w-md mx-auto md:max-w-full">
          <button 
            onClick={() => setLocation("/engineer/dashboard")}
            className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> Submit &amp; Close Ticket
          </button>
        </div>
      )}
    </div>
  );
}
