export default function isOwnGame(flattenPlayers, dealer, gamePlayer) {
  const dealerIndex = flattenPlayers.indexOf(dealer);
  const gamePlayerIndex = flattenPlayers.indexOf(gamePlayer);

  const teams = [0, 0, 1, 1];

  return teams[dealerIndex] === teams[gamePlayerIndex];
}
