import React, { useState } from 'react';
import { Heart, Sparkles, X, Shuffle, Gift } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface LoveJarModalProps {
  isOpen: boolean;
  wifeName: string;
  onClose: () => void;
  onOpenCertificate?: () => void;
}

const SWEET_WHISPERS: { id: number; tag: string; note: string }[] = [
  {
    id: 1,
    tag: 'Favorite View',
    note: 'The way your eyes sparkle when you smile at me is my absolute favorite view in this whole universe.'
  },
  {
    id: 2,
    tag: 'Daily Sunshine',
    note: 'Even on gloomy days, just hearing your voice or getting a random text from you lights up my entire soul.'
  },
  {
    id: 3,
    tag: 'Husband Truth',
    note: 'You look stunning when all dressed up, but honestly, you look just as breathtaking in your comfy pajamas with morning coffee.'
  },
  {
    id: 4,
    tag: 'Sacred Harbor',
    note: 'Whenever the outside world feels loud, resting my head near your heart brings me the calmest peace.'
  },
  {
    id: 5,
    tag: 'Destiny',
    note: 'If I were given a million lifetimes to live, I would spend every single one searching for you, my love.'
  },
  {
    id: 6,
    tag: 'Playful Promise',
    note: 'I promise you will always have the warm side of the blanket and first dibs on the best bite of dessert.'
  },
  {
    id: 7,
    tag: 'My Inspiration',
    note: 'Your kindness, patience, and selfless heart inspire me every day to be a better man for you.'
  },
  {
    id: 8,
    tag: 'Sweetest Melody',
    note: 'Your laughter is my favorite music. I will spend the rest of my days trying to be the reason behind it.'
  },
  {
    id: 9,
    tag: 'Safe With Me',
    note: 'No matter what storms come, you will never have to face anything alone. I am forever your rock.'
  },
  {
    id: 10,
    tag: 'Hand in Hand',
    note: 'Holding your warm hand while walking together fits so perfectly—it was made only for mine.'
  },
  {
    id: 11,
    tag: 'Sweet Memory',
    note: 'I still remember the first moment my heart whispered, "She is the one." And it was right.'
  },
  {
    id: 12,
    tag: 'Birthday Wish',
    note: 'May your 23rd September birthday bring you as much pure joy and love as you shower into my life every day.'
  },
  {
    id: 13,
    tag: 'My Pride',
    note: 'Calling you my wife is the greatest honor and the proudest title I carry in this life.'
  },
  {
    id: 14,
    tag: 'Eternal Home',
    note: 'Home isn’t four walls anymore. For me, home is anywhere you are, wrapped in your embrace.'
  },
  {
    id: 15,
    tag: 'Little Things',
    note: 'I love the tiny habits you don’t even notice you have—they are all the reasons I adore you endlessly.'
  },
  {
    id: 16,
    tag: 'Forever Choice',
    note: 'I choose you today, tomorrow, and with every heartbeat for all the years to come.'
  }
];

export const LoveJarModal: React.FC<LoveJarModalProps> = ({
  isOpen,
  wifeName,
  onClose,
  onOpenCertificate,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [openedCount, setOpenedCount] = useState<number>(1);

  if (!isOpen) return null;

  const currentWhisper = SWEET_WHISPERS[currentIndex % SWEET_WHISPERS.length];

  const handleDrawAnother = () => {
    setIsShaking(true);
    audioEngine.playHarpGlissando();
    setTimeout(() => {
      let nextIdx = Math.floor(Math.random() * SWEET_WHISPERS.length);
      if (nextIdx === currentIndex) {
        nextIdx = (nextIdx + 1) % SWEET_WHISPERS.length;
      }
      setCurrentIndex(nextIdx);
      setOpenedCount((prev) => prev + 1);
      setIsShaking(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-[#140c24] border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(244,63,94,0.35)] text-center text-white overflow-hidden">
        {/* Glow accents */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-rose-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>SWEET WHISPERS JAR FOR {wifeName.toUpperCase()}</span>
        </div>

        {/* Animated Jar Visual */}
        <div className="flex justify-center mb-4">
          <div
            onClick={handleDrawAnother}
            className={`cursor-pointer transition-transform duration-300 ${
              isShaking ? 'scale-110 rotate-6' : 'hover:scale-105'
            }`}
          >
            <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-3xl border-2 border-rose-400/50 bg-gradient-to-b from-rose-500/20 via-pink-600/10 to-purple-900/40 backdrop-blur-md shadow-[0_0_35px_rgba(244,63,94,0.4)] flex flex-col items-center justify-center p-2">
              {/* Jar lid */}
              <div className="absolute -top-3 w-16 h-3 bg-amber-400/80 rounded-full border border-amber-300 shadow-md" />
              {/* Floating heart origami inside */}
              <div className="flex flex-wrap gap-1 justify-center items-center">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-500 animate-pulse" />
                <Heart className="w-4 h-4 text-pink-300 fill-pink-400 animate-bounce duration-1000" />
                <Heart className="w-5 h-5 text-amber-300 fill-amber-400" />
              </div>
              <span className="text-[10px] text-rose-200 mt-2 font-medium tracking-wide">
                Tap to Shake ✨
              </span>
            </div>
          </div>
        </div>

        {/* Unfolded Love Note Card */}
        <div className="relative bg-gradient-to-br from-[#2a133d] to-[#1a0c28] border border-rose-400/40 rounded-2xl p-5 sm:p-6 mb-6 shadow-inner">
          <div className="inline-block px-3 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-[11px] font-semibold tracking-wider uppercase mb-3">
            💌 {currentWhisper.tag}
          </div>
          <p className="font-serif-romantic text-lg sm:text-xl text-rose-100 italic leading-relaxed">
            "{currentWhisper.note}"
          </p>
          <div className="mt-3 text-right">
            <span className="font-cursive text-sm text-pink-300">
              — Forever Your Loving Husband ❤️
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="draw-whisper-btn"
            onClick={handleDrawAnother}
            disabled={isShaking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-sm shadow-lg shadow-rose-950 transition-all hover:scale-105 active:scale-95"
          >
            <Shuffle className="w-4 h-4" />
            <span>Draw Another Whisper ({openedCount} opened)</span>
          </button>

          {onOpenCertificate && (
            <button
              onClick={() => {
                onClose();
                onOpenCertificate();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-amber-300/40 text-amber-200 font-medium text-sm transition-all"
            >
              <Gift className="w-4 h-4 text-amber-300" />
              <span>Royal Certificate 📜</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
