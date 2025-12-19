
export function play(players) {
  if (!Array.isArray(players)) {
    throw new Error('players is not an array');
  }

  while (players.length > 1) {
    for (const player of players) {
      player.turn(players);
    }

    players = players.filter((player) => {
      const isAlive = !player.isDead();
      if (!isAlive) {
        console.log(player.name + ' is dead!');
      }
      return isAlive;
    });
  }

  if (players.length === 0) {
    return null;
  }

  const winner = players[0];
  console.log(winner.name + ' wins!');
  return winner;

}
