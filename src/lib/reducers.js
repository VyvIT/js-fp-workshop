export const sumReducer = (sum, n) => sum + n
export const sumReducerMapped = (mapperFn = (e) => e) =>
  (sum, n) => sum + mapperFn(n)

export const flattenReducer = (coll, subcoll) => coll.concat(subcoll)

export const concatReducer = (text, phrase) => `${text} ${phrase}`
export const pushReducer_immutable = (list, item) => [...list, item].sort()
export const pushReducer_mutable = (list, item) => {
  list.push(item);
  return list;
}
export const sortedPushReducer = (list, item) => [...list, item].sort()
