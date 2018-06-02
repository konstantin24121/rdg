import changeItemInList from 'utils/changeItemInList';
import removeItemById from 'utils/removeItemById';

import TYPES from './types';

const initialState = {
  list: [],
  meta: [],
  isLoaded: false,
  isLoading: false,
};

const NEW_ID = 'new_';

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.getList: {
      return { ...state, isLoading: true };
    }
    case TYPES.getListSuccess: {
      const nextList = payload.response;
      return { ...state, list: nextList, isLoading: false, isLoaded: true };
    }
    case TYPES.getListFail: {
      return { ...state, isLoading: false };
    }

    case TYPES.createDeal: {
      const nextList = [...state.list, { id: NEW_ID, ...payload }];
      const nextMeta = [...state.meta, { id: NEW_ID, isNew: true, isSaved: false, isSaving: true }];
      return { ...state, list: nextList, meta: nextMeta };
    }
    case TYPES.createDealSuccess: {
      const nextList = changeItemInList(
        state.list,
        NEW_ID,
        item => ({
          ...item,
          ...payload.response,
        }),
      );
      const nextMeta = changeItemInList(
        state.meta,
        NEW_ID,
        item => ({
          ...item,
          id: payload.response.id,
          isSaved: true,
          isSaving: false,
        }),
      );
      return { ...state, list: nextList, meta: nextMeta };
    }
    case TYPES.createDealFail: {
      const nextMeta = changeItemInList(
        state.meta,
        NEW_ID,
        item => ({
          ...item,
          isSaved: false,
          isSaving: false,
        }),
      );
      return { ...state, meta: nextMeta };
    }
    case TYPES.clearNew: {
      const nextMeta = [...state.meta];
      const newItemIndex = nextMeta.findIndex(item => item.isNew);
      if (newItemIndex === -1) return { ...state };
      nextMeta[newItemIndex] = { ...nextMeta[newItemIndex], isNew: false };
      return { ...state, meta: nextMeta };
    }

    case TYPES.removeDeal: {
      const nextMeta = changeItemInList(
        state.meta,
        payload.id,
        item => ({
          ...item,
          isRemoving: true,
        }),
      );
      return { ...state, meta: nextMeta };
    }
    case TYPES.removeDealSuccess: {
      const nextMeta = removeItemById(state.meta, payload.id);
      const nextList = removeItemById(state.list, payload.id);
      return { ...state, list: nextList, meta: nextMeta };
    }
    case TYPES.removeDealFail: {
      const nextMeta = changeItemInList(
        state.meta,
        payload.id,
        item => ({
          ...item,
          isRemoving: false,
        }),
      );
      return { ...state, meta: nextMeta };
    }
    default:
      return state;
  }
}
