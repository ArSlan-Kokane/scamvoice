'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const router = useRouter();

  return (
    <div className="bg-[#0A0F1E] text-on-surface min-h-screen pb-32 font-['Plus_Jakarta_Sans']">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 h-16 bg-[#0A0F1E] border-b border-[#161E31] shadow-none">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#E24B4A] fill">shield</span>
          <h1 className="text-white text-lg font-extrabold tracking-widest uppercase">ScamVoice AI</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-bold tracking-tight text-[12px] px-2 py-1 border border-[#161E31] rounded-full">PRIVATE</span>
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:opacity-80 transition-all duration-200 active:scale-95">menu</span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-24 px-5 pb-24 max-w-3xl mx-auto">
        {/* Header Section */}
        <section className="mb-10 text-center sm:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">Security Logs</h2>
          <p className="text-slate-400 font-medium">Review your history of intercepted threats and verified calls.</p>
        </section>

        {/* Search Bar */}
        <section className="mb-12">
          <div className="relative group max-w-xl mx-auto sm:mx-0">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#E24B4A] transition-colors text-2xl">search</span>
            <input 
              className="w-full bg-[#161E31]/80 backdrop-blur-sm border border-[#2A354F] rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:border-[#E24B4A] focus:ring-2 focus:ring-[#E24B4A]/20 transition-all text-base shadow-lg placeholder:text-slate-600" 
              placeholder="Search logs by keyword or date..." 
              type="text"
            />
          </div>
        </section>

        {/* Logs List */}
        <section className="grid grid-cols-1 gap-6">
          {/* Scam Log Card */}
          <div className="bg-[#161E31] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-6 border border-[#2A354F] border-l-[6px] border-l-[#E24B4A] transition-transform hover:scale-[1.01] duration-300">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#E24B4A] text-white font-black text-[9px] px-2 py-1 rounded-md uppercase tracking-widest shadow-md shadow-[#E24B4A]/20">SCAM</span>
                  <h3 className="font-bold text-white text-lg uppercase tracking-tight">LIVE ANALYSIS (98%)</h3>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-base">calendar_today</span> Oct 24, 2023</span>
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-base">schedule</span> 14:32 PM</span>
                </div>
              </div>
              <button className="p-2 hover:bg-[#2A354F] rounded-full transition-colors">
                <span className="material-symbols-outlined text-slate-400">more_vert</span>
              </button>
            </div>
            
            <div className="bg-[#0A0F1E] p-4 rounded-2xl flex items-center justify-between border border-[#2A354F]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E24B4A]/10 flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-[#E24B4A] fill text-2xl">record_voice_over</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Incoming Voice Call</p>
                  <p className="text-slate-500 text-xs font-medium">Deepfake Patterns Detected</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-500">chevron_right</span>
            </div>
          </div>

          {/* Verified Log Card */}
          <div className="bg-[#161E31] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-6 border border-[#2A354F] border-l-[6px] border-l-[#414658] transition-transform hover:scale-[1.01] duration-300">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#414658] text-white font-black text-[9px] px-2 py-1 rounded-md uppercase tracking-widest">VERIFIED</span>
                  <h3 className="font-bold text-white text-lg uppercase tracking-tight">TRANSCRIPT SCAN (02%)</h3>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-base">calendar_today</span> Oct 23, 2023</span>
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-base">schedule</span> 09:15 AM</span>
                </div>
              </div>
              <button className="p-2 hover:bg-[#2A354F] rounded-full transition-colors">
                <span className="material-symbols-outlined text-slate-400">more_vert</span>
              </button>
            </div>
            
            <div className="bg-[#0A0F1E] p-4 rounded-2xl flex items-center justify-between border border-[#2A354F]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2A354F] flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-slate-300 fill text-2xl">description</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">SMS Transcript</p>
                  <p className="text-slate-500 text-xs font-medium">Official Banking Communication</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-500">chevron_right</span>
            </div>
          </div>

          {/* Unknown Log Card */}
          <div className="bg-[#161E31] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-6 border border-[#2A354F] border-l-[6px] border-l-[#8890a8] transition-transform hover:scale-[1.01] duration-300">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#8890a8] text-white font-black text-[9px] px-2 py-1 rounded-md uppercase tracking-widest">UNKNOWN</span>
                  <h3 className="font-bold text-white text-lg uppercase tracking-tight">LIVE ANALYSIS (42%)</h3>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-base">calendar_today</span> Oct 22, 2023</span>
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-base">schedule</span> 18:45 PM</span>
                </div>
              </div>
              <button className="p-2 hover:bg-[#2A354F] rounded-full transition-colors">
                <span className="material-symbols-outlined text-slate-400">more_vert</span>
              </button>
            </div>
            
            <div className="bg-[#0A0F1E] p-4 rounded-2xl flex items-center justify-between border border-[#2A354F]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2A354F] flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-slate-300 fill text-2xl">call</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Incoming PSTN Call</p>
                  <p className="text-slate-500 text-xs font-medium">Inconclusive Voice Sample</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-500">chevron_right</span>
            </div>
          </div>
        </section>

        {/* Download Action */}
        <section className="mt-16 flex flex-col items-center">
          <button className="w-full max-w-md bg-[#E24B4A] text-white font-black py-5 rounded-2xl shadow-2xl shadow-[#E24B4A]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] hover:brightness-110">
            <span className="material-symbols-outlined text-2xl">download</span>
            EXPORT HISTORY
          </button>
          <div className="mt-6 flex items-center gap-2 text-slate-500">
            <span className="material-symbols-outlined text-sm">lock</span>
            <p className="text-[10px] font-bold uppercase tracking-widest">Logs are end-to-end encrypted and local</p>
          </div>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-22 px-6 bg-[#0A0F1E]/90 backdrop-blur-lg border-t border-[#161E31] shadow-[0_-4px_30px_rgba(0,0,0,0.8)]">
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
