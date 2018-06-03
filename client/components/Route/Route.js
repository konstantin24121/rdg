import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { matchPath, register, unregister } from './utils';

/**
 * Simple route
 */
class Route extends PureComponent {
  componentWillMount() {
    register(this);
    window.addEventListener('popstate', this.handlePop);
  }

  componentWillUnmount() {
    unregister(this);
    window.removeEventListener('popstate', this.handlePop);
  }

  handlePop = () => {
    this.forceUpdate();
  }

  render() {
    const { path, render, component } = this.props;
    const match = matchPath(
      window.location.hash,
      path,
    );
    if (!match) return null;
    if (component) return React.createElement(component, { match });
    return render({ match });
  }
}

Route.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.func,
  component: PropTypes.func,
};

Route.defaultProps = {
  component: null,
  render: () => {},
};

export default Route;
