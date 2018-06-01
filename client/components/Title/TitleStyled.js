import styled, { css } from 'styled-components';

const applyTitleStyles = ({ thin, inline }) => css`
  font-weight: ${thin ? 300 : 400};
  display: ${inline ? 'inline-block' : 'block'};
`;

const title = styled.div`
  line-height: 1.666;
  margin-bottom: 0;
  ${applyTitleStyles}
`;

export const H1 = title.withComponent('h1').extend`
  font-size: 24px;
`;

export const H2 = title.withComponent('h2').extend`
  font-size: 22px;
`;

export const H3 = title.withComponent('h3').extend`
  font-size: 20px;
`;

export const H4 = title.withComponent('h3').extend`
  font-size: 18px;
`;

export const H5 = title.withComponent('h3').extend`
  font-size: 16px;
`;

export const H6 = title.withComponent('h3').extend`
  font-size: 14px;
`;

export const Titles = {
  1: H1,
  2: H2,
  3: H3,
  4: H4,
  5: H5,
  6: H6,
};
