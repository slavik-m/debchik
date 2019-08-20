import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import { createGame } from '$store/game/actions';
import Button from '$components/lib/Button';
import Switcher from '$components/lib/Switcher';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const game = useSelector(state => state.game, shallowEqual);

  const [playersCount, setPlayersCount] = useState(4);
  const [players, setPlayers] = useState(['Я']);

  function startGame() {
    if (players.filter(p => p).length < playersCount) {
      return;
    }

    dispatch(createGame(playersCount === 3
      ? [players[0], players[1], players[2]]
      : [
        [players[0], players[1]],
        [players[2], players[3]],
      ]));
  }

  console.log('render');

  return (
    <div className="app">
      {
        !game ? (
          <div className="game-form">
            <div className="game-form__players-count">
              <h4>Players</h4>
              <Switcher
                values={[3, 4]}
                value={playersCount}
                onChange={setPlayersCount}
              />
            </div>
            <div className={classNames(
              'game-form__player-names',
              { 'player-names--grouped': playersCount === 4 },
            )}
            >
              {
                (new Array(playersCount)).fill(0).map((_, i) => (
                  <input
                    key={i}
                    className={classNames()}
                    type="text"
                    value={players[i] || ''}
                    onChange={(ev) => {
                      const nPlayers = players.slice();
                      nPlayers[i] = ev.target.value;
                      setPlayers(nPlayers);
                    }}
                  />
                ))
              }
            </div>
            <Button onClick={startGame}>
              Start game
            </Button>
          </div>
        ) : null
      }
    </div>
  );
};

App.defaultProps = {

};

App.propTypes = {

};

export default App;
