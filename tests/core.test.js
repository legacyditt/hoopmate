import { describe, it, expect } from 'vitest';
import { addPlayer, editPlayer, deletePlayer } from '../js/player.js';
import { buildTeams, generateMatches } from '../js/teams.js';
import { addPoints, undoLastScore, formatTime } from '../js/scoreboard.js';

describe('Manajemen Pemain (player.js)', () => {
  it('menambah, mengedit, dan menghapus pemain dengan validasi', () => {
    const players = [];
    expect(addPlayer(players, '   ')).toBe(false);
    expect(addPlayer(players, '  Budi  ')).toBe(true);
    expect(players).toHaveLength(1);
    expect(players[0].name).toBe('Budi');

    const id = players[0].id;
    expect(editPlayer(players, id, 'Andi')).toBe(true);
    expect(players[0].name).toBe('Andi');

    const remaining = deletePlayer(players, id);
    expect(remaining).toHaveLength(0);
  });
});

describe('Pembagian Tim & Jadwal (teams.js)', () => {
  it('membagi 6 pemain menjadi 2 tim 3v3 dan 1 jadwal pertandingan', () => {
    const players = ['A', 'B', 'C', 'D', 'E', 'F'].map((name, i) => ({
      id: String(i),
      name,
    }));

    const teams = buildTeams(players, 3);
    expect(teams).toHaveLength(2);
    expect(teams[0].name).toBe('Tim A');
    expect(teams[1].name).toBe('Tim B');
    expect(teams[0].members).toHaveLength(3);

    const matches = generateMatches(teams);
    expect(matches).toHaveLength(1);
    expect(matches[0].teamAName).toBe('Tim A');
    expect(matches[0].teamBName).toBe('Tim B');
  });

  it('menghasilkan 3 pertandingan untuk 3 tim', () => {
    const teams = [
      { id: '1', name: 'Tim A', members: [] },
      { id: '2', name: 'Tim B', members: [] },
      { id: '3', name: 'Tim C', members: [] },
    ];
    expect(generateMatches(teams)).toHaveLength(3);
  });
});

describe('Papan Skor & Timer (scoreboard.js)', () => {
  it('menambah poin, undo, dan format waktu MM:SS', () => {
    const board = { scoreA: 0, scoreB: 0, history: [] };
    expect(addPoints(board, 'A', 2)).toBe(true);
    expect(addPoints(board, 'B', 3)).toBe(true);
    expect(board.scoreA).toBe(2);
    expect(board.scoreB).toBe(3);

    expect(undoLastScore(board)).toBe(true);
    expect(board.scoreB).toBe(0);
    expect(undoLastScore(board)).toBe(true);
    expect(board.scoreA).toBe(0);
    expect(undoLastScore(board)).toBe(false);

    expect(formatTime(600)).toBe('10:00');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(-5)).toBe('00:00');
  });
});

