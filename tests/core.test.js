import { describe, it, expect } from 'vitest';
import { addPlayer, editPlayer, deletePlayer } from '../js/player.js';
import { buildTeams, generateMatches, assignLatePlayer } from '../js/teams.js';
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
    expect([matches[0].teamAName, matches[0].teamBName]).toEqual(
      expect.arrayContaining(['Tim A', 'Tim B'])
    );
  });

  it('menyebar pemain sisa ke tim lain secara acak sebagai cadangan (10 pemain = 3 tim)', () => {
    const players = Array.from({ length: 10 }, (_, i) => ({
      id: String(i),
      name: `P${i + 1}`,
    }));

    const teams = buildTeams(players, 3);
    expect(teams).toHaveLength(3);

    const sizes = teams.map((t) => t.members.length).sort();
    expect(sizes).toEqual([3, 3, 4]);

    const allMembers = teams.flatMap((t) => t.members);
    expect(allMembers.filter((m) => m.endsWith('(Cadangan)'))).toHaveLength(1);
  });

  it('memasukkan pemain susulan sebagai cadangan lalu membentuk Tim D saat genap 3', () => {
    const teams = [
      { id: '1', name: 'Tim A', members: ['P1', 'P2', 'P3'] },
      { id: '2', name: 'Tim B', members: ['P4', 'P5', 'P6', 'didit (Cadangan)'] },
      { id: '3', name: 'Tim C', members: ['P7', 'P8', 'P9'] },
    ];
    const matches = generateMatches(teams); // 3 match awal

    // Teman 1 datang -> masuk acak ke tim isi 3 (Tim A atau Tim C)
    assignLatePlayer(teams, matches, 'Teman 1');
    expect(teams).toHaveLength(3);
    expect(teams[1].members).toHaveLength(4);
    expect(teams.filter((t) => t.members.length === 4)).toHaveLength(2);

    // Teman 2 datang -> didit + Teman 1 + Teman 2 gabung jadi Tim D + tambah 3 jadwal baru
    assignLatePlayer(teams, matches, 'Teman 2');
    expect(teams).toHaveLength(4);
    expect(teams[3].name).toBe('Tim D');
    expect(teams[3].members).toHaveLength(3);
    expect(teams[3].members).toEqual(expect.arrayContaining(['didit', 'Teman 1', 'Teman 2']));
    expect(teams[0].members).toHaveLength(3);
    expect(teams[1].members).toHaveLength(3);
    expect(teams[2].members).toHaveLength(3);
    expect(matches).toHaveLength(6);
  });

  it('menghasilkan 3 pertandingan untuk 3 tim', () => {
    const teams = [
      { id: '1', name: 'Tim A', members: [] },
      { id: '2', name: 'Tim B', members: [] },
      { id: '3', name: 'Tim C', members: [] },
    ];
    expect(generateMatches(teams)).toHaveLength(3);
  });

  it('menghasilkan 6 pertandingan untuk 4 tim tanpa ada tim main 3x berturut-turut', () => {
    const teams = ['A', 'B', 'C', 'D'].map((l, i) => ({
      id: String(i),
      name: `Tim ${l}`,
      members: [],
    }));
    const matches = generateMatches(teams);
    expect(matches).toHaveLength(6);

    // Pastikan tidak ada tim yang muncul di 3 match berurutan
    for (let i = 0; i <= matches.length - 3; i++) {
      const m1 = [matches[i].teamAId, matches[i].teamBId];
      const m2 = [matches[i + 1].teamAId, matches[i + 1].teamBId];
      const m3 = [matches[i + 2].teamAId, matches[i + 2].teamBId];
      const threeInARow = m1.filter((id) => m2.includes(id) && m3.includes(id));
      expect(threeInARow).toHaveLength(0);
    }
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

