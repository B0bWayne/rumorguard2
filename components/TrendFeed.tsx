import React, { useState } from 'react';
import { RumorReport, RumorStatus, ReportSource, RumorCategory } from '../types';
import { allQuestionsFlat } from '../data/quizData'; // Connected to your new vault

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

// Scoring & Gamification States
const [totalPoints, setTotalPoints] = useState(0);
const [streak, setStreak] = useState(0);

const handleNextQuiz = () => {
// Add points if correct
if (quizAnswer === allQuestionsFlat[quizIndex].isFact) {
setTotalPoints(prev => prev + 20);
setStreak(prev => prev + 1);
} else {
setStreak(0); // Reset streak on mistake
}

setQuizAnswer(null);
// Pick a random next question
setQuizIndex(Math.floor(Math.random() * allQuestionsFlat.length));
};

return (
<div className="max-w-3xl mx-auto space-y-6 pb-20 px-4">
{/* Category Scroller */}
<div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar scrollbar-hide">
{['All', ...Object.values(RumorCategory)].map((cat) => (
<button
key={cat}
onClick={() => setActiveCategory(cat as any)}
className={`whitespace-nowrap px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'
}`}
>
{cat}
</button>
))}
</div>

{/* GAMIFIED QUEST CARD */}
<div className="relative bg-[#0B1221] p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] text-white shadow-2xl border border-blue-900/30 overflow-hidden text-center animate-float">

{/* Streak Badge Logic */}
{streak >= 3 && (
<div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-[9px] font-black px-4 py-1.5 rounded-full animate-bounce z-20 shadow-xl uppercase">
{streak} Streak! {streak >= 5 ? '🔥 No Pressure!' : '🚀 On Fire!'}
</div>
)}

<div className="relative z-10">
<div className="flex justify-between items-center mb-6">
<span className="text-[9px] font-black bg-blue-600/30 border border-blue-500/50 px-3 py-1 rounded-full uppercase">Mission</span>
<div className="flex items-center gap-1.5 text-yellow-400 text-xs font-black">
<span className="text-lg">⭐</span> {totalPoints} PTS
</div>
</div>

<h3 className="text-xl md:text-3xl font-black mb-10 leading-tight italic px-2">
"{allQuestionsFlat[quizIndex].question}"
</h3>

<div className="grid grid-cols-2 gap-4">
<button
onClick={() => setQuizAnswer(false)}
disabled={quizAnswer !== null}
className={`py-4 md:py-6 rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all active:scale-95 border-2 ${
quizAnswer === false
? (allQuestionsFlat[quizIndex].isFact ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-green-500/20 border-green-600 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]')
: 'bg-white/5 border-white/10'
}`}
>
Myth
</button>
<button
onClick={() => setQuizAnswer(true)}
disabled={quizAnswer !== null}
className={`py-4 md:py-6 rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all active:scale-95 border-2 ${
quizAnswer === true
? (allQuestionsFlat[quizIndex].isFact ? 'bg-green-500/20 border-green-600 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-red-500/20 border-red-500 text-red-400')
: 'bg-white/5 border-white/10'
}`}
>
Fact
</button>
</div>

{quizAnswer !== null && (
<div className="mt-6 p-6 bg-white/5 rounded-[2.5rem] border border-white/10 animate-in slide-in-from-bottom-4">
<p className={`text-sm font-black mb-2 ${quizAnswer === allQuestionsFlat[quizIndex].isFact ? 'text-green-400' : 'text-yellow-400'}`}>
{quizAnswer === allQuestionsFlat[quizIndex].isFact ? '🎯 +20 POINTS!' : '💡 TRUTH REVEALED:'}
</p>
<p className="text-[11px] md:text-xs opacity-80 leading-relaxed italic mb-5">{allQuestionsFlat[quizIndex].explain}</p>
<button
onClick={handleNextQuiz}
className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg transition-colors"
>
Next Mission →
</button>
</div>
)}
</div>
</div>

{/* ... The rest of your Rumor Feed code goes here (Intelligence Pulse, etc) ... */}
</div>
);
};

export default TrendFeed;
