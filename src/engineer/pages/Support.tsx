import { LifeBuoy, FileText, MessageSquare } from "lucide-react";

export default function Support() {
  return (
    <div className="p-4 max-w-md mx-auto md:max-w-full pb-20">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Help &amp; Support</h1>
        <p className="text-xs text-slate-500 mt-1">NOC assistance and knowledge base</p>
      </div>

      <div className="space-y-4">
        <button className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center gap-4 text-left hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Contact Supervisor</div>
            <div className="text-xs text-slate-500 mt-0.5">Start a live chat with NOC</div>
          </div>
        </button>
        <button className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center gap-4 text-left hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Equipment Manuals</div>
            <div className="text-xs text-slate-500 mt-0.5">Wiring diagrams &amp; specs</div>
          </div>
        </button>
        <button className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center gap-4 text-left hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
            <LifeBuoy className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Emergency SOP</div>
            <div className="text-xs text-slate-500 mt-0.5">Safety &amp; incident guidelines</div>
          </div>
        </button>
      </div>
    </div>
  );
}
