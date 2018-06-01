import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const sizeMap = [12, 14, 16];

const applyTestStyles = ({ align, block, size }) => css`
  display: ${block ? 'inline-block' : 'inline'};
  font-size: ${sizeMap[size]}px;
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
