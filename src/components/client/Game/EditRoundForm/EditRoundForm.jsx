import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Button from '$components/lib/Button';
import ToggleButton from '$components/lib/ToggleButton';
import { setEdit } from '$store/game/actions';

import './EditRoundForm.scss';

const EditRoundForm = () => {
  const dispatch = useDispatch();
  const [bella, setBella] = useState(false);
  const players = useSelector(state => state.game.players, shallowEqual);
  const selectedRound = useSelector(state => state.game.selectedRound, shallowEqual);

  return (
    <div className="edit-round-form">
      <div className="edit-round-form__game-score">
        GAME:
        {' '}
        <b>{ 162 + (bella ? 20 : 0) }</b>
      </div>
      <div>
        <ToggleButton selected={bella} onChange={setBella}>
          Bella
        </ToggleButton>
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
