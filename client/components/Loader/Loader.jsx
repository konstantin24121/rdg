import React from 'react';
import PropTypes from 'prop-types';

import { Circle, Check } from './LoaderStyled';

const Loader = ({ width, ...animationProps }) => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width={width}
  >
    <Circle {...animationProps} />
    <Check {...animationProps} points="25,51 43,70 78,35" />
  </svg>
);

Loader.propTypes = {
  width: PropTypes.string,
};

Loader.defaultProps = {
  width: 100,
};

export default Loader;
