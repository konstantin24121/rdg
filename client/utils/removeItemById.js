/**
 * Remove items by id
 * @param  {Array}     list     list of items
 * @param  {integer|array}   idx      index
 * @return {Array}              array without deleted item
 */
export default (list, idx) => {
  const newList = [...list];
  if (Array.isArray(idx)) {
    return newList.filter(({ id }) => !idx.includes(id));
  }
  const removeIndex = newList.findIndex(({ id }) => id === idx);
  if (removeIndex === -1) return newList;
  newList.splice(removeIndex, 1);
  return newList;
};
