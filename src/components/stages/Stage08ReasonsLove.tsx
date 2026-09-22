import React, { useState } from 'react';
import { AppSettings } from '../../types';
import { Sparkles, Heart, ArrowRight, Camera, Check } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchHeartConfetti } from '../../utils/confetti';

interface Stage08ReasonsLoveProps {
  settings: AppSettings;
  onProceed: () => void;
}

export const Stage08ReasonsLove: React.FC<Stage08ReasonsLoveProps> = ({ settings, onProceed }) => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleCardClick = (idx: number) => {
    audioEngine.playCardFlip();
    const isNowFlipped = !flippedCards[idx];
    setFlippedCards((prev) => ({ ...prev, [idx]: isNowFlipped }));
    if (isNowFlipped) {
      launchHeartConfetti(0.5, 0.4);
    }
  };

  const flippedCount = Object.values(flippedCards).filter(Boolean).length;

  const handleNext = () => {
    audioEngine.playChime();
    launchHeartConfetti(0.5, 0.4);
    onProceed();
  };

  return (
    <div className="relative min-h-[85vh] max-w-6xl mx-auto px-4 py-8 z-10 text-rose-100 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold uppercase tracking-widest">
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          <span>Chapter 04 • 10 Reasons I Love You</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-5xl font-bold text-white">
          10 Reasons My Soul Chose You
        </h2>
        <p className="text-sm text-rose-300/80 max-w-lg mx-auto">
          Click each photo card to flip and reveal the reason why you are my whole world. ({flippedCount}/10 revealed)
        </p>
      </div>

      {/* 10 Interactive Flipping Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {settings.photos.map((photo, idx) => {
          const isFlipped = !!flippedCards[idx];
          const reasonText = photo.reason || settings.reasons[idx] || `Reason #${idx + 1}`;

          return (
            <div
              key={photo.id}
              id={`reason-card-${idx}`}
              onClick={() => handleCardClick(idx)}
              className="h-72 cursor-pointer perspective-1000 select-none group"
            >
              <div
                className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform rounded-2xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Card Front: Photo */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-rose-500/30 group-hover:border-rose-400/80 transition-all shadow-lg bg-[#1a0e2d]">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/20 flex flex-col justify-between p-3.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] text-rose-200 bg-rose-950/70 px-2 py-0.5 rounded-full border border-rose-700/40">
                        Tap to flip ✨
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white truncate">
                        {photo.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Card Back: Reason */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-5 bg-gradient-to-b from-[#2a1343] via-[#1e0e31] to-[#160b26] border border-rose-400/60 flex flex-col justify-between text-center shadow-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-amber-300">
                      Reason #{idx + 1}
                    </span>
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
                  </div>

                  <div className="my-auto py-2">
                    <p className="font-serif-romantic text-base sm:text-lg text-rose-100 font-medium leading-relaxed italic">
                      “{reasonText}”
                    </p>
                  </div>

                  <div className="pt-2 border-t border-rose-900/40">
                    <span className="text-[10px] text-rose-400/70 flex items-center justify-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> Read with all my love
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Step Banner */}
      <div className="text-center pt-8 border-t border-rose-900/40">
        <button
          id="reasons-proceed-btn"
          onClick={handleNext}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white font-semibold text-base shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_45px_rgba(244,63,94,0.7)] transition-all transform hover:-translate-y-1"
        >
          <span>Next: Birthday Cake Interaction 🎂</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
