import React from 'react';
import PropTypes from 'prop-types';

import { Btn } from './ButtonStyled';

const Button = ({ children, ...props }) => (
  <Btn {...props}>{children}</Btn>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['default', 'primary', 'link']),
  size: PropTypes.oneOf(['medium', 'small']),
  isFlex: PropTypes.oneOf(['default', 'primary', 'link']),
  isActive: PropTypes.oneOf(['default', 'primary', 'link']),
  isDisable: PropTypes.oneOf(['default', 'primary', 'link']),
};

Button.defaultProps = {
  type: 'default',
  size: 'medium',
  isFlex: false,
  isActive: false,
  isDisable: false,
};

export default Button;
