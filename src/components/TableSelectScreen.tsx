import React from 'react';
import { GameMode } from '../types';
import { soundManager } from '../utils/audio';
import { ArrowLeft, Sparkles } from 'lucide-react';
import {
  FishVector,
  ButterflyVector,
  BalloonVector,
  AppleVector,
  QuizCardsVector,
  BookVector,
  FlameVector,
  StarVector,
} from './illustrations/VectorGraphics';

interface TableSelectScreenProps {
  mode: GameMode;
  onSelectTable: (table: number) => void;
  onBackToHome: () => void;
  tableMastery: Record<number, number>;
}

const WARMUP_TABLES = [1, 2, 3, 4, 5, 9, 10];
const TRICKY_TABLES = [6, 7, 8, 11, 12];

const MODE_CONFIG: Record<
  GameMode,
  { title: string; desc: string; renderIcon: () => React.ReactNode }
> = {
  fish: {
    title: 'Catch a Fish',
    desc: 'Select a times table for your fishing adventure!',
    renderIcon: () => <FishVector size={36} variant={0} />,
  },
  butterfly: {
    title: 'Butterfly Catch',
    desc: 'Select a table for your butterfly garden adventure!',
    renderIcon: () => <ButterflyVector size={36} variant={0} />,
  },
  balloon: {
    title: 'Pop the Balloon',
    desc: 'Select a table for the balloon carnival!',
    renderIcon: () => <BalloonVector size={32} variant={0} />,
  },
  harvest: {
    title: 'Multiply to Harvest',
    desc: 'Select a table to fill your apple harvest basket!',
    renderIcon: () => <AppleVector size={36} />,
  },
  quiz: {
    title: 'Multiplication Quiz',
    desc: 'Select a table to challenge your math quiz skills!',
    renderIcon: () => <QuizCardsVector size={36} />,
  },
  memorize: {
    title: 'Memorize Times Table',
    desc: 'Select a times table to read, listen, and practice!',
    renderIcon: () => <BookVector size={36} />,
  },
};

export const TableSelectScreen: React.FC<TableSelectScreenProps> = ({
  mode,
  onSelectTable,
  onBackToHome,
  tableMastery,
}) => {
  const currentInfo = MODE_CONFIG[mode] || {
    title: 'Multi Play',
    desc: 'Pick a table',
    renderIcon: () => <StarVector size={32} />,
  };

  const handleTablePick = (n: number) => {
    soundManager.playStartGame();
    onSelectTable(n);
  };

  return (
    <div className="h-screen h-[100dvh] max-h-screen w-full flex flex-col p-3 sm:p-4 md:p-6 overflow-y-auto bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header with back button */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between pb-2 sm:pb-3 border-b border-slate-300 dark:border-slate-800 shrink-0">
        <button
          onClick={() => {
            soundManager.playTap();
            onBackToHome();
          }}
          className="p-2 sm:p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl sm:rounded-2xl shadow-md border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-black text-xs sm:text-sm cursor-pointer"
          title="Back to Game Selection"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <div>{currentInfo.renderIcon()}</div>
          <span className="text-base sm:text-lg font-black text-slate-950 dark:text-amber-300">
            {currentInfo.title}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center py-2 sm:py-4">
        <div className="text-center mb-2 sm:mb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-slate-100 font-['Fredoka',sans-serif]">
            Choose a Times Table
          </h2>
          <p className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-300">
            {currentInfo.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
          {/* Warm-Up Tables Group */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 sm:border-3 border-emerald-400 dark:border-emerald-700 shadow-md flex flex-col">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-emerald-100 dark:border-slate-700">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-emerald-900 dark:text-emerald-300 flex items-center gap-1">
                  <span>Warm-Up Tables</span>
                </h3>
                <p className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-400">
                  Great starting point for building confidence
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 flex-1">
              {WARMUP_TABLES.map((num) => {
                const masteryCount = tableMastery[num] || 0;
                return (
                  <button
                    key={num}
                    onClick={() => handleTablePick(num)}
                    className="group relative flex items-center justify-between p-2 sm:p-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-700 dark:to-slate-800 hover:from-emerald-500 hover:to-teal-500 hover:text-white rounded-xl border border-emerald-300 dark:border-slate-600 shadow-2xs hover:shadow-xs hover:scale-[1.02] active:scale-95 transition-all text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500 group-hover:bg-white text-white group-hover:text-emerald-700 font-black text-sm sm:text-base flex items-center justify-center shadow-2xs transition-colors shrink-0">
                        {num}
                      </div>
                      <div>
                        <div className="font-black text-slate-950 dark:text-white group-hover:text-white text-xs sm:text-sm">
                          {num}× Table
                        </div>
                      </div>
                    </div>

                    {masteryCount > 0 ? (
                      <div className="flex items-center gap-0.5 text-amber-900 dark:text-amber-300 text-[10px] font-black bg-amber-200 dark:bg-slate-900 px-1.5 py-0.5 rounded-full border border-amber-400 shrink-0">
                        <StarVector size={11} fill="#f59e0b" />
                        <span>{masteryCount}</span>
                      </div>
                    ) : (
                      <span className="text-emerald-600 group-hover:text-white font-black text-sm">
                        ›
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tricky Tables Group */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 sm:border-3 border-amber-400 dark:border-amber-600 shadow-md flex flex-col">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-amber-100 dark:border-slate-700">
              <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-black">
                <FlameVector size={16} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-amber-950 dark:text-amber-300 flex items-center gap-1">
                  <span>Tricky Tables</span>
                </h3>
                <p className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-400">
                  Level up your skills with higher numbers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 flex-1">
              {TRICKY_TABLES.map((num) => {
                const masteryCount = tableMastery[num] || 0;
                return (
                  <button
                    key={num}
                    onClick={() => handleTablePick(num)}
                    className="group relative flex items-center justify-between p-2 sm:p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-800 hover:from-amber-500 hover:to-orange-500 hover:text-white rounded-xl border border-amber-300 dark:border-slate-600 shadow-2xs hover:shadow-xs hover:scale-[1.02] active:scale-95 transition-all text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500 group-hover:bg-white text-white group-hover:text-amber-800 font-black text-sm sm:text-base flex items-center justify-center shadow-2xs transition-colors shrink-0">
                        {num}
                      </div>
                      <div>
                        <div className="font-black text-slate-950 dark:text-white group-hover:text-white text-xs sm:text-sm">
                          {num}× Table
                        </div>
                      </div>
                    </div>

                    {masteryCount > 0 ? (
                      <div className="flex items-center gap-0.5 text-amber-900 dark:text-amber-300 text-[10px] font-black bg-amber-200 dark:bg-slate-900 px-1.5 py-0.5 rounded-full border border-amber-400 shrink-0">
                        <StarVector size={11} fill="#f59e0b" />
                        <span>{masteryCount}</span>
                      </div>
                    ) : (
                      <span className="text-amber-600 group-hover:text-white font-black text-sm">
                        ›
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
