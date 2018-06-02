import { injectGlobal } from 'styled-components';

export const theme = {
  gray100: '#f3f3f3',
  gray150: '#f5f9fd',
  gray200: '#e7f1fa',
  gray300: '#d4d4d4',
  gray400: '#afafaf',
  gray500: '#6f6f6f',
  gray800: '#494949',
  green100: '#00d0a2',
  blue100: '#c5e3fd',
  blue400: '#7ebaff',
  blue500: '#4a90e2',
  blue800: '#0f3868',
  red400: '#d0021b',

  screenTiny: '500px',
  screenSmall: '768px',
  screenMedium: '992px',

  containerSmall: '100%',
  containerMedium: '700px',
  container: '800px',

  offsetSmall: '10px',
  offsetMedium: '20px',
  offset: '40px',

  borderRadius: '3px',

  fontWeightThin: '300',
  fontWeightRegular: '400',
  fontWeightBold: '700',

  fontSizeSmall: '12px',
  fontSizeBase: '14px',
  fontSizeBig: '16px',
  fontSizeLarge: '18px',
  fontFamily: `Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
           "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
           SimSun, sans-serif`,

  chartOffset: 4,
  chartYAxisOffset: 6,
  chartXAxisOffset: 4,
};

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
    background: ${theme.gray100};
    color: ${theme.gray800};
    font-size: ${theme.fontSizeBase};
    line-height: 1.618;
    font-family: ${theme.fontFamily};
  }

  a {
    text-decoration: none;
  }
`;
