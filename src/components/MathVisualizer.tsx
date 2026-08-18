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
    <div className="w-full max-w-full bg-amber-50/80 dark:bg-slate-800 rounded-2xl p-3 md:p-4 border-2 border-amber-300 dark:border-slate-700 shadow-sm space-y-3 overflow-hidden">
      {/* Repeated Addition Explanation */}
      <div className="flex flex-col items-center text-center">
        <span className="text-[11px] uppercase tracking-wider font-black text-amber-900 dark:text-amber-300 mb-0.5">
          HOW TO THINK ABOUT IT:
        </span>
        <div className="text-base md:text-lg font-black text-slate-950 dark:text-amber-200">
          <span>{multiplier} groups of {table}</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-1 text-xs md:text-sm font-black text-slate-900 dark:text-slate-100 max-w-full">
          {Array.from({ length: multiplier }, (_, i) => (
            <React.Fragment key={i}>
              <span className="bg-amber-200/90 dark:bg-slate-700 px-2 py-0.5 rounded-lg border border-amber-400 dark:border-slate-600 font-black text-slate-950 dark:text-white">
                {table}
              </span>
              {i < multiplier - 1 && <span className="text-amber-600 dark:text-amber-400 font-black">+</span>}
            </React.Fragment>
          ))}
          <span className="text-slate-600 dark:text-slate-400 font-black">=</span>
          <span className="bg-emerald-600 dark:bg-emerald-500 text-white px-2.5 py-0.5 rounded-lg border border-emerald-700 font-black shadow-xs">
            {answer}
          </span>
        </div>
      </div>

      {/* Visual Dot / Icon Matrix Grid (Responsive & scrollable so it NEVER overflows) */}
      {table * multiplier <= 48 && (
        <div className="w-full flex flex-col items-center justify-center bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-200 dark:border-slate-700 max-w-full overflow-hidden">
          <div className="text-[11px] font-black text-slate-800 dark:text-slate-200 mb-1.5 text-center">
            Visual Grid ({multiplier} rows of {table}):
          </div>
          <div className="w-full overflow-x-auto pb-1.5 scrollbar-thin flex justify-center">
            <div className="flex flex-col gap-1 items-center min-w-max px-2">
              {Array.from({ length: multiplier }, (_, rowIdx) => (
                <div key={rowIdx} className="flex gap-1 items-center">
                  <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 w-3 text-right shrink-0">
                    {rowIdx + 1}
                  </span>
                  {Array.from({ length: table }, (_, colIdx) => (
                    <span
                      key={colIdx}
                      className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-amber-100 dark:bg-slate-800 border border-amber-300 dark:border-slate-600 rounded-md shadow-2xs shrink-0"
                      title={`Item ${(rowIdx * table) + colIdx + 1}`}
                    >
                      <StarVector size={14} fill="#f59e0b" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Jump Number Line */}
      <div className="w-full flex flex-col max-w-full overflow-hidden">
        <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 mb-1 text-center">
          Hop along the Number Line (+{table} each jump):
        </span>
        <div className="w-full overflow-x-auto pb-2 pt-1 scrollbar-thin flex justify-start sm:justify-center">
          <div className="flex items-center min-w-max gap-1 px-2">
            {steps.map((num, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`flex flex-col items-center px-2 py-0.5 rounded-xl border-2 font-black text-xs transition-all shrink-0 ${
                    idx === steps.length - 1
                      ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-700 scale-105 shadow-sm'
                      : idx === 0
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600'
                      : 'bg-amber-200 dark:bg-slate-800 text-amber-950 dark:text-amber-200 border-amber-300 dark:border-slate-600'
                  }`}
                >
                  <span className="font-black">{num}</span>
                  {idx > 0 && (
                    <span className="text-[8px] font-bold opacity-90">
                      hop {idx}
                    </span>
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <span className="text-amber-600 dark:text-amber-400 font-black text-xs px-0.5 shrink-0">
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
