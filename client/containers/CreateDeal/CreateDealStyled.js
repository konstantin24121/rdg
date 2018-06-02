import styled, { css } from 'styled-components';

const applyConfirmValueStyles = ({ theme }) => css`
  font-size: 22px;
  padding: ${theme.offsetMedium} 0;

  @media (min-width: ${theme.screenTiny}) {
    font-size: 52px;
  }

  @media (min-width: ${theme.screenMedium}) {
    font-size: 72px;
    padding: ${theme.offset} 0;
  }
`;

export const ConfirmedValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.offset} 0;
  line-height: 1;
  position: relative;

  & > * {
    position: relative;
  }

  ${applyConfirmValueStyles}
`;

const applyConfirmedIconStyles = ({ theme }) => css`
  width: 30px;
  left: -40px;

  @media (min-width: ${theme.screenTiny}) {
    width: 60px;
    left: -80px;
  }

  @media (min-width: ${theme.screenMedium}) {
    width: 90px;
    left: -120px;
  }
`;

export const ConfirmedIcon = styled.div`
  position: absolute;
  color: ${({ theme }) => theme.green100};
  height: 100%;
  display: flex;
  align-items: center;
  ${applyConfirmedIconStyles}
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
