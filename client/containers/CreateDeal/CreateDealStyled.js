import styled, { css } from 'styled-components';

export const ConfirmedValue = styled.div`
  font-size: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.offset} 0;
  line-height: 1;
  position: relative;

  & > * {
    position: relative;
  }
`;

export const ConfirmedIcon = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.green100};
  left: -120px;
  height: 100%;
  display: flex;
  align-items: center;
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
