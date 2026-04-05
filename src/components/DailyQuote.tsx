import { useState, useEffect } from "react";
import { RefreshCw, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const quotes = [
  "教育不是灌输，而是点燃火焰。",
  "每一个孩子都是一粒种子，只是花期不同。",
  "懂孩子，是所有教育的开始。",
  "陪伴是最好的教育，也是最长情的告白。",
  "学习不是为了考试，而是为了拥有掌控生活的能力。",
  "元认知是学习的指南针，指引孩子在知识的海洋中不迷路。",
  "故事是触达心灵最快的路径。",
  "没有教不好的孩子，只有没找对的『学习算法』。",
  "激发内在动力，比任何补课都有效。",
  "让优秀成为一种习惯，从每一个小小的复盘开始。",
  "好奇心是学习的引擎，保护它比灌输知识更重要。",
  "失败不是终点，而是通往成功的反馈。",
  "专注力是这个时代的稀缺资源，值得我们悉心呵护。",
  "阅读是站在巨人的肩膀上，看更远的世界。",
  "思维导图不仅是工具，更是大脑的延伸。"
];

const quotesEn = [
  "Education is not the filling of a pail, but the lighting of a fire.",
  "Every child is a seed, just with a different blooming season.",
  "Understanding children is the beginning of all education.",
  "Companionship is the best education and the longest confession of love.",
  "Learning is not for exams, but for the ability to control your life.",
  "Metacognition is the compass of learning, guiding children through knowledge.",
  "Stories are the fastest path to the heart.",
  "There are no unteachable children, only unfound 'learning algorithms'.",
  "Awakening inner motivation is more effective than any tutoring.",
  "Make excellence a habit, starting from every small review.",
  "Curiosity is the engine of learning; protecting it is more important than imparting knowledge.",
  "Failure is not the end, but feedback on the way to success.",
  "Focus is a scarce resource in this era, worthy of our careful protection.",
  "Reading is standing on the shoulders of giants to see a further world.",
  "Mind maps are not just tools, but extensions of the brain."
];

interface DailyQuoteProps {
  lang: "zh" | "en";
  t: any;
}

export default function DailyQuote({ lang, t }: DailyQuoteProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Daily update logic: use current date as seed
    const today = new Date().toDateString();
    const hash = Array.from(today).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    setQuoteIndex(hash % quotes.length);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
      setIsRefreshing(false);
    }, 500);
  };

  const currentQuote = lang === "zh" ? quotes[quoteIndex] : quotesEn[quoteIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto p-10 rounded-[40px] glass relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Quote size={120} className="text-orange-500" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Quote size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.quote.title}</h3>
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-full hover:bg-orange-50 dark:hover:bg-slate-800 text-orange-500 transition-all active:rotate-180"
            title={t.quote.refresh}
          >
            <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={quoteIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="text-2xl lg:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed"
          >
            “{currentQuote}”
          </motion.p>
        </AnimatePresence>
        
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
          <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">— Coach Qi Qi</span>
        </div>
      </div>
    </motion.div>
  );
}
