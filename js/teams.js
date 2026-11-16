// Acak urutan array dengan algoritma Fisher-Yates
export function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Bagi daftar pemain menjadi tim 3v3; sisa pemain disebar acak sebagai cadangan
export function buildTeams(players, teamSize = 3) {
  if (players.length < 2) return [];

  const shuffled = shuffleArray(players);
  const teamCount = players.length < teamSize * 2
    ? 2
    : Math.floor(players.length / teamSize);

  // Buat wadah tim (Tim A, Tim B, dst.)
  const teams = Array.from({ length: teamCount }, (_, i) => ({
    id: crypto.randomUUID(),
    name: `Tim ${String.fromCharCode(65 + i)}`,
    members: [],
  }));

  // Jika pemain kurang dari 2 tim penuh (< 6), bagi rata ke 2 tim
  if (players.length < teamSize * 2) {
    shuffled.forEach((player, i) => {
      teams[i % teamCount].members.push(player.name);
    });
    return teams;
  }

  // Isi pemain inti (3 per tim)
  const mainCount = teamCount * teamSize;
  for (let i = 0; i < mainCount; i++) {
    const teamIndex = Math.floor(i / teamSize);
    teams[teamIndex].members.push(shuffled[i].name);
  }

  // Sebar sisa pemain (1 atau 2 orang) secara acak sebagai cadangan
  const leftovers = shuffled.slice(mainCount);
  const randomTeamIndices = shuffleArray(teams.map((_, i) => i));
  leftovers.forEach((player, i) => {
    const targetTeam = teams[randomTeamIndices[i % teamCount]];
    targetTeam.members.push(`${player.name} (Cadangan)`);
  });

  return teams;
}

// Buat jadwal pertandingan agar setiap tim saling bertemu
export function generateMatches(teams) {
  if (teams.length < 2) return [];

  const matches = [];
  let matchNumber = 1;

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({
        id: crypto.randomUUID(),
        matchNumber,
        teamAId: teams[i].id,
        teamBId: teams[j].id,
        teamAName: teams[i].name,
        teamBName: teams[j].name,
        scoreA: 0,
        scoreB: 0,
        done: false,
      });
      matchNumber++;
    }
  }

  return matches;
}

// Masukkan pemain susulan ke tim yang ada atau bentuk tim baru jika genap 3
export function assignLatePlayer(teams, matches, rawName, teamSize = 3) {
  const name = rawName.trim();
  if (!name || teams.length < 2) return;

  const subSuffix = ' (Cadangan)';
  const existingSubs = [];

  teams.forEach((team) => {
    team.members.forEach((member) => {
      if (member.endsWith(subSuffix)) {
        existingSubs.push({ team, member });
      }
    });
  });

  // Jika cadangan + pemain baru genap 3 orang, bentuk tim baru
  if (existingSubs.length + 1 >= teamSize) {
    const picked = existingSubs.slice(0, teamSize - 1);
    const newMembers = picked.map(({ team, member }) => {
      team.members = team.members.filter((m) => m !== member);
      return member.slice(0, -subSuffix.length);
    });
    newMembers.push(name);

    const previousTeams = [...teams];
    const newTeam = {
      id: crypto.randomUUID(),
      name: `Tim ${String.fromCharCode(65 + teams.length)}`,
      members: newMembers,
    };
    teams.push(newTeam);

    // Tambah jadwal baru jika jadwal sudah dibuat sebelumnya
    if (matches.length > 0) {
      let nextNumber = matches.length + 1;
      previousTeams.forEach((opponent) => {
        matches.push({
          id: crypto.randomUUID(),
          matchNumber: nextNumber++,
          teamAId: opponent.id,
          teamBId: newTeam.id,
          teamAName: opponent.name,
          teamBName: newTeam.name,
          scoreA: 0,
          scoreB: 0,
          done: false,
        });
      });
    }
    return;
  }

  // Belum cukup tim baru: masukkan acak ke tim dengan anggota paling sedikit
  const minSize = Math.min(...teams.map((t) => t.members.length));
  const candidates = teams.filter((t) => t.members.length === minSize);
  const target = candidates[Math.floor(Math.random() * candidates.length)];
  target.members.push(`${name}${subSuffix}`);
}


