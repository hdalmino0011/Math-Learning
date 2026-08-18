import React from 'react';
import { soundManager } from '../utils/audio';
import { X, Smartphone, Download, Share, PlusSquare, Check } from 'lucide-react';

interface InstallPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  canPromptNative: boolean;
  onTriggerInstall: () => void;
  isInstalled: boolean;
}

export const InstallPromptModal: React.FC<InstallPromptModalProps> = ({
  isOpen,
  onClose,
  canPromptNative,
  onTriggerInstall,
  isInstalled,
}) => {
  if (!isOpen) return null;

  const isIOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-850 rounded-3xl p-6 md:p-8 border-4 border-emerald-400 dark:border-slate-700 shadow-2xl flex flex-col items-center text-center animate-scaleUp max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playTap();
            onClose();
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-slate-300 dark:border-slate-600"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center mb-3 border-2 border-emerald-300 text-emerald-600 dark:text-emerald-400 shadow-inner">
          <Smartphone className="w-8 h-8" />
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 font-['Fredoka',sans-serif] mb-1">
          Install Multi Play!
        </h3>
        <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 mb-6">
          Install on your phone or tablet for instant offline play anytime!
        </p>

        {isInstalled ? (
          <div className="w-full p-4 bg-emerald-50 dark:bg-slate-800 rounded-2xl border-2 border-emerald-300 dark:border-emerald-600 flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-emerald-900 dark:text-emerald-300">
                App is already installed!
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-400">
                You can launch it directly from your home screen or app drawer.
              </div>
            </div>
          </div>
        ) : canPromptNative ? (
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={() => {
                soundManager.playTap();
                onTriggerInstall();
              }}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-95 text-white font-black text-lg md:text-xl rounded-2xl shadow-[0_6px_0_#065f46] hover:shadow-[0_2px_0_#065f46] transition-all flex items-center justify-center gap-2 border-2 border-emerald-200"
            >
              <Download className="w-6 h-6" />
              <span>Tap to Install on Phone</span>
            </button>
            <p className="text-xs font-bold text-slate-400">
              Works 100% offline with no Wi-Fi or data needed!
            </p>
          </div>
        ) : isIOS ? (
          <div className="w-full bg-amber-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-amber-300 dark:border-slate-700 text-left space-y-3">
            <div className="font-extrabold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <span>How to install on iPhone & iPad:</span>
            </div>
            <ol className="text-xs font-bold text-slate-600 dark:text-slate-300 space-y-2 list-decimal list-inside">
              <li className="flex items-start gap-2">
                <span className="font-black text-amber-600">1.</span>
                <span>
                  Tap the <strong className="text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 inline" /> Share</strong> button at the bottom of Safari.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-black text-amber-600">2.</span>
                <span>
                  Scroll down and select <strong className="text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1"><PlusSquare className="w-3.5 h-3.5 inline" /> Add to Home Screen</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-black text-amber-600">3.</span>
                <span>
                  Tap <strong className="text-slate-800 dark:text-slate-100">Add</strong> at top-right to finish!
                </span>
              </li>
            </ol>
          </div>
        ) : (
          <div className="w-full bg-sky-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-sky-300 dark:border-slate-700 text-left space-y-2 text-xs font-bold text-slate-600 dark:text-slate-300">
            <div className="font-extrabold text-sm text-sky-900 dark:text-sky-300">
              How to install on Android Chrome / Edge:
            </div>
            <p>
              1. Tap the <strong>three dots menu (⋮)</strong> at the top or bottom right of your browser.
            </p>
            <p>
              2. Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
            </p>
            <p>
              3. Tap <strong>Install</strong> to add Multi Play to your phone.
            </p>
          </div>
        )}

        <button
          onClick={() => {
            soundManager.playTap();
            onClose();
          }}
          className="mt-6 w-full py-3 bg-slate-100 dark:bg-slate-750 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-2xl"
        >
          Close
        </button>
      </div>
    </div>
  );
};
