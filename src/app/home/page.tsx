'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="bg-[#0A0F1E] text-on-surface font-body-md min-h-screen pb-32">
      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full px-5 h-16 bg-[#0A0F1E] docked full-width top-0 border-b border-[#161E31] z-50 sticky">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#E24B4A]">shield</span>
          <h1 className="text-white text-lg font-extrabold tracking-widest uppercase font-['Plus_Jakarta_Sans']">ScamVoice AI</h1>
        </div>
        <div className="px-3 py-1 bg-[#161E31] rounded-full border border-[#2A354F] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E24B4A]"></span>
          <span className="text-[10px] font-bold tracking-widest text-white uppercase">PRIVATE</span>
        </div>
      </header>

      <main className="px-5 pt-6">
        {/* Hero Section */}
        <section className="mb-lg">
          <h2 className="font-headline-xl text-headline-xl text-white mb-2">Stay Safe Right Now</h2>
          <p className="font-body-md text-body-md text-slate-400">AI help during suspicious calls.</p>
        </section>

        {/* Main Action Stack */}
        <div className="space-y-4">
          {/* Primary Action */}
          <button 
            onClick={() => router.push('/live')}
            className="w-full bg-[#E24B4A] rounded-xl p-6 flex items-center justify-between transition-all duration-200 active:scale-95 group relative overflow-hidden"
          >
            <div className="flex flex-col items-start text-left z-10">
              <span className="font-label-bold text-white mb-1">Start Live Protection</span>
              <span className="text-xs text-white/80 font-medium">Real-time AI voice scanning</span>
            </div>
            <div className="relative z-10 flex items-center justify-center w-12 h-12">
              <div className="absolute inset-0 bg-white/20 rounded-full pulse-ring"></div>
              <div className="absolute inset-0 bg-white/10 rounded-full pulse-ring" style={{ animationDelay: '0.5s' }}></div>
              <span className="material-symbols-outlined text-white text-3xl fill">sensors</span>
            </div>
          </button>

          {/* Secondary Action 1 */}
          <button 
            onClick={() => router.push('/analyze')}
            className="w-full bg-[#161E31] rounded-xl p-6 border border-[#2A354F] flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95 group hover:bg-[#2A354F]/50"
          >
            <div className="flex flex-col items-start text-left">
              <span className="font-label-bold text-white mb-1">Analyze Transcript</span>
              <span className="text-xs text-slate-400 font-medium">Paste text for risk scoring</span>
            </div>
            <span className="material-symbols-outlined text-white">description</span>
          </button>

          {/* Secondary Action 2 */}
          <button 
            onClick={() => router.push('/demo')}
            className="w-full bg-[#161E31] rounded-xl p-6 border border-[#2A354F] flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95 group hover:bg-[#2A354F]/50"
          >
            <div className="flex flex-col items-start text-left">
              <span className="font-label-bold text-white mb-1">Try Demo</span>
              <span className="text-xs text-slate-400 font-medium">Simulate a scam interaction</span>
            </div>
            <span className="material-symbols-outlined text-white">play_circle</span>
          </button>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div 
            onClick={() => router.push('/learn')}
            className="bg-[#161E31] p-6 rounded-xl border border-[#2A354F] transition-all hover:opacity-80 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#E24B4A] mb-sm">menu_book</span>
            <p className="font-label-bold text-white text-xs uppercase tracking-wider">Learn Scams</p>
          </div>
          <div 
            onClick={() => router.push('/history')}
            className="bg-[#161E31] p-6 rounded-xl border border-[#2A354F] transition-all hover:opacity-80 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#E24B4A] mb-sm">history</span>
            <p className="font-label-bold text-white text-xs uppercase tracking-wider">History</p>
          </div>
        </div>

        {/* Security Badge Image Section */}
        <div className="mt-lg relative h-40 rounded-xl overflow-hidden group">
          <img 
            alt="Security Concept" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtyObvAUxZEWRPswg9jQ6ZXUcU6mAIRoRPomR5o416CgV4t_CBh52OTQRhx77BVBEjFSxTrAj-AJk_gZym7W0j1jLBGxYAWJt8iUwnpmPNNqHCBjlBKBHAJ0waqp05cFYhsU8jT-ob5kKB61NO1mxyfPo5rZCADzm9PbLf5j9PccRP0LLOZ51DJIkY3eNSLq0SURbiR6r2Tj6utanwlyIn1lyaXxp82sEL8kZ-AS-tdRjHmxJWlqcIn2LWubo9jnazJlkFT8PzZRA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
            <div className="p-2 bg-[#E24B4A]/20 backdrop-blur-md rounded-lg">
              <span className="material-symbols-outlined text-[#E24B4A] fill">gpp_good</span>
            </div>
            <p className="text-[10px] font-label-bold text-slate-300 uppercase tracking-widest">Enterprise grade voice analysis active</p>
          </div>
        </div>

        {/* Trust Note */}
        <div className="mt-xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#161E31] bg-[#0c1221]">
            <span className="material-symbols-outlined text-slate-500 text-sm">lock_reset</span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">No permanent storage.</span>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-2 bg-[#0A0F1E] border-t border-[#161E31] shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <Link href="/home" className="flex flex-col items-center justify-center text-[#E24B4A] gap-1 transition-all duration-150 active:scale-90">
          <span className="material-symbols-outlined fill">home</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Home</span>
        </Link>
        <Link href="/live" className="flex flex-col items-center justify-center text-slate-500 gap-1 transition-all duration-150 active:scale-90 hover:text-white">
          <span className="material-symbols-outlined">security</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Protect</span>
        </Link>
        <Link href="/learn" className="flex flex-col items-center justify-center text-slate-500 gap-1 transition-all duration-150 active:scale-90 hover:text-white">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Learn</span>
        </Link>
        <Link href="/history" className="flex flex-col items-center justify-center text-slate-500 gap-1 transition-all duration-150 active:scale-90 hover:text-white">
          <span className="material-symbols-outlined">history</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold uppercase tracking-tighter">Logs</span>
        </Link>
      </nav>
    </div>
  );
}
