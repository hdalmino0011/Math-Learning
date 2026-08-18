import React from 'react';
import { GameMode } from '../types';
import { soundManager } from '../utils/audio';
import { Volume2, VolumeX, Settings, Award, ArrowLeft } from 'lucide-react';
import {
  FishVector,
  ButterflyVector,
  BalloonVector,
  AppleVector,
  QuizCardsVector,
  BookVector,
  SunVector,
  MoonVector,
} from './illustrations/VectorGraphics';

interface HomeScreenProps {
  onSelectMode: (mode: GameMode) => void;
  onBackToSplash: () => void;
  onOpenSettings: () => void;
  onOpenBadges: () => void;
  soundMuted: boolean;
  onToggleMute: () => void;
}

interface ModeCardInfo {
  id: GameMode;
  title: string;
  subtitle: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  renderGraphic: () => React.ReactNode;
}

const MODES_DATA: ModeCardInfo[] = [
  {
    id: 'fish',
    title: 'Catch a Fish',
    subtitle: 'Hook the fish with the right answer',
    color: 'from-amber-400 to-amber-500',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    borderColor: 'border-amber-400 dark:border-amber-600',
    renderGraphic: () => <FishVector size={64} variant={1} />,
  },
  {
    id: 'butterfly',
    title: 'Butterfly Catch',
    subtitle: 'Catch the butterfly with your net',
    color: 'from-purple-500 to-indigo-500',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    borderColor: 'border-purple-400 dark:border-purple-600',
    renderGraphic: () => <ButterflyVector size={64} variant={0} />,
  },
  {
    id: 'balloon',
    title: 'Pop the Balloon',
    subtitle: 'Aim your dart and pop the balloon',
    color: 'from-emerald-400 to-green-500',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    borderColor: 'border-emerald-400 dark:border-emerald-600',
    renderGraphic: () => <BalloonVector size={54} variant={0} />,
  },
  {
    id: 'harvest',
    title: 'Multiply to Harvest',
    subtitle: 'Put the ripe apple in the picnic basket',
    color: 'from-rose-500 to-red-500',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    borderColor: 'border-rose-400 dark:border-rose-600',
    renderGraphic: () => <AppleVector size={64} />,
  },
  {
    id: 'quiz',
    title: 'Multiplication Quiz',
    subtitle: 'Pick the card with the right product',
    color: 'from-pink-500 to-rose-500',
    badgeBg: 'bg-pink-100 dark:bg-pink-950/60',
    borderColor: 'border-pink-400 dark:border-pink-600',
    renderGraphic: () => <QuizCardsVector size={64} />,
  },
  {
    id: 'memorize',
    title: 'Memorize Times Table',
    subtitle: 'Learn table facts, listen & practice',
    color: 'from-amber-500 to-yellow-500',
    badgeBg: 'bg-yellow-100 dark:bg-yellow-950/60',
    borderColor: 'border-yellow-400 dark:border-yellow-600',
    renderGraphic: () => <BookVector size={64} />,
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectMode,
  onBackToSplash,
  onOpenSettings,
  onOpenBadges,
  soundMuted,
  onToggleMute,
}) => {
  const handleModeClick = (mode: GameMode) => {
    soundManager.playTap();
    onSelectMode(mode);
  };

  return (
    <div className="h-screen h-[100dvh] max-h-screen w-full flex flex-col p-3 sm:p-4 md:p-6 overflow-y-auto bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Top Navigation Bar */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between pb-2 sm:pb-3 border-b border-slate-300 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToSplash();
            }}
            className="p-2 sm:p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl sm:rounded-2xl shadow-md border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-xs sm:text-sm cursor-pointer"
            title="Back to Welcome Screen"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-1.5 ml-1 sm:ml-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-pink-500 text-amber-200 font-black text-base sm:text-lg flex items-center justify-center border-2 border-pink-300">
              ×
            </div>
            <span className="text-lg sm:text-xl font-black text-slate-950 dark:text-amber-300 font-['Fredoka',sans-serif]">
              Multi Play!
            </span>
          </div>
        </div>

        {/* Center Decorative Sun / Moon */}
        <div className="hidden sm:flex items-center gap-2 pointer-events-none">
          <div className="dark:hidden">
            <SunVector size={36} className="animate-pulse" />
          </div>
          <div className="hidden dark:block">
            <MoonVector size={36} className="animate-pulse" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              soundManager.playTap();
              onToggleMute();
            }}
            className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-md border-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              soundMuted
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                : 'bg-emerald-500 text-white border-emerald-600'
            }`}
            title={soundMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onOpenBadges();
            }}
            className="p-2 sm:p-2.5 bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 rounded-xl sm:rounded-2xl shadow-md border-2 border-amber-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Badges"
          >
            <Award className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onOpenSettings();
            }}
            className="p-2 sm:p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl sm:rounded-2xl shadow-md border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Mode Selection Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-2 sm:py-4">
        <div className="text-center mb-2 sm:mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950 dark:text-slate-100 font-['Fredoka',sans-serif]">
            Choose a Game
          </h2>
          <p className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-300">
            Pick your favorite adventure to start mastering multiplication!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 w-full">
          {MODES_DATA.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeClick(mode.id)}
              className={`group relative flex flex-col items-center justify-between p-2.5 sm:p-3.5 bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl border-2 sm:border-3 ${mode.borderColor} shadow-md hover:shadow-xl hover:-translate-y-1 active:translate-y-0.5 transition-all text-center overflow-hidden cursor-pointer min-h-[140px] sm:min-h-[160px]`}
            >
              {/* Card top decorative accent */}
              <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${mode.color}`}></div>

              <div className="mt-1 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">
                {mode.renderGraphic()}
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-950 dark:text-slate-100 mb-0.5 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  {mode.title}
                </h3>

                <p className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 line-clamp-1">
                  {mode.subtitle}
                </p>
              </div>

              <div className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-black text-[10px] sm:text-xs group-hover:bg-amber-400 group-hover:text-amber-950 transition-colors">
                Play ➔
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
