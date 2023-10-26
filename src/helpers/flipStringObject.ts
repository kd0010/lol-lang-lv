export function flipStringObject(
  obj: {[k: string]: string},
): {[k: string]: string} {
  const newObj: {[k: string]: string} = {}
  for (const key in obj) {
    const value = obj[key]!
    newObj[value] = key
  }
  return newObj
}
