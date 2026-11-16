// AudioContext untuk efek suara buzzer cadangan
let audioCtx = null;
let countdownAudio = null;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  return audioCtx;
}

// Buka kunci audio browser saat user klik Start
export function unlockAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
}

// Hentikan audio countdown jika timer di-pause atau di-reset
export function stopCountdownAudio() {
  if (countdownAudio) {
    countdownAudio.pause();
    countdownAudio.currentTime = 0;
  }
}

// Putar audio hitung mundur 10 detik terakhir
function playCountdown10() {
  if (typeof Audio === 'undefined') return;

  stopCountdownAudio();
  countdownAudio = new Audio('./sounds/10_seconds.mp3');
  countdownAudio.play().catch(() => {});
}

// Bunyi buzzer cadangan (Web Audio API) jika file mp3 gagal dimuat
function playSynthBuzzer() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 1.2;

  [180, 186].forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  });
}

// Bunyi buzzer akhir pertandingan
export function playBuzzer() {
  stopCountdownAudio();

  if (typeof Audio === 'undefined') {
    playSynthBuzzer();
    return;
  }

  const audio = new Audio('./sounds/buzzer.mp3');
  audio.currentTime = 0;
  audio.play().catch(() => {
    playSynthBuzzer();
  });
}

// Picu suara sesuai sisa detik pertandingan
export function announceRemainingTime(seconds) {
  if (seconds === 10) {
    playCountdown10();
  } else if (seconds === 0) {
    playBuzzer();
  }
}

