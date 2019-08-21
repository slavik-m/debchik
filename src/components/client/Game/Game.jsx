import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import './Game.scss';

const Game = () => {
  const players = useSelector(state => state.game.players, shallowEqual);
  const columns = players.length;

  return (
    <div className="game">
      <div className="game-table">
        <div className="game-table__header">
          {
            players.map(player => (
              <div className="game-table__header-cell">
                { Array.isArray(player) ? `${player[0][0]} + ${player[1][0]}` : player[0]}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

Game.defaultProps = {

};

Game.propTypes = {

};

export default Game;
