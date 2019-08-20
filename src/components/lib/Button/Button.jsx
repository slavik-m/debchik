import React from 'react';
import classNames from 'classnames';

import './Button.scss';

const Button = ({ className, children, ...other }) => (
  <button className={classNames('button', className)} {...other}>
    { children }
  </button>
);

export default Button;
