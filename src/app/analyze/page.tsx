'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { demoTranscripts } from '@/data/demo-transcripts';

export default function AnalyzeTranscriptPage() {
  const router = useRouter();
  const [transcript, setTranscript] = useState('');

  const handlePrefill = (title: string) => {
    const demo = demoTranscripts.find(d => d.title.toLowerCase().includes(title.toLowerCase()));
    if (demo) {
      setTranscript(demo.transcript);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleAnalyze = async () => {
    if (!transcript || transcript.trim().length === 0) {
      setError('Please paste a transcript to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStatusMessage('Checking for manipulation patterns...');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      
      // Store result in sessionStorage
      sessionStorage.setItem('analysisResult', JSON.stringify(result));

      if (result.trigger_panic_mode === true) {
        router.push('/emergency');
      } else {
        router.push('/result');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Analysis failed. Check your connection and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="font-body-md text-on-background min-h-screen pb-32 bg-[#0A0F1E]">
      {/* TopAppBar Component */}
      <header className="flex justify-between items-center w-full px-5 h-16 bg-[#0A0F1E] border-b border-[#161E31] sticky top-0 z-50 shadow-none">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/home')}
            className="text-slate-400 hover:opacity-80 transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="text-white text-lg font-extrabold tracking-widest uppercase font-['Plus_Jakarta_Sans']">ScamVoice AI</span>
        </div>
        <div className="flex items-center">
          <span className="text-[#E24B4A] font-['Plus_Jakarta_Sans'] font-bold tracking-tight px-3 py-1 rounded-full border border-[#E24B4A]/20 bg-[#E24B4A]/5 text-xs">PRIVATE</span>
        </div>
      </header>

      <main className="px-margin pt-md flex flex-col gap-md max-w-2xl mx-auto">
        {/* Header Section */}
        <section className="flex flex-col gap-xs">
          <h1 className="font-headline-md text-headline-md text-white">Manual Threat Audit</h1>
          <p className="font-body-md text-body-md text-slate-400">Our AI analyzes linguistic patterns, urgency markers, and known scam scripts to protect your assets.</p>
        </section>

        {/* Analysis Card */}
        <section className="bg-white rounded-xl p-md ambient-card-shadow flex flex-col gap-md">
          <div className="flex flex-col gap-sm">
            <label className="font-label-bold text-label-bold text-[#0A0F1E]" htmlFor="transcript">CONVERSATION LOG</label>
            <div className="relative">
              <textarea 
                disabled={isLoading}
                className={`w-full h-64 bg-[#F8F9FA] border-2 ${error ? 'border-red-200' : 'border-slate-100'} rounded-lg p-md text-[#0A0F1E] font-body-md focus:border-[#E24B4A] focus:ring-0 transition-colors resize-none ${isLoading ? 'opacity-50' : ''}`} 
                id="transcript" 
                placeholder="Paste text messages or transcribe voice conversations here..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              ></textarea>
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-slate-400">
                <span className="material-symbols-outlined text-sm">shield</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Secure Input</span>
              </div>
            </div>
          </div>
          {/* Quick Samples */}
          <div className="flex flex-col gap-sm">
            <span className="font-label-sm text-label-sm text-slate-500 uppercase tracking-widest">Quick Samples</span>
            <div className="flex flex-wrap gap-sm">
              <button 
                onClick={() => handlePrefill('KYC')}
                className="px-4 py-2 rounded-full border-1.5 border-[#0A0F1E] text-[#0A0F1E] font-label-bold text-xs hover:bg-[#0A0F1E] hover:text-white transition-all active:scale-95"
              >
                Bank OTP
              </button>
              <button 
                onClick={() => handlePrefill('Digital Arrest')}
                className="px-4 py-2 rounded-full border-1.5 border-[#0A0F1E] text-[#0A0F1E] font-label-bold text-xs hover:bg-[#0A0F1E] hover:text-white transition-all active:scale-95"
              >
                Police Threat
              </button>
              <button 
                onClick={() => handlePrefill('Courier')}
                className="px-4 py-2 rounded-full border-1.5 border-[#0A0F1E] text-[#0A0F1E] font-label-bold text-xs hover:bg-[#0A0F1E] hover:text-white transition-all active:scale-95"
              >
                Courier Scam
              </button>
            </div>
          </div>
        </section>

        {/* Action Section */}
        <section className="flex flex-col items-center gap-md pt-base">
          <button 
            onClick={handleAnalyze}
            disabled={isLoading}
            className={`w-full ${isLoading ? 'bg-slate-400' : 'bg-[#E24B4A]'} text-white font-label-bold py-5 rounded-lg shadow-xl shadow-[#E24B4A]/20 transition-all duration-200 active:scale-95 flex items-center justify-center gap-3`}
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ANALYZING...
              </>
            ) : (
              <>
                ANALYZE NOW
                <span className="material-symbols-outlined fill">shield_with_heart</span>
              </>
            )}
          </button>
          
          {isLoading && (
            <p className="text-xs text-[#E24B4A] font-bold animate-pulse uppercase tracking-widest mt-2">
              {statusMessage}
            </p>
          )}

          {error && (
            <p className="text-sm text-[#E24B4A] font-medium bg-[#E24B4A]/5 px-4 py-2 rounded-lg border border-[#E24B4A]/20 mt-2">
              {error}
            </p>
          )}
          <div className="flex items-center gap-2 text-slate-500">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            <span className="font-label-sm text-label-sm">Privacy Protected • Logs are not stored</span>
          </div>
        </section>

        {/* Visual Anchor: AI Core Status */}
        <section className="mt-xl flex justify-center">
          <div className="relative flex flex-col items-center">
            <div className="pulse-ring w-12 h-12 rounded-full border-2 border-[#E24B4A] flex items-center justify-center mb-sm">
              <span className="material-symbols-outlined text-[#E24B4A] fill">graphic_eq</span>
            </div>
            <span className="font-label-sm text-label-sm text-slate-500 tracking-[0.2em] uppercase">AI Pattern Matcher Active</span>
          </div>
        </section>
      </main>

      {/* BottomNavBar Component */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-2 bg-[#0A0F1E] border-t border-[#161E31] shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <Link href="/home" className="flex flex-col items-center justify-center text-slate-500 gap-1 hover:text-white transition-colors active:scale-90 duration-150">
          <span className="material-symbols-outlined">home</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Home</span>
        </Link>
        <Link href="/analyze" className="flex flex-col items-center justify-center text-[#E24B4A] gap-1 hover:text-white transition-colors active:scale-90 duration-150">
          <span className="material-symbols-outlined fill">security</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Protect</span>
        </Link>
        <Link href="/learn" className="flex flex-col items-center justify-center text-slate-500 gap-1 hover:text-white transition-colors active:scale-90 duration-150">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Learn</span>
        </Link>
        <button className="flex flex-col items-center justify-center text-slate-500 gap-1 hover:text-white transition-colors active:scale-90 duration-150">
          <span className="material-symbols-outlined">history</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Logs</span>
        </button>
      </nav>
    </div>
  );
}
