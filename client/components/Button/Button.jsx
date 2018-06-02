import React from 'react';
import PropTypes from 'prop-types';

import { Btn } from './ButtonStyled';

const Button = ({ children, ...props }) => (
  <Btn {...props}>
    {children}
  </Btn>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary', 'link']),
  size: PropTypes.oneOf(['medium', 'small']),
  isFlex: PropTypes.bool,
  isActive: PropTypes.bool,
  isDisable: PropTypes.bool,
};

Button.defaultProps = {
  type: 'default',
  width: 'auto',
  size: 'medium',
  isFlex: false,
  isActive: false,
  isDisable: false,
};

export default Button;
