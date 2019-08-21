import React from 'react';
import PropTypes from 'prop-types';
import Button from '$components/lib/Button';

import './Counter.scss';

const Counter = ({
  children, value, min, max, onChange,
}) => {
  function decrement() {
    if (value > min) {
      onChange(value - 1);
    }
  }

  function increment() {
    if (value < max) {
      onChange(value + 1);
    }
  }

  return (
    <div className="counter">
      { children }
      <div className="counter__controls">
        <Button className="counter__decrement" onClick={decrement}>-</Button>
        <div className="counter__value">{value}</div>
        <Button className="counter__increment" onClick={increment}>+</Button>
      </div>
    </div>
  );
};

Counter.propTypes = {
  children: PropTypes.node,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

Counter.defaultProps = {
  value: 0,
  min: 0,
  max: 4,
};

export default Counter;
