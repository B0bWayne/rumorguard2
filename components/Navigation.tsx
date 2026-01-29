
import React from 'react';

interface NavigationProps {
  currentView: string;
  setView: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'feed', label: 'Feed', icon: '🔥' },
    { id: 'report', label: 'Report', icon: '🛡️' },
    { id: 'explainers', label: 'Facts', icon: '💡' },
    { id: 'vht', label: 'Rewards', icon: '🎁' },
    { id: 'partner', label: 'Business', icon: '💼' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center md:top-0 md:bottom-auto md:border-t-0 md:border-b md:h-16 z-50">
      <div className="hidden md:flex items-center gap-2 mr-auto px-4 font-bold text-xl text-blue-600">
        🛡️ RumorGuard
      </div>
      <div className="flex w-full md:w-auto justify-around gap-2 md:gap-8">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1 rounded-xl transition-all ${
              currentView === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="text-xl md:text-base">{item.icon}</span>
            <span className="text-[10px] md:text-sm font-bold uppercase tracking-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
