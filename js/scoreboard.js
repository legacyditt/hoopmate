// Tambah poin ke Tim A atau Tim B
export function addPoints(scoreboard, team, points) {
  const value = Number(points);
  if (!Number.isFinite(value) || value <= 0) return false;

  if (team === 'A') {
    scoreboard.scoreA += value;
  } else if (team === 'B') {
    scoreboard.scoreB += value;
  } else {
    return false;
  }

  scoreboard.history.push({ team, points: value });
  return true;
}

// Batalkan poin terakhir (Undo)
export function undoLastScore(scoreboard) {
  const last = scoreboard.history.pop();
  if (!last) return false;

  if (last.team === 'A') {
    scoreboard.scoreA = Math.max(0, scoreboard.scoreA - last.points);
  } else if (last.team === 'B') {
    scoreboard.scoreB = Math.max(0, scoreboard.scoreB - last.points);
  }

  return true;
}

// Format detik menjadi MM:SS
export function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const mins = String(Math.floor(safeSeconds / 60)).padStart(2, '0');
  const secs = String(safeSeconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

