export type GameMode = 'fish' | 'butterfly' | 'quiz' | 'balloon' | 'harvest' | 'memorize';

export interface Question {
  table: number;
  multiplier: number;
  answer: number;
  options: number[];
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number; // 0 to 1
  darkMode: boolean;
  speechEnabled: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  totalCorrect: number;
  bestStreak: number;
  tableMastery: Record<number, number>; // table -> count of perfect runs
  unlockedStickers: string[];
}

export interface Sticker {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
