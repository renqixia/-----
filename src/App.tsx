import { motion, AnimatePresence } from "motion/react";
import { 
  Battery, 
  Zap, 
  AlertTriangle, 
  Rocket, 
  Brain, 
  RefreshCcw, 
  Search, 
  Target, 
  MessageSquare, 
  Clock, 
  GraduationCap, 
  Briefcase, 
  Trophy, 
  ChevronUp,
  Flame,
  CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    childName: "",
    grade: "1",
    parentName: "",
    phone: "",
    description: ""
  });

  const [activeStep, setActiveStep] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Scroll to the appointment section to see the success message
    const element = document.getElementById("appointment");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const coachEmail = "kathuntorikul@gmail.com"; // Using user's email as default or placeholder

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`预约申请：${formData.childName} - ${formData.grade}年级`);
    const body = encodeURIComponent(
      `孩子姓名：${formData.childName}\n` +
      `年级：${formData.grade}年级\n` +
      `家长姓名：${formData.parentName}\n` +
      `联系电话：${formData.phone}\n` +
      `问题描述：${formData.description}`
    );
    window.location.href = `mailto:${coachEmail}?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] selection:bg-orange-200 text-slate-800 font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-dark py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Flame className="text-orange-500 animate-pulse" />
            <span className="rainbow-text">用陪伴点亮成长</span>
          </div>
          <ul className="hidden md:flex gap-8 text-sm font-semibold">
            <li><a href="#challenges" className="text-slate-600 hover:text-orange-600 transition-colors">痛点分析</a></li>
            <li><a href="#strategies" className="text-slate-600 hover:text-orange-600 transition-colors">核心策略</a></li>
            <li><a href="#about" className="text-slate-600 hover:text-orange-600 transition-colors">关于教练</a></li>
          </ul>
          <a href="#appointment" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-200">
            预约诊断
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden liquid-bg-warm">
        <div className="absolute inset-0 bg-white/30 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-100 text-orange-700 text-sm font-bold tracking-wide uppercase">
              用陪伴点亮成长
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8 text-slate-900">
              懂孩子，更懂如何<span className="text-orange-600">赢</span>。<br />
              找回学习掌控感。
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              告别「补课无效」的死循环。我深耕教育领域多年，用专业与实战，为每一次改变保驾护航，陪孩子攻克动力、方法与策略三大难关。
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#appointment" className="bg-orange-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-orange-600 transition-all hover:scale-105 shadow-2xl shadow-orange-200">
                预约免费「学习诊断」
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 glass p-10 rounded-[40px] relative overflow-hidden group"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-200/50 rounded-full blur-3xl group-hover:bg-orange-300/50 transition-all duration-700" />
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900">
              <Trophy className="text-orange-500 w-8 h-8" /> 教练实战成果
            </h3>
            <div className="grid gap-6">
              {[
                { icon: <Battery className="text-green-500" />, title: "动力唤醒", text: "激发内在学习兴趣" },
                { icon: <Zap className="text-amber-500" />, title: "方法优化", text: "掌握高效学习技巧" },
                { icon: <RefreshCcw className="text-blue-500" />, title: "策略迭代", text: "持续优化学习方案" },
                { icon: <CheckCircle2 className="text-orange-500" />, title: "自驱形成", text: "建立终身学习习惯" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-white/60 hover:bg-white transition-all border border-orange-50 shadow-sm"
                >
                  <div className="p-3 bg-white rounded-xl shadow-sm">{item.icon}</div>
                  <div>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section - Metaphors & Stories */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-100 rounded-full blur-2xl opacity-60" />
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-slate-900 leading-tight">
                  擅长用<span className="text-orange-600 italic">隐喻</span>拨开迷雾，<br />
                  把心理学讲成<span className="text-orange-600 italic">故事</span>。
                </h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    我的理念是：教育不应该是枯燥的理论堆砌。我擅长用隐喻的方式，将深奥的心理学和元认知理论转化为孩子能听懂、家长能理解的生动类比。
                  </p>
                  <p>
                    就像拨开清晨的迷雾，我陪孩子一起在故事中发现学习的底层逻辑，让知识点变得通透、易懂且充满趣味。
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-orange-50 border border-orange-100">
                    <p className="text-3xl font-bold text-orange-600 mb-2">类比</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">化繁为简的艺术</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100">
                    <p className="text-3xl font-bold text-amber-600 mb-2">故事</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">触达心灵的桥梁</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 relative">
              <div className="aspect-square rounded-[60px] bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent" />
                </div>
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-center z-10"
                >
                  <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center mx-auto mb-8">
                    <Brain className="w-16 h-16 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">元认知 × 心理学</p>
                  <p className="text-orange-600 font-medium mt-2">用智慧点亮每一个学习瞬间</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="challenges" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">你是否面临这些学习挑战？</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">很多学生和家长都在为这些问题困扰，而我们有科学的解决方案</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Battery className="w-10 h-10" />, title: "动力缺失？", desc: "孩子对学习提不起兴趣，做作业拖延，缺乏内在动力，觉得学习是负担" },
              { icon: <Zap className="w-10 h-10" />, title: "效率低下？", desc: "孩子学习时间长但效果差，方法不当，知识点掌握不牢，容易遗忘" },
              { icon: <AlertTriangle className="w-10 h-10" />, title: "考试焦虑？", desc: "孩子一到考试就紧张，发挥失常，平时会做的题考试时想不起来" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -12 }}
                className="p-10 rounded-[32px] bg-[#fdfbf7] border border-orange-100 shadow-xl shadow-orange-100/20"
              >
                <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-8">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-5 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metaphor Gallery Section */}
      <section className="py-32 bg-orange-50/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">隐喻小课堂</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">用孩子听得懂的语言，拆解复杂的学习难题</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "学习就像「盖大楼」", 
                metaphor: "地基（底层逻辑）不牢，上面的楼层（知识点）盖得越高越危险。",
                insight: "我们不急着盖楼，先带孩子把地基打扎实。"
              },
              { 
                title: "大脑是「图书馆」", 
                metaphor: "如果书乱堆乱放（死记硬背），想找的时候（考试）就永远找不到。",
                insight: "我教孩子如何建立高效的索引系统，让知识随取随用。"
              },
              { 
                title: "动力是「发动机」", 
                metaphor: "外力推车（补课）很累，只有点燃发动机（内在动力），车才能跑得远。",
                insight: "唤醒孩子的自驱力，才是解决问题的终极方案。"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-[32px] border border-orange-100 shadow-xl shadow-orange-100/10 relative group"
              >
                <div className="absolute top-6 right-8 text-4xl opacity-10 group-hover:opacity-20 transition-opacity font-serif italic">“</div>
                <h3 className="text-xl font-bold mb-4 text-orange-600">{item.title}</h3>
                <p className="text-slate-700 mb-6 italic leading-relaxed">“{item.metaphor}”</p>
                <div className="pt-6 border-t border-orange-50">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">教练洞察</p>
                  <p className="text-slate-600">{item.insight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section id="strategies" className="py-32 relative overflow-hidden bg-orange-50/30">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">核心策略</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">基于脑科学和元认知理论，我们为每个学生定制个性化学习方案</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: <Rocket className="w-12 h-12" />, 
                title: "A. 动力唤醒", 
                desc: "解决「不想学」的问题，通过元认知策略发现内在动力，建立成就感",
                features: ["兴趣引导法", "目标分解术", "正向反馈系统"]
              },
              { 
                icon: <Brain className="w-12 h-12" />, 
                title: "B. 认知建模", 
                desc: "解决「不会学」的问题，建立知识体系，掌握高效学习方法",
                features: ["思维导图法", "费曼学习法", "记忆宫殿法"]
              },
              { 
                icon: <RefreshCcw className="w-12 h-12" />, 
                title: "C. 策略复盘", 
                desc: "解决「考不好」的问题，分析考试得失，优化应试策略",
                features: ["错题分析系统", "考试策略优化", "心态调整方法"]
              },
            ].map((item, i) => (
              <div key={i} className="glass p-10 rounded-[40px] group hover:bg-white transition-all shadow-2xl shadow-orange-100/50">
                <div className="w-24 h-24 bg-orange-500 rounded-3xl flex items-center justify-center text-white mb-10 shadow-xl shadow-orange-200 group-hover:rotate-6 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold mb-6 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 mb-10 text-lg leading-relaxed">{item.desc}</p>
                <ul className="space-y-4">
                  {item.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-4 text-slate-700 font-medium">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden liquid-bg-warm">
        <div className="absolute inset-0 bg-white/50 pointer-events-none" />
        
        {/* Floating Warm Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-[150px] animate-pulse pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-10 leading-tight text-slate-900">
                  我是2个孩子的妈妈，职业教师，<br />
                  更是懂心理、重实操的<span className="text-orange-600">学习教练</span>。
                </h2>
                
                <div className="space-y-10">
                  <div className="relative pl-8 border-l-4 border-orange-500">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">敏锐洞察与专业底蕴</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      深耕儿童心理学与发展儿童纪律教育，拥有敏锐的洞察力，能一眼看透孩子行为背后的心理需求。我将强大的逻辑能力与亲和力结合，建立起与孩子深度连接的桥梁。
                    </p>
                  </div>
                  <div className="relative pl-8 border-l-4 border-orange-300">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">实战派教练技术</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      深耕欢效体系近5年，将体系化教练技术融入教育实践。我深信：没有教不好的孩子，只有没找对的「学习算法」。
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    {[
                      { icon: <Search />, text: "敏锐的洞察力" },
                      { icon: <Target />, text: "强大的逻辑力" },
                      { icon: <MessageSquare />, text: "极强的亲和力" },
                      { icon: <Brain />, text: "儿童心理学背景" },
                      { icon: <CheckCircle2 />, text: "纪律教育实操" },
                      { icon: <Clock />, text: "高效表达协作" },
                    ].map((skill, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-orange-50">
                        <span className="text-orange-500">{skill.icon}</span>
                        <span className="text-base font-bold text-slate-700">{skill.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex-1 w-full max-w-xl">
              <div className="rainbow-border p-1.5 rounded-[48px]">
                <div className="glass p-10 rounded-[46px]">
                  <div className="relative mb-10 aspect-[4/5] overflow-hidden rounded-[32px] group shadow-2xl transition-all duration-500 hover:shadow-orange-200/60 hover:-translate-y-2">
                    <img 
                      src="qiyi-coach.jpg" 
                      alt="Qi Qi Coach" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://picsum.photos/seed/coach/800/1000";
                        target.onerror = null;
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-40" />
                    
                    <div className="absolute bottom-8 left-8">
                      <p className="text-3xl font-black text-slate-900 tracking-tight">祁祁教练</p>
                      <p className="text-orange-600 font-bold text-lg">2娃妈妈 · 学习力教练</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    {[
                      { icon: <GraduationCap />, title: "教育背景", desc: "职业教师 | 中科院认证心理咨询师 | 青少年演讲教练" },
                      { icon: <Briefcase />, title: "工作经验", desc: "12年教育从业经历 | 资深阅读推广人 | 书房主理人" },
                      { icon: <Trophy />, title: "专业认证", desc: "欢效体系教练 | 学习力指导师" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-lg">{item.title}</p>
                          <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-12 bg-orange-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-200">
                    预约实战派教练
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process Section - Professionalism */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">陪伴式成长路径</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">从发现问题到解决问题，我们每一步都走得扎实、科学</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Progress Bar Background */}
              <div className="absolute top-8 left-0 w-full h-1 bg-orange-100 hidden lg:block" />
              
              {/* Animated Progress Bar Fill */}
              <motion.div 
                className="absolute top-8 left-0 h-1 bg-orange-500 hidden lg:block z-10"
                initial={{ width: "0%" }}
                animate={{ width: `${(activeStep / 4) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              
              <div className="grid lg:grid-cols-5 gap-8 relative z-20">
                {[
                  { step: "01", title: "免费诊断", desc: "15分钟初步沟通，精准定位学习卡点" },
                  { step: "02", title: "深度测评", desc: "多维度评估元认知能力与心理状态" },
                  { step: "03", title: "方案定制", desc: "基于测评结果，制定个性化提升路径" },
                  { step: "04", title: "教练实操", desc: "1对1深度陪伴，在实操中习得能力" },
                  { step: "05", title: "复盘迭代", desc: "定期复盘效果，持续优化学习算法" },
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveStep(i)}
                    className="flex flex-col items-center text-center group focus:outline-none"
                  >
                    <motion.div 
                      animate={{ 
                        scale: activeStep === i ? 1.1 : 1,
                        backgroundColor: activeStep >= i ? "#f97316" : "#ffffff",
                        color: activeStep >= i ? "#ffffff" : "#f97316",
                        borderColor: activeStep >= i ? "#f97316" : "#fed7aa"
                      }}
                      className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-black mb-6 transition-colors duration-300 shadow-xl ${
                        activeStep === i ? "shadow-orange-200 ring-4 ring-orange-100" : "shadow-orange-50"
                      }`}
                    >
                      {activeStep > i ? <CheckCircle2 className="w-8 h-8" /> : item.step}
                    </motion.div>
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      activeStep === i ? "text-orange-600" : "text-slate-900"
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed px-4 transition-colors duration-300 ${
                      activeStep === i ? "text-slate-700 font-medium" : "text-slate-500"
                    }`}>
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Step Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-16 p-8 lg:p-12 bg-orange-50/50 rounded-[40px] border border-orange-100 flex flex-col lg:flex-row items-center gap-10"
              >
                <div className="w-full lg:w-1/3 aspect-video lg:aspect-square bg-white rounded-3xl overflow-hidden shadow-inner flex items-center justify-center p-8">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-orange-500"
                  >
                    {[
                      <MessageSquare className="w-24 h-24" />,
                      <Search className="w-24 h-24" />,
                      <Target className="w-24 h-24" />,
                      <Brain className="w-24 h-24" />,
                      <RefreshCcw className="w-24 h-24" />
                    ][activeStep]}
                  </motion.div>
                </div>
                <div className="flex-1">
                  <div className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-bold mb-4 uppercase tracking-widest">
                    Step {activeStep + 1}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">
                    {[
                      "免费诊断：开启改变的第一步",
                      "深度测评：看见冰山下的真相",
                      "方案定制：专属你的成长地图",
                      "教练实操：从知道到做到的跨越",
                      "复盘迭代：让优秀成为一种习惯"
                    ][activeStep]}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {[
                      "通过15分钟的深度沟通，祁祁教练将帮助您梳理孩子目前的学习现状，精准识别导致学习动力不足或效率低下的核心卡点。这不是推销，而是一次真正意义上的专业诊断。",
                      "利用专业的心理学量表和元认知评估工具，我们从动力系统、能力系统和策略系统三个维度，全面剖析孩子的认知偏好、情绪模式和学习习惯，找到问题的根源。",
                      "拒绝千篇一律的模板。基于测评报告，我们为您定制包含学习目标、策略工具、心理建设在内的全方位提升方案，确保每一步都有据可依，每一个目标都触手可及。",
                      "在真实的学习场景中，教练通过1对1的陪伴式引导，带孩子实操元认知工具。我们不只是教知识，更是教孩子如何观察自己的思维，如何调整自己的状态，从而获得掌控感。",
                      "学习是一个动态优化的过程。我们建立定期的复盘机制，根据孩子的反馈和进步情况，不断微调学习策略，确保孩子在持续的成功体验中，将高效学习内化为本能。"
                    ][activeStep]}
                  </p>
                  <button 
                    onClick={() => {
                      const element = document.getElementById("appointment");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
                  >
                    立即预约此环节
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Building Trust */}
      <section className="py-32 bg-orange-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">学员与家长反馈</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">每一个真实的改变，都是对“陪伴”最好的诠释</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                quote: "以前觉得心理学很深奥，祁祁教练用一个‘图书馆’的隐喻就让我家孩子明白了为什么复习很重要。现在孩子主动性强多了。",
                author: "王女士",
                role: "5年级学生家长"
              },
              { 
                quote: "教练的洞察力真的惊人，她能一眼看出孩子拖延背后的焦虑，而不是简单地责怪。这种被‘看见’的感觉对孩子太重要了。",
                author: "李先生",
                role: "初二学生家长"
              },
              { 
                quote: "从‘要我学’到‘我要学’，这个转变只用了两个月。教练的逻辑非常清晰，给出的策略非常具有实操性。",
                author: "张同学",
                role: "初三学生"
              }
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-[32px] border border-white shadow-xl shadow-orange-100/20">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-orange-400 text-xl">★</span>)}
                </div>
                <p className="text-slate-700 mb-8 italic leading-relaxed">“{item.quote}”</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center font-bold text-orange-700">
                    {item.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{item.author}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment" className="py-32 relative bg-white">
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">开启孩子的学习逆袭之旅</h2>
            <p className="text-lg text-slate-500">预约15分钟免费「学习诊断」，让我们一起为孩子制定个性化的学习提升方案</p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="glass p-10 lg:p-16 rounded-[40px] shadow-2xl shadow-orange-100/50 border border-orange-100" 
                    onSubmit={handleSubmit}
                  >
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">孩子姓名</label>
                        <input 
                          type="text" 
                          name="childName"
                          value={formData.childName}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-orange-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" 
                          placeholder="请输入孩子姓名" 
                          required 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">年级</label>
                        <select 
                          name="grade"
                          value={formData.grade}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-orange-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all appearance-none"
                        >
                          {[1,2,3,4,5,6,7,8,9].map(n => (
                            <option key={n} value={n}>{n}年级</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">家长姓名</label>
                        <input 
                          type="text" 
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-orange-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" 
                          placeholder="请输入家长姓名" 
                          required 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">联系电话</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-orange-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" 
                          placeholder="请输入联系电话" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-12">
                      <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">学习问题描述</label>
                      <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-orange-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all min-h-[150px]" 
                        placeholder="请简要描述孩子面临的学习问题"
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-5 rounded-2xl font-bold text-xl hover:scale-[1.02] transition-all shadow-2xl shadow-orange-200">
                      提交预约申请
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass p-10 lg:p-16 rounded-[40px] shadow-2xl shadow-orange-100/50 border border-orange-100 text-center"
                  >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold mb-6 text-slate-900">预约申请已提交！</h3>
                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                      为了确保教练能第一时间收到您的详细信息，<br />
                      <span className="font-bold text-orange-600">请点击下方按钮</span>，将您的预约信息直接发送至教练邮箱。
                    </p>
                    
                    <div className="bg-orange-50 p-6 rounded-2xl mb-10 text-left border border-orange-100">
                      <p className="text-sm font-bold text-orange-800 mb-2 uppercase tracking-wider">待发送信息摘要：</p>
                      <div className="text-slate-700 space-y-1 text-sm">
                        <p>孩子：{formData.childName} ({formData.grade}年级)</p>
                        <p>家长：{formData.parentName}</p>
                        <p>电话：{formData.phone}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={handleSendEmail}
                        className="w-full bg-orange-500 text-white py-5 rounded-2xl font-bold text-xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-3"
                      >
                        <MessageSquare className="w-6 h-6" />
                        立即发送邮件给教练
                      </button>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-slate-400 hover:text-orange-500 font-medium transition-colors"
                      >
                        返回修改信息
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="lg:col-span-2 space-y-8">
              <div className="glass p-8 rounded-[32px] border border-orange-100">
                <h4 className="text-xl font-bold mb-6 text-slate-900">为什么选择「学习诊断」？</h4>
                <ul className="space-y-6">
                  {[
                    "精准定位：找出学习卡点的底层逻辑",
                    "科学评估：基于元认知能力的深度评估",
                    "定制方案：初步规划个性化提升路径",
                    "专业答疑：针对性解答家长的教育困惑"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-slate-600 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-orange-500 p-8 rounded-[32px] text-white shadow-xl shadow-orange-200">
                <p className="text-sm font-bold uppercase tracking-widest mb-4 opacity-80">直接联系</p>
                <p className="text-3xl font-bold mb-2">18171065688</p>
                <p className="opacity-90">微信同步，添加请备注「学习诊断」</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-orange-100 bg-[#fdfbf7]">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-3xl font-bold text-slate-900">
              <Flame className="text-orange-500 w-10 h-10" />
              <span>用陪伴点亮成长</span>
            </div>
            <p className="text-lg text-slate-500 leading-relaxed">深耕教育，用专业与实战，为每一次改变保驾护航。让学习成为孩子一生的竞争力。</p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-8 text-slate-900">快速导航</h4>
            <ul className="space-y-5 text-slate-500 font-medium">
              <li><a href="#challenges" className="hover:text-orange-600 transition-colors">痛点分析</a></li>
              <li><a href="#strategies" className="hover:text-orange-600 transition-colors">核心策略</a></li>
              <li><a href="#about" className="hover:text-orange-600 transition-colors">关于教练</a></li>
              <li><a href="#appointment" className="hover:text-orange-600 transition-colors">预约诊断</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-8 text-slate-900">联系我们</h4>
            <ul className="space-y-5 text-slate-500 font-medium">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">📞</div>
                18171065688
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">📱</div>
                微信：18171065688
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">📍</div>
                用陪伴点亮成长
              </li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto px-6 mt-24 pt-10 border-t border-orange-100/50 text-center text-slate-400 font-medium">
          <p>© 2026 用陪伴点亮成长 | 祁祁教练 | 版权所有</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50"
      >
        <ChevronUp className="w-8 h-8" />
      </motion.button>
    </div>
  );
}
