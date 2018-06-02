import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CreateDeal, Dashboard } from 'containers';
import { connect } from 'react-redux';
import { Layout, Logo, Button, Text, Route } from 'components';
import { ThemeProvider } from 'styled-components';
import socket from 'utils/socket';
import { ACTIONS as userActions } from 'redux/modules/user';
import { applyGlobalStyles, theme } from './globalStyled';

class Root extends Component {
  componentWillMount() {
    applyGlobalStyles();
    socket.connect();
    socket.io.on('websocetId', this.props.saveWebSocketId);
    socket.io.on('disconnect', this.props.clearWebSocketId);
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout.Root>
          <Layout.Section>
            <Layout.Header key="header">
              <div>
                <Logo />
              </div>
              <div>
                <Route
                  path="/"
                  render={() => (
                    <Route.Link to="#new_deal">
                      <Button type="primary" isFlex>New Deal</Button>
                    </Route.Link>
                  )}
                />
                <Route
                  path="new_deal"
                  render={() => (
                    <Route.Link to="/">
                      <Button isFlex>Back</Button>
                    </Route.Link>
                  )}
                />
              </div>
            </Layout.Header>
          </Layout.Section>
          <Layout.Section color="white" isGrow>
            <Layout.Container key="container">
              <Route
                path="/"
                component={Dashboard}
              />
              <Route
                path="new_deal"
                component={CreateDeal}
              />
            </Layout.Container>
          </Layout.Section>
          <Layout.Section>
            <Layout.Footer key="footer">
              <div>
                <Logo isSecondary />
              </div>
              <div>
                <Text>© 2017. IBIT LTD. Al</Text>
              </div>
            </Layout.Footer>
          </Layout.Section>
        </Layout.Root>
      </ThemeProvider>
    );
  }
}

Root.propTypes = {
  saveWebSocketId: PropTypes.func.isRequired,
  clearWebSocketId: PropTypes.func.isRequired,
};

const actions = {
  saveWebSocketId: userActions.saveWebSocketId,
  clearWebSocketId: userActions.clearWebSocketId,
};

export default connect(null, actions)(Root);
