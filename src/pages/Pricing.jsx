import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Zap, ArrowLeft, Moon, Sun, Cpu, MessageSquare, Mic, Monitor, Shield, Layers, Code2, Brain } from "lucide-react";

const LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b24a5bac54e3067972063/2e8a22a03_AevoiceLogo.JPG";

const PLANS = [
  {
    name: "Starter",
    price_mo: 29, price_yr: 290,
    color: "from-slate-500 to-slate-700", border: "border-white/8",
    badge: null, highlight: false,
    desc: "Web voice chatbot for small websites.",
    tools: ["Web Voice Chatbot only"],
    features: [
      "500 conversations/month","1 Knowledge Base","Basic analytics",
      "Embed on any website","Email support","Custom bot name",
    ],
  },
  {
    name: "Professional",
    price_mo: 99, price_yr: 990,
    color: "from-cyan-500 to-blue-600", border: "border-cyan-500/40",
    badge: "Most Popular", highlight: true,
    desc: "All tools + advanced analytics + custom branding.",
    tools: ["Web Voice Chatbot","KIOSKO","Demo Sree"],
    features: [
      "5,000 conversations/month","10 Knowledge Bases","Advanced analytics",
      "Custom branding & colors","Priority support","API access",
      "Multi-language (8 languages)","Lead capture built-in",
    ],
  },
  {
    name: "Business",
    price_mo: 249, price_yr: 2490,
    color: "from-violet-500 to-purple-700", border: "border-violet-500/30",
    badge: null, highlight: false,
    desc: "All 6 tools including offline + desktop overlay.",
    tools: ["All 6 Tools"],
    features: [
      "Unlimited conversations","Unlimited Knowledge Bases","Offline Bot",
      "Desktop Overlay","Full API access","Dedicated support",
      "White-label option","SSO integration","All languages",
    ],
  },
  {
    name: "Enterprise",
    price_mo: 799, price_yr: 7990,
    color: "from-amber-500 to-orange-600", border: "border-amber-500/30",
    badge: "Enterprise", highlight: false,
    desc: "Custom LLM, on-premise, SLA, unlimited seats.",
    tools: ["Everything + Custom"],
    features: [
      "Custom LLM (GPT-4o / local)","On-premise deployment",
      "SLA 99.9%","Unlimited seats","Custom integrations",
      "Dedicated account manager","White-glove onboarding",
      "Air-gapped / offline deployment","HIPAA / GDPR compliance",
    ],
  },
];

const TOOL_MATRIX = [
  { name: "Web Voice Chatbot", icon: Mic,     plans: [true,true,true,true] },
  { name: "KIOSKO Terminal",   icon: Monitor, plans: [false,true,true,true] },
  { name: "Demo Sree",         icon: Brain,   plans: [false,true,true,true] },
  { name: "Offline Bot",       icon: Shield,  plans: [false,false,true,true] },
  { name: "Desktop Overlay",   icon: Layers,  plans: [false,false,true,true] },
  { name: "Aevothon API",      icon: Code2,   plans: [false,"limited",true,true] },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);
  const [annual, setAnnual] = useState(false);

  const bg   = dark ? "bg-[#050a14]" : "bg-[#f8faff]";
  const text = dark ? "text-white" : "text-slate-900";
  const sub  = dark ? "text-slate-400" : "text-slate-600";
  const card = dark ? "bg-white/[0.02] border-white/8" : "bg-white border-slate-200";

  return (
    <div className={`min-h-screen ${bg} ${text} font-sans transition-colors duration-300`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"/>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"/>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-0 flex items-center justify-between">
        <button onClick={()=>navigate("/Home")} className={`flex items-center gap-1.5 text-xs ${sub} hover:${text} transition-colors`}>
          <ArrowLeft className="w-3.5 h-3.5"/> Back
        </button>
        <div className="flex items-center gap-3">
          <button onClick={()=>setDark(d=>!d)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${dark?"bg-white/5 hover:bg-white/10":"bg-slate-100 hover:bg-slate-200"}`}>
            {dark ? <Sun className="w-4 h-4 text-amber-400"/> : <Moon className="w-4 h-4 text-slate-600"/>}
          </button>
          <div className="w-7 h-7 rounded-lg overflow-hidden">
            <img src={LOGO} alt="Aevothon" className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <p className={`text-xs font-mono tracking-widest mb-3 ${dark?"text-cyan-400/60":"text-cyan-600"}`}>AEVOTHON PRICING</p>
          <h1 className={`text-4xl md:text-5xl font-black mb-4 ${text}`}>Simple. Transparent. Scalable.</h1>
          <p className={`text-lg max-w-xl mx-auto mb-6 ${sub}`}>All plans include a 14-day free trial. No credit card required.</p>
          {/* Annual toggle */}
          <div className={`inline-flex items-center gap-3 p-1 rounded-xl border ${dark?"border-white/10 bg-white/5":"border-slate-200 bg-slate-100"}`}>
            <button onClick={()=>setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${!annual ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow" : `${sub}`}`}>
              Monthly
            </button>
            <button onClick={()=>setAnnual(true)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${annual ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow" : `${sub}`}`}>
              Annual <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">-17%</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {PLANS.map((plan, pi) => (
            <div key={plan.name} className={`relative rounded-2xl border p-6 flex flex-col transition-all hover:scale-[1.01] ${
              plan.highlight
                ? dark ? "border-cyan-500/40 bg-cyan-500/5 shadow-2xl shadow-cyan-500/10" : "border-cyan-400 bg-cyan-50 shadow-2xl shadow-cyan-500/10"
                : `${card}`
            }`}>
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${plan.color} shadow-lg whitespace-nowrap`}>
                  {plan.badge}
                </div>
              )}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                <Cpu className="w-5 h-5 text-white"/>
              </div>
              <h3 className={`font-black text-xl mb-1 ${text}`}>{plan.name}</h3>
              <p className={`text-xs mb-3 ${sub}`}>{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`text-3xl font-black ${text}`}>${annual ? plan.price_yr : plan.price_mo}</span>
                <span className={`text-sm ${sub}`}>/{annual?"yr":"mo"}</span>
              </div>
              {annual && <p className="text-[10px] text-emerald-400 mb-3">Save ${plan.price_mo*12-plan.price_yr}/yr</p>}
              {/* Included tools */}
              <div className="mb-4">
                {plan.tools.map(t=>(
                  <span key={t} className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full mr-1 mb-1 ${dark?"bg-white/5 text-slate-300":"bg-slate-100 text-slate-600"}`}>
                    <Zap className="w-2.5 h-2.5 text-cyan-400"/>{t}
                  </span>
                ))}
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map(f=>(
                  <li key={f} className={`flex items-start gap-2 text-xs ${sub}`}>
                    <Check className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0"/>{f}
                  </li>
                ))}
              </ul>
              <button onClick={()=>navigate("/login")}
                className={`w-full h-10 rounded-xl bg-gradient-to-r ${plan.color} text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg`}>
                {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
              </button>
            </div>
          ))}
        </div>

        {/* Tool matrix */}
        <div className={`rounded-3xl border overflow-hidden mb-12 ${dark?"border-white/8 bg-white/[0.02]":"border-slate-200 bg-white"}`}>
          <div className={`px-6 py-4 border-b ${dark?"border-white/5":"border-slate-100"}`}>
            <h2 className={`font-black text-lg ${text}`}>Tool Availability by Plan</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${dark?"border-white/5":"border-slate-100"}`}>
                  <th className={`text-left px-6 py-3 text-xs font-medium ${sub}`}>Tool</th>
                  {PLANS.map(p=>(
                    <th key={p.name} className={`text-center px-4 py-3 text-xs font-medium ${sub}`}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${dark?"divide-white/[0.03]":"divide-slate-50"}`}>
                {TOOL_MATRIX.map(row=>(
                  <tr key={row.name} className={dark?"hover:bg-white/[0.02]":"hover:bg-slate-50"}>
                    <td className={`px-6 py-3 flex items-center gap-2 text-xs ${text}`}>
                      <row.icon className="w-3.5 h-3.5 text-cyan-400"/>{row.name}
                    </td>
                    {row.plans.map((v,i)=>(
                      <td key={i} className="text-center px-4 py-3">
                        {v === true ? <Check className="w-4 h-4 text-emerald-400 mx-auto"/> :
                         v === "limited" ? <span className={`text-[10px] ${dark?"text-amber-400":"text-amber-600"}`}>Limited</span> :
                         <span className={dark?"text-slate-700":"text-slate-300"}>—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`text-2xl font-black mb-2 ${text}`}>Questions?</h2>
          <p className={`text-sm mb-6 ${sub}`}>All plans include 14-day free trial, no credit card needed. Cancel anytime.</p>
          <button onClick={()=>navigate("/login")}
            className="h-11 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold hover:opacity-90 shadow-lg shadow-cyan-500/20">
            Start Free Trial
          </button>
          <p className={`text-xs mt-4 ${dark?"text-slate-700":"text-slate-400"}`}>Part of AEVOICE.AI — The ultimate business technology.</p>
        </div>
      </div>
    </div>
  );
}
