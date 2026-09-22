import React, { useState } from 'react';
import { AppSettings, PhotoItem } from '../../types';
import { Sparkles, Heart, Smile, Sparkle, ShieldCheck, Laugh, Coffee, Sun, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchHeartConfetti } from '../../utils/confetti';

interface Stage03StoryProps {
  settings: AppSettings;
  onProceed: () => void;
}

export const Stage03Story: React.FC<Stage03StoryProps> = ({ settings, onProceed }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCardFlip = (id: string) => {
    audioEngine.playCardFlip();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenPhoto = (photo: PhotoItem) => {
    audioEngine.playChime();
    setSelectedPhoto(photo);
  };

  const handleNext = () => {
    audioEngine.playChime();
    launchHeartConfetti(0.5, 0.4);
    onProceed();
  };

  // Helper to get matching icon for Chapter 03 cards
  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smile': return <Smile className="w-8 h-8 text-rose-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-pink-400" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-amber-300" />;
      case 'ShieldHeart': return <ShieldCheck className="w-8 h-8 text-rose-400" />;
      case 'Laugh': return <Laugh className="w-8 h-8 text-amber-300" />;
      case 'Coffee': return <Coffee className="w-8 h-8 text-rose-300" />;
      case 'Sun': return <Sun className="w-8 h-8 text-amber-300" />;
      default: return <Heart className="w-8 h-8 text-rose-400" />;
    }
  };

  return (
    <div className="relative min-h-[85vh] max-w-5xl mx-auto px-4 py-8 z-10 text-rose-100 space-y-16 animate-in fade-in duration-500">
      {/* Chapter 01 — The Beginning 🌸 */}
      <section className="bg-[#160c27]/70 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <span>Chapter 01</span>
          <span>•</span>
          <span>The Beginning 🌸</span>
        </div>
        <h2 className="font-serif-romantic text-3xl sm:text-4xl font-bold text-white mb-6">
          Where Two Hearts Became One
        </h2>
        <div className="max-w-2xl mx-auto space-y-4 text-base sm:text-lg text-rose-100/90 leading-relaxed font-light">
          <p>
            Before you came into my life, love was just a word found in old songs and fairy tales. But the very day you crossed my path, my universe shifted on its axis.
          </p>
          <p>
            You walked in with that gentle radiance, and in that fleeting glance, all the noisy doubts of the world grew quiet. I knew right then that every step I had ever taken had simply been leading me straight to you.
          </p>
        </div>
      </section>

      {/* Chapter 02 — The Memories 📸 */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold uppercase tracking-widest">
            <span>Chapter 02</span>
            <span>•</span>
            <span>The Memories 📸</span>
          </div>
          <h2 className="font-serif-romantic text-3xl sm:text-4xl font-bold text-white">
            Moments Frozen in Love
          </h2>
          <p className="text-sm text-rose-300/80 max-w-md mx-auto">
            Click any picture to read the sweet memory locked inside.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {settings.photos.map((photo, index) => (
            <button
              key={photo.id}
              id={`photo-memory-card-${index}`}
              onClick={() => handleOpenPhoto(photo)}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-rose-500/30 hover:border-rose-400 shadow-md hover:shadow-rose-900/40 transition-all transform hover:-translate-y-1 text-left bg-[#1b102e]"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2.5">
                <span className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase">
                  #{index + 1}
                </span>
                <span className="text-xs font-medium text-white truncate group-hover:text-rose-200">
                  {photo.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative max-w-lg w-full bg-[#160c27] border border-rose-500/40 rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
                <button
                  id="close-photo-modal-btn"
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2 hover:bg-black/90 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-serif-romantic text-2xl font-bold text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="text-base text-rose-200/90 leading-relaxed italic">
                  "{selectedPhoto.caption}"
                </p>
                <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-800/40 text-xs text-rose-300 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-500 shrink-0" />
                  <span>{selectedPhoto.reason}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Chapter 03 — What I Love About You 💕 */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold uppercase tracking-widest">
            <span>Chapter 03</span>
            <span>•</span>
            <span>What I Love About You 💕</span>
          </div>
          <h2 className="font-serif-romantic text-3xl sm:text-4xl font-bold text-white">
            7 Wonders of My World
          </h2>
          <p className="text-sm text-rose-300/80 max-w-md mx-auto">
            Click each card to flip and discover what makes you irreplaceable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {settings.loveCards.map((card) => {
            const isFlipped = !!flippedCards[card.id];
            return (
              <div
                key={card.id}
                id={`love-flip-card-${card.id}`}
                onClick={() => toggleCardFlip(card.id)}
                className="h-56 cursor-pointer perspective-1000 select-none group"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform rounded-2xl ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden bg-[#180e2a] border border-rose-500/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg group-hover:border-rose-400/60 transition-all">
                    <div className="mb-3 p-3 rounded-2xl bg-rose-900/30 border border-rose-700/40">
                      {getCardIcon(card.iconName)}
                    </div>
                    <h4 className="font-serif-romantic text-lg font-bold text-white mb-2">
                      {card.title}
                    </h4>
                    <span className="text-[11px] text-rose-400/80 font-medium tracking-wide">
                      Click to flip ✨
                    </span>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-rose-950/90 via-[#220d36] to-[#180e2a] border border-rose-400/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl">
                    <Heart className="w-6 h-6 text-rose-400 fill-rose-500 mb-3" />
                    <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-normal">
                      {card.message}
                    </p>
                    <span className="text-[10px] text-rose-400/60 mt-4">
                      Click to flip back
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Next Step Banner */}
      <div className="text-center pt-8 border-t border-rose-900/40">
        <button
          id="proceed-to-quiz-btn"
          onClick={handleNext}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white font-semibold text-base shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_45px_rgba(244,63,94,0.7)] transition-all transform hover:-translate-y-1"
        >
          <span>Next: Mini Game #1 — How Well Do You Know Us? 🎮</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
