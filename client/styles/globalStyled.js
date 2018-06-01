import { injectGlobal } from 'styled-components';

export const applyGlobalStyles = () => injectGlobal`
  body {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    background: #f3f3f3;
    font-size: 14px;
    line-height: 1.618;
    font-family: Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
             SimSun, sans-serif;
  }
`;
