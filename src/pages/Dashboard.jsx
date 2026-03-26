import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import {
  Mic, Monitor, Brain, Shield, Layers, Code2, BarChart3, MessageSquare,
  Zap, Plus, Settings, LogOut, Bell, Moon, Sun, ChevronRight, Activity,
  TrendingUp, Users, Globe, ArrowRight, ExternalLink, Play
} from "lucide-react";

const LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b24a5bac54e3067972063/2e8a22a03_AevoiceLogo.JPG";

const TOOLS_NAV = [
  { id: "webchat",  label: "Web Chatbot",  icon: Mic,      color: "cyan",   path: "/WebChatbot" },
  { id: "kiosk",    label: "KIOSKO",       icon: Monitor,  color: "violet", path: "/Kiosk" },
  { id: "demo",     label: "Demo Sree",    icon: Brain,    color: "indigo", path: "/DemoSree" },
  { id: "offline",  label: "Offline Bot",  icon: Shield,   color: "emerald",path: "/OfflineBot" },
  { id: "overlay",  label: "Overlay",      icon: Layers,   color: "amber",  path: "/Overlay" },
  { id: "api",      label: "API",          icon: Code2,    color: "rose",   path: "/ApiAccess" },
];

const SIDE_NAV = [
  { label: "Dashboard",  icon: Activity,      path: "/Dashboard" },
  { label: "Web Chatbot",icon: Mic,           path: "/WebChatbot" },
  { label: "KIOSKO",     icon: Monitor,       path: "/Kiosk" },
  { label: "Demo Sree",  icon: Brain,         path: "/DemoSree" },
  { label: "Offline Bot",icon: Shield,        path: "/OfflineBot" },
  { label: "Analytics",  icon: BarChart3,     path: "/Analytics" },
  { label: "Help Guide", icon: MessageSquare, path: "/HelpGuide" },
  { label: "Billing",    icon: Zap,           path: "/Billing" },
  { label: "Settings",   icon: Settings,      path: "/Settings" },
];

const STATS = [
  { label: "Conversations Today", value: "247",  change: "+12%", icon: MessageSquare, color: "cyan" },
  { label: "Active Bots",         value: "3",    change: "+1",   icon: Mic,           color: "violet" },
  { label: "Avg Response Time",   value: "0.8s", change: "-5%",  icon: Zap,           color: "emerald" },
  { label: "Satisfaction Score",  value: "94%",  change: "+2%",  icon: TrendingUp,    color: "amber" },
];

export default function AevothonDashboard() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem("aevothon_theme") !== "light");
  const [activeNav, setActiveNav] = useState("/Dashboard");
  const [sideOpen, setSideOpen] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("aevothon_theme", dark ? "dark" : "light");
  }, [dark]);

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: () => base44.auth.me(),
    retry: false,
  });

  const signOut = async () => {
    try { await base44.auth.logout(); } catch {}
    localStorage.clear(); sessionStorage.clear();
    window.location.href = "/Home";
  };

  const bg   = dark ? "bg-[#050a14]"  : "bg-[#f4f6fb]";
  const side = dark ? "bg-[#0a1628]"  : "bg-white";
  const card = dark ? "bg-white/[0.03] border-white/8" : "bg-white border-slate-200";
  const text = dark ? "text-white"    : "text-slate-900";
  const sub  = dark ? "text-slate-400": "text-slate-500";
  const top  = dark ? "bg-[#0a1628] border-white/5" : "bg-white border-slate-200";

  return (
    <div className={`min-h-screen ${bg} flex font-sans transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className={`${sideOpen?"w-56":"w-16"} flex-shrink-0 ${side} border-r ${dark?"border-white/5":"border-slate-200"} flex flex-col transition-all duration-200`}>
        {/* Logo */}
        <div className={`h-16 flex items-center gap-3 px-4 border-b ${dark?"border-white/5":"border-slate-100"}`}>
          <div className="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0">
            <img src={LOGO} alt="Aevothon" className="w-full h-full object-cover"/>
          </div>
          {sideOpen && <span className={`font-black text-xs tracking-tight ${text}`}>AEVOTHON</span>}
        </div>
        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {SIDE_NAV.map(item => (
            <button key={item.path}
              onClick={() => { setActiveNav(item.path); navigate(item.path); }}
              className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeNav === item.path
                  ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border border-cyan-500/20"
                  : `${sub} ${dark?"hover:bg-white/5 hover:text-white":"hover:bg-slate-100 hover:text-slate-700"}`
              }`}>
              <item.icon className="w-4 h-4 flex-shrink-0"/>
              {sideOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        {/* Sign out */}
        <div className={`p-3 border-t ${dark?"border-white/5":"border-slate-100"}`}>
          <button onClick={signOut}
            className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-xs transition-all text-red-400 ${dark?"hover:bg-red-500/10":"hover:bg-red-50"}`}>
            <LogOut className="w-4 h-4 flex-shrink-0"/>
            {sideOpen && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className={`h-16 flex items-center justify-between px-6 border-b ${top} flex-shrink-0`}>
          <div className="flex items-center gap-4">
            <button onClick={()=>setSideOpen(s=>!s)} className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark?"hover:bg-white/5":"hover:bg-slate-100"} transition-colors`}>
              <Activity className={`w-4 h-4 ${sub}`}/>
            </button>
            <div>
              <h1 className={`text-sm font-bold ${text}`}>Dashboard</h1>
              <p className={`text-[10px] ${sub}`}>Welcome back{user?.full_name ? `, ${user.full_name.split(" ")[0]}` : ""} 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark?"hover:bg-white/5":"hover:bg-slate-100"} transition-colors`}>
              <Bell className={`w-4 h-4 ${sub}`}/>
            </button>
            <button onClick={()=>setDark(d=>!d)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${dark?"hover:bg-white/5":"hover:bg-slate-100"}`}>
              {dark ? <Sun className="w-4 h-4 text-amber-400"/> : <Moon className="w-4 h-4 text-slate-600"/>}
            </button>
            <div className={`w-8 h-8 rounded-xl overflow-hidden border ${dark?"border-white/10":"border-slate-200"}`}>
              <img src={LOGO} alt="" className="w-full h-full object-cover"/>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {STATS.map(s=>(
              <div key={s.label} className={`rounded-2xl border p-4 ${card}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs ${sub}`}>{s.label}</span>
                  <div className={`w-8 h-8 rounded-xl bg-${s.color}-500/15 flex items-center justify-center`}>
                    <s.icon className={`w-4 h-4 text-${s.color}-400`}/>
                  </div>
                </div>
                <p className={`text-2xl font-black ${text}`}>{s.value}</p>
                <p className="text-xs text-emerald-400 mt-1">{s.change} today</p>
              </div>
            ))}
          </div>

          {/* Tool cards */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`font-black text-base ${text}`}>Your AI Tools</h2>
              <button onClick={()=>navigate("/Pricing")}
                className={`flex items-center gap-1.5 text-xs text-cyan-500 hover:opacity-80`}>
                <Plus className="w-3.5 h-3.5"/> Add Tool
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {TOOLS_NAV.map(tool=>(
                <button key={tool.id}
                  onClick={()=>navigate(tool.path)}
                  className={`rounded-2xl border p-5 text-left hover:border-${tool.color}-500/30 transition-all group ${card}`}>
                  <div className={`w-10 h-10 rounded-xl bg-${tool.color}-500/15 flex items-center justify-center mb-3 group-hover:bg-${tool.color}-500/25 transition-colors`}>
                    <tool.icon className={`w-5 h-5 text-${tool.color}-400`}/>
                  </div>
                  <p className={`font-semibold text-sm mb-0.5 ${text}`}>{tool.label}</p>
                  <div className={`flex items-center gap-1 text-[10px] ${sub}`}>
                    Open <ChevronRight className="w-3 h-3"/>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent activity + quick actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Recent conversations */}
            <div className={`rounded-2xl border p-5 ${card}`}>
              <h3 className={`font-bold text-sm mb-4 ${text}`}>Recent Conversations</h3>
              <div className="space-y-3">
                {[
                  { bot: "Web Chatbot", msg: "What are your opening hours?", time: "2m ago", status: "resolved" },
                  { bot: "KIOSKO",      msg: "Can I book an appointment?",   time: "8m ago", status: "resolved" },
                  { bot: "Demo Sree",   msg: "Show me your pricing plans.",  time: "15m ago",status: "resolved" },
                ].map((c,i)=>(
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${dark?"bg-white/[0.02]":"bg-slate-50"}`}>
                    <div className={`w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0`}>
                      <Mic className="w-3.5 h-3.5 text-cyan-400"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-medium ${text}`}>{c.bot}</p>
                        <span className={`text-[10px] ${sub}`}>{c.time}</span>
                      </div>
                      <p className={`text-xs truncate ${sub}`}>{c.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className={`rounded-2xl border p-5 ${card}`}>
              <h3 className={`font-bold text-sm mb-4 ${text}`}>Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Deploy new Web Chatbot",   icon: Mic,      action: ()=>navigate("/WebChatbot") },
                  { label: "Configure KIOSKO terminal",icon: Monitor,  action: ()=>navigate("/Kiosk") },
                  { label: "Share Demo Sree link",     icon: Globe,    action: ()=>navigate("/DemoSree") },
                  { label: "View Analytics",           icon: BarChart3,action: ()=>navigate("/Analytics") },
                  { label: "Read Help Guide",          icon: MessageSquare, action: ()=>navigate("/HelpGuide") },
                ].map((a,i)=>(
                  <button key={i} onClick={a.action}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-medium text-left transition-all group ${dark?"hover:bg-white/5":"hover:bg-slate-50"} ${sub}`}>
                    <a.icon className="w-4 h-4 text-cyan-400"/>
                    {a.label}
                    <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"/>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
