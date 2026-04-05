import { Sun, Moon, Type, Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SettingsPanelProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  fontSize: "standard" | "large" | "extra";
  setFontSize: (size: "standard" | "large" | "extra") => void;
  lang: "zh" | "en";
  setLang: (lang: "zh" | "en") => void;
  t: any;
}

export default function SettingsPanel({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  lang,
  setLang,
  t
}: SettingsPanelProps) {
  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-4">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-orange-500 hover:scale-110 transition-all shadow-xl shadow-orange-100/20 active:rotate-180"
        title={t.settings.theme}
      >
        {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Font Size Toggle */}
      <div className="relative group">
        <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-orange-500 hover:scale-110 transition-all shadow-xl shadow-orange-100/20">
          <Type size={20} />
        </button>
        <div className="absolute right-14 top-0 hidden group-hover:flex flex-col gap-2 p-3 glass rounded-2xl min-w-[120px] shadow-2xl">
          {[
            { id: "standard", label: t.settings.standard },
            { id: "large", label: t.settings.large },
            { id: "extra", label: t.settings.extra }
          ].map((size) => (
            <button
              key={size.id}
              onClick={() => setFontSize(size.id as any)}
              className={`flex items-center justify-between px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                fontSize === size.id 
                  ? "bg-orange-500 text-white" 
                  : "text-slate-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-800"
              }`}
            >
              {size.label}
              {fontSize === size.id && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Language Toggle */}
      <button
        onClick={() => setLang(lang === "zh" ? "en" : "zh")}
        className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-orange-500 hover:scale-110 transition-all shadow-xl shadow-orange-100/20 font-black text-xs"
        title={t.settings.language}
      >
        <Globe size={20} className="mr-0.5" />
        {lang === "zh" ? "EN" : "中"}
      </button>
    </div>
  );
}
