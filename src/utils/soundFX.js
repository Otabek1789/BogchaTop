// Pure Web Audio API Synthesizer with CS2 & Gaming Weapon Sounds
// Plays 100% original recorded audio files with procedural synthesis backup!

export const WEAPONS_LIST = [
  {
    id: 'ak47',
    name: 'AK-47 Kalashnikov',
    game: 'CS2 / CS:GO',
    type: 'Assault Rifle',
    icon: 'Flame',
    tag: '100% ORIGINAL AUDIO',
    color: '#f59e0b',
    desc: "Haqiqiy CS2 Kalashnikov avtomat zarbasi"
  },
  {
    id: 'm4a1s',
    name: 'M4A1-S Silenced',
    game: 'CS2 / CS:GO',
    type: 'Suppressed Rifle',
    icon: 'Shield',
    tag: '100% ORIGINAL AUDIO',
    color: '#00f0ff',
    desc: "Haqiqiy CS2 ovoz so'ndirgichli kiber zarba"
  },
  {
    id: 'awp',
    name: 'AWP Sniper',
    game: 'CS2 / CS:GO',
    type: 'Heavy Sniper',
    icon: 'Crosshair',
    tag: '100% ORIGINAL AUDIO',
    color: '#10b981',
    desc: "Haqiqiy CS2 AWP ulkan snayper portlashi"
  },
  {
    id: 'deagle',
    name: 'Desert Eagle .50',
    game: 'CS2 / CS:GO',
    type: 'Hand Cannon',
    icon: 'Zap',
    tag: '100% ORIGINAL AUDIO',
    color: '#ec4899',
    desc: "Haqiqiy CS2 Desert Eagle to'pponcha zarbasi"
  },
  {
    id: 'laser',
    name: 'Cyber Plasma Laser',
    game: 'Cyberpunk 2077',
    type: 'Sci-Fi Energy',
    icon: 'Sparkles',
    tag: 'ENERGY BEAM',
    color: '#8b5cf6',
    desc: "Futuristik plazma kiber-nuri"
  },
  {
    id: 'classic',
    name: 'Classic Sci-Fi Click',
    game: 'Nexus Default',
    type: 'UI Beep',
    icon: 'Volume2',
    tag: 'CLEAN SYNTH',
    color: '#94a3b8',
    desc: "Yumshoq kiber klik ovozi"
  }
];

const WEAPON_AUDIO_PATHS = {
  ak47: '/sounds/weapons/ak47.mp4',
  m4a1s: '/sounds/weapons/m4a1s.mp4',
  awp: '/sounds/weapons/awp.mp4',
  deagle: '/sounds/weapons/deagle.mp4'
};

export const WEAPON_SHOT_CONFIG = {
  ak47: {
    offset: 2.00,  // Video o'rtasidagi otish boshlanishi (2.00s)
    duration: 0.50, // 0.5 sekund faqat o't ochish ovozi
    volume: 1.0
  },
  m4a1s: {
    offset: 1.50,  // Video o'rtasidagi otish boshlanishi (1.50s)
    duration: 0.50,
    volume: 0.95
  },
  deagle: {
    offset: 2.48,  // Video o'rtasidagi kuchli Desert Eagle zarbasi (2.48s)
    duration: 0.50,
    volume: 0.95
  },
  awp: {
    offset: 0.12,  // AWP snayper portlashi boshlanishi (0.12s)
    duration: 0.55,
    volume: 1.0
  }
};

class SoundFXManager {
  constructor() {
    this.ctx = null;
    this.enabled = this.getStoredState();
    this.currentWeapon = this.getStoredWeapon();
    this.audioBuffers = {};
    this.audioElements = {};
    this.isPreloading = false;

    // Preload audio files for instant zero-latency playback
    if (typeof window !== 'undefined') {
      const handleUserGesture = () => {
        this.initContext();
        this.preloadWeapons();
      };
      window.addEventListener('click', handleUserGesture, { once: true });
      window.addEventListener('keydown', handleUserGesture, { once: true });
      setTimeout(() => this.preloadWeapons(), 300);
    }
  }

  getStoredState() {
    try {
      const stored = localStorage.getItem('nexus_sound_enabled');
      return stored !== null ? stored === 'true' : true; // default enabled
    } catch (_) {
      return true;
    }
  }

  getStoredWeapon() {
    try {
      const stored = localStorage.getItem('nexus_weapon_sound');
      return stored || 'ak47'; // default to AK-47
    } catch (_) {
      return 'ak47';
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    try {
      localStorage.setItem('nexus_sound_enabled', this.enabled.toString());
    } catch (_) {}
    if (this.enabled) {
      this.playClick();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  getWeapon() {
    return this.currentWeapon;
  }

  setWeapon(weaponId) {
    this.currentWeapon = weaponId;
    try {
      localStorage.setItem('nexus_weapon_sound', weaponId);
    } catch (_) {}
    if (!this.enabled) {
      this.enabled = true;
      try {
        localStorage.setItem('nexus_sound_enabled', 'true');
      } catch (_) {}
    }
    // Instant test demonstration shot
    this.playWeaponSound(weaponId);
    return this.currentWeapon;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Preload and decode weapon files directly into browser memory
  async preloadWeapons() {
    if (this.isPreloading || typeof window === 'undefined') return;
    this.isPreloading = true;

    for (const [key, path] of Object.entries(WEAPON_AUDIO_PATHS)) {
      try {
        // 1. Create HTMLAudioElement
        if (typeof Audio !== 'undefined') {
          const audio = new Audio();
          audio.src = path;
          audio.preload = 'auto';
          this.audioElements[key] = audio;
        }

        // 2. Decode into Web Audio API AudioBuffer for 0ms ultra-responsive playback
        const res = await fetch(path);
        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer();
          this.initContext();
          if (this.ctx) {
            const decoded = await this.ctx.decodeAudioData(arrayBuffer);
            this.audioBuffers[key] = decoded;
          }
        }
      } catch (_) {
        // Fallbacks are available
      }
    }
  }

  // Play real weapon audio file from memory with zero latency
  // Jumps directly to the gunshot in the middle of the video and plays strictly for 0.5s
  playRealWeapon(weaponId, customVolume = null, customDuration = null) {
    if (!this.enabled) return false;

    const config = WEAPON_SHOT_CONFIG[weaponId] || { offset: 0, duration: 0.5, volume: 0.95 };
    const offset = config.offset || 0;
    const duration = customDuration !== null ? customDuration : config.duration || 0.5;
    const volume = customVolume !== null ? customVolume : config.volume || 0.95;

    // Method 1: Web Audio API AudioBuffer (Instant 0ms, supports infinite polyphonic rapid fire)
    const buffer = this.audioBuffers[weaponId];
    if (buffer) {
      try {
        this.initContext();
        if (this.ctx) {
          const source = this.ctx.createBufferSource();
          const gainNode = this.ctx.createGain();
          source.buffer = buffer;

          const now = this.ctx.currentTime;
          const maxPlayable = Math.max(0.1, (buffer.duration || 10) - offset);
          const playDuration = Math.min(duration, maxPlayable);

          // Punchy shot attack
          gainNode.gain.setValueAtTime(volume, now);
          // Crisp volume for the shot, then quick smooth anti-click fadeout at the 0.5s boundary
          const fadeStart = Math.max(0.05, playDuration - 0.08);
          gainNode.gain.setValueAtTime(volume, now + fadeStart);
          gainNode.gain.linearRampToValueAtTime(0.0001, now + playDuration);

          source.connect(gainNode);
          gainNode.connect(this.ctx.destination);

          // Jump directly to the gunshot in the middle of the video (offset), play for exactly 0.5s!
          source.start(now, offset, playDuration);
          source.stop(now + playDuration + 0.02);
          return true;
        }
      } catch (_) {}
    }

    // Method 2: HTMLAudioElement fallback
    const path = WEAPON_AUDIO_PATHS[weaponId];
    if (path && typeof Audio !== 'undefined') {
      try {
        const audio = new Audio(path);
        audio.volume = volume;
        audio.currentTime = offset;
        audio.play().catch(() => {});

        // Cut off audio after 0.5s so the video does NOT play to the end!
        setTimeout(() => {
          try {
            audio.pause();
            audio.currentTime = offset;
          } catch (_) {}
        }, duration * 1000);
        return true;
      } catch (_) {}
    }

    return false;
  }

  // Noise generator for procedural fallback
  getNoiseBuffer(duration = 0.35) {
    if (!this.ctx) return null;
    const bufferSize = Math.max(1, Math.floor(this.ctx.sampleRate * duration));
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // 1. AK-47 (Video o'rtasidagi 2.0s dan 0.5s otish)
  playAK47() {
    if (!this.enabled) return;
    if (this.playRealWeapon('ak47')) return;
    this.synthesizeAK47();
  }

  // 2. M4A1-S (Video o'rtasidagi 1.5s dan 0.5s otish)
  playM4A1S() {
    if (!this.enabled) return;
    if (this.playRealWeapon('m4a1s')) return;
    this.synthesizeM4A1S();
  }

  // 3. AWP Sniper (0.12s dan 0.55s snayper portlashi)
  playAWP() {
    if (!this.enabled) return;
    if (this.playRealWeapon('awp')) return;
    this.synthesizeAWP();
  }

  // 4. Desert Eagle .50 (Video o'rtasidagi 2.48s dan 0.5s zarba)
  playDeagle() {
    if (!this.enabled) return;
    if (this.playRealWeapon('deagle')) return;
    this.synthesizeDeagle();
  }

  // 5. Cyber Plasma Laser
  playLaser() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.14);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch (_) {}
  }

  // 6. Classic Sci-Fi Click / Beep
  playClassicClick(freq = 1200) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (_) {}
  }

  // Procedural Fallbacks (if audio file is ever inaccessible)
  synthesizeAK47() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(0.22);
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(350, now + 0.18);
      filter.Q.value = 1.3;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.42, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      const punch = this.ctx.createOscillator();
      const punchGain = this.ctx.createGain();
      punch.type = 'triangle';
      punch.frequency.setValueAtTime(190, now);
      punch.frequency.exponentialRampToValueAtTime(42, now + 0.12);
      punchGain.gain.setValueAtTime(0.38, now);
      punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      punch.connect(punchGain);
      punchGain.connect(this.ctx.destination);
      punch.start(now);
      punch.stop(now + 0.14);
    } catch (_) {}
  }

  synthesizeM4A1S() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(0.12);
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1500, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.09);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
    } catch (_) {}
  }

  synthesizeAWP() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(0.42);
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2800, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.38);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.48, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);

      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(140, now);
      sub.frequency.exponentialRampToValueAtTime(26, now + 0.32);
      subGain.gain.setValueAtTime(0.5, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + 0.36);
    } catch (_) {}
  }

  synthesizeDeagle() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(0.18);
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1900, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.16);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
    } catch (_) {}
  }

  // Universal click player: fires current equipped weapon!
  playClick() {
    if (!this.enabled) return;
    this.playWeaponSound(this.currentWeapon);
  }

  // Play sound for specific weapon ID
  playWeaponSound(weaponId) {
    if (!this.enabled) return;
    switch (weaponId) {
      case 'ak47':
        this.playAK47();
        break;
      case 'm4a1s':
        this.playM4A1S();
        break;
      case 'awp':
        this.playAWP();
        break;
      case 'deagle':
        this.playDeagle();
        break;
      case 'laser':
        this.playLaser();
        break;
      case 'classic':
      default:
        this.playClassicClick();
        break;
    }
  }

  // Reflex Game Target Hit: fires the equipped weapon with 100% precision
  playTargetHit(isGolden = false) {
    if (!this.enabled) return;
    this.playClick();
  }

  // Futuristic Power-up / Add to Cart
  playPowerUp() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.18);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (_) {}
  }

  // Cyber Victory / Level Up Fanfare
  playSuccess() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.28);
      });
    } catch (_) {}
  }

  // Tactical CS2 Reload sound (Mag out -> Mag in bolt cycle)
  playReload() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Mag out
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(800, now);
      osc1.frequency.exponentialRampToValueAtTime(150, now + 0.08);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.1);

      // Mag in & bolt clack
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1500, now + 0.28);
      osc2.frequency.exponentialRampToValueAtTime(280, now + 0.38);
      gain2.gain.setValueAtTime(0.28, now + 0.28);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.28);
      osc2.stop(now + 0.44);
    } catch (_) {}
  }

  // Dry fire empty magazine click
  playEmptyAmmo() {
    if (!this.enabled) return;
    this.playClassicClick(650);
  }

  // CS2 Headshot Dink / Ping sound
  playHeadshot() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2800, now);
      osc.frequency.exponentialRampToValueAtTime(4200, now + 0.09);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (_) {}
  }

  // Player hurt / damaged sound
  playPlayerHurt() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.14);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch (_) {}
  }

  // High score victory fanfare
  playVictory() {
    this.playSuccess();
  }
}

export const soundFX = new SoundFXManager();
