export function getRoundWinnerIndex(scores) {
  const maxScore = Math.max(...scores);

  return scores.indexOf(maxScore);
}

export function getTotalScore(rounds, playerIndex) {
  return rounds.reduce((acc, cur, i) => {
    const score = acc + cur.scores[playerIndex];
    const previousRound = rounds[i - 1];
    const isWin = getRoundWinnerIndex(cur.scores) === playerIndex;

    if (previousRound && previousRound.eggs && isWin) {
      return score + previousRound.eggs;
    }

    return score;
  }, 0);
}

export default function getWinnerIndex(rounds, players, gameScore) {
  const totalPlayersScores = [];

  players.forEach((_, playerIndex) => {
    totalPlayersScores.push(getTotalScore(rounds, playerIndex));
  });

  const maxScore = Math.max(...totalPlayersScores);

  if (maxScore >= gameScore) {
    return totalPlayersScores.indexOf(maxScore);
  }

  return -1;
}
