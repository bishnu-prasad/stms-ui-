import { HardHat, Phone, Mail, MapPin, Award } from "lucide-react";
import { engineerProfile } from "../data/engineerMockData";

export default function Profile() {
  return (
    <div className="p-4 max-w-md mx-auto md:max-w-full pb-20">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="h-24 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        <div className="px-5 pb-5 relative">
          <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-2xl p-1 absolute -top-10 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
              <HardHat className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="mt-12">
            <h1 className="text-xl font-black text-slate-900 dark:text-white">{engineerProfile.name}</h1>
            <div className="text-xs text-orange-600 font-bold">{engineerProfile.role}</div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Region</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{engineerProfile.region}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Phone</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{engineerProfile.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Email</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{engineerProfile.email}</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Certifications</h3>
              <div className="space-y-2">
                {engineerProfile.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
