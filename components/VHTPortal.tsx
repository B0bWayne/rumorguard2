
import React from 'react';
import { MOCK_VHTS } from '../constants';
import { RumorReport, RumorStatus } from '../types';

interface VHTPortalProps {
  rumors: RumorReport[];
}

const VHTPortal: React.FC<VHTPortalProps> = ({ rumors }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 px-4">
      {/* 1. HUNTER PROFILE (DUOLINGO STYLE) */}
      <div className="bg-slate-900 p-12 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
          <div className="flex items-center gap-10">
            <div className="relative">
               <div className="w-28 h-28 bg-blue-600 rounded-[3rem] flex items-center justify-center text-6xl shadow-2xl shadow-blue-500/40 relative z-10 transition-transform group-hover:scale-110">
                 🏹
               </div>
               <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black z-20 shadow-lg">LVL 12</div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <span className="bg-blue-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Master Commander</span>
                 <span className="text-slate-500 text-xs font-bold italic">Top 10 in Uganda</span>
              </div>
              <h2 className="text-5xl font-black tracking-tight mb-2">Mugisha John</h2>
              <p className="text-slate-400 font-medium">District Node: <span className="text-blue-400 font-black">Wakiso Central</span></p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-white/10 text-center min-w-[240px] shadow-2xl">
               <p className="text-[11px] font-black uppercase text-blue-400 mb-2 tracking-widest">Active Bounty</p>
               <p className="text-7xl font-black tracking-tighter">450</p>
               <p className="text-[10px] font-bold mt-3 text-slate-500">UGX 12,500 Equivalent</p>
            </div>
            <button className="mt-6 text-blue-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors underline">View Wallet History →</button>
          </div>
        </div>
        <div className="absolute -left-20 -top-20 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* 2. ACHIEVEMENT BADGES */}
          <div className="space-y-8">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-slate-900 italic">Hunter Badges</h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">7/12 Unlocked</span>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { name: 'Slayer', icon: '⚔️', progress: 80, desc: 'Rumor Buster' },
                  { name: 'Guardian', icon: '🛡️', progress: 100, desc: 'Truth Shield' },
                  { name: 'Oracle', icon: '🔮', progress: 45, desc: 'Early Finder' },
                  { name: 'Ghost', icon: '👤', progress: 10, desc: 'Deep Web Intel' }
                ].map(b => (
                  <div key={b.name} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all">
                    <div className="text-4xl mb-4 grayscale group-hover:grayscale-0">{b.icon}</div>
                    <p className="font-black text-xs uppercase mb-3">{b.name}</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mb-2 overflow-hidden">
                       <div className="h-full bg-blue-600 rounded-full" style={{ width: `${b.progress}%` }}></div>
                    </div>
                    <p className="text-[9px] text-slate-400 font-black uppercase">{b.progress}%</p>
                  </div>
                ))}
             </div>
          </div>

          {/* 3. THE BOUNTY STORE (MARKETPLACE) */}
          <div className="space-y-8">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-3xl font-black text-slate-900 italic">The Bounty Store</h3>
                <div className="flex gap-2">
                   <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Limited Stock</span>
                </div>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                {[
                  { title: 'MTN Airtime', value: '1,000 UGX', pts: '150', icon: '📶', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
                  { title: 'Airtel Data', value: '500MB Data', pts: '250', icon: '🌐', color: 'bg-red-50', textColor: 'text-red-700' },
                  { title: 'Clinic Pass', value: 'Free Checkup', pts: '900', icon: '🩺', color: 'bg-blue-50', textColor: 'text-blue-700' },
                  { title: 'Solar Light', value: 'Parish Gear', pts: '5,000', icon: '💡', color: 'bg-green-50', textColor: 'text-green-700' },
                  { title: 'MTN Data', value: '2GB Bundle', pts: '1,200', icon: '📶', color: 'bg-yellow-50', textColor: 'text-yellow-700' },
                  { title: 'Truth Jacket', value: 'Hunter Merch', pts: '10,000', icon: '👕', color: 'bg-slate-50', textColor: 'text-slate-700' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-600 transition-all cursor-pointer hover:shadow-2xl">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-4xl shadow-sm transition-transform group-hover:rotate-12`}>
                        {item.icon}
                      </div>
                      <div>
                         <p className="font-black text-slate-900 text-xl">{item.title}</p>
                         <p className={`text-[11px] font-black uppercase tracking-widest ${item.textColor}`}>{item.value}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-blue-600 text-2xl tracking-tighter">{item.pts}</p>
                       <p className="text-[10px] font-black text-slate-300 uppercase">Points</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* 4. GUILD LEADERBOARD & RECRUITMENT */}
        <div className="space-y-12">
           <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm">
             <h3 className="text-xl font-black text-slate-900 mb-10 italic flex items-center gap-3">
               <span className="text-2xl">🏆</span> Regional Guild
             </h3>
             <div className="space-y-8">
               {MOCK_VHTS.sort((a,b) => b.points - a.points).map((vht, idx) => (
                 <div key={vht.id} className="flex items-center justify-between">
                   <div className="flex items-center gap-5">
                     <span className={`text-2xl font-black ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-slate-300' : 'text-slate-100'}`}>
                       #{idx + 1}
                     </span>
                     <div>
                       <p className="font-black text-slate-900 text-base leading-none mb-2">{vht.name}</p>
                       <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{vht.parish} Parish</p>
                     </div>
                   </div>
                   <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                     <p className="font-black text-slate-400 text-sm">{vht.points}</p>
                   </div>
                 </div>
               ))}
             </div>
             <button className="w-full mt-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                Global Ranking →
             </button>
           </div>

           {/* RECRUITMENT NUDGE */}
           <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
              <h4 className="text-3xl font-black mb-6 relative z-10 leading-tight">Crush Myths.<br/>Earn Rewards.</h4>
              <p className="text-base opacity-80 mb-10 relative z-10 leading-relaxed font-medium">Protect your village from health misinformation. Register as a VHT or Youth Reporter today.</p>
              <button className="w-full py-5 bg-white text-blue-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all relative z-10 shadow-2xl">
                 Apply for Hunter ID ⚔️
              </button>
              <div className="absolute -right-10 top-0 text-[12rem] opacity-5 rotate-12 group-hover:rotate-0 transition-transform">🛰️</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VHTPortal;
