import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  height: ${({ height }) => height}px;
  position: relative;
  `;

export const Canvas = styled.canvas`
  flex-basis: 100%;
`;

export const TestLabel = styled.div`
  position: absolute;
  visibility: hidden;
  height: auto;
  width: auto;
  white-space: nowrap;
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
  background-color: ${({ theme }) => theme.gray150};
`;
