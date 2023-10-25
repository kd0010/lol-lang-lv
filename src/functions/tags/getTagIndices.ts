import { getIndicesOf } from '../../helpers/getIndicesOf'
import { getClosingTagIndex } from './getClosingTagIndex'

/**
 * Gets the opening and closing tag indices for tag.
 */
export function getTagIndices(
  text: string,
  tagName: string,
): ([number, number] | [number, null])[] {
  const indices: ([number, number] | [number, null])[] = []

  // an opening tag can have attributes (there's gonna be a space char),
  // or it can end with just the bracket.
  const openingTagPattern = `<${tagName}[ >]{1}`

  const openingTagIndices = getIndicesOf(text, openingTagPattern)
  
  for (const openingTagIndex of openingTagIndices) {
    const closingTagIndex = getClosingTagIndex(text, tagName, openingTagIndex)
    indices.push([openingTagIndex, closingTagIndex])
  }

  return indices
}
