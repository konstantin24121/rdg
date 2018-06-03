import TYPES from './types';

const createDealStart = ({ value, date }) => ({
  type: TYPES.createDeal,
  payload: {
    value,
    date,
  },
});
const createDealSuccess = response => ({
  type: TYPES.createDealSuccess,
  payload: { response },
});
const createDealFail = () => ({
  type: TYPES.createDealFail,
});
export function createDeal({ value, date }) {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch(createDealStart({ value, date }));
      const response = await api.deals.create({ value, date });
      return dispatch(createDealSuccess(response));
    } catch (err) {
      dispatch(createDealFail());
      return console.error(err.message);
    }
  };
}

const removeDealStart = ({ id }) => ({
  type: TYPES.removeDeal,
  payload: { id },
});
export const removeDealSuccess = ({ id }) => ({
  type: TYPES.removeDealSuccess,
  payload: { id },
});
const removeDealFail = ({ id }) => ({
  type: TYPES.removeDealFail,
  payload: { id },
});
export function removeDeal({ id }) {
  return async (dispatch, getState, { api }) => {
    try {
      dispatch(removeDealStart({ id }));
      await api.deals.delete({ id });
      return dispatch(removeDealSuccess({ id }));
    } catch (err) {
      dispatch(removeDealFail({ id }));
      return console.error(err);
    }
  };
}

export const clearNewDeal = () => ({
  type: TYPES.clearNew,
});

const getListStart = () => ({
  type: TYPES.getList,
});
const getListSuccess = response => ({
  type: TYPES.getListSuccess,
  payload: { response },
});
const getListFail = () => ({
  type: TYPES.getListFail,
});
export const newDeal = response => ({
  type: TYPES.newDeal,
  payload: { response },
});
export function getList() {
  return async (dispatch, getState, { api }) => {
    const { isLoaded } = getState().deals;
    if (isLoaded) return null;
    try {
      dispatch(getListStart());
      const response = await api.deals.list();
      return dispatch(getListSuccess(response));
    } catch (err) {
      dispatch(getListFail());
      return console.error(err);
    }
  };
}
