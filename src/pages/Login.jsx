import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Loader2, Eye, EyeOff, Mail, Lock, ArrowLeft, UserPlus, CheckCircle, Moon, Sun } from "lucide-react";

const LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b24a5bac54e3067972063/2e8a22a03_AevoiceLogo.JPG";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/Dashboard";
  const [dark, setDark] = useState(true);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    const token = localStorage.getItem("base44_access_token");
    if (token) navigate(from, { replace: true });
  }, [dark]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setMsg("");
    try {
      if (mode === "login") {
        await base44.auth.login({ email: form.email, password: form.password });
        navigate(from, { replace: true });
      } else if (mode === "signup") {
        await base44.auth.signup({ email: form.email, password: form.password, full_name: form.name });
        navigate("/Pricing", { replace: true });
      } else {
        try { await base44.auth.sendPasswordResetEmail({ email: form.email }); }
        catch { try { await base44.auth.forgotPassword({ email: form.email }); }
          catch { await fetch("https://app.base44.com/api/auth/forgot-password", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email })
          }); }
        }
        setMsg("If that email exists, a reset link has been sent. Check your inbox.");
      }
    } catch (err) {
      setError(err?.message || err?.error || "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  };

  const bg   = dark ? "bg-[#050a14]" : "bg-[#f8faff]";
  const text = dark ? "text-white" : "text-slate-900";
  const sub  = dark ? "text-slate-500" : "text-slate-500";
  const inp  = dark
    ? "border-white/10 bg-white/[0.04] text-white placeholder-slate-600 focus:ring-cyan-500/50 focus:border-cyan-500/50"
    : "border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-cyan-500/30 focus:border-cyan-400";

  return (
    <div className={`min-h-screen ${bg} flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300`}>
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl"/>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl"/>
      </div>

      {/* Theme toggle */}
      <button onClick={()=>setDark(d=>!d)}
        className={`absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${dark?"bg-white/5 hover:bg-white/10":"bg-slate-100 hover:bg-slate-200"}`}>
        {dark ? <Sun className="w-4 h-4 text-amber-400"/> : <Moon className="w-4 h-4 text-slate-600"/>}
      </button>

      <div className="w-full max-w-sm relative z-10">
        <button onClick={() => navigate("/Home")}
          className={`flex items-center gap-1.5 text-xs mb-8 transition-colors ${sub} hover:${text}`}>
          <ArrowLeft className="w-3.5 h-3.5"/> Back to Home
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className={`w-16 h-16 rounded-2xl overflow-hidden border mb-4 shadow-2xl shadow-cyan-500/20 ${dark?"border-white/10":"border-slate-200"}`}>
            <img src={LOGO} alt="Aevothon" className="w-full h-full object-cover" onError={e=>e.target.style.display="none"}/>
          </div>
          <h1 className={`text-2xl font-black ${text}`}>
            {mode === "login" ? "Welcome back" : mode === "signup" ? "Create account" : "Forgot password?"}
          </h1>
          <p className={`text-sm mt-1 ${sub}`}>AEVOTHON · aevothon.aevoice.ai</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label className={`text-xs font-medium ${sub}`}>Full Name</label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600"/>
                <input type="text" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}
                  placeholder="Your full name" required
                  className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${inp}`}/>
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <label className={`text-xs font-medium ${sub}`}>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600"/>
              <input type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}
                placeholder="you@company.com" required
                className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${inp}`}/>
            </div>
          </div>
          {mode !== "reset" && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className={`text-xs font-medium ${sub}`}>Password</label>
                {mode === "login" && (
                  <button type="button" onClick={()=>setMode("reset")} className="text-xs text-cyan-500 hover:opacity-80 transition-opacity">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600"/>
                <input type={show?"text":"password"} value={form.password}
                  onChange={e=>setForm(p=>({...p,password:e.target.value}))}
                  placeholder="••••••••" required minLength={8}
                  className={`w-full h-11 pl-10 pr-10 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${inp}`}/>
                <button type="button" onClick={()=>setShow(s=>!s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                  {show ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>
          )}
          {error && <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2.5 rounded-xl"><span className="mt-0.5">⚠</span>{error}</div>}
          {msg   && <div className="flex items-start gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2.5 rounded-xl"><CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"/>{msg}</div>}

          <button type="submit" disabled={loading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all mt-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin"/>Working…</> :
              mode === "login" ? "Sign In →" : mode === "signup" ? "Create Account →" : "Send Reset Link"}
          </button>
        </form>

        <div className={`mt-5 text-center text-xs ${sub}`}>
          {mode === "login" ? (
            <>Don't have an account?{" "}<button onClick={()=>setMode("signup")} className="text-cyan-500 hover:opacity-80 font-medium">Sign up free</button></>
          ) : mode === "signup" ? (
            <>Already have an account?{" "}<button onClick={()=>setMode("login")} className="text-cyan-500 hover:opacity-80 font-medium">Sign in</button></>
          ) : (
            <button onClick={()=>setMode("login")} className="text-cyan-500 hover:opacity-80">← Back to sign in</button>
          )}
        </div>

        {/* Step indicator */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {["Home","Login","Plan","Dashboard"].map((step,i)=>(
            <div key={step} className="flex items-center gap-1.5">
              <div className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full ${
                step==="Login" ? "bg-cyan-500/20 text-white border border-cyan-500/30" :
                i<1 ? "text-cyan-500/60" : `${sub}`
              }`}>
                {i<1 ? <CheckCircle className="w-3 h-3 text-cyan-500/60"/> :
                  <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px]">{i+1}</span>}
                {step}
              </div>
              {i<3 && <span className={dark?"text-slate-800":"text-slate-300"}>›</span>}
            </div>
          ))}
        </div>
        <p className={`text-center text-[10px] mt-5 ${dark?"text-slate-700":"text-slate-400"}`}>Part of AEVOICE.AI — The ultimate business technology.</p>
      </div>
    </div>
  );
}
