import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  align-items: stretch;
  height: 40px;
  font-size: 18px;
  font-weight: 700;
  position: relative;
`;

export const Addon = styled.div`
  background-color: #c5e3fd;
  padding: 0 25px;
  display: flex;
  align-items: center;
`;

export const InputField = styled.input`
  border: none;
  border-radius: 0;
  background-color: white;
  padding: 0 25px;
  flex-basis: 100%;
  font-size: inherit;
  font-weight: inherit;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  bottom: -22px;
  font-size: 14px;
  font-weight: 400;
  color: #d0021b;
`;
