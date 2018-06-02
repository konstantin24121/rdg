import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import getPluralForm from 'utils/getPluralForm';
import {
  DealsChart, Title, Layout,
  Text, CurrentDate, Badge,
  Table, Button,
} from 'components';
import CrossIcon from 'components/icons/cross.svg';

class Dashboard extends Component {
  handleRemoveDeal = dealId => () => {
    console.log(dealId);
  };

  renderTable() {
    const { data } = this.props;
    return (
      <Table
        cols={[
          {
            title: 'ID',
            key: 'id',
            width: '10%',
          },
          {
            title: 'Date',
            key: 'date',
            width: '30%',
            render: ({ value }) => (format(value, 'MMM d, YYYY HH:mm:ss')),
          },
          {
            title: 'Value',
            key: 'value',
            render: ({ value }) => (value.toFixed(2)),
          },
          {
            key: 'id',
            width: '20px',
            render: ({ value }) => (
              <Button type="link" onClick={this.handleRemoveDeal(value)}>
                <CrossIcon width="14" />
              </Button>
            ),
          },
        ]}
        data={data}
        pageSize={5}
      />
    );
  }

  render() {
    const { data } = this.props;
    const dealsNumber = data.length;
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
          <DealsChart
            chartHeight={400}
            dataKeyX="date"
            dataKeyY="value"
            data={data}
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
              <Badge>
                Total: {dealsNumber} {getPluralForm(dealsNumber, ['deal', 'deals', 'deals'])}
              </Badge>
            </div>
          </Layout.ContainerHeader>
        </Layout.Indent>
        <Layout.Indent>
          {this.renderTable()}
        </Layout.Indent>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  data: PropTypes.array,
};

Dashboard.defaultProps = {
  data: [
    {
      id: 20,
      date: Date.now() - 100,
      value: 15,
    },
    {
      id: 18,
      date: Date.now() - 600,
      value: 5,
    },
    {
      id: 17,
      date: Date.now() - 9500,
      value: 33,
    },
    {
      id: 16,
      date: Date.now() - 10000,
      value: 45,
    },
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
      value: 30,
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
  ],
};

export default Dashboard;
