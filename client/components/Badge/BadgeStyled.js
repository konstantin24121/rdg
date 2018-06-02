import styled, { css } from 'styled-components';

const applyBadgeStyled = ({ theme }) => css`
  border-radius: ${theme.borderRadius};
  background-color: ${theme.blue400};
`;

const Badge = styled.div`
  color: white;
  padding: 1px 12px;
  ${applyBadgeStyled}
`;

export default Badge;
