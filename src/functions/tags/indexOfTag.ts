export function indexOfTag(
  contents: string,
  /** e.g. "div", "span" etc. (no brackets) */
  targetTagName: string,
  position?: number,
  options: IndexOfTagOptions={},
): number {
  const fnToUse = options.reverse ? 'lastIndexOf' : 'indexOf'
  const openingBracket = options.findClosingTag ? '</' : '<'

  // since there are two ways an opening tag could be
  let targetOpeningTagIndex = -1
  targetOpeningTagIndex = contents[fnToUse](openingBracket + targetTagName + '>', position)
  if (targetOpeningTagIndex == -1 && !options.findClosingTag) {
    targetOpeningTagIndex = contents[fnToUse](openingBracket + targetTagName + ' ', position)
  }

  return targetOpeningTagIndex
}

export interface IndexOfTagOptions {
  reverse?: boolean
  findClosingTag?: boolean
}
