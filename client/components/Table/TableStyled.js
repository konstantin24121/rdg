import styled from 'styled-components';

export const Root = styled.table.attrs({
  cellPadding: 20,
  cellSpacing: 0,
})`
  width: 100%;
`;

export const Td = styled.td`
  vertical-align: center;
  &:first-child {
    padding-left: 20px;
  }
  &:last-child {
    padding-right: 20px;
  }
`;

export const Th = Td.withComponent('th').extend`
  text-align: left;
  line-height: 40px;
`;

export const Row = styled.tr`
  line-height: 40px;

  &:nth-child(even) {
    background-color: #e7f1fa;
  }

  &:nth-child(odd) {
    background-color: #f5f9fd;
  }

  &:first-child {
    background-color: transparent;
  }
`;
export const Pagination = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  & > * {
    margin-right: 4px;
  }
`;
