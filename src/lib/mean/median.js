import { map, reduce, compose, lazyReduce } from '../fp-fundamentals';

const numberAsc = (a, b) => a - b
const sortedNumbersPushReducer = (list, item) => [...list, item].sort(numberAsc)
const medianMapper = (list) => list.length % 2 === 0 ?
  ( list[list.length/2 - 1] + list[list.length/2]) / 2 : // even
  list[(list.length - 1)/2] // odd

// either Array API
// export const median = (mapperFn = (e) => e, prec) => {
//   const round = prec ? roundTo(prec) : e => e
//   return (collection) =>
//     round(medianMapper(collection
//       .map(mapperFn)
//       .reduce(sortedNumbersPushReducer, [])))
// }

// or pure functional API:
export const median = (mapperFn = (e) => e, prec) => compose(
  map(mapperFn),
  reduce(sortedNumbersPushReducer, []),
  medianMapper,
  prec ? roundTo(prec) : e => e
)

// either nested calls:
// export const lazyMedian = (mapperFn = (e) => e, prec) => {
//   const round = prec ? roundTo(prec) : e => e
//   let factor = lazyReduce(sortedNumbersPushReducer, [])
//   return (item) => round(medianMapper(factor(mapperFn(item))))
// }

// or composed functions:
export const lazyMedian = (mapperFn = (e) => e, prec) => compose(
  mapperFn,
  lazyReduce(sortedNumbersPushReducer, []),
  medianMapper,
  prec ? roundTo(prec) : e => e
)
