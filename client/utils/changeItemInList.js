/**
 * Change item in array by id or create
 * @param  {Array}     list     list of items
 * @param  {integer}   idx      index
 * @param  {Function}  callback callback for change item
 * @return {Array}              array with changed item
 */
export default (list, idx, callback) => {
  const newList = [...list];
  const updatedIndex = newList.findIndex(({ id }) => id === idx);
  let updatedItem;
  if (updatedIndex === -1) {
    updatedItem = {
      id: idx,
    };
    const nextItem = callback(updatedItem);
    newList.push(nextItem);
  } else {
    updatedItem = newList[updatedIndex];
    const nextItem = callback(updatedItem);
    newList[updatedIndex] = nextItem;
  }
  return newList;
};
