import React from 'react';
import PropTypes from 'prop-types';


const EditIcon = ({ width, height }) => (
  <svg
    x="0px"
    y="0px"
    width={width}
    height={height}
    viewBox="0 0 383.947 383.947"
  >
    <g>
      <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893" />
      <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04C386.027,77.92,386.027,64.373,377.707,56.053z" />
    </g>
  </svg>
);

EditIcon.defaultProps = {
  width: 20,
  height: 20,
};

EditIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default EditIcon;
