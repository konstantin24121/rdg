import styled, { css } from 'styled-components';

const applyBtnType = ({ type }) => {
  switch (type) {
    case 'primary':
      return css`
        background-color: #4a90e2;
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
        background-color: #676767;
      `;
  }
};

const applyBtnSize = ({ size }) => {
  switch (size) {
    case 'small':
      return css`
        padding: 4px 8px;
        font-size: 14px;
      `;
    default:
      return css`
        padding: 8px 12px;
        font-size: 18px;
      `;
  }
};

const applyBtnStyles = ({ isFlex, isActive, isDisable }) => css`
  opacity: ${isActive ? 0.8 : 1};
  width: ${isFlex ? '100%' : 'auto'};
  &:hover {
    cursor: ${isDisable ? 'default' : 'pointer'};
  }

  &:active {
    opacity: ${isDisable ? 0.8 : 1};
  }
`;

export const Btn = styled.button`
  margin: 0;
  width: 100%;
  border: none;
  border-radius: 3px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  color: white;
  font: inherit;
  font-weight: 700;
  line-height: 1.33;
  transition: opacity 200ms ease-in-out;
  ${applyBtnType}
  ${applyBtnSize}
  ${applyBtnStyles}

  &:hover {
    opacity: 0.8;
  }
`;
