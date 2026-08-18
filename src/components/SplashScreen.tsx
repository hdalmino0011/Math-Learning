import React from 'react';
import { Play, Sparkles, Settings as SettingsIcon, Award, Download, Smartphone } from 'lucide-react';
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
  onOpenInstall: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onStart,
  onOpenSettings,
  onOpenBadges,
  onOpenInstall,
}) => {
  const handlePlayClick = () => {
    soundManager.unlockAudio();
    soundManager.playStartGame();
    onStart();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 select-none">
      {/* Sky Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sun / Moon Vector */}
        <div className="absolute top-6 right-8">
          <div className="dark:hidden">
            <SunVector size={80} className="animate-pulse" />
          </div>
          <div className="hidden dark:block">
            <MoonVector size={80} className="animate-pulse" />
          </div>
        </div>

        {/* Clouds / Sparkles */}
        <div className="absolute top-10 left-10 animate-bounce duration-1000">
          <div className="dark:hidden">
            <CloudVector size={90} />
          </div>
          <div className="hidden dark:flex items-center gap-2 text-amber-200">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>
        </div>
        <div className="absolute top-28 right-1/4 animate-pulse">
          <div className="dark:hidden">
            <CloudVector size={70} />
          </div>
          <div className="hidden dark:block text-indigo-200">
            <Sparkles className="w-6 h-6 text-indigo-300" />
          </div>
        </div>

        {/* Floating Math Bubbles */}
        <div className="absolute top-1/4 left-4 md:left-16 bg-purple-500/95 text-white font-black px-4 py-2 rounded-2xl border-4 border-white shadow-lg text-lg md:text-2xl animate-bounce">
          2 × 3 = 6
        </div>
        <div className="absolute top-1/3 right-4 md:right-20 bg-pink-500/95 text-white font-black px-4 py-2 rounded-2xl border-4 border-white shadow-lg text-lg md:text-2xl animate-bounce delay-300">
          5 × 4 = 20
        </div>
        <div className="absolute bottom-32 left-8 md:left-24 bg-amber-500/95 text-white font-black px-4 py-2 rounded-2xl border-4 border-white shadow-lg text-lg md:text-2xl animate-bounce delay-700">
          7 × 3 = 21
        </div>
        <div className="absolute bottom-28 right-8 md:right-28 bg-emerald-500/95 text-white font-black px-4 py-2 rounded-2xl border-4 border-white shadow-lg text-lg md:text-2xl animate-bounce delay-500">
          9 × 2 = 18
        </div>

        {/* Green Hills in Background */}
        <div className="absolute -bottom-20 -left-20 w-[120%] h-56 bg-emerald-400/80 dark:bg-emerald-900/40 rounded-t-[100%]"></div>
        <div className="absolute -bottom-24 -right-10 w-[110%] h-64 bg-emerald-500 dark:bg-emerald-950/60 rounded-t-[100%]"></div>
      </div>

      {/* Top action buttons */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => {
            soundManager.playTap();
            onOpenInstall();
          }}
          className="p-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl shadow-lg border-2 border-emerald-300 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-xs md:text-sm animate-pulse"
          title="Install on Phone"
        >
          <Download className="w-4 h-4" />
          <span>Install App</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            onOpenBadges();
          }}
          className="p-3 bg-white/90 dark:bg-slate-800 text-amber-600 dark:text-amber-400 rounded-2xl shadow-lg border-2 border-amber-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-bold text-sm"
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
          className="p-3 bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl shadow-lg border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all"
          title="Game Settings"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Central Welcome Card */}
      <div className="relative z-10 w-full max-w-xl bg-white/95 dark:bg-slate-850/95 backdrop-blur-md rounded-3xl p-6 md:p-10 border-4 border-amber-300 dark:border-slate-700 shadow-2xl text-center flex flex-col items-center">
        {/* Mini Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-extrabold text-xs md:text-sm uppercase tracking-wider mb-3 shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Learn • Play • Grow
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-3 my-2">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white font-black text-3xl md:text-5xl flex items-center justify-center border-4 border-rose-200 shadow-md transform -rotate-6">
            ×
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-amber-500 dark:text-amber-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)] font-['Fredoka',sans-serif]">
            Multi Play!
          </h1>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-base md:text-xl font-bold mt-2 mb-6 max-w-md">
          A colorful times-table adventure made just for you!
        </p>

        {/* Game Mini Vector Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-md mb-8">
          <div className="bg-amber-50 dark:bg-slate-800 p-2.5 rounded-2xl border border-amber-200 dark:border-slate-700 flex flex-col items-center shadow-xs">
            <FishVector size={36} variant={0} className="mb-0.5" />
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">Fish Catch</span>
          </div>
          <div className="bg-purple-50 dark:bg-slate-800 p-2.5 rounded-2xl border border-purple-200 dark:border-slate-700 flex flex-col items-center shadow-xs">
            <ButterflyVector size={36} variant={0} className="mb-0.5" />
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">Butterfly</span>
          </div>
          <div className="bg-rose-50 dark:bg-slate-800 p-2.5 rounded-2xl border border-rose-200 dark:border-slate-700 flex flex-col items-center shadow-xs">
            <BalloonVector size={32} variant={0} className="mb-0.5" />
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">Balloon Pop</span>
          </div>
          <div className="bg-emerald-50 dark:bg-slate-800 p-2.5 rounded-2xl border border-emerald-200 dark:border-slate-700 flex flex-col items-center shadow-xs">
            <AppleVector size={36} className="mb-0.5" />
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">Apple Harvest</span>
          </div>
        </div>

        {/* Primary Let's Play Button */}
        <button
          id="startBtn"
          onClick={handlePlayClick}
          className="w-full max-w-sm py-4 px-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-400 hover:to-green-400 active:scale-95 text-white font-black text-2xl md:text-3xl rounded-full shadow-[0_8px_0_#065f46,0_15px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#065f46,0_10px_15px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-3 border-4 border-emerald-200"
        >
          <div className="w-10 h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-inner">
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          </div>
          <span>Let's Play!</span>
        </button>

        {/* Install on Mobile button inside card */}
        <button
          onClick={() => {
            soundManager.playTap();
            onOpenInstall();
          }}
          className="mt-4 flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-4 decoration-emerald-400"
        >
          <Smartphone className="w-4 h-4 text-emerald-500" />
          <span>Tap here to install Multi Play on your phone</span>
        </button>
      </div>
    </div>
  );
};
