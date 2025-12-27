"use client";

import React, { useState } from 'react';
import { Cpu, Database, Play, Sun, Moon, WifiOff, Zap, ShieldCheck } from 'lucide-react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // NAPRAWA: Definicja theme musi być tutaj!
  const theme = {
    bg: isDarkMode ? 'bg-[#050505]' : 'bg-[#fbfbfd]',
    text: isDarkMode ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]',
    textMuted: isDarkMode ? 'text-[#a1a1a6]' : 'text-[#86868b]',
    navBg: isDarkMode ? 'bg-[#050505]/80 border-white/10' : 'bg-[#fbfbfd]/80 border-black/5',
    cardBg: isDarkMode ? 'bg-[#151515] border-white/10' : 'bg-white border-black/5',
    logoBg: isDarkMode ? 'bg-[#1c1c1e] border-white/10' : 'bg-white border-black/5'
  };

  const renderLogoDots = () => {
    const activeIndices = [0, 5, 10, 15, 20, 21, 22]; 
    const dots = [];
    for (let i = 0; i < 25; i++) {
      const isActive = activeIndices.includes(i);
      dots.push(
        <div key={i} className={`rounded-full transition-all duration-500 ${isActive ? 'bg-blue-600 w-[4px] h-[4px]' : `${isDarkMode ? 'bg-white/20' : 'bg-[#1d1d1f]/10'} w-[3px] h-[3px]`}`} />
      );
    }
    return dots;
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans transition-colors duration-500`}>
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${theme.navBg}`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-2 border ${theme.logoBg}`}>
                <div className="grid grid-cols-5 gap-[3px]">{renderLogoDots()}</div>
             </div>
             <span className="font-semibold text-lg tracking-tight">Lokalne.AI</span>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-blue-500/10 text-blue-500">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32 pb-20 px-4 sm:px-6 max-w-[1200px] mx-auto">
        <div className="mb-12 sm:mb-20">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[1.0] mb-6">
              <span className="text-blue-600">P</span>otęga jest<br/>lokalna.
            </h1>
            <p className={`text-lg sm:text-xl max-w-xl leading-relaxed ${theme.textMuted}`}>
                Prywatne modele AI uruchamiane na Twoim własnym sprzęcie. 
                Bezpieczeństwo danych, brak abonamentów i najwyższa wydajność.
            </p>
        </div>

        <section className="mb-16">
            <a 
              href="https://youtube.com/@lokalneai" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`relative block aspect-video rounded-[32px] overflow-hidden border ${theme.cardBg} group shadow-xl transition-all hover:border-blue-500/40`}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                        <Play className="text-white w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                    </div>
                </div>
                <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20 max-w-2xl text-left">
                    <span className="text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2 block">Oglądaj na YouTube</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">Budowa lokalnego centrum AI</h2>
                    <p className="text-gray-400 text-xs sm:text-sm">Zobacz, jak skonfigurować stację roboczą do pracy z modelami LLM.</p>
                </div>
            </a>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className={`${theme.cardBg} rounded-[32px] p-8 border flex flex-col justify-between min-h-[200px]`}>
                 <ShieldCheck className="w-8 h-8 text-blue-600"/>
                 <h3 className="text-xl font-bold">Pełna Prywatność</h3>
            </div>
            <div className={`${theme.cardBg} rounded-[32px] p-8 border flex flex-col justify-between min-h-[200px]`}>
                <Zap className="w-8 h-8 text-yellow-500"/>
                <h3 className="text-xl font-bold">Maksymalna Szybkość</h3>
            </div>
            <div className={`${theme.cardBg} rounded-[32px] p-8 border flex flex-col justify-between min-h-[200px]`}>
                 <WifiOff className="w-8 h-8 text-green-500"/>
                 <h3 className="text-xl font-bold">Praca Offline</h3>
            </div>
        </div>
      </main>
    </div>
  );
}