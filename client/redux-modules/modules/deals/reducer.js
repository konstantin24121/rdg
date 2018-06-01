import TYPES from './types';

const initialState = {
  list: [],
  isLoaded: false,
  isLoading: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}
