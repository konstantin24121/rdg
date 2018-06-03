import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getPluralForm from 'utils/getPluralForm';
import Socket from 'utils/socket';
import {
  ACTIONS as dealsActions,
  SELECTORS as dealSelectors,
} from 'redux/modules/deals';
import {
  DealsChart, Title, Layout,
  Text, CurrentDate, Badge,
  DealsTable,
} from 'components';

class Dashboard extends Component {
  /**
   * Return sorted desc deals list by date
   * @return {Array}
   */
  getSortedData = () => {
    const { deals } = this.props;
    return deals.sort(
      (a, b) => b.date.getTime() - a.date.getTime());
  }

  componentWillMount() {
    Socket.onNewDeal(this.props.newDealBroadcast, { broadcast: true });
    Socket.onRemoveDeal(this.props.removeDealBroadcast, { broadcast: true });
    this.props.getDealsList();
  }

  handleRemoveDeal = (id) => {
    this.props.removeDeal({ id });
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
              data={this.getSortedData()}
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
          <DealsTable
            data={this.getSortedData()}
            isDataLoading={isLoading || !isLoaded}
            onRemove={this.handleRemoveDeal}
          />
        </Layout.Indent>
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  // ReduxActions
  getDealsList: PropTypes.func.isRequired,
  removeDeal: PropTypes.func.isRequired,
  newDealBroadcast: PropTypes.func.isRequired,
  removeDealBroadcast: PropTypes.func.isRequired,
  // Store state
  deals: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  deals: dealSelectors.getDeals(state),
  isLoading: state.deals.isLoading,
  isLoaded: state.deals.isLoaded,
});

const actions = {
  getDealsList: dealsActions.getList,
  removeDeal: dealsActions.removeDeal,
  newDealBroadcast: dealsActions.newDeal,
  removeDealBroadcast: dealsActions.removeDealSuccess,
};

export default connect(mapStateToProps, actions)(Dashboard);
