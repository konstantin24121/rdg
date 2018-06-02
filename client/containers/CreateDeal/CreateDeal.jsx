import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CreateNewDealForm from 'containers/forms/CreateNewDeal'
import {
  Title, Layout, Text,
  CurrentDate, Button, Alert,
  Route,
} from 'components';

import Loader from 'components/icons/Loader';

import { ConfirmedValue, FadeIn } from './CreateDealStyled';

class CreateDeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSuccess: false,
      confirmedValue: null,
    };
  }

  handleCreate = ({ value }) => {
    this.setState({
      confirmedValue: parseFloat(value, 10),
      isLoading: true,
    }, () => {
      setTimeout(() => {
        this.setState({
          isSuccess: true,
          isLoading: false,
        });
      }, 2000);
    });
  }

  renderFeedbackBoard = () => {
    const { confirmedValue, isSuccess } = this.state;
    return (
      <Fragment>
        <Layout.Indent>
          <Alert type="success">
            <ConfirmedValue>
              <div><Loader width="90px" isSuccess={isSuccess} /></div>
              <div>USD {confirmedValue.toFixed(2)}</div>
            </ConfirmedValue>
          </Alert>
        </Layout.Indent>
        <Layout.Indent>
          <Layout.Align justify="center">
            <FadeIn isShow={isSuccess}>
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
    const { isLoading, isSuccess } = this.state;
    return (
      <Fragment>
        <Layout.Indent>
          <Layout.ContainerHeader>
            <div>
              <Title thin>
                {!isLoading && !isSuccess && 'New Deal'}
                {isLoading && 'Wait, we create your deal..'}
                {isSuccess && 'Your deal confirmed!'}
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
          {!isLoading && !isSuccess && <CreateNewDealForm onSubmit={this.handleCreate} />}
          {(isLoading || isSuccess) && this.renderFeedbackBoard()}
        </Layout.Indent>
      </Fragment>
    );
  }
}

export default CreateDeal;
