import styled, { css } from 'styled-components';

export const Root = styled.div`
  position: relative;
`;

export const Tbl = styled.table.attrs({
  cellPadding: 20,
  cellSpacing: 0,
})`
  width: 100%;
`;

const applyTdStyles = ({ theme }) => css`
  &:first-child {
    padding-left: ${theme.offsetMedium};
  }
  &:last-child {
    padding-right: ${theme.offsetMedium};
  }
`;

export const Td = styled.td`
  vertical-align: middle;
  line-height: 40px;
  height: 40px;
  ${applyTdStyles}
`;

export const Th = Td.withComponent('th').extend`
  text-align: left;
`;

const applyRowStyles = ({ theme }) => css`
  &:nth-child(even) {
    background-color: ${theme.gray200};
  }

  &:nth-child(odd) {
    background-color: ${theme.gray150};
  }
`;

export const Row = styled.tr`
  line-height: 40px;
  ${applyRowStyles}
  &:first-child {
    background-color: transparent;
  }
`;

export const Pagination = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.offsetSmall};
  justify-content: flex-end;
  & > * {
    margin-right: 4px;
  }
`;

export const LoaderBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  background-color: ${({ theme }) => theme.gray150};
`;
