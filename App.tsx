
import React, { useState, useCallback } from 'react';
import { RumorReport } from './types';
import { INITIAL_RUMORS } from './constants';
import Navigation from './components/Navigation';
import TrendFeed from './components/TrendFeed';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';
import ExplainerList from './components/ExplainerList';
import VHTPortal from './components/VHTPortal';
import PartnerInsights from './components/PartnerInsights';

const App: React.FC = () => {
  const [currentView, setView] = useState('feed');
  const [rumors, setRumors] = useState<RumorReport[]>(INITIAL_RUMORS);

  const handleAddRumor = useCallback((newRumor: RumorReport) => {
    setRumors(prev => [newRumor, ...prev]);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'feed': return <TrendFeed rumors={rumors} />;
      case 'report': return <ReportForm onAddRumor={handleAddRumor} />;
      case 'explainers': return <ExplainerList rumors={rumors} />;
      case 'dashboard': return <Dashboard rumors={rumors} />;
      case 'vht': return <VHTPortal rumors={rumors} />;
      case 'partner': return <PartnerInsights rumors={rumors} />;
      default: return <TrendFeed rumors={rumors} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pt-20">
      <Navigation currentView={currentView} setView={setView} />
      
      <header className="px-6 py-8 md:hidden flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-black text-blue-600 tracking-tight">RumorGuard</h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Community Shield</p>
         </div>
         <div className="bg-slate-900 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-black">
            MJ
         </div>
      </header>

      <main className="px-4 py-4 md:py-8 max-w-7xl mx-auto">
        <div className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
          {renderView()}
        </div>
      </main>

      <footer className="py-12 bg-white border-t border-slate-100 text-center mt-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full mb-6 border border-slate-100">
             <span className="w-2 h-2 rounded-full bg-green-500"></span>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Integrity: 99.9% Reliable</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">🛡️ RumorGuard Uganda • Official Health Intelligence Prototype</p>
          <p className="text-[10px] text-slate-300 mt-4 max-w-xl mx-auto leading-relaxed">
            Note: This is a prototype system. Real-time verification is powered by Gemini AI. For official clinical decisions, always consult a registered health professional or the Uganda Ministry of Health (MoH) guidelines.
          </p>
          <div className="flex justify-center gap-8 mt-8 text-[10px] font-black text-slate-400 uppercase">
             <a href="#" className="hover:text-blue-600 transition-colors">Data Ethics</a>
             <a href="#" className="hover:text-blue-600 transition-colors">VHT Registry</a>
             <a href="#" className="hover:text-blue-600 transition-colors">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
