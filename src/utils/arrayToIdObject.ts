interface ObjectWithId {
  id: string | number
}

export default function arrayToIdObject<T extends ObjectWithId>(
  array: T[]
): { [key: string]: boolean } {
  return array.reduce((obj, item) => {
    obj[item.id.toString()] = true
    return obj
  }, {} as { [key: string]: boolean })
}