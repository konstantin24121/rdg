import styled from 'styled-components';

export const Root = styled.div`
  padding-left: 40px;
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
    background-color: ${({ isSecondary }) => { return isSecondary ? '#d4d4d4' : '#4a90e2'; }};
  }

  > svg path{
    fill: ${({ isSecondary }) => { return isSecondary ? '#afafaf' : '#494949'; }};
  };
`;
