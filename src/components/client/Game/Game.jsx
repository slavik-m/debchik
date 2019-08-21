import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import GameTable from './GameTable';
import EditRoundForm from './EditRoundForm';

import './Game.scss';

const Game = () => {
  const edit = useSelector(state => state.game.edit, shallowEqual);
  const selectedRound = useSelector(state => state.game.selectedRound, shallowEqual);

  return (
    <div className="game">
      { !edit
        ? <GameTable />
        : <EditRoundForm />
      }
    </div>
  );
};

Game.defaultProps = {

};

Game.propTypes = {

};

export default Game;
