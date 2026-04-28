'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LearnScamsPage() {
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const scams = [
    {
      id: 'digital-arrest',
      title: 'Digital Arrest',
      icon: 'policy',
      risk: 'High Risk',
      description: 'Scammers pose as law enforcement via video calls, claiming you are under "digital arrest" for money laundering.',
      protocol: 'Stay on the call? No. Hang up immediately. Police never arrest people over video calls. Contact your local station if worried.'
    },
    {
      id: 'otp-scam',
      title: 'OTP Scam',
      icon: 'password',
      risk: 'Medium Risk',
      description: 'Social engineering tactics used to trick victims into sharing One-Time Passwords for unauthorized bank transfers.',
      protocol: 'Never share OTP with anyone, including bank officials. Banks will never ask for OTP over the phone.'
    },
    {
      id: 'kyc-scam',
      title: 'KYC Scam',
      icon: 'badge',
      risk: 'Medium Risk',
      description: 'Urgent messages claiming your bank account or SIM will be blocked unless you update KYC via a malicious link.',
      protocol: 'Visit your bank branch or use the official mobile app for KYC. Never click links in SMS.'
    },
    {
      id: 'job-scam',
      title: 'Job Scam',
      icon: 'work',
      risk: 'Medium Risk',
      description: 'Fake high-paying work-from-home offers that require initial "processing fees" or security deposits.',
      protocol: 'Legitimate companies never ask for money to give you a job. Research the company independently.'
    },
    {
      id: 'courier-scam',
      title: 'Courier Scam',
      icon: 'local_shipping',
      risk: 'High Risk',
      description: 'Fraudsters claim a package in your name contains illegal substances and demand a settlement to avoid legal action.',
      protocol: 'Check the official tracking on the courier website. Do not pay any "customs fees" to individuals.'
    }
  ];

  return (
    <div className="bg-[#0A0F1E] text-on-surface font-['Plus_Jakarta_Sans'] min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 z-50 bg-[#0A0F1E] border-b border-[#161E31] shadow-none flex justify-between items-center w-full px-5 h-16">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/home')}>
          <span className="material-symbols-outlined text-[#E24B4A]">shield</span>
          <h1 className="text-white text-lg font-extrabold tracking-widest uppercase font-['Plus_Jakarta_Sans']">ScamVoice AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#E24B4A] font-bold tracking-tight font-['Plus_Jakarta_Sans'] text-sm uppercase">PRIVATE</span>
          <span className="material-symbols-outlined text-slate-400 hover:opacity-80 cursor-pointer">menu</span>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-32 px-5 max-w-2xl mx-auto w-full">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/home')}
          className="flex items-center gap-2 text-slate-400 mb-6 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-label-bold uppercase text-xs tracking-widest">Back to Home</span>
        </button>

        {/* Hero Section */}
        <section className="mb-10">
          <h2 className="font-headline-xl text-headline-xl text-white mb-2">Knowledge is Shield</h2>
          <p className="font-body-md text-body-md text-slate-400 leading-relaxed">
            Empower yourself against sophisticated financial fraud with our expert-curated security library.
          </p>
        </section>

        {/* Security Library List */}
        <div className="space-y-6">
          {scams.map((scam) => (
            <div 
              key={scam.id}
              className="bg-white rounded-xl overflow-hidden ambient-card-shadow transition-all duration-200 active:scale-[0.98] group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <span className="material-symbols-outlined text-[#E24B4A] text-3xl">{scam.icon}</span>
                  </div>
                  <span className="px-3 py-1 bg-[#E24B4A] text-white font-label-bold text-[10px] rounded-full uppercase tracking-wider">{scam.risk}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-[#0A0F1E] mb-2">{scam.title}</h3>
                <p className="font-body-md text-body-md text-[#0A0F1E]/70 mb-6">
                  {scam.description}
                </p>
                
                {expandedCard === scam.id && (
                  <div className="mb-6 p-4 bg-slate-50 border-l-4 border-[#E24B4A] animate-in slide-in-from-top duration-300">
                    <p className="text-sm font-label-bold text-[#0A0F1E] uppercase mb-2">PROTOCOL:</p>
                    <p className="text-sm text-[#0A0F1E]/80 leading-relaxed">{scam.protocol}</p>
                  </div>
                )}

                <button 
                  onClick={() => toggleExpand(scam.id)}
                  className="inline-flex items-center gap-2 text-[#E24B4A] font-label-bold uppercase text-sm border-b-2 border-[#E24B4A]/10 hover:border-[#E24B4A] transition-all"
                >
                  {expandedCard === scam.id ? 'CLOSE PROTOCOL' : 'READ PROTOCOL'}
                  <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${expandedCard === scam.id ? 'rotate-90' : ''}`}>
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reported Trends Banner */}
        <section className="mt-12 mb-8 relative overflow-hidden rounded-2xl bg-[#161E31] border border-[#2A354F] p-6">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-[#E24B4A] font-label-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E24B4A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E24B4A]"></span>
                </span>
                Reported Trends
              </h4>
              <p className="text-white font-headline-md text-xl mb-2">AI Voice Deepfakes Rising</p>
              <p className="text-slate-400 font-body-md text-sm">
                Scammers are now using 3-second voice clips to clone voices of family members. Verify via a secret safe-word.
              </p>
            </div>
            <button className="bg-[#E24B4A] text-white font-label-bold uppercase text-sm py-3 px-6 rounded transition-all active:scale-95 shrink-0">
              VIEW ALERT MAP
            </button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-white text-9xl fill">waves</span>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-2 bg-[#0A0F1E] border-t border-[#161E31] shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <Link href="/home" className="flex flex-col items-center justify-center text-slate-500 gap-1 active:scale-90 duration-150 hover:text-white transition-colors group">
          <span className="material-symbols-outlined">home</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Home</span>
        </Link>
        <Link href="/live" className="flex flex-col items-center justify-center text-slate-500 gap-1 active:scale-90 duration-150 hover:text-white transition-colors group">
          <span className="material-symbols-outlined">security</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Protect</span>
        </Link>
        <Link href="/learn" className="flex flex-col items-center justify-center text-[#E24B4A] gap-1 active:scale-90 duration-150">
          <span className="material-symbols-outlined fill">menu_book</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Learn</span>
        </Link>
        <button className="flex flex-col items-center justify-center text-slate-500 gap-1 active:scale-90 duration-150 hover:text-white transition-colors group">
          <span className="material-symbols-outlined">history</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Logs</span>
        </button>
      </nav>
    </div>
  );
}
