import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import getPluralForm from 'utils/getPluralForm';
import {
  ACTIONS as dealsActions,
  SELECTORS as dealSelectors,
} from 'redux/modules/deals';
import {
  DealsChart, Title, Layout,
  Text, CurrentDate, Badge,
  Table, Button,
} from 'components';

import CrossIcon from 'components/icons/cross.svg';
import LoaderIcon from 'components/icons/loader.svg';

class Dashboard extends Component {
  componentWillMount() {
    this.props.getDealsList();
  }

  handleRemoveDeal = id => () => {
    this.props.removeDeal({ id });
  }

  renderTable() {
    const { deals, isLoading, isLoaded } = this.props;
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
            render: ({ value, item }) => (
              <Button type="link" onClick={this.handleRemoveDeal(value)} disabled={item.isRemoving}>
                {item.isRemoving && <LoaderIcon width="14" />}
                {!item.isRemoving && <CrossIcon width="14" />}
              </Button>
            ),
          },
        ]}
        isLoading={isLoading || !isLoaded}
        data={deals}
        pageSize={5}
      />
    );
  }

  render() {
    const { deals, isLoading, isLoaded } = this.props;
    const dealsNumber = deals.length;
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
          <Layout.ScrolableContainer>
            <DealsChart
              chartHeight={400}
              dataKeyX="date"
              dataKeyY="value"
              data={deals}
              isDataLoading={isLoading || !isLoaded}
            />
          </Layout.ScrolableContainer>
        </Layout.Indent>
        <Layout.Indent>
          <Layout.ContainerHeader>
            <div>
              <Title thin>
                Deals Info
              </Title>
            </div>
            <div>
              {isLoaded && (
                <Badge>
                  Total: {dealsNumber} {getPluralForm(dealsNumber, ['deal', 'deals', 'deals'])}
                </Badge>
              )}
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
  deals: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  getDealsList: PropTypes.func.isRequired,
  removeDeal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  deals: dealSelectors.getDeals(state),
  isLoading: state.deals.isLoading,
  isLoaded: state.deals.isLoaded,
});

const actions = {
  getDealsList: dealsActions.getList,
  removeDeal: dealsActions.removeDeal,
};

export default connect(mapStateToProps, actions)(Dashboard);
