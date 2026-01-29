import React, { useState } from 'react';

const Chat = () => {
const [input, setInput] = useState('');
const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello! I am RumorGuard. Enter a health rumor you have heard, and I will verify it for you.' }]);

const handleSend = async () => {
if (!input.trim()) return;
const userMessage = { role: 'user', content: input };
setMessages([...messages, userMessage]);
setInput('');

// Here is where it calls the Gemini "Brain" you got from AI Studio
setMessages(prev => [...prev, { role: 'assistant', content: 'Verifying with Health Intelligence...' }]);
};

return (
<div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
<div className="h-80 overflow-y-auto mb-4 space-y-4 p-4">
{messages.map((msg, i) => (
<div key={i} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-50 ml-auto' : 'bg-slate-50 mr-auto'} max-w-[80%]`}>
<p className="text-sm text-slate-700">{msg.content}</p>
</div>
))}
</div>
<div className="flex gap-2">
<input
value={input}
onChange={(e) => setInput(e.target.value)}
className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
placeholder="Type a rumor here..."
/>
<button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Verify</button>
</div>
</div>
);
};

export default Chat;
