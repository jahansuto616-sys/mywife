import React, { useState, useEffect } from 'react';
import { AppSettings } from '../../types';
import { Eye, Heart, Sparkles, ArrowRight, Lock, Key } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchHeartConfetti } from '../../utils/confetti';

interface Stage10SecretMessageProps {
  settings: AppSettings;
  onProceed: () => void;
}

export const Stage10SecretMessage: React.FC<Stage10SecretMessageProps> = ({ settings, onProceed }) => {
  const [isSecretRevealed, setIsSecretRevealed] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  // Typewriter sequence steps
  const messageParts = [
    settings.secretMessagePart1,
    settings.secretMessagePart2,
    settings.secretMessagePart3,
    settings.secretMessagePart4,
  ];

  const handleRevealSecret = () => {
    audioEngine.playChime();
    setIsSecretRevealed(true);
    setStepIndex(1);
  };

  useEffect(() => {
    if (isSecretRevealed && stepIndex > 0 && stepIndex < messageParts.length) {
      const timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
        audioEngine.playHeartPop();
        if (stepIndex + 1 === messageParts.length) {
          launchHeartConfetti(0.5, 0.5);
        }
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [isSecretRevealed, stepIndex, messageParts.length]);

  const handleNext = () => {
    audioEngine.playChime();
    launchHeartConfetti(0.5, 0.4);
    onProceed();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10 text-rose-100 max-w-2xl mx-auto text-center space-y-8 animate-in fade-in">
      {!isSecretRevealed ? (
        /* Hidden discovery trigger view */
        <div className="w-full bg-[#160c27]/80 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-950/60 border border-rose-600/40 flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-rose-400" />
          </div>

          <h2 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-white">
            A Whispered Thought Just For You
          </h2>
          <p className="text-sm text-rose-300/80 max-w-md mx-auto">
            Before we open the envelope, there's a private reflection that lives deep in my quietest thoughts.
          </p>

          <div className="pt-4">
            <button
              id="reveal-secret-trigger-btn"
              onClick={handleRevealSecret}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-900 via-rose-900 to-indigo-950 border border-rose-400/60 hover:border-rose-300 text-rose-100 hover:text-white font-medium text-sm sm:text-base shadow-[0_0_25px_rgba(244,63,94,0.3)] hover:shadow-[0_0_40px_rgba(244,63,94,0.6)] transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-2.5"
            >
              <Eye className="w-4 h-4 text-amber-300 group-hover:animate-pulse" />
              <span>Psst... there's one more thing 👀</span>
            </button>
          </div>
        </div>
      ) : (
        /* Dramatic Deep Darkened Screen with Typewriter pacing */
        <div className="w-full bg-[#07050d]/95 backdrop-blur-2xl border border-rose-500/20 rounded-3xl p-8 sm:p-14 shadow-2xl space-y-8 animate-in fade-in duration-1000">
          <div className="flex justify-center">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500/50 animate-pulse" />
          </div>

          <div className="space-y-6 py-4 font-serif-romantic text-lg sm:text-2xl text-rose-100/95 leading-relaxed italic max-w-xl mx-auto">
            {stepIndex >= 1 && (
              <p className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                “{messageParts[0]}”
              </p>
            )}

            {stepIndex >= 2 && (
              <p className="animate-in fade-in slide-in-from-bottom-2 duration-700 text-rose-200">
                “{messageParts[1]}”
              </p>
            )}

            {stepIndex >= 3 && (
              <p className="animate-in fade-in slide-in-from-bottom-2 duration-700 text-rose-300/90 font-light">
                “{messageParts[2]}”
              </p>
            )}

            {stepIndex >= 4 && (
              <p className="animate-in zoom-in-95 duration-1000 text-xl sm:text-3xl font-bold not-italic font-serif-romantic text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-200 to-amber-200 pt-3">
                {messageParts[3]}
              </p>
            )}
          </div>

          {stepIndex >= 4 && (
            <div className="pt-6 border-t border-rose-900/30 animate-in fade-in duration-700">
              <button
                id="secret-proceed-btn"
                onClick={handleNext}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-base shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all inline-flex items-center gap-2"
              >
                <span>Next: Love Letter From Your Husband 💌</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
