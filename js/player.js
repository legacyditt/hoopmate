export function addPlayer(players, rawName) {
  const name = rawName.trim();
  // tolak inputan kosong
  if (!name) return false;

  players.push({
    id: crypto.randomUUID(),
    name,
  });
  return true;
}

// Mengubah nama player berdasarkan id
export function editPlayer(players, id, rawName) {
  const name = rawName.trim();
  if (!name) return false;

  const target = players.find((player) => player.id === id);
  if (!target) return false;

  target.name = name;
  return true;
}

// Hapus player berdasarkan id
export function deletePlayer(players, id) {
  return players.filter((player) => player.id !== id);
}
