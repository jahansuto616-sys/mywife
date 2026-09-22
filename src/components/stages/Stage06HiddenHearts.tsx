import React, { useState } from 'react';
import { AppSettings, HiddenHeart } from '../../types';
import { Heart, Sparkles, Lock, Unlock, ArrowRight, Gift } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchHeartConfetti } from '../../utils/confetti';

interface Stage06HiddenHeartsProps {
  settings: AppSettings;
  onProceed: () => void;
}

const DEFAULT_HEARTS: HiddenHeart[] = [
  { id: 'h1', top: 22, left: 16, message: '“You are my favorite person in the entire world.”', hint: 'Near the top-left stardust' },
  { id: 'h2', top: 70, left: 20, message: '“You make my world brighter even on the darkest days.”', hint: 'Down in the tranquil corner' },
  { id: 'h3', top: 26, left: 82, message: '“I would choose you again in every lifetime, without pause.”', hint: 'Among the high evening stars' },
  { id: 'h4', top: 74, left: 78, message: '“You are my home, my peace, and my safe haven.”', hint: 'Near the gentle warm dusk' },
  { id: 'h5', top: 88, left: 50, message: '“And now... your biggest birthday surprise is waiting.”', hint: 'Floating beneath the radiant heart' },
];

export const Stage06HiddenHearts: React.FC<Stage06HiddenHeartsProps> = ({ settings, onProceed }) => {
  const [foundHeartIds, setFoundHeartIds] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const isAllFound = foundHeartIds.length >= DEFAULT_HEARTS.length;

  const handleHeartClick = (heart: HiddenHeart) => {
    audioEngine.playHeartPop();
    launchHeartConfetti(heart.left / 100, heart.top / 100);

    if (!foundHeartIds.includes(heart.id)) {
      const nextFound = [...foundHeartIds, heart.id];
      setFoundHeartIds(nextFound);
      if (nextFound.length === DEFAULT_HEARTS.length) {
        audioEngine.playFanfare();
      }
    }
    setActiveMessage(heart.message);
  };

  const handleOpenGift = () => {
    audioEngine.playChime();
    launchHeartConfetti(0.5, 0.5);
    onProceed();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-between px-4 py-8 z-10 text-rose-100 max-w-4xl mx-auto animate-in fade-in">
      {/* Header Info */}
      <div className="text-center space-y-2 z-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Mini Game #3 • Unlock My Heart</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-4xl font-bold text-white">
          Find the 5 Secret Hearts
        </h2>
        <p className="text-xs sm:text-sm text-rose-300/80 max-w-md mx-auto">
          Tap the 5 glowing hearts floating in the constellation to unlock each romantic message and reveal your gift.
        </p>
      </div>

      {/* Interactive Heart Garden Canvas Stage */}
      <div className="relative w-full h-[460px] sm:h-[500px] my-6 rounded-3xl bg-[#130922]/80 backdrop-blur-md border border-rose-500/30 overflow-hidden shadow-2xl flex items-center justify-center select-none">
        {/* Radar / Pulsing circles in center */}
        <div className="absolute w-72 h-72 rounded-full border border-rose-500/10 animate-ping opacity-25 pointer-events-none" />
        <div className="absolute w-96 h-96 rounded-full border border-rose-500/15 pointer-events-none" />

        {/* Big Animated Center Heart */}
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
          <div className="relative cursor-pointer transition-transform hover:scale-105 duration-300">
            <Heart
              className={`w-28 h-28 sm:w-36 sm:h-36 transition-all duration-700 ${
                isAllFound
                  ? 'text-rose-500 fill-rose-500 filter drop-shadow-[0_0_35px_rgba(244,63,94,0.9)] animate-pulse'
                  : 'text-rose-600/70 fill-rose-900/40 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]'
              }`}
            />
            {isAllFound ? (
              <Unlock className="w-8 h-8 text-amber-300 absolute inset-0 m-auto animate-bounce" />
            ) : (
              <Lock className="w-8 h-8 text-rose-300/80 absolute inset-0 m-auto" />
            )}
          </div>

          <span className="text-xs sm:text-sm font-semibold tracking-wide text-rose-200 mt-3">
            {isAllFound ? (
              <span className="text-amber-300 font-bold flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-4 h-4" /> 5 OF 5 HEARTS FOUND — UNLOCKED!
              </span>
            ) : (
              `${foundHeartIds.length} of 5 Secret Hearts Found`
            )}
          </span>
        </div>

        {/* 5 Hidden Floating Hearts */}
        {DEFAULT_HEARTS.map((heart, idx) => {
          const isFound = foundHeartIds.includes(heart.id);
          return (
            <button
              key={heart.id}
              id={`hidden-heart-target-${heart.id}`}
              onClick={() => handleHeartClick(heart)}
              style={{ top: `${heart.top}%`, left: `${heart.left}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-500 group z-20 ${
                isFound
                  ? 'bg-rose-500/20 border border-rose-400 scale-110 shadow-[0_0_20px_rgba(244,63,94,0.7)]'
                  : 'bg-rose-900/40 border border-rose-500/40 hover:scale-125 animate-float shadow-md'
              }`}
              title={`Heart #${idx + 1}`}
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  isFound
                    ? 'text-rose-400 fill-rose-500'
                    : 'text-rose-300/80 fill-rose-400/40 group-hover:fill-rose-500'
                }`}
              />
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-rose-300 font-mono whitespace-nowrap bg-black/60 px-1.5 py-0.2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                #{idx + 1}
              </span>
            </button>
          );
        })}

        {/* Active Unlocked Message Card Overlay */}
        {activeMessage && (
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-12 z-30 p-4 bg-[#1f1036]/90 backdrop-blur-lg border border-rose-400/60 rounded-2xl text-center shadow-2xl animate-in slide-in-from-bottom-4">
            <p className="font-serif-romantic text-base sm:text-lg text-white font-medium italic">
              {activeMessage}
            </p>
          </div>
        )}
      </div>

      {/* Action Navigation Controls */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 z-20 pt-2">
        {!isAllFound && (
          <button
            id="reveal-all-hearts-btn"
            onClick={() => {
              setFoundHeartIds(DEFAULT_HEARTS.map((h) => h.id));
              audioEngine.playFanfare();
              launchHeartConfetti(0.5, 0.4);
            }}
            className="px-5 py-2.5 rounded-full bg-rose-950/70 hover:bg-rose-900/90 border border-rose-600/40 text-rose-200 text-xs font-medium transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Find All Secret Stars For Me ✨</span>
          </button>
        )}

        <button
          id="open-birthday-gift-btn"
          onClick={handleOpenGift}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all transform hover:scale-105 inline-flex items-center gap-2.5"
        >
          <Gift className="w-5 h-5 text-white" />
          <span>Open Your Birthday Gift 🎁</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
