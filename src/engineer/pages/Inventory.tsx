import { Package, Search, Plus } from "lucide-react";
import { engineerInventory } from "../data/engineerMockData";

export default function Inventory() {
  return (
    <div className="p-4 max-w-md mx-auto md:max-w-full pb-20">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Trunk Stock</h1>
          <p className="text-xs text-slate-500 mt-1">Parts currently issued to you</p>
        </div>
        <button className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Request
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search parts, serials..." 
          className="w-full h-9 pl-9 pr-4 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="space-y-3">
        {engineerInventory.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                <Package className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{item.name}</h3>
                <div className="text-[10px] text-slate-500 mt-1">ID: {item.id} • {item.type}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-xl font-black ${item.available > 0 ? 'text-slate-900 dark:text-white' : 'text-rose-500'}`}>
                {item.available}
              </div>
              <div className="text-[9px] font-bold text-slate-400 uppercase">Available</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
