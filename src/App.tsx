import React, { useState, useEffect } from 'react';
import { AppSettings, StageId } from './types';
import { DEFAULT_SETTINGS, STAGES } from './data/defaultData';
import { BackgroundStars } from './components/BackgroundStars';
import { AudioPlayerControl } from './components/AudioPlayerControl';
import { StageNav } from './components/StageNav';
import { PersonalizeModal } from './components/PersonalizeModal';
import { TopProgressBar } from './components/TopProgressBar';
import { LoveJarModal } from './components/LoveJarModal';
import { LoveCertificateModal } from './components/LoveCertificateModal';
import { Gift, Award } from 'lucide-react';

// Stages
import { Stage01Opening } from './components/stages/Stage01Opening';
import { Stage02Welcome } from './components/stages/Stage02Welcome';
import { Stage03Story } from './components/stages/Stage03Story';
import { Stage04Quiz } from './components/stages/Stage04Quiz';
import { Stage05MemoryMatch } from './components/stages/Stage05MemoryMatch';
import { Stage06HiddenHearts } from './components/stages/Stage06HiddenHearts';
import { Stage07GiftBox } from './components/stages/Stage07GiftBox';
import { Stage08ReasonsLove } from './components/stages/Stage08ReasonsLove';
import { Stage09BirthdayCake } from './components/stages/Stage09BirthdayCake';
import { Stage10SecretMessage } from './components/stages/Stage10SecretMessage';
import { Stage11LoveLetter } from './components/stages/Stage11LoveLetter';
import { Stage12GrandFinale } from './components/stages/Stage12GrandFinale';

const STORAGE_SETTINGS_KEY = 'birthday_journey_settings_v3';
const STORAGE_PROGRESS_KEY = 'birthday_journey_progress_v1';

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SETTINGS_KEY) || localStorage.getItem('birthday_journey_settings_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.wifeName === 'Sheena Jahan') {
          parsed.wifeName = 'My Wife';
          parsed.nickname = 'My Wife';
        }
        if (!parsed.couplePhoto || parsed.couplePhoto.includes('sheena_couple_studio')) {
          parsed.couplePhoto = '/photos/our_real_pic.png';
        }
        if (parsed.wifeName && parsed.wifeName !== 'My Beautiful Wife') {
          return { ...DEFAULT_SETTINGS, ...parsed, couplePhoto: parsed.couplePhoto || '/photos/our_real_pic.png' };
        }
      }
    } catch {}
    return DEFAULT_SETTINGS;
  });

  const [currentStageId, setCurrentStageId] = useState<StageId>('opening');
  const [highestUnlockedStageIndex, setHighestUnlockedStageIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (saved) {
        const val = parseInt(saved, 10);
        return isNaN(val) ? 1 : Math.max(1, Math.min(12, val));
      }
    } catch {}
    return 1;
  });

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isLoveJarOpen, setIsLoveJarOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Save settings when changed
  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(newSettings));
    } catch {}
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_SETTINGS_KEY);
    } catch {}
  };

  // Helper to advance to next stage
  const advanceToStage = (nextId: StageId) => {
    const nextStage = STAGES.find((s) => s.id === nextId);
    if (nextStage) {
      setHighestUnlockedStageIndex((prev) => {
        const updated = Math.max(prev, nextStage.index);
        try {
          localStorage.setItem(STORAGE_PROGRESS_KEY, String(updated));
        } catch {}
        return updated;
      });
    }
    setCurrentStageId(nextId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartJourney = () => {
    setCurrentStageId('opening');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#090813] text-[#fdf6f7] overflow-x-hidden font-sans">
      {/* Top Reading/Journey Progress Heart Indicator */}
      <TopProgressBar
        currentStageId={currentStageId}
        onSelectStage={(stageId) => advanceToStage(stageId)}
      />

      {/* Background Starlight, Floating Hearts, and Interactive Particle Trail */}
      <BackgroundStars />

      {/* Floating Audio Player Widget (top right) */}
      <AudioPlayerControl />

      {/* Floating Stage Progress & Customization Nav (top left) */}
      <StageNav
        currentStageId={currentStageId}
        highestUnlockedStageIndex={highestUnlockedStageIndex}
        onSelectStage={(stageId) => {
          setCurrentStageId(stageId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onOpenLoveJar={() => setIsLoveJarOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Main Interactive Stage Container */}
      <main className="relative z-10 pt-20 pb-16 px-4 sm:px-6">
        {currentStageId === 'opening' && (
          <Stage01Opening
            settings={settings}
            onProceed={() => advanceToStage('welcome')}
          />
        )}

        {currentStageId === 'welcome' && (
          <Stage02Welcome
            settings={settings}
            onProceed={() => advanceToStage('story')}
          />
        )}

        {currentStageId === 'story' && (
          <Stage03Story
            settings={settings}
            onProceed={() => advanceToStage('quiz')}
          />
        )}

        {currentStageId === 'quiz' && (
          <Stage04Quiz
            settings={settings}
            onProceed={() => advanceToStage('memory_game')}
          />
        )}

        {currentStageId === 'memory_game' && (
          <Stage05MemoryMatch
            settings={settings}
            onProceed={() => advanceToStage('hidden_hearts')}
          />
        )}

        {currentStageId === 'hidden_hearts' && (
          <Stage06HiddenHearts
            settings={settings}
            onProceed={() => advanceToStage('gift_box')}
          />
        )}

        {currentStageId === 'gift_box' && (
          <Stage07GiftBox
            settings={settings}
            onProceed={() => advanceToStage('reasons_10')}
          />
        )}

        {currentStageId === 'reasons_10' && (
          <Stage08ReasonsLove
            settings={settings}
            onProceed={() => advanceToStage('cake')}
          />
        )}

        {currentStageId === 'cake' && (
          <Stage09BirthdayCake
            settings={settings}
            onProceed={() => advanceToStage('secret_message')}
          />
        )}

        {currentStageId === 'secret_message' && (
          <Stage10SecretMessage
            settings={settings}
            onProceed={() => advanceToStage('love_letter')}
          />
        )}

        {currentStageId === 'love_letter' && (
          <Stage11LoveLetter
            settings={settings}
            onProceed={() => advanceToStage('grand_finale')}
          />
        )}

        {currentStageId === 'grand_finale' && (
          <Stage12GrandFinale
            settings={settings}
            onRestart={handleRestartJourney}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onOpenLoveJar={() => setIsLoveJarOpen(true)}
          />
        )}
      </main>

      {/* Floating Sweet Whispers Jar Quick Trigger (Bottom-Left) */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          id="floating-love-jar-btn"
          onClick={() => setIsLoveJarOpen(true)}
          className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#180e28]/90 hover:bg-[#25153f] border border-rose-500/40 text-rose-200 text-xs font-medium shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all hover:scale-105 active:scale-95 animate-subtle-bounce hover:[animation-play-state:paused]"
          title="Open Sweet Whispers Jar"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <Gift className="w-4 h-4 text-pink-300" />
          <span className="tracking-wide">Sweet Whispers 💌</span>
        </button>
      </div>

      {/* Subtle Bottom Footer */}
      <footer className="relative z-10 text-center py-6 text-xs text-rose-400/50 border-t border-rose-950/40">
        <p>
          Our Little Universe • Made with all my love for {settings.wifeName} • {settings.birthdayDate}
        </p>
      </footer>

      {/* Customization & Personalization Modal */}
      <PersonalizeModal
        isOpen={isCustomizeOpen}
        settings={settings}
        onClose={() => setIsCustomizeOpen(false)}
        onSave={handleSaveSettings}
        onReset={handleResetSettings}
      />

      {/* Sweet Whispers Jar Modal */}
      <LoveJarModal
        isOpen={isLoveJarOpen}
        wifeName={settings.wifeName}
        onClose={() => setIsLoveJarOpen(false)}
        onOpenCertificate={() => {
          setIsLoveJarOpen(false);
          setIsCertificateOpen(true);
        }}
      />

      {/* Royal Proclamation & Certificate of Love Modal */}
      <LoveCertificateModal
        isOpen={isCertificateOpen}
        wifeName={settings.wifeName}
        birthdayDate={settings.birthdayDate}
        onClose={() => setIsCertificateOpen(false)}
      />
    </div>
  );
}
