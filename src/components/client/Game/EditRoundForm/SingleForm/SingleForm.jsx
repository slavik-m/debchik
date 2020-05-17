import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Button from '$components/lib/Button';
import { setEdit } from '$store/game/actions';

const SingleForm = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.game.players, shallowEqual);

  return (
    <>
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
    </>
  );
};

SingleForm.defaultProps = {

};

SingleForm.propTypes = {

};

export default SingleForm;
