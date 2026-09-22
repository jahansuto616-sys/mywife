/**
 * Romantic Audio Engine:
 * - Procedural romantic ambient piano/celesta synthesizer (never fails or 404s)
 * - Support for custom uploaded or streaming audio tracks
 * - Romantic sound effects (chimes, heart pop, card flip, breath whoosh, fanfare)
 */

export type SoundscapeTheme = 'piano' | 'celesta' | 'musicbox';

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingMusic: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.5;
  private sequenceTimer: number | null = null;
  private customAudioElement: HTMLAudioElement | null = null;
  private soundscapeTheme: SoundscapeTheme = 'piano';
  private listeners: Array<() => void> = [];

  constructor() {
    // Lazy init on first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public getStatus() {
    return {
      isPlaying: this.isPlayingMusic,
      isMuted: this.isMuted,
      volume: this.volume,
      soundscapeTheme: this.soundscapeTheme,
    };
  }

  public setSoundscapeTheme(theme: SoundscapeTheme) {
    this.soundscapeTheme = theme;
    if (this.isPlayingMusic && !this.customAudioElement) {
      this.startProceduralRomanticMusic();
    }
    this.notify();
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudioElement) {
      this.customAudioElement.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.customAudioElement) {
      this.customAudioElement.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  public setCustomTrack(audioUrl: string) {
    this.stopMusic();
    if (this.customAudioElement) {
      this.customAudioElement.pause();
      this.customAudioElement = null;
    }
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = this.isMuted ? 0 : this.volume;
    this.customAudioElement = audio;
    this.playMusic();
  }

  public toggleMusic() {
    if (this.isPlayingMusic) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  public playMusic() {
    this.initContext();
    this.isPlayingMusic = true;

    if (this.customAudioElement) {
      this.customAudioElement.volume = this.isMuted ? 0 : this.volume;
      this.customAudioElement.play().catch(() => {});
      this.notify();
      return;
    }

    // Procedural romantic lullaby/piano chords
    this.startProceduralRomanticMusic();
    this.notify();
  }

  public pauseMusic() {
    this.isPlayingMusic = false;
    if (this.customAudioElement) {
      this.customAudioElement.pause();
    }
    if (this.sequenceTimer) {
      window.clearInterval(this.sequenceTimer);
      this.sequenceTimer = null;
    }
    this.notify();
  }

  public stopMusic() {
    this.pauseMusic();
  }

  // Romantic music progression in D-flat / F-sharp major (pentatonic, warm, calming)
  private startProceduralRomanticMusic() {
    if (this.sequenceTimer) {
      window.clearInterval(this.sequenceTimer);
    }

    // Frequencies: Db4, Eb4, F4, Ab4, Bb4, Db5, Eb5, F5, Ab5
    const notes = [
      // Phrase 1: Db major warmth
      [277.18, 349.23, 415.30], // Db4, F4, Ab4
      [311.13, 415.30, 466.16], // Eb4, Ab4, Bb4
      [349.23, 440.00, 554.37], // F4, A4, Db5
      [415.30, 554.37, 698.46], // Ab4, Db5, F5
      // Phrase 2: Gentle arpeggios
      [277.18, 415.30, 554.37],
      [311.13, 466.16, 622.25],
      [369.99, 440.00, 554.37], // F#4
      [415.30, 523.25, 659.25],
    ];

    let noteIdx = 0;

    const playStep = () => {
      if (!this.isPlayingMusic || this.isMuted) return;
      const chord = notes[noteIdx % notes.length];
      chord.forEach((freq, i) => {
        setTimeout(() => {
          if (this.isPlayingMusic && !this.isMuted) {
            this.playSynthBell(freq, 2.8, this.volume * 0.22);
          }
        }, i * 160);
      });

      // Soft high sparkle every other beat
      if (noteIdx % 2 === 0) {
        setTimeout(() => {
          if (this.isPlayingMusic && !this.isMuted) {
            const highFreq = chord[0] * 2;
            this.playSynthBell(highFreq, 2.0, this.volume * 0.12);
          }
        }, 550);
      }

      noteIdx++;
    };

    playStep();
    this.sequenceTimer = window.setInterval(playStep, 2200);
  }

  private playSynthBell(freq: number, duration: number, gainValue: number) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.002, now); // slight chorus detune

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + duration);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(gainValue, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration + 0.1);
      osc2.stop(now + duration + 0.1);
    } catch {
      // AudioContext closed or ignored
    }
  }

  // --- Sound Effects ---

  public playChime() {
    this.initContext();
    if (this.isMuted) return;
    const chimes = [554.37, 659.25, 830.61, 1108.73];
    chimes.forEach((f, i) => {
      setTimeout(() => {
        this.playSynthBell(f, 1.5, this.volume * 0.35);
      }, i * 90);
    });
  }

  public playHeartPop() {
    this.initContext();
    if (this.isMuted) return;
    try {
      const now = this.ctx!.currentTime;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.14);

      gain.gain.setValueAtTime(this.volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  public playCardFlip() {
    this.initContext();
    if (this.isMuted) return;
    try {
      const now = this.ctx!.currentTime;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.08);

      gain.gain.setValueAtTime(this.volume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + 0.11);
    } catch {}
  }

  public playBlowCandles() {
    this.initContext();
    if (this.isMuted) return;
    try {
      // White noise buffer for gentle breath whoosh
      const bufferSize = this.ctx!.sampleRate * 0.8;
      const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = this.ctx!.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx!.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 600;
      filter.Q.value = 1.0;

      const gain = this.ctx!.createGain();
      gain.gain.setValueAtTime(this.volume * 0.35, this.ctx!.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx!.destination);

      noise.start();
    } catch {}
  }

  public playFanfare() {
    this.initContext();
    if (this.isMuted) return;
    const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    arpeggio.forEach((f, i) => {
      setTimeout(() => {
        this.playSynthBell(f, 2.0, this.volume * 0.3);
      }, i * 110);
    });
  }

  public playTwinkle() {
    this.initContext();
    if (this.isMuted) return;
    const notes = [659.25, 880, 1108.73, 1318.51];
    notes.forEach((f, i) => {
      setTimeout(() => {
        this.playSynthBell(f, 1.2, this.volume * 0.25);
      }, i * 70);
    });
  }

  public playHarpGlissando() {
    this.initContext();
    if (this.isMuted) return;
    const notes = [277.18, 349.23, 415.30, 554.37, 659.25, 830.61, 1108.73];
    notes.forEach((f, i) => {
      setTimeout(() => {
        this.playSynthBell(f, 1.6, this.volume * 0.28);
      }, i * 50);
    });
  }
}

export const audioEngine = new RomanticAudioEngine();
