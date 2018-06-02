import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'components';

const INTERVAL = 60;
const XAcisCount = 5;
const YAcisCount = 5;

class DealsChart extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  getSortedData = () => {
    const { data } = this.props;
    return data.sort((a, b) => b.date - a.date);
  }

  getData = () => {
    const { dataKeyX, isDataLoading } = this.props;
    const data = this.getSortedData();
    if (isDataLoading) return [];
    const now = Date.now();
    let lastVisibleIdx = data.findIndex(
      item => item[dataKeyX] < now - (INTERVAL * XAcisCount * 1000),
    );
    if (lastVisibleIdx === -1) lastVisibleIdx = data.length - 1;
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
    const { dataKeyY, isDataLoading } = this.props;
    let min;
    let max;
    if (isDataLoading || data.length === 0) {
      min = 0;
      max = YAcisCount;
    } else {
      const dimentions = data.reduce(
        (prev, current) => ({
          min: prev.min > current[dataKeyY] ? current[dataKeyY] : prev.min,
          max: prev.max < current[dataKeyY] ? current[dataKeyY] : prev.max,
        }),
        { min: data[0][dataKeyY], max: data[0][dataKeyY] },
      );
      min = dimentions.min;
      max = dimentions.max;
      if (min === max) max = min + YAcisCount;
      const interval = (max - min) / YAcisCount;
      max += interval / 2;
      min -= interval / 2;
      if (min < 0) min = 0;
    }
    const realInterval = (max - min) / YAcisCount;
    const keys = [];
    for (let i = 0; i <= YAcisCount; i += 1) {
      const value = min + (realInterval * i);
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
    const { isDataLoading } = this.props;
    const filteredData = this.getData();
    return (
      <Chart
        {...this.props}
        xKeys={this.getXKeys()}
        yKeys={this.getYKeys({ data: filteredData })}
        data={filteredData}
        isLoading={isDataLoading}
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
  isDataLoading: PropTypes.bool,
};

DealsChart.defaultProps = {
  isDataLoading: false,
};

export default DealsChart;
