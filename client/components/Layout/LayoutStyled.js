import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const applySectionStyles = ({ theme, color, isGrow }) => css`
  background: ${color};
  flex: ${isGrow ? 1 : 0} 0 auto;
  & > * {
    max-width: ${theme.container};
  }
`;

export const Section = styled.div`
  ${applySectionStyles}
  & > * {
    margin: 0 auto;
  }
`;

Section.defaultProps = {
  color: 'transparent',
  isGrow: false,
};

export const Header = styled.div`
  padding: 55px ${({ theme }) => theme.offset};
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
  padding: ${({ theme }) => theme.offset};
  padding-bottom: 0;
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

const applyIndentSize = ({ size, theme }) => {
  switch (size) {
    case 'small': return css`margin-bottom: ${theme.offsetSmall}`;
    case 'medium': return css`margin-bottom: ${theme.offsetMedium}`;
    default: return css`margin-bottom: ${theme.offset};`;
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
  padding: ${({ theme }) => theme.offset};
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
