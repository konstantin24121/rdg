import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const applyAlertType = ({ type }) => {
  switch (type) {
    case 'info':
      return css`
        background: #f4f4f4;
        color: #6f6f6f;
      `;
    case 'success':
      return css`
        border-radius: 3px;
        border: 2px solid #00d0a2;
        background-color: rgba(0, 208, 162, 0.09);
      `;
    default:
      return css``;
  }
};

const applyAlertSize = ({ size }) => {
  switch (size) {
    case 'small': return css`font-size: 14px; font-weight: 400;`;
    case 'medium': return css`font-size: 16px; font-weight: 500;`;
    default: return css`font-size: 18px; font-weight: 700;`;
  }
};

const Alert = styled.div`
  width: 100%;
  padding: 11px 16px;
  ${applyAlertType};
  ${applyAlertSize};
`;


Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success']),
  size: PropTypes.oneOf(['big', 'medium', 'small']),
};

Alert.defaultProps = {
  type: 'info',
  size: 'small',
};

export default Alert;
