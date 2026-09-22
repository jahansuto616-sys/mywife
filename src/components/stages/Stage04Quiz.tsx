import React, { useState } from 'react';
import { AppSettings } from '../../types';
import { Heart, Sparkles, CheckCircle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { audioEngine } from '../../utils/audio';
import { launchHeartConfetti } from '../../utils/confetti';

interface Stage04QuizProps {
  settings: AppSettings;
  onProceed: () => void;
}

export const Stage04Quiz: React.FC<Stage04QuizProps> = ({ settings, onProceed }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const questions = settings.quizQuestions;
  const currentQ = questions[currentQIndex];

  const handleSelectOption = (idx: number) => {
    if (answeredState !== 'idle') return;
    setSelectedOption(idx);

    if (idx === currentQ.correctIndex) {
      audioEngine.playChime();
      launchHeartConfetti(0.5, 0.4);
      setAnsweredState('correct');
      setScore((prev) => prev + 1);
    } else {
      audioEngine.playHeartPop();
      setAnsweredState('wrong');
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnsweredState('idle');
    } else {
      setQuizFinished(true);
      audioEngine.playFanfare();
      launchHeartConfetti(0.5, 0.5);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
    setAnsweredState('idle');
  };

  const handleProceed = () => {
    audioEngine.playChime();
    onProceed();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10 text-rose-100 max-w-2xl mx-auto animate-in fade-in">
      {!quizFinished ? (
        <div className="w-full bg-[#160c27]/80 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-rose-900/40 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-300">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Mini Game #1 • Love Quiz</span>
            </div>
            <div className="text-xs bg-rose-950 px-3 py-1 rounded-full border border-rose-800/40 font-mono text-rose-300">
              Question {currentQIndex + 1} of {questions.length}
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="font-serif-romantic text-xl sm:text-2xl font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-[#201235] border-rose-800/50 hover:border-rose-400 text-rose-100';
              if (answeredState !== 'idle') {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/40 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'opacity-40 bg-[#170e26] border-rose-900/30 text-rose-400/50';
                }
              }

              return (
                <button
                  key={idx}
                  id={`quiz-opt-${currentQIndex}-${idx}`}
                  disabled={answeredState !== 'idle'}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span className="leading-snug">{opt}</span>
                  {answeredState !== 'idle' && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {answeredState === 'wrong' && isSelected && (
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback response */}
          {answeredState !== 'idle' && (
            <div className="p-4 rounded-2xl bg-[#24133d] border border-rose-700/40 animate-in fade-in space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                {answeredState === 'correct' ? (
                  <span className="text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Perfect, My Love!
                  </span>
                ) : (
                  <span className="text-rose-300 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-rose-400 text-rose-400" /> Aww, so close!
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                {answeredState === 'correct' ? currentQ.explanation : currentQ.funnyWrong}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  id="quiz-next-q-btn"
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>{currentQIndex + 1 < questions.length ? 'Next Question' : 'See Love Score ❤️'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Score Card Screen */
        <div className="w-full bg-[#160c27]/90 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-950/80 border border-rose-400/50 flex items-center justify-center shadow-[0_0_35px_rgba(244,63,94,0.4)]">
            <Heart className="w-10 h-10 text-rose-400 fill-rose-500 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-xs text-rose-300 uppercase tracking-widest font-semibold">
              Quiz Completed!
            </span>
            <h3 className="font-serif-romantic text-3xl sm:text-4xl font-bold text-white">
              Your Love Score ❤️
            </h3>
            <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-200 py-2">
              {score} / {questions.length}
            </div>
          </div>

          <p className="text-base sm:text-lg text-rose-200/90 max-w-md mx-auto italic font-serif-romantic leading-relaxed">
            {score === questions.length
              ? "100% Soulmate Connection! You know every single flutter of my heart. 🥰"
              : score >= questions.length / 2
              ? "You did amazing! Though honestly, this just proves you need to spend even more cuddle time with me. 😏❤️"
              : "No matter the score, you already won 100% of my heart forever! ❤️"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="restart-quiz-btn"
              onClick={handleRestartQuiz}
              className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-rose-300 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
            <button
              id="quiz-continue-btn"
              onClick={handleProceed}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-sm sm:text-base font-semibold shadow-lg shadow-rose-950 transition-all flex items-center gap-2"
            >
              <span>Next: Mini Game #2 — Memory Match 🧩</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
