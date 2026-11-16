import { createInitialState, loadState, saveState } from './state.js';
import { addPlayer, editPlayer, deletePlayer } from './player.js';
import { buildTeams, generateMatches } from './teams.js';
import { addPoints, undoLastScore, formatTime } from './scoreboard.js';

// State utama aplikasi
let state = loadState();
let timerInterval = null;

// Elemen DOM: Header & Sesi
const btnNewSession = document.getElementById('btn-new-session');
const sessionDateEl = document.getElementById('session-date');
const sessionTitleEl = document.getElementById('session-title');
const statPlayersEl = document.getElementById('stat-players');
const statTeamsEl = document.getElementById('stat-teams');
const statCompletedEl = document.getElementById('stat-completed');

// Elemen DOM: Papan Skor & Timer
const matchLabelEl = document.getElementById('match-label');
const btnUndoScore = document.getElementById('btn-undo-score');
const teamANameEl = document.getElementById('team-a-name');
const teamAScoreEl = document.getElementById('team-a-score');
const teamBNameEl = document.getElementById('team-b-name');
const teamBScoreEl = document.getElementById('team-b-score');
const scoreButtons = document.querySelectorAll('button[data-team][data-points]');
const timerDisplayEl = document.getElementById('timer-display');
const timerMinutesInput = document.getElementById('timer-minutes');
const btnTimerStart = document.getElementById('btn-timer-start');
const btnTimerPause = document.getElementById('btn-timer-pause');
const btnTimerReset = document.getElementById('btn-timer-reset');
const btnMatchFinish = document.getElementById('btn-match-finish');

// Elemen DOM: Pemain
const playerForm = document.getElementById('player-form');
const playerInput = document.getElementById('player-input');
const playerCountBadge = document.getElementById('player-count-badge');
const playerListEl = document.getElementById('player-list');

// Elemen DOM: Tim & Jadwal
const btnShuffleTeams = document.getElementById('btn-shuffle-teams');
const btnGenerateSchedule = document.getElementById('btn-generate-schedule');
const teamsListEl = document.getElementById('teams-list');
const scheduleListEl = document.getElementById('schedule-list');

// Simpan state lalu render ulang seluruh UI
function commit() {
  saveState(state);
  render();
}

// Render Card 1: Info Sesi
function renderSession() {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  sessionDateEl.textContent = today;
  sessionTitleEl.textContent = state.sessionName;
  statPlayersEl.textContent = state.players.length;
  statTeamsEl.textContent = state.teams.length;
  statCompletedEl.textContent = state.matches.filter((m) => m.done).length;
}

// Render Card 2: Papan Skor & Timer
function renderScoreboard() {
  const { scoreboard, timer, matches, activeMatchId } = state;
  const activeMatch = matches.find((m) => m.id === activeMatchId);

  matchLabelEl.textContent = activeMatch
    ? `Match #${activeMatch.matchNumber} • Sedang Main`
    : 'Laga Bebas • Siap Main';

  teamANameEl.textContent = scoreboard.teamAName;
  teamAScoreEl.textContent = scoreboard.scoreA;
  teamBNameEl.textContent = scoreboard.teamBName;
  teamBScoreEl.textContent = scoreboard.scoreB;

  timerDisplayEl.textContent = formatTime(timer.remainingSeconds);
  timerMinutesInput.value = timer.durationMinutes;
}

// Render Card 3: Daftar Pemain
function renderPlayers() {
  playerCountBadge.textContent = `${state.players.length} Pemain`;
  playerListEl.innerHTML = '';

  if (state.players.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'rounded-xl border border-dashed border-court-border px-3.5 py-3 text-center text-xs text-court-muted';
    empty.textContent = 'Belum ada pemain. Tambahkan nama di atas.';
    playerListEl.appendChild(empty);
    return;
  }

  state.players.forEach((player) => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between rounded-xl border border-court-border bg-court-box px-3.5 py-2.5';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'text-sm font-medium text-court-cream';
    nameSpan.textContent = player.name;

    const actions = document.createElement('div');
    actions.className = 'flex items-center gap-1.5';
    actions.innerHTML = `
      <button type="button" data-action="edit" data-id="${player.id}" class="rounded-lg border border-court-border px-2.5 py-1 text-xs text-court-muted hover:border-court-cream hover:text-court-cream">Edit</button>
      <button type="button" data-action="delete" data-id="${player.id}" class="rounded-lg border border-red-500/40 px-2.5 py-1 text-xs text-red-400 hover:bg-red-500/10">Delete</button>
    `;

    li.append(nameSpan, actions);
    playerListEl.appendChild(li);
  });
}

// Render Card 4A: Daftar Tim 3v3
function renderTeams() {
  teamsListEl.innerHTML = '';

  if (state.teams.length === 0) {
    teamsListEl.innerHTML = `
      <div class="col-span-full rounded-xl border border-dashed border-court-border bg-court-box p-3 text-center text-xs text-court-muted">
        Belum ada tim. Tambah minimal 2 pemain lalu klik "Acak Tim 3v3".
      </div>
    `;
    return;
  }

  state.teams.forEach((team, index) => {
    const card = document.createElement('div');
    card.className = 'rounded-xl border border-court-border bg-court-box p-3';

    const title = document.createElement('p');
    title.className = index % 2 === 0
      ? 'text-xs font-bold uppercase tracking-wider text-court-orange'
      : 'text-xs font-bold uppercase tracking-wider text-court-lime';
    title.textContent = team.name;

    const members = document.createElement('p');
    members.className = 'mt-1 text-xs text-court-cream';
    members.textContent = team.members.join(', ');

    card.append(title, members);
    teamsListEl.appendChild(card);
  });
}

// Render Card 4B: Daftar Jadwal Pertandingan
function renderSchedule() {
  scheduleListEl.innerHTML = '';

  if (state.matches.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'rounded-xl border border-dashed border-court-border bg-court-box px-3.5 py-3 text-center text-xs text-court-muted';
    empty.textContent = 'Belum ada jadwal. Klik "Buat Jadwal" setelah acak tim.';
    scheduleListEl.appendChild(empty);
    return;
  }

  state.matches.forEach((match) => {
    const li = document.createElement('li');
    const isActive = match.id === state.activeMatchId;
    li.className = `flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-sm ${
      isActive ? 'border-court-orange bg-court-box' : 'border-court-border bg-court-box'
    }`;

    const info = document.createElement('span');
    info.className = 'text-court-muted';
    info.innerHTML = `Match #${match.matchNumber}: `;

    const teamsText = document.createElement('strong');
    teamsText.className = 'text-court-cream';
    teamsText.textContent = match.done
      ? `${match.teamAName} ${match.scoreA} - ${match.scoreB} ${match.teamBName}`
      : `${match.teamAName} vs ${match.teamBName}`;
    info.appendChild(teamsText);

    const actionEl = document.createElement('div');
    if (match.done) {
      actionEl.innerHTML = '<span class="rounded-lg bg-court-lime/15 px-2.5 py-1 text-xs font-bold text-court-lime">Selesai</span>';
    } else {
      actionEl.innerHTML = `
        <button type="button" data-action="play" data-id="${match.id}" class="rounded-lg border border-court-orange px-2.5 py-1 text-xs font-bold text-court-orange transition hover:bg-court-orange hover:text-court-bg">
          ${isActive ? 'Aktif' : 'Mainkan'}
        </button>
      `;
    }

    li.append(info, actionEl);
    scheduleListEl.appendChild(li);
  });
}

// Render semua bagian UI
function render() {
  renderSession();
  renderScoreboard();
  renderPlayers();
  renderTeams();
  renderSchedule();
}

// --- Kontrol Timer ---
function stopTimerLoop() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function startTimerLoop() {
  stopTimerLoop();
  timerInterval = setInterval(() => {
    const remaining = Math.max(0, Math.ceil((state.timer.endTime - Date.now()) / 1000));
    state.timer.remainingSeconds = remaining;

    if (remaining <= 0) {
      state.timer.isRunning = false;
      state.timer.endTime = null;
      stopTimerLoop();
    }

    saveState(state);
    renderScoreboard();
  }, 250);
}

// --- Event Listeners ---

// Sesi Baru
btnNewSession.addEventListener('click', () => {
  if (!confirm('Reset semua data dan mulai sesi baru?')) return;
  stopTimerLoop();
  state = createInitialState();
  commit();
});

// Tambah Pemain
playerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (addPlayer(state.players, playerInput.value)) {
    playerInput.value = '';
    commit();
  }
});

// Edit & Hapus Pemain (Event Delegation)
playerListEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;

  const { action, id } = btn.dataset;

  if (action === 'delete') {
    state.players = deletePlayer(state.players, id);
    commit();
  } else if (action === 'edit') {
    const current = state.players.find((p) => p.id === id);
    const nextName = prompt('Ubah nama pemain:', current?.name || '');
    if (nextName !== null && editPlayer(state.players, id, nextName)) {
      commit();
    }
  }
});

// Acak Tim 3v3
btnShuffleTeams.addEventListener('click', () => {
  if (state.players.length < 2) {
    alert('Minimal butuh 2 pemain untuk membuat tim.');
    return;
  }
  state.teams = buildTeams(state.players, 3);
  state.matches = [];
  state.activeMatchId = null;
  commit();
});

// Buat Jadwal Pertandingan
btnGenerateSchedule.addEventListener('click', () => {
  if (state.teams.length < 2) {
    alert('Acak tim terlebih dahulu sebelum membuat jadwal.');
    return;
  }
  state.matches = generateMatches(state.teams);
  state.activeMatchId = null;
  commit();
});

// Pilih Match ke Papan Skor
scheduleListEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="play"]');
  if (!btn) return;

  const match = state.matches.find((m) => m.id === btn.dataset.id);
  if (!match || match.done) return;

  state.activeMatchId = match.id;
  state.scoreboard = {
    teamAName: match.teamAName,
    teamBName: match.teamBName,
    scoreA: match.scoreA,
    scoreB: match.scoreB,
    history: [],
  };
  commit();
});

// Tambah Skor (+1 / +2 / +3)
scoreButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const { team, points } = btn.dataset;
    if (addPoints(state.scoreboard, team, points)) {
      commit();
    }
  });
});

// Undo Skor
btnUndoScore.addEventListener('click', () => {
  if (undoLastScore(state.scoreboard)) {
    commit();
  }
});

// Ubah Durasi Menit Timer
timerMinutesInput.addEventListener('change', () => {
  const mins = Math.min(60, Math.max(1, Number(timerMinutesInput.value) || 10));
  state.timer.durationMinutes = mins;
  if (!state.timer.isRunning) {
    state.timer.remainingSeconds = mins * 60;
  }
  commit();
});

// Start Timer
btnTimerStart.addEventListener('click', () => {
  if (state.timer.isRunning) return;
  if (state.timer.remainingSeconds <= 0) {
    state.timer.remainingSeconds = state.timer.durationMinutes * 60;
  }
  state.timer.isRunning = true;
  state.timer.endTime = Date.now() + state.timer.remainingSeconds * 1000;
  startTimerLoop();
  commit();
});

// Pause Timer
btnTimerPause.addEventListener('click', () => {
  if (!state.timer.isRunning) return;
  state.timer.remainingSeconds = Math.max(0, Math.ceil((state.timer.endTime - Date.now()) / 1000));
  state.timer.isRunning = false;
  state.timer.endTime = null;
  stopTimerLoop();
  commit();
});

// Reset Timer
btnTimerReset.addEventListener('click', () => {
  stopTimerLoop();
  state.timer.isRunning = false;
  state.timer.endTime = null;
  state.timer.remainingSeconds = state.timer.durationMinutes * 60;
  commit();
});

// Selesai Match
btnMatchFinish.addEventListener('click', () => {
  const activeMatch = state.matches.find((m) => m.id === state.activeMatchId);
  if (activeMatch) {
    activeMatch.scoreA = state.scoreboard.scoreA;
    activeMatch.scoreB = state.scoreboard.scoreB;
    activeMatch.done = true;
  }

  stopTimerLoop();
  state.activeMatchId = null;
  state.scoreboard = {
    teamAName: 'Tim A',
    teamBName: 'Tim B',
    scoreA: 0,
    scoreB: 0,
    history: [],
  };
  state.timer.isRunning = false;
  state.timer.endTime = null;
  state.timer.remainingSeconds = state.timer.durationMinutes * 60;
  commit();
});

// Inisialisasi aplikasi saat halaman dibuka
function init() {
  if (state.timer.isRunning && state.timer.endTime) {
    const remaining = Math.max(0, Math.ceil((state.timer.endTime - Date.now()) / 1000));
    if (remaining > 0) {
      state.timer.remainingSeconds = remaining;
      startTimerLoop();
    } else {
      state.timer.isRunning = false;
      state.timer.remainingSeconds = 0;
      state.timer.endTime = null;
    }
  }
  commit();
}

init();
