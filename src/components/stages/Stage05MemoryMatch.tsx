import React, { useState, useEffect } from 'react';
import { AppSettings } from '../../types';
import { Sparkles, Heart, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchHeartConfetti } from '../../utils/confetti';

interface MemoryCard {
  instanceId: string;
  pairId: number;
  imageUrl: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface Stage05MemoryMatchProps {
  settings: AppSettings;
  onProceed: () => void;
}

export const Stage05MemoryMatch: React.FC<Stage05MemoryMatchProps> = ({ settings, onProceed }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MemoryCard[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize a 4x3 or 4x2 grid of 4 pairs (8 cards) or 6 pairs (12 cards) for a fun, snappy experience
  const setupGame = () => {
    const selectedPhotos = settings.photos.slice(0, 6);
    const cardPairs: MemoryCard[] = [];

    selectedPhotos.forEach((photo, idx) => {
      // 2 identical cards for each photo
      cardPairs.push({
        instanceId: `p${idx}-a`,
        pairId: idx,
        imageUrl: photo.url,
        label: photo.title,
        isFlipped: false,
        isMatched: false,
      });
      cardPairs.push({
        instanceId: `p${idx}-b`,
        pairId: idx,
        imageUrl: photo.url,
        label: photo.title,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffled = [...cardPairs].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCards([]);
    setIsLocked(false);
    setMoves(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    setupGame();
  }, [settings.photos]);

  const handleCardClick = (clickedCard: MemoryCard) => {
    if (isLocked || clickedCard.isFlipped || clickedCard.isMatched) return;

    audioEngine.playCardFlip();

    const newCards = cards.map((c) =>
      c.instanceId === clickedCard.instanceId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const [first, second] = newSelected;
      if (first.pairId === second.pairId) {
        // Matched!
        setTimeout(() => {
          audioEngine.playHeartPop();
          launchHeartConfetti(0.5, 0.4);

          const matchedCards = newCards.map((c) =>
            c.pairId === first.pairId ? { ...c, isMatched: true } : c
          );
          setCards(matchedCards);
          setSelectedCards([]);
          setIsLocked(false);

          // Check if all matched
          const allMatched = matchedCards.every((c) => c.isMatched);
          if (allMatched) {
            setIsCompleted(true);
            audioEngine.playFanfare();
          }
        }, 500);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          const resetCards = newCards.map((c) =>
            c.instanceId === first.instanceId || c.instanceId === second.instanceId
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(resetCards);
          setSelectedCards([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  const handleNext = () => {
    audioEngine.playChime();
    onProceed();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10 text-rose-100 max-w-4xl mx-auto animate-in fade-in">
      <div className="w-full bg-[#160c27]/80 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-rose-900/40 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-300">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Mini Game #2 • Memory Matching</span>
            </div>
            <h3 className="font-serif-romantic text-2xl sm:text-3xl font-bold text-white mt-1">
              Match Our Cherished Moments
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-rose-950 px-3 py-1.5 rounded-full border border-rose-800/40 font-mono text-rose-300">
              Moves: {moves}
            </span>
            <button
              onClick={setupGame}
              className="p-2 bg-rose-900/40 hover:bg-rose-800/60 rounded-full text-rose-200 transition-colors"
              title="Restart Game"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-rose-300/80">
          Flip the cards to match pairs of our favorite memories. Match all 6 pairs to unlock the next romantic secret!
        </p>

        {/* Card Grid (12 cards) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 py-2">
          {cards.map((card) => {
            const showFront = card.isFlipped || card.isMatched;
            return (
              <button
                key={card.instanceId}
                id={`memory-card-${card.instanceId}`}
                disabled={card.isMatched || isLocked}
                onClick={() => handleCardClick(card)}
                className={`relative aspect-square rounded-2xl overflow-hidden border transition-all duration-300 transform perspective-1000 ${
                  card.isMatched
                    ? 'border-emerald-400 shadow-md shadow-emerald-950 opacity-90 scale-95'
                    : 'border-rose-500/30 hover:border-rose-400 hover:scale-105 shadow-md'
                }`}
              >
                {showFront ? (
                  <div className="w-full h-full relative bg-[#1c0f30]">
                    <img
                      src={card.imageUrl}
                      alt={card.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                      <span className="text-[10px] text-white truncate font-medium">
                        {card.label}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#27143f] to-[#160b26] flex flex-col items-center justify-center p-2 text-rose-400">
                    <Heart className="w-6 h-6 fill-rose-500/40 text-rose-400/80 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] text-rose-400/50 mt-1 uppercase font-semibold tracking-wider">
                      Match
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Victory Banner */}
        {isCompleted && (
          <div className="p-6 bg-gradient-to-r from-rose-950/80 to-purple-950/80 border border-rose-400/60 rounded-2xl text-center space-y-3 animate-in zoom-in-95">
            <div className="inline-flex p-3 rounded-full bg-rose-500/20 text-rose-300 mb-1">
              <Trophy className="w-8 h-8 text-amber-300 animate-bounce" />
            </div>
            <h4 className="font-serif-romantic text-2xl font-bold text-white">
              Every Memory Belongs Together — Just Like Us! ❤️
            </h4>
            <p className="text-sm text-rose-200 max-w-md mx-auto">
              You solved the matching game in {moves} moves! Now, let's explore the hidden treasures in our starry sky.
            </p>
            <div className="pt-2">
              <button
                id="memory-match-proceed-btn"
                onClick={handleNext}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold shadow-lg shadow-rose-950 transition-all inline-flex items-center gap-2"
              >
                <span>Proceed: Unlock My Heart (5 Hidden Stars) 💎</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
