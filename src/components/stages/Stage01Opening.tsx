import React, { useState, useEffect } from 'react';
import { AppSettings } from '../../types';
import { Sparkles, Heart, Clock, Play } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchHeartConfetti } from '../../utils/confetti';

interface Stage01OpeningProps {
  settings: AppSettings;
  onProceed: () => void;
}

export const Stage01Opening: React.FC<Stage01OpeningProps> = ({ settings, onProceed }) => {
  const [isToday, setIsToday] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const currentMonth = now.getMonth(); // 8 = September
      const currentDate = now.getDate();

      // Check if today is September 23
      if (currentMonth === 8 && currentDate === 23) {
        setIsToday(true);
      } else {
        setIsToday(false);
        // Calculate countdown to next September 23
        let targetYear = now.getFullYear();
        const targetDate = new Date(targetYear, 8, 23, 0, 0, 0);
        if (now.getTime() > targetDate.getTime()) {
          targetYear++;
        }
        const nextBirthday = new Date(targetYear, 8, 23, 0, 0, 0);
        const diff = Math.max(0, nextBirthday.getTime() - now.getTime());

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    checkDate();
    const timer = setInterval(checkDate, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClickSurprise = () => {
    audioEngine.playChime();
    audioEngine.playMusic();
    launchHeartConfetti(0.5, 0.5);
    onProceed();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12 z-10">
      {/* Floating glowing crown/heart portrait icon */}
      <div className="relative mb-6">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 shadow-[0_0_50px_rgba(244,63,94,0.5)] animate-in zoom-in-75 duration-700">
          <img
            src={settings.photos[0]?.url || '/photos/sheena_outdoor.jpg'}
            alt={settings.wifeName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full border-2 border-white/40"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 border-2 border-[#090813] flex items-center justify-center shadow-lg animate-bounce duration-1000">
          <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
        </div>
        <Sparkles className="w-6 h-6 text-amber-300 absolute -top-1 -right-1 animate-spin duration-3000" />
      </div>

      {/* Sweet greeting tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        <span>HAPPY BIRTHDAY TO MY WIFE</span>
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
      </div>

      {/* Her Name in exquisite typography */}
      <h1 className="font-serif-romantic text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-pink-300 mb-4 drop-shadow-[0_4px_25px_rgba(244,63,94,0.3)]">
        {settings.wifeName}
      </h1>

      <p className="font-cursive text-2xl sm:text-3xl text-rose-300/90 mb-8 max-w-md">
        "{settings.nickname}, my little universe and my whole heart."
      </p>

      {/* Date badge or countdown */}
      <div className="mb-10 max-w-md w-full bg-[#160c26]/70 backdrop-blur-md border border-rose-500/30 rounded-2xl p-4 shadow-xl text-rose-200">
        {isToday ? (
          <div className="flex items-center justify-center gap-2 text-rose-300 font-medium">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="text-base sm:text-lg text-white font-semibold">
              Today, {settings.birthdayDate}, is your special day! ✨
            </span>
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-300/80 mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Counting down to your special day ({settings.birthdayDate})</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#24133c]/80 rounded-xl p-2 border border-rose-900/50">
                <span className="block text-lg sm:text-xl font-bold text-white font-mono">{timeRemaining.days}</span>
                <span className="text-[10px] text-rose-300/70 uppercase">Days</span>
              </div>
              <div className="bg-[#24133c]/80 rounded-xl p-2 border border-rose-900/50">
                <span className="block text-lg sm:text-xl font-bold text-white font-mono">{timeRemaining.hours}</span>
                <span className="text-[10px] text-rose-300/70 uppercase">Hours</span>
              </div>
              <div className="bg-[#24133c]/80 rounded-xl p-2 border border-rose-900/50">
                <span className="block text-lg sm:text-xl font-bold text-white font-mono">{timeRemaining.minutes}</span>
                <span className="text-[10px] text-rose-300/70 uppercase">Mins</span>
              </div>
              <div className="bg-[#24133c]/80 rounded-xl p-2 border border-rose-900/50">
                <span className="block text-lg sm:text-xl font-bold text-white font-mono">{timeRemaining.seconds}</span>
                <span className="text-[10px] text-rose-300/70 uppercase">Secs</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Romantic Call to Action */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          id="opening-surprise-btn"
          onClick={handleClickSurprise}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white font-semibold text-base sm:text-lg shadow-[0_0_35px_rgba(244,63,94,0.5)] hover:shadow-[0_0_55px_rgba(244,63,94,0.8)] transition-all transform hover:-translate-y-1 active:translate-y-0"
        >
          <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
          <span>I Have a Surprise For You ✨</span>
          <Heart className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <p className="text-xs text-rose-400/60 mt-6 flex items-center gap-1">
        <Play className="w-3 h-3 fill-rose-400/60" /> Turn on your audio for the full romantic experience
      </p>
    </div>
  );
};
