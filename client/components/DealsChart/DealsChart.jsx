import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'components';

const INTERVAL = 60;
const XAcisCount = 10;
const YAcisCount = 5;

class DealsChart extends PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  getData = () => {
    const { data, dataKeyX } = this.props;
    const now = Date.now();
    const lastVisibleIdx = data.findIndex(
      item => item[dataKeyX] < now - (INTERVAL * XAcisCount * 1000),
    );
    return data.slice(0, lastVisibleIdx + 1);
  }

  getXKeys = () => {
    const now = Date.now();
    const keys = [];
    for (let i = 0; i <= XAcisCount; i += 1) {
      const value = now - (INTERVAL * 1000 * i);
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

  getYKeys = ({ data }) => {
    const { dataKeyY } = this.props;
    const { min, max } = data.reduce(
      (prev, current) => ({
        min: prev.min > current[dataKeyY] ? current[dataKeyY] : prev.min,
        max: prev.max < current[dataKeyY] ? current[dataKeyY] : prev.max,
      }),
      { min: data[0][dataKeyY], max: data[0][dataKeyY] },
    );
    const interval = (max - min) / YAcisCount;
    const realMax = max + (interval / 2);
    const realMin = min - (interval / 2);
    const realInterval = (realMax - realMin) / YAcisCount;
    const keys = [];
    for (let i = 0; i <= YAcisCount; i += 1) {
      const value = realMin + (realInterval * i);
      keys.unshift({
        value,
        label: value.toFixed(2),
      });
    }
    return keys;
  }

  componentDidMount() {
    this.timer = setInterval(this.forceUpdate.bind(this), INTERVAL * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const filteredData = this.getData();
    return (
      <Chart
        {...this.props}
        xKeys={this.getXKeys()}
        yKeys={this.getYKeys({ data: filteredData })}
        data={filteredData}
      />
    );
  }
}

DealsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
  dataKeyX: PropTypes.string.isRequired,
  dataKeyY: PropTypes.string.isRequired,
};

export default DealsChart;
