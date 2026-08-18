import React from 'react';
import { soundManager } from '../utils/audio';
import { X, Volume2, VolumeX, Moon, Sun, ShieldCheck, Settings } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundMuted: boolean;
  onToggleMute: () => void;
  volume: number;
  onChangeVolume: (vol: number) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundMuted,
  onToggleMute,
  volume,
  onChangeVolume,
  darkMode,
  onToggleDarkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-850 rounded-3xl p-6 md:p-8 border-4 border-amber-300 dark:border-slate-700 shadow-2xl flex flex-col items-center text-center animate-scaleUp max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playTap();
            onClose();
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-2 border-rose-300 dark:border-rose-700"
          title="Close Settings"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-slate-700 flex items-center justify-center mb-2 border-2 border-amber-300 dark:border-slate-600 text-amber-600 dark:text-amber-400">
          <Settings className="w-8 h-8" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 font-['Fredoka',sans-serif] mb-1">
          Game Settings
        </h3>
        <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 mb-6">
          Adjust volume, audio, and screen appearance
        </p>

        {/* Volume Slider Control */}
        <div className="w-full bg-amber-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-amber-200 dark:border-slate-700 mb-4 flex flex-col items-center">
          <div className="flex items-center justify-between w-full text-xs font-black text-slate-600 dark:text-slate-300 mb-2">
            <span>Audio Volume</span>
            <span className="text-amber-600 dark:text-amber-400">{Math.round(volume * 100)}%</span>
          </div>

          <div className="flex items-center gap-3 w-full">
            <VolumeX className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
              className="flex-1 accent-emerald-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <Volume2 className="w-4 h-4 text-emerald-500" />
          </div>
        </div>

        {/* Sound FX & Music Toggle */}
        <div className="w-full mb-4">
          <button
            onClick={() => {
              soundManager.playTap();
              onToggleMute();
            }}
            className={`w-full py-3 px-4 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-2 border-2 ${
              soundMuted
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                : 'bg-emerald-500 hover:bg-emerald-400 text-white border-emerald-600 shadow-md'
            }`}
          >
            {soundMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span>{soundMuted ? 'Sounds Off' : 'Sounds & Music On'}</span>
          </button>
        </div>

        {/* Day / Night Mode Toggle */}
        <div className="w-full mb-6">
          <button
            onClick={() => {
              soundManager.playTap();
              onToggleDarkMode();
            }}
            className="w-full py-3 px-4 rounded-2xl font-black text-base bg-indigo-50 dark:bg-slate-800 text-indigo-900 dark:text-indigo-200 border-2 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            <span>{darkMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}</span>
          </button>
        </div>

        {/* Offline Badge */}
        <div className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-black border border-emerald-300 dark:border-emerald-700 mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>100% Offline Compatible • Zero Internet Required</span>
        </div>

        {/* Credits */}
        <div className="w-full pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs flex flex-col items-center gap-1">
          <span className="uppercase tracking-widest text-[10px] font-extrabold text-slate-400">
            Original Game Creators
          </span>
          <strong className="text-slate-700 dark:text-slate-200 font-extrabold">Steve Niño I. Larino</strong>
          <strong className="text-slate-700 dark:text-slate-200 font-extrabold">Hanz Dee L. Dalmino</strong>
          <span className="text-[10px] text-slate-400 mt-1">Multi Play! Times Tables Adventure • Version 50</span>
        </div>
      </div>
    </div>
  );
};
