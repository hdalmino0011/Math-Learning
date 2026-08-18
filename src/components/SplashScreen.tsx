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
    <div className="relative h-screen h-[100dvh] max-h-screen w-full flex flex-col items-center justify-between p-2 sm:p-4 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 select-none">
      {/* Sky Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Sun / Moon Vector - Perfectly centered at the top without overlapping header buttons */}
        <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 pointer-events-none z-10">
          <div className="dark:hidden animate-pulse">
            <SunVector size={58} />
          </div>
          <div className="hidden dark:block animate-pulse">
            <MoonVector size={58} />
          </div>
        </div>

        {/* Top-Left Cloud */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-10 opacity-80">
          <div className="dark:hidden">
            <CloudVector size={56} />
          </div>
          <div className="hidden dark:flex items-center gap-1.5 text-amber-200">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
        </div>

        {/* Top-Right Cloud - Positioned comfortably below the header buttons */}
        <div className="absolute top-14 right-4 sm:right-12 opacity-75">
          <div className="dark:hidden">
            <CloudVector size={50} />
          </div>
        </div>

        {/* Floating Math Bubbles - Positioned Safely in Background Corners */}
        <div className="hidden md:block absolute top-20 left-4 bg-purple-600/90 text-white font-black px-3 py-1.5 rounded-2xl border-2 border-white shadow-md text-sm md:text-base animate-bounce opacity-80">
          2 × 3 = 6
        </div>
        <div className="hidden md:block absolute top-24 right-6 bg-pink-600/90 text-white font-black px-3 py-1.5 rounded-2xl border-2 border-white shadow-md text-sm md:text-base animate-bounce delay-300 opacity-80">
          5 × 4 = 20
        </div>
        <div className="hidden lg:block absolute bottom-12 left-6 bg-amber-600/90 text-white font-black px-3 py-1.5 rounded-2xl border-2 border-white shadow-md text-sm md:text-base animate-bounce delay-700 opacity-80">
          7 × 3 = 21
        </div>
        <div className="hidden lg:block absolute bottom-12 right-6 bg-emerald-600/90 text-white font-black px-3 py-1.5 rounded-2xl border-2 border-white shadow-md text-sm md:text-base animate-bounce delay-500 opacity-80">
          9 × 2 = 18
        </div>

        {/* Green Hills in Background */}
        <div className="absolute -bottom-16 -left-10 w-[120%] h-36 sm:h-48 bg-emerald-400/80 dark:bg-emerald-900/40 rounded-t-[100%]"></div>
        <div className="absolute -bottom-20 -right-10 w-[110%] h-44 sm:h-56 bg-emerald-500 dark:bg-emerald-950/60 rounded-t-[100%]"></div>
      </div>

      {/* Top Action Buttons Header */}
      <header className="w-full max-w-5xl flex items-center justify-between z-20 px-2 py-1 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-sm text-emerald-900 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 font-black text-xs shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="font-black tracking-wide">Multi Play!</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="startBadgesBtn"
            onClick={() => {
              soundManager.playTap();
              onOpenBadges();
            }}
            className="px-3 py-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm text-amber-800 dark:text-amber-300 rounded-xl sm:rounded-2xl shadow-sm border-2 border-amber-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-xs cursor-pointer"
            title="My Badges"
          >
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Badges</span>
          </button>

          <button
            id="startSettingsBtn"
            onClick={() => {
              soundManager.playTap();
              onOpenSettings();
            }}
            className="p-1.5 sm:p-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm text-slate-800 dark:text-slate-100 rounded-xl sm:rounded-2xl shadow-sm border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Game Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Central Content Area - Responsive for both Portrait and Landscape Viewports */}
      <main className="relative z-10 w-full max-w-5xl flex-1 flex flex-col landscape:flex-row items-center justify-center landscape:justify-between px-3 sm:px-6 py-1 gap-2 sm:gap-4">
        {/* Left Side in Landscape / Top in Portrait: Logo & Mini-games */}
        <div className="flex flex-col items-center landscape:items-start text-center landscape:text-left max-w-md landscape:max-w-lg">
          {/* Mini Tag */}
          <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-xs border border-emerald-300 mb-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Learn • Play • Grow
          </div>

          {/* 3D Playful Title Logo */}
          <div className="flex items-center gap-2 sm:gap-3 my-0.5">
            {/* 3D Multiplication Icon Badge */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 text-white font-black text-2xl sm:text-3xl md:text-4xl flex items-center justify-center shadow-[0_4px_0_#9f1239,0_8px_14px_rgba(225,29,72,0.3)] border-2 border-white/90 transform -rotate-6 hover:rotate-0 transition-transform duration-300 shrink-0">
              <span className="translate-y-[-1px]">×</span>
            </div>

            {/* Vibrant 3D Playful Lettering */}
            <div className="flex items-baseline font-['Fredoka',sans-serif] font-black tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl select-none">
              <span className="text-amber-500 dark:text-amber-400 drop-shadow-[0_3px_0_#b45309] dark:drop-shadow-[0_3px_0_#78350f]">
                Multi
              </span>
              <span className="ml-1.5 sm:ml-2 text-emerald-500 dark:text-emerald-400 drop-shadow-[0_3px_0_#047857] dark:drop-shadow-[0_3px_0_#064e3b]">
                Play
              </span>
              <span className="ml-0.5 text-rose-500 dark:text-rose-400 drop-shadow-[0_3px_0_#be123c] dark:drop-shadow-[0_3px_0_#881337] animate-bounce">
                !
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs border border-white/80 dark:border-slate-700 shadow-2xs my-1">
            <p className="text-slate-900 dark:text-slate-100 text-[11px] sm:text-xs md:text-sm font-extrabold">
              A colorful times-table adventure made just for you!
            </p>
          </div>

          {/* Game Mini Vector Badges Grid */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full max-w-sm sm:max-w-md mt-1">
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm p-1.5 rounded-xl border border-amber-300/80 dark:border-slate-600 flex flex-col items-center shadow-xs">
              <FishVector size={22} variant={0} className="mb-0.5" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-slate-950 dark:text-white truncate w-full text-center">Fish Catch</span>
            </div>
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm p-1.5 rounded-xl border border-purple-300/80 dark:border-slate-600 flex flex-col items-center shadow-xs">
              <ButterflyVector size={22} variant={0} className="mb-0.5" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-slate-950 dark:text-white truncate w-full text-center">Butterfly</span>
            </div>
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm p-1.5 rounded-xl border border-rose-300/80 dark:border-slate-600 flex flex-col items-center shadow-xs">
              <BalloonVector size={18} variant={0} className="mb-0.5" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-slate-950 dark:text-white truncate w-full text-center">Balloon</span>
            </div>
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm p-1.5 rounded-xl border border-emerald-300/80 dark:border-slate-600 flex flex-col items-center shadow-xs">
              <AppleVector size={22} className="mb-0.5" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-slate-950 dark:text-white truncate w-full text-center">Harvest</span>
            </div>
          </div>
        </div>

        {/* Right Side in Landscape / Bottom in Portrait: Big Let's Play Button */}
        <div className="flex flex-col items-center justify-center w-full landscape:w-auto mt-2 landscape:mt-0">
          <button
            id="startBtn"
            onClick={handlePlayClick}
            className="w-full sm:w-auto min-w-[220px] sm:min-w-[260px] md:min-w-[280px] py-3.5 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-400 hover:to-green-400 active:scale-95 text-white font-black text-xl sm:text-2xl md:text-3xl rounded-full shadow-[0_6px_0_#065f46,0_12px_20px_rgba(0,0,0,0.28)] hover:shadow-[0_3px_0_#065f46,0_6px_12px_rgba(0,0,0,0.28)] transition-all flex items-center justify-center gap-3 border-3 border-white dark:border-emerald-200 cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-inner">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current translate-x-0.5" />
            </div>
            <span>Let's Play!</span>
          </button>
          <span className="hidden landscape:block text-[10px] font-bold text-slate-800/80 dark:text-slate-200/80 mt-2">
            1× to 12× Practice & Games
          </span>
        </div>
      </main>

      {/* Bottom Spacer */}
      <footer className="w-full max-w-4xl z-20 py-1 text-center shrink-0">
        <p className="text-[10px] sm:text-xs font-bold text-slate-800/80 dark:text-slate-300/80">
          Practice 1× to 12× Tables with Mini-Games
        </p>
      </footer>
    </div>
  );
};

