import React, { useState } from 'react';
import { AppSettings } from '../../types';
import { Mail, Heart, Sparkles, ArrowRight, Stamp } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchHeartConfetti } from '../../utils/confetti';

interface Stage11LoveLetterProps {
  settings: AppSettings;
  onProceed: () => void;
}

export const Stage11LoveLetter: React.FC<Stage11LoveLetterProps> = ({ settings, onProceed }) => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (isLetterOpen) return;
    audioEngine.playCardFlip();
    audioEngine.playChime();
    setIsLetterOpen(true);
    launchHeartConfetti(0.5, 0.4);
  };

  const handleNext = () => {
    audioEngine.playFanfare();
    launchHeartConfetti(0.5, 0.5);
    onProceed();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10 text-rose-100 max-w-3xl mx-auto space-y-8 animate-in fade-in">
      {!isLetterOpen ? (
        /* Wax-sealed envelope view */
        <div className="w-full bg-[#160c27]/80 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs text-rose-300 uppercase tracking-widest font-semibold">
              Strictly Confidential & Sealed With Love
            </span>
            <h2 className="font-serif-romantic text-3xl sm:text-5xl font-bold text-white">
              A Letter From Your Husband
            </h2>
            <p className="text-sm text-rose-300/80 max-w-md mx-auto">
              Written straight from the heart. Tap the sealed wax stamp to unfold your birthday letter.
            </p>
          </div>

          {/* Interactive Envelope Graphic */}
          <div className="py-6 flex justify-center">
            <div
              id="envelope-wrapper"
              onClick={handleOpenEnvelope}
              className="cursor-pointer relative w-72 sm:w-96 h-48 sm:h-60 bg-[#eedbc5] rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.6)] border-2 border-[#d8be9f] flex flex-col items-center justify-center p-6 text-center transform hover:-translate-y-2 transition-all group"
            >
              {/* Envelope flap lines */}
              <div className="absolute top-0 inset-x-0 h-28 border-b-2 border-[#caa47e] bg-[#f8eadb] rounded-t-2xl shadow-sm clip-envelope" />
              
              {/* Wax Seal */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-800 to-rose-600 border-2 border-rose-950 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-rose-100 fill-rose-200" />
              </div>

              <span className="relative z-10 font-serif-romantic font-bold text-xs uppercase tracking-widest text-[#5c3c21] mt-3">
                To: {settings.wifeName}
              </span>
              <span className="relative z-10 text-[10px] text-[#865935] font-sans font-medium">
                Tap to break seal & open
              </span>
            </div>
          </div>

          <div>
            <button
              id="break-seal-btn"
              onClick={handleOpenEnvelope}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-sm shadow-lg shadow-rose-950 hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Open Birthday Envelope 💌</span>
            </button>
          </div>
        </div>
      ) : (
        /* Unfolded parchment paper letter */
        <div className="w-full bg-[#fdfbf7] text-[#2c1810] rounded-3xl p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-4 border-[#e9dfd0] space-y-6 animate-in zoom-in-95 duration-700 relative overflow-hidden">
          {/* Subtle parchment texture corner seal */}
          <div className="flex items-center justify-between border-b border-[#e5d5c0] pb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <span className="font-serif-romantic font-semibold text-xs tracking-wider uppercase text-[#8c5e3d]">
                Private & Everlasting
              </span>
            </div>
            <span className="text-xs font-serif-romantic italic text-[#8c5e3d]">
              {settings.birthdayDate}
            </span>
          </div>

          {/* Letter Body */}
          <div className="font-serif-romantic text-base sm:text-lg leading-relaxed space-y-4 whitespace-pre-line text-[#2d1b13]">
            {settings.loveLetter}
          </div>

          {/* Signoff */}
          <div className="pt-6 border-t border-[#e5d5c0] flex flex-col items-end">
            <span className="font-cursive text-3xl sm:text-4xl text-rose-700">
              {settings.husbandName}
            </span>
          </div>

          {/* Proceed to Grand Finale */}
          <div className="pt-6 text-center">
            <button
              id="letter-proceed-btn"
              onClick={handleNext}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-700 via-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-500 text-white font-semibold text-base shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all inline-flex items-center gap-2"
            >
              <span>Final Surprise: Eternal Beginning 🎆</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
