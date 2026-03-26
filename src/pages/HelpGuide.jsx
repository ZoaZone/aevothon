import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, Mic, Monitor, Brain, Shield, Layers, Code2, ChevronRight,
  ChevronDown, Search, ArrowLeft, Moon, Sun, ExternalLink, Check, Zap
} from "lucide-react";

const LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b24a5bac54e3067972063/2e8a22a03_AevoiceLogo.JPG";

const GUIDES = [
  {
    id: "getting-started",
    icon: Zap, color: "cyan",
    title: "Getting Started",
    desc: "Set up your first AI tool in under 5 minutes.",
    articles: [
      { title: "Create your account", content: "Sign up at aevothon.aevoice.ai, choose a plan, and complete onboarding. You'll have your first bot live in under 5 minutes." },
      { title: "Choose your first tool", content: "Start with the Web Voice Chatbot — it's the quickest to deploy. Go to Dashboard → Web Chatbot → Configure → copy the embed code." },
      { title: "Embed on your website", content: "Paste the single <script> tag before </body> in your HTML. The widget appears automatically. No framework required — works on WordPress, Shopify, Wix, custom HTML, and React." },
      { title: "Train with your content", content: "Go to Knowledge Base and upload PDFs, paste FAQs, or enter your website URL. Sree learns from your content and uses it to answer questions." },
    ],
  },
  {
    id: "web-chatbot",
    icon: Mic, color: "cyan",
    title: "Web Voice Chatbot",
    desc: "Voice + text chatbot embedded on any website.",
    articles: [
      { title: "How voice mode works", content: "When voice is enabled, users click the microphone button. The browser captures audio (Web Speech API), transcribes it, sends it to Sree, and plays back the response as speech (TTS). No plugins needed." },
      { title: "Customising your bot", content: "You can change the bot name, greeting message, primary colour, widget position, and language. Go to Web Chatbot → Configure to update these settings." },
      { title: "Multi-language support", content: "Sree automatically detects the user's browser language. You can lock it to a specific language or allow auto-detection. Supported: English, Hindi, Telugu, Tamil, Spanish, French, Arabic, German." },
      { title: "Analysing conversations", content: "Go to Analytics → Chatbot to see conversation volume, common questions, resolution rate, and user satisfaction scores." },
    ],
  },
  {
    id: "kiosko",
    icon: Monitor, color: "violet",
    title: "KIOSKO Terminal",
    desc: "AI kiosk for public spaces — touch + voice.",
    articles: [
      { title: "What is KIOSKO?", content: "KIOSKO is a full-screen AI assistant designed for physical touch screens. It runs in kiosk mode (no browser chrome), handles touch and voice, and can operate fully offline after initial setup." },
      { title: "Hardware requirements", content: "Any Android tablet (8\"+) or Windows PC with a touch screen. We recommend a 10–15\" screen. For outdoor use, use a brightness-enhanced screen. KIOSKO runs as a PWA or via our Android app." },
      { title: "Offline mode", content: "KIOSKO can cache your knowledge base and run without internet. Enable offline mode in Settings → KIOSKO → Enable Offline Cache. Updates sync when connection returns." },
      { title: "Supported deployments", content: "Hospitals, government offices, airports, hotels, retail stores, schools, police stations, and any public-facing space needing self-service AI." },
    ],
  },
  {
    id: "demo-sree",
    icon: Brain, color: "indigo",
    title: "Demo Sree",
    desc: "Interactive demo of Sree's capabilities for prospects.",
    articles: [
      { title: "Creating a demo", content: "Go to Demo Sree → New Demo. Give it a name, select which features to showcase (voice, chat, KB, analytics), and click Generate. You get a unique shareable URL instantly." },
      { title: "Lead capture", content: "Enable lead capture in the demo settings. When prospects interact with your demo, their email and details are captured automatically and added to your CRM." },
      { title: "Analytics on demo usage", content: "See how many times your demo was viewed, how long prospects spent, which features they interacted with, and conversion rate to sign-up." },
    ],
  },
  {
    id: "offline-bot",
    icon: Shield, color: "emerald",
    title: "Offline Bot",
    desc: "100% offline AI — runs on-device, no internet needed.",
    articles: [
      { title: "How offline works", content: "The Offline Bot uses a quantised local LLM (LLaMA 3 8B or Mistral 7B) bundled with your knowledge base. It runs entirely on-device — no data ever leaves the machine." },
      { title: "Deployment options", content: "Deploy as: (1) Windows/Mac desktop app, (2) Android APK, (3) Raspberry Pi / single-board computer, (4) Air-gapped enterprise server. All options available in Downloads." },
      { title: "Security compliance", content: "The Offline Bot is suitable for HIPAA, GDPR, and air-gapped environments. No telemetry, no cloud calls. Your data stays on your hardware." },
    ],
  },
  {
    id: "api",
    icon: Code2, color: "rose",
    title: "Aevothon API",
    desc: "REST + WebSocket API for custom integrations.",
    articles: [
      { title: "Authentication", content: "All API calls require a Bearer token. Get your token from Dashboard → API → Generate Token. Tokens expire every 30 days. Use the refresh endpoint to rotate them." },
      { title: "Chat API", content: "POST /api/chat with {messages: [...], botId: '...'} to get a response. Supports streaming via WebSocket for real-time text output." },
      { title: "Voice API", content: "POST /api/voice/transcribe to convert audio → text. POST /api/voice/synthesise to convert text → audio. Supports mp3, wav, ogg output." },
      { title: "KB Management API", content: "POST /api/kb/upload to add documents. GET /api/kb/query to search. DELETE /api/kb/{id} to remove. All operations are synchronous." },
    ],
  },
];

export default function HelpGuide() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem("aevothon_theme") !== "light");
  const [search, setSearch] = useState("");
  const [activeGuide, setActiveGuide] = useState("getting-started");
  const [openArticle, setOpenArticle] = useState(null);

  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);

  const bg   = dark ? "bg-[#050a14]" : "bg-[#f4f6fb]";
  const text = dark ? "text-white"   : "text-slate-900";
  const sub  = dark ? "text-slate-400":"text-slate-500";
  const card = dark ? "bg-white/[0.03] border-white/8" : "bg-white border-slate-200";

  const filtered = search
    ? GUIDES.map(g => ({ ...g, articles: g.articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase())) })).filter(g => g.articles.length > 0)
    : GUIDES;

  const guide = filtered.find(g => g.id === activeGuide) || filtered[0];

  return (
    <div className={`min-h-screen ${bg} ${text} font-sans transition-colors duration-300`}>
      {/* Header */}
      <header className={`h-14 flex items-center justify-between px-6 border-b sticky top-0 z-10 ${dark?"border-white/5 bg-[#0a1628]":"border-slate-200 bg-white"}`}>
        <div className="flex items-center gap-3">
          <button onClick={()=>navigate("/Dashboard")} className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark?"hover:bg-white/5":"hover:bg-slate-100"}`}>
            <ArrowLeft className={`w-4 h-4 ${sub}`}/>
          </button>
          <BookOpen className={`w-5 h-5 text-cyan-400`}/>
          <span className={`font-bold text-sm ${text}`}>Help Guide</span>
        </div>
        <button onClick={()=>setDark(d=>!d)} className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark?"hover:bg-white/5":"hover:bg-slate-100"}`}>
          {dark ? <Sun className="w-4 h-4 text-amber-400"/> : <Moon className="w-4 h-4 text-slate-600"/>}
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 flex gap-6">
        {/* Left sidebar — guide categories */}
        <aside className="w-52 flex-shrink-0">
          {/* Search */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border mb-4 ${dark?"border-white/10 bg-white/5":"border-slate-200 bg-white"}`}>
            <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search guides..."
              className={`flex-1 text-xs bg-transparent outline-none ${text} placeholder-slate-600`}/>
          </div>
          <nav className="space-y-1">
            {filtered.map(g=>(
              <button key={g.id} onClick={()=>setActiveGuide(g.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                  activeGuide===g.id
                    ? `bg-${g.color}-500/10 text-${g.color}-400 border border-${g.color}-500/20`
                    : `${sub} ${dark?"hover:bg-white/5":"hover:bg-slate-100"}`
                }`}>
                <g.icon className="w-3.5 h-3.5 flex-shrink-0"/>
                {g.title}
                <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded-full ${dark?"bg-white/5":"bg-slate-100"}`}>{g.articles.length}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {guide && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-${guide.color}-500/15 flex items-center justify-center`}>
                  <guide.icon className={`w-5 h-5 text-${guide.color}-400`}/>
                </div>
                <div>
                  <h1 className={`font-black text-xl ${text}`}>{guide.title}</h1>
                  <p className={`text-xs ${sub}`}>{guide.desc}</p>
                </div>
              </div>
              <div className="space-y-3">
                {guide.articles.map((a,i)=>(
                  <div key={i} className={`rounded-2xl border overflow-hidden ${card}`}>
                    <button className={`w-full flex items-center justify-between px-5 py-4 text-left`}
                      onClick={()=>setOpenArticle(openArticle===`${guide.id}-${i}` ? null : `${guide.id}-${i}`)}>
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full bg-${guide.color}-500/20 text-${guide.color}-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0`}>{i+1}</span>
                        <span className={`text-sm font-semibold ${text}`}>{a.title}</span>
                      </div>
                      {openArticle===`${guide.id}-${i}` ? <ChevronDown className={`w-4 h-4 ${sub}`}/> : <ChevronRight className={`w-4 h-4 ${sub}`}/>}
                    </button>
                    {openArticle===`${guide.id}-${i}` && (
                      <div className={`px-5 pb-4 pt-0 text-sm leading-relaxed border-t ${dark?"border-white/5 text-slate-300":"border-slate-100 text-slate-600"}`}>
                        {a.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Need more help CTA */}
              <div className={`mt-8 rounded-2xl border p-5 text-center ${dark?"border-white/5 bg-white/[0.02]":"border-slate-200 bg-slate-50"}`}>
                <p className={`text-sm font-semibold mb-1 ${text}`}>Still need help?</p>
                <p className={`text-xs mb-4 ${sub}`}>Our support team typically responds within 2 hours.</p>
                <button onClick={()=>navigate("/Dashboard")}
                  className="h-9 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-semibold hover:opacity-90 shadow-lg">
                  Contact Support
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
