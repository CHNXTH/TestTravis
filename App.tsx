
/// <reference lib="dom" />
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroScene } from './components/QuantumScene';
import { SectionTitle, ExperienceCard, AwardItem, PaperItem, SkillSection } from './components/Diagrams';
import { 
  Menu, X, Mail, MapPin, Phone, Github, Globe, Download, 
  Briefcase, Award, BookOpen, MessageSquare, Send, Sparkles, User, Bot, Loader2 
} from 'lucide-react';
import { Language, Content } from './types';
import { GoogleGenAI } from "@google/genai";

// Fix framer-motion type errors by casting motion components to any
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

// --- CONTENT DATA ---
const DATA: Record<Language, Content> = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      awards: "Awards",
      papers: "Research",
      skills: "Skills",
      contact: "Contact"
    },
    hero: {
      role: "AI Product Manager / UX Designer",
      tagline: "Interdisciplinary innovator bridging Architecture, Design, and Artificial Intelligence.",
      availability: "Available for 4–6 months internship",
      contactBtn: "Contact Me",
      downloadBtn: "Resume"
    },
    about: {
      title: "Personal Profile",
      content: "With an interdisciplinary background in architecture, interaction design, and AI, I possess a complete product mindset and hands-on R&D experience. Skilled in user needs analysis, prototyping, and data-driven iteration, and familiar with LLM and multimodal AI applications. I can quickly validate concepts using AIGC tools and drive product features to implementation through user research and data analysis. I also have cross-team collaboration experience and strong learning abilities. I look forward to growing in the AI product direction.",
      info: {
        age: "23",
        location: "Xuhui District, Shanghai",
        email: "chnxth@163.com",
        phone: "15698010160"
      }
    },
    experience: {
      title: "Experience",
      items: [
        {
          company: "NIO Automotive (Shanghai) – Firefly Intelligent Cabin",
          role: "AI Product Manager",
          period: "2025.09 – 2026.02",
          description: "The Firefly project is NIO’s new EV sub-brand for the European market. Developed HMI, entertainment, and multimedia ecosystems.",
          achievements: [
            "Led the functional definition and optimization of the Purple Aster OS.",
            "Designed the QQ Music five-finger gesture shortcut, increasing efficiency by 40%.",
            "Launched the annual report entry page for QQ Music (car version) with 80,000+ visits.",
            "Designed browser agent based on MCP technology and travel-memory agent powered by aesthetic models.",
            "Participated in Xiaomi’s 'Connected Everything' system design."
          ]
        },
        {
          company: "IKEA China – Digital Innovation Center",
          role: "Product Manager & Interaction Designer",
          period: "2025.09 – 2026.02",
          description: "GPC Team. Managed agile workflow across Global Product Collage (GPC) deployed in 31 countries.",
          achievements: [
            "Built AI-driven 2D-to-3D conversion prototype, increasing generation speed by 50%.",
            "Designed AR shopping prototypes for offline stores.",
            "Conducted A/B tests for panoramic module; usage increased by 20%.",
            "Designed object-axis duplication features, reducing misoperation by 100%.",
            "Helped train auto cutout models, improving batch processing by 50%."
          ]
        },
        {
          company: "MataConstruct – Apple Vision Pro Project",
          role: "Project Lead / PM / UX Designer",
          period: "2025.05 – 2025.09",
          description: "Immersive architectural education platform.",
          achievements: [
            "Conducted user research on 80+ students/teachers.",
            "Designed 'three-level learning model' and built 100+ component database.",
            "User testing showed 72% better comprehension and 65% increased interest.",
            "Awarded Second Prize in China Collegiate Computing Competition."
          ]
        },
        {
          company: "Smart Site360 Mini Program",
          role: "Project Lead / PM",
          period: "2024.05 – 2025.05",
          description: "Site analysis tool for architects integrating LLM and GIS.",
          achievements: [
            "Designed mini program integrating multimedia collection with GIS.",
            "Introduced LLM, LDA topic modeling, and CV to reduce bias.",
            "Obtained software copyright and one invention patent (first author)."
          ]
        },
        {
          company: "Shandong Yijie Agricultural Technology Co., Ltd.",
          role: "Co-founder / Product Director",
          period: "2024.05 – 2025.05",
          description: "Rural tourism digital platform.",
          achievements: [
            "Built AI automation agent using n8n for travel recommendations.",
            "Created brand visuals using AIGC tools.",
            "Integrated 720° panorama tours and e-commerce modules."
          ]
        }
      ]
    },
    awards: {
      title: "Honors & Awards",
      items: [
        "2025.09 - Gold Award & Third Place – China International College Students’ Innovation Competition",
        "2025.08 - Second Prize – China Collegiate Computing Competition (Mobile Application Innovation)",
        "2024.08 - National First/Second/Third Prizes – China Creative Design & Digital Art Competition",
        "2024.06 - First Prize – Ministry of Education National College Art Exhibition (Tech & Art VR Workshop)",
        "2023.12 - Third Prize – Qingrun National College Essay Competition",
        "2023.08 - Three Second Prizes – Future Designer National Digital Art Competition"
      ]
    },
    papers: {
      title: "Papers & Patents",
      items: [
        "2024.11 - “Interactive Service System Design for Traditional Village Cultural Heritage” (Conference Paper)",
        "2024.12 - “Intelligent Interactive Service Design Empowering Rural Cultural Revitalization” (Qingrun Award)",
        "2024.06 - Mobile-app-based urban planning system (Invention Patent – under review, 1st author)",
        "2025.02 - SmartSite360 Decision Support System (Software Copyright)"
      ]
    },
    skills: {
      title: "Technical Stack",
      categories: [
        { name: "Design & Prototyping", items: ["Figma", "Axure", "Photoshop", "Illustrator", "InDesign"] },
        { name: "AI Tools & Agents", items: ["NotebookLM", "Difty", "Coze", "Midjourney", "Stable Diffusion", "n8n"] },
        { name: "Development", items: ["Cursor (AI Coding)", "Frontend Dev", "SQL", "Python (Basic)"] },
        { name: "3D Modeling", items: ["SketchUp", "Rhino", "Blender"] }
      ]
    }
  },
  zh: {
    nav: {
      about: "关于我",
      experience: "工作经历",
      awards: "获奖经历",
      papers: "论文专利",
      skills: "技能栈",
      contact: "联系方式"
    },
    hero: {
      role: "AI产品经理 / 交互设计师",
      tagline: "融合建筑、交互设计与人工智能的跨界创新者",
      availability: "可实习时长：4-6个月",
      contactBtn: "联系我",
      downloadBtn: "简历"
    },
    about: {
      title: "个人简介",
      content: "具备建筑、交互设计与AI的跨学科背景，拥有完整的产品思维与落地研发经验。擅长用户需求洞察、原型设计与数据驱动迭代，熟悉LLM及多模态AI应用。能利用AIGC工具快速验证概念，并通过用户调研与数据分析推动产品功能落地。拥有跨团队协作经验与极强的学习能力，期待在AI产品方向深耕。",
      info: {
        age: "23岁",
        location: "上海市徐汇区",
        email: "chnxth@163.com",
        phone: "15698010160"
      }
    },
    experience: {
      title: "工作与实习经历",
      items: [
        {
          company: "蔚来汽车 NIO (上海) – 萤火虫智能座舱",
          role: "AI产品经理",
          period: "2025.09 – 2026.02",
          description: "Firefly是蔚来面向欧洲市场的全新纯电品牌。负责紫苑OS功能定义及HMI、多媒体生态建设。",
          achievements: [
            "主导紫苑OS功能定义与优化，解决Google Auto设计规范冲突，确保海外落地。",
            "设计QQ音乐五指抓取手势，效率提升40%。",
            "上线QQ音乐年度报告（车机版），访问量超8万。",
            "设计基于MCP的浏览器智能体及基于美学模型的各种旅行回忆生成智能体。",
            "参与小米“人车家全生态”系统设计。"
          ]
        },
        {
          company: "宜家中国 IKEA – 数字创新中心",
          role: "产品经理 & 交互设计师",
          period: "2025.09 – 2026.02",
          description: "GPC团队。负责覆盖31个国家的全球核心3D可视化产品(GPC)与Fastdesign的敏捷开发。",
          achievements: [
            "搭建AI驱动的2D转3D原型，场景生成速度提升50%。",
            "设计宜家线下门店AR购物原型。",
            "全景模块A/B测试与数据驱动迭代，使用率提升20%。",
            "设计轴向复制功能，误操作率降低100%，效率翻倍。",
            "协助训练自动抠图模型，批量缩略图处理效率提升50%。"
          ]
        },
        {
          company: "MataConstruct – Apple Vision Pro项目",
          role: "项目负责人 / PM / UX设计师",
          period: "2025.05 – 2025.09",
          description: "沉浸式建筑教育平台。",
          achievements: [
            "对80+师生进行用户调研，痛点分析。",
            "设计“三级学习模式”及100+组件库。",
            "用户测试显示理解度提升72%，兴趣度提升65%。",
            "获中国计算机设计大赛二等奖。"
          ]
        },
        {
          company: "智勘360 (Smart Site360) 小程序",
          role: "项目负责人 / PM",
          period: "2024.05 – 2025.05",
          description: "集成LLM与GIS的建筑前期场地分析工具。",
          achievements: [
            "设计集成多媒体采集与GIS的小程序。",
            "引入LLM、LDA主题模型与计算机视觉提升效率。",
            "获软件著作权及发明专利一项（一作）。"
          ]
        },
        {
          company: "山东一杰农业科技有限公司",
          role: "联合创始人 / 产品总监",
          period: "2024.05 – 2025.05",
          description: "“一杰乡旅”数字化平台。",
          achievements: [
            "使用n8n搭建AI自动化智能体进行个性化推荐。",
            "利用AIGC工具制作品牌视觉。",
            "集成720°全景漫游与电商模块。"
          ]
        }
      ]
    },
    awards: {
      title: "获奖经历",
      items: [
        "2025.09 - 中国国际大学生创新大赛 金奖 & 季军",
        "2025.08 - 中国计算机设计大赛 二等奖 (移动应用创新)",
        "2024.08 - 中国好创意暨数字艺术设计大赛 国赛一/二/三等奖",
        "2024.06 - 教育部全国大学生艺术展演 一等奖 (科技艺术VR工作坊)",
        "2023.12 - “清润奖”全国大学生论文竞赛 三等奖",
        "2023.08 - 未来设计师全国数字艺术设计大赛 二等奖 (三项)"
      ]
    },
    papers: {
      title: "论文与专利",
      items: [
        "2024.11 - 《文创视域下传统村落文化遗产互动服务体系设计——以三德范村为例》 (会议论文)",
        "2024.12 - 《数智赋能乡村文化振兴的智能交互服务设计研究》 (清润奖)",
        "2024.06 - 一种基于移动端程序的城市规划系统 (发明专利实审，一作)",
        "2025.02 - 智勘360辅助决策系统 (软著)"
      ]
    },
    skills: {
      title: "专业技能",
      categories: [
        { name: "设计与原型", items: ["Figma", "Axure", "Photoshop", "Illustrator", "InDesign"] },
        { name: "AI工具与智能体", items: ["NotebookLM", "Difty", "Coze", "Midjourney", "Stable Diffusion", "n8n"] },
        { name: "开发能力", items: ["Cursor (AI辅助编程)", "前端开发", "SQL", "Python基础"] },
        { name: "3D建模", items: ["SketchUp", "Rhino", "Blender"] }
      ]
    }
  }
};

type ChatMessage = {
  role: 'user' | 'model';
  content: string;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // AI Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const t = DATA[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'zh' : 'en');

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const newMsg: ChatMessage = { role: 'user', content: userInput };
    setChatMessages(prev => [...prev, newMsg]);
    setUserInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemPrompt = `
        You are an AI Assistant for Travis Tse (谢堂华). 
        Travis is a 23-year-old AI Product Manager & UX Designer based in Shanghai.
        Use the following portfolio data to answer questions accurately and professionally.
        Answer in the same language as the user's question.
        
        Resume Data:
        ${JSON.stringify(DATA)}

        Key highlights:
        - Interned at NIO (Firefly sub-brand) and IKEA China.
        - Experience with Apple Vision Pro and AIGC tools (Stable Diffusion, Midjourney, n8n).
        - Awards include Gold at China International College Students' Innovation Competition.
        - Education/Background: Architecture, Interaction Design, AI.
      `;

      const result = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          ...chatMessages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: userInput }] }
        ],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      let fullResponse = '';
      setChatMessages(prev => [...prev, { role: 'model', content: '' }]);
      
      for await (const chunk of result) {
        const text = chunk.text;
        if (text) {
          fullResponse += text;
          setChatMessages(prev => {
            const last = prev[prev.length - 1];
            return [...prev.slice(0, -1), { ...last, content: fullResponse }];
          });
        }
      }
    } catch (error) {
      console.error("AI Error:", error);
      setChatMessages(prev => [...prev, { role: 'model', content: lang === 'en' ? "Sorry, I encountered an error. Please try again." : "对不起，我遇到了一些错误，请重试。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary-200">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="text-xl font-display font-bold tracking-tight cursor-pointer text-slate-900"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Travis Tse<span className="text-primary-500">.</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {Object.entries(t.nav).map(([key, label]) => (
              <button key={key} onClick={() => scrollTo(key)} className="hover:text-primary-600 transition-colors">
                {label}
              </button>
            ))}
            <button 
              onClick={toggleLang} 
              className="px-3 py-1 rounded-full border border-slate-300 hover:border-primary-500 hover:text-primary-600 transition-all text-xs font-bold"
            >
              {lang === 'en' ? 'CN' : 'EN'}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLang} 
              className="px-2 py-1 rounded border border-slate-300 text-xs font-bold"
            >
              {lang === 'en' ? 'CN' : 'EN'}
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="text-slate-900">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8 animate-fade-in">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 p-2">
            <X size={24} />
          </button>
          {Object.entries(t.nav).map(([key, label]) => (
            <button key={key} onClick={() => scrollTo(key)} className="text-xl font-medium text-slate-800 hover:text-primary-600">
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <HeroScene />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          {/* Fix framer-motion type error with cast to any */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary-50 text-primary-600 border border-primary-100 text-xs font-bold tracking-wider uppercase">
              {t.hero.availability}
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-6 text-slate-900 tracking-tight">
              Travis Tse <span className="text-slate-400 font-normal block text-3xl md:text-5xl mt-4">谢堂华</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.hero.tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => scrollTo('contact')} className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl">
                {t.hero.contactBtn}
              </button>
              <a 
                href="#" 
                className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:border-slate-400 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={18} />
                {t.hero.downloadBtn}
              </a>
            </div>
          </MotionDiv>
        </div>

        {/* Scroll Indicator */}
        {/* Fix framer-motion type error with cast to any */}
        <MotionDiv 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent"></div>
        </MotionDiv>
      </header>

      <main className="container mx-auto px-6 pb-32">
        
        {/* Personal Info & Self Eval */}
        <section id="about" className="py-20">
          <SectionTitle title={t.about.title} icon={<MapPin size={24} />} />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left: Contact Card */}
            <div className="md:col-span-4">
               <div className="glass-panel p-8 rounded-2xl sticky top-32">
                  <h3 className="text-xl font-bold mb-6">Profile</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3 text-slate-600">
                      <MapPin size={18} />
                      <span>{t.about.info.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Mail size={18} />
                      <a href={`mailto:${t.about.info.email}`} className="hover:text-primary-600">{t.about.info.email}</a>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone size={18} />
                      <span>{t.about.info.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Globe size={18} />
                      <a href="https://chnxth.github.io/TravisTse.github.io/" target="_blank" rel="noreferrer" className="hover:text-primary-600">Portfolio Link</a>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-200">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Roles</div>
                    <div className="flex flex-wrap gap-2">
                       <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded text-xs font-bold">AI PM</span>
                       <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">UX/UI</span>
                       <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold">Operations</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Right: Intro Text */}
            <div className="md:col-span-8">
               <p className="text-lg md:text-xl leading-relaxed text-slate-600 font-light">
                 {t.about.content}
               </p>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section id="experience" className="py-20">
          <SectionTitle title={t.experience.title} icon={<Briefcase size={24} />} />
          <div className="space-y-8">
            {t.experience.items.map((item, index) => (
              <ExperienceCard key={index} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* Awards */}
        <section id="awards" className="py-20">
          <SectionTitle title={t.awards.title} icon={<Award size={24} />} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.awards.items.map((item, index) => (
              <AwardItem key={index} text={item} index={index} />
            ))}
          </div>
        </section>

        {/* Papers */}
        <section id="papers" className="py-20">
          <SectionTitle title={t.papers.title} icon={<BookOpen size={24} />} />
          <div className="space-y-4">
            {t.papers.items.map((item, index) => (
              <PaperItem key={index} text={item} index={index} />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20">
          <SectionTitle title={t.skills.title} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.skills.categories.map((cat, index) => (
               <SkillSection key={index} category={cat} index={index} />
            ))}
          </div>
        </section>

        {/* Contact Footer */}
        <section id="contact" className="py-20 mt-20 border-t border-slate-200">
           <div className="text-center max-w-2xl mx-auto">
             <h2 className="text-3xl font-display font-bold mb-6 text-slate-900">{t.nav.contact}</h2>
             <p className="text-slate-500 mb-8">Open to new opportunities and collaborations.</p>
             <a 
               href={`mailto:${t.about.info.email}`} 
               className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full text-lg font-medium hover:bg-primary-600 transition-all"
             >
               <Mail size={20} />
               {t.about.info.email}
             </a>
             <div className="mt-12 text-sm text-slate-400">
               &copy; {new Date().getFullYear()} Travis Tse (谢堂华). All rights reserved.
             </div>
           </div>
        </section>

      </main>

      {/* AI Assistant FAB */}
      <div className="fixed bottom-6 right-6 z-[60]">
        <AnimatePresence>
          {chatOpen && (
            /* Fix framer-motion type error with cast to any */
            <MotionDiv
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden glass-panel"
            >
              {/* Chat Header */}
              <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-primary-500 rounded-lg">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Travis AI Assistant</h4>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest">{lang === 'en' ? 'Powered by Gemini' : '由 Gemini 提供支持'}</span>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="hover:text-primary-400">
                  <X size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth">
                {chatMessages.length === 0 && (
                  <div className="text-center py-10 px-4">
                    <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare size={24} />
                    </div>
                    <p className="text-slate-500 text-sm">
                      {lang === 'en' ? "Hi! I'm Travis's AI assistant. Ask me anything about his work, skills, or projects!" : "嗨！我是 Travis 的 AI 助手。你可以问我关于他的工作、技能或项目的问题！"}
                    </p>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-primary-100'}`}>
                        {msg.role === 'user' ? <User size={16} className="text-slate-600" /> : <Bot size={16} className="text-primary-600" />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'}`}>
                        {msg.content || <Loader2 size={16} className="animate-spin" />}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && chatMessages[chatMessages.length - 1]?.role !== 'model' && (
                   <div className="flex justify-start">
                     <div className="flex gap-2 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <Bot size={16} className="text-primary-600" />
                        </div>
                        <div className="p-3 bg-slate-100 text-slate-700 rounded-2xl rounded-tl-none">
                          <Loader2 size={16} className="animate-spin" />
                        </div>
                     </div>
                   </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white/50">
                <div className="relative">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={lang === 'en' ? "Type a question..." : "输入问题..."}
                    className="w-full pl-4 pr-12 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                  <button 
                    type="submit" 
                    disabled={!userInput.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900 text-white rounded-lg hover:bg-primary-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* FAB Button */}
        {/* Fix framer-motion type error with cast to any */}
        <MotionButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary-600 transition-colors"
        >
          {chatOpen ? <X size={24} /> : <Sparkles size={24} />}
        </MotionButton>
      </div>
    </div>
  );
};

export default App;
