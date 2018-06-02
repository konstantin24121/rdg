import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const sizeMap = theme => [theme.fontSizeSmall, theme.fontSizeBase, theme.fontSizeBig];

const applyTestStyles = ({ align, block, size, theme }) => css`
  display: ${block ? 'inline-block' : 'inline'};
  font-size: ${sizeMap(theme)[size]};
  text-align: ${align};
`;

const Text = styled.span`
  width: 100%;
  ${applyTestStyles}
`;

Text.propTypes = {
  size: PropTypes.oneOf([0, 1, 2]),
  align: PropTypes.string,
};

Text.defaultProps = {
  size: 1,
  align: 'left',
  block: false,
};

export default Text;
