import * as React from 'react';
import { throttle } from 'lodash';
import { Chart } from 'components';
import { format } from 'date-fns';
import { Root } from './DealsChartStyled';
import { INTERFACES as dealsInterfaces } from 'redux/modules/deals';
import { IChartAxisLabel } from 'components/Chart';

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

  /**
   * Return only visible deals plus one out of view
   */
  getData = (): dealsInterfaces.Deal[] => {
    const { isDataLoading, data } = this.props;
    const { xAxisCount, interval, isMounted } = this.state;
    if (isDataLoading || !isMounted) return [];
    const now = Date.now();
    let lastVisibleIdx = data.findIndex(
      (item: dealsInterfaces.Deal) => item.date.getTime() < now - (interval * xAxisCount * 1000),
    );
    if (lastVisibleIdx === -1) lastVisibleIdx = data.length - 1;
    return data.slice(0, lastVisibleIdx + 1);
  }

  /**
   * Return xKeys
   */
  getXKeys = (): IChartAxisLabel[] => {
    const { xAxisCount, interval } = this.state;
    const seconds = new Date().getSeconds();
    const firstValues = Date.now();
    const secondValues = Date.now() - (seconds * 1000);
    const keys: IChartAxisLabel[] = [{
      value: firstValues,
      label: '',
    }];

    keys.push({
      value: secondValues,
      label: format(secondValues, 'HH:mm'),
    });

    for (let i = 2; i <= xAxisCount + 1 ; i += 1) {
      const value = keys[i - 1].value - (interval * 1000);
      const timestamp = new Date(value);

      keys.push({
        value,
        label: format(timestamp, 'HH:mm'),
      });
    }

    keys.push({
      value: keys[keys.length - 1].value - (interval - seconds * 1000),
      label: '',
    });

    keys.reverse();
    return keys;
  }

  /**
   * Return yKeys
   */
  getYKeys = ({ data }: { data: dealsInterfaces.Deal[] }): IChartAxisLabel[] => {
    const { isDataLoading } = this.props;
    const { yAxisCount } = this.state;
    let min;
    let max;
    if (isDataLoading || data.length === 0) {
      min = 0;
      max = yAxisCount;
    } else {
      // Find min and max value based on visible deals
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
      if (min < 0) min = 0; // Min can't be lower than zero
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

  /**
   * Create function which change xAxisParams after resize
   */
  createHandleResize = (): () => void => {
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
