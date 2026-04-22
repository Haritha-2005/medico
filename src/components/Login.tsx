import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Pill, Lock, User, AlertCircle, Sparkles, Lightbulb } from 'lucide-react';

const healthTips = [
  "Stay hydrated! Drink at least 8 glasses of water daily.",
  "A 10-minute walk can significantly boost your energy levels.",
  "Prioritize sleep: 7-9 hours is ideal for most adults.",
  "Remember to take short breaks during long work hours.",
  "Regular hand washing is the first line of defense against germs.",
  "Balanced diets with leafy greens improve long-term health.",
  "Deep breathing exercises can help reduce immediate stress."
];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ing, seting] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [randomTip, setRandomTip] = useState('');
  const { login } = useAuth();

  const handleHoverTip = () => {
    const tip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setRandomTip(tip);
    setShowTip(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    seting(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid credentials. Try admin/password123');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      seting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      {/* Full Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586773860418-d3b979505ce2?auto=format&fit=crop&q=80&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-teal-950/70 to-slate-900/80 backdrop-blur-[2px]" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-md relative z-10 px-6 py-12">
        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-[40px] shadow-2xl p-10 border border-white/20 relative group transition-all duration-500 hover:shadow-teal-500/10 hover:border-white/30">

          {/* Reactive Icon Header */}
          <div className="flex flex-col items-center mb-8 relative">
            <div
              onMouseEnter={handleHoverTip}
              onMouseLeave={() => setShowTip(false)}
              className="relative cursor-help"
            >
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-5 rounded-3xl shadow-xl shadow-teal-500/30 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 active:scale-95">
                <Pill className="w-12 h-12 text-gray-950" />
              </div>

              {/* Health Tip Popover - Repositioned to side to avoid top clipping */}
              {showTip && (
                <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 w-72 p-5 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-teal-100 z-50 animate-in fade-in zoom-in slide-in-from-left-4 duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-teal-50 p-2.5 rounded-xl shadow-inner">
                      <Lightbulb className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-teal-600 mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Health Intel
                      </p>
                      <p className="text-sm font-bold text-slate-800 leading-relaxed italic">"{randomTip}"</p>
                    </div>
                  </div>
                  {/* Arrow Pointing Left */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-white/95" />
                </div>
              )}
            </div>

            <div className="text-center mt-6">
              <h1 className="text-4xl font-black text-white tracking-tight">
                MediTrack <span className="text-teal-400">Pro</span>
              </h1>
              <p className="text-slate-300/60 font-medium text-sm mt-1 uppercase tracking-widest px-4">
                Pharmacy Inventory Intelligence
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300/70 ml-2 uppercase tracking-widest">Identification</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-teal-300 transition-colors group-focus-within/input:text-white" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all outline-none text-white placeholder-slate-400/30"
                  placeholder="Username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300/70 ml-2 uppercase tracking-widest">Security</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-teal-300 transition-colors group-focus-within/input:text-white" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-teal-500/40 focus:border-teal-400 transition-all outline-none text-white placeholder-slate-400/30"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/20 backdrop-blur-md border border-rose-500/30 rounded-2xl p-4 flex items-center gap-3 animate-shake">
                <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <p className="text-sm font-bold text-rose-100">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={ing}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-gray-950 font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-teal-900/30 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {ing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-950/30 border-t-gray-950 rounded-full animate-spin" />
                  <span>Validating...</span>
                </div>
              ) : 'Secure Connect'}
            </button>
          </form>

          {/* New Demo Info Section */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <p className="text-[10px] font-black text-teal-300/50 uppercase tracking-[0.2em]">Quick Access Guide</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 border-b-white/10">
                <p className="text-[9px] font-bold text-teal-200/40 uppercase mb-1">Admin</p>
                <p className="text-[11px] font-black text-white">admin / p123</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 border-b-white/10">
                <p className="text-[9px] font-bold text-slate-200/40 uppercase mb-1">Staff</p>
                <p className="text-[11px] font-black text-white">staff1 / p123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
