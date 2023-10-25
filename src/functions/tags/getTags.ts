export function getTags(
  text: string,
  options: ExtractTagsOptions={},
): string[] {
  let {
    includeAttributes=false,
    includeEndingTags=false,
    includeTagBrackets=false,
  } = options
  
  const tags: string[] = []
  let currentTag = ''
  let isRecordingTag = false
  let previousLetter = ''
  const addLetter = (letter: string) => {
    if (letter == '<' || letter == '>' || letter == '/') {
      if (includeTagBrackets) currentTag += letter
    } else {
      currentTag += letter
    }
  }
  for (const letter of text) {
    if (letter == '<') {
      addLetter(letter)
      isRecordingTag = true
    } else if (
      (isRecordingTag && letter == '>') ||
      (isRecordingTag && !includeAttributes && letter == ' ')
    ) {
      // end recording a tag clause
      if (letter != ' ') addLetter(letter) // do not end on space character
      else addLetter('>') // replace that space with closing tag
      isRecordingTag = false
      tags.push(currentTag)
      currentTag = ''
    } else if (!includeEndingTags && previousLetter == '<' && letter == '/') {
      // clause to forget about closing tags
      isRecordingTag = false
      currentTag = ''
    } else if (isRecordingTag) {
      addLetter(letter)
    }

    previousLetter = letter
  }
  return tags
}

export interface ExtractTagsOptions {
  includeAttributes?: boolean
  includeEndingTags?: boolean
  includeTagBrackets?: boolean
}
