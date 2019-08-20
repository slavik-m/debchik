import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '$components/lib/Button';

import './Switcher.scss';

const Switcher = ({ values, value, onChange }) => (
  <div className="switcher">
    {
      values.map(v => (
        <Button
          key={v}
          className={classNames('button__switcher', { 'button--active': v === value })}
          onClick={() => onChange(v)}
        >
          { v }
        </Button>
      ))
    }
  </div>
);

Switcher.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  values: PropTypes.arrayOf(PropTypes.number),
};

Switcher.defaultProps = {
  values: [],
};

export default Switcher;
