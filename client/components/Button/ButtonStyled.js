import styled, { css } from 'styled-components';

const applyBtnType = ({ type, theme }) => {
  switch (type) {
    case 'primary':
      return css`
        background-color: ${theme.blue500};

        &:focus {
          outline-color: ${theme.blue800};
        }
      `;
    case 'link':
      return css`
        background-color: transparent;
        width: auto;
        line-height: 1;
        color: inherit;
      `;
    default:
      return css`
        background-color: ${theme.gray500};
      `;
  }
};

const applyBtnSize = ({ size, theme }) => {
  switch (size) {
    case 'small':
      return css`
        padding: 4px 8px;
        font-size: ${theme.fontSizeBase};
      `;
    default:
      return css`
        padding: 8px 12px;
        font-size: ${theme.fontSizeLarge};
      `;
  }
};

const applyBtnStyles = ({ theme, isFlex, isActive, width, disabled }) => css`
  border-radius: ${theme.borderRadius};
  font-weight: ${theme.fontWeightBold};
  font-family: ${theme.fontFamily};

  opacity: ${isActive ? 0.8 : 1};
  width: ${isFlex ? '100%' : width};
  &:hover {
    cursor: ${disabled ? 'default' : 'pointer'};
  }

  &:active {
    opacity: ${disabled ? 0.8 : 1};
  }
`;

export const Btn = styled.button`
  margin: 0;
  border: none;
  display: flex;
  align-items: baseline;
  justify-content: center;
  color: white;
  line-height: 1.33;
  transition: opacity 200ms ease-in-out;
  ${applyBtnType}
  ${applyBtnSize}
  ${applyBtnStyles}

  &:hover {
    opacity: 0.8;
  }
`;
