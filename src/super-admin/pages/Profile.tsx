import React, { useState } from "react";
import { 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Briefcase, 
  Map, 
  Terminal, 
  Check, 
  Loader2,
  Server,
  Layers,
  Key,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock Systems Access Permissions for Super Admin
const globalSystemPrivileges = [
  { name: "Superuser Commands", domain: "SYSTEM ROOT", level: "Permitted", status: "Operational" },
  { name: "Tenant Resource Manager", domain: "DATABASE", level: "Permitted", status: "Operational" },
  { name: "Global Audit Log Access", domain: "AUDIT LOGS", level: "Permitted", status: "Operational" }
];

export default function SuperAdminProfile() {
  const [firstName, setFirstName] = useState("Arjun");
  const [lastName, setLastName] = useState("Mehta (Root)");
  const [mobile, setMobile] = useState("+91 99999 88888");
  const [dob, setDob] = useState("12/04/1992");
  const [gender, setGender] = useState("male");
  const [access, setAccess] = useState("yes");
  const [view, setView] = useState("ltr");
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("kolkata");

  const [email, setEmail] = useState("root@indionetworks.com");
  const [designation, setDesignation] = useState("System Administrator");
  const [organization, setOrganization] = useState("Indio Networks (NOC)");

  const [street, setStreet] = useState("Office 402, Supreme Head");
  const [city, setCity] = useState("Pune");
  const [state, setState] = useState("Maharashtra");
  const [pin, setPin] = useState("411045");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleUpdate = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 800);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 pt-6 space-y-6">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Root Profile</h1>
          <Badge variant="outline" className="bg-blue-600/10 text-blue-600 border-blue-600/20 text-[10px] font-extrabold uppercase py-0.5">
            System Admin Configuration
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
          <span>Root</span>
          <span>&gt;</span>
          <span className="text-foreground font-medium">Profile</span>
        </div>
      </div>

      {/* Top Cards: Details & Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile Card (Left) */}
        <Card className="p-5 shadow-2xs flex flex-col justify-between relative overflow-hidden bg-card border border-border">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="relative">
              <Avatar className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-white text-2xl font-black shadow-md border border-slate-700/20">
                <AvatarFallback className="bg-transparent text-white font-black">SA</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h2 className="text-base font-black text-foreground leading-tight">{firstName} {lastName}</h2>
              <p className="text-xs text-muted-foreground font-medium mt-1">{email}</p>
              <Badge className="mt-2.5 bg-blue-600/10 text-blue-600 border border-blue-600/20 tracking-wider text-[10px] font-extrabold uppercase">
                SUPER ADMIN
              </Badge>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-3 gap-3 border-t border-border pt-4 mt-6">
            <div className="text-center p-2.5 bg-muted/30 rounded-xl border border-border">
              <span className="font-mono text-base font-extrabold text-foreground block">32</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5 block">Tenants</span>
            </div>
            <div className="text-center p-2.5 bg-muted/30 rounded-xl border border-border">
              <span className="font-mono text-base font-extrabold text-foreground block">1,450</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5 block">Devices</span>
            </div>
            <div className="text-center p-2.5 bg-muted/30 rounded-xl border border-border">
              <span className="font-mono text-base font-extrabold text-foreground block">99.99%</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5 block">Uptime</span>
            </div>
          </div>

          {/* Footer Indicators */}
          <div className="flex justify-between items-center border-t border-border pt-4 mt-4 text-[10.5px] font-semibold text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Active System Owner
            </div>
            <div className="flex items-center gap-1 font-mono text-[9.5px]">
              <span>FORMAT:</span> <span className="text-foreground">{view.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[9.5px]">
              <span>LANG:</span> <span className="text-foreground">{language.toUpperCase()}</span>
            </div>
          </div>
        </Card>

        {/* Metadata Card (Right) */}
        <Card className="md:col-span-2 bg-[#0F172A] border border-slate-800 p-5 shadow-sm text-slate-300 font-mono text-xs flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-slate-800/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div>
            <span className="text-slate-500 block mb-2">// Platform Ownership Metadata</span>
            <div className="space-y-1">
              <div><span className="text-blue-400">Created On:</span> <span class="text-slate-100">2024-05-15 08:32:10</span></div>
              <div><span className="text-blue-400">Last Password Change:</span> <span class="text-slate-100">14 days ago</span></div>
              <div><span className="text-blue-400">Assigned Access:</span> <span class="text-slate-100">Full Access (Access Control & Resource Orchestration)</span></div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-4 mt-6 flex justify-between items-center text-[10.5px] text-slate-500">
            <span>Root Admin UID: admin_arjun_99a2c</span>
            <Terminal className="w-4 h-4 text-slate-700" />
          </div>
        </Card>

      </div>

      {/* Tabs Layout */}
      <Tabs defaultValue="basic" className="bg-card border border-border rounded-2xl shadow-2xs overflow-hidden">
        <div className="border-b border-border bg-muted/20 px-6 pt-3">
          <TabsList className="bg-transparent h-auto p-0 gap-6">
            <TabsTrigger 
              value="basic" 
              className="pb-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-3 uppercase tracking-wider flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger 
              value="access" 
              className="pb-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-3 uppercase tracking-wider flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              System Permissions
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content: Basic Info */}
        <TabsContent value="basic" className="p-6 flex flex-col gap-8 outline-none mt-0">
          
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="first-name" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">First Name</Label>
                <Input 
                  id="first-name" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="last-name" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Last Name</Label>
                <Input 
                  id="last-name" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mobile" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Mobile</Label>
                <Input 
                  id="mobile" 
                  value={mobile} 
                  onChange={(e) => setMobile(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dob" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">DOB</Label>
                <Input 
                  id="dob" 
                  value={dob} 
                  onChange={(e) => setDob(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
            </div>

            {/* Custom Choices */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              <div className="space-y-2">
                <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide block">Gender</Label>
                <RadioGroup value={gender} onValueChange={setGender} className="flex items-center gap-4 text-xs font-medium text-foreground h-9">
                  <div className="flex items-center space-x-1.5">
                    <RadioGroupItem value="male" id="g-male" />
                    <label htmlFor="g-male" className="cursor-pointer">Male</label>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <RadioGroupItem value="female" id="g-female" />
                    <label htmlFor="g-female" className="cursor-pointer">Female</label>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <RadioGroupItem value="other" id="g-other" />
                    <label htmlFor="g-other" className="cursor-pointer">Other</label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide block">Super Admin Access</Label>
                <RadioGroup value={access} onValueChange={setAccess} className="flex items-center gap-4 text-xs font-medium text-foreground h-9">
                  <div className="flex items-center space-x-1.5">
                    <RadioGroupItem value="yes" id="a-yes" />
                    <label htmlFor="a-yes" className="cursor-pointer">Allowed</label>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <RadioGroupItem value="no" id="a-no" />
                    <label htmlFor="a-no" className="cursor-pointer">Restricted</label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide block">View Format</Label>
                <RadioGroup value={view} onValueChange={setView} className="flex items-center gap-4 text-xs font-medium text-foreground h-9">
                  <div className="flex items-center space-x-1.5">
                    <RadioGroupItem value="ltr" id="v-ltr" />
                    <label htmlFor="v-ltr" className="cursor-pointer">LTR</label>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <RadioGroupItem value="rtl" id="v-rtl" />
                    <label htmlFor="v-rtl" className="cursor-pointer">RTL</label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide block">Language</Label>
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full h-10 px-2 bg-card border border-border text-foreground rounded-xl focus:border-primary outline-none text-xs font-semibold cursor-pointer"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide block">Timezone</Label>
                  <select 
                    value={timezone} 
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full h-10 px-2 bg-card border border-border text-foreground rounded-xl focus:border-primary outline-none text-xs font-semibold cursor-pointer"
                  >
                    <option value="kolkata">Asia/Kolkata</option>
                    <option value="utc">UTC</option>
                    <option value="est">America/New_York</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Work Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" /> Work Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="work-email" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Work Email</Label>
                <Input 
                  id="work-email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="designation" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Designation</Label>
                <Input 
                  id="designation" 
                  value={designation} 
                  onChange={(e) => setDesignation(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="organization" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Organization</Label>
                <Input 
                  id="organization" 
                  value={organization} 
                  onChange={(e) => setOrganization(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border pb-2 flex items-center gap-2">
              <Map className="w-4 h-4 text-muted-foreground" /> Addresses
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="street" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Street Address</Label>
                <Input 
                  id="street" 
                  value={street} 
                  onChange={(e) => setStreet(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">City</Label>
                <Input 
                  id="city" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="state" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">State</Label>
                <Input 
                  id="state" 
                  value={state} 
                  onChange={(e) => setState(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pin" className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">PIN Code</Label>
                <Input 
                  id="pin" 
                  value={pin} 
                  onChange={(e) => setPin(e.target.value)} 
                  className="h-10 rounded-xl text-xs font-medium bg-muted/20 border-border" 
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4 border-t border-border">
            <Button 
              onClick={handleUpdate} 
              disabled={saving}
              className="rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white h-10 px-6 gap-1.5 shadow-md"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : saved ? (
                <>
                  <Check className="w-4 h-4" /> Saved!
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" /> Update Details
                </>
              )}
            </Button>
          </div>

        </TabsContent>

        {/* Tab Content: Access Permissions */}
        <TabsContent value="access" className="p-6 flex flex-col gap-6 outline-none mt-0">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border pb-2">Global System Privileges</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {globalSystemPrivileges.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border bg-muted/20 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground text-xs">{c.name}</span>
                      <Badge variant="outline" className="text-[9px] font-mono font-bold bg-blue-500/10 text-blue-600 border-blue-500/20 py-0.5">
                        {c.domain}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1 font-semibold text-emerald-500">
                      <Activity className="w-3.5 h-3.5" /> {c.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{c.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
