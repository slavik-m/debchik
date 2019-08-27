import React from 'react';
import PropTypes from 'prop-types';

import './Switch.scss';

/* eslint-disable jsx-a11y/label-has-associated-control */
const Switch = ({ selected, onChange }) => (
  <label className="switch-wrap">
    <input type="checkbox" checked={selected} onChange={() => onChange(!selected)} />
    <div className="switch" />
  </label>
);

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

Switch.defaultProps = {
  selected: false,
};

export default Switch;
