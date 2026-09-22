import React, { useState } from 'react';
import { AppSettings } from '../../types';
import { Cake, Sparkles, Heart, Crown, ArrowRight, RotateCcw, Wind } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchBirthdayExplosion, launchHeartConfetti } from '../../utils/confetti';

interface Stage09BirthdayCakeProps {
  settings: AppSettings;
  onProceed: () => void;
}

export const Stage09BirthdayCake: React.FC<Stage09BirthdayCakeProps> = ({ settings, onProceed }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    audioEngine.playBlowCandles();
    setCandlesBlown(true);

    setTimeout(() => {
      audioEngine.playFanfare();
      launchBirthdayExplosion();
      setWishMade(true);
    }, 600);
  };

  const handleRelight = () => {
    setCandlesBlown(false);
    setWishMade(false);
  };

  const handleNext = () => {
    audioEngine.playChime();
    launchHeartConfetti(0.5, 0.4);
    onProceed();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10 text-rose-100 max-w-3xl mx-auto text-center space-y-8 animate-in fade-in">
      <div className="w-full bg-[#160c27]/85 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-6">
        {/* Floating Balloons effect when wish made */}
        {wishMade && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            <span className="absolute text-3xl animate-float" style={{ left: '10%', bottom: '20%' }}>🎈</span>
            <span className="absolute text-4xl animate-float" style={{ left: '25%', bottom: '40%', animationDelay: '1s' }}>🎈</span>
            <span className="absolute text-3xl animate-float" style={{ right: '15%', bottom: '30%', animationDelay: '0.5s' }}>💖</span>
            <span className="absolute text-4xl animate-float" style={{ right: '28%', bottom: '50%', animationDelay: '1.5s' }}>🎈</span>
            <span className="absolute text-3xl animate-float" style={{ left: '48%', bottom: '60%', animationDelay: '0.8s' }}>✨</span>
          </div>
        )}

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold uppercase tracking-widest">
            <Cake className="w-3.5 h-3.5 text-amber-300" />
            <span>Chapter 05 • Interactive Birthday Cake</span>
          </div>
          <h2 className="font-serif-romantic text-3xl sm:text-5xl font-bold text-white">
            {wishMade ? 'Your Wish Has Been Whispered to the Stars ✨' : 'Make a Wish & Blow the Candles'}
          </h2>
          <p className="text-sm text-rose-300/80 max-w-md mx-auto">
            {candlesBlown
              ? 'May every hope and happiness you held in your heart come true this year!'
              : 'Close your eyes, make your dearest secret wish, then click the flickering candles.'}
          </p>
        </div>

        {/* Beautiful Animated Multi-Tier Birthday Cake Graphic */}
        <div className="py-6 flex flex-col items-center justify-center select-none">
          <div
            id="birthday-cake-container"
            onClick={handleBlowCandles}
            className={`relative cursor-pointer transition-transform duration-300 ${
              !candlesBlown ? 'hover:scale-105 active:scale-95' : ''
            }`}
            title={candlesBlown ? 'Candles blown out!' : 'Click to blow out candles!'}
          >
            {/* Candles row */}
            <div className="flex justify-center items-end gap-5 mb-1 z-10 relative">
              {[1, 2, 3].map((candleIdx) => (
                <div key={candleIdx} className="flex flex-col items-center">
                  {/* Flame or smoke */}
                  {!candlesBlown ? (
                    <div className="relative">
                      {/* Glow halo */}
                      <div className="absolute -inset-2 bg-amber-400/40 rounded-full blur-sm animate-pulse" />
                      {/* Flame teardrop */}
                      <div className="w-3.5 h-6 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full animate-bounce shadow-[0_0_15px_#f59e0b]" />
                    </div>
                  ) : (
                    <div className="h-6 flex items-start justify-center">
                      <Wind className="w-4 h-4 text-gray-400/80 animate-ping duration-1000" />
                    </div>
                  )}
                  {/* Candle Stick */}
                  <div className="w-2.5 h-9 bg-gradient-to-b from-rose-200 via-pink-300 to-rose-400 rounded-t-sm border border-rose-300/40 shadow-inner" />
                </div>
              ))}
            </div>

            {/* Cake Top Tier */}
            <div className="w-36 sm:w-44 h-12 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 rounded-t-2xl shadow-md mx-auto relative border-t-2 border-white/60 flex items-center justify-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose-950/70">
                {settings.birthdayDate}
              </span>
              {/* Frosting drips */}
              <div className="absolute -bottom-1 inset-x-2 flex justify-around">
                <span className="w-2.5 h-2.5 bg-rose-200 rounded-full" />
                <span className="w-3 h-3 bg-rose-200 rounded-full" />
                <span className="w-2.5 h-2.5 bg-rose-200 rounded-full" />
                <span className="w-3 h-3 bg-rose-200 rounded-full" />
              </div>
            </div>

            {/* Cake Middle Tier */}
            <div className="w-48 sm:w-56 h-14 bg-gradient-to-r from-rose-500 via-pink-400 to-rose-500 rounded-t-xl shadow-lg mx-auto relative border-t-2 border-white/40 flex items-center justify-center">
              <span className="text-xs font-serif-romantic font-bold tracking-wider text-white">
                Happy Birthday
              </span>
            </div>

            {/* Cake Base Tier */}
            <div className="w-60 sm:w-72 h-16 bg-gradient-to-r from-purple-900 via-rose-700 to-purple-900 rounded-t-lg shadow-2xl mx-auto relative border-t-2 border-amber-300/50 flex items-center justify-center">
              <span className="text-sm font-semibold tracking-widest text-amber-200 uppercase flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-300" />
                <span>{settings.nickname}</span>
                <Crown className="w-4 h-4 text-amber-300" />
              </span>
            </div>

            {/* Cake Plate / Stand */}
            <div className="w-68 sm:w-80 h-3 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 rounded-full shadow-2xl mx-auto" />
          </div>

          {!candlesBlown ? (
            <button
              id="blow-candles-click-btn"
              onClick={handleBlowCandles}
              className="mt-6 px-6 py-2.5 rounded-full bg-rose-600/40 hover:bg-rose-600/70 border border-rose-400/50 text-white text-xs sm:text-sm font-semibold transition-all animate-pulse"
            >
              💨 Click the candles to blow them out!
            </button>
          ) : (
            <button
              id="relight-candles-btn"
              onClick={handleRelight}
              className="mt-4 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 text-xs transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Relight Candles</span>
            </button>
          )}
        </div>

        {/* Celebration Announcement Banner */}
        {candlesBlown && (
          <div className="space-y-4 pt-2 animate-in zoom-in-95 duration-500">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/80 via-[#270e3a] to-purple-950/80 border border-rose-400/60 shadow-2xl space-y-2">
              <div className="flex justify-center">
                <Crown className="w-8 h-8 text-amber-300 animate-bounce" />
              </div>
              <h3 className="font-serif-romantic text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-pink-200">
                Happy {settings.ageNumber}rd Birthday, {settings.nickname}! 👑❤️
              </h3>
              <p className="text-base text-rose-100 italic font-serif-romantic max-w-lg mx-auto">
                “Every candle on your cake is another reason I thank the heavens for the day you came into this world.”
              </p>
            </div>

            <div>
              <button
                id="cake-proceed-btn"
                onClick={handleNext}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-base shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all inline-flex items-center gap-2"
              >
                <span>Next: A Whispered Secret 🔐</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
