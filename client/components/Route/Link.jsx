import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { historyPush } from './utils';

class Link extends Component {
  handleClick = (event) => {
    event.preventDefault();
    const { to } = this.props;
    historyPush(`#${to}`);
  }
  render() {
    const { to, children } = this.props;
    return (
      <a href={`#${to}`} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
