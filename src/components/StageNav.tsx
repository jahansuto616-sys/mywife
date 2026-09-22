import React, { useState } from 'react';
import { STAGES } from '../data/defaultData';
import { StageId } from '../types';
import { Heart, Sliders, ChevronRight, Gift, Award } from 'lucide-react';

interface StageNavProps {
  currentStageId: StageId;
  highestUnlockedStageIndex: number;
  onSelectStage: (stageId: StageId) => void;
  onOpenCustomize: () => void;
  onOpenLoveJar?: () => void;
  onOpenCertificate?: () => void;
}

export const StageNav: React.FC<StageNavProps> = ({
  currentStageId,
  highestUnlockedStageIndex,
  onSelectStage,
  onOpenCustomize,
  onOpenLoveJar,
  onOpenCertificate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentStage = STAGES.find((s) => s.id === currentStageId) || STAGES[0];
  const progressPercent = Math.round((currentStage.index / STAGES.length) * 100);

  return (
    <header className="fixed top-4 left-4 z-40 flex items-center gap-3">
      {/* Brand & Stage Selector */}
      <div className="relative">
        <button
          id="stage-selector-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 bg-[#170e24]/80 backdrop-blur-md border border-rose-500/30 px-3.5 py-1.5 rounded-full text-xs text-rose-200 hover:border-rose-400 hover:bg-[#201332]/90 transition-all shadow-lg"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="font-semibold text-white tracking-wide">
            {currentStage.index}. {currentStage.title}
          </span>
          <span className="text-[10px] text-rose-300/70 bg-rose-950/60 px-1.5 py-0.5 rounded-full border border-rose-800/40">
            {progressPercent}%
          </span>
        </button>

        {/* Dropdown Menu for chapters */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-[#140b22]/95 backdrop-blur-xl border border-rose-500/30 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
            <div className="px-3 py-2 border-b border-rose-900/40 text-xs text-rose-300/80 font-medium flex items-center justify-between">
              <span>All 12 Chapters &amp; Surprises</span>
              <span className="text-[10px] bg-rose-900/50 px-2 py-0.5 rounded-full text-rose-300">
                Tap Any Chapter
              </span>
            </div>
            <div className="max-h-72 overflow-y-auto py-1 space-y-1">
              {STAGES.map((stg) => {
                const isCurrent = stg.id === currentStageId;

                return (
                  <button
                    key={stg.id}
                    id={`nav-stage-item-${stg.id}`}
                    onClick={() => {
                      onSelectStage(stg.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                      isCurrent
                        ? 'bg-rose-500/20 text-white font-semibold border border-rose-500/40 shadow-sm'
                        : 'text-rose-200/90 hover:bg-rose-500/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-rose-400/60 font-mono w-4">
                        {String(stg.index).padStart(2, '0')}
                      </span>
                      <span>{stg.title}</span>
                    </div>
                    {isCurrent ? (
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-rose-400/60" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Special Keepsakes in Dropdown */}
            <div className="pt-2 mt-1 border-t border-rose-900/40 grid grid-cols-2 gap-1.5">
              {onOpenLoveJar && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenLoveJar();
                  }}
                  className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/30 text-[11px] text-rose-200 transition-colors"
                >
                  <Gift className="w-3.5 h-3.5 text-pink-300" />
                  <span>Love Jar 💌</span>
                </button>
              )}
              {onOpenCertificate && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCertificate();
                  }}
                  className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-amber-950/50 hover:bg-amber-900/70 border border-amber-500/30 text-[11px] text-amber-200 transition-colors"
                >
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Certificate 📜</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Love Jar Quick Button in Header */}
      {onOpenLoveJar && (
        <button
          onClick={onOpenLoveJar}
          className="flex items-center gap-1.5 bg-[#170e24]/80 backdrop-blur-md border border-rose-500/30 px-3 py-1.5 rounded-full text-xs text-rose-300 hover:text-white hover:border-rose-400 transition-all shadow-lg"
          title="Open Sweet Whispers Jar"
        >
          <Gift className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
          <span className="hidden sm:inline">Love Jar</span>
        </button>
      )}

      {/* Customize Drawer Trigger */}
      <button
        id="open-customize-btn"
        onClick={onOpenCustomize}
        className="flex items-center gap-1.5 bg-[#170e24]/90 backdrop-blur-md border border-rose-500/40 px-3 py-1.5 rounded-full text-xs text-rose-200 hover:text-white hover:border-rose-300 transition-all shadow-lg"
        title="Customize Names, Couple Photo, Timeline & Message"
      >
        <Sliders className="w-3.5 h-3.5 text-pink-400" />
        <span>Personalize</span>
      </button>
    </header>
  );
};
