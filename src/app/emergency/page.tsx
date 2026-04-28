'use client';

import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import { AnalysisResult } from '@/lib/analyzer';

export default function EmergencyPanicPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('analysisResult');
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing stored result:', e);
      }
    }
  }, []);

  const handleCallTrusted = () => {
    window.open('tel:', '_self');
  };

  const handleHangUp = () => {
    sessionStorage.removeItem('analysisResult');
    router.push('/home');
  };

  return (
    <div className="bg-[#0A0F1E] text-on-surface font-body-md min-h-screen overflow-hidden">
      {/* Emergency Full Screen Takeover */}
      <main className="relative h-screen flex flex-col justify-between p-margin bg-gradient-alert overflow-y-auto">
        {/* Header Brand Anchor */}
        <header className="flex justify-between items-center w-full px-5 h-16 fixed top-0 left-0 z-50 bg-[#0A0F1E]/80 backdrop-blur-md border-b border-[#161E31]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#E24B4A]">shield</span>
            <span className="text-white text-lg font-extrabold tracking-widest uppercase font-['Plus_Jakarta_Sans']">ScamVoice AI</span>
          </div>
          <span className="text-[#E24B4A] font-['Plus_Jakarta_Sans'] font-bold tracking-tight">PRIVATE</span>
        </header>

        {/* Alert Content Canvas */}
        <div className="mt-20 flex-grow flex flex-col items-center justify-center text-center space-y-md max-w-lg mx-auto">
          {/* Warning Visual */}
          <div className="relative mb-lg">
            <div className="security-pulse rounded-full p-lg bg-[#E24B4A]">
              <span className="material-symbols-outlined text-6xl text-white fill">warning</span>
            </div>
          </div>

          {/* Warning Strip */}
          <div className="w-full py-base bg-[#E24B4A] border-y border-white/20 shadow-xl">
            <span className="font-label-bold text-white block">
              {result ? `THREAT DETECTED: ${result.scam_type}` : 'SCAMVOICE DETECTED: Known scam pattern identified.'}
            </span>
          </div>

          {/* Headline Section */}
          <div className="space-y-sm px-base">
            <h1 className="font-headline-xl text-white leading-tight">
              {result?.verdict === 'SCAM' ? 'Active Scam Detected' : 'Highly Suspicious Call'}
            </h1>
            <p className="font-body-lg text-slate-300">
              {result?.summary || 'The caller is using manipulation tactics common in financial fraud.'}
            </p>
          </div>

          {/* Bento/Grid Action Advice */}
          <div className="grid grid-cols-1 gap-gutter w-full mt-md">
            {/* Advice Card 1 */}
            <div className="bg-white rounded-xl p-md flex items-center gap-md shadow-[0_10px_30px_rgba(4,7,15,0.15)] border-2 border-[#E24B4A]">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#0A0F1E]">self_improvement</span>
              </div>
              <div className="text-left">
                <p className="font-label-bold text-[#0A0F1E] uppercase">Stay calm</p>
                <p className="font-label-sm text-slate-600">The caller uses fear to manipulate you.</p>
              </div>
            </div>

            {/* Advice Card 2 */}
            <div className="bg-white rounded-xl p-md flex items-center gap-md shadow-[0_10px_30px_rgba(4,7,15,0.15)]">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#0A0F1E]">call_end</span>
              </div>
              <div className="text-left">
                <p className="font-label-bold text-[#0A0F1E] uppercase">Hang up now</p>
                <p className="font-label-sm text-slate-600">Disconnecting is your primary defense.</p>
              </div>
            </div>

            {/* Advice Card 3 */}
            <div className="bg-white rounded-xl p-md flex items-center gap-md shadow-[0_10px_30px_rgba(4,7,15,0.15)]">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#0A0F1E]">fact_check</span>
              </div>
              <div className="text-left">
                <p className="font-label-bold text-[#0A0F1E] uppercase">Verify independently</p>
                <p className="font-label-sm text-slate-600">Contact the official agency directly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <footer className="w-full mt-lg pb-xl space-y-gutter px-base">
          <button
            onClick={handleHangUp}
            className="w-full py-lg bg-[#E24B4A] text-white font-label-bold text-lg rounded-xl shadow-2xl transition-all duration-200 active:scale-95 border-2 border-white/30"
          >
            HANG UP NOW
          </button>
          <button
            onClick={handleCallTrusted}
            className="w-full py-lg bg-transparent border-2 border-white text-white font-label-bold text-lg rounded-xl transition-all duration-200 active:scale-95"
          >
            CALL SOMEONE YOU TRUST
          </button>
        </footer>

        {/* Risk Context Visual */}
        <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#E24B4A] rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#E24B4A] rounded-full blur-[100px]"></div>
        </div>

        {/* Background Identity Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover -z-20 opacity-5"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpP8zuXEoiOUIdld0ni3-lxCcgILp5Zd0jV1kopt1MDsQiGoHe9SzLzvPLvhTrj1xcMxDCscLlJEkQVPO5ExoQJm29TfT67Td59yUKV9ZIaN_lrWMHIepPffNYV8LrIILsmjAY_X5y7twzirUoYFZiJO3m9ukrlmQktjzgP67yAdKDu_E0ugFoWIChxw1oxlYslT8JAqz7aqET_e9QeZJQUJ3nClYSFaNA1tUBeO3Z2VEPm2cHGAY76WPgzqCBE9wbx8eUxqAnwyo"
          alt="Abstract Background"
        />
      </main>
    </div>
  );
}
