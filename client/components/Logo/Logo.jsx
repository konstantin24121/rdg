import React from 'react';
import PropTypes from 'prop-types';

import { Root } from './LogoStyled';
import Icon from './logo.svg';

const Logo = ({ isSecondary }) => (
  <Root {...{ isSecondary }}>
    <Icon />
  </Root>
);

Logo.propTypes = {
  isSecondary: PropTypes.bool,
};

Logo.defaultProps = {
  isSecondary: false,
};

export default Logo;
