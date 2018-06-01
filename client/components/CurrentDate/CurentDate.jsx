import { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

class CurrentDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
    this.timer = null;
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: new Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return format(this.state.time, this.props.format);
  }
}

CurrentDate.propTypes = {
  format: PropTypes.string,
};

CurrentDate.defaultProps = {
  format: 'MMMM d, YYYY HH:mm:ss',
};

export default CurrentDate;
