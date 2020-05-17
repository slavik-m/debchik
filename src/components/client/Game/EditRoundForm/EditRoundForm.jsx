import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import GroupForm from './GroupForm';
import SingleForm from './SingleForm';

import './EditRoundForm.scss';

const EditRoundForm = () => {
  const players = useSelector((state) => state.game.players, shallowEqual);

  return (
    <div className="edit-round-form">
      { players.length === 3
        ? <SingleForm />
        : <GroupForm />}
    </div>
  );
};

EditRoundForm.defaultProps = {

};

EditRoundForm.propTypes = {

};

export default EditRoundForm;
