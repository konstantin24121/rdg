import * as React from 'react';
// import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { Chart } from 'components';
import { Root } from './DealsChartStyled';
import { INTERFACES as dealsInterfaces } from 'redux/modules/deals';

interface Props {
  data: dealsInterfaces.Deal[],
  isDataLoading: boolean,
};

interface State {
  isMounted: boolean,
  xAxisCount: number,
  yAxisCount: number,
  interval: number,
}

interface minMaxObject {
  min: number,
  max: number,
}

class DealsChart extends React.Component<Props, State> {
  static defaultProps: {
    isDataLoading: false,
  };

  private rootRef: React.RefObject<HTMLInputElement>;
  private timer?: number;
  private throttledHandleResize: () => void;

  constructor(props: Props) {
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
    return data.sort((a: dealsInterfaces.Deal, b: dealsInterfaces.Deal) => b.date.getTime() - a.date.getTime());
  }

  getData = () => {
    const { isDataLoading } = this.props;
    const { xAxisCount, interval, isMounted } = this.state;
    const data = this.getSortedData();
    if (isDataLoading || !isMounted) return [];
    const now = Date.now();
    let lastVisibleIdx = data.findIndex(
      (item: dealsInterfaces.Deal) => item.date.getTime() < now - (interval * xAxisCount * 1000),
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

  getYKeys = ({ data }: { data: dealsInterfaces.Deal[] }): { value: number, label: string }[] => {
    const { isDataLoading } = this.props;
    const { yAxisCount } = this.state;
    let min;
    let max;
    if (isDataLoading || data.length === 0) {
      min = 0;
      max = yAxisCount;
    } else {

      const dimentions = data.reduce(
        (prev: minMaxObject, current: dealsInterfaces.Deal) => ({
          min: prev.min > current.value ? current.value : prev.min,
          max: prev.max < current.value ? current.value : prev.max,
        }),
        { min: data[0].value, max: data[0].value },
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
    this.timer = setInterval(this.forceUpdate.bind(this), 10 * 1000);
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
    };
  }

  render() {
    const { isDataLoading } = this.props;
    const { isMounted } = this.state;
    const filteredData = this.getData();
    return (
      <Root innerRef={this.rootRef}>
        {isMounted && (
          <Chart
            chartHeight={400}
            dataKeyX="date"
            dataKeyY="value"
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

export default DealsChart;
