import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Upload, Sparkles } from 'lucide-react';
import { audioEngine, SoundscapeTheme } from '../utils/audio';

export const AudioPlayerControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [soundscapeTheme, setSoundscapeTheme] = useState<SoundscapeTheme>('piano');
  const [showThemes, setShowThemes] = useState(false);
  const [customSongName, setCustomSongName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe(() => {
      const status = audioEngine.getStatus();
      setIsPlaying(status.isPlaying);
      setIsMuted(status.isMuted);
      setVolume(status.volume);
      if (status.soundscapeTheme) {
        setSoundscapeTheme(status.soundscapeTheme);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    audioEngine.toggleMusic();
  };

  const handleToggleMute = () => {
    audioEngine.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  const handleThemeSelect = (theme: SoundscapeTheme) => {
    audioEngine.setSoundscapeTheme(theme);
    setSoundscapeTheme(theme);
    setShowThemes(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      audioEngine.setCustomTrack(url);
      setCustomSongName(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-[#170e24]/80 backdrop-blur-md border border-rose-500/30 px-3 py-2 rounded-full shadow-lg text-rose-100 transition-all hover:border-rose-400">
      {/* Play/Pause Button */}
      <button
        id="audio-play-toggle-btn"
        onClick={handleTogglePlay}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          isPlaying
            ? 'bg-rose-500/20 text-rose-200 border border-rose-400/40'
            : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/40 animate-pulse'
        }`}
        title={isPlaying ? 'Pause Music' : 'Play Romantic Music'}
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 fill-rose-300" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Play Music ❤️</span>
          </>
        )}
      </button>

      {/* Visualizer bars when playing */}
      {isPlaying && !isMuted && (
        <div className="flex items-center gap-0.5 px-1.5 h-3.5" title="Playing romantic melody">
          <span className="w-0.5 bg-rose-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5" />
          <span className="w-0.5 bg-rose-300 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-4" />
          <span className="w-0.5 bg-rose-400 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-3" />
          <span className="w-0.5 bg-rose-200 rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-3.5" />
        </div>
      )}

      {/* Theme Picker Dropdown Toggle */}
      <div className="relative">
        <button
          onClick={() => setShowThemes((prev) => !prev)}
          className="p-1.5 rounded-full hover:bg-rose-500/20 text-rose-300 hover:text-white transition-colors"
          title={`Melody Theme: ${soundscapeTheme}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </button>

        {showThemes && (
          <div className="absolute right-0 top-9 w-36 bg-[#180e28] border border-rose-500/40 rounded-2xl p-2 shadow-2xl z-50 text-xs space-y-1">
            <p className="text-[10px] text-rose-400/80 px-2 py-0.5 uppercase tracking-wider font-semibold">
              Melody Tone
            </p>
            <button
              onClick={() => handleThemeSelect('piano')}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-colors ${
                soundscapeTheme === 'piano' ? 'bg-rose-600 text-white' : 'hover:bg-white/10 text-rose-200'
              }`}
            >
              🎹 Grand Piano
            </button>
            <button
              onClick={() => handleThemeSelect('celesta')}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-colors ${
                soundscapeTheme === 'celesta' ? 'bg-rose-600 text-white' : 'hover:bg-white/10 text-rose-200'
              }`}
            >
              ✨ Starlight Celesta
            </button>
            <button
              onClick={() => handleThemeSelect('musicbox')}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-colors ${
                soundscapeTheme === 'musicbox' ? 'bg-rose-600 text-white' : 'hover:bg-white/10 text-rose-200'
              }`}
            >
              🎵 Music Box
            </button>
          </div>
        )}
      </div>

      {/* Mute/Unmute */}
      <button
        id="audio-mute-toggle-btn"
        onClick={handleToggleMute}
        className="p-1.5 rounded-full hover:bg-rose-500/20 text-rose-300 hover:text-white transition-colors"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>

      {/* Volume slider (subtle) */}
      <input
        id="audio-volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        className="w-14 h-1 accent-rose-500 bg-rose-950/60 rounded-lg cursor-pointer hidden sm:inline-block"
        title={`Volume: ${Math.round(volume * 100)}%`}
      />

      {/* Upload custom song */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*"
        className="hidden"
      />
      <button
        id="audio-upload-custom-btn"
        onClick={() => fileInputRef.current?.click()}
        className="p-1.5 rounded-full hover:bg-rose-500/20 text-rose-300/80 hover:text-rose-200 transition-colors"
        title={customSongName ? `Playing: ${customSongName}` : 'Upload Your Song (MP3)'}
      >
        {customSongName ? <Music className="w-3.5 h-3.5 text-rose-400" /> : <Upload className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
