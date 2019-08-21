import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import GameTable from './GameTable';

import './Game.scss';

const Game = () => {
  const players = useSelector(state => state.game.players, shallowEqual);
  const flattenPlayers = players.flat();
  const rounds = useSelector(state => state.game.rounds);
  const selectedRound = useSelector(state => state.game.selectedRound);
  const columns = players.length;

  const dealer = flattenPlayers[rounds.length % flattenPlayers.length];

  return (
    <div className="game">
      <GameTable />
    </div>
  );
};

Game.defaultProps = {

};

Game.propTypes = {

};

export default Game;
