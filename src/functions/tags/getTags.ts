import { letterCharsRegex } from '../../constants/regexes'

export function getTags(
  text: string,
  options: GetTagsOptions={},
): string[] {
  let {
    includeAttributes=false,
    includeEndingTags=false,
    includeTagBrackets=false,
    includeUniqueOnly=false,
  } = options
  
  let tags: string[] = []
  let currentTag = ''
  let doRecordTag = false
  let previousLetter = ''
  const addLetter = (letter: string) => {
    if (letter == '<' || letter == '>' || letter == '/') {
      if (includeTagBrackets) currentTag += letter
    } else {
      currentTag += letter
    }
  }
  for (const letter of text) {
    if (letter == '<' && doRecordTag) {
      // start again, since 2nd opening bracket encounered
      currentTag = '<'
    } else if (letter == '<') {
      addLetter(letter)
      doRecordTag = true
    } else if (
      (doRecordTag && letter == '>') ||
      (doRecordTag && !includeAttributes && letter == ' ')
    ) {
      // end recording a tag clause
      if (letter != ' ') addLetter(letter) // do not end on space character
      else addLetter('>') // replace that space with closing tag
      if (letterCharsRegex.test(currentTag)) tags.push(currentTag)
      doRecordTag = false
      currentTag = ''
    } else if (!includeEndingTags && previousLetter == '<' && letter == '/') {
      // clause to forget about closing tags
      doRecordTag = false
      currentTag = ''
    } else if (doRecordTag) {
      if (currentTag == '<' && letter == ' ') {
        // a space character cannot be the next character right after opening bracket
        currentTag = ''
        doRecordTag = false
      } else {
        addLetter(letter)
      }
    }

    previousLetter = letter
  }
  if (includeUniqueOnly) tags = [...new Set(tags)]
  return tags
}

export interface GetTagsOptions {
  includeAttributes?: boolean
  includeEndingTags?: boolean
  includeTagBrackets?: boolean
  includeUniqueOnly?: boolean
}
