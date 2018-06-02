import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

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
  width: 100%;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  & > *:nth-child(1) {
    flex-basis: 100%;
  }
  & > *:nth-child(2) {
    flex-shrink: 0;
  }
`;

const applyIndentSize = ({ size }) => {
  switch (size) {
    case 'small': return css`margin-bottom: 10px`;
    case 'medium': return css`margin-bottom: 20px`;
    default: return css`margin-bottom: 40px;`;
  }
};

export const Indent = styled.div`
  width: 100%;
  ${applyIndentSize};
`;

Indent.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'big']),
};

Indent.defaultProps = {
  size: 'big',
};

const applyAlignStyle = ({ justify, align }) => css`
  align-items: ${align};
  justify-content: ${justify};
`;

export const Align = styled.div`
  width: 100%;
  display: flex;
  ${applyAlignStyle};
`;

Align.propTypes = {
  justify: PropTypes.string,
  align: PropTypes.string,
};

Align.defaultProps = {
  justify: 'space-between',
  align: 'flex-start',
};

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
