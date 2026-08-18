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

      {/* Top action buttons */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => {
            soundManager.playTap();
            onOpenBadges();
          }}
          className="p-2.5 md:p-3 bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 rounded-2xl shadow-lg border-2 border-amber-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-xs md:text-sm cursor-pointer"
          title="My Badges"
        >
          <Award className="w-5 h-5" />
          <span className="hidden sm:inline">Badges</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            onOpenSettings();
          }}
          className="p-2.5 md:p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl shadow-lg border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Game Settings"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Central Welcome Card */}
      <div className="relative z-10 w-full max-w-xl my-auto bg-white dark:bg-slate-900 backdrop-blur-md rounded-3xl p-5 md:p-8 border-4 border-amber-400 dark:border-slate-700 shadow-2xl text-center flex flex-col items-center max-h-[92vh] overflow-y-auto">
        {/* Mini Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-300 border border-emerald-400 dark:border-emerald-700 font-black text-xs md:text-sm uppercase tracking-wider mb-2 shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Learn • Play • Grow
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-3 my-1">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white font-black text-2xl md:text-4xl flex items-center justify-center border-4 border-rose-200 shadow-md transform -rotate-6">
            ×
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-amber-600 dark:text-amber-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] font-['Fredoka',sans-serif]">
            Multi Play!
          </h1>
        </div>

        <p className="text-slate-900 dark:text-slate-200 text-sm md:text-lg font-black mt-1 mb-4 max-w-md">
          A colorful times-table adventure made just for you!
        </p>

        {/* Game Mini Vector Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-md mb-6">
          <div className="bg-amber-50 dark:bg-slate-800 p-2 rounded-2xl border border-amber-300 dark:border-slate-700 flex flex-col items-center shadow-xs">
            <FishVector size={32} variant={0} className="mb-0.5" />
            <span className="text-[11px] md:text-xs font-black text-slate-950 dark:text-white">Fish Catch</span>
          </div>
          <div className="bg-purple-50 dark:bg-slate-800 p-2 rounded-2xl border border-purple-300 dark:border-slate-700 flex flex-col items-center shadow-xs">
            <ButterflyVector size={32} variant={0} className="mb-0.5" />
            <span className="text-[11px] md:text-xs font-black text-slate-950 dark:text-white">Butterfly</span>
          </div>
          <div className="bg-rose-50 dark:bg-slate-800 p-2 rounded-2xl border border-rose-300 dark:border-slate-700 flex flex-col items-center shadow-xs">
            <BalloonVector size={28} variant={0} className="mb-0.5" />
            <span className="text-[11px] md:text-xs font-black text-slate-950 dark:text-white">Balloon Pop</span>
          </div>
          <div className="bg-emerald-50 dark:bg-slate-800 p-2 rounded-2xl border border-emerald-300 dark:border-slate-700 flex flex-col items-center shadow-xs">
            <AppleVector size={32} className="mb-0.5" />
            <span className="text-[11px] md:text-xs font-black text-slate-950 dark:text-white">Harvest</span>
          </div>
        </div>

        {/* Primary Let's Play Button */}
        <button
          id="startBtn"
          onClick={handlePlayClick}
          className="w-full max-w-sm py-3.5 md:py-4 px-6 md:px-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-400 hover:to-green-400 active:scale-95 text-white font-black text-xl md:text-3xl rounded-full shadow-[0_6px_0_#065f46,0_12px_18px_rgba(0,0,0,0.18)] hover:shadow-[0_3px_0_#065f46,0_8px_12px_rgba(0,0,0,0.18)] transition-all flex items-center justify-center gap-3 border-4 border-emerald-200 cursor-pointer"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-inner">
            <Play className="w-5 h-5 md:w-6 md:h-6 fill-current translate-x-0.5" />
          </div>
          <span>Let's Play!</span>
        </button>
      </div>
    </div>
  );
};
