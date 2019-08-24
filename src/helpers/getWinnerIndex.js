function getTotalPlayerScore(rounds, playerIndex) {
  return rounds.slice().reduce((acc, cur) => acc + cur.scores[playerIndex], 0);
}

export default function getWinnerIndex(rounds, players, gameScore) {
  const totalPlayersScores = [];

  players.forEach((_, playerIndex) => {
    totalPlayersScores.push(getTotalPlayerScore(rounds, playerIndex));
  });

  const maxScore = Math.max(...totalPlayersScores);

  if (maxScore > gameScore) {
    return totalPlayersScores.indexOf(maxScore);
  }

  return -1;
}
