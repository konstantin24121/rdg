import TYPES from './types';

export const saveWebSocketId = ({ id }) => ({
  type: TYPES.saveWebSocketId,
  payload: { id },
});

export const clearWebSocketId = () => ({
  type: TYPES.clearWebSocketId,
});
