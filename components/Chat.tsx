import React, { useState } from 'react';

const Chat = () => {
const [input, setInput] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [messages, setMessages] = useState([
{ role: 'assistant', content: 'Hello! I am RumorGuard. Enter a health rumor you have heard, and I will verify it for you.' }
]);

const handleSend = async () => {
if (!input.trim() || isLoading) return;

const userMessage = { role: 'user', content: input };
setMessages(prev => [...prev, userMessage]);
setInput('');
setIsLoading(true);

try {
const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
contents: [{ parts: [{ text: `You are RumorGuard Uganda. Verify this health rumor: ${input}` }] }]
})
});

const data = await response.json();
const aiResponse = data.candidates[0].content.parts[0].text;
setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
} catch (error) {
setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Check your settings!' }]);
} finally {
setIsLoading(false);
}
};

return (
<div className="max-w-2xl mx-auto my-10 p-4 md:p-6 bg-white rounded-3xl shadow-2xl border border-blue-50 overflow-hidden">
<div className="h-[450px] overflow-y-auto mb-4 space-y-4 p-2 scroll-smooth">
{messages.map((msg, i) => (
<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
<div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
msg.role === 'user'
? 'bg-blue-600 text-white rounded-br-none'
: 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
}`}>
<p className="text-sm md:text-base leading-relaxed">{msg.content}</p>
</div>
</div>
))}
{isLoading && (
<div className="flex justify-start animate-pulse">
<div className="bg-slate-100 p-4 rounded-2xl rounded-bl-none border border-slate-200">
<div className="flex gap-1">
<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
</div>
</div>
</div>
)}
</div>

<div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
<input
value={input}
onChange={(e) => setInput(e.target.value)}
onKeyPress={(e) => e.key === 'Enter' && handleSend()}
placeholder="Ask about a health rumor..."
className="flex-1 bg-transparent px-3 py-2 outline-none text-slate-700"
/>
<button
onClick={handleSend}
disabled={isLoading}
className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold transition-all disabled:opacity-50 active:scale-95"
>
{isLoading ? '...' : 'Verify'}
</button>
</div>
</div>
);
};

export default Chat;
