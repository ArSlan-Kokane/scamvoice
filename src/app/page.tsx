'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex-grow flex flex-col items-center justify-center relative px-margin min-h-screen bg-background text-on-background font-body-md overflow-hidden">
      {/* Abstract Background Detail */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Identity Cluster */}
      <div className="z-10 flex flex-col items-center text-center">
        {/* Shield Logo Container */}
        <div className="mb-lg relative">
          <div className="absolute inset-0 bg-primary-container/20 blur-2xl rounded-full"></div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
            <span className="material-symbols-outlined text-[80px] md:text-[100px] text-[#E24B4A] fill">shield</span>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-headline-xl text-headline-xl text-white mb-xs tracking-tight">
          ScamVoice AI
        </h1>

        {/* Tagline */}
        <p className="font-body-lg text-tertiary text-opacity-80 tracking-wide">
          Protecting people after pickup.
        </p>
      </div>

      {/* System Loading State */}
      <div className="absolute bottom-xl left-0 w-full px-xl flex flex-col items-center">
        <div className="w-full max-w-xs space-y-md">
          <div className="flex justify-between items-end">
            <span className="font-label-bold text-label-sm text-[#E24B4A] tracking-[0.2em] uppercase">
              SYSTEM INITIALIZING
            </span>
            <span className="font-label-bold text-label-sm text-slate-500">
              VER 2.0.4
            </span>
          </div>

          {/* Progress Track */}
          <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[64%] bg-[#E24B4A] relative">
              <div className="absolute inset-0 loading-shimmer"></div>
            </div>
          </div>

          <div className="flex justify-center gap-base">
            <span className="material-symbols-outlined text-[14px] text-slate-500">lock</span>
            <span className="font-label-sm text-[10px] text-slate-500 uppercase tracking-widest">Secure Handshake Protocol Active</span>
          </div>
        </div>
      </div>

      {/* Aesthetic Decorative Corner Accents */}
      <div className="fixed top-0 left-0 w-32 h-32 border-t border-l border-[#E24B4A]/20 m-margin opacity-30"></div>
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b border-r border-[#E24B4A]/20 m-margin opacity-30"></div>
    </main>
  );
}
