import React, { Component } from 'react';
import { CreateDeal, Dashboard } from 'containers';
import { Layout, Logo, Button, Text, Route } from 'components';
import { applyGlobalStyles } from './globalStyled';

class Root extends Component {
  componentWillMount() {
    applyGlobalStyles();
  }

  render() {
    return (
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
    );
  }
}

export default Root;
