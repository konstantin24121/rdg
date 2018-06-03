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
    max-width: ${theme.containerSmall};

    @media (min-width: ${theme.screenSmall}) {
      max-width: ${theme.containerMedium};
    }
    @media (min-width: ${theme.screenMedium}) {
      max-width: ${theme.container};
    }
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

const applyHeaderStyles = ({ theme }) => css`
  padding: 35px ${theme.offsetMedium} 25px;
  flex-direction: column;

  & > *:nth-child(1) {
    flex-basis: 100%;
    margin-bottom: ${theme.offsetSmall};
  }
  & > *:nth-child(2) {
    flex-shrink: 0;
    width: 190px;
  }

  @media (min-width: ${theme.screenTiny}) {
    flex-direction: row;

    & > *:nth-child(1) {
      margin-bottom: 0
    }

    & > *:nth-child(2) {
      width: 150px;
    }
  }

  @media (min-width: ${theme.screenSmall}) {
    padding: 55px ${theme.offset};
  }
`;
export const Header = styled.div`
  padding: 55px ${({ theme }) => theme.offset};
  display: flex;
  flex: 0 0 auto;
  justify-content: space-around;
  align-items: center;
  ${applyHeaderStyles}
`;

const applyContainerStyles = ({ theme }) => css`
  padding: ${theme.offsetMedium};
  padding-bottom: 0;

  @media (min-width: ${theme.screenSmall}) {
    padding: ${theme.offset};
    padding-bottom: 0;
  }
`;
export const Container = styled.div`
  flex: 1 0 auto;
  width: 100%;
  ${applyContainerStyles};
`;

const applyContainerHeaderStyles = ({ theme }) => css`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: ${theme.screenTiny}) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;
export const ContainerHeader = styled.div`
  display: flex;

  align-items: center;
  width: 100%;

  & > *:nth-child(1) {
    flex-basis: 100%;
  }
  & > *:nth-child(2) {
    flex-shrink: 0;
  }
  ${applyContainerHeaderStyles}
`;

const applyIndentSize = ({ size, theme }) => {
  switch (size) {
    case 'small': {
      return css`
        margin-bottom: ${theme.offsetSmall};

      `;
    }
    case 'medium': {
      return css`
        margin-bottom: ${theme.offsetSmall};
        @media (min-width: ${theme.screenSmall}) {
          margin-bottom: ${theme.offsetMedium};
        }
      `;
    }
    default: {
      return css`
        margin-bottom: ${theme.offsetMedium};
        @media (min-width: ${theme.screenSmall}) {
          margin-bottom: ${theme.offset};
        }
      `;
    }
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

export const ScrolableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  & > * {
    min-width: 500px;
  }
`;

const applyFooterStyles = ({ theme }) => css`
  padding: ${theme.offsetMedium};
  flex-direction: column;
  align-items: center;

  & > *:nth-child(1) {
    margin-bottom: ${theme.offsetSmall};
  }

  @media (min-width: ${theme.screenTiny}) {
    flex-direction: row;

    & > *:nth-child(1) {
      margin-bottom: 0
    }
  }

  @media (min-width: ${theme.screenSmall}) {
    padding: ${theme.offset};
  }
`;
export const Footer = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: space-around;

  & > *:nth-child(1) {
    flex-basis: 100%;
  }
  & > *:nth-child(2) {
    flex-shrink: 0;
  }
  ${applyFooterStyles}
`;
