import { useLocation } from "wouter";
import { AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans p-6">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 max-w-md w-full shadow-lg text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-600">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">404 - Page Not Found</h1>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            The requested route does not exist or has been moved. Select a portal below to return to your workspace console.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setLocation("/login")}
            className="w-full h-11 font-bold text-xs rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Workspace Login
          </button>
        </div>
      </div>
    </div>
  );
}
