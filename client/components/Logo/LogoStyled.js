import styled, { css } from 'styled-components';

const applyRootStyles = ({ theme, isSecondary }) => css`
  padding-left: ${theme.offset};
  &::before {
    background-color: ${isSecondary ? theme.gray300 : theme.blue500};
  }
  > svg path{
    fill: ${isSecondary ? theme.gray400 : theme.gray800};
  };
`;

export const Root = styled.div`
  position: relative;
  width: 270px;
  line-height: 1;

  &::before {
    content: '';
    display: block;
    position: absolute;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    left: 0;
  }

  ${applyRootStyles}
`;
