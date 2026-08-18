import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';
import {
  ArrowLeft,
  Home,
  Volume2,
  VolumeX,
  CheckCircle,
  RefreshCw,
  Sparkles,
  BookOpen,
  Check,
  X,
} from 'lucide-react';
import { BookVector } from './illustrations/VectorGraphics';
import confetti from 'canvas-confetti';

interface MemorizeScreenProps {
  table: number;
  onBackToTables: () => void;
  onGoHome: () => void;
  soundMuted: boolean;
  onToggleMute: () => void;
}

export const MemorizeScreen: React.FC<MemorizeScreenProps> = ({
  table,
  onBackToTables,
  onGoHome,
  soundMuted,
  onToggleMute,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<boolean>(false);
  const [speakingRow, setSpeakingRow] = useState<number | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [mode, setMode] = useState<'learn' | 'practice'>('learn');

  useEffect(() => {
    soundManager.startMusic('memorize');
    return () => {
      soundManager.stopMusic();
      soundManager.stopSpeech();
    };
  }, []);

  const handleInputChange = (multiplier: number, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [multiplier]: value,
    }));
    setChecked(false);
  };

  const handleCheckAnswers = () => {
    soundManager.playTap();
    setChecked(true);

    let correctCount = 0;
    for (let i = 1; i <= 10; i++) {
      if (parseInt(userAnswers[i] || '', 10) === table * i) {
        correctCount++;
      }
    }

    if (correctCount === 10) {
      soundManager.playVictory();
      try {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    } else if (correctCount > 5) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }
  };

  const handleReadAloud = () => {
    if (isReadingAloud) {
      soundManager.stopSpeech();
      setIsReadingAloud(false);
      setSpeakingRow(null);
      return;
    }

    setIsReadingAloud(true);
    let currentRow = 1;

    const speakNext = () => {
      if (currentRow > 10) {
        setIsReadingAloud(false);
        setSpeakingRow(null);
        return;
      }

      setSpeakingRow(currentRow);
      const answer = table * currentRow;
      const text = `${table} times ${currentRow} equals ${answer}`;

      soundManager.speak(text, () => {
        currentRow++;
        speakNext();
      });
    };

    speakNext();
  };

  const handleReset = () => {
    soundManager.playTap();
    setUserAnswers({});
    setChecked(false);
    setSpeakingRow(null);
  };

  return (
    <div className="h-screen h-[100dvh] max-h-screen w-full flex flex-col p-3 sm:p-4 md:p-6 overflow-y-auto bg-gradient-to-b from-amber-50 via-amber-100/50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Top Nav with Back Button */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between pb-2 sm:pb-3 border-b border-amber-300 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              soundManager.playTap();
              onGoHome();
            }}
            className="p-2 sm:p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl sm:rounded-2xl shadow-md border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Home"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToTables();
            }}
            className="p-2 sm:p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl sm:rounded-2xl shadow-md border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1 font-black text-xs cursor-pointer"
            title="Back to Tables"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tables</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <BookVector size={28} />
          <div className="text-left">
            <h2 className="text-base sm:text-lg font-black text-amber-950 dark:text-amber-300 font-['Fredoka',sans-serif]">
              {table} Times Table
            </h2>
            <p className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300">
              {mode === 'learn' ? 'Read & listen carefully' : 'Fill in the blanks'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
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
            title={soundMuted ? 'Unmute' : 'Mute'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </header>

      {/* Mode Switcher */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-2 sm:gap-3 my-1.5 sm:my-2 shrink-0">
        <button
          onClick={() => {
            soundManager.playTap();
            setMode('learn');
          }}
          className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 border-2 cursor-pointer ${
            mode === 'learn'
              ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
              : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 border-slate-300 dark:border-slate-700'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Learn Mode</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            setMode('practice');
          }}
          className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 border-2 cursor-pointer ${
            mode === 'practice'
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-102'
              : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 border-slate-300 dark:border-slate-700'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Practice Test</span>
        </button>
      </div>

      {/* Notebook Chart Container */}
      <main className="flex-1 w-full max-w-3xl mx-auto my-1">
        <div className="bg-[#fffdf2] dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 border-2 sm:border-4 border-amber-400 dark:border-slate-700 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((multiplier) => {
              const correctAnswer = table * multiplier;
              const userVal = userAnswers[multiplier] || '';
              const isCorrect = parseInt(userVal, 10) === correctAnswer;
              const isSpeaking = speakingRow === multiplier;

              return (
                <div
                  key={multiplier}
                  className={`flex items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all ${
                    isSpeaking
                      ? 'bg-amber-200 dark:bg-amber-950/90 border-amber-500 scale-102 shadow-md ring-2 ring-amber-300/60'
                      : checked && mode === 'practice'
                      ? isCorrect
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500'
                        : 'bg-rose-100 dark:bg-rose-950/80 border-rose-500'
                      : 'bg-white dark:bg-slate-800 border-amber-300 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-base sm:text-lg font-black text-slate-950 dark:text-white">
                    <span className="w-4 text-right text-amber-700 dark:text-amber-400">{table}</span>
                    <span className="text-amber-600 dark:text-amber-400">×</span>
                    <span className="w-4 text-center text-indigo-700 dark:text-indigo-400">{multiplier}</span>
                    <span className="text-slate-500 dark:text-slate-400">=</span>
                  </div>

                  {mode === 'learn' ? (
                    <div className="font-black text-base sm:text-lg text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-slate-700 px-2.5 py-0.5 rounded-lg min-w-[45px] text-center border border-emerald-400 dark:border-slate-600">
                      {correctAnswer}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        inputMode="numeric"
                        value={userVal}
                        onChange={(e) => handleInputChange(multiplier, e.target.value)}
                        placeholder="?"
                        className="w-12 sm:w-14 p-1 text-center text-base sm:text-lg font-black rounded-lg border border-slate-300 dark:border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-300 outline-none bg-white dark:bg-slate-700 text-slate-950 dark:text-white"
                      />
                      {checked && (
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
                          isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}>
                          {isCorrect ? <Check className="w-3 h-3 stroke-[3]" /> : <X className="w-3 h-3 stroke-[3]" />}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons at bottom */}
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={handleReadAloud}
              className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
                isReadingAloud
                  ? 'bg-rose-500 hover:bg-rose-400 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isReadingAloud ? 'Stop Reading' : 'Read Aloud'}</span>
            </button>

            {mode === 'practice' && (
              <>
                <button
                  onClick={handleCheckAnswers}
                  className="px-4 py-1.5 sm:px-5 sm:py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Check Answers</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-200 font-black text-xs rounded-xl hover:bg-slate-300 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
