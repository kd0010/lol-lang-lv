export const literatureCharsRegex =     /[a-zA-Z\s\d'\.\-–—]+?/g
export const nonLiteratureCharsRegex = /[^a-zA-Z\s\d'\.\-–—]+?/g
export const letterCharsRegex =     /[a-zA-Z]+?/g
export const nonLetterCharsRegex = /[^a-zA-Z]+?/g
export const wordsRegex =           /[a-zA-Z]{2,}?/g

export const htmlCharacterEntityRegex = /&[\w]+?;/g
export const textInSquareBracketsRegex = /\[[\w\s\+\-]+?\]/g

export const atVariableRegex = /@[\w\W]+?@/g
export const percentIVariableRegex = /%i:[\w\W]+?%/g
export const variableInDoubleCurlyBracketsRegex = /\{\{[\w\W]+?\}\}/g
export const dollarSignVariableRegex = /\$[\w\W]+?\$/g
export const calcTagWithContentsRegex = /<calc>[\w\W]+?<\/calc>/g

export const getOpeningTagRegex = (tagName: string) => new RegExp(`<${tagName}[ >]{1}`, 'g')
