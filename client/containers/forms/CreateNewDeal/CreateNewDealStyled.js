import styled, { css } from 'styled-components';

const applyRootStyles = ({ theme }) => css`
  background-color: ${theme.gray200};
  padding: ${theme.offset};
`;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  ${applyRootStyles}
`;

export const BtnBox = styled.div`
  width: 190px;
`;
