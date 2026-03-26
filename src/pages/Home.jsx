import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare, Mic, Monitor, Globe, Zap, Brain, Shield, ArrowRight,
  Check, Star, Menu, X, ChevronRight, Cpu, Headphones, Radio,
  Building2, GraduationCap, Siren, Plane, Camera, Workflow, Moon, Sun,
  Play, Volume2, Bot, Code2, Layers
} from "lucide-react";

const LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b24a5bac54e3067972063/2e8a22a03_AevoiceLogo.JPG";

const TOOLS = [
  {
    id: "webchat",
    name: "Web Voice Chatbot",
    tagline: "Speak to any website",
    icon: Mic,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
    desc: "Embeddable voice + text AI chatbot for any website. Speaks, listens, answers from your knowledge base in real time.",
    badge: "Most Popular",
    features: ["Voice + Text modes", "Custom branding", "Knowledge base training", "Multi-language", "Real-time TTS/STT"],
  },
  {
    id: "kiosk",
    name: "KIOSKO",
    tagline: "Touch & voice kiosks",
    icon: Monitor,
    color: "violet",
    gradient: "from-violet-500 to-purple-700",
    desc: "AI-powered kiosk terminal for public spaces — hospitals, airports, government offices. Touch + voice + screen.",
    badge: "Enterprise",
    features: ["Touch + voice interface", "Offline capable", "Multi-language", "Custom branding", "Hardware integration"],
  },
  {
    id: "sree-demo",
    name: "Demo Sree",
    tagline: "Interactive AI demo agent",
    icon: Brain,
    color: "indigo",
    gradient: "from-indigo-500 to-blue-700",
    desc: "Live demo of Sree's agentic capabilities. Show prospects exactly what Sree can do — voice, chat, knowledge, automation.",
    badge: null,
    features: ["Live demo mode", "Shareable link", "Branded demo page", "Analytics", "Lead capture"],
  },
  {
    id: "offline-bot",
    name: "Offline Bot",
    tagline: "Works without internet",
    icon: Shield,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    desc: "Fully offline AI assistant — runs on-device. Perfect for secure environments, rural deployments, or low-connectivity areas.",
    badge: "Secure",
    features: ["100% offline", "Local LLM (LLaMA 3)", "No cloud dependency", "Air-gapped deployment", "Privacy-first"],
  },
  {
    id: "overlay",
    name: "Desktop Overlay",
    tagline: "Sree watches your screen",
    icon: Layers,
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    desc: "Persistent floating AI overlay on your desktop. Reads your screen, suggests actions, answers questions contextually.",
    badge: null,
    features: ["Screen context reading", "Hotword activation", "Floating window", "Multi-app aware", "Windows + Mac"],
  },
  {
    id: "api",
    name: "Aevothon API",
    tagline: "Build your own AI tools",
    icon: Code2,
    color: "rose",
    gradient: "from-rose-500 to-pink-700",
    desc: "REST API access to all Aevothon capabilities. Build custom voice, chat, and AI tools on top of our infrastructure.",
    badge: "Dev",
    features: ["REST + WebSocket", "Voice + Chat APIs", "KB management", "Usage analytics", "SDKs"],
  },
];

const PLANS = [
  {
    name: "Starter",
    price: 29,
    color: "from-slate-600 to-slate-700",
    border: "border-slate-500/20",
    badge: null,
    tools: ["Web Voice Chatbot", "500 conversations/mo", "1 KB", "Basic analytics"],
  },
  {
    name: "Professional",
    price: 99,
    color: "from-cyan-500 to-blue-600",
    border: "border-cyan-500/40",
    badge: "Most Popular",
    tools: ["All 6 Tools", "5,000 conversations/mo", "10 KBs", "KIOSKO + Demo Sree", "Custom branding", "Priority support"],
  },
  {
    name: "Business",
    price: 249,
    color: "from-violet-500 to-purple-700",
    border: "border-violet-500/30",
    badge: null,
    tools: ["Everything in Pro", "Unlimited conversations", "Offline Bot", "Desktop Overlay", "API access", "Dedicated support"],
  },
  {
    name: "Enterprise",
    price: 799,
    color: "from-amber-500 to-orange-600",
    border: "border-amber-500/30",
    badge: "Enterprise",
    tools: ["White-label", "Unlimited everything", "Custom LLM", "On-premise deploy", "SLA 99.9%", "Custom integrations"],
  },
];

const SECTORS = [
  { icon: Globe,          label: "Websites",        desc: "Voice chatbot embedded on any site in 2 minutes." },
  { icon: Building2,      label: "Enterprises",      desc: "Multi-site, multi-language, SSO + admin dashboard." },
  { icon: GraduationCap,  label: "Education",        desc: "Kiosk assistants, interactive tutors, language labs." },
  { icon: Siren,          label: "Government",       desc: "Public kiosks, citizen services, offline terminals." },
  { icon: Plane,          label: "Transport & Aviation", desc: "Check-in kiosks, navigation bots, airport info." },
  { icon: Camera,         label: "Security & Safety", desc: "Alert bots, AI surveillance integrations." },
];

const TESTIMONIALS = [
  { name: "Hyderabad Metro",    role: "Transit Authority",  text: "KIOSKO handles 2,000 queries/day at our stations. Zero staff needed for basic info." },
  { name: "EduFirst Academy",  role: "Education Tech",     text: "Demo Sree converted 40% of our trial sign-ups. Prospects see it in action instantly." },
  { name: "SecureBank Ltd.",   role: "Financial Services", text: "Offline Bot runs in our air-gapped branches. Same AI, zero internet dependency." },
  { name: "TechFlow Agency",   role: "Digital Agency",     text: "We white-labeled Aevothon for 12 clients in a month. The API is incredibly clean." },
];

export default function AevothonHome() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTool, setActiveTool] = useState("webchat");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [dark]);

  const bg    = dark ? "bg-[#050a14]" : "bg-[#f8faff]";
  const text  = dark ? "text-white" : "text-slate-900";
  const sub   = dark ? "text-slate-400" : "text-slate-600";
  const card  = dark ? "bg-white/[0.03] border-white/8" : "bg-white border-slate-200";
  const nav   = dark
    ? (scrolled ? "bg-[#050a14]/90 border-white/5" : "bg-transparent border-transparent")
    : (scrolled ? "bg-white/90 border-slate-200 shadow-sm" : "bg-transparent border-transparent");

  const goLogin = () => navigate("/login");

  return (
    <div className={`min-h-screen ${bg} ${text} font-sans overflow-x-hidden transition-colors duration-300`}>
      <style>{`
        @keyframes freq1{0%,100%{height:10px}50%{height:36px}}
        @keyframes freq2{0%,100%{height:16px}50%{height:48px}}
        @keyframes freq3{0%,100%{height:8px}50%{height:28px}}
        @keyframes orbit{0%{transform:rotate(0deg) translateX(100px) rotate(0deg)}100%{transform:rotate(360deg) translateX(100px) rotate(-360deg)}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:.35}100%{transform:scale(1.7);opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .fb1{animation:freq1 1.2s ease-in-out infinite}
        .fb2{animation:freq2 .9s ease-in-out infinite}
        .fb3{animation:freq3 1.5s ease-in-out infinite}
        .fb4{animation:freq1 1.1s ease-in-out infinite}
        .fb5{animation:freq2 1.3s ease-in-out infinite}
        .pr1{animation:pulse-ring 2.2s ease-out infinite}
        .pr2{animation:pulse-ring 2.2s ease-out infinite .8s}
        .oi1{animation:orbit 9s linear infinite}
        .oi2{animation:orbit 13s linear infinite reverse}
        .oi3{animation:orbit 11s linear infinite;animation-delay:-4s}
        .fade-up{animation:fadeUp .7s ease both}
      `}</style>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-300 ${nav}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl overflow-hidden border ${dark ? "border-cyan-500/30" : "border-slate-300"}`}>
              <img src={LOGO} alt="Aevothon" className="w-full h-full object-cover" onError={e=>e.target.style.display="none"} />
            </div>
            <span className={`font-black text-sm tracking-tight ${text}`}>
              AEVOTHON <span className="text-cyan-500">·</span> <span className={sub + " font-normal"}>aevothon.aevoice.ai</span>
            </span>
          </div>
          <div className={`hidden md:flex items-center gap-6 text-xs ${sub}`}>
            {["#tools","#pricing","#sectors","#demo"].map(h=>(
              <a key={h} href={h} className={`hover:${text} transition-colors`}>{h.slice(1).replace(/^\w/,c=>c.toUpperCase())}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={()=>setDark(d=>!d)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark ? "bg-white/5 hover:bg-white/10" : "bg-slate-100 hover:bg-slate-200"} transition-colors`}>
              {dark ? <Sun className="w-4 h-4 text-amber-400"/> : <Moon className="w-4 h-4 text-slate-600"/>}
            </button>
            <button onClick={goLogin} className={`text-xs ${sub} hover:${text} transition-colors`}>Sign In</button>
            <button onClick={goLogin}
              className="h-8 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-semibold hover:opacity-90 shadow-lg shadow-cyan-500/20">
              Get Started Free
            </button>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button onClick={()=>setDark(d=>!d)} className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark?"bg-white/5":"bg-slate-100"}`}>
              {dark ? <Sun className="w-4 h-4 text-amber-400"/> : <Moon className="w-4 h-4 text-slate-600"/>}
            </button>
            <button onClick={()=>setMobileOpen(o=>!o)}>
              {mobileOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className={`md:hidden backdrop-blur-xl border-b px-6 py-4 space-y-3 ${dark?"bg-[#0a1628]/95 border-white/5":"bg-white/95 border-slate-200"}`}>
            {["#tools","#pricing","#sectors"].map(h=>(
              <a key={h} href={h} onClick={()=>setMobileOpen(false)} className={`block text-sm ${sub} py-1`}>{h.slice(1).replace(/^\w/,c=>c.toUpperCase())}</a>
            ))}
            <button onClick={goLogin} className="w-full h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold mt-2">
              Get Started Free
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Left */}
        <div className="flex-1 space-y-6 fade-up">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] ${dark?"border-cyan-500/20 bg-cyan-500/5 text-cyan-400":"border-cyan-500/30 bg-cyan-50 text-cyan-600"}`}>
            <Zap className="w-3 h-3 animate-pulse"/> 6 AI Tools · Voice + Kiosk + Offline · Live
          </div>
          <h1 className={`text-4xl md:text-6xl font-black leading-tight tracking-tight ${text}`}>
            The AI Tools<br/>
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
              Platform for<br/>Every Surface
            </span>
          </h1>
          <p className={`text-lg leading-relaxed max-w-xl ${sub}`}>
            Web chatbots, voice kiosks, offline bots, desktop overlays, demo agents — all in one platform. Deploy AI on any device, online or offline.
          </p>
          <p className={`text-sm font-medium italic ${dark?"text-cyan-400/80":"text-cyan-600"}`}>
            "Sree: The assistant no business can afford to be without."
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={goLogin}
              className="h-12 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm hover:opacity-90 shadow-xl shadow-cyan-500/20 flex items-center gap-2">
              Start Free <ArrowRight className="w-4 h-4"/>
            </button>
            <button onClick={()=>document.getElementById("demo")?.scrollIntoView({behavior:"smooth"})}
              className={`h-12 px-8 rounded-xl border font-semibold text-sm flex items-center gap-2 transition-colors ${dark?"border-white/10 bg-white/5 hover:bg-white/10":"border-slate-200 bg-white hover:bg-slate-50"}`}>
              <Play className="w-4 h-4"/> Live Demo
            </button>
          </div>
          <div className="flex flex-wrap gap-4 pt-1">
            {["6 AI Tools","Voice + Text","Offline Mode","Kiosk Ready","White-label"].map(t=>(
              <span key={t} className={`flex items-center gap-1.5 text-xs ${sub}`}>
                <Check className="w-3 h-3 text-cyan-500"/>{t}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Animated hero */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-72 h-72 select-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-52 h-52 rounded-full border border-cyan-500/20 pr1"/>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-52 h-52 rounded-full border border-violet-500/15 pr2"/>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="oi1"><div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center"><Mic className="w-4 h-4 text-cyan-400"/></div></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="oi2"><div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center"><Monitor className="w-4 h-4 text-violet-400"/></div></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="oi3"><div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center"><Brain className="w-4 h-4 text-amber-400"/></div></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden shadow-2xl shadow-cyan-500/20">
                <img src={LOGO} alt="Aevothon" className="w-full h-full object-cover" onError={e=>e.target.style.display="none"}/>
              </div>
              <div className="flex items-end gap-1 h-9 mt-3">
                {[["fb1","cyan"],["fb2","violet"],["fb3","cyan"],["fb4","pink"],["fb5","violet"],["fb2","cyan"],["fb1","violet"],["fb4","cyan"],["fb3","pink"],["fb5","cyan"]].map(([cls,c],i)=>(
                  <div key={i} className={`w-1.5 rounded-full bg-gradient-to-t from-${c}-500 to-${c}-300 ${cls}`} style={{animationDelay:`${i*0.08}s`}}/>
                ))}
              </div>
              <p className="text-[9px] font-mono tracking-widest text-cyan-400/50 mt-2">AEVOTHON · ACTIVE</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section id="tools" className={`py-20 border-y ${dark?"border-white/5 bg-white/[0.015]":"border-slate-200 bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className={`text-xs font-mono tracking-widest mb-3 ${dark?"text-cyan-400/60":"text-cyan-600"}`}>THE TOOLKIT</p>
            <h2 className={`text-3xl md:text-4xl font-black ${text}`}>6 AI Tools. One Platform.</h2>
            <p className={`mt-3 max-w-xl mx-auto ${sub}`}>Choose one or deploy all. Every tool is independent, brandable, and production-ready.</p>
          </div>
          {/* Tool selector tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {TOOLS.map(t=>(
              <button key={t.id} onClick={()=>setActiveTool(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTool===t.id
                    ? `bg-gradient-to-r ${t.gradient} text-white shadow-lg`
                    : dark ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white" : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
                }`}>
                <t.icon className="w-3.5 h-3.5"/>
                {t.name}
                {t.badge && <span className={`px-1.5 py-0.5 rounded-full text-[9px] bg-white/20`}>{t.badge}</span>}
              </button>
            ))}
          </div>
          {/* Active tool detail */}
          {TOOLS.filter(t=>t.id===activeTool).map(tool=>(
            <div key={tool.id} className={`rounded-3xl border p-8 md:p-12 ${dark?"bg-white/[0.02] border-white/8":"bg-white border-slate-200 shadow-sm"}`}>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center flex-shrink-0 shadow-xl`}>
                  <tool.icon className="w-8 h-8 text-white"/>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-2xl font-black ${text}`}>{tool.name}</h3>
                    {tool.badge && <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r ${tool.gradient} text-white`}>{tool.badge}</span>}
                  </div>
                  <p className={`text-sm font-medium mb-3 text-${tool.color}-500`}>{tool.tagline}</p>
                  <p className={`text-base leading-relaxed mb-6 ${sub}`}>{tool.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {tool.features.map(f=>(
                      <span key={f} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${
                        dark?`border-${tool.color}-500/20 bg-${tool.color}-500/5 text-${tool.color}-300`:`border-${tool.color}-200 bg-${tool.color}-50 text-${tool.color}-700`
                      }`}>
                        <Check className="w-3 h-3"/>{f}
                      </span>
                    ))}
                  </div>
                  <button onClick={goLogin} className={`h-10 px-6 rounded-xl bg-gradient-to-r ${tool.gradient} text-white text-sm font-semibold hover:opacity-90 flex items-center gap-2 shadow-lg`}>
                    Get {tool.name} <ArrowRight className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE DEMO ── */}
      <section id="demo" className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className={`text-xs font-mono tracking-widest mb-3 ${dark?"text-violet-400/60":"text-violet-600"}`}>INTERACTIVE DEMO</p>
          <h2 className={`text-3xl md:text-4xl font-black ${text}`}>Try Sree Right Now</h2>
          <p className={`mt-3 max-w-xl mx-auto ${sub}`}>No sign-up needed. Type or speak — Sree responds instantly.</p>
        </div>
        <div className={`max-w-2xl mx-auto rounded-3xl border overflow-hidden shadow-2xl ${dark?"border-violet-500/20 bg-[#0d1526]":"border-slate-200 bg-white"}`}>
          {/* Demo header */}
          <div className={`flex items-center justify-between px-5 py-3 border-b ${dark?"border-white/5":"border-slate-100"}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full overflow-hidden border ${dark?"border-violet-500/30":"border-slate-200"}`}>
                <img src={LOGO} alt="Sree" className="w-full h-full object-cover" onError={e=>e.target.style.display="none"}/>
              </div>
              <div>
                <p className={`text-xs font-bold ${text}`}>Sree Demo</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"/>Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${dark?"bg-white/5 text-slate-400":"bg-slate-100 text-slate-500"}`}><Mic className="w-3.5 h-3.5"/></button>
              <button className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${dark?"bg-white/5 text-slate-400":"bg-slate-100 text-slate-500"}`}><Volume2 className="w-3.5 h-3.5"/></button>
            </div>
          </div>
          {/* Chat messages */}
          <div className="p-5 space-y-3 min-h-[200px]">
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0"><Bot className="w-3.5 h-3.5 text-white"/></div>
              <div className={`rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-xs text-sm ${dark?"bg-white/5 text-slate-300":"bg-slate-100 text-slate-700"}`}>
                Hi! I'm Sree 👋 I can answer questions, handle voice calls, run on kiosks, and even work offline. What would you like to know?
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div className={`rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs text-sm bg-gradient-to-r from-cyan-500 to-violet-600 text-white`}>
                What tools does Aevothon offer?
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0"><Bot className="w-3.5 h-3.5 text-white"/></div>
              <div className={`rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-sm text-sm ${dark?"bg-white/5 text-slate-300":"bg-slate-100 text-slate-700"}`}>
                Aevothon has 6 tools: 🎤 Web Voice Chatbot, 🖥 KIOSKO, 🧠 Demo Sree, 🛡 Offline Bot, 🗂 Desktop Overlay, and ⚡ Aevothon API. Each works independently or together.
              </div>
            </div>
          </div>
          {/* Input */}
          <div className={`px-4 py-3 border-t ${dark?"border-white/5":"border-slate-100"}`}>
            <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${dark?"border-white/10 bg-white/5":"border-slate-200 bg-slate-50"}`}>
              <input className={`flex-1 text-sm bg-transparent outline-none placeholder-slate-600 ${text}`}
                placeholder="Ask Sree anything… (sign up for full access)"
                onFocus={e => { e.target.placeholder = "Sign up to unlock full voice + text →"; e.target.blur(); goLogin(); }} />
              <button className="w-7 h-7 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-white"/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className={`py-20 border-y ${dark?"border-white/5 bg-white/[0.015]":"border-slate-200 bg-slate-50"}`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className={`text-xs font-mono tracking-widest mb-3 ${dark?"text-cyan-400/60":"text-cyan-600"}`}>PRICING</p>
            <h2 className={`text-3xl md:text-4xl font-black ${text}`}>Start Free. Scale Freely.</h2>
            <p className={`mt-3 ${sub}`}>All plans include a 14-day free trial. No credit card required.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map(plan=>(
              <div key={plan.name} className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.badge==="Most Popular"
                  ? `${dark?"border-cyan-500/40 bg-cyan-500/5 shadow-xl shadow-cyan-500/10":"border-cyan-400 bg-cyan-50 shadow-xl shadow-cyan-500/10"}`
                  : `${dark?"border-white/8 bg-white/[0.02]":"border-slate-200 bg-white"}`
              }`}>
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${plan.color} shadow-lg whitespace-nowrap`}>
                    {plan.badge}
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                  <Cpu className="w-5 h-5 text-white"/>
                </div>
                <h3 className={`font-black text-lg mb-1 ${text}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className={`text-3xl font-black ${text}`}>${plan.price}</span>
                  <span className={`text-sm ${sub}`}>/mo</span>
                </div>
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.tools.map(f=>(
                    <li key={f} className={`flex items-start gap-2 text-xs ${sub}`}>
                      <Check className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0"/>{f}
                    </li>
                  ))}
                </ul>
                <button onClick={goLogin}
                  className={`w-full h-10 rounded-xl bg-gradient-to-r ${plan.color} text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
          <p className={`text-center text-xs mt-6 ${dark?"text-slate-700":"text-slate-400"}`}>
            Need a custom plan for 50+ deployments? <button onClick={goLogin} className="text-cyan-500 hover:underline">Contact us →</button>
          </p>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section id="sectors" className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className={`text-xs font-mono tracking-widest mb-3 ${dark?"text-violet-400/60":"text-violet-600"}`}>USE CASES</p>
          <h2 className={`text-3xl md:text-4xl font-black ${text}`}>Built for Every Sector</h2>
          <p className={`mt-3 max-w-xl mx-auto ${sub}`}>
            "Every business, every organization, every system needs Sree Dev — without it, you lose business."
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SECTORS.map(s=>(
            <div key={s.label} className={`rounded-2xl border p-5 hover:border-violet-500/30 transition-all ${dark?"border-white/5 bg-white/[0.02]":"border-slate-200 bg-white"}`}>
              <s.icon className="w-6 h-6 text-violet-400 mb-3"/>
              <h3 className={`font-semibold text-sm mb-1 ${text}`}>{s.label}</h3>
              <p className={`text-xs leading-relaxed ${sub}`}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={`py-20 border-y ${dark?"border-white/5 bg-white/[0.015]":"border-slate-200 bg-slate-50"}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className={`text-xs font-mono tracking-widest mb-3 ${dark?"text-slate-600":"text-slate-400"}`}>TRUSTED BY TEAMS</p>
            <h2 className={`text-3xl font-black ${text}`}>What Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TESTIMONIALS.map(t=>(
              <div key={t.name} className={`rounded-2xl border p-6 ${dark?"border-white/5 bg-white/[0.02]":"border-slate-200 bg-white"}`}>
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_,i)=><Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/>)}</div>
                <p className={`text-sm leading-relaxed mb-4 ${sub}`}>"{t.text}"</p>
                <p className={`text-xs font-semibold ${text}`}>{t.name}</p>
                <p className={`text-xs ${sub}`}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section className="py-16 max-w-6xl mx-auto px-6 text-center">
        <p className={`text-xs font-mono tracking-widest mb-6 ${dark?"text-slate-700":"text-slate-400"}`}>PART OF THE AEVOICE ECOSYSTEM</p>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {["aevoice.ai","os.aevoice.ai","cream.aevoice.ai","media.aevoice.ai","hellobiz.app","pay.hellobiz.app"].map(d=>(
            <a key={d} href={`https://${d}`} target="_blank" rel="noreferrer"
              className={`px-3 py-1.5 rounded-full border text-xs transition-all ${dark?"border-white/10 text-slate-500 hover:text-white hover:border-white/20":"border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300"}`}>
              {d}
            </a>
          ))}
        </div>
        <p className={`text-xs ${dark?"text-slate-700":"text-slate-400"}`}>Part of AEVOICE.AI — The ultimate business technology.</p>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-4xl md:text-5xl font-black mb-4 ${text}`}>
          Deploy your first<br/>
          <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">AI tool today.</span>
        </h2>
        <p className={`text-lg mb-8 max-w-xl mx-auto ${sub}`}>
          Voice chatbot, kiosk, offline bot, or desktop overlay — pick one or all six. Start free in 2 minutes.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button onClick={goLogin}
            className="h-13 px-10 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold hover:opacity-90 shadow-xl shadow-cyan-500/20 flex items-center gap-2">
            Get Started Free <ArrowRight className="w-4 h-4"/>
          </button>
          <button onClick={()=>navigate("/Pricing")}
            className={`h-13 px-10 rounded-xl border font-semibold transition-colors ${dark?"border-white/10 bg-white/5 hover:bg-white/10":"border-slate-200 bg-white hover:bg-slate-50"}`}>
            View All Plans
          </button>
        </div>
        <p className={`text-xs mt-6 ${dark?"text-slate-700":"text-slate-400"}`}>
          The omnichannel AI platform for voice calls, SMS, web chat, WhatsApp, email, and social media.
        </p>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`border-t py-10 ${dark?"border-white/5":"border-slate-200"}`}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-cyan-500/20">
              <img src={LOGO} alt="Aevothon" className="w-full h-full object-cover" onError={e=>e.target.style.display="none"}/>
            </div>
            <span className={`text-xs font-bold ${sub}`}>AEVOTHON · aevothon.aevoice.ai</span>
          </div>
          <div className={`flex gap-6 text-xs ${sub}`}>
            <a href="#tools" className="hover:text-current">Tools</a>
            <a href="#pricing" className="hover:text-current">Pricing</a>
            <button onClick={goLogin} className="hover:text-current">Login</button>
          </div>
          <p className={`text-xs ${dark?"text-slate-700":"text-slate-400"}`}>© 2026 AEVOICE.AI · Part of the ultimate business technology.</p>
        </div>
      </footer>
    </div>
  );
}
