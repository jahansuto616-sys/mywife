import React, { useState } from 'react';
import { AppSettings } from '../../types';
import { Gift, Sparkles, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchBirthdayExplosion, launchHeartConfetti } from '../../utils/confetti';

interface Stage07GiftBoxProps {
  settings: AppSettings;
  onProceed: () => void;
}

export const Stage07GiftBox: React.FC<Stage07GiftBoxProps> = ({ settings, onProceed }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);
    audioEngine.playFanfare();
    launchBirthdayExplosion();
  };

  const handleNext = () => {
    audioEngine.playChime();
    launchHeartConfetti(0.5, 0.4);
    onProceed();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10 text-rose-100 max-w-3xl mx-auto animate-in fade-in">
      {!isOpen ? (
        /* Sealed Gift Box View */
        <div className="w-full bg-[#160c27]/80 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs text-rose-300 uppercase tracking-widest font-semibold">
              Special Delivery For {settings.wifeName}
            </span>
            <h2 className="font-serif-romantic text-3xl sm:text-5xl font-bold text-white">
              A Gift Wrapped With Love
            </h2>
            <p className="text-sm text-rose-300/80 max-w-md mx-auto">
              You unlocked the heart lock! Now gently untie the golden ribbon to reveal what's waiting inside.
            </p>
          </div>

          {/* 3D-styled animated Gift Box */}
          <div className="py-6 flex justify-center">
            <div
              onClick={handleOpenGift}
              className="group cursor-pointer relative p-8 rounded-3xl bg-gradient-to-tr from-rose-700 via-pink-600 to-rose-500 shadow-[0_0_60px_rgba(244,63,94,0.5)] hover:shadow-[0_0_80px_rgba(244,63,94,0.8)] transition-all duration-500 transform hover:scale-105 active:scale-95 animate-pulse-glow"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 flex flex-col items-center justify-center text-white relative">
                {/* Ribbon overlay */}
                <div className="absolute inset-y-0 w-6 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 shadow-md" />
                <div className="absolute inset-x-0 h-6 bg-gradient-to-b from-amber-300 via-amber-200 to-amber-400 shadow-md" />
                <Gift className="w-16 h-16 sm:w-20 sm:h-20 text-white z-10 drop-shadow-md group-hover:rotate-6 transition-transform" />
                <Sparkles className="w-8 h-8 text-amber-200 absolute -top-4 -right-4 animate-bounce z-20" />
              </div>
            </div>
          </div>

          <div>
            <button
              id="open-gift-trigger-btn"
              onClick={handleOpenGift}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-rose-950 hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              <span>OPEN GIFT 🎁</span>
            </button>
          </div>
        </div>
      ) : (
        /* Unwrapped Promises View */
        <div className="w-full bg-[#160c27]/90 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 animate-in zoom-in-95 duration-700">
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-amber-400/20 text-amber-300 mb-1">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif-romantic text-2xl sm:text-4xl font-bold text-white">
              “My gift isn't something I can put inside a box...”
            </h3>
            <p className="font-cursive text-3xl sm:text-4xl text-rose-300 font-normal">
              “It's a lifelong promise.”
            </p>
          </div>

          {/* List of 5 Sacred Promises */}
          <div className="space-y-3 py-2">
            {settings.promises.map((promise, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#221239]/90 border border-rose-800/60 shadow-md hover:border-rose-500/80 transition-all flex items-start gap-3.5"
              >
                <div className="p-1 rounded-full bg-rose-500/20 text-rose-300 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                </div>
                <p className="text-sm sm:text-base text-rose-100 font-medium leading-relaxed">
                  {promise}
                </p>
              </div>
            ))}
          </div>

          {/* Proceed Button */}
          <div className="text-center pt-4 border-t border-rose-900/40">
            <button
              id="gift-proceed-btn"
              onClick={handleNext}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-base shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all inline-flex items-center gap-2"
            >
              <span>Next: 10 Reasons I Love You 📸</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
