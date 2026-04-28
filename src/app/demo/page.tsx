'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { DEMO_ANIMATION, DEMO_FINAL_RESULT } from '@/data/demo-transcripts';

export default function DemoAnimationPage() {
  const router = useRouter();
  
  const [visibleLines, setVisibleLines] = useState<any[]>([]);
  const [riskScore, setRiskScore] = useState(0);
  const [detectedTactics, setDetectedTactics] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSkip = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    sessionStorage.setItem('analysisResult', JSON.stringify(DEMO_FINAL_RESULT));
    router.push('/result');
  };

  useEffect(() => {
    let currentIndex = 0;

    const tick = () => {
      if (currentIndex < DEMO_ANIMATION.length) {
        const line = DEMO_ANIMATION[currentIndex];
        
        setVisibleLines(prev => [...prev, line]);
        setRiskScore(line.risk);
        
        // Add new tactics if any
        if (line.tactics && line.tactics.length > 0) {
          setDetectedTactics(prev => [...new Set([...prev, ...line.tactics])]);
        }
        
        currentIndex++;
        scrollToBottom();
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsComplete(true);
        
        // Final transition after 2s
        setTimeout(() => {
          sessionStorage.setItem('analysisResult', JSON.stringify(DEMO_FINAL_RESULT));
          router.push('/result');
        }, 2000);
      }
    };

    // Start 2000ms interval
    intervalRef.current = setInterval(tick, 2000);
    
    // Initial tick
    tick();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Update scroll when lines change
  useEffect(() => {
    scrollToBottom();
  }, [visibleLines]);

  return (
    <div className="bg-[#0A0F1E] text-white min-h-screen font-['Plus_Jakarta_Sans'] flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#0A0F1E]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#E24B4A] fill">shield</span>
          <span className="font-extrabold uppercase tracking-widest text-sm">Demo Simulation</span>
        </div>
        <button 
          onClick={handleSkip}
          className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          Skip Demo
          <span className="material-symbols-outlined text-sm">fast_forward</span>
        </button>
      </header>

      <main className="flex-grow p-6 max-w-2xl mx-auto w-full space-y-8 pb-32">
        {/* Analysis Status Overlay */}
        <section className="bg-[#161E31] rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-1">AI Threat Monitor</h2>
              <p className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase">Simulated Analysis</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg ${
              riskScore > 75 ? 'bg-[#E24B4A] text-white' : riskScore > 40 ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
            }`}>
              {riskScore > 75 ? 'CRITICAL THREAT' : riskScore > 40 ? 'SUSPICIOUS' : 'SAFE'}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Risk Gauge */}
            <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="44" stroke="#2A354F" strokeWidth="8"></circle>
                <circle 
                  cx="50" 
                  cy="50" 
                  fill="transparent" 
                  r="44" 
                  stroke={riskScore > 75 ? '#E24B4A' : riskScore > 40 ? '#F2994A' : '#27AE60'} 
                  strokeDasharray="276.46" 
                  strokeDashoffset={276.46 - (276.46 * riskScore / 100)} 
                  strokeLinecap="round" 
                  strokeWidth="8"
                  style={{ transition: 'stroke-dashoffset 1.5s ease, stroke 1.5s ease' }}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{riskScore}%</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Risk</span>
              </div>
            </div>

            {/* Tactics Grid */}
            <div className="flex-grow space-y-4">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Detected Tactics</div>
              <div className="flex flex-wrap gap-2">
                {detectedTactics.length > 0 ? detectedTactics.map((tactic, i) => (
                  <div 
                    key={i} 
                    className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 animate-in fade-in slide-in-from-bottom-1 duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E24B4A] animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-wider">{tactic}</span>
                  </div>
                )) : (
                  <div className="text-xs text-slate-600 italic">Listening for linguistic markers...</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Live Transcript View */}
        <section className="bg-[#161E31]/50 rounded-3xl p-6 border border-white/5 min-h-[400px] flex flex-col">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <span className="material-symbols-outlined text-slate-500">graphic_eq</span>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Live Transcript Stream</span>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar pb-10">
            {visibleLines.map((line, i) => (
              <div 
                key={i} 
                className={`flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 ${line.speaker === 'USER' ? 'justify-end' : ''}`}
              >
                {line.speaker !== 'USER' && (
                  <div className="w-10 h-10 rounded-full bg-[#2A354F] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-slate-400">person</span>
                  </div>
                )}
                <div className={`max-w-[80%] space-y-1 ${line.speaker === 'USER' ? 'text-right' : ''}`}>
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    {line.speaker === 'USER' ? 'YOU' : 'CALLER'}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    line.speaker === 'USER' ? 'bg-[#2A354F]/30 rounded-tr-none' : 'bg-white/5 border border-white/5 rounded-tl-none'
                  }`}>
                    {line.text}
                  </div>
                </div>
                {line.speaker === 'USER' && (
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-slate-400">face</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        </section>

        {isComplete && (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center gap-3 text-[#E24B4A] font-black uppercase tracking-widest text-sm bg-[#E24B4A]/10 px-6 py-3 rounded-full border border-[#E24B4A]/20">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Generating Final Report...
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation Overlay */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/90 to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto">
          {/* No buttons needed here for auto-play, just visual weight */}
        </div>
      </div>
    </div>
  );
}
