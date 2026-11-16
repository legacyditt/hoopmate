// Key penyimpanan di localStorage
const STORAGE_KEY = "hoopmate_state_v1";

// Buat struktur state awal
export function createInitialState() {
  return {
    sessionName: "Pickup 3x3 Run",
    players: [], // [{ id, name }]
    teams: [], // [{ id, name, members }]
    matches: [], // [{ id, teamAId, teamBId, scoreA, scoreB, done }]
    activeMatchId: null,
    scoreboard: {
      teamAName: "Tim A",
      teamBName: "Tim B",
      scoreA: 0,
      scoreB: 0,
      history: [], // Simpan riwayat poin untuk fitur Undo
    },
    timer: {
      durationMinutes: 10,
      remainingSeconds: 600,
      isRunning: false,
      endTime: null,
    },
  };
}

// Ambil state dari localStorage
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();

    // Gabung default agar properti baru tetap aman jika struktur berubah
    return { ...createInitialState(), ...JSON.parse(raw) };
  } catch {
    return createInitialState();
  }
}

// Simpan state ke localStorage
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Abaikan jika storage penuh atau mode private memblokir
  }
}
