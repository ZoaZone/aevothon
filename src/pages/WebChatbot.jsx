import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  Mic, MicOff, Send, Volume2, VolumeX, Copy, Check, Plus,
  Settings, Globe, Palette, Moon, Sun, Code2, Play, Trash2,
  ChevronRight, ArrowLeft, Bot, User, Zap, X
} from "lucide-react";

const LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b24a5bac54e3067972063/2e8a22a03_AevoiceLogo.JPG";
const AEVA_FN = "https://app.base44.com/api/apps/YOUR_AEVOTHON_APP_ID/functions/aevaChat";

export default function WebChatbot() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem("aevothon_theme") !== "light");
  const [tab, setTab] = useState("chat"); // chat | config | embed
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your Aevothon Web Chatbot 👋 I'm ready to answer questions, take voice inputs, and assist visitors 24/7. Configure me using the settings panel." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [config, setConfig] = useState({
    botName: "Sree", primaryColor: "#06b6d4", greeting: "Hi! How can I help you today?",
    voice: true, language: "en", position: "bottom-right",
  });
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);

  const sendMsg = async (text) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: "user", content: text }]);
    setInput(""); setLoading(true);
    try {
      const token = localStorage.getItem("base44_access_token") || "";
      const res = await fetch(AEVA_FN, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: text }], botName: config.botName }),
      });
      const d = await res.json();
      setMessages(m => [...m, { role: "assistant", content: d.reply || d.content || "I'm here to help! How can I assist you?" }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Connection error — please try again." }]);
    } finally { setLoading(false); }
  };

  const embedCode = `<script src="https://aevothon.aevoice.ai/widget.js"
  data-bot="${config.botName}"
  data-color="${config.primaryColor}"
  data-lang="${config.language}"
  data-position="${config.position}"
></script>`;

  const bg   = dark ? "bg-[#050a14]" : "bg-[#f4f6fb]";
  const text = dark ? "text-white"   : "text-slate-900";
  const sub  = dark ? "text-slate-400":"text-slate-500";
  const card = dark ? "bg-white/[0.03] border-white/8" : "bg-white border-slate-200";

  return (
    <div className={`min-h-screen ${bg} ${text} font-sans transition-colors duration-300`}>
      {/* Header */}
      <header className={`h-14 flex items-center justify-between px-6 border-b ${dark?"border-white/5 bg-[#0a1628]":"border-slate-200 bg-white"} sticky top-0 z-10`}>
        <div className="flex items-center gap-3">
          <button onClick={()=>navigate("/Dashboard")} className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark?"hover:bg-white/5":"hover:bg-slate-100"} transition-colors`}>
            <ArrowLeft className={`w-4 h-4 ${sub}`}/>
          </button>
          <div className="w-7 h-7 rounded-xl overflow-hidden"><img src={LOGO} className="w-full h-full object-cover" alt=""/></div>
          <div>
            <p className={`text-sm font-bold ${text}`}>Web Voice Chatbot</p>
            <p className={`text-[10px] ${sub}`}>Configure, test & embed</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setDark(d=>!d)} className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark?"hover:bg-white/5":"hover:bg-slate-100"}`}>
            {dark ? <Sun className="w-4 h-4 text-amber-400"/> : <Moon className="w-4 h-4 text-slate-600"/>}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className={`flex gap-1 p-1 rounded-xl w-fit mb-6 ${dark?"bg-white/5":"bg-slate-100"}`}>
          {[["chat","Live Chat"],["config","Configure"],["embed","Embed Code"]].map(([id,label])=>(
            <button key={id} onClick={()=>setTab(id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tab===id ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow" : `${sub} hover:text-current`}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Chat tab */}
        {tab === "chat" && (
          <div className={`max-w-2xl rounded-3xl border overflow-hidden ${card}`}>
            <div className={`flex items-center justify-between px-5 py-3 border-b ${dark?"border-white/5":"border-slate-100"}`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white"/>
                </div>
                <div>
                  <p className={`text-xs font-bold ${text}`}>{config.botName}</p>
                  <p className="text-[10px] text-emerald-400">● Online</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button className={`w-7 h-7 rounded-lg flex items-center justify-center ${dark?"bg-white/5":"bg-slate-100"}`} onClick={()=>setListening(l=>!l)}>
                  {listening ? <MicOff className="w-3.5 h-3.5 text-red-400"/> : <Mic className="w-3.5 h-3.5 text-cyan-400"/>}
                </button>
              </div>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((m,i)=>(
                <div key={i} className={`flex gap-2 ${m.role==="user"?"justify-end":""}`}>
                  {m.role==="assistant" && <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5"><Bot className="w-3 h-3 text-white"/></div>}
                  <div className={`max-w-xs rounded-2xl px-3 py-2 text-sm ${m.role==="user" ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white rounded-tr-sm" : `${dark?"bg-white/5 text-slate-300":"bg-slate-100 text-slate-700"} rounded-tl-sm`}`}>
                    {m.content}
                  </div>
                  {m.role==="user" && <div className="w-6 h-6 rounded-full bg-slate-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><User className="w-3 h-3 text-slate-400"/></div>}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center flex-shrink-0"><Bot className="w-3 h-3 text-white"/></div>
                  <div className={`px-4 py-2 rounded-2xl rounded-tl-sm text-xs ${dark?"bg-white/5":"bg-slate-100"}`}>
                    <span className="flex gap-1">{[0,1,2].map(i=><span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef}/>
            </div>
            <div className={`px-4 py-3 border-t ${dark?"border-white/5":"border-slate-100"}`}>
              <form onSubmit={e=>{e.preventDefault();sendMsg(input);}} className={`flex gap-2 rounded-xl border px-3 py-2 ${dark?"border-white/10 bg-white/5":"border-slate-200 bg-slate-50"}`}>
                <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message to test your bot..."
                  className={`flex-1 text-sm bg-transparent outline-none ${text} placeholder-slate-600`}/>
                <button type="submit" disabled={loading || !input.trim()}
                  className="w-7 h-7 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 flex items-center justify-center disabled:opacity-50">
                  <Send className="w-3.5 h-3.5 text-white"/>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Config tab */}
        {tab === "config" && (
          <div className={`max-w-xl space-y-4`}>
            {[
              { label: "Bot Name", key: "botName", type: "text", placeholder: "e.g. Sree, Alex, Aria" },
              { label: "Greeting Message", key: "greeting", type: "text", placeholder: "Hi! How can I help?" },
            ].map(f=>(
              <div key={f.key} className={`rounded-2xl border p-5 ${card}`}>
                <label className={`block text-xs font-medium mb-2 ${sub}`}>{f.label}</label>
                <input type={f.type} value={config[f.key]} onChange={e=>setConfig(p=>({...p,[f.key]:e.target.value}))}
                  placeholder={f.placeholder}
                  className={`w-full h-10 px-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 ${dark?"border-white/10 bg-white/5 text-white":"border-slate-200 bg-white text-slate-900"}`}/>
              </div>
            ))}
            <div className={`rounded-2xl border p-5 ${card}`}>
              <label className={`block text-xs font-medium mb-2 ${sub}`}>Language</label>
              <select value={config.language} onChange={e=>setConfig(p=>({...p,language:e.target.value}))}
                className={`w-full h-10 px-3 rounded-xl border text-sm focus:outline-none ${dark?"border-white/10 bg-white/5 text-white":"border-slate-200 bg-white text-slate-900"}`}>
                <option value="en">English</option><option value="hi">Hindi</option>
                <option value="es">Spanish</option><option value="fr">French</option>
                <option value="ar">Arabic</option><option value="te">Telugu</option>
                <option value="ta">Tamil</option><option value="de">German</option>
              </select>
            </div>
            <div className={`rounded-2xl border p-5 ${card}`}>
              <label className={`block text-xs font-medium mb-3 ${sub}`}>Widget Position</label>
              <div className="grid grid-cols-2 gap-2">
                {["bottom-right","bottom-left","top-right","top-left"].map(pos=>(
                  <button key={pos} onClick={()=>setConfig(p=>({...p,position:pos}))}
                    className={`py-2.5 rounded-xl border text-xs font-medium transition-all ${config.position===pos ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400" : `${dark?"border-white/10 text-slate-400":"border-slate-200 text-slate-500"}`}`}>
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Embed tab */}
        {tab === "embed" && (
          <div className="max-w-xl space-y-4">
            <div className={`rounded-2xl border p-5 ${card}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-bold text-sm ${text}`}>Embed on your website</h3>
                <button onClick={()=>{navigator.clipboard.writeText(embedCode);setCopied(true);setTimeout(()=>setCopied(false),2000);}}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:opacity-80">
                  {copied ? <><Check className="w-3.5 h-3.5"/>Copied!</> : <><Copy className="w-3.5 h-3.5"/>Copy</>}
                </button>
              </div>
              <pre className={`text-xs p-4 rounded-xl overflow-x-auto font-mono ${dark?"bg-white/5 text-cyan-300":"bg-slate-900 text-cyan-300"}`}>
                {embedCode}
              </pre>
            </div>
            <div className={`rounded-2xl border p-5 ${card}`}>
              <h3 className={`font-bold text-sm mb-3 ${text}`}>Installation instructions</h3>
              {["Paste the script tag just before </body> in your HTML","The widget will appear automatically in the selected position","Users can toggle between text and voice modes","Your bot uses the knowledge base you configured"].map((s,i)=>(
                <div key={i} className={`flex items-start gap-2 py-2 border-b ${dark?"border-white/5":"border-slate-100"} last:border-0`}>
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                  <p className={`text-xs ${sub}`}>{s}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
