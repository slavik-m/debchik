import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Button from '$components/lib/Button';
import ToggleButton from '$components/lib/ToggleButton';
import Counter from '$components/lib/Counter';
import { setEdit } from '$store/game/actions';

import './EditRoundForm.scss';

const EditRoundForm = () => {
  // TODO: For 3 players
  const dispatch = useDispatch();
  const [bella, setBella] = useState(false);
  const [twenty, setTwenty] = useState(0);
  const [fifty, setFifty] = useState(0);
  const players = useSelector(state => state.game.players, shallowEqual);
  const selectedRound = useSelector(state => state.game.selectedRound, shallowEqual);
  const roundScore = 162 + (bella ? 20 : 0) + twenty * 20 + fifty * 50;

  return (
    <div className="edit-round-form">
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
      </div>
      <div className="edit-round-form__scores">
        {
          players.map((player, i) => (
            <div key={i} className="scores__item">
              { Array.isArray(player) ? `${player[0][0]} + ${player[1][0]}` : player[0]}
              <input type="text" />
            </div>
          ))
        }
      </div>

      <div className="edit-round-form__buttons">
        <Button onClick={() => dispatch(setEdit(false))}>Cancel</Button>
        <Button>Confirm</Button>
      </div>
    </div>
  );
};

EditRoundForm.defaultProps = {

};

EditRoundForm.propTypes = {

};

export default EditRoundForm;
