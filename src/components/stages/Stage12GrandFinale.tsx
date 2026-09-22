import React, { useEffect, useState } from 'react';
import { AppSettings } from '../../types';
import { Heart, Sparkles, RotateCcw, Share2, Award, Gift } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchBirthdayExplosion, launchSingleFirework } from '../../utils/confetti';

interface Stage12GrandFinaleProps {
  settings: AppSettings;
  onRestart: () => void;
  onOpenCertificate?: () => void;
  onOpenLoveJar?: () => void;
}

export const Stage12GrandFinale: React.FC<Stage12GrandFinaleProps> = ({
  settings,
  onRestart,
  onOpenCertificate,
  onOpenLoveJar,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Launch celebratory fireworks display
    audioEngine.playFanfare();
    launchBirthdayExplosion();

    const interval = setInterval(() => {
      launchSingleFirework(Math.random() * 0.8 + 0.1, Math.random() * 0.4 + 0.2);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    launchSingleFirework(x, y);
    audioEngine.playHeartPop();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleScreenClick}
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 z-10 text-rose-100 max-w-4xl mx-auto text-center space-y-8 animate-in fade-in duration-1000 select-none cursor-pointer"
      title="Click anywhere to trigger fireworks! ✨"
    >
      <div className="w-full bg-[#0d071a]/90 backdrop-blur-2xl border border-rose-500/30 rounded-3xl p-8 sm:p-14 shadow-[0_0_80px_rgba(244,63,94,0.25)] space-y-8">
        {/* Soft introduction */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 shadow-[0_0_50px_rgba(244,63,94,0.7)]">
            <img
              src={settings.couplePhoto || "/photos/our_real_pic.png"}
              alt="Forever in Love"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_22%] rounded-full shadow-inner"
            />
          </div>
          <p className="font-cursive text-3xl sm:text-4xl text-rose-300 animate-pulse">
            “And this is only the beginning of our forever...”
          </p>
        </div>

        {/* Giant Pulsing I LOVE YOU */}
        <div className="py-2">
          <div className="inline-flex items-center justify-center gap-3 mb-2">
            <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          <h1 className="font-serif-romantic text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-300 to-amber-200 tracking-tight drop-shadow-[0_0_40px_rgba(244,63,94,0.7)]">
            I LOVE YOU
          </h1>
          <p className="text-xl sm:text-2xl font-serif-romantic text-pink-200 mt-2">
            {settings.wifeName}
          </p>
        </div>

        {/* Poetic Final Blessing */}
        <div className="max-w-xl mx-auto space-y-3 text-lg sm:text-2xl font-serif-romantic text-rose-100/90 leading-relaxed italic">
          <p>
            Happy Birthday, My Beloved {settings.wifeName || 'Wife'}.
          </p>
          <p className="text-rose-200">
            Happy Birthday to my favorite person, my queen, and my eternal home. ❤️
          </p>
        </div>

        {/* Interactive Fireworks prompt */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-950/60 border border-rose-600/40 text-rose-300 text-xs sm:text-sm font-medium">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin duration-3000" />
          <span>Tap anywhere on screen to launch fireworks into our night sky 🎆</span>
        </div>

        {/* Special Keepsakes Row */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          {onOpenCertificate && (
            <button
              id="open-certificate-finale-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCertificate();
              }}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-black text-sm font-bold shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all inline-flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Award className="w-4 h-4 text-black" />
              <span>👑 Official Queen Certificate</span>
            </button>
          )}

          {onOpenLoveJar && (
            <button
              id="open-love-jar-finale-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLoveJar();
              }}
              className="px-6 py-3.5 rounded-full bg-rose-950/70 hover:bg-rose-900/80 border border-rose-400/50 text-rose-200 text-sm font-semibold shadow-lg shadow-rose-950 transition-all inline-flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <Gift className="w-4 h-4 text-pink-300" />
              <span>💌 Sweet Whispers Jar</span>
            </button>
          )}
        </div>

        {/* Actions row */}
        <div className="pt-4 border-t border-rose-900/40 flex flex-wrap items-center justify-center gap-4">
          <button
            id="replay-journey-btn"
            onClick={(e) => {
              e.stopPropagation();
              onRestart();
            }}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 border border-rose-500/30"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Our Journey</span>
          </button>

          <button
            id="share-link-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-950 transition-all inline-flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Link Copied! ❤️' : 'Share Gift Link'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
