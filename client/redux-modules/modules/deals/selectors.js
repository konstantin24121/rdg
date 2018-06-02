import { createSelector } from 'reselect';

const getDealsList = state => state.deals.list;
const getDealsMetaList = state => state.deals.meta;

export const getDeals = createSelector(
  [getDealsList, getDealsMetaList],
  (list, meta) => list.map((item) => {
    const itemMeta = meta.find(metaItem => metaItem.id === item.id) || {};
    return {
      ...item,
      ...itemMeta,
    };
  }),
);

export const getNewDeal = createSelector(
  [getDeals],
  list => list.find(item => item.isNew) || {},
);
