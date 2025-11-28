
import React, { useState, useEffect } from 'react';
import { ArrowDownRight, Instagram, Mail, Menu, X, Globe, Leaf, ChevronLeft, ChevronRight, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import Reveal from './components/Reveal';
import GlassCard from './components/GlassCard';
import Carousel3D from './components/Carousel3D';
import CustomCursor from './components/CustomCursor';
import IntroAnimation from './components/IntroAnimation';
import { PERSONAL_INFO, EXPERIENCES, WEB_PROJECTS, GALLERY_PHOTOS } from './constants';
import { NOVEL_CONTENT } from './novelText';
import { Language } from './types';

// Custom Novel Renderer Component
// Parses the text content and renders styled HTML elements without external dependencies
const NovelRenderer: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;
  const lines = content.split('\n');
  return (
    <div className="space-y-6">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-4" />;
        
        // Check for Titles (Chapter titles usually start with '第' or '#')
        const isTitle = trimmed.startsWith('#') || trimmed.match(/^第.+章/);
        
        if (isTitle) {
          return (
            <h2 key={index} className="text-2xl md:text-3xl font-bold text-[#9caf88] mt-12 mb-8 text-center font-[Noto_Serif_SC]">
              {trimmed.replace(/^#+\s*/, '')}
            </h2>
          );
        }
        
        // Standard Paragraph
        return (
          <p key={index} className="mb-4 indent-8 text-justify leading-loose text-white/80 font-light font-[Noto_Serif_SC]">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh');
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  
  // Works Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Novel Reader State
  const [showReader, setShowReader] = useState(false);

  // Intro State
  const [showIntro, setShowIntro] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false); 

  const t = (key: keyof typeof PERSONAL_INFO.zh) => PERSONAL_INFO[lang][key];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['home', 'experience', 'works', 'gallery'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offset = el.offsetTop - 300;
          if (window.scrollY >= offset && window.scrollY < offset + el.offsetHeight) setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset image index when modal opens/closes
  useEffect(() => {
      setCurrentImageIndex(0);
  }, [selectedWorkId]);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
          alert(`已复制 / Copied: ${text}`);
      });
  };

  const nextImage = (e: React.MouseEvent, total: number) => {
      e.stopPropagation();
      setCurrentImageIndex(prev => (prev + 1) % total);
  };

  const prevImage = (e: React.MouseEvent, total: number) => {
      e.stopPropagation();
      setCurrentImageIndex(prev => (prev - 1 + total) % total);
  };

  const handleOpenReader = () => {
      setShowReader(true);
  };

  const fontSerif = lang === 'zh' ? 'font-[Noto_Serif_SC]' : 'font-[Playfair_Display]';
  const fontMono = 'font-[JetBrains_Mono]';

  return (
    <div className="bg-[#020402] text-[#e8e8e3] min-h-screen font-sans selection:bg-[#9caf88]/30 selection:text-white overflow-x-hidden relative">
      <CustomCursor />
      
      {/* Intro Animation Layer (z-15, behind Hero Content z-20) */}
      {showIntro && (
        <IntroAnimation 
            onDissolveStart={() => setHeroVisible(true)}
            onComplete={() => setShowIntro(false)} 
        />
      )}

      {/* --- Immersive Fixed Background (Global) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div 
            className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
            style={{ 
                transform: `scale(${1 + scrollY * 0.0002})`, 
                filter: `blur(${Math.min(scrollY * 0.005, 8)}px) brightness(${Math.max(0.4, 0.8 - scrollY * 0.001)})`
            }}
         >
             <img 
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop" 
                alt="Dark Botanical Texture" 
                className="w-full h-full object-cover"
             />
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#020402]/30 via-transparent to-[#020402]"></div>
         <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`}}></div>
      </div>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 transition-all duration-500 hover:bg-black/20 group/nav">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent opacity-80 pointer-events-none transition-opacity duration-500 group-hover/nav:opacity-100"></div>
        
        <div className="relative z-10 cursor-pointer opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300 flex flex-col items-start" onClick={() => scrollTo('home')}>
             <span className="font-[Noto_Serif_SC] text-2xl md:text-3xl font-bold text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] leading-none">姚思源</span>
             <span className="font-[Playfair_Display] text-[10px] md:text-xs text-white/50 tracking-[0.2em] uppercase mt-1 font-light">Yao Siyuan</span>
        </div>
        
        <div className={`relative z-10 hidden md:flex items-center gap-10 text-[11px] font-medium tracking-[0.15em] uppercase text-white/60 ${fontMono}`}>
          {['experience', 'works', 'gallery'].map((item) => (
            <button key={item} onClick={() => scrollTo(item)} className={`hover:text-white transition-all duration-300 relative group`}>
              {lang === 'zh' ? (item === 'experience' ? '经历' : item === 'works' ? '作品' : '画廊') : item}
            </button>
          ))}
          <button onClick={() => scrollTo('footer')} className="hover:text-white transition-all duration-300 relative group">
              {lang === 'zh' ? '联系我' : 'CONTACT ME'}
          </button>
          <div className="w-[1px] h-4 bg-white/10 mx-2"></div>
          <button onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')} className="hover:text-white transition-colors flex items-center gap-2">
            <Globe size={12}/> {lang === 'zh' ? 'CN' : 'EN'}
          </button>
        </div>
        <button className="relative z-10 md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <div className={`fixed inset-0 bg-[#050a05]/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
         {['home', 'experience', 'works', 'gallery', 'footer'].map(item => (
             <button key={item} onClick={() => scrollTo(item)} className={`text-3xl ${fontSerif} text-white tracking-widest`}>{item === 'footer' ? (lang === 'zh' ? '联系我' : 'CONTACT') : item.toUpperCase()}</button>
         ))}
      </div>

      {/* --- 1. Hero Section --- */}
      <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        
        {/* Content Container - z-20 to sit above Intro (z-15) */}
        <div className={`relative z-20 max-w-7xl mx-auto flex flex-col items-center transition-all duration-[2500ms] ease-out ${heroVisible ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-110'}`}>
            
            <Reveal delay={100}>
                <div className="flex items-center gap-4 text-[#9caf88] mb-12 opacity-90">
                    <div className="h-[1px] w-12 bg-[#9caf88]"></div>
                    {/* Curly Artistic Font: Pinyon Script - Made more elegant and larger */}
                    <span className="text-5xl md:text-7xl tracking-wider text-[#9caf88] drop-shadow-[0_0_10px_rgba(156,175,136,0.2)]" style={{ fontFamily: '"Pinyon Script", cursive' }}>AI Product Manager</span>
                    <div className="h-[1px] w-12 bg-[#9caf88]"></div>
                </div>
            </Reveal>

            <div className="flex flex-col items-center gap-0 leading-none">
                <Reveal delay={300}>
                    <h1 className={`text-[15vw] md:text-[12rem] font-bold text-white tracking-tight drop-shadow-2xl mix-blend-overlay opacity-90 ${fontSerif} leading-[0.9] transition-all duration-700 hover:text-[#9caf88] hover:tracking-wide hover:scale-105 hover:drop-shadow-[0_0_50px_rgba(156,175,136,0.4)] cursor-default`}>
                        扎根
                    </h1>
                </Reveal>
                <Reveal delay={450}>
                    {/* Expanded fade effect: from white to transparent */}
                    <h1 className={`text-[15vw] md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/50 to-transparent tracking-tight drop-shadow-2xl ${fontSerif} leading-[0.9] transition-all duration-700 hover:text-[#9caf88] hover:tracking-wide hover:scale-105 hover:drop-shadow-[0_0_50px_rgba(156,175,136,0.4)] cursor-default pb-10`}>
                        生长
                    </h1>
                </Reveal>
            </div>

            <Reveal delay={600}>
                <div className="mt-16">
                    <button 
                        onClick={() => scrollTo('experience')}
                        className="group relative px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-medium text-base transition-all duration-300 hover:bg-white/10 hover:border-white/30 flex items-center gap-4"
                    >
                        <span className="relative z-10 tracking-widest text-sm">关于我</span>
                        <span className="w-6 h-6 rounded-full bg-[#9caf88] flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-300">
                            <ArrowDownRight size={14} />
                        </span>
                    </button>
                </div>
            </Reveal>
        </div>
      </section>

      {/* --- 2. Experience Section --- */}
      <section id="experience" className="relative py-40 px-6 md:px-24">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#9caf88]/10 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
            <Reveal>
                <div className="text-center mb-24 relative z-10">
                    <span className={`block text-[#9caf88] text-xs uppercase tracking-[0.4em] mb-4 ${fontMono}`}>Journey</span>
                    <h2 className={`text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-transparent mb-4 ${fontSerif}`}>{lang === 'zh' ? '经历' : 'Growth Journey'}</h2>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#9caf88] to-transparent mx-auto mt-8 opacity-50"></div>
                </div>
            </Reveal>

            <div className="space-y-32">
                {EXPERIENCES.map((exp, idx) => (
                    <Reveal key={idx} delay={idx * 150} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center relative group`}>
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020402] border border-[#9caf88] z-20 group-hover:scale-125 group-hover:bg-[#9caf88] transition-all duration-500 shadow-[0_0_20px_rgba(156,175,136,0.4)]">
                             <div className="absolute inset-0 rounded-full bg-[#9caf88] animate-ping opacity-0 group-hover:opacity-30"></div>
                        </div>
                        
                        <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                            <span className={`inline-block px-3 py-1 mb-4 border border-[#9caf88]/30 rounded-full text-[#9caf88] text-xs tracking-wider ${fontMono} bg-[#9caf88]/5`}>{exp.period}</span>
                            <h3 className={`text-3xl text-white mb-2 ${fontSerif}`}>{exp.company[lang]}</h3>
                            <h4 className={`text-white/50 text-sm uppercase tracking-wider ${fontMono}`}>{exp.role[lang]}</h4>
                        </div>
                        
                        <div className="w-full md:w-1/2">
                             <GlassCard className={`p-10 relative transition-all duration-700 border-white/5 bg-white/[0.02] backdrop-blur-3xl ${idx % 2 === 0 ? 'md:ml-16' : 'md:mr-16'}`}>
                                <ul className="space-y-3">
                                    {exp.shortDesc[lang].map((point, i) => (
                                        <li key={i} className="text-white/70 leading-relaxed text-sm font-light flex gap-3">
                                            <span className="text-[#9caf88] mt-1.5 w-1.5 h-1.5 rounded-full bg-[#9caf88] flex-shrink-0"></span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                             </GlassCard>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
      </section>

      {/* --- 3. Works Section (Scattered Leaves) --- */}
      <section id="works" className="relative py-40 px-6 md:px-24 min-h-screen flex flex-col justify-center">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[80vw] bg-radial-gradient from-white/[0.02] to-transparent blur-3xl -z-10 pointer-events-none"></div>

         <div className="max-w-7xl mx-auto w-full">
            <Reveal>
                <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-6">
                     <div className="relative">
                        <h2 className={`text-5xl md:text-6xl text-white mb-2 ${fontSerif}`}>{lang === 'zh' ? '个人作品' : 'Selected Works'}</h2>
                     </div>
                     <div className={`text-[#9caf88] text-xs uppercase tracking-widest hidden md:block ${fontMono}`}>Scattered Ideas</div>
                </div>
            </Reveal>

            <div className="relative w-full h-[100vh] md:h-[800px] flex flex-col md:block gap-10 md:gap-0">
                {WEB_PROJECTS.map((project, index) => {
                     const positions = [
                        "md:top-10 md:left-[5%] md:rotate-[-6deg] z-10",
                        "md:top-[15%] md:right-[10%] md:rotate-[8deg] z-20",
                        "md:bottom-[10%] md:left-[25%] md:rotate-[-4deg] z-30"
                     ];
                     
                     return (
                         <div 
                            key={project.id}
                            onClick={() => setSelectedWorkId(project.id)}
                            className={`relative w-full md:w-[500px] aspect-[16/9] md:absolute cursor-pointer transition-all duration-700 ease-out hover:z-40 hover:scale-105 hover:rotate-0 group ${positions[index] || ''}`}
                         >
                             <div className="w-full h-full overflow-hidden rounded-tl-3xl rounded-br-3xl rounded-tr-[100px] rounded-bl-[100px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative transition-all duration-500 group-hover:shadow-[0_30px_80px_rgba(156,175,136,0.15)] group-hover:border-[#9caf88]/30">
                                  {/* Thumbnail uses first image */}
                                  <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
                                  
                                  <div className="absolute bottom-8 left-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                       <span className={`text-[#9caf88] text-[10px] uppercase tracking-widest mb-2 block ${fontMono} opacity-0 group-hover:opacity-100 transition-opacity delay-100`}>{project.category}</span>
                                       <h3 className={`text-2xl md:text-3xl text-white italic ${fontSerif}`}>{project.title}</h3>
                                  </div>
                                  
                                  <div className="absolute top-6 right-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#9caf88] hover:text-black">
                                      <ArrowDownRight size={18} />
                                  </div>
                             </div>
                         </div>
                     );
                })}
            </div>

            {/* Project Details Modal */}
            {selectedWorkId !== null && (
                <div 
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-lg animate-[fadeIn_0.3s_ease-out]" 
                    onClick={() => setSelectedWorkId(null)}
                >
                    <div 
                        className="relative w-full max-w-6xl bg-[#0a120a] border border-[#9caf88]/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[80vh] animate-[scaleIn_0.4s_ease-out]" 
                        onClick={e => e.stopPropagation()}
                    >
                         <button className="absolute top-4 right-4 z-20 p-3 bg-black/50 rounded-full text-white/80 hover:bg-[#9caf88] hover:text-black transition-colors backdrop-blur-md" onClick={() => setSelectedWorkId(null)}>
                            <X size={20}/>
                         </button>
                         
                         {(() => {
                             const project = WEB_PROJECTS.find(p => p.id === selectedWorkId);
                             if(!project) return null;
                             return (
                                <>
                                    {/* Image Carousel */}
                                    <div className="w-full md:w-3/5 h-[40vh] md:h-full relative bg-black group">
                                        <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-8 bg-[#050505]">
                                            {project.images.map((img, idx) => (
                                                <img 
                                                    key={idx}
                                                    src={img} 
                                                    className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                                                    alt={`${project.title} ${idx + 1}`} 
                                                />
                                            ))}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a120a] to-transparent md:bg-gradient-to-r pointer-events-none opacity-20"></div>
                                        
                                        {/* Carousel Controls */}
                                        {project.images.length > 1 && (
                                            <div className="absolute bottom-6 right-6 flex gap-3 z-20">
                                                <button 
                                                    onClick={(e) => prevImage(e, project.images.length)}
                                                    className="p-3 rounded-full bg-black/50 text-white hover:bg-[#9caf88] hover:text-black transition-all border border-white/10 backdrop-blur-sm"
                                                >
                                                    <ChevronLeft size={18} />
                                                </button>
                                                <span className={`flex items-center text-xs ${fontMono} text-white/70 px-3 bg-black/30 rounded-full border border-white/5`}>
                                                    {currentImageIndex + 1} / {project.images.length}
                                                </span>
                                                <button 
                                                    onClick={(e) => nextImage(e, project.images.length)}
                                                    className="p-3 rounded-full bg-black/50 text-white hover:bg-[#9caf88] hover:text-black transition-all border border-white/10 backdrop-blur-sm"
                                                >
                                                    <ChevronRight size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col overflow-y-auto border-l border-white/5 bg-gradient-to-b from-[#0a120a] to-[#050a05]">
                                        <span className={`inline-flex items-center gap-2 text-[#9caf88] text-xs uppercase tracking-widest mb-4 ${fontMono}`}>
                                            <Leaf size={12} /> {project.category}
                                        </span>
                                        <h3 className={`text-4xl text-white mb-8 ${fontSerif}`}>{project.title}</h3>
                                        
                                        {project.outputs && project.outputs.length > 0 && (
                                            <div className="mb-8 p-4 rounded-xl border border-[#9caf88]/30 bg-[#9caf88]/5 flex items-center gap-3 animate-pulse">
                                                <span className="text-lg">✨</span>
                                                <span className={`text-[#9caf88] font-bold tracking-wide drop-shadow-[0_0_8px_rgba(156,175,136,0.6)] text-sm md:text-base ${fontSerif}`}>
                                                    {project.outputs[0]}
                                                </span>
                                                <span className="text-lg">✨</span>
                                            </div>
                                        )}

                                        {project.background && (
                                            <div className="mb-8 p-6 bg-white/[0.03] rounded-2xl border border-white/5 relative overflow-hidden flex-shrink-0">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-[#9caf88]"></div>
                                                <p className="text-[#9caf88] text-xs uppercase tracking-wider mb-2 font-bold opacity-80">Background Insight</p>
                                                <p className="text-white/80 leading-relaxed text-sm font-light">
                                                    {project.background}
                                                </p>
                                            </div>
                                        )}

                                        {project.features ? (
                                            <div className="mb-8">
                                                <p className="text-white text-xs uppercase tracking-wider mb-4 opacity-50 font-bold">Core Features</p>
                                                <ul className="space-y-4">
                                                    {project.features.map((feature, idx) => (
                                                        <li key={idx} className="flex gap-3 text-white/70 text-sm leading-relaxed font-light">
                                                            <CheckCircle2 size={16} className="text-[#9caf88] flex-shrink-0 mt-0.5" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className="text-white/70 leading-relaxed text-sm md:text-base font-light mb-8">
                                                {project.description}
                                            </p>
                                        )}

                                        {project.link && (
                                            <div className="mt-8 pt-6 border-t border-white/5">
                                                {project.id === 3 ? (
                                                    <button 
                                                        onClick={() => { handleOpenReader(); }}
                                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9caf88] text-[#020402] font-medium text-sm hover:bg-white transition-all duration-300 group/btn"
                                                    >
                                                        <BookOpen size={16} />
                                                        <span>{lang === 'zh' ? '在线阅读 / Read Online' : 'Read Online'}</span>
                                                        <ArrowDownRight size={14} className="group-hover/btn:-rotate-45 transition-transform" />
                                                    </button>
                                                ) : (
                                                    <a 
                                                        href={project.link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9caf88] text-[#020402] font-medium text-sm hover:bg-white transition-all duration-300 group/btn"
                                                    >
                                                        <BookOpen size={16} />
                                                        <span>{lang === 'zh' ? '在线阅读 / 阅读原文' : 'Read Online / Visit Project'}</span>
                                                        <ArrowDownRight size={14} className="group-hover/btn:-rotate-45 transition-transform" />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </>
                             );
                         })()}
                    </div>
                </div>
            )}

            {/* Novel Reader Full Screen View */}
            {showReader && (
                <div className="fixed inset-0 z-[100] bg-[#0c0c0c] flex flex-col animate-[fadeIn_0.5s_ease-out]">
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 md:px-12 py-4 border-b border-white/10 bg-[#0c0c0c]/90 backdrop-blur-md sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <span className={`text-white text-lg md:text-xl font-bold ${fontSerif}`}>末日净魂草饲养指南</span>
                            <span className={`text-[#9caf88] text-xs uppercase tracking-wider ${fontMono}`}>Yao Siyuan</span>
                        </div>
                        <button 
                            onClick={() => setShowReader(false)} 
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto w-full">
                        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                            <article className={`prose prose-invert prose-lg md:prose-xl max-w-none ${fontSerif}`}>
                                <div className="text-center mb-16">
                                    <Leaf size={32} className="text-[#9caf88] mx-auto mb-6 opacity-80" />
                                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">末日净魂草饲养指南</h1>
                                    <p className={`text-white/40 text-sm tracking-widest uppercase ${fontMono}`}>A Story of Redemption in the Wasteland</p>
                                </div>
                                
                                <div className="text-white/80 leading-loose space-y-8 font-light tracking-wide text-justify">
                                    {/* Use custom NovelRenderer instead of ReactMarkdown */}
                                    <NovelRenderer content={NOVEL_CONTENT} />
                                </div>

                                <div className="mt-24 pt-12 border-t border-white/10 text-center text-white/30 text-sm">
                                    <p>— End of Chapter —</p>
                                    <Leaf size={16} className="mx-auto mt-4 opacity-50" />
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            )}
         </div>
      </section>

      {/* --- 4. Gallery Section --- */}
      <section id="gallery" className="relative py-40 overflow-hidden">
         <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-[#020402] to-transparent pointer-events-none z-10"></div>
         
         <Reveal>
            <div className="text-center mb-16 relative z-10">
                <span className={`block text-[#9caf88] text-xs uppercase tracking-[0.4em] mb-4 ${fontMono}`}>Perspective</span>
                <h2 className={`text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-transparent mb-4 ${fontSerif}`}>{lang === 'zh' ? '摄影画廊' : 'Visual Echoes'}</h2>
            </div>
         </Reveal>
         
         <div className="relative w-full z-20 scale-90 md:scale-100"><Carousel3D items={GALLERY_PHOTOS} /></div>
      </section>

      {/* --- Footer --- */}
      <footer id="footer" className="relative py-24 border-t border-white/5 bg-black/60 text-center backdrop-blur-sm">
         <Reveal>
             <div className="relative z-10 flex flex-col items-center gap-10">
                <a href={`mailto:${t('email')}`} className={`text-3xl md:text-5xl text-white/90 hover:text-[#9caf88] transition-colors duration-500 ${fontSerif}`}>Let's Create Together</a>
                
                <div className="flex flex-col md:flex-row gap-12 mt-8">
                    {/* Xiaohongshu Button */}
                    <div className="flex flex-col items-center gap-3">
                        <span className={`text-white/60 text-[10px] uppercase tracking-widest ${fontMono}`}>小红书</span>
                        <div 
                            onClick={() => window.open('https://xhslink.com/m/4Z3kVLZi6oF', '_blank')}
                            className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#9caf88] hover:text-[#020402] hover:scale-110 hover:shadow-[0_0_20px_#9caf88] transition-all duration-300 cursor-pointer backdrop-blur-md group relative"
                        >
                            <span className="group-hover:animate-pulse"><Instagram size={22}/></span>
                        </div>
                        <span 
                            onClick={() => copyToClipboard('yuanyuan430')}
                            className={`text-[#9caf88] text-xs tracking-wider ${fontMono} cursor-pointer hover:underline`}
                        >
                            yuanyuan430
                        </span>
                    </div>

                    {/* Email Button */}
                    <div className="flex flex-col items-center gap-3">
                        <span className={`text-white/60 text-[10px] uppercase tracking-widest ${fontMono}`}>邮箱</span>
                        <a 
                            href={`mailto:3071439401@qq.com`}
                            className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#9caf88] hover:text-[#020402] hover:scale-110 hover:shadow-[0_0_20px_#9caf88] transition-all duration-300 cursor-pointer backdrop-blur-md group relative"
                        >
                            <span className="group-hover:animate-pulse"><Mail size={22}/></span>
                        </a>
                        <span 
                            onClick={() => copyToClipboard('3071439401@qq.com')}
                            className={`text-[#9caf88] text-xs tracking-wider ${fontMono} cursor-pointer hover:underline`}
                        >
                            3071439401@qq.com
                        </span>
                    </div>
                </div>

                <div className={`mt-16 flex flex-col items-center gap-4 text-white/20 text-xs ${fontMono}`}>
                    <div className="w-12 h-[1px] bg-white/20"></div>
                    <p>© 2026 Yao Siyuan. All Rights Reserved.</p>
                </div>
             </div>
         </Reveal>
      </footer>

      <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default App;
