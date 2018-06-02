import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { Chart } from 'components';
import { Root } from './DealsChartStyled';


class DealsChart extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      isMounted: false,
      xAxisCount: 0,
      yAxisCount: 5,
      interval: 0,
    };
    this.rootRef = React.createRef();
    this.throttledHandleResize = throttle(this.createHandleResize(), 200);
  }

  getSortedData = () => {
    const { data } = this.props;
    return data.sort((a, b) => b.date - a.date);
  }

  getData = () => {
    const { dataKeyX, isDataLoading } = this.props;
    const { xAxisCount, interval, isMounted } = this.state;
    const data = this.getSortedData();
    if (isDataLoading || !isMounted) return [];
    const now = Date.now();
    let lastVisibleIdx = data.findIndex(
      item => item[dataKeyX] < now - (interval * xAxisCount * 1000),
    );
    if (lastVisibleIdx === -1) lastVisibleIdx = data.length - 1;
    return data.slice(0, lastVisibleIdx + 1);
  }

  getXKeys = () => {
    const { xAxisCount, interval } = this.state;
    const now = Date.now();
    const keys = [];
    for (let i = 0; i <= xAxisCount; i += 1) {
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

  getYKeys = ({ data }) => {
    const { dataKeyY, isDataLoading } = this.props;
    const { yAxisCount } = this.state;
    let min;
    let max;
    if (isDataLoading || data.length === 0) {
      min = 0;
      max = yAxisCount;
    } else {
      const dimentions = data.reduce(
        (prev, current) => ({
          min: prev.min > current[dataKeyY] ? current[dataKeyY] : prev.min,
          max: prev.max < current[dataKeyY] ? current[dataKeyY] : prev.max,
        }),
        { min: data[0][dataKeyY], max: data[0][dataKeyY] },
      );
      min = dimentions.min; // eslint-disable-line
      max = dimentions.max; // eslint-disable-line
      if (min === max) max = min + yAxisCount;
      const interval = (max - min) / yAxisCount;
      max += interval / 2;
      min -= interval / 2;
      if (min < 0) min = 0;
    }
    const realInterval = (max - min) / yAxisCount;
    const keys = [];
    for (let i = 0; i <= yAxisCount; i += 1) {
      const value = min + (realInterval * i);
      keys.unshift({
        value,
        label: value.toFixed(2),
      });
    }
    return keys;
  }

  componentWillMount() {
    window.addEventListener('resize', this.throttledHandleResize);
  }

  componentDidMount() {
    this.throttledHandleResize();
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      isMounted: true,
    });
    this.timer = setInterval(this.forceUpdate.bind(this), 60 * 1000);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledHandleResize);
    this.throttledHandleResize.cancel();
    clearInterval(this.timer);
  }

  createHandleResize = () => {
    let prevWidth = 0;
    return () => {
      const chartWidth = this.rootRef.current.clientWidth;
      if (chartWidth === prevWidth) return;
      prevWidth = chartWidth;
      let nextState = {
        xAxisCount: 2,
        interval: 300,
      };
      if (chartWidth > 300) {
        nextState = {
          xAxisCount: 2,
          interval: 150,
        };
      }
      if (chartWidth > 400) {
        nextState = {
          xAxisCount: 5,
          interval: 120,
        };
      }
      if (chartWidth > 650) {
        nextState = {
          xAxisCount: 10,
          interval: 60,
        };
      }
      this.setState(nextState);
    }
  }

  render() {
    const { isDataLoading } = this.props;
    const { isMounted } = this.state;
    const filteredData = this.getData();
    return (
      <Root innerRef={this.rootRef}>
        {isMounted && (
          <Chart
            {...this.props}
            xKeys={this.getXKeys()}
            yKeys={this.getYKeys({ data: filteredData })}
            data={filteredData}
            isLoading={isDataLoading}
          />
        )}
      </Root>
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
