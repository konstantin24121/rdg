import React from 'react';
import { Chart } from 'components';

import { applyGlobalStyles } from './styles/globalStyled';

class Root extends React.Component {
  getXKeys = ({ interval, count }) => {
    const now = Date.now();
    const keys = [];
    for (let i = 0; i <= count; i += 1) {
      const value = now - (interval * 1000 * i);
      const timestamp = new Date(value);
      const hours = `0${timestamp.getHours()}`.slice(-2);
      const minutes = `0${timestamp.getMinutes()}`.slice(-2);
      keys.unshift({
        value,
        label: `${hours}:${minutes}`,
      });
    }
    return keys;
  }

  getYKeys = ({ min, max, count }) => {
    const interval = (max - min) / count;
    const realMax = max + (interval / 2);
    const realMin = min - (interval / 2);
    const realInterval = (realMax - realMin) / count;
    const keys = [];
    for (let i = 0; i <= count; i += 1) {
      const value = realMin + (realInterval * i);
      keys.unshift({
        value,
        label: value.toFixed(2),
      });
    }
    return keys;
  }

  componentWillMount() {
    applyGlobalStyles();
  }

  render() {
    return (
      <Chart
        chartHeight={400}
        xKeys={this.getXKeys({ interval: 60, count: 10 })}
        yKeys={this.getYKeys({ min: 10, max: 25, count: 5 })}
        data={[
          {
            id: 15,
            date: Date.now() - 60000,
            value: 25,
          },
          {
            id: 14,
            date: Date.now() - 125000,
            value: 12.5,
          },
          {
            id: 13,
            date: Date.now() - 300000,
            value: 26,
          },
          {
            id: 12,
            date: Date.now() - 568000,
            value: 10,
          },
          {
            id: 10,
            date: Date.now() - 640000,
            value: 22,
          },
        ]}
      />
    );
  }
}

export default Root;
