import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Text, Alert, CurrentDate,
  Layout, Button, Input,
} from 'components';

import { Root, BtnBox } from './CreateNewDealStyled';

class CreateNewDeal extends PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  validate = (value) => {
    if (parseInt(value, 10) === 0) return 'Please enter value. Value can not be empty or zero';
    if (Number.isNaN(+value)) return 'Please enter valid value. Value can be only a number';
    return null;
  }

  handleClick = () => {
    const value = +(this.inputRef.current.value);
    const fixedValue = value.toFixed(2);
    const validate = this.validate(fixedValue);
    if (!validate) {
      this.props.onSubmit({ value: fixedValue });
    } else {
      this.setState({
        hasError: true,
        errorMessage: validate,
      });
    }
  }

  handleClearError = () => {
    this.setState({
      hasError: false,
      errorMessage: '',
    });
  }

  render() {
    const { hasError, errorMessage } = this.state;
    return (
      <Root>
        <Layout.Indent size="small">
          <Text>Current date</Text>
        </Layout.Indent>
        <Layout.Indent size="medium">
          <Alert type="info" size="big">
            <CurrentDate />
          </Alert>
        </Layout.Indent>
        <Layout.Indent size="small">
          <Text>Value</Text>
        </Layout.Indent>
        <Layout.Indent>
          <Input
            addon={() => 'USD'}
            inputRef={this.inputRef}
            onFocus={this.handleClearError}
            meta={{
              error: hasError,
              errorMessage,
            }}
          />
        </Layout.Indent>
        <BtnBox>
          <Button isFlex type="primary" onClick={this.handleClick}>New Deal</Button>
        </BtnBox>
      </Root>
    );
  }
}

CreateNewDeal.propTypes = {
  onSubmit: PropTypes.func,
};

CreateNewDeal.defaultProps = {
  onSubmit: () => {},
};

export default CreateNewDeal;
