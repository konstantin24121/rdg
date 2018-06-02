import { createSelector } from 'reselect';
import { sheme } from './interfaces';

const getDealsList = state => state.deals.list;
const getDealsMetaList = state => state.deals.meta;

export const getDeals = createSelector(
  [getDealsList, getDealsMetaList],
  (list, meta) => list.map((item) => {
    const itemMeta = meta.find(metaItem => metaItem.id === item.id) || {};
    return {
      ...sheme(item),
      ...itemMeta,
    };
  }),
);

export const getNewDeal = createSelector(
  [getDeals],
  list => list.find(item => item.isNew) || {},
);
