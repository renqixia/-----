import { useState, useEffect } from "react";
import { Send, User, MessageSquare, AlertCircle, Clock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  nickname: string;
  content: string;
  timestamp: number;
}

interface MessageBoardProps {
  lang: "zh" | "en";
  t: any;
}

const SENSITIVE_WORDS = ["脏话", "广告", "恶意", "badword", "spam"]; // Mock list

export default function MessageBoard({ lang, t }: MessageBoardProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  useEffect(() => {
    // Load messages from localStorage for persistence
    const saved = localStorage.getItem("coach_messages");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse messages:", e);
      }
    }
  }, []);

  const saveMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem("coach_messages", JSON.stringify(newMessages));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Frequency limit: 60s
    const now = Date.now();
    if (now - lastSubmitTime < 60000) {
      setError(t.messages.tooFrequent);
      return;
    }

    // Length limits
    if (content.trim().length < 5) {
      setError(t.messages.tooShort);
      return;
    }
    if (content.trim().length > 200) {
      setError(t.messages.tooLong);
      return;
    }

    // Sensitive words filter
    const hasSensitive = SENSITIVE_WORDS.some(word => 
      content.toLowerCase().includes(word.toLowerCase()) || 
      nickname.toLowerCase().includes(word.toLowerCase())
    );
    if (hasSensitive) {
      setError(t.messages.sensitive);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        nickname: nickname || (lang === "zh" ? "匿名访客" : "Anonymous"),
        content: content.trim(),
        timestamp: Date.now(),
      };

      const updatedMessages = [newMessage, ...messages];
      saveMessages(updatedMessages);
      
      setNickname("");
      setContent("");
      setLastSubmitTime(Date.now());
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto p-10 rounded-[40px] glass border border-orange-100 shadow-2xl shadow-orange-100/20">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-200">
          <MessageSquare size={24} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t.messages.title}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <User size={14} /> {t.messages.nickname}
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={t.messages.namePlaceholder}
              className="w-full bg-white dark:bg-slate-800 border border-orange-100 dark:border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare size={14} /> {t.messages.content}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t.messages.placeholder}
            className="w-full bg-white dark:bg-slate-800 border border-orange-100 dark:border-slate-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all min-h-[120px] text-slate-900 dark:text-white"
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold border border-red-100"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-orange-500 text-white py-5 rounded-2xl font-bold text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-3 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
          }`}
        >
          {isSubmitting ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            <Send size={24} />
          )}
          {t.messages.submit}
        </button>
      </form>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-orange-50 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-slate-700 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">
                    {msg.nickname[0].toUpperCase()}
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{msg.nickname}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Clock size={12} />
                  {new Date(msg.timestamp).toLocaleString(lang === "zh" ? "zh-CN" : "en-US")}
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg pl-13">
                {msg.content}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
