
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
import Chat from './components/Chat';
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
          <Chat />
        </div>
      </main>

      <footer className="py-12 bg-white border-t border-slate-100 text-center mt-20 px-6">
 <div className="max-w-4xl mx-auto">
 <h2 className="text-blue-600 text-xl font-extrabold tracking-tight">RumorGuard</h2>
 <p className="text-slate-500 text-sm mt-1 font-medium">Verified Health Intelligence</p>
 </div>
</footer>
    </div>
  );
};

export default App;
