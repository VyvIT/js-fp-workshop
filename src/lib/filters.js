export const negate = (boolFn) => (item, idx, arr) => !boolFn(item, idx, arr)

export const or = (...predicateFns) =>
  (item, idx, arr) => predicateFns.some(fn => fn(item, idx, arr))

export const and = (...predicateFns) =>
  (item, idx, arr) => predicateFns.every(fn => fn(item, idx, arr))

export const atLeast = (n, ...predicateFns) =>
  (item, idx, arr) => predicateFns
    .map(fn => fn(item, idx, arr))
    .filter(b => b)
    .length >= n
