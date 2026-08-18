import React, { useEffect } from 'react';
import { GameMode } from '../types';
import { soundManager } from '../utils/audio';
import { RefreshCw, Home, ArrowRight, Award } from 'lucide-react';
import { TrophyVector, StarVector } from './illustrations/VectorGraphics';
import confetti from 'canvas-confetti';

interface ResultsScreenProps {
  score: number;
  total: number;
  mode: GameMode;
  table: number;
  onPlayAgain: () => void;
  onChooseTable: () => void;
  onGoHome: () => void;
  onOpenBadges: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  total,
  mode,
  table,
  onPlayAgain,
  onChooseTable,
  onGoHome,
  onOpenBadges,
}) => {
  useEffect(() => {
    soundManager.playVictory();
    try {
      confetti({
        particleCount: 75,
        spread: 100,
        origin: { y: 0.5 },
      });
    } catch {}
  }, []);

  const percentage = (score / total) * 100;
  let stars = 1;
  let headline = 'Great Effort!';
  let subtitle = 'Keep practicing to master this table!';

  if (percentage === 100) {
    stars = 3;
    headline = 'Times-Table Superstar!';
    subtitle = `You got a PERFECT score on the ${table} times table!`;
  } else if (percentage >= 70) {
    stars = 2;
    headline = 'Wonderful Work!';
    subtitle = `You know your ${table} times table very well!`;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 select-none">
      <div className="w-full max-w-xl bg-white dark:bg-slate-850 rounded-3xl p-6 md:p-10 border-4 border-amber-300 dark:border-slate-700 shadow-2xl text-center flex flex-col items-center animate-scaleUp">
        {/* Vector Trophy */}
        <div className="relative mb-2">
          <TrophyVector size={96} className="animate-bounce" />
        </div>

        {/* 3 Stars Rating Vector */}
        <div className="flex items-center gap-3 my-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StarVector
              key={i}
              size={36}
              fill={i < stars ? '#f59e0b' : '#cbd5e1'}
              className={i < stars ? 'animate-pulse' : 'opacity-40'}
            />
          ))}
        </div>

        {/* Headline */}
        <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-slate-100 font-['Fredoka',sans-serif] mb-1">
          {headline}
        </h2>

        <p className="text-sm md:text-base font-bold text-slate-500 dark:text-slate-400 mb-6">
          {subtitle}
        </p>

        {/* Score Badge */}
        <div className="bg-emerald-50 dark:bg-slate-800 px-8 py-4 rounded-3xl border-3 border-emerald-300 dark:border-emerald-700 shadow-inner mb-8 flex flex-col items-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 dark:text-emerald-400 mb-1">
            Your Final Score
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl md:text-6xl font-black text-emerald-600 dark:text-emerald-400 font-['Fredoka',sans-serif]">
              {score}
            </span>
            <span className="text-2xl md:text-3xl font-black text-slate-400">
              / {total}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
            {score === total ? 'Flawless Accuracy!' : `${total - score} to review`}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
          <button
            onClick={() => {
              soundManager.playTap();
              onPlayAgain();
            }}
            className="w-full py-3.5 px-5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-black text-lg rounded-2xl shadow-[0_5px_0_#065f46] hover:shadow-[0_2px_0_#065f46] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Play Again</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onChooseTable();
            }}
            className="w-full py-3.5 px-5 bg-indigo-500 hover:bg-indigo-400 active:scale-95 text-white font-black text-lg rounded-2xl shadow-[0_5px_0_#3730a3] hover:shadow-[0_2px_0_#3730a3] transition-all flex items-center justify-center gap-2"
          >
            <span>Other Table</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onOpenBadges();
            }}
            className="w-full py-3 px-4 bg-amber-100 dark:bg-slate-700 hover:bg-amber-200 text-amber-900 dark:text-amber-300 font-black text-sm rounded-2xl border-2 border-amber-300 dark:border-slate-600 transition-all flex items-center justify-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>View Badges</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onGoHome();
            }}
            className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-black text-sm rounded-2xl border-2 border-slate-300 dark:border-slate-600 transition-all flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Game Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
