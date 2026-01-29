
import React, { useState } from 'react';
import { RumorCategory, ReportSource, RumorStatus, RumorReport } from '../types';
import { analyzeRumor } from '../services/geminiService';
import { DISTRICTS } from '../constants';

interface ReportFormProps {
  onAddRumor: (rumor: RumorReport) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onAddRumor }) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<RumorCategory>(RumorCategory.OTHER);
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [mode, setMode] = useState<'report' | 'verify'>('report');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    const analysis = await analyzeRumor(content);
    setAiAnalysis(analysis);

    if (mode === 'report') {
      const newRumor: RumorReport = {
        id: Math.random().toString(36).substr(2, 9),
        content,
        category: analysis?.category || category,
        location: district,
        district,
        status: analysis?.status || RumorStatus.UNCLEAR,
        source: ReportSource.APP,
        timestamp: new Date().toISOString(),
        riskScore: analysis?.riskScore || 50,
        isVerified: !!analysis?.explainer,
        explainer: analysis?.explainer
      };
      onAddRumor(newRumor);
    }
    
    setIsSubmitting(false);
    if (mode === 'report') setContent('');
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
          <button 
            onClick={() => {setMode('report'); setAiAnalysis(null);}}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'report' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
          >
            App Report
          </button>
          <button 
            onClick={() => {setMode('verify'); setAiAnalysis(null);}}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'verify' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
          >
            Verify Text
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 leading-tight">
            {mode === 'report' ? 'Stop the Spread' : 'Check the Facts'}
          </h2>
          <div className="mt-3 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              {mode === 'report' ? 'Connected to National Registry' : 'AI Analysis Ready'}
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all min-h-[160px] text-lg outline-none"
              placeholder={mode === 'report' ? "What did you hear? (e.g. In Gulu they say the nets...)" : "Paste the message you received..."}
              required
            />
            {content.length === 0 && (
              <div className="absolute bottom-6 right-6 text-[10px] font-black text-slate-300 uppercase tracking-widest pointer-events-none">
                Local language supported
              </div>
            )}
          </div>

          {mode === 'report' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Health Topic</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as RumorCategory)}
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:border-blue-400"
                >
                  {Object.values(RumorCategory).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Location (District)</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:border-blue-400"
                >
                  {DISTRICTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl ${
              mode === 'report' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100' : 'bg-green-600 hover:bg-green-700 text-white shadow-green-100'
            }`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : mode === 'report' ? 'Submit Intelligence' : 'Verify Now'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Village Reporting Enabled</p>
           <p className="text-slate-900 text-xs mt-2 font-bold">Offline? Tell them to SMS to <span className="text-blue-600">8008</span> (Free)</p>
        </div>

        {aiAnalysis && (
          <div className={`mt-8 p-8 rounded-[2.5rem] animate-in zoom-in-95 duration-500 border-2 ${
            aiAnalysis.status === 'harmful' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'
          }`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className={`font-black text-xl flex items-center gap-3 ${aiAnalysis.status === 'harmful' ? 'text-red-900' : 'text-blue-900'}`}>
                <span>{aiAnalysis.status === 'harmful' ? '⚠️ DANGER' : '🔍 ANALYSIS'}</span>
              </h3>
              <div className="bg-white/50 px-3 py-1 rounded-full text-[10px] font-black text-slate-600 border border-white/50">
                 RISK: {aiAnalysis.riskScore}%
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Expert Fact-Check</p>
                <p className="text-slate-900 text-sm leading-relaxed font-bold">{aiAnalysis.explainer}</p>
              </div>
              
              <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Omulamwa (Luganda)</p>
                <p className="text-slate-800 text-sm italic font-medium leading-relaxed">{aiAnalysis.translation}</p>
              </div>

              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
                 <span>📲</span> Share truth to WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportForm;
