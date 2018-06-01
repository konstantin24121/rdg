import React from 'react';
import PropTypes from 'prop-types';

import { Titles } from './TitleStyled';

const Title = ({ size, children, ...props }) => {
  const TitleTag = Titles[size];
  return (<TitleTag {...props}>{children}</TitleTag>);
};

Title.propTypes = {
  /**
   * Размер заголовка
   */
  size: PropTypes.number,
  /**
   * Инлайновый?
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
