import styled, { css } from 'styled-components';

export const ConfirmedValue = styled.div`
  font-size: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  line-height: 1;

  & > *:nth-child(1) {
    display: flex;
    align-items: center;
    margin-right: 20px;
    color: #00d0a2;
  }

  & > *:nth-child(2) {
    display: flex;
    align-items: center;
    margin-right: 110px;
  }
`;

const applyFadeInStyles = ({ isShow }) => css`
  opacity: ${isShow ? 1 : 0};
  transform: translateY(${isShow ? 0 : 50}px);
  pointer-events: ${isShow ? 'all' : 'none'};
`;

export const FadeIn = styled.div`
  transition-property: transform, opacity;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;
  ${applyFadeInStyles}
`;
