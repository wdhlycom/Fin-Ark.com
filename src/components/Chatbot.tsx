import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useLang } from '../LangContext';

type Msg = { role: 'bot' | 'user'; text: string };

export default function Chatbot() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([{ role: 'bot', text: t.chatbot.greeting }]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  // reset greeting when language changes
  useEffect(() => {
    setMessages([{ role: 'bot', text: t.chatbot.greeting }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.chatbot.greeting]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const reply = t.chatbot.reply;
    setMessages((m) => [...m, { role: 'user', text }, { role: 'bot', text: reply }]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-semibold shadow-2xl hover:shadow-gold-glow transition-all animate-pulse-gold"
        aria-label={t.chatbot.label}
      >
        <Sparkles className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">{t.chatbot.label}</span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[calc(100vh-8rem)] rounded-2xl border border-slate-700/60 bg-navy-900/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-navy-950/60">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gold-500/15 border border-gold-500/40">
                <MessageSquare className="w-4 h-4 text-gold-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{t.chatbot.title}</div>
                <div className="text-[11px] text-slate-400">{t.chatbot.subtitle}</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gold-500 text-navy-950 rounded-br-sm'
                      : 'bg-navy-800 text-slate-200 rounded-bl-sm border border-slate-700/40'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pt-2 flex flex-wrap gap-2">
            {[t.chatbot.suggestion1, t.chatbot.suggestion2, t.chatbot.suggestion3].map((s, i) => (
              <button
                key={i}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-700/60 text-slate-300 hover:border-gold-500/50 hover:text-gold-300 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 p-4 border-t border-slate-700/50"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              className="flex-1 bg-navy-800/60 border border-slate-700/60 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-gold-500/60"
            />
            <button
              type="submit"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gold-500 text-navy-950 hover:bg-gold-400 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
