import React, { useState, useEffect } from 'react';
import { GameMode, GameStats } from './types';
import { soundManager } from './utils/audio';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { TableSelectScreen } from './components/TableSelectScreen';
import { GameScreen } from './components/GameScreen';
import { MemorizeScreen } from './components/MemorizeScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SettingsModal } from './components/SettingsModal';
import { BadgesModal } from './components/BadgesModal';
import { InstallPromptModal } from './components/InstallPromptModal';

type AppScreen = 'splash' | 'home' | 'tables' | 'game' | 'memorize' | 'results';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [selectedMode, setSelectedMode] = useState<GameMode>('fish');
  const [selectedTable, setSelectedTable] = useState<number>(2);
  const [lastScore, setLastScore] = useState<number>(0);
  const [lastTotal, setLastTotal] = useState<number>(10);

  // Sound and Appearance State
  const [soundMuted, setSoundMuted] = useState<boolean>(() => soundManager.getMuted());
  const [volume, setVolume] = useState<number>(() => soundManager.getVolume());
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('multiPlayDarkMode') === 'true';
    } catch {
      return false;
    }
  });

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);
  const [isInstallOpen, setIsInstallOpen] = useState<boolean>(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true
      );
    }
    return false;
  });

  // Mastery and Badges Stats
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem('multiPlayStats');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      gamesPlayed: 0,
      totalCorrect: 0,
      bestStreak: 0,
      tableMastery: {},
      unlockedStickers: ['first_play'],
    };
  });

  // Capture PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleTriggerNativeInstall = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsAppInstalled(true);
      }
      setDeferredPrompt(null);
      setIsInstallOpen(false);
    } catch (err) {
      console.log('Installation prompt error:', err);
    }
  };

  // Apply dark mode class to root HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('multiPlayDarkMode', String(darkMode));
    } catch {}
  }, [darkMode]);

  // Global user interaction listener to resume audio context seamlessly
  useEffect(() => {
    const handleGesture = () => {
      soundManager.unlockAudio();
    };
    window.addEventListener('pointerdown', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture);
    return () => {
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, []);

  const handleToggleMute = () => {
    const newMuted = !soundMuted;
    setSoundMuted(newMuted);
    soundManager.setMuted(newMuted);
  };

  const handleChangeVolume = (newVol: number) => {
    setVolume(newVol);
    soundManager.setVolume(newVol);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Screen transitions
  const handleStartFromSplash = () => {
    setCurrentScreen('home');
    soundManager.startMusic('menu');
  };

  const handleSelectMode = (mode: GameMode) => {
    setSelectedMode(mode);
    setCurrentScreen('tables');
  };

  const handleSelectTable = (table: number) => {
    setSelectedTable(table);
    if (selectedMode === 'memorize') {
      setCurrentScreen('memorize');
    } else {
      setCurrentScreen('game');
    }
  };

  const handleFinishGame = (score: number, total: number) => {
    setLastScore(score);
    setLastTotal(total);

    // Update stats & stickers
    setStats((prev) => {
      const newStickers = new Set<string>(prev.unlockedStickers);
      newStickers.add('first_play');

      if (score === 10) {
        newStickers.add('perfect_10');
      }
      if (selectedMode === 'fish' && score >= 8) newStickers.add('fish_master');
      if (selectedMode === 'butterfly' && score >= 8) newStickers.add('butterfly_hero');
      if (selectedMode === 'balloon' && score >= 8) newStickers.add('balloon_sniper');
      if (selectedMode === 'harvest' && score >= 8) newStickers.add('apple_harvester');
      if (selectedMode === 'quiz' && score >= 8) newStickers.add('quiz_champion');
      if (selectedMode === 'memorize') newStickers.add('memorize_scholar');

      const currentMastery = prev.tableMastery[selectedTable] || 0;
      const updatedMastery = score === 10 ? currentMastery + 1 : currentMastery;

      const updated: GameStats = {
        gamesPlayed: prev.gamesPlayed + 1,
        totalCorrect: prev.totalCorrect + score,
        bestStreak: Math.max(prev.bestStreak, score),
        tableMastery: {
          ...prev.tableMastery,
          [selectedTable]: updatedMastery,
        },
        unlockedStickers: Array.from(newStickers),
      };

      try {
        localStorage.setItem('multiPlayStats', JSON.stringify(updated));
      } catch {}

      return updated;
    });

    setCurrentScreen('results');
  };

  return (
    <div className="min-h-screen w-full font-sans antialiased text-slate-800 dark:text-slate-100 bg-sky-50 dark:bg-slate-900 transition-colors duration-300">
      {currentScreen === 'splash' && (
        <SplashScreen
          onStart={handleStartFromSplash}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenBadges={() => setIsBadgesOpen(true)}
          onOpenInstall={() => setIsInstallOpen(true)}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          onSelectMode={handleSelectMode}
          onBackToSplash={() => setCurrentScreen('splash')}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenBadges={() => setIsBadgesOpen(true)}
          soundMuted={soundMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {currentScreen === 'tables' && (
        <TableSelectScreen
          mode={selectedMode}
          onSelectTable={handleSelectTable}
          onBackToHome={() => {
            setCurrentScreen('home');
            soundManager.startMusic('menu');
          }}
          tableMastery={stats.tableMastery}
        />
      )}

      {currentScreen === 'game' && (
        <GameScreen
          mode={selectedMode}
          table={selectedTable}
          onFinishGame={handleFinishGame}
          onBackToTables={() => {
            setCurrentScreen('tables');
            soundManager.startMusic('menu');
          }}
          onGoHome={() => {
            setCurrentScreen('home');
            soundManager.startMusic('menu');
          }}
          soundMuted={soundMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {currentScreen === 'memorize' && (
        <MemorizeScreen
          table={selectedTable}
          onBackToTables={() => {
            setCurrentScreen('tables');
            soundManager.startMusic('menu');
          }}
          onGoHome={() => {
            setCurrentScreen('home');
            soundManager.startMusic('menu');
          }}
          soundMuted={soundMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {currentScreen === 'results' && (
        <ResultsScreen
          score={lastScore}
          total={lastTotal}
          mode={selectedMode}
          table={selectedTable}
          onPlayAgain={() => {
            if (selectedMode === 'memorize') setCurrentScreen('memorize');
            else setCurrentScreen('game');
          }}
          onChooseTable={() => setCurrentScreen('tables')}
          onGoHome={() => {
            setCurrentScreen('home');
            soundManager.startMusic('menu');
          }}
          onOpenBadges={() => setIsBadgesOpen(true)}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        soundMuted={soundMuted}
        onToggleMute={handleToggleMute}
        volume={volume}
        onChangeVolume={handleChangeVolume}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenInstall={() => setIsInstallOpen(true)}
      />

      {/* Badges & Sticker Book Modal */}
      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        unlockedStickerIds={stats.unlockedStickers}
      />

      {/* PWA Install on Phone Modal */}
      <InstallPromptModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        canPromptNative={!!deferredPrompt}
        onTriggerInstall={handleTriggerNativeInstall}
        isInstalled={isAppInstalled}
      />
    </div>
  );
}
