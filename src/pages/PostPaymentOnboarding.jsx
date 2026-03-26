import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Check, ArrowRight, Mic, Monitor, Brain, Shield, Layers, Code2, Loader2, Moon, Sun } from "lucide-react";

const LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b24a5bac54e3067972063/2e8a22a03_AevoiceLogo.JPG";

const TOOLS = [
  { id: "webchat",  icon: Mic,     label: "Web Voice Chatbot", color: "cyan" },
  { id: "kiosk",    icon: Monitor, label: "KIOSKO Terminal",   color: "violet" },
  { id: "demo",     icon: Brain,   label: "Demo Sree",         color: "indigo" },
  { id: "offline",  icon: Shield,  label: "Offline Bot",       color: "emerald" },
  { id: "overlay",  icon: Layers,  label: "Desktop Overlay",   color: "amber" },
  { id: "api",      icon: Code2,   label: "Aevothon API",      color: "rose" },
];

const STEPS = ["Welcome","Pick Tools","Setup","Done"];

export default function PostPaymentOnboarding() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(["webchat"]);
  const [bizName, setBizName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);

  const bg   = dark ? "bg-[#050a14]" : "bg-[#f8faff]";
  const text = dark ? "text-white"   : "text-slate-900";
  const sub  = dark ? "text-slate-400":"text-slate-500";

  const finish = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    navigate("/Dashboard");
  };

  return (
    <div className={`min-h-screen ${bg} ${text} flex items-center justify-center p-6 font-sans transition-colors duration-300`}>
      <button onClick={()=>setDark(d=>!d)} className={`fixed top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center ${dark?"bg-white/5":"bg-slate-100"}`}>
        {dark ? <Sun className="w-4 h-4 text-amber-400"/> : <Moon className="w-4 h-4 text-slate-600"/>}
      </button>
      <div className="w-full max-w-lg">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s,i)=>(
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full transition-all ${
                i===step ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg" :
                i<step   ? "text-emerald-400" : `${sub}`
              }`}>
                {i<step ? <Check className="w-3 h-3"/> : <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px]">{i+1}</span>}
                {s}
              </div>
              {i<STEPS.length-1 && <span className={dark?"text-slate-800":"text-slate-300"}>›</span>}
            </div>
          ))}
        </div>

        {/* Step 0 — Welcome */}
        {step === 0 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl overflow-hidden border border-cyan-500/20 mx-auto shadow-2xl shadow-cyan-500/20">
              <img src={LOGO} alt="Aevothon" className="w-full h-full object-cover"/>
            </div>
            <div>
              <h1 className={`text-3xl font-black mb-2 ${text}`}>Welcome to Aevothon! 🎉</h1>
              <p className={`text-base ${sub}`}>Let's set up your AI tools in 2 minutes. You can always change these later.</p>
            </div>
            <button onClick={()=>setStep(1)} className="h-12 px-10 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold hover:opacity-90 shadow-xl shadow-cyan-500/20 flex items-center gap-2 mx-auto">
              Let's Go <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        )}

        {/* Step 1 — Pick tools */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className={`text-2xl font-black mb-1 ${text}`}>Which tools do you need?</h2>
              <p className={`text-sm ${sub}`}>Select all that apply — you can add more later.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TOOLS.map(t=>(
                <button key={t.id} onClick={()=>setSelected(s=>s.includes(t.id)?s.filter(x=>x!==t.id):[...s,t.id])}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                    selected.includes(t.id)
                      ? `border-${t.color}-500/40 bg-${t.color}-500/10 text-${t.color}-400`
                      : dark ? "border-white/8 bg-white/[0.02] text-slate-400 hover:border-white/20" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                  }`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${selected.includes(t.id)?`bg-${t.color}-500/20`:dark?"bg-white/5":"bg-slate-100"}`}>
                    <t.icon className={`w-4 h-4 ${selected.includes(t.id)?`text-${t.color}-400`:""}`}/>
                  </div>
                  <span className="text-xs font-semibold">{t.label}</span>
                  {selected.includes(t.id) && <Check className={`w-3.5 h-3.5 ml-auto text-${t.color}-400`}/>}
                </button>
              ))}
            </div>
            <button onClick={()=>setStep(2)} disabled={selected.length===0}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold hover:opacity-90 disabled:opacity-50 shadow-lg flex items-center justify-center gap-2">
              Continue <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        )}

        {/* Step 2 — Business setup */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="text-center">
              <h2 className={`text-2xl font-black mb-1 ${text}`}>Tell us about your business</h2>
              <p className={`text-sm ${sub}`}>We'll personalize your setup.</p>
            </div>
            <div className={`rounded-2xl border p-5 ${dark?"border-white/8 bg-white/[0.02]":"border-slate-200 bg-white"}`}>
              <label className={`block text-xs font-medium mb-2 ${sub}`}>Business / Organisation Name</label>
              <input value={bizName} onChange={e=>setBizName(e.target.value)} placeholder="e.g. Hyderabad Estate, EduFirst Academy"
                className={`w-full h-11 px-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${dark?"border-white/10 bg-white/5 text-white placeholder-slate-600":"border-slate-200 bg-white text-slate-900 placeholder-slate-400"}`}/>
            </div>
            <p className={`text-xs text-center ${sub}`}>Selected tools: {selected.length} of 6 · Can be changed anytime</p>
            <button onClick={()=>setStep(3)} className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold hover:opacity-90 shadow-lg flex items-center justify-center gap-2">
              Finish Setup <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        )}

        {/* Step 3 — Done */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
              <Check className="w-10 h-10 text-white"/>
            </div>
            <div>
              <h2 className={`text-3xl font-black mb-2 ${text}`}>You're all set! 🚀</h2>
              <p className={`${sub}`}>Your Aevothon workspace is ready. Let's deploy your first AI tool.</p>
            </div>
            <button onClick={finish} disabled={loading}
              className="h-12 px-10 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold hover:opacity-90 disabled:opacity-70 shadow-xl shadow-cyan-500/20 flex items-center gap-2 mx-auto">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin"/>Setting up…</> : <>Go to Dashboard <ArrowRight className="w-4 h-4"/></>}
            </button>
            <p className={`text-xs ${dark?"text-slate-700":"text-slate-400"}`}>Part of AEVOICE.AI — The ultimate business technology.</p>
          </div>
        )}
      </div>
    </div>
  );
}
