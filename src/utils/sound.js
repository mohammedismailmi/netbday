// Web Audio API Synthesizer for genuine Netflix Ta-Dum & Celebration SFX
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTaDum() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // --- Ta-Dum Percussive Bass Thud 1 (Ta) ---
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(95, now);
    osc1.frequency.exponentialRampToValueAtTime(45, now + 0.35);
    gain1.gain.setValueAtTime(0.7, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.45);

    // --- Ta-Dum Bass Boom 2 (Dum) at +0.28s ---
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110, now + 0.28);
    osc2.frequency.exponentialRampToValueAtTime(38, now + 1.8);
    gain2.gain.setValueAtTime(0.001, now + 0.28);
    gain2.gain.linearRampToValueAtTime(0.85, now + 0.32);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 2.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.28);
    osc2.stop(now + 2.3);

    // --- Cinematic Shimmering Chord (High Metallic Resonance) ---
    const freqs = [293.66, 369.99, 440.0, 587.33, 880.0]; // D major shimmer
    freqs.forEach((freq, idx) => {
      const chordOsc = ctx.createOscillator();
      const chordGain = ctx.createGain();
      const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      chordOsc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      chordOsc.frequency.setValueAtTime(freq, now + 0.32);
      chordOsc.frequency.linearRampToValueAtTime(freq * 1.005, now + 2.4);

      // Low pass filter for smooth cinematic warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now + 0.32);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.9);
      filter.frequency.exponentialRampToValueAtTime(600, now + 2.5);

      chordGain.gain.setValueAtTime(0.0001, now + 0.32);
      chordGain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + 0.6);
      chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      chordOsc.connect(filter);
      filter.connect(chordGain);

      if (pan) {
        pan.pan.value = (idx - 2) * 0.35;
        chordGain.connect(pan);
        pan.connect(ctx.destination);
      } else {
        chordGain.connect(ctx.destination);
      }

      chordOsc.start(now + 0.32);
      chordOsc.stop(now + 3.0);
    });
  } catch (err) {
    console.warn('Audio playback error (browser user-gesture restriction):', err);
  }
}

export function playCelebrationChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0.15, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.6);
    });
  } catch (e) {
    // ignore
  }
}
