import React, { useRef } from 'react';
import { Award, Sparkles, X, Printer, Heart, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface LoveCertificateModalProps {
  isOpen: boolean;
  wifeName: string;
  birthdayDate: string;
  onClose: () => void;
}

export const LoveCertificateModal: React.FC<LoveCertificateModalProps> = ({
  isOpen,
  wifeName,
  birthdayDate,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    audioEngine.playFanfare();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#130b1e] border-2 border-amber-400/60 rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(251,191,36,0.3)] text-center text-amber-100 my-8">
        {/* Ornate corner ornaments */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/80 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/80 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/80 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/80 rounded-br-xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 transition-colors"
          title="Close Certificate"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Body */}
        <div ref={printRef} className="space-y-6 py-2">
          {/* Top Royal Insignia */}
          <div className="flex justify-center">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-200 p-0.5 shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                <div className="w-full h-full bg-[#1c0d2b] rounded-full flex items-center justify-center border border-amber-400/40">
                  <Award className="w-10 h-10 text-amber-300" />
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 animate-spin duration-3000" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-300/80">
              OFFICIAL ROYAL PROCLAMATION
            </p>
            <h2 className="font-serif-romantic text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-sm">
              Certificate of Eternal Love
            </h2>
            <p className="text-xs text-rose-300/90 italic">
              Highest Honor Conferred in the Kingdom of My Heart
            </p>
          </div>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

          {/* Recipient */}
          <div className="space-y-2 py-1">
            <p className="text-sm uppercase tracking-widest text-amber-200/80 font-medium">
              This Sacred Honor is Bestowed Upon
            </p>
            <h1 className="font-serif-romantic text-3xl sm:text-5xl font-bold text-white tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-100 to-pink-200">
              {wifeName}
            </h1>
          </div>

          {/* Proclamation text */}
          <p className="font-serif-romantic italic text-base sm:text-lg text-amber-100/90 max-w-lg mx-auto leading-relaxed">
            Having proven beyond any shadow of a doubt to possess the purest heart, the warmest smile, and the most radiant grace in all the universe, is hereby officially and forever crowned:
          </p>

          {/* Title Banner */}
          <div className="inline-block py-2.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border border-amber-400/50 shadow-inner">
            <span className="font-serif-romantic text-xl sm:text-2xl font-bold text-amber-200 tracking-wide">
              👑 Queen of My Heart & Best Wife in the World 👑
            </span>
          </div>

          {/* Key Qualities / Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Unconditional Love</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Breathtaking Beauty</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>My Eternal Home</span>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-left sm:text-left">
              <p className="text-amber-300/70 uppercase tracking-wider text-[10px]">Issued On</p>
              <p className="font-serif-romantic text-base text-amber-100 font-semibold">{birthdayDate}, 2026</p>
            </div>

            {/* Wax Seal Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-700/80 border border-amber-400 shadow-[0_0_15px_rgba(244,63,94,0.6)]">
              <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
              <span className="text-[11px] font-bold text-white tracking-widest uppercase">
                SEALED IN LOVE
              </span>
            </div>

            <div className="text-right sm:text-right">
              <p className="text-amber-300/70 uppercase tracking-wider text-[10px]">Certified By</p>
              <p className="font-cursive text-xl text-rose-200">Your Loving Husband ❤️</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-semibold text-xs shadow-lg shadow-amber-950 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Keepsake</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-medium transition-all"
          >
            Cherish & Close
          </button>
        </div>
      </div>
    </div>
  );
};
