"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Cpu, Database, Terminal as TerminalIcon, Hash, Zap, Youtube, Play, Sun, Moon, Home as HomeIcon, Check, Copy, Activity } from 'lucide-react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // --- 1. TELEMETRIA (Działa, więc zostawiamy) ---
  const [gpuTemp, setGpuTemp] = useState(42);
  const [vramUsage, setVramUsage] = useState(23.5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGpuTemp(prev => Math.min(85, Math.max(30, prev + (Math.random() > 0.5 ? 1 : -1))));
      setVramUsage(prev => Number((Math.min(24, Math.max(10, prev + (Math.random() - 0.5) * 0.2))).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- 2. NAPRAWA KOPIOWANIA (Jasny feedback) ---
  const [copied, setCopied] = useState(false);
  const commandText = "ollama run llama3:70b";

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 3. PRAWDZIWY TYPEWRITER EFFECT (Pisanie litera po literze) ---
  const fullText = "Inicjalizacja modelu... Wagi załadowane. Jestem gotowy do pracy na lokalnym GPU.";
  const [typedText, setTypedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50); // Prędkość pisania (50ms na znak)

    return () => clearInterval(typeInterval);
  }, []);


  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // LOGO
  const renderLogoDots = () => {
    const activeIndices = [0, 5, 10, 15, 20, 21, 22]; 
    const dots = [];
    for (let i = 0; i < 25; i++) {
      const isActive = activeIndices.includes(i);
      dots.push(
        <div 
          key={i} 
          className={`
            rounded-full transition-all duration-500
            ${isActive ? 'bg-blue-600 w-[4px] h-[4px] shadow-sm' : `${isDarkMode ? 'bg-white/20' : 'bg-[#1d1d1f]/10'} w-[3px] h-[3px]`}
          `} 
        />
      );
    }
    return dots;
  };

  // STYLE
  const theme = {
    bg: isDarkMode ? 'bg-[#050505]' : 'bg-[#fbfbfd]',
    text: isDarkMode ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]',
    textMuted: isDarkMode ? 'text-[#a1a1a6]' : 'text-[#86868b]',
    navBg: isDarkMode ? 'bg-[#050505]/80 border-white/10' : 'bg-[#fbfbfd]/80 border-black/5',
    cardBg: isDarkMode ? 'bg-[#151515] border-white/10' : 'bg-white border-black/5',
    cardHover: isDarkMode ? 'hover:border-white/20' : 'hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)]',
    dotColor: isDarkMode ? '#ffffff' : '#000000',
    logoBg: isDarkMode ? 'bg-[#1c1c1e] border-white/10' : 'bg-white border-black/5'
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans transition-colors duration-500 selection:bg-blue-500 selection:text-white overflow-x-hidden`}>
      
      {/* NAWIGACJA */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-colors duration-500 ${theme.navBg}`}>
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
             <div className={`w-10 h-10 rounded-xl shadow-sm flex items-center justify-center p-2 border transition-all ${theme.logoBg}`}>
                <div className="grid grid-cols-5 gap-[3px]">
                   {renderLogoDots()}
                </div>
             </div>
             <span className={`font-semibold text-lg tracking-tight group-hover:text-blue-600 transition-colors ${theme.text}`}>Lokalne.AI</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-2 text-[10px] font-mono border px-3 py-1 rounded-full ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'}`}>
                <Activity className="w-3 h-3 text-green-500 animate-pulse"/>
                <span>GPU: {gpuTemp}°C</span>
                <span className="opacity-30">|</span>
                <span>VRAM: {vramUsage}GB</span>
            </div>

            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-black/5 hover:bg-black/10 text-slate-600'}`}
            >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className={`hidden md:block px-5 py-2 rounded-full text-xs font-medium transition-all shadow-lg ${isDarkMode ? 'bg-white text-black hover:bg-blue-600 hover:text-white' : 'bg-[#1d1d1f] text-white hover:bg-blue-600'} hover:scale-105`}>
                Dołącz
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-[1200px] mx-auto relative z-10">
        
        {/* NAGŁÓWEK */}
        <div className="mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-8">
                <Zap className="w-3 h-3 fill-current" />
                Power is Local
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                <h1 className={`text-6xl md:text-8xl font-semibold tracking-tight leading-[1.05] ${theme.text}`}>
                  <span className="text-blue-600">P</span>otęga jest<br/>
                  lokalna.
                </h1>

                <div className={`lg:pb-4 max-w-md border-l-0 lg:border-l lg:pl-8 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <p className={`text-xl md:text-2xl font-medium leading-tight mb-2 ${theme.text}`}>
                        Zero chmury.<br/>
                        Zero abonamentów.
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-blue-600">
                        Niezależność sprzętowa.
                    </p>
                </div>
            </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[minmax(340px,auto)]">
            
            {/* KARTA 1: YOUTUBE */}
            <div className={`${theme.cardBg} rounded-[32px] p-8 flex flex-col justify-between border group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden cursor-pointer`}>
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${theme.dotColor} 1.5px, transparent 1.5px)`, backgroundSize: '12px 12px' }}></div>
                
                <div className="flex justify-between items-start relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-red-500/20' : 'bg-red-50'}`}>
                        <Youtube className="w-5 h-5 text-red-600 fill-current"/>
                    </div>
                    <ArrowUpRight className={`w-5 h-5 group-hover:text-red-600 transition-colors ${theme.textMuted}`}/>
                </div>
                
                <div className="relative z-10 mt-8">
                    <h3 className={`text-2xl font-semibold tracking-tight mb-1 ${theme.text}`}>
                        My na YouTube
                    </h3>
                    <p className={`text-sm ${theme.textMuted}`}>
                        Zobacz poradniki wideo i testy sprzętu.
                    </p>
                </div>
                <Play className="absolute -bottom-4 -right-4 w-32 h-32 text-red-500/5 group-hover:text-red-500/10 transition-colors transform rotate-12"/>
            </div>

            {/* KARTA 2: PRYWATNOŚĆ */}
            <div className="bg-[#212223] text-white rounded-[32px] p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                 <div className="relative z-10">
                    <Database className="w-8 h-8 mb-6 text-blue-500"/>
                    <h3 className="text-3xl font-semibold leading-tight mb-4">
                        Prywatność.<br/>Absolutna.
                    </h3>
                    <p className="text-[#a1a1a6] text-sm leading-relaxed">
                        Dane zostają na dysku NVMe. Zero telemetrii.
                    </p>
                 </div>
                 <div className="absolute inset-0 z-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}></div>
            </div>

            {/* KARTA 3: GPT W DOMU */}
             <div className={`${theme.cardBg} rounded-[32px] p-8 flex flex-col justify-between border group hover:shadow-xl transition-all cursor-pointer relative overflow-hidden`}>
                 <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${theme.dotColor} 1.5px, transparent 1.5px)`, backgroundSize: '12px 12px' }}></div>
                 
                 <div className="flex justify-between items-start relative z-10">
                     <span className={`text-[10px] font-bold uppercase tracking-wide border px-3 py-1 rounded-full ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-black/5 text-[#1d1d1f]'}`}>
                        Poradnik
                     </span>
                     <ArrowUpRight className={`w-5 h-5 group-hover:text-blue-600 transition-colors ${theme.textMuted}`}/>
                 </div>
                 
                 <div className="mt-8 relative z-10">
                    <h3 className={`text-xl font-bold leading-tight mb-2 group-hover:text-blue-600 transition-colors ${theme.text}`}>
                        Jak udomowić<br/>nowy gatunek?
                    </h3>
                    <p className={`text-xs font-medium uppercase tracking-wide mt-3 ${theme.textMuted}`}>
                        Wszystko o GPT w domu
                    </p>
                 </div>
            </div>

            {/* KARTA 4: STATYSTYKI */}
            <div className={`${theme.cardBg} rounded-[32px] p-8 flex flex-col justify-between border group hover:border-blue-500/30 transition-all relative overflow-hidden`}>
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${theme.dotColor} 1.5px, transparent 1.5px)`, backgroundSize: '12px 12px' }}></div>
                
                <div className="flex justify-between items-start relative z-10">
                    <Hash className={`w-6 h-6 ${theme.textMuted}`}/>
                    <span className={`text-[10px] font-bold uppercase tracking-wide border px-3 py-1 rounded-full ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-[#f5f5f7] border-black/5 text-[#1d1d1f]'}`}>Llama 3</span>
                </div>
                <div className="relative z-10">
                    <div className={`text-6xl font-semibold tracking-tighter mb-1 ${theme.text}`}>
                        70B
                    </div>
                    <p className={`text-sm font-medium ${theme.textMuted}`}>Parametrów modelu.</p>
                </div>
            </div>

            {/* KARTA 5: HARDWARE */}
            <div className={`lg:col-span-2 row-span-2 ${theme.cardBg} rounded-[32px] p-10 relative overflow-hidden group border transition-all duration-500 ${theme.cardHover}`}>
                <div className="absolute inset-0 z-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(${theme.dotColor} 2px, transparent 2px)`, backgroundSize: '16px 16px' }}></div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Cpu className={`w-5 h-5 ${theme.textMuted}`}/>
                            <span className={`text-xs font-semibold uppercase tracking-wider ${theme.textMuted}`}>Hardware First</span>
                        </div>
                        <h3 className={`text-4xl md:text-5xl font-semibold tracking-tight max-w-sm ${theme.text}`}>
                            Moc w Twoich<br/>rękach.
                        </h3>
                    </div>
                    
                    <div className={`self-end w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${isDarkMode ? 'bg-white text-black hover:bg-blue-600 hover:text-white' : 'bg-[#f5f5f7] text-[#1d1d1f] group-hover:bg-blue-600 group-hover:text-white'}`}>
                        <ArrowUpRight className="w-6 h-6"/>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-[100px] opacity-60 pointer-events-none"></div>
            </div>

            {/* KARTA 6: TERMINAL (INTERAKTYWNY) */}
            <div className={`lg:col-span-2 ${theme.cardBg} rounded-[32px] p-10 flex flex-col justify-between border group relative overflow-hidden`}>
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${theme.dotColor} 1.5px, transparent 1.5px)`, backgroundSize: '12px 12px' }}></div>

                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <TerminalIcon className={`w-5 h-5 ${theme.textMuted}`}/>
                    <span className={`font-mono text-xs ${theme.textMuted}`}>user@workstation:~</span>
                </div>
                
                <div className={`font-mono text-sm space-y-4 relative z-10 ${theme.text}`}>
                    {/* Interaktywna komenda */}
                    <div 
                        onClick={handleCopy}
                        className={`flex gap-3 items-center cursor-pointer p-3 rounded-xl transition-all border ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-[#f5f5f7] border-black/5 hover:bg-[#ebebef]'}`}
                    >
                        <span className="text-blue-600 font-bold">$</span>
                        <span>{commandText}</span>
                        <div className="ml-auto">
                            {copied ? (
                                <span className="flex items-center gap-1 text-green-500 text-xs font-bold">
                                    <Check className="w-4 h-4" /> Skopiowano!
                                </span>
                            ) : (
                                <Copy className={`w-4 h-4 opacity-50 ${theme.textMuted}`} />
                            )}
                        </div>
                    </div>

                    <div className={`pl-6 text-xs ${theme.textMuted}`}>
                        Loading weights... <span className={`font-semibold ${theme.text}`}>Done (3.2s)</span>
                    </div>
                    
                    {/* Typewriter Effect */}
                    <div className="flex gap-3 items-start pt-2 h-16">
                         <span className="text-blue-600 font-bold mt-1">&gt;&gt;&gt;</span>
                         <span className="leading-relaxed">
                            {typedText}
                            <span className="inline-block w-2 h-4 bg-blue-600 ml-1 animate-pulse align-middle"></span>
                         </span>
                    </div>
                </div>
            </div>

        </div>
      </main>

      <footer className={`py-12 px-6 text-center max-w-[1200px] mx-auto border-t ${isDarkMode ? 'border-white/10' : 'border-black/5'}`}>
         <div className={`flex flex-col md:flex-row justify-between items-center text-xs font-medium ${theme.textMuted}`}>
             <p>&copy; 2025 Lokalne.AI</p>
             <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className={`hover:${theme.text}`}>Privacy</a>
                <a href="#" className={`hover:${theme.text}`}>Terms</a>
             </div>
         </div>
      </footer>
    </div>
  );
}