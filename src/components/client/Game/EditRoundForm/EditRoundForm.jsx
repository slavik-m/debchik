import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import './EditRoundForm.scss';

const EditRoundForm = () => {
  const edit = useSelector(state => state.game.edit, shallowEqual);

  return (
    <div className="edit-round-form">
      Edit form
    </div>
  );
};

EditRoundForm.defaultProps = {

};

EditRoundForm.propTypes = {

};

export default EditRoundForm;
