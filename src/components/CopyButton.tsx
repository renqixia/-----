import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
}

export default function CopyButton({ text, className = "", label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-slate-800 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-slate-700 transition-all active:scale-95 ${className}`}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <Check size={16} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <Copy size={16} />
          </motion.div>
        )}
      </AnimatePresence>
      {label && <span className="text-sm font-bold">{label}</span>}
      {copied && !label && <span className="text-xs font-bold">已复制</span>}
    </button>
  );
}
