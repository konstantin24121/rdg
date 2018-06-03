import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ACTIONS as dealsActions, SELECTORS as dealSelectors } from 'redux/modules/deals';
import CreateDealForm from 'containers/forms/CreateDealForm';
import {
  Title, Layout, Text,
  CurrentDate, Button, Alert,
  Route, Loader,
} from 'components';

import { ConfirmedValue, FadeIn, ConfirmedIcon } from './CreateDealStyled';

class CreateDeal extends Component {
  getTitle = () => {
    const { newDeal } = this.props;
    const { isSaving, isSaved } = newDeal;
    if (!isSaving && !isSaved) return 'New Deal';
    if (isSaving) return 'Wait, we create your deal..';
    if (isSaved) return 'Your deal confirmed!';
    return 'Your deal not confirmed :(';
  }

  componentWillUnmount() {
    // Clear new deal which we created
    this.props.clearNewDeal();
  }

  handleCreate = ({ value, date }) => {
    this.props.createDeal({ value, date });
  }

  renderFeedbackBoard = () => {
    const { newDeal } = this.props;
    const { isSaved, value } = newDeal;
    return (
      <Fragment>
        <Layout.Indent>
          <Alert type="success">
            <ConfirmedValue>
              <div>
                <ConfirmedIcon>
                  <Loader width="100%" isSuccess={isSaved} />
                </ConfirmedIcon>
                USD {value.toFixed(2)}
              </div>
            </ConfirmedValue>
          </Alert>
        </Layout.Indent>
        <Layout.Indent>
          <Layout.Align justify="center">
            <FadeIn isShow={isSaved}>
              <Route.Link to="/">
                <Button type="primary" width="180px">OK</Button>
              </Route.Link>
            </FadeIn>
          </Layout.Align>
        </Layout.Indent>
      </Fragment>
    );
  }

  render() {
    const { newDeal } = this.props;
    const { isSaving, isSaved } = newDeal;
    return (
      <Fragment>
        <Layout.Indent>
          <Layout.ContainerHeader>
            <div>
              <Title thin>
                {this.getTitle()}
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
          {!isSaving && !isSaved && <CreateDealForm onSubmit={this.handleCreate} />}
          {(isSaving || isSaved) && this.renderFeedbackBoard()}
        </Layout.Indent>
      </Fragment>
    );
  }
}

CreateDeal.propTypes = {
  // ReduxActions
  createDeal: PropTypes.func.isRequired,
  clearNewDeal: PropTypes.func.isRequired,
  // Store state
  newDeal: PropTypes.object,
};

const actions = {
  createDeal: dealsActions.createDeal,
  clearNewDeal: dealsActions.clearNewDeal,
};

const mapStateToProps = state => ({
  newDeal: dealSelectors.getNewDeal(state),
});

export default connect(mapStateToProps, actions)(CreateDeal);
