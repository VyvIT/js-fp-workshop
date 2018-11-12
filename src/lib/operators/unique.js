export const unique = (items) => {
  const s = new Set()
  return items.filter(t => {
    let found = s.has(t)
    return !found && s.add(t)
  })
}

export const getUniqueReducer = () => {
  const s = new Set()
  return (coll, t) => {
    if (!s.has(t)) {
      s.add(t)
      coll.push(t)
    }
    return coll
  }
}
