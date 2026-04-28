'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnalysisResult } from '@/lib/analyzer';
import { DEMO_FINAL_RESULT } from '@/data/demo-transcripts';

export default function AnalysisResultPage() {
  const router = useRouter();

  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('analysisResult');
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing stored result:', e);
        setResult(DEMO_FINAL_RESULT);
      }
    } else {
      setResult(DEMO_FINAL_RESULT);
    }
  }, []);

  const handleShare = async () => {
    if (!result) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ScamVoice AI Alert',
          text: `ScamVoice AI detected a ${result.verdict} with ${result.risk_score}% risk. Summary: ${result.summary}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  if (!result) return <div className="bg-[#0A0F1E] min-h-screen flex items-center justify-center text-white uppercase tracking-widest font-bold">Loading Analysis...</div>;

  const isScam = result.verdict === 'SCAM';
  const isSuspicious = result.verdict === 'SUSPICIOUS';
  const colorClass = isScam ? '#E24B4A' : isSuspicious ? '#F2994A' : '#2E7D32';
  const bgClass = isScam ? 'bg-[#E24B4A]' : isSuspicious ? 'bg-[#F2994A]' : 'bg-[#2E7D32]';
  const textClass = isScam ? 'text-[#E24B4A]' : isSuspicious ? 'text-[#F2994A]' : 'text-[#2E7D32]';
  const borderClass = isScam ? 'border-[#E24B4A]' : isSuspicious ? 'border-[#F2994A]' : 'border-[#2E7D32]';
  const lightBgClass = isScam ? 'bg-[#E24B4A]/10' : isSuspicious ? 'bg-[#F2994A]/10' : 'bg-[#2E7D32]/10';
  const shadowClass = isScam ? 'shadow-[#E24B4A]/20' : isSuspicious ? 'shadow-[#F2994A]/20' : 'shadow-[#2E7D32]/20';


  return (
    <div className="bg-[#0A0F1E] text-on-surface min-h-screen pb-32 font-['Plus_Jakarta_Sans']">
      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full px-5 h-16 bg-[#0A0F1E] font-bold tracking-tight border-b border-[#161E31] sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span 
            onClick={() => router.push('/analyze')}
            className="material-symbols-outlined text-slate-400 cursor-pointer"
          >
            arrow_back
          </span>
          <span className="text-white text-lg font-extrabold tracking-widest uppercase">ScamVoice AI</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#E24B4A] fill">shield</span>
          <span className="text-[#E24B4A] text-xs font-bold tracking-widest uppercase">PRIVATE</span>
        </div>
      </header>

      <main className="px-5 pt-10 max-w-2xl mx-auto pb-24">
        {/* Hero Risk Ring Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Outer Track */}
            <div className="absolute inset-0 rounded-full border-[12px] border-[#161E31] shadow-inner"></div>
            {/* Conic Progress */}
            <div 
              className="absolute inset-0 rounded-full border-[12px] transition-all duration-1000"
              style={{ 
                borderColor: colorClass,
                clipPath: `polygon(50% 50%, -50% -50%, ${result.risk_score > 50 ? '150% -50%, 150% 150%, -50% 150%, ' : ''}-50% 50%)`,
                transform: `rotate(${result.risk_score * 3.6}deg)`
              }}
            ></div>
            {/* Internal Content */}
            <div className="text-center z-10">
              <span className="block text-6xl font-extrabold text-white leading-none mb-2">{result.risk_score}%</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">LIKELIHOOD</span>
            </div>
          </div>
          <div className={`${bgClass} px-8 py-3 rounded-full border-2 border-white/20 ambient-shadow flex items-center gap-3 mt-10`}>
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span className="font-bold text-sm text-white uppercase tracking-widest">{result.verdict} DETECTED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Evidence */}
          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">AI SUMMARY</h3>
            <div className={`bg-[#161E31] rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#2A354F] border-l-[6px] ${borderClass} h-full`}>
              <span className={`material-symbols-outlined ${textClass} text-2xl mb-4 block fill opacity-20`}>format_quote</span>
              <p className="text-white font-medium text-base italic leading-relaxed mb-6">
                "{result.summary}"
              </p>
              <div className="flex items-center gap-3 py-3 border-t border-[#2A354F]">
                <span className={`w-3 h-3 rounded-full ${bgClass} animate-pulse`}></span>
                <span className="text-[10px] text-slate-300 uppercase font-extrabold tracking-wider">
                  Type: {result.scam_type} • Language: {result.language_detected}
                </span>
              </div>
            </div>
          </section>

          {/* Right Column: Tactics */}
          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">WHAT THEY DID</h3>
            <div className="space-y-4">
              {result.detected_tactics.length > 0 ? (
                result.detected_tactics.map((tactic, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center transition-all hover:bg-white/10">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 ${lightBgClass} rounded-lg`}>
                        <span className={`material-symbols-outlined ${textClass}`}>
                          {tactic.tactic.toLowerCase().includes('urgency') ? 'alarm' : 
                           tactic.tactic.toLowerCase().includes('impersonation') ? 'badge' : 
                           tactic.tactic.toLowerCase().includes('credential') ? 'key' : 'warning'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-sm">{tactic.tactic}</span>
                        <span className="text-[10px] text-slate-400 italic">"{tactic.evidence.length > 50 ? tactic.evidence.substring(0, 50) + '...' : tactic.evidence}"</span>
                      </div>
                    </div>
                    <span className={`${tactic.severity === 'HIGH' ? bgClass : 'bg-[#161E31]'} text-white px-3 py-1 rounded-md text-[9px] font-black uppercase`}>
                      {tactic.severity}
                    </span>
                  </div>
                ))
              ) : (
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-slate-500 text-4xl mb-2">check_circle</span>
                  <p className="text-slate-400 text-sm font-medium">No malicious tactics detected in this transcript.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Action Box */}
        <section className="mt-10 mb-12">
          <div className={`${isScam || isSuspicious ? 'bg-[#E24B4A]/5 border-[#E24B4A]/20' : 'bg-[#2E7D32]/5 border-[#2E7D32]/20'} border p-8 rounded-3xl backdrop-blur-sm`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 ${isScam || isSuspicious ? 'bg-[#E24B4A]/20' : 'bg-[#2E7D32]/20'} rounded-lg`}>
                <span className={`material-symbols-outlined ${isScam || isSuspicious ? 'text-[#E24B4A]' : 'text-[#2E7D32]'} fill`}>
                  {isScam || isSuspicious ? 'warning' : 'task_alt'}
                </span>
              </div>
              <h3 className={`font-black ${isScam || isSuspicious ? 'text-[#E24B4A]' : 'text-[#2E7D32]'} uppercase tracking-[0.2em] text-xs`}>RECOMMENDED ACTION</h3>
            </div>
            <p className="text-white text-lg font-bold mb-6 leading-tight">
              {result.recommended_action}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3">
                <span className={`w-8 h-8 rounded-full ${isScam || isSuspicious ? 'bg-[#E24B4A]' : 'bg-[#2E7D32]'} text-white flex items-center justify-center font-black text-xs shadow-lg`}>1</span>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  {isScam ? 'Disconnect the call immediately.' : 'Be cautious with any requests.'}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <span className={`w-8 h-8 rounded-full ${isScam || isSuspicious ? 'bg-[#E24B4A]' : 'bg-[#2E7D32]'} text-white flex items-center justify-center font-black text-xs shadow-lg`}>2</span>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  {isScam ? 'Report the number to Cyber Crime portal.' : 'Verify the caller through official app.'}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <span className={`w-8 h-8 rounded-full ${isScam || isSuspicious ? 'bg-[#E24B4A]' : 'bg-[#2E7D32]'} text-white flex items-center justify-center font-black text-xs shadow-lg`}>3</span>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  Share this result to warn others.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={() => window.open(isScam ? 'https://cybercrime.gov.in' : 'tel:', '_blank')}
            className={`${bgClass} py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-xl ${shadowClass} hover:brightness-110 group`}
          >
            <span className="material-symbols-outlined text-white text-2xl group-hover:rotate-12 transition-transform">
              {isScam ? 'policy' : 'call'}
            </span>
            <span className="font-bold text-white uppercase tracking-widest">
              {isScam ? 'REPORT CRIME' : 'CALL TRUSTED'}
            </span>
          </button>
          <button 
            onClick={handleShare}
            className="border-2 border-white/20 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 hover:bg-white/5 group"
          >
            <span className="material-symbols-outlined text-white text-2xl group-hover:-translate-y-1 transition-transform">share</span>
            <span className="font-bold text-white uppercase tracking-widest">SHARE ALERT</span>
          </button>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-4 bg-[#0A0F1E]/90 backdrop-blur-lg border-t border-[#161E31] shadow-[0_-4px_30px_rgba(0,0,0,0.8)]">
        <Link href="/home" className="flex flex-col items-center justify-center text-slate-500 gap-1 active:scale-90 transition-all hover:text-white group">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">home</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </Link>
        <Link href="/live" className="flex flex-col items-center justify-center text-slate-500 gap-1 active:scale-90 transition-all hover:text-white group">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">security</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Protect</span>
        </Link>
        <Link href="/learn" className="flex flex-col items-center justify-center text-slate-500 gap-1 active:scale-90 transition-all hover:text-white group">
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">menu_book</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Learn</span>
        </Link>
        <Link href="/history" className="flex flex-col items-center justify-center text-[#E24B4A] gap-1 active:scale-90 transition-all group">
          <span className="material-symbols-outlined fill group-hover:scale-110 transition-transform">history</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Logs</span>
        </Link>
      </nav>

    </div>
  );
}
