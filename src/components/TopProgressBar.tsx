import React from 'react';
import { STAGES } from '../data/defaultData';
import { StageId } from '../types';
import { Heart } from 'lucide-react';

interface TopProgressBarProps {
  currentStageId: StageId;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({ currentStageId }) => {
  const currentStage = STAGES.find((s) => s.id === currentStageId) || STAGES[0];
  const progressPercent = Math.min(100, Math.max(8, Math.round((currentStage.index / STAGES.length) * 100)));

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-1 bg-white/5 backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-rose-600 via-pink-500 to-amber-300 transition-all duration-700 ease-out relative shadow-[0_0_12px_rgba(244,63,94,0.8)]"
        style={{ width: `${progressPercent}%` }}
      >
        {/* Glowing tip indicator */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-rose-500/30 flex items-center justify-center animate-ping" />
          <Heart className="w-3 h-3 text-white fill-rose-500 absolute drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
        </div>
      </div>
    </div>
  );
};
