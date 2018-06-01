import React, { Component, Fragment } from 'react';
import { Chart, Title, Layout, Text, CurrentDate, Badge } from 'components';

class Dashboard extends Component {
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

  render() {
    return (
      <Fragment>
        <Layout.Indent>
          <Layout.ContainerHeader>
            <div>
              <Title thin>
                Current Deals
              </Title>
            </div>
            <div>
              <Text>
                <CurrentDate />
              </Text>
            </div>
          </Layout.ContainerHeader>
        </Layout.Indent>
        <Layout.Indent>
          <Chart
            chartHeight={400}
            xKeys={this.getXKeys({ interval: 60, count: 10 })}
            yKeys={this.getYKeys({ min: 10, max: 28, count: 5 })}
            dataKeyX="date"
            dataKeyY="value"
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
                date: Date.now() - 560000,
                value: 10,
              },
              {
                id: 10,
                date: Date.now() - 640000,
                value: 22,
              },
            ]}
          />
        </Layout.Indent>
        <Layout.Indent>
          <Layout.ContainerHeader>
            <div>
              <Title thin>
                Deals Info
              </Title>
            </div>
            <div>
              <Badge>Total: 5 deals</Badge>
            </div>
          </Layout.ContainerHeader>
        </Layout.Indent>
      </Fragment>
    );
  }
}

export default Dashboard;
