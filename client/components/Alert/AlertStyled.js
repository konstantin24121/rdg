import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const applyAlertType = ({ type, theme }) => {
  switch (type) {
    case 'info':
      return css`
        background: ${theme.gray100};
        color: ${theme.gray500};
      `;
    case 'success':
      return css`
        border-radius: ${theme.borderRadius};
        border: 2px solid ${theme.green100};
        background-color: rgba(0, 208, 162, 0.1);
      `;
    default:
      return css``;
  }
};

const applyAlertSize = ({ size, theme }) => {
  switch (size) {
    case 'small':
      return css`
        font-size: ${theme.fontSizeBase};
        font-weight: ${theme.fontWeightRegular};
      `;
    case 'medium':
      return css`
        font-size: ${theme.fontSizeBig};
        font-weight: 500;
      `;
    default:
      return css`
        font-size: ${theme.fontSizeLarge};
        font-weight: ${theme.fontWeightBold};
      `;
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
