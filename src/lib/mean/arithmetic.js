import { map, reduce, compose, lazyReduce } from '../fp-fundamentals';
import { roundTo } from '../math';

const arithmeticMeanFactorReducer = ([sum, count], item) => [sum + item, count + 1]
const arithmeticMeanFactorMapper = ([sum, count]) => sum / count

// either Array API
// export const arithmeticMean = (mapperFn = (e) => e) =>
//   (collection) =>
//     arithmeticMeanFactorMapper(collection
//       .map(mapperFn)
//       .reduce(arithmeticMeanFactorReducer, [0, 0]))

// or pure functional API:
export const arithmeticMean = (mapperFn = (e) => e, prec) => compose(
  map(mapperFn),
  reduce(arithmeticMeanFactorReducer, [0, 0]),
  arithmeticMeanFactorMapper,
  prec ? roundTo(prec) : e => e
)

// either nested calls:
// export const lazyArithmeticMean = (mapperFn = (e) => e) => {
//   let factor = lazyReduce(arithmeticMeanFactorReducer, [0, 0])
//   return (item) => arithmeticMeanFactorMapper(factor(mapperFn(item)))
// }

// or composed functions:
export const lazyArithmeticMean = (mapperFn = (e) => e, prec) => compose(
  mapperFn,
  lazyReduce(arithmeticMeanFactorReducer, [0, 0]),
  arithmeticMeanFactorMapper,
  prec ? roundTo(prec) : e => e
)
