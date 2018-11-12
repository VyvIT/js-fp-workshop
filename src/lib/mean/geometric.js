import { map, reduce, compose, lazyReduce } from '../fp-fundamentals';

const geometricMeanFactorReducer = ([product, count], item) => [product * item, count + 1]
const geometricMeanFactorMapper = ([product, count]) => product ** (1 / count)

// either Array API
// export const geometricMean = (mapperFn = (e) => e) =>
//   (collection) =>
//     geometricMeanFactorMapper(collection
//       .map(mapperFn)
//       .reduce(geometricMeanFactorReducer, [1, 0]))

// or pure functional API:
export const geometricMean = (mapperFn = (e) => e) => compose(
  map(mapperFn),
  reduce(geometricMeanFactorReducer, () => [1, 0]),
  geometricMeanFactorMapper
)

export const lazyGeometricMean = (mapperFn = (e) => e) => {
  let factor = lazyReduce(geometricMeanFactorReducer, [1, 0])
  return (item) => geometricMeanFactorMapper(factor(mapperFn(item)))
}
