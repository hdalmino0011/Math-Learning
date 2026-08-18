import React from 'react';
import { Play, Sparkles, Settings as SettingsIcon, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';
import {
  SunVector,
  MoonVector,
  CloudVector,
  FishVector,
  ButterflyVector,
  BalloonVector,
  AppleVector,
} from './illustrations/VectorGraphics';

interface SplashScreenProps {
  onStart: () => void;
  onOpenSettings: () => void;
  onOpenBadges: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onStart,
  onOpenSettings,
  onOpenBadges,
}) => {
  const handlePlayClick = () => {
    soundManager.unlockAudio();
    soundManager.playStartGame();
    onStart();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-3 md:p-6 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 select-none">
      {/* Sky Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sun / Moon Vector */}
        <div className="absolute top-4 right-6 md:top-6 md:right-8">
          <div className="dark:hidden">
            <SunVector size={72} className="animate-pulse" />
          </div>
          <div className="hidden dark:block">
            <MoonVector size={72} className="animate-pulse" />
          </div>
        </div>

        {/* Clouds / Sparkles */}
        <div className="absolute top-8 left-6 md:top-10 md:left-10 animate-bounce duration-1000">
          <div className="dark:hidden">
            <CloudVector size={80} />
          </div>
          <div className="hidden dark:flex items-center gap-2 text-amber-200">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>
        </div>
        <div className="absolute top-20 right-1/4 animate-pulse">
          <div className="dark:hidden">
            <CloudVector size={60} />
          </div>
          <div className="hidden dark:block text-indigo-200">
            <Sparkles className="w-6 h-6 text-indigo-300" />
          </div>
        </div>

        {/* Floating Math Bubbles */}
        <div className="hidden sm:block absolute top-1/4 left-4 md:left-12 bg-purple-600 text-white font-black px-4 py-2 rounded-2xl border-4 border-white shadow-lg text-lg md:text-2xl animate-bounce">
          2 × 3 = 6
        </div>
        <div className="hidden sm:block absolute top-1/3 right-4 md:right-16 bg-pink-600 text-white font-black px-4 py-2 rounded-2xl border-4 border-white shadow-lg text-lg md:text-2xl animate-bounce delay-300">
          5 × 4 = 20
        </div>
        <div className="hidden sm:block absolute bottom-24 left-6 md:left-20 bg-amber-600 text-white font-black px-4 py-2 rounded-2xl border-4 border-white shadow-lg text-lg md:text-2xl animate-bounce delay-700">
          7 × 3 = 21
        </div>
        <div className="hidden sm:block absolute bottom-20 right-6 md:right-20 bg-emerald-600 text-white font-black px-4 py-2 rounded-2xl border-4 border-white shadow-lg text-lg md:text-2xl animate-bounce delay-500">
          9 × 2 = 18
        </div>

        {/* Green Hills in Background */}
        <div className="absolute -bottom-20 -left-20 w-[120%] h-48 md:h-56 bg-emerald-400/80 dark:bg-emerald-900/40 rounded-t-[100%]"></div>
        <div className="absolute -bottom-24 -right-10 w-[110%] h-56 md:h-64 bg-emerald-500 dark:bg-emerald-950/60 rounded-t-[100%]"></div>
      </div>

      {/* Top action buttons header */}
      <header className="w-full max-w-5xl flex items-center justify-between z-20 px-2 py-2 mb-auto">
        <div className="flex items-center gap-2">
          {/* Subtle branding or empty spacer for balance */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 dark:bg-slate-900/75 backdrop-blur-sm text-emerald-900 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 font-black text-xs md:text-sm shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-extrabold">Times Tables Adventure</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="startBadgesBtn"
            onClick={() => {
              soundManager.playTap();
              onOpenBadges();
            }}
            className="px-3 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-amber-700 dark:text-amber-300 rounded-2xl shadow-md border-2 border-amber-300/80 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-xs md:text-sm cursor-pointer"
            title="My Badges"
          >
            <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-600 dark:text-amber-400" />
            <span className="font-black">Badges</span>
          </button>

          <button
            id="startSettingsBtn"
            onClick={() => {
              soundManager.playTap();
              onOpenSettings();
            }}
            className="p-2 md:p-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-800 dark:text-slate-100 rounded-2xl shadow-md border-2 border-slate-300/80 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Game Settings"
          >
            <SettingsIcon className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </header>

      {/* Central Content Area - Fully Transparent Background */}
      <main className="relative z-10 w-full max-w-xl my-auto text-center flex flex-col items-center px-4 py-2">
        {/* Mini Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-600 text-white font-black text-xs md:text-sm uppercase tracking-wider mb-2 shadow-md border-2 border-emerald-300">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Learn • Play • Grow
        </div>

        {/* Title with drop shadow */}
        <div className="flex items-center justify-center gap-3 my-2">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white font-black text-3xl md:text-4xl flex items-center justify-center border-4 border-white shadow-xl transform -rotate-6">
            ×
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-amber-500 dark:text-amber-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] font-['Fredoka',sans-serif] [-webkit-text-stroke:1.5px_#78350f] dark:[-webkit-text-stroke:1px_#451a03]">
            Multi Play!
          </h1>
        </div>

        <p className="text-slate-900 dark:text-white text-base md:text-xl font-black mt-1 mb-5 max-w-md drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          A colorful times-table adventure made just for you!
        </p>

        {/* Game Mini Vector Badges with Translucent Glass Styling */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-lg mb-6">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-2.5 rounded-2xl border-2 border-amber-300/80 dark:border-slate-600 flex flex-col items-center shadow-md">
            <FishVector size={34} variant={0} className="mb-0.5" />
            <span className="text-xs font-black text-slate-950 dark:text-white">Fish Catch</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-2.5 rounded-2xl border-2 border-purple-300/80 dark:border-slate-600 flex flex-col items-center shadow-md">
            <ButterflyVector size={34} variant={0} className="mb-0.5" />
            <span className="text-xs font-black text-slate-950 dark:text-white">Butterfly</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-2.5 rounded-2xl border-2 border-rose-300/80 dark:border-slate-600 flex flex-col items-center shadow-md">
            <BalloonVector size={30} variant={0} className="mb-0.5" />
            <span className="text-xs font-black text-slate-950 dark:text-white">Balloon Pop</span>
          </div>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-2.5 rounded-2xl border-2 border-emerald-300/80 dark:border-slate-600 flex flex-col items-center shadow-md">
            <AppleVector size={34} className="mb-0.5" />
            <span className="text-xs font-black text-slate-950 dark:text-white">Harvest</span>
          </div>
        </div>

        {/* Primary Let's Play Button */}
        <button
          id="startBtn"
          onClick={handlePlayClick}
          className="w-full max-w-md py-4 px-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-400 hover:to-green-400 active:scale-95 text-white font-black text-2xl md:text-3xl rounded-full shadow-[0_8px_0_#065f46,0_14px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_0_#065f46,0_10px_16px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-3 border-4 border-white dark:border-emerald-200 cursor-pointer"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-inner">
            <Play className="w-6 h-6 md:w-7 md:h-7 fill-current translate-x-0.5" />
          </div>
          <span>Let's Play!</span>
        </button>
      </main>

      {/* Bottom spacer for balance */}
      <footer className="w-full max-w-5xl z-20 py-2 mt-auto text-center">
        <p className="text-[11px] md:text-xs font-bold text-slate-800/80 dark:text-slate-300/80">
          Practice 1× to 12× Tables with Mini-Games
        </p>
      </footer>
    </div>
  );
};
