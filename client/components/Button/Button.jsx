import React from 'react';
import PropTypes from 'prop-types';

import { Btn } from './ButtonStyled';

const Button = ({ children, ...props }) => {
  return (
    <Btn {...props}>{children}</Btn>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isPrimary: PropTypes.bool,
};

Button.defaultProps = {
  isPrimary: false,
};

export default Button;
