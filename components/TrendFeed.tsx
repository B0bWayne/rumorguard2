
import React, { useState } from 'react';
import { RumorReport, RumorStatus, ReportSource, RumorCategory } from '../types';

interface TrendFeedProps {
  rumors: RumorReport[];
  isAdmin: boolean;
  onUpdate?: (rumor: RumorReport) => void;
}

const TrendFeed: React.FC<TrendFeedProps> = ({ rumors, isAdmin, onUpdate }) => {
  const [activeCategory, setActiveCategory] = useState<RumorCategory | 'All'>('All');
  const [pulseMode, setPulseMode] = useState<'Community' | 'Social Radar'>('Community');
  const [quizAnswer, setQuizAnswer] = useState<boolean | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);

  const quizzes = [
    { question: "Does drinking lemon water cure HIV if taken three times a day?", isFact: false, explain: "Incorrect. Only ARVs can manage HIV effectively. Lemon water has no effect on the virus." },
    { question: "Can regular consumption of Waragi cure internal parasites?", isFact: false, explain: "Myth! Alcohol is not a medicine for parasites and can cause severe liver damage." },
    { question: "Is the new Malaria vaccine safe for children under 5?", isFact: true, explain: "Correct! The WHO and Uganda MoH have verified it as safe and life-saving." },
    { question: "Does sleeping with an onion on your feet draw out the flu?", isFact: false, explain: "Myth. Onions do not 'draw out' viruses through skin. It is an old wives' tale." }
  ];

  const filteredRumors = rumors.filter(r => {
    const categoryMatch = activeCategory === 'All' || r.category === activeCategory;
    const modeMatch = pulseMode === 'Community' ? r.source !== ReportSource.SOCIAL : r.source === ReportSource.SOCIAL;
    return categoryMatch && modeMatch;
  });

  const getStatusColor = (status: RumorStatus) => {
    switch (status) {
      case RumorStatus.HARMFUL: return 'bg-red-50 text-red-600 border-red-100';
      case RumorStatus.UNCLEAR: return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case RumorStatus.VERIFIED: return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const handleStatusChange = (rumor: RumorReport, newStatus: RumorStatus) => {
    if (onUpdate) onUpdate({ ...rumor, status: newStatus });
  };

  const handleNextQuiz = () => {
    setQuizAnswer(null);
    setQuizIndex((quizIndex + 1) % quizzes.length);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      {/* 1. Category Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar scrollbar-hide">
        {['All', ...Object.values(RumorCategory)].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-slate-400 border border-slate-100 hover:border-blue-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. DUOLINGO STYLE BOUNTY QUEST */}
      <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
         <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black bg-blue-600 px-4 py-1.5 rounded-full uppercase tracking-widest">Daily Quest</span>
                 <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= quizIndex + 1 ? 'bg-blue-400' : 'bg-white/10'}`}></div>
                    ))}
                 </div>
              </div>
              <div className="flex items-center gap-1.5 text-yellow-400 text-[11px] font-black uppercase">
                 <span>⭐</span> +50 BOUNTY
              </div>
            </div>

            <h3 className="text-2xl font-black mb-10 leading-tight italic">"{quizzes[quizIndex].question}"</h3>
            
            <div className="grid grid-cols-2 gap-4">
               <button 
                onClick={() => setQuizAnswer(false)}
                disabled={quizAnswer !== null}
                className={`py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all border-2 ${
                  quizAnswer === false 
                  ? (quizzes[quizIndex].isFact ? 'bg-red-600/20 border-red-600 text-red-400' : 'bg-green-600/20 border-green-600 text-green-400') 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
               >
                 Myth
               </button>
               <button 
                onClick={() => setQuizAnswer(true)}
                disabled={quizAnswer !== null}
                className={`py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all border-2 ${
                  quizAnswer === true 
                  ? (quizzes[quizIndex].isFact ? 'bg-green-600/20 border-green-600 text-green-400' : 'bg-red-600/20 border-red-600 text-red-400') 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
               >
                 Fact
               </button>
            </div>

            {quizAnswer !== null && (
              <div className="mt-8 p-6 bg-white/10 rounded-[2.5rem] animate-in zoom-in-95 duration-300 border border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                   <p className="text-lg font-bold mb-4">
                     {quizAnswer === quizzes[quizIndex].isFact ? '🎯 PERFECT HIT!' : '💡 TRUTH REVEALED:'}
                   </p>
                   <p className="text-sm opacity-80 leading-relaxed italic">{quizzes[quizIndex].explain}</p>
                   <button 
                    onClick={handleNextQuiz}
                    className="mt-6 w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl"
                   >
                     Next Mission →
                   </button>
                </div>
                {quizAnswer === quizzes[quizIndex].isFact && <div className="absolute top-0 right-0 p-4 text-4xl">👑</div>}
              </div>
            )}
         </div>
         <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
      </div>

      {/* 3. Pulse Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4">
         <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">Intelligence Pulse</h2>
         <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto shadow-sm">
            <button 
              onClick={() => setPulseMode('Community')}
              className={`flex-1 sm:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${pulseMode === 'Community' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Community
            </button>
            <button 
              onClick={() => setPulseMode('Social Radar')}
              className={`flex-1 sm:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${pulseMode === 'Social Radar' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Social Radar
            </button>
         </div>
      </div>

      {/* 4. Feed Items */}
      <div className="grid gap-8">
        {pulseMode === 'Social Radar' && (
          <div className="bg-blue-600/5 border-2 border-dashed border-blue-200 p-8 rounded-[3rem] flex items-center gap-6 animate-pulse">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl shadow-blue-100">📡</div>
            <div>
               <span className="text-[10px] font-black text-blue-800 uppercase tracking-widest">Regional Scanner Online</span>
               <p className="text-base font-bold text-blue-700 leading-tight mt-1">Extracting health sentiment from Wakiso Digital Nodes...</p>
            </div>
          </div>
        )}

        {filteredRumors.length > 0 ? filteredRumors.map(rumor => (
          <div key={rumor.id} className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all group relative">
            <div className="flex justify-between items-center mb-8">
               <div className="flex gap-2">
                  {isAdmin ? (
                    <select 
                      value={rumor.status}
                      onChange={(e) => handleStatusChange(rumor, e.target.value as RumorStatus)}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border outline-none cursor-pointer ${getStatusColor(rumor.status)}`}
                    >
                      {Object.values(RumorStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  ) : (
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(rumor.status)}`}>
                      {rumor.status}
                    </span>
                  )}
               </div>
               <div className="flex items-center gap-3">
                  <span className="text-slate-300 text-[9px] font-black uppercase tracking-widest">{rumor.source}</span>
                  <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                  <span className="text-slate-300 text-[9px] font-black">{new Date(rumor.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
               </div>
            </div>

            {editingId === rumor.id && isAdmin ? (
              <div className="mb-8 space-y-4">
                <textarea 
                  autoFocus
                  className="w-full p-8 bg-slate-50 border-2 border-blue-200 rounded-[2.5rem] font-bold text-xl outline-none"
                  value={rumor.content}
                  onChange={(e) => {if(onUpdate) onUpdate({...rumor, content: e.target.value})}}
                />
                <button onClick={() => setEditingId(null)} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Confirm Observation</button>
              </div>
            ) : (
              <div className="flex justify-between items-start mb-8 gap-8">
                <p className="text-slate-900 font-black text-2xl md:text-3xl leading-tight italic">"{rumor.content}"</p>
                {isAdmin && (
                  <button onClick={() => setEditingId(rumor.id)} className="text-slate-200 hover:text-blue-600 transition-all p-3 bg-slate-50 rounded-2xl">✏️</button>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-50 pt-8">
               <span className="flex items-center gap-2"><span className="text-xl">📍</span> {rumor.location}</span>
               <span className="flex items-center gap-2"><span className="text-xl">🏷️</span> {rumor.category}</span>
               <div className="ml-auto bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 flex items-center gap-2">
                  Risk Intensity: <span className={rumor.riskScore > 70 ? 'text-red-600' : 'text-blue-600'}>{rumor.riskScore}</span>
               </div>
            </div>

            {rumor.isVerified && rumor.explainer && (
              <div className="mt-10 p-8 md:p-12 bg-green-50/50 rounded-[3rem] border border-green-100/50 backdrop-blur-sm relative overflow-hidden group/truth">
                <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-6 text-green-700 font-black text-[10px] uppercase tracking-widest">
                      <div className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">🛡️</div>
                      Verified Reality Hub
                   </div>
                   <p className="text-green-900 font-bold text-xl leading-relaxed mb-10 italic">{rumor.explainer}</p>
                   <button 
                     onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent("🚨 TRUTH ALERT: " + rumor.explainer)}`, '_blank')}
                     className="flex items-center gap-4 bg-green-600 text-white px-12 py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-green-700 transition-all shadow-2xl shadow-green-200/50 hover:-translate-y-1"
                   >
                     Blast Truth to WhatsApp 📲
                   </button>
                </div>
                <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-[0.03] text-green-900 pointer-events-none group-hover/truth:scale-110 transition-transform">🛡️</div>
              </div>
            )}
          </div>
        )) : (
          <div className="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
             <div className="text-6xl mb-8 opacity-20">📡</div>
             <p className="text-slate-400 font-black uppercase text-sm tracking-widest">Quiet Sector: No rumors in {activeCategory}</p>
             <button onClick={() => setActiveCategory('All')} className="mt-6 text-blue-600 font-black text-[11px] uppercase underline hover:text-blue-800">Clear Scanner Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendFeed;
