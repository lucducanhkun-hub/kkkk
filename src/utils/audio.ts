// Web Audio API synthesized sound generator for gentle chimes, celebration pops, and music
class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmPlaying: boolean = false;
  private bgmTimer: number | null = null;
  private bgmIndex: number = 0;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playPop() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 + Math.random() * 200, now);
      osc.frequency.exponentialRampToValueAtTime(880 + Math.random() * 300, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Ignore audio error
    }
  }

  public playChime() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch {
      // Ignore audio error
    }
  }

  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const freqs = [659.25, 783.99, 987.77, 1174.66, 1318.51];
      const now = this.ctx.currentTime;

      freqs.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + i * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.45);
      });
    } catch {
      // Ignore audio error
    }
  }

  // Gentle music melody (lullaby / sweet melody)
  public toggleBgm(callback?: (playing: boolean) => void): boolean {
    this.init();
    if (this.bgmPlaying) {
      this.stopBgm();
      if (callback) callback(false);
      return false;
    } else {
      this.startBgm();
      if (callback) callback(true);
      return true;
    }
  }

  public isBgmActive(): boolean {
    return this.bgmPlaying;
  }

  private startBgm() {
    this.bgmPlaying = true;
    // Pentatonic romantic warm notes in C major (C4 to A5)
    // "Bông Hồng Cài Áo" / gentle acoustic sweet theme
    const melody: { note: number; dur: number }[] = [
      { note: 523.25, dur: 0.6 }, // C5
      { note: 587.33, dur: 0.6 }, // D5
      { note: 659.25, dur: 1.0 }, // E5
      { note: 783.99, dur: 0.8 }, // G5
      { note: 659.25, dur: 0.6 }, // E5
      { note: 587.33, dur: 0.8 }, // D5
      { note: 523.25, dur: 1.2 }, // C5
      { note: 440.00, dur: 0.6 }, // A4
      { note: 523.25, dur: 0.8 }, // C5
      { note: 587.33, dur: 1.0 }, // D5
      { note: 659.25, dur: 0.6 }, // E5
      { note: 783.99, dur: 1.0 }, // G5
      { note: 880.00, dur: 1.2 }, // A5
      { note: 783.99, dur: 0.8 }, // G5
      { note: 659.25, dur: 1.4 }, // E5
    ];

    const playNext = () => {
      if (!this.bgmPlaying || !this.ctx) return;
      const current = melody[this.bgmIndex % melody.length];
      this.bgmIndex++;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(current.note, now);

        // Soft bell envelope
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + current.dur * 0.95);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + current.dur);
      } catch {
        // Safe fail
      }

      this.bgmTimer = window.setTimeout(playNext, current.dur * 850);
    };

    playNext();
  }

  public stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBgm();
    }
    return this.isMuted;
  }
}

export const sound = new SoundManager();
