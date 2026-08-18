import React from 'react';
import { StarVector } from './illustrations/VectorGraphics';

interface MathVisualizerProps {
  table: number;
  multiplier: number;
}

export const MathVisualizer: React.FC<MathVisualizerProps> = ({
  table,
  multiplier,
}) => {
  const answer = table * multiplier;
  const steps = Array.from({ length: multiplier + 1 }, (_, i) => i * table);

  return (
    <div className="w-full bg-white/90 dark:bg-slate-800/95 rounded-2xl p-4 border-2 border-amber-200 dark:border-slate-700 shadow-md space-y-4">
      {/* Repeated Addition Explanation */}
      <div className="flex flex-col items-center text-center">
        <span className="text-xs uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400 mb-1">
          How to think about it:
        </span>
        <div className="text-lg md:text-xl font-black text-slate-800 dark:text-amber-200">
          <span>{multiplier} groups of {table}</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-1 text-sm md:text-base font-bold text-slate-600 dark:text-slate-300">
          {Array.from({ length: multiplier }, (_, i) => (
            <React.Fragment key={i}>
              <span className="bg-amber-100 dark:bg-slate-700 px-2 py-0.5 rounded-lg border border-amber-300 dark:border-slate-600">
                {table}
              </span>
              {i < multiplier - 1 && <span className="text-amber-500 font-extrabold">+</span>}
            </React.Fragment>
          ))}
          <span className="text-slate-400 font-black">=</span>
          <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-lg border border-emerald-300 dark:border-emerald-700 font-black">
            {answer}
          </span>
        </div>
      </div>

      {/* Visual Dot / Icon Matrix Grid (for multipliers up to 40 items) */}
      {table * multiplier <= 40 && (
        <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
            Visual Grid ({multiplier} rows of {table}):
          </div>
          <div className="flex flex-col gap-1.5 items-center">
            {Array.from({ length: multiplier }, (_, rowIdx) => (
              <div key={rowIdx} className="flex gap-1.5 items-center">
                <span className="text-[10px] font-bold text-slate-400 w-4 text-right">
                  {rowIdx + 1}
                </span>
                {Array.from({ length: table }, (_, colIdx) => (
                  <span
                    key={colIdx}
                    className="w-7 h-7 flex items-center justify-center bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-600 rounded-lg shadow-xs transform hover:scale-125 transition-transform"
                    title={`Item ${(rowIdx * table) + colIdx + 1}`}
                  >
                    <StarVector size={16} fill="#f59e0b" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Jump Number Line */}
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
          Hop along the Number Line (+{table} each jump):
        </span>
        <div className="overflow-x-auto pb-2 pt-1 scrollbar-thin">
          <div className="flex items-center min-w-max gap-1">
            {steps.map((num, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`flex flex-col items-center px-2.5 py-1 rounded-xl border-2 font-black text-xs transition-all ${
                    idx === steps.length - 1
                      ? 'bg-emerald-500 text-white border-emerald-600 scale-110 shadow-sm'
                      : idx === 0
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                      : 'bg-amber-100 dark:bg-slate-800 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-slate-600'
                  }`}
                >
                  <span>{num}</span>
                  {idx > 0 && (
                    <span className="text-[9px] font-normal opacity-80">
                      hop {idx}
                    </span>
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-amber-500 dark:text-amber-400 font-extrabold text-sm px-0.5">
                    ➔
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
