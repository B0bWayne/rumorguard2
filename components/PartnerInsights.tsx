
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { RumorReport, RumorCategory } from '../types';

interface PartnerInsightsProps {
  rumors: RumorReport[];
}

const PartnerInsights: React.FC<PartnerInsightsProps> = ({ rumors }) => {
  const isPro = false;

  const categoryData = Object.values(RumorCategory).map(cat => ({
    name: cat,
    volume: rumors.filter(r => r.category === cat).length * 150,
  }));

  const trendData = [
    { day: 'Mon', volume: 400 },
    { day: 'Tue', volume: 700 },
    { day: 'Wed', volume: 1200 },
    { day: 'Thu', volume: 900 },
    { day: 'Fri', volume: 1500 },
    { day: 'Sat', volume: 1800 },
    { day: 'Sun', volume: 2100 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 px-4">
      {/* Hero: Strategic Vision */}
      <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Partner Portal v1.0</div>
            <h2 className="text-5xl font-black leading-tight tracking-tight">The Data Behind the Truth</h2>
            <p className="text-slate-400 mt-6 text-xl leading-relaxed">Mapping health sentiment across Uganda to protect vaccine rollouts and disease response budgets.</p>
            <div className="mt-10 flex flex-wrap gap-4">
               <button className="bg-blue-600 px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">Access Data API</button>
               <button className="bg-white/10 px-8 py-4 rounded-2xl font-black text-sm border border-white/10 backdrop-blur-md">Download Q1 Report</button>
            </div>
          </div>
          <div className="space-y-4">
             <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
                <h4 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-6">Monetization Pillars</h4>
                <div className="grid gap-6">
                   <div className="flex gap-4">
                      <span className="text-2xl">📊</span>
                      <div>
                         <p className="font-bold">Intelligence Subscriptions</p>
                         <p className="text-xs text-slate-400">NGOs pay for granular regional trend reports.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-2xl">🎟️</span>
                      <div>
                         <p className="font-bold">Redemption Commissions</p>
                         <p className="text-xs text-slate-400">Businesses pay for foot traffic via reward claims.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <span className="text-2xl">💉</span>
                      <div>
                         <p className="font-bold">Verification as a Service</p>
                         <p className="text-xs text-slate-400">Custom fact-checking pipelines for specific clinical trials.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
        <div className="absolute -right-24 -bottom-24 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Launch Roadmap (The "What to do" section) */}
      <div className="bg-blue-50 border-2 border-blue-100 p-10 rounded-[3rem]">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
               <h3 className="text-2xl font-black text-blue-900">Deployment Roadmap</h3>
               <p className="text-blue-700/60 font-medium">From Prototype to National System.</p>
            </div>
            <div className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest animate-pulse">
               Current Status: Pilot Ready
            </div>
         </div>
         <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Web Launch', status: 'READY', desc: 'Deploy frontend to Vercel/Netlify for immediate stakeholder demos.', active: true },
              { step: '02', title: 'SMS Bridge', status: 'PENDING', desc: 'Acquire Shortcode (8008) via Africa\'s Talking or SMSOne.', active: false },
              { step: '03', title: 'Data Pipeline', status: 'PENDING', desc: 'Connect to a backend database (Supabase) to store permanent records.', active: false },
              { step: '04', title: 'Pilot Parish', status: 'PLANNED', desc: 'Roll out to 10 VHTs in Wakiso district for first field test.', active: false }
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${item.active ? 'bg-white border-blue-200 shadow-lg' : 'bg-blue-100/30 border-blue-100 opacity-60'}`}>
                <p className="text-blue-600 font-black text-sm mb-2">{item.step}</p>
                <h4 className="font-black text-blue-900 mb-2">{item.title}</h4>
                <p className="text-[10px] text-blue-700/70 font-medium leading-relaxed">{item.desc}</p>
                <div className="mt-4 inline-block bg-blue-50 px-2 py-1 rounded text-[8px] font-black text-blue-600 tracking-widest">{item.status}</div>
              </div>
            ))}
         </div>
      </div>

      {/* Real-time Analytics Preview */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
               <h3 className="text-2xl font-black text-slate-900">Viral Load Trends</h3>
               <p className="text-slate-400 text-sm mt-1">Daily rumor volume across digital & SMS channels.</p>
            </div>
            <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 border border-slate-100 uppercase tracking-widest">Live: 7 Days</div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'}}
                />
                <Line type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={4} dot={{r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[2.5rem] text-white flex flex-col justify-between shadow-2xl shadow-blue-200">
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Revenue Target</p>
              <h3 className="text-3xl font-black mt-2">$25,000 /yr</h3>
              <p className="text-sm mt-4 opacity-80 leading-relaxed">Estimated ARR from Phase 1 partner integrations (6 NGOs, 12 Pharmacy Chains).</p>
           </div>
           <div className="space-y-4">
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                 <div className="h-full bg-white w-1/3"></div>
              </div>
              <p className="text-xs font-bold">35% of Q1 funding goal reached</p>
           </div>
           <button className="w-full bg-white text-blue-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">Download Deck</button>
        </div>
      </div>
    </div>
  );
};

export default PartnerInsights;
