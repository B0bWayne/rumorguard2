
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { RumorReport, RumorCategory, RumorStatus } from '../types';
import { DISTRICTS } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface DashboardProps {
  rumors: RumorReport[];
}

const Dashboard: React.FC<DashboardProps> = ({ rumors }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const districtStats = DISTRICTS.map(d => {
    const regionalRumors = rumors.filter(r => r.district === d);
    const avgRisk = regionalRumors.length ? Math.round(regionalRumors.reduce((acc, curr) => acc + curr.riskScore, 0) / regionalRumors.length) : 0;
    
    const themes = regionalRumors.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topTheme = Object.entries(themes).sort((a, b) => (b[1] as number) - (a[1] as number))[0]?.[0] || 'Stable';

    return { name: d, count: regionalRumors.length, avgRisk, topTheme };
  }).filter(d => d.count > 0 || d.name === 'Kampala' || d.name === 'Wakiso');

  const categoryData = Object.values(RumorCategory).map(cat => ({
    name: cat,
    value: rumors.filter(r => r.category === cat).length
  }));

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

  const generateAIInsight = async (district: string) => {
    setIsAnalyzing(true);
    const districtRumors = rumors.filter(r => r.district === district).map(r => r.content).join('; ');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Act as a senior epidemiologist. Analyze these rumors from the ${district} district in Uganda: "${districtRumors || 'No specific rumors reported, district is stable'}". Provide a one-sentence strategic recommendation for health workers in this area.`,
      });
      setAiInsight(response.text || "Regional stability detected. Continue standard surveillance.");
    } catch (e) {
      setAiInsight("Unable to connect to AI surveillance grid. Check API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRegionClick = (name: string) => {
    setSelectedRegion(name);
    setAiInsight(null);
    generateAIInsight(name);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 px-4">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-12">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight italic">Strategic Command</h1>
          <p className="text-slate-500 mt-4 text-xl font-medium">Real-time geospatial health misinformation intelligence.</p>
        </div>
        <div className="flex gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm text-center min-w-[160px]">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Reports (24h)</p>
            <p className="text-4xl font-black text-blue-600">+{rumors.length}</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl text-center min-w-[160px]">
            <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-2">Global Risk</p>
            <p className="text-4xl font-black tracking-tight uppercase italic">Elevated</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* INTERACTIVE UGANDA HEATMAP */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl relative overflow-hidden h-[650px] flex flex-col">
            <div className="flex justify-between items-center mb-10 relative z-10">
               <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Regional Hotspots</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Live Misinformation Concentration</p>
               </div>
               <div className="flex gap-4">
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500"><span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-200"></span> High Risk</span>
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-500"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Stable Node</span>
               </div>
            </div>

            <div className="flex-1 relative bg-slate-50/50 rounded-[3rem] border border-slate-100 overflow-hidden group">
               {/* Uganda SVG Map Representation */}
               <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none transition-opacity group-hover:opacity-[0.08]">
                  <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] fill-slate-900">
                    <path d="M40,5 Q60,0 80,15 T95,45 Q100,75 75,95 T30,100 Q0,85 5,45 T40,5" />
                  </svg>
               </div>

               {/* Interactive Hotspot Nodes */}
               {districtStats.map((d) => {
                 const hash = d.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                 const top = 25 + (hash % 50);
                 const left = 25 + ((hash * 9) % 50);

                 return (
                   <div 
                    key={d.name}
                    className="absolute cursor-pointer transition-all hover:scale-150 group/node z-20"
                    style={{ top: `${top}%`, left: `${left}%` }}
                    onClick={() => handleRegionClick(d.name)}
                   >
                     {/* The Heat Aura */}
                     <div className={`absolute -inset-10 rounded-full blur-2xl opacity-20 animate-pulse duration-[3000ms] ${d.avgRisk > 70 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                     
                     {/* The Interaction Point */}
                     <div className={`relative w-8 h-8 rounded-full border-[6px] border-white shadow-2xl transition-all ${d.avgRisk > 70 ? 'bg-red-600 scale-110' : 'bg-blue-600'}`}>
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white px-5 py-2.5 rounded-2xl shadow-2xl border border-slate-100 opacity-0 group-hover/node:opacity-100 transition-all whitespace-nowrap z-50 translate-y-2 group-hover/node:translate-y-0">
                           <p className="text-[11px] font-black text-slate-900 uppercase leading-none mb-1">{d.name}</p>
                           <p className="text-[9px] font-bold text-red-500 uppercase">{d.topTheme} Cluster</p>
                        </div>
                     </div>
                   </div>
                 );
               })}

               {/* Emerging Themes Legend */}
               <div className="absolute bottom-8 left-8 max-w-[240px] space-y-4 pointer-events-none">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Regional Surveillance Log</p>
                  {districtStats.slice(0, 2).map(d => (
                    <div key={d.name} className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-slate-100 shadow-xl animate-in fade-in duration-1000">
                       <p className="text-xs font-black text-slate-900">{d.name} Node</p>
                       <p className="text-[10px] font-bold text-red-500 uppercase mt-1">Emerging {d.topTheme} Trends</p>
                    </div>
                  ))}
               </div>
            </div>
            
            {/* Selected District Profile + AI Insight */}
            {selectedRegion && (
              <div className="mt-8 p-8 bg-slate-900 rounded-[3rem] text-white animate-in slide-in-from-bottom-6 duration-500 shadow-2xl">
                 <div className="flex justify-between items-center mb-6">
                    <h4 className="text-2xl font-black italic">{selectedRegion} Intelligence</h4>
                    <button onClick={() => setSelectedRegion(null)} className="text-white/30 hover:text-white text-xl p-2 transition-colors">✕</button>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                       <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Local Risk Score</p>
                       <p className="text-xl font-black">+{districtStats.find(d => d.name === selectedRegion)?.avgRisk}% Level</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                       <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Surveillance</p>
                       <p className="text-sm font-bold text-green-400 tracking-widest">ACTIVE</p>
                    </div>
                 </div>

                 {/* Gemini AI Summary */}
                 <div className="bg-blue-600/20 p-6 rounded-3xl border border-blue-500/30 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-2 text-blue-400">
                       <span className="text-lg">✨</span>
                       <span className="text-[10px] font-black uppercase tracking-widest">Gemini AI Command Narrative</span>
                    </div>
                    {isAnalyzing ? (
                      <div className="h-6 w-3/4 bg-blue-400/20 animate-pulse rounded-full"></div>
                    ) : (
                      <p className="text-sm font-medium leading-relaxed italic opacity-90">"{aiInsight}"</p>
                    )}
                    <div className="absolute -right-8 -bottom-8 text-8xl opacity-[0.03] rotate-12 pointer-events-none">🛡️</div>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR ANALYTICS */}
        <div className="space-y-12">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
               <p className="text-[11px] font-black uppercase tracking-widest opacity-60">National Reach</p>
               <h3 className="text-7xl font-black mt-4 tracking-tighter">14.2k</h3>
               <p className="text-base font-medium mt-6 leading-relaxed">Health-seekers shielded from health myths via RumorGuard.</p>
               <div className="mt-12 h-2.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-2/3 animate-pulse"></div>
               </div>
            </div>
            <div className="absolute -right-12 -bottom-12 text-[15rem] opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000">🛡️</div>
          </div>

          <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm">
             <h3 className="text-2xl font-black text-slate-900 mb-10 italic text-center">Topic Distribution</h3>
             <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)'}}
                        itemStyle={{fontWeight: 800, fontSize: '10px', textTransform: 'uppercase'}}
                      />
                   </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-8 grid grid-cols-2 gap-4">
                {categoryData.map((cat, i) => (
                  <div key={cat.name} className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{cat.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
