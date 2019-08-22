import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Button from '$components/lib/Button';
import ToggleButton from '$components/lib/ToggleButton';
import Counter from '$components/lib/Counter';
import { setEdit, changeRound } from '$store/game/actions';

import './GroupForm.scss';

const GroupForm = () => {
  const dispatch = useDispatch();
  const [bella, setBella] = useState(false);
  const [twenty, setTwenty] = useState(0);
  const [fifty, setFifty] = useState(0);
  const [scores, setScores] = useState(['', '']);

  const players = useSelector(state => state.game.players, shallowEqual);
  const flattenPlayers = players.flat();
  // const selectedRound = useSelector(state => state.game.selectedRound, shallowEqual);
  const rounds = useSelector(state => state.game.rounds);

  const dealer = flattenPlayers[[0, 2, 1, 3][rounds.length % flattenPlayers.length]];
  const [gamePlayer, setGamePlayer] = useState(dealer);

  const roundScore = 162 + (bella ? 20 : 0) + twenty * 20 + fifty * 50;

  function isValidScores() {
    return Math.abs(scores[0] + scores[1]) === roundScore;
  }

  function onScoreChange(i, value) {
    const nScore = scores.slice();

    if (isNaN(value)) {
      nScore[i] = value || '';
      nScore[i === 0 ? 1 : 0] = roundScore - 0;

      setScores(nScore);
    } else if (value <= roundScore) {
      nScore[i] = value || 0;
      nScore[i === 0 ? 1 : 0] = roundScore - value;

      setScores(nScore);
    }
  }

  function onSubmit() {
    dispatch(changeRound({
      gamePlayer,
      bella,
      twenty,
      fifty,
      scores,
    }));
  }

  return (
    <>
      <div className="edit-round-form__game-score">
        GAME:
        {' '}
        <b>{roundScore}</b>
      </div>
      <div>
        <ToggleButton selected={bella} onChange={setBella}>
          Bella
        </ToggleButton>
        <Counter value={twenty} onChange={setTwenty}>
          Twenty:
        </Counter>
        <Counter value={fifty} onChange={setFifty}>
          Fifty:
        </Counter>
        <div>
          Dealer:
          {' '}
          <b>{dealer}</b>
        </div>
        <div>Player:</div>
        <select id="player" value={gamePlayer} onChange={ev => setGamePlayer(ev.target.value)}>
          {
            flattenPlayers.map(player => (
              <option key={player} value={player}>{player}</option>
            ))
          }
        </select>
      </div>
      <div className="edit-round-form__scores">
        {
          players.map((player, i) => (
            <div key={i} className="scores__item">
              {
                (player[0] === gamePlayer || player[1] === gamePlayer) && i === 0
                  ? <Button className="byte-left" onClick={() => onScoreChange(i, 0)}>B</Button>
                  : null
              }
              {
                (player[0] === gamePlayer || player[1] === gamePlayer) && i === 0 && scores[i] === 0
                  ? <div className="byte-left-label">B</div>
                  : null
              }
              { `${player[0][0]} + ${player[1][0]}`}
              <input type="number" value={scores[i]} onChange={ev => onScoreChange(i, parseInt(ev.target.value, 10))} />
              {
                (player[0] === gamePlayer || player[1] === gamePlayer) && i === 1
                  ? <Button className="byte-right" onClick={() => onScoreChange(i, 0)}>B</Button>
                  : null
              }
              {
                (player[0] === gamePlayer || player[1] === gamePlayer) && i === 1 && scores[i] === 0
                  ? <div className="byte-right-label">B</div>
                  : null
              }
            </div>
          ))
        }
      </div>

      <div className="edit-round-form__buttons">
        <Button onClick={() => dispatch(setEdit(false))}>Cancel</Button>
        <Button disabled={!isValidScores()} onClick={onSubmit}>Confirm</Button>
      </div>
    </>
  );
};

GroupForm.defaultProps = {

};

GroupForm.propTypes = {

};

export default GroupForm;
