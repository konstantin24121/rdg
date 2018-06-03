import React from 'react';
import PropTypes from 'prop-types';

import { Root, Addon, InputField, ErrorMessage } from './InputStyled';

const Input = ({ addon, meta, inputRef, ...inputProps }) => (
  <Root>
    {addon && <Addon>{addon()}</Addon>}
    <InputField
      innerRef={inputRef}
      {...inputProps}
    />
    {meta.error && <ErrorMessage>{meta.errorMessage}</ErrorMessage>}
  </Root>
);

Input.propTypes = {
  addon: PropTypes.func,
  inputRef: PropTypes.object,
  meta: PropTypes.shape({
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
  }),
};

Input.defaultProps = {
  addon: null,
  inputRef: () => {},
  meta: {
    error: false,
  },
};

export default Input;
