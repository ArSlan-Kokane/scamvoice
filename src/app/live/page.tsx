'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { DEMO_ANIMATION } from '@/data/demo-transcripts';
import { AnalysisResult } from '@/lib/analyzer';

export default function LiveProtectionPage() {
  const router = useRouter();
  
  // State
  const [isListening, setIsListening] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [displayTranscript, setDisplayTranscript] = useState<any[]>([]);
  const [riskScore, setRiskScore] = useState(0);
  const [verdict, setVerdict] = useState('SAFE');
  const [summary, setSummary] = useState('AI monitoring active. Waiting for conversation...');
  const [detectedTactics, setDetectedTactics] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(0);
  
  // Refs for tracking simulation progress
  const demoIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Request Microphone Permission
  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // We don't actually need the stream for Phase 1 simulation, but we prove access
      stream.getTracks().forEach(track => track.stop());
      setPermissionGranted(true);
      return true;
    } catch (err) {
      console.error('Microphone permission denied:', err);
      alert('Microphone permission is required for live protection.');
      return false;
    }
  };

  // Start Listening
  const startListening = async () => {
    const hasPermission = permissionGranted || await requestMicPermission();
    if (!hasPermission) return;

    setIsListening(true);
    setSeconds(0);
    
    // Timer for display
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Analysis Loop (Every 5 seconds)
    intervalRef.current = setInterval(async () => {
      await processAnalysisStep();
    }, 5000);

    // Initial step
    await processAnalysisStep();
  };

  // Stop Listening
  const stopListening = () => {
    setIsListening(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    demoIndexRef.current = 0;
  };

  // Simulation Logic: Step through DEMO_ANIMATION
  const processAnalysisStep = async () => {
    if (demoIndexRef.current >= DEMO_ANIMATION.length) {
      // Loop or stop? For demo, let's just hold at the end
      return;
    }

    const nextExchange = DEMO_ANIMATION[demoIndexRef.current];
    
    // 1. Update Transcript
    const newEntry = {
      speaker: nextExchange.speaker,
      text: nextExchange.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setDisplayTranscript(prev => [...prev, newEntry]);
    
    // Build full transcript string for API
    const updatedTranscript = transcript + `\n[${nextExchange.speaker}]: ${nextExchange.text}`;
    setTranscript(updatedTranscript);

    // 2. Call Real Analyze API (Phase 1: Pass the growing transcript)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: updatedTranscript })
      });

      if (response.ok) {
        const result: AnalysisResult = await response.json();
        
        // Update UI with real AI findings
        setRiskScore(result.risk_score);
        setVerdict(result.verdict);
        setSummary(result.summary);
        setDetectedTactics(result.detected_tactics.map(t => t.tactic));

        // Panic Mode Check
        if (result.trigger_panic_mode) {
          stopListening();
          // Store result so emergency page can show what triggered it
          sessionStorage.setItem('analysisResult', JSON.stringify(result));
          router.push('/emergency');
        }
      } else {
        // Fallback to demo values if API key/quota issue
        setRiskScore(nextExchange.risk);
        setDetectedTactics(prev => [...new Set([...prev, ...nextExchange.tactics])]);
      }
    } catch (err) {
      // Fallback on network error
      setRiskScore(nextExchange.risk);
    }

    demoIndexRef.current++;
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-body-md text-on-background min-h-screen pb-40 bg-[#0A0F1E]">
      {/* TopAppBar */}
      <header className="bg-[#0A0F1E] border-b border-[#161E31] shadow-none flex justify-between items-center w-full px-5 h-16 fixed top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/home')}>
          <span className="material-symbols-outlined text-[#E24B4A]">shield</span>
          <h1 className="text-white text-lg font-extrabold tracking-widest uppercase font-['Plus_Jakarta_Sans']">ScamVoice AI</h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#161E31] rounded-full">
          <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-[#E24B4A] animate-ping' : 'bg-slate-600'}`}></span>
          <span className={`font-label-bold ${isListening ? 'text-[#E24B4A]' : 'text-slate-400'} text-sm`}>
            {isListening ? 'SECURE' : 'IDLE'}
          </span>
        </div>
      </header>

      <main className="pt-24 px-5 space-y-6 max-w-xl mx-auto pb-48">
        {/* Status Indicator */}
        <div className="flex justify-center items-center py-5 bg-[#161E31]/60 rounded-2xl border border-[#2A354F]/40 backdrop-blur-lg shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isListening ? 'bg-[#E24B4A] animate-pulse' : 'bg-slate-600'}`}></span>
              <span className={`${isListening ? 'text-[#E24B4A]' : 'text-slate-400'} font-bold text-xl tracking-tight uppercase`}>
                {isListening ? 'LISTENING' : 'TAP TO START'}
              </span>
            </div>
            {isListening && (
              <>
                <div className="w-[1px] h-6 bg-[#2A354F]"></div>
                <span className="text-slate-200 font-mono text-2xl font-semibold">{formatTime(seconds)}</span>
              </>
            )}
          </div>
        </div>

        {/* Threat Analysis Card */}
        <section className={`bg-[#161E31] rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden border ${verdict === 'SCAM' ? 'border-[#E24B4A]' : 'border-[#2A354F]'}`}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-white font-headline-md uppercase tracking-tight leading-none mb-1">Threat Analysis</h2>
              <p className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">Real-time Risk Assessment</p>
            </div>
            <span className={`${riskScore > 70 ? 'bg-[#E24B4A]' : riskScore > 30 ? 'bg-orange-500' : 'bg-emerald-500'} text-white font-bold px-3 py-1 rounded-full text-[10px] shadow-lg`}>
              {verdict} RISK
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
              {/* Circular Gauge */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="44" stroke="#2A354F" strokeWidth="8"></circle>
                <circle 
                  cx="50" 
                  cy="50" 
                  fill="transparent" 
                  r="44" 
                  stroke={riskScore > 70 ? '#E24B4A' : riskScore > 30 ? '#F2994A' : '#27AE60'} 
                  strokeDasharray="276.46" 
                  strokeDashoffset={276.46 - (276.46 * riskScore / 100)} 
                  strokeLinecap="round" 
                  strokeWidth="8"
                  className="transition-all duration-1000"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-white text-3xl font-extrabold leading-none">{riskScore}%</span>
              </div>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
                {detectedTactics.length > 0 ? detectedTactics.map((t, i) => (
                  <span key={i} className="bg-[#E24B4A]/10 text-[#E24B4A] font-bold px-2 py-1 rounded text-[9px] uppercase border border-[#E24B4A]/20">
                    {t}
                  </span>
                )) : (
                  <span className="text-slate-500 text-[9px] uppercase tracking-widest">Scanning for tactics...</span>
                )}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                {summary}
              </p>
            </div>
          </div>
        </section>

        {/* Live Transcript Card */}
        <section className="bg-[#161E31] rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#2A354F]">
          <div className="flex items-center gap-3 mb-5 border-b border-[#2A354F] pb-3">
            <span className="material-symbols-outlined text-slate-400 text-xl">article</span>
            <h3 className="text-white font-bold uppercase tracking-wide text-sm">Live Transcript</h3>
          </div>
          
          <div className="space-y-6 h-[280px] overflow-y-auto transcript-gradient pr-2 custom-scrollbar flex flex-col">
            {displayTranscript.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full opacity-30">
                <span className="material-symbols-outlined text-4xl mb-2">graphic_eq</span>
                <p className="text-xs uppercase tracking-widest font-bold">Waiting for audio...</p>
              </div>
            ) : displayTranscript.map((entry, i) => (
              <div key={i} className={`flex gap-4 ${entry.speaker === 'USER' ? 'justify-end' : ''}`}>
                {entry.speaker !== 'USER' && (
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#2A354F] flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400 text-lg">person</span>
                  </div>
                )}
                <div className={`space-y-1 ${entry.speaker === 'USER' ? 'text-right' : ''}`}>
                  <span className="font-bold text-slate-400 text-[10px] tracking-widest uppercase">
                    {entry.speaker === 'USER' ? 'YOU' : '[CALLER]'} • {entry.timestamp}
                  </span>
                  <p className={`${entry.speaker === 'USER' ? 'text-slate-400' : 'text-slate-200'} text-sm leading-relaxed`}>
                    {entry.text}
                  </p>
                </div>
                {entry.speaker === 'USER' && (
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400 text-lg">face</span>
                  </div>
                )}
              </div>
            ))}
            
            {isListening && (
              <div className="flex gap-4 animate-pulse">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#2A354F] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#E24B4A] text-lg">psychology</span>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-[#E24B4A] text-[10px] tracking-widest uppercase">SYSTEM</span>
                  <p className="text-[#E24B4A] text-xs leading-relaxed italic font-medium">Monitoring active conversation...</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Emergency Contact */}
        <div className="bg-[#161E31] border border-[#2A354F] rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#2A354F] shadow-inner">
              <img 
                className="w-full h-full object-cover" 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" 
                alt="Emergency Contact"
              />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none mb-1">Rahul (Brother)</p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Trusted Guardian</p>
            </div>
          </div>
          <button 
            onClick={() => alert('Trusted contact will be notified of this call.')}
            className="text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition-all active:scale-95 bg-white/5"
          >
            NOTIFY
          </button>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-t border-[#161E31] p-6 pb-8">
        <div className="max-w-xl mx-auto space-y-4">
          {!isListening ? (
            <button 
              onClick={startListening}
              className="w-full bg-[#E24B4A] text-white py-5 rounded-2xl font-bold uppercase tracking-widest shadow-2xl shadow-[#E24B4A]/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
            >
              <span className="material-symbols-outlined fill text-2xl">mic</span>
              START PROTECTION
            </button>
          ) : (
            <button 
              onClick={stopListening}
              className="w-full bg-slate-800 text-white py-5 rounded-2xl font-bold uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg border border-slate-700"
            >
              <span className="material-symbols-outlined fill text-2xl">stop_circle</span>
              STOP PROTECTION
            </button>
          )}
          
          <button 
            onClick={() => router.push('/home')}
            className="w-full border-2 border-slate-800 text-slate-400 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm"
          >
            <span className="material-symbols-outlined text-xl">close</span>
            CANCEL & EXIT
          </button>
        </div>
      </footer>
    </div>
  );
}
