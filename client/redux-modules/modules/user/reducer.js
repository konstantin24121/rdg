import TYPES from './types';

const initialState = {
  websocetId: undefined,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.saveWebSocketId: {
      return { ...state, websocetId: payload.id };
    }
    case TYPES.clearWebSocketId: {
      return { ...state, websocetId: undefined };
    }
    default:
      return state;
  }
}
