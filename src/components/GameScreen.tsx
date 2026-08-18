import React, { useState, useEffect } from 'react';
import { GameMode, Question } from '../types';
import { soundManager } from '../utils/audio';
import { MathVisualizer } from './MathVisualizer';
import {
  Volume2,
  VolumeX,
  Pause,
  Play,
  ArrowLeft,
  Home,
  Check,
  X,
  HelpCircle,
} from 'lucide-react';
import {
  FishVector,
  ButterflyVector,
  ButterflyCatcherVector,
  BalloonVector,
  BalloonBurstVector,
  AppleVector,
  BasketVector,
  FishermanBoatVector,
  SunVector,
  CloudVector,
  TreeVector,
  FlameVector,
  StarVector,
} from './illustrations/VectorGraphics';
import confetti from 'canvas-confetti';

interface GameScreenProps {
  mode: GameMode;
  table: number;
  onFinishGame: (score: number, total: number) => void;
  onBackToTables: () => void;
  onGoHome: () => void;
  soundMuted: boolean;
  onToggleMute: () => void;
}

const TOTAL_QUESTIONS = 10;

export const GameScreen: React.FC<GameScreenProps> = ({
  mode,
  table,
  onFinishGame,
  onBackToTables,
  onGoHome,
  soundMuted,
  onToggleMute,
}) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isLastAnswerCorrect, setIsLastAnswerCorrect] = useState<boolean>(false);
  const [showHelperHint, setShowHelperHint] = useState<boolean>(false);

  // Animation states for visual stages
  const [fishingTarget, setFishingTarget] = useState<number | null>(null);
  const [netTarget, setNetTarget] = useState<number | null>(null);
  const [balloonPopped, setBalloonPopped] = useState<number | null>(null);
  const [harvestedApple, setHarvestedApple] = useState<number | null>(null);

  // Generate 10 randomized questions for the chosen times table
  useEffect(() => {
    const multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - 0.5);
    const newQuestions: Question[] = multipliers.map((mult) => {
      const answer = table * mult;
      // Generate 3 unique distractors close to answer
      const wrongOptions = new Set<number>();
      while (wrongOptions.size < 3) {
        const delta = (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1) * table;
        const candidate = answer + delta;
        if (candidate > 0 && candidate !== answer && candidate <= table * 12) {
          wrongOptions.add(candidate);
        } else {
          const fallback = Math.floor(Math.random() * 10 + 1) * table;
          if (fallback !== answer) wrongOptions.add(fallback);
        }
      }
      const options = [answer, ...Array.from(wrongOptions)].sort(() => Math.random() - 0.5);
      return {
        table,
        multiplier: mult,
        answer,
        options,
      };
    });

    setQuestions(newQuestions);
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setIsLocked(false);
    setShowFeedback(false);

    soundManager.startMusic(mode);

    return () => {
      soundManager.stopMusic();
    };
  }, [mode, table]);

  const currentQ = questions[questionIndex];

  const handleSelectAnswer = (option: number) => {
    if (isLocked || isPaused || !currentQ) return;
    setIsLocked(true);
    setSelectedOption(option);

    const isCorrect = option === currentQ.answer;
    setIsLastAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      soundManager.playCorrect();

      // Trigger custom animations based on game mode
      if (mode === 'fish') {
        setFishingTarget(option);
        soundManager.playSplash();
      } else if (mode === 'butterfly') {
        setNetTarget(option);
        soundManager.playButterfly();
      } else if (mode === 'balloon') {
        setBalloonPopped(option);
        soundManager.playPop();
      } else if (mode === 'harvest') {
        setHarvestedApple(option);
        soundManager.playHarvest();
      }

      try {
        confetti({
          particleCount: 30,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
        });
      } catch {}

      setTimeout(() => {
        setShowFeedback(true);
      }, mode === 'quiz' ? 600 : 1000);
    } else {
      setStreak(0);
      soundManager.playWrong();
      setTimeout(() => {
        setShowFeedback(true);
      }, 700);
    }
  };

  const handleContinue = () => {
    soundManager.playTap();
    setShowFeedback(false);
    setSelectedOption(null);
    setFishingTarget(null);
    setNetTarget(null);
    setBalloonPopped(null);
    setHarvestedApple(null);
    setShowHelperHint(false);

    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      soundManager.playVictory();
      onFinishGame(score, TOTAL_QUESTIONS);
    } else {
      setQuestionIndex((prev) => prev + 1);
      setIsLocked(false);
    }
  };

  if (!currentQ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold text-slate-600">Setting up game...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col p-3 md:p-6 bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 select-none overflow-x-hidden">
      {/* Top Game Navigation Bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between gap-2 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playTap();
              onGoHome();
            }}
            className="p-2.5 md:p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl shadow-md border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1 font-bold text-xs"
            title="Return to Game Menu"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Menu</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              setIsPaused(true);
            }}
            className="p-2.5 md:p-3 bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 rounded-2xl shadow-md border-2 border-amber-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all"
            title="Pause Game"
          >
            <Pause className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              onToggleMute();
            }}
            className={`p-2.5 md:p-3 rounded-2xl shadow-md border-2 transition-all hover:scale-105 active:scale-95 ${
              soundMuted
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 border-slate-300 dark:border-slate-600'
                : 'bg-emerald-500 text-white border-emerald-600'
            }`}
            title={soundMuted ? 'Unmute' : 'Mute'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Progress & Streak Center Indicator */}
        <div className="flex-1 max-w-xs md:max-w-md mx-2 flex flex-col items-center">
          <div className="flex items-center justify-between w-full text-xs font-black text-slate-600 dark:text-slate-300 px-1 mb-1">
            <span className="flex items-center gap-1">
              <span className="text-amber-600 dark:text-amber-400 font-extrabold">{table}× Table</span>
            </span>
            <span className="bg-amber-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-slate-600 text-amber-800 dark:text-amber-300">
              Q {questionIndex + 1} / {TOTAL_QUESTIONS}
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border-2 border-slate-300 dark:border-slate-600 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-300"
              style={{ width: `${((questionIndex) / TOTAL_QUESTIONS) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {streak > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-400 text-amber-950 font-black text-xs px-2.5 py-1.5 rounded-xl border-2 border-amber-500 shadow-sm animate-pulse">
              <FlameVector size={16} />
              <span>{streak} Streak!</span>
            </div>
          )}

          <button
            onClick={() => {
              soundManager.playTap();
              onBackToTables();
            }}
            className="p-2.5 md:p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl shadow-md border-2 border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 font-bold text-xs"
            title="Back to Times Table Selection"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Tables</span>
          </button>
        </div>
      </header>

      {/* Prominent Equation Card */}
      <div className="w-full max-w-2xl mx-auto my-1.5 flex flex-col items-center">
        <div className="relative flex items-center justify-center gap-3 md:gap-5 px-6 md:px-10 py-2.5 md:py-3.5 bg-emerald-100 dark:bg-slate-800 rounded-3xl border-4 border-emerald-500 dark:border-emerald-600 shadow-lg font-black text-3xl md:text-5xl text-slate-800 dark:text-slate-100 font-['Fredoka',sans-serif]">
          <span className="text-emerald-700 dark:text-emerald-400">{currentQ.table}</span>
          <span className="text-amber-500">×</span>
          <span className="text-indigo-600 dark:text-indigo-400">{currentQ.multiplier}</span>
          <span className="text-slate-400">=</span>
          <span
            className={`min-w-[65px] md:min-w-[85px] text-center px-3 py-1 rounded-2xl border-3 shadow-inner ${
              selectedOption !== null
                ? isLastAnswerCorrect
                  ? 'bg-emerald-400 text-white border-emerald-600 animate-bounce'
                  : 'bg-rose-400 text-white border-rose-600'
                : 'bg-white dark:bg-slate-900 text-slate-400 border-slate-300 dark:border-slate-700'
            }`}
          >
            {selectedOption !== null ? selectedOption : '?'}
          </span>
        </div>

        {/* Hint button */}
        <button
          onClick={() => {
            soundManager.playTap();
            setShowHelperHint(!showHelperHint);
          }}
          className="mt-2 text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1 bg-indigo-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-indigo-200 dark:border-slate-700 hover:bg-indigo-100 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHelperHint ? 'Hide Visual Hint' : 'Show Visual Hint'}</span>
        </button>

        {showHelperHint && (
          <div className="w-full max-w-xl mt-3 animate-fadeIn">
            <MathVisualizer table={currentQ.table} multiplier={currentQ.multiplier} />
          </div>
        )}
      </div>

      {/* Main Interactive Game Stage */}
      <main className="flex-1 w-full max-w-5xl mx-auto relative my-2 min-h-[360px] md:min-h-[440px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-300 dark:border-slate-700 flex flex-col justify-between">
        {/* GAME STAGE 1: CATCH A FISH */}
        {mode === 'fish' && (
          <div className="relative w-full h-full min-h-[380px] md:min-h-[440px] bg-gradient-to-b from-sky-300 via-sky-400 to-teal-700 overflow-hidden flex flex-col justify-between">
            {/* Sky & Sun vector */}
            <div className="absolute top-4 right-6 pointer-events-none">
              <SunVector size={64} className="animate-pulse" />
            </div>
            <div className="absolute top-8 left-12 pointer-events-none opacity-80">
              <CloudVector size={70} />
            </div>

            {/* Fisherman Boat Vector with line */}
            <div className="absolute top-4 left-4 md:left-12 z-20">
              <FishermanBoatVector size={130} />
            </div>

            {/* Swimming Fish Answers */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 mt-auto mb-6 px-4 w-full max-w-3xl mx-auto">
              {currentQ.options.map((opt, idx) => {
                const isAnswer = opt === currentQ.answer;
                const isChosen = selectedOption === opt;
                const isCaught = fishingTarget === opt;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isLocked}
                    className={`group relative flex flex-col items-center justify-center p-3 rounded-3xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                      isCaught
                        ? 'animate-bounce -translate-y-20 scale-125'
                        : 'animate-pulse'
                    } ${
                      isChosen
                        ? isAnswer
                          ? 'ring-4 ring-emerald-300 bg-emerald-400/80 shadow-2xl'
                          : 'ring-4 ring-rose-400 bg-rose-400/80'
                        : 'bg-white/20 hover:bg-white/40 backdrop-blur-xs'
                    }`}
                  >
                    <FishVector
                      variant={idx}
                      size={72}
                      className="transform group-hover:rotate-6 transition-transform"
                    />
                    <div className="mt-1 bg-white text-slate-900 font-black text-2xl md:text-3xl px-4 py-1 rounded-2xl shadow-lg border-2 border-cyan-200">
                      {opt}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GAME STAGE 2: BUTTERFLY CATCH */}
        {mode === 'butterfly' && (
          <div className="relative w-full h-full min-h-[380px] md:min-h-[440px] bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-200 overflow-hidden flex flex-col justify-between p-4">
            {/* Scenery trees */}
            <div className="absolute -top-6 -left-4 pointer-events-none opacity-85">
              <TreeVector size={110} />
            </div>
            <div className="absolute -top-6 -right-4 pointer-events-none opacity-85">
              <TreeVector size={110} />
            </div>
            <div className="absolute top-6 right-1/3 pointer-events-none">
              <SunVector size={54} className="animate-pulse" />
            </div>

            {/* Flying Butterflies with Answer Badges */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 my-auto w-full max-w-3xl mx-auto">
              {currentQ.options.map((opt, idx) => {
                const isAnswer = opt === currentQ.answer;
                const isChosen = selectedOption === opt;
                const isCaught = netTarget === opt;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isLocked}
                    className={`group flex flex-col items-center justify-center p-3 rounded-3xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                      isCaught ? 'scale-125 -translate-y-8 animate-bounce' : ''
                    } ${
                      isChosen
                        ? isAnswer
                          ? 'ring-4 ring-purple-300 bg-purple-200/90 shadow-2xl'
                          : 'ring-4 ring-rose-400 bg-rose-200/90'
                        : 'hover:bg-white/60'
                    }`}
                  >
                    <ButterflyVector
                      variant={idx}
                      size={68}
                      className="animate-bounce duration-700"
                    />
                    <div className="mt-1 bg-white dark:bg-slate-800 text-purple-900 dark:text-purple-200 font-black text-2xl md:text-3xl px-4 py-1 rounded-2xl shadow-lg border-2 border-purple-300 dark:border-purple-600">
                      {opt}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Meadow Grass and Butterfly Catcher Vector */}
            <div className="relative z-20 w-full flex items-center justify-between border-t-4 border-emerald-400 bg-emerald-500/90 px-6 py-2 rounded-2xl shadow-md">
              <div className="flex items-center gap-2">
                <ButterflyCatcherVector size={56} />
                <span className="text-white font-extrabold text-sm hidden sm:inline">
                  Catch the right butterfly!
                </span>
              </div>
              <div className="flex items-center gap-2 text-white font-black text-xs bg-emerald-600/80 px-4 py-1 rounded-full border border-emerald-400">
                <StarVector size={16} fill="#fef08a" />
                <span>Multiplication Garden</span>
              </div>
            </div>
          </div>
        )}

        {/* GAME STAGE 3: POP THE BALLOON */}
        {mode === 'balloon' && (
          <div className="relative w-full h-full min-h-[380px] md:min-h-[440px] bg-gradient-to-b from-purple-300 via-pink-200 to-amber-100 overflow-hidden flex flex-col justify-between p-4">
            {/* Carnival Banner */}
            <div className="w-full text-center">
              <span className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 font-black text-sm md:text-base px-6 py-1.5 rounded-full border-2 border-amber-500 shadow-md">
                <StarVector size={18} fill="#78350f" />
                <span>Aim Carefully & Pop the Correct Balloon!</span>
                <StarVector size={18} fill="#78350f" />
              </span>
            </div>

            {/* Bobbing Balloons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 my-auto w-full max-w-3xl mx-auto z-10">
              {currentQ.options.map((opt, idx) => {
                const isAnswer = opt === currentQ.answer;
                const isChosen = selectedOption === opt;
                const isPopped = balloonPopped === opt;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isLocked}
                    className={`group relative flex flex-col items-center justify-center p-3 rounded-3xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                      isPopped
                        ? 'scale-125'
                        : 'animate-bounce duration-1000'
                    }`}
                  >
                    {isPopped ? (
                      <BalloonBurstVector size={72} className="animate-scaleUp" />
                    ) : (
                      <div className="relative flex flex-col items-center">
                        <BalloonVector variant={idx} size={64} />
                        <div className="absolute top-6 inset-x-0 text-center font-black text-2xl md:text-3xl text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
                          {opt}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Dart Stand */}
            <div className="flex items-center justify-center py-2">
              <div className="bg-white/90 dark:bg-slate-800/90 px-6 py-2 rounded-full border-2 border-slate-300 dark:border-slate-600 font-extrabold text-xs md:text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-md">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                <span>Dart Ready • Click a Balloon to Launch</span>
              </div>
            </div>
          </div>
        )}

        {/* GAME STAGE 4: MULTIPLY TO HARVEST */}
        {mode === 'harvest' && (
          <div className="relative w-full h-full min-h-[380px] md:min-h-[440px] bg-gradient-to-b from-sky-200 via-emerald-100 to-emerald-300 overflow-hidden flex flex-col justify-between p-4">
            {/* Big Apple Tree with Hanging Apples */}
            <div className="relative flex-1 flex flex-col items-center justify-center">
              {/* Tree Canopy */}
              <div className="relative w-full max-w-xl h-60 bg-emerald-600 dark:bg-emerald-800 rounded-[60px] border-8 border-emerald-700 dark:border-emerald-900 shadow-xl flex items-center justify-center p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                  {currentQ.options.map((opt, idx) => {
                    const isHarvested = harvestedApple === opt;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(opt)}
                        disabled={isLocked}
                        className={`group relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 transform hover:scale-115 active:scale-95 ${
                          isHarvested ? 'translate-y-36 scale-75 opacity-0' : ''
                        }`}
                      >
                        <div className="relative">
                          <AppleVector size={64} className="transform group-hover:rotate-6 transition-transform" />
                          <span className="absolute inset-0 flex items-center justify-center text-white font-black text-xl md:text-2xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] pt-2">
                            {opt}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Tree Trunk */}
              <div className="w-16 h-14 bg-amber-900 border-4 border-amber-950 -mt-2 rounded-b-lg"></div>
            </div>

            {/* Bottom Picnic Basket */}
            <div className="flex items-center justify-center pb-2">
              <div className="flex items-center gap-3 bg-amber-100 dark:bg-slate-800 px-6 py-2 rounded-3xl border-4 border-amber-400 dark:border-amber-600 shadow-lg">
                <BasketVector size={54} />
                <div>
                  <div className="text-sm font-black text-amber-950 dark:text-amber-200">
                    Harvest Picnic Basket
                  </div>
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    Tap the correct apple to drop it into the basket!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GAME STAGE 5: MULTIPLICATION QUIZ */}
        {mode === 'quiz' && (
          <div className="relative w-full h-full min-h-[380px] md:min-h-[440px] bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 flex flex-col items-center justify-center p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
              {currentQ.options.map((opt, idx) => {
                const isAnswer = opt === currentQ.answer;
                const isChosen = selectedOption === opt;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(opt)}
                    disabled={isLocked}
                    className={`group relative flex items-center justify-between p-6 rounded-3xl border-4 shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                      isChosen
                        ? isAnswer
                          ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                          : 'bg-rose-500 text-white border-rose-600'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-purple-300 dark:border-purple-700 hover:border-purple-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-black text-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        {['A', 'B', 'C', 'D'][idx]}
                      </div>
                      <span className="font-black text-3xl md:text-4xl">{opt}</span>
                    </div>

                    <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center opacity-80">
                      {isChosen ? (
                        isAnswer ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />
                      ) : (
                        <span className="text-xs font-bold">➔</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK POPUP DIALOG */}
      {showFeedback && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-850 rounded-3xl border-4 border-amber-400 dark:border-slate-700 shadow-2xl p-6 md:p-8 flex flex-col items-center text-center animate-scaleUp">
            {/* Header Icon Vector */}
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 shadow-md ${
                isLastAnswerCorrect
                  ? 'bg-emerald-100 border-4 border-emerald-300 animate-bounce'
                  : 'bg-amber-100 border-4 border-amber-300'
              }`}
            >
              {isLastAnswerCorrect ? (
                <StarVector size={44} fill="#10b981" />
              ) : (
                <HelpCircle className="w-10 h-10 text-amber-600" />
              )}
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 font-['Fredoka',sans-serif]">
              {isLastAnswerCorrect ? 'That’s Correct! 🎉' : 'Let’s Work It Out Together!'}
            </h3>

            {/* Explanation & Math Visualizer */}
            <div className="w-full my-4">
              <MathVisualizer table={currentQ.table} multiplier={currentQ.multiplier} />
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 active:scale-95 text-white font-black text-xl md:text-2xl rounded-full shadow-[0_6px_0_#065f46] hover:shadow-[0_3px_0_#065f46] transition-all border-2 border-emerald-300 flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      )}

      {/* PAUSE OVERLAY MODAL */}
      {isPaused && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-850 rounded-3xl border-4 border-slate-300 dark:border-slate-700 p-6 md:p-8 text-center flex flex-col items-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-slate-750 flex items-center justify-center mb-2 border-2 border-amber-300">
              <Pause className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1">
              Game Paused
            </h3>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6">
              Take your time. Your progress is completely safe!
            </p>

            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => {
                  soundManager.playTap();
                  setIsPaused(false);
                }}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-lg rounded-2xl shadow-md flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Keep Playing</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playTap();
                  onGoHome();
                }}
                className="w-full py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-2xl"
              >
                Exit to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
