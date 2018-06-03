import styled, { css } from 'styled-components';

const applyRootStyles = ({ theme }) => css`
  font-size: ${theme.fontSizeLarge};
  font-weight: ${theme.fontWeightBold};
`;

export const Root = styled.div`
  display: flex;
  align-items: stretch;
  height: 40px;
  position: relative;
  ${applyRootStyles}
`;

export const Addon = styled.div`
  padding: 0 25px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.blue100};
`;

export const InputField = styled.input`
  border: none;
  border-radius: 0;
  background-color: white;
  padding: 0 25px;
  flex-basis: 100%;
  width: 100%;
  font-size: inherit;
  font-weight: inherit;
  font-family: ${({ theme }) => theme.fontFamily}

  &::placeholder {
    color: ${({ theme }) => theme.red400}
  }

  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.gray300}
  }
  ::-moz-placeholder {
    color: ${({ theme }) => theme.gray300}
  }
  :-ms-input-placeholder {
    color: ${({ theme }) => theme.gray300}
  }
  :-moz-placeholder {
    color: ${({ theme }) => theme.gray300}
  }
`;

const applyErrorStyles = ({ theme }) => css`
  font-size: ${theme.fontSizeBase};
  font-weight: ${theme.fontWeightRegular};
  color: ${theme.red400};
`;

export const ErrorMessage = styled.div`
  position: absolute;
  bottom: -22px;
  ${applyErrorStyles}
`;
