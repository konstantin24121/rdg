import React from 'react';
import PropTypes from 'prop-types';

import { Titles } from './TitleStyled';

const Title = ({ size, children, ...props }) => {
  const TitleTag = Titles[size];
  return (<TitleTag {...props}>{children}</TitleTag>);
};

Title.propTypes = {
  /**
   * Title html size
   */
  size: PropTypes.number,
  /**
   * Is title must be inline?
   */
  inline: PropTypes.bool,
  children: PropTypes.node,
};

Title.defaultProps = {
  size: 1,
  inline: false,
  children: '',
};

export default Title;
