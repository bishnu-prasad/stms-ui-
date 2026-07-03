import { NOCPageShell } from "../../components/NOCPageShell";
export default function IntegrationsPage() {
  return (
    <NOCPageShell title="Integrations" subtitle="Manage external webhooks, SMS gateways, and API keys">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm max-w-3xl">
        <h3 className="text-sm font-bold mb-4">Active Integrations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <div className="font-bold text-xs">Twilio SMS Gateway</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">● Connected</div>
            </div>
            <button className="text-[11px] font-bold text-blue-600">Configure</button>
          </div>
          <div className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <div className="font-bold text-xs">ServiceNow ITSM</div>
              <div className="text-[10px] text-emerald-600 font-semibold mt-1">● Connected</div>
            </div>
            <button className="text-[11px] font-bold text-blue-600">Configure</button>
          </div>
          <div className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <div className="font-bold text-xs">Slack Webhooks</div>
              <div className="text-[10px] text-slate-400 font-semibold mt-1">○ Not Configured</div>
            </div>
            <button className="text-[11px] font-bold text-blue-600">Setup</button>
          </div>
        </div>
      </div>
    </NOCPageShell>
  );
}
