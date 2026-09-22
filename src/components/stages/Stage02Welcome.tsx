import React from 'react';
import { AppSettings } from '../../types';
import { ArrowRight, Heart, Sparkles, Smile, Flame, Infinity as InfinityIcon } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchHeartConfetti } from '../../utils/confetti';

interface Stage02WelcomeProps {
  settings: AppSettings;
  onProceed: () => void;
}

export const Stage02Welcome: React.FC<Stage02WelcomeProps> = ({ settings, onProceed }) => {
  const handleStart = () => {
    audioEngine.playChime();
    launchHeartConfetti(0.5, 0.4);
    onProceed();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12 z-10 animate-in fade-in zoom-in-95 duration-700">
      <div className="max-w-2xl w-full bg-[#160c27]/70 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(244,63,94,0.15)] relative overflow-hidden">
        {/* Subtle decorative glow corner */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Photo Avatar / Floating Heart Header */}
        <div className="flex justify-center mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 shadow-[0_0_30px_rgba(244,63,94,0.5)]">
              <img
                src={settings.photos[0]?.url || '/photos/sheena_outdoor.jpg'}
                alt={settings.wifeName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-rose-600 border-2 border-[#160c27] flex items-center justify-center shadow-lg">
              <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
            </div>
            <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 animate-spin duration-3000" />
          </div>
        </div>

        {/* Main Welcome Heading */}
        <h2 className="font-serif-romantic text-3xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          Happy Birthday My Wife, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200">
            {settings.wifeName} ❤️
          </span>
        </h2>

        {/* Poetic quote */}
        <div className="relative py-5 my-3 border-y border-rose-900/40">
          <p className="font-serif-romantic italic text-lg sm:text-2xl text-rose-100/90 leading-relaxed font-normal whitespace-pre-line">
            "{settings.welcomeQuote}"
          </p>
        </div>

        {/* Romantic Milestones Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6 text-left">
          <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-rose-400 text-xs mb-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span className="font-medium">Devotion</span>
            </div>
            <p className="font-serif-romantic text-lg sm:text-xl font-bold text-white">100%</p>
            <p className="text-[10px] text-rose-300/70">Wholehearted love</p>
          </div>

          <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-pink-400 text-xs mb-1">
              <Smile className="w-3.5 h-3.5 text-pink-400" />
              <span className="font-medium">Smiles</span>
            </div>
            <p className="font-serif-romantic text-lg sm:text-xl font-bold text-white">Countless</p>
            <p className="text-[10px] text-rose-300/70">Shared laughter</p>
          </div>

          <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs mb-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-400" />
              <span className="font-medium">Warmth</span>
            </div>
            <p className="font-serif-romantic text-lg sm:text-xl font-bold text-white">Safe Haven</p>
            <p className="text-[10px] text-rose-300/70">Forever in your arms</p>
          </div>

          <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 text-purple-400 text-xs mb-1">
              <InfinityIcon className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-medium">Together</span>
            </div>
            <p className="font-serif-romantic text-lg sm:text-xl font-bold text-white">Forever</p>
            <p className="text-[10px] text-rose-300/70">Through all eternity</p>
          </div>
        </div>

        <p className="text-sm text-rose-300/80 mb-8 max-w-lg mx-auto">
          I created this private space just for you—to celebrate your smile, our sweetest memories, and all the reasons my heart belongs to you forever.
        </p>

        {/* Animated Button: Start Our Journey */}
        <button
          id="welcome-start-journey-btn"
          onClick={handleStart}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-base shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_45px_rgba(244,63,94,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Start Our Journey</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
