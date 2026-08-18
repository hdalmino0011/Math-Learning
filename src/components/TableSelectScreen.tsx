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
    <div className="min-h-screen w-full flex flex-col p-4 md:p-6 bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900">
      {/* Header with back button */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => {
            soundManager.playTap();
            onBackToHome();
          }}
          className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl shadow-md border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold"
          title="Back to Game Selection"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div>{currentInfo.renderIcon()}</div>
          <span className="text-lg md:text-xl font-black text-slate-800 dark:text-amber-300">
            {currentInfo.title}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center py-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 font-['Fredoka',sans-serif]">
            Choose a Times Table
          </h2>
          <p className="text-sm md:text-base font-bold text-slate-500 dark:text-slate-400 mt-1">
            {currentInfo.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Warm-Up Tables Group */}
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-3xl p-6 border-4 border-emerald-300 dark:border-emerald-700 shadow-xl flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-emerald-100 dark:border-slate-700">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <span>Warm-Up Tables</span>
                </h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Great starting point for building confidence
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
              {WARMUP_TABLES.map((num) => {
                const masteryCount = tableMastery[num] || 0;
                return (
                  <button
                    key={num}
                    onClick={() => handleTablePick(num)}
                    className="group relative flex items-center justify-between p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-700 dark:to-slate-750 hover:from-emerald-500 hover:to-teal-500 hover:text-white rounded-2xl border-2 border-emerald-300 dark:border-slate-600 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500 group-hover:bg-white text-white group-hover:text-emerald-700 font-black text-xl flex items-center justify-center shadow-xs transition-colors">
                        {num}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-white text-base">
                          {num} × Table
                        </div>
                        <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-100">
                          1 to 10
                        </div>
                      </div>
                    </div>

                    {masteryCount > 0 ? (
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-black bg-amber-100 dark:bg-slate-850 px-2.5 py-1 rounded-full border border-amber-300">
                        <StarVector size={14} fill="#f59e0b" />
                        <span>{masteryCount}</span>
                      </div>
                    ) : (
                      <span className="text-emerald-500 group-hover:text-white font-black text-lg">
                        ›
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tricky Tables Group */}
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-3xl p-6 border-4 border-amber-400 dark:border-amber-600 shadow-xl flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-amber-100 dark:border-slate-700">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <FlameVector size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <span>Tricky Tables</span>
                </h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Level up your skills with higher numbers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
              {TRICKY_TABLES.map((num) => {
                const masteryCount = tableMastery[num] || 0;
                return (
                  <button
                    key={num}
                    onClick={() => handleTablePick(num)}
                    className="group relative flex items-center justify-between p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-750 hover:from-amber-500 hover:to-orange-500 hover:text-white rounded-2xl border-2 border-amber-300 dark:border-slate-600 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 group-hover:bg-white text-white group-hover:text-amber-800 font-black text-xl flex items-center justify-center shadow-xs transition-colors">
                        {num}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-white text-base">
                          {num} × Table
                        </div>
                        <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 group-hover:text-amber-100">
                          1 to 10
                        </div>
                      </div>
                    </div>

                    {masteryCount > 0 ? (
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-black bg-amber-100 dark:bg-slate-850 px-2.5 py-1 rounded-full border border-amber-300">
                        <StarVector size={14} fill="#f59e0b" />
                        <span>{masteryCount}</span>
                      </div>
                    ) : (
                      <span className="text-amber-500 group-hover:text-white font-black text-lg">
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
