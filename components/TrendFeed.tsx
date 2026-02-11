import React, { useState, useMemo } from 'react';
import { RumorReport, RumorStatus, ReportSource, RumorCategory } from '../types';
import { allQuestionsFlat, healthQuizBank } from '../src/data/quizData';

interface TrendFeedProps {
rumors: RumorReport[];
isAdmin: boolean;
onUpdate?: (rumor: RumorReport) => void;
}

const TrendFeed: React.FC<TrendFeedProps> = ({ rumors, isAdmin, onUpdate }) => {
const [activeCategory, setActiveCategory] = useState<RumorCategory | 'All'>('All');
const [selectedTheme, setSelectedTheme] = useState<string | 'All'>('All');
const [quizAnswer, setQuizAnswer] = useState<boolean | null>(null);
const [quizIndex, setQuizIndex] = useState(0);
const [totalPoints, setTotalPoints] = useState(0);
const [streak, setStreak] = useState(0);

// Determine which question bank to use based on selection
const currentBank = useMemo(() => {
return selectedTheme === 'All' ? allQuestionsFlat : healthQuizBank[selectedTheme];
}, [selectedTheme]);

const handleNextQuiz = () => {
// Points logic
if (quizAnswer === currentBank[quizIndex].isFact) {
setTotalPoints(prev => prev + 20);
setStreak(prev => prev + 1);
} else {
setStreak(0);
}

setQuizAnswer(null);
// Move to a random question in the current bank
setQuizIndex(Math.floor(Math.random() * currentBank.length));
};

return (
<div className="max-w-3xl mx-auto space-y-6 pb-20 px-4">

{/* THEME SELECTOR MENU */}
<div className="flex gap-2 overflow-x-auto py-2 no-scrollbar scrollbar-hide">
{['All', ...Object.keys(healthQuizBank)].map((theme) => (
<button
key={theme}
onClick={() => {
setSelectedTheme(theme);
setQuizIndex(0);
setQuizAnswer(null);
setStreak(0);
}}
className={`whitespace-nowrap px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
selectedTheme === theme
? 'bg-blue-600 text-white shadow-lg'
: 'bg-white text-slate-400 border border-slate-100'
}`}
>
{theme}
</button>
))}
</div>

{/* GAMIFIED QUEST CARD */}
<div className="relative bg-[#0B1221] p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] text-white shadow-2xl border border-blue-900/30 overflow-hidden text-center">

{/* Streak & Badge Logic */}
{streak >= 3 && (
<div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-[9px] font-black px-4 py-1.5 rounded-full animate-bounce z-20">
{streak >= 10 ? '🏆 THEME MASTER!' : `${streak} STREAK! 🔥`}
</div>
)}

<div className="relative z-10">
<div className="flex justify-between items-center mb-6">
<div className="flex flex-col items-start text-left">
<span className="text-[9px] font-black bg-blue-600/30 border border-blue-500/50 px-3 py-1 rounded-full uppercase mb-1">Mission</span>
<span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">
{selectedTheme === 'All' ? 'Daily Quest' : `${selectedTheme}: ${streak}/10`}
</span>
</div>
<div className="flex items-center gap-1.5 text-yellow-400 text-xs font-black">
<span className="text-lg">⭐</span> {totalPoints} PTS
</div>
</div>

<h3 className="text-xl md:text-3xl font-black mb-10 leading-tight italic px-2">
"{currentBank[quizIndex]?.question}"
</h3>

<div className="grid grid-cols-2 gap-4">
<button
onClick={() => setQuizAnswer(false)}
disabled={quizAnswer !== null}
className={`py-4 md:py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border-2 ${
quizAnswer === false
? (currentBank[quizIndex].isFact ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-green-500/20 border-green-600 text-green-400')
: 'bg-white/5 border-white/10'
}`}
>
Myth
</button>
<button
onClick={() => setQuizAnswer(true)}
disabled={quizAnswer !== null}
className={`py-4 md:py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border-2 ${
quizAnswer === true
? (currentBank[quizIndex].isFact ? 'bg-green-500/20 border-green-600 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400')
: 'bg-white/5 border-white/10'
}`}
>
Fact
</button>
</div>

{quizAnswer !== null && (
<div className="mt-6 p-6 bg-white/5 rounded-[2.5rem] border border-white/10 animate-in fade-in zoom-in">
<p className={`text-sm font-black mb-2 ${quizAnswer === currentBank[quizIndex].isFact ? 'text-green-400' : 'text-yellow-400'}`}>
{quizAnswer === currentBank[quizIndex].isFact ? '🎯 +20 POINTS!' : '💡 THE TRUTH:'}
</p>
<p className="text-[11px] md:text-xs opacity-80 leading-relaxed italic mb-5">{currentBank[quizIndex].explain}</p>
<button
onClick={handleNextQuiz}
className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-[10px] uppercase tracking-widest"
>
Next Mission →
</button>
</div>
)}
</div>
</div>

{/* RUMOR FEED LOGIC */}
<div className="space-y-4">
{rumors
.filter(r => activeCategory === 'All' || r.category === activeCategory)
.map((rumor) => (
<div key={rumor.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
<div className="flex items-center justify-between mb-2">
<span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${
rumor.status === RumorStatus.FACT ? 'bg-green-100 text-green-700' :
rumor.status === RumorStatus.MYTH ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
}`}>
{rumor.status}
</span>
<span className="text-[9px] text-slate-400 font-bold">{rumor.category}</span>
</div>
<p className="text-sm font-bold text-slate-800 mb-1">{rumor.claim}</p>
</div>
))}
</div>
</div>
);
};

export default TrendFeed;
