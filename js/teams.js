// Acak urutan array dengan algoritma Fisher-Yates
export function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Bagi daftar pemain menjadi tim 3v3
export function buildTeams(players, teamSize = 3) {
  if (players.length < 2) return [];

  const shuffled = shuffleArray(players);
  const teams = [];

  for (let i = 0; i < shuffled.length; i += teamSize) {
    const group = shuffled.slice(i, i + teamSize);
    const letter = String.fromCharCode(65 + teams.length); // A, B, C, ...

    teams.push({
      id: crypto.randomUUID(),
      name: `Tim ${letter}`,
      members: group.map((player) => player.name),
    });
  }

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

