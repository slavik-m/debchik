import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import classNames from 'classnames';
import Button from '$components/lib/Button';
import Switcher from '$components/lib/Switcher';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const game = useSelector(state => state.game, shallowEqual);

  const [playersCount, setPlayersCount] = useState(4);
  const [players, setPlayers] = useState([]);

  function startGame() {
    dispatch({ type: 'null' });
  }

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
                    value={players[i]}
                    onChange={(ev) => {
                      players[i] = ev.target.value;
                      setPlayers(players);
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
