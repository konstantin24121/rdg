import styled from 'styled-components';

export const Btn = styled.button`
  margin: 0;
  width: 186px;
  border: none;
  padding: 8px 9px;
  border-radius: 3px;
  background-color: ${({ isPrimary }) => { return isPrimary ? '#4a90e2' : '#676767' ; }};
  color: white;
  font: inherit;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.33;
  transition: opacity 200ms ease-in-out;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  &:active {
    opacity: 1;
  }
`;
