import React from 'react';
import classNames from 'classnames';

import './Button.scss';

const Button = ({
  className, disabled, onClick, children,
}) => (
  <button
    className={classNames('button', className)}
    disabled={disabled}
    onClick={onClick}
  >
    { children }
  </button>
);

export default Button;
