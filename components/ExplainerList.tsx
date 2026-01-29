
import React, { useState } from 'react';
import { RumorReport, RumorCategory } from '../types';

interface ExplainerListProps {
  rumors: RumorReport[];
}

const ExplainerList: React.FC<ExplainerListProps> = ({ rumors }) => {
  const [lang, setLang] = useState<'EN' | 'LG'>('EN');
  const verifiedOnly = rumors.filter(r => r.isVerified);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 px-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900">Fact Library</h2>
          <p className="text-slate-500 mt-2">Verified health information at your fingertips.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
           <button onClick={() => setLang('EN')} className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${lang === 'EN' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>ENGLISH</button>
           <button onClick={() => setLang('LG')} className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${lang === 'LG' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}>LUGANDA</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {verifiedOnly.map(r => (
          <div key={r.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group hover:shadow-xl transition-all duration-300">
            <div className={`h-2 w-full ${r.category === 'HIV' ? 'bg-red-500' : 'bg-green-500'}`} />
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                   {r.category}
                 </span>
                 <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">AI + MoH Verified</span>
                 </div>
              </div>
              
              <div className="mb-6">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 opacity-60">The Rumor</p>
                <p className="text-slate-900 font-bold text-lg leading-snug">"{r.content}"</p>
              </div>

              <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">The Truth</p>
                <p className="text-slate-800 text-sm leading-relaxed">
                  {lang === 'EN' ? r.explainer : "Kino kifu: Obujulizi bwa sayansi bulaga nti kino si kituufu. Abasawo bakitaddeko nti ddala kireeta obulamu..."}
                </p>
              </div>

              <div className="mt-auto space-y-3">
                <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-green-700 shadow-lg shadow-green-100 transition-all">
                   <span className="text-lg">📲</span> Share Fact to WhatsApp
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Listen to Audio</button>
                  <button className="py-3 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Save Image</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-10 text-white flex flex-col justify-center items-center text-center space-y-6 shadow-2xl">
           <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-5xl backdrop-blur-md border border-white/20">📻</div>
           <div>
             <h3 className="text-2xl font-black">Local Radio Spot</h3>
             <p className="text-sm opacity-70 mt-2 leading-relaxed max-w-xs mx-auto">Get a 60-second audio script for your local FM station. Perfect for village megaphone announcements.</p>
           </div>
           <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-xl">
             Download Radio Kit
           </button>
        </div>
      </div>
    </div>
  );
};

export default ExplainerList;
