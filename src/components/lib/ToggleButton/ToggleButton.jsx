import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '$components/lib/Button';

import './ToggleButton.scss';

const ToggleButton = ({ selected, children, onChange }) => (
  <Button
    className={classNames('button__toggle', { 'button--active': selected })}
    onClick={() => onChange(!selected)}
  >
    { children }
  </Button>
);

ToggleButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

ToggleButton.defaultProps = {
  selected: false,
};

export default ToggleButton;
