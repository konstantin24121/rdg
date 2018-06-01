import { injectGlobal } from 'styled-components';

export const applyGlobalStyles = () => injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #app {
    height: 100%;
  }

  body {
    width: 100%;
    margin: 0;
    background: #f3f3f3;
    color: #494949;
    font-size: 14px;
    line-height: 1.618;
    font-family: Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
             SimSun, sans-serif;
  }
`;
