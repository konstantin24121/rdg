import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Section = styled.div`
  background: ${({ color }) => color};
  flex: ${({ isGrow }) => { return isGrow ? 1 : 0; }} 0 auto;
  & > * {
    max-width: 800px;
    margin: 0 auto;
  }
`;

Section.defaultProps = {
  color: 'transparent',
  isGrow: false,
};

export const Header = styled.div`
  padding: 55px 40px;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-around;
  align-items: center;

  & > *:nth-child(1) {
    flex-basis: 100%;
  }
  & > *:nth-child(2) {
    flex-shrink: 0;
    flex-basis: 190px;
  }
`;

export const Container = styled.div`
  padding: 40px 40px 0 40px;
  flex: 1 0 auto;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > *:nth-child(1) {
    flex-basis: 100%;
  }
  & > *:nth-child(2) {
    flex-shrink: 0;
  }
`;

export const Indent = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

export const Footer = styled.div`
  padding: 40px;
  color: #494949;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-around;

  & > *:nth-child(1) {
    flex-basis: 100%;
  }
  & > *:nth-child(2) {
    flex-shrink: 0;
  }
`;
