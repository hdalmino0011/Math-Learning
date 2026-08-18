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
    <div className="min-h-screen w-full flex flex-col p-4 md:p-6 bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Top Navigation Bar */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between pb-4 border-b border-slate-300 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToSplash();
            }}
            className="p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl shadow-md border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-sm"
            title="Back to Welcome Screen"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-2 ml-2">
            <div className="w-9 h-9 rounded-xl bg-pink-500 text-amber-200 font-black text-xl flex items-center justify-center border-2 border-pink-300">
              ×
            </div>
            <span className="text-xl md:text-2xl font-black text-slate-950 dark:text-amber-300 font-['Fredoka',sans-serif]">
              Multi Play!
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playTap();
              onToggleMute();
            }}
            className={`p-3 rounded-2xl shadow-md border-2 transition-all hover:scale-105 active:scale-95 ${
              soundMuted
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                : 'bg-emerald-500 text-white border-emerald-600'
            }`}
            title={soundMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {soundMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onOpenBadges();
            }}
            className="p-3 bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 rounded-2xl shadow-md border-2 border-amber-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all"
            title="Badges"
          >
            <Award className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onOpenSettings();
            }}
            className="p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl shadow-md border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Mode Selection Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-slate-100 font-['Fredoka',sans-serif]">
            Choose a Game
          </h2>
          <p className="text-base md:text-lg font-black text-slate-700 dark:text-slate-300 mt-1">
            Pick your favorite adventure to start mastering your multiplication!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {MODES_DATA.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeClick(mode.id)}
              className={`group relative flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-3xl border-4 ${mode.borderColor} shadow-lg hover:shadow-2xl hover:-translate-y-1.5 active:translate-y-0.5 transition-all text-center overflow-hidden cursor-pointer`}
            >
              {/* Card top decorative accent */}
              <div className={`absolute top-0 inset-x-0 h-3 bg-gradient-to-r ${mode.color}`}></div>

              <div className="mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200">
                {mode.renderGraphic()}
              </div>

              <h3 className="text-xl md:text-2xl font-black text-slate-950 dark:text-slate-100 mb-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                {mode.title}
              </h3>

              <p className="text-xs md:text-sm font-black text-slate-700 dark:text-slate-300 line-clamp-2">
                {mode.subtitle}
              </p>

              <div className="mt-4 px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-950 dark:text-slate-100 font-black text-xs group-hover:bg-amber-400 group-hover:text-amber-950 transition-colors">
                Play Now ➔
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
