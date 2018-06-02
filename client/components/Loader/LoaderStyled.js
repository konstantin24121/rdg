import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
   transform: rotate(0deg);
  }

  to {
   transform: rotate(360deg);
  }
`;

const applyLoaderCircleStyled = ({ isSuccess }) => css`
  animation-play-state: ${isSuccess ? 'paused' : 'running'};
  stroke-dasharray: ${!isSuccess ? 200 : 280};
`;

export const Circle = styled.circle.attrs({
  cx: 50,
  cy: 50,
  r: 44,
})`
  fill: none;
  stroke: currentColor;
  stroke-width: 8;
  stroke-dasharray: 200;
  animation-delay: 0;
  transform-origin: center center;
  transition: stroke-dasharray 500ms linear;
  animation: ${rotate} 1.7s linear infinite;
  ${applyLoaderCircleStyled}
`;

const applyCheckStyled = ({ isSuccess }) => css`
  stroke-dashoffset: ${isSuccess ? 0 : 100};
`;

export const Check = styled.polyline`
  fill: none;
  stroke: currentColor;
  stroke-width: 8;
  stroke-dasharray: 100 100;
  transition: stroke-dashoffset 500ms linear;
  ${applyCheckStyled}
`;
