import { indexOfTag } from './indexOfTag'

export const lastIndexOfTag: typeof indexOfTag = (
  contents,
  targetTagName,
  position,
  options,
) => {
  return indexOfTag(contents, targetTagName, position, {
    ...options,
    reverse: true,
  })
}
