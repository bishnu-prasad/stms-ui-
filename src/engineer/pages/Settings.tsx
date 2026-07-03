import { Settings2, Bell, Moon, Sun, Lock, Smartphone } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-4 max-w-md mx-auto md:max-w-full pb-20">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-xs text-slate-500 mt-1">App preferences and permissions</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-slate-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">Dark Mode</span>
            </div>
            <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">Push Notifications</span>
            </div>
            <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-slate-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">Offline Mode Sync</span>
            </div>
            <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
